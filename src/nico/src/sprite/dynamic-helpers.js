/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
export const mapState = normalizeNamespace((getNamespace, states) => {
  const res = {}
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      const module = getModuleByNamespace(this.$store, 'mapState', getNamespace.call(this))
      return module.context.state[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export const mapMutations = normalizeNamespace((getNamespace, mutations) => {
  const res = {}
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation (...args) {
      // Get the commit method from store
      const module = getModuleByNamespace(this.$store, 'mapMutations', getNamespace.call(this))
      return module.context.commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
export const mapGetters = normalizeNamespace((getNamespace, getters) => {
  const res = {}
  normalizeMap(getters).forEach(({ key, val }) => {
    res[key] = function mappedGetter () {
      // this namespace has been mutate by normalizeNamespace
      val = getNamespace.call(this) + val
      if (!getModuleByNamespace(this.$store, 'mapGetters', getNamespace.call(this))) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export const mapActions = normalizeNamespace((getNamespace, actions) => {
  const res = {}
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      // get dispatch function from store
      const module = getModuleByNamespace(this.$store, 'mapActions', getNamespace.call(this))
      return module.context.dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map((key) => ({ key, val: key }))
    : Object.keys(map).map((key) => ({ key, val: map[key] }))
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return (module, map, subModules) => {
    let getPath
    if (typeof module === 'string') {
      // module is a prop
      getPath = function () {
        return this[module] + '/' + (subModules ? subModules.join('/') + '/' : '')
      }
    } else if (typeof module === 'function') {
      // module is a function
      getPath = function () {
        return module.call(this) + '/' + (subModules ? subModules.join('/') + '/' : '')
      }
    } else {
      throw new Error('First argument must be string or function')
    }

    return fn(getPath, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}

/*

function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}

export function mapDynamicActions (module, actions, subModules = []) {
  let getPath
  if (typeof module === 'string') {
    // module is a prop
    getPath = function () {
      return this[module] + '/' + subModules.join('/')
    }
  } else if (typeof module === 'function') {
    // module is a function
    getPath = function () {
      return module.call(this) + '/' + subModules.join('/')
    }
  } else {
    throw new Error('First argument must be string or function')
  }

  const res = {}
  actions.forEach((action) => {
    res[action] = function mappedAction (...args) {
      // get dispatch function from store
      let dispatch = this.$store.dispatch
      if (subModules.length) {
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace)
        if (!module) {
          return
        }
        dispatch = module.context.dispatch
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })
}
*/
