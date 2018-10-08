import { TEMPLATES, LANGUAGES } from './constants'
import generateSet from '@/generateSet'
import * as languages from './languages'

// inline loader syntax used because otherwise this loader doesn't work
// eslint-disable-next-line import/no-webpack-loader-syntax
import mars from '!raw-loader!./mars.raw'

function lowerLimit (n) {
  return n < 0 ? 0 : n
}

function convertError (error) {
  const { lineno: lineNumber, colno: columnNumber } = error
  return Object.freeze({
    ...error,

    from: {
      line: lineNumber - 1,
      ch: lowerLimit(columnNumber - 1),
    },
    to: {
      line: lineNumber - 1,
      ch: lowerLimit(columnNumber),
    },
  })
}

export default {
  namespaced: true,

  state: {
    code: window.localStorage.getItem('code') || '',
    errors: [],
    warnings: [],
    view: window.localStorage.getItem('view') || 'game',
    paused: false,
    running: false,
    mainCtx: null,
    hasBeenRun: false,
    language: languages.Python,
    loading: false,
    loadingTime: null,
    clicks: 0,
  },

  getters: {
    pauseDisabled (state) {
      return !state.running
    },

    hasClickedTooMuch (state) {
      return state.clicks > 20
    },
  },

  mutations: {
    ...generateSet(['errors', 'warnings', 'loading', 'loadingTime', 'mainCtx', 'paused', 'clicks']),

    setLanguage (state, language) {
      state.language = new languages[language](mars)
    },

    setView (state, view) {
      state.view = view
      if (state.running) {
        state.paused = true
      }
      window.localStorage.setItem('view', state.view)
    },
    togglePause (state) {
      state.paused = !state.paused
      if (!state.paused) {
        state.view = 'game'
      }
    },
    setCode (state, code) {
      state.code = code
      window.localStorage.setItem('code', state.code)
    },
    setRunning (state, running) {
      state.running = running
      state.hasBeenRun = true
    },
    loadBoilerplate (state) {
      state.code = TEMPLATES[LANGUAGES[state.language.constructor.name]]
    },
  },

  actions: {
    run ({ state, commit, rootGetters, rootState, getters }) {
      commit('setClicks', state.clicks + 1)
      if (state.loading) return

      commit('setView', 'game')
      commit('setRunning', false)
      commit('setErrors', [])
      commit('setLoading', false)
      window.onerror = (message, source, lineno, colno, error) => {
        console.log(1)
        console.dir(error)
        commit('setErrors', [convertError({ message, source, lineno, colno, error })])
        commit('setRunning', false)
      }

      // this timeout is necessary for vuex to register the change in `loading`
      setTimeout(() => {
        if (state.language.needsLoading) {
          commit('setLoading', true)
          state.language
            .getLoadingTime(this.apolloClient)
            .then((time) => commit('setLoadingTime', time))
        }
        state.language
          .prepareCode(state.code, this.apolloClient)
          .then(({ success, code, errors, warnings, blocked }) => {
            commit('setLoading', false)
            commit('setWarnings', warnings || [])
            commit('setClicks', 0)

            if (success) {
              commit('setRunning', true)
              commit('setPaused', false)

              /* eslint-disable no-unused-vars */
              const _state = state
              const _ctx = state.mainCtx
              const _sprites = rootGetters['sprite/sprite/sprites']
              /* eslint-enable no-unused-vars */

              if (state.language.useEval) {
                // eslint-disable-next-line no-eval
                setTimeout(() => eval(code))
              } else {
                try {
                  // eslint-disable-next-line no-new-func
                  Function('_state', '_ctx', '_sprites', code)(_state, _ctx, _sprites)
                } finally {
                  state.language.cleanup()
                }
              }
            } else if (!blocked) {
              commit('setErrors', errors)
            }
          })
      }, 0)
    },
  },
}
