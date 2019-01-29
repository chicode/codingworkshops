import _ from 'lodash/fp'

export default (modules, afterRevert = () => {}) => (store) => {
  let history = []

  function getModuleState (state) {
    return modules.reduce((acc, val) => acc[val], state)
  }
  function getModuleStateCloned (state) {
    return _.cloneDeep(getModuleState(state))
  }

  function setModuleState (state, assign) {
    // assign a state to a heirarchy of modules
    // similar to getModuleState, but avoids processing the final child
    // in the reduce so that it can assign to it
    modules.slice(0, -1).reduce((acc, val) => acc[val], state)[modules[modules.length - 1]] = assign
  }

  history.push(getModuleStateCloned(store.state))
  let index = 0

  store.subscribe(({ type, payload }, state) => {
    if (type.includes(modules.join('/'))) {
      // some redoing/undoing has occured
      if (index < history.length - 1) {
        history.splice(index + 1)
      }

      history.push(getModuleStateCloned(state))
      index++
    }
  })

  function revert () {
    // replaceState affects all modules, and this code needs to revert only the module of the history that this plugin controls
    const state = store.state
    setModuleState(state, _.cloneDeep(history[index]))
    store.replaceState(state)

    afterRevert(store)
  }

  store.registerModule(`${modules[0]}-history`, {
    namespaced: true,
    getters: {
      // getters have to be functions because otherwise vue will cache them
      canUndo: () => () => index > 0,
      canRedo: () => () => index < history.length - 1,
    },
    actions: {
      undo ({ state, getters, commit }) {
        if (getters.canUndo()) {
          index--
          revert(store, history, index, module)
        }
      },
      redo ({ state, getters, commit }) {
        if (getters.canRedo()) {
          index++
          revert(store, history, index, module)
        }
      },
    },
  })
}
