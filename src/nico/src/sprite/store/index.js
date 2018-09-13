import historyPlugin from './history-plugin'
import select from './select'
import sprite from './sprite'

export const history = historyPlugin(['sprite', 'sprite'], (store) => {
  // hacky fix to save spritesheet without mutation
  window.localStorage.setItem('spritesheet', store.state.sprite.sprite.spritesheet)
  window.lastCoords = [null, null]
})

window.mouseDown = false
window.lastCoords = [null, null]

export default {
  namespaced: true,

  modules: { select, sprite },

  state: {
    tool: 'pencil',
    width: 1,
    color: '#000000',
  },

  getters: {
    isTool: (state) => (options) => {
      return options.includes(state.tool)
    },
  },

  mutations: {
    // setting the color or tool makes it possible that clicking on the same pixel will produce a different result
    setColor (state, color) {
      state.color = color
      window.lastCoords = [null, null]
    },
    setWidth (state, width) {
      state.width = width
      window.lastCoords = [null, null]
    },
    setTool (state, tool) {
      state.tool = tool
      window.lastCoords = [null, null]
    },
  },

  actions: {
    change ({ state, getters, commit, dispatch }, { eventType, coords }) {
      if (getters.isTool(['pencil', 'eraser', 'bucket'])) {
        let action
        if (getters['select/selectionExists']) {
          if (getters['select/selectionContains'](coords) && getters.isTool(['bucket'])) {
            action = {
              type: 'selection',
            }
          } else {
            commit('select/resetSelect')
            return
          }
        } else {
          action = {
            type: 'tool',
            coords,
          }
        }
        dispatch('sprite/handleAction', action)
      } else if (getters.isTool(['rectangle-select', 'circle-select'])) {
        if (eventType === 'down') {
          commit('select/startSelect', { start: coords, tool: state.tool })
        } else {
          commit('select/resizeSelect', coords)
        }
      }
    },

    mouseDown ({ dispatch }, coords) {
      window.mouseDown = true
      if (coords[0] !== window.lastCoords[0] || coords[1] !== window.lastCoords[1]) {
        dispatch('change', { eventType: 'down', coords })
        window.lastCoords = coords
      }
    },
    mouseUp () {
      window.mouseDown = false
    },
    mouseLeave () {
      window.mouseDown = false
    },
    mouseMove ({ dispatch }, coords) {
      if (
        window.mouseDown &&
        (coords[0] !== window.lastCoords[0] || coords[1] !== window.lastCoords[1])
      ) {
        dispatch('change', { eventType: 'move', coords })
        window.lastCoords = coords
      }
    },
  },
}
