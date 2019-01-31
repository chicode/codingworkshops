import _ from 'lodash/fp'

export default function prepare ($methods) {
  const auth = {
    async login (session) {
      const res = await $methods.login({ session })
      if (res.ok) {
        window.localStorage.setItem('jwt', res.jwt)
        window.localStorage.setItem('user', JSON.stringify(res.user))
      }
      return res
    },

    logout () {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      return Promise.resolve()
    },

    loggedIn () {
      return !_.isNull(localStorage.getItem('jwt')) && !_.isNull(localStorage.getItem('user'))
    },

    currentUser () {
      return JSON.parse(localStorage.getItem('user'))
    },
  }

  function install (Vue, Vuex) {
    Object.defineProperty(Vue.prototype, '$auth', {
      get () {
        return auth
      },
    })

    Object.defineProperty(Vuex.Store.prototype, '$auth', {
      get () {
        return auth
      },
    })
  }

  return { auth, install }
}
