import gql from 'graphql-tag'

// inline loader syntax used because otherwise this loader doesn't work
// eslint-disable-next-line
import mars from '!raw-loader!./mars.raw'

import { TEMPLATE } from './constants'

// account for mars going in front of user code
// this is done in order to allow for accurate error line numbers
const MARS_LINES = mars.split('\n').length

// different browserss set colno to be different (for some reason )
const COLUMN_OFFSET = (() => {
  if (navigator.userAgent.includes('Chrome')) {
    return -2
  } else {
    return -1
  }
})()

function lowerLimit (n) {
  return n < 0 ? 0 : n
}

function convertError (error) {
  const { lineno: lineNumber, colno: columnNumber } = error

  console.log(lineNumber, columnNumber, error)

  // error came from the mars part of the code
  // this means that it was raised intentionally
  if (lineNumber - 1 - MARS_LINES < 0) {
    return Object.freeze(error.error)
  }

  return Object.freeze({
    ...error,
    isSyntax: true,

    from: {
      line: lineNumber - 1 - MARS_LINES,
      ch: lowerLimit(columnNumber + COLUMN_OFFSET - 1),
    },
    to: {
      line: lineNumber - 1 - MARS_LINES,
      ch: lowerLimit(columnNumber + COLUMN_OFFSET),
    },
  })
}

export default {
  namespaced: true,

  state: {
    code: window.localStorage.getItem('code') || TEMPLATE,
    error: null,
    view: window.localStorage.getItem('view') || 'game',
    paused: false,
    running: false,
    mainCtx: null,
    hasBeenRun: false,
    language: null,
  },

  getters: {
    pauseDisabled (state) {
      return !state.running
    },

    // combines user code with the mars library to make a runnable program
    // mars goes in front so that a user syntax error does not accidentally
    // propogate to the mars code
    prepareCode: (state) => async (apolloClient) => {
      if (state.language === 'javascript') {
        // this code uses var instead of const because that's the only way to rewrite the value of the variables
        return `
        ${mars};

        var init = init || (() => {})
        var update = update || (() => {})

        ${state.code}`
      } else {
        const result = await apolloClient.mutate({
          mutation: gql`
            mutation($language: Language!, $code: String!) {
              compileCode(language: $language, code: $code) {
                success
                code
                error
                warning
              }
            }
          `,
          variables: {
            language: state.language.toUpperCase(),
            code: state.code,
          },
        })

        const code = result.data.compileCode.code
        // the var is required because `require` is defined without a declaration
        return `
        var ${code};
        const module = require('4')

        const init = module.init || (() => {})
        const update = module.update || (() => {})
        const draw = module.draw

        ${mars}`
      }
    },
  },

  mutations: {
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
    setPaused (state, pause) {
      state.paused = pause
    },
    setLanguage (state, language) {
      state.language = language
    },
    setError (state, error) {
      state.error = error ? convertError(error) : null
    },
    initMainCtx (state, ctx) {
      state.mainCtx = ctx
    },
  },

  actions: {
    async run ({ state, commit, rootGetters, rootState, getters }) {
      commit('setView', 'game')
      commit('setRunning', false)
      commit('setError', null)

      // TODO: lint code and set error state variable

      // this hacky timeout serves two purposes:
      // 1) to make sure that vue registers the change to the running
      // state variable, even if it's going from true -> true
      // 2) to give the currently running game one frame to not trigger the
      // requestAnimationFrame, thereby terminating it
      setTimeout(async () => {
        commit('setRunning', true)
        commit('setPaused', false)

        const _ctx = state.mainCtx // eslint-disable-line no-unused-vars
        const _state = state // eslint-disable-line no-unused-vars
        const _sprites = rootGetters['sprite/sprite/sprites'] // eslint-disable-line no-unused-vars

        window.onerror = (message, source, lineno, colno, error) => {
          commit('setError', { message, source, lineno, colno, error })
          commit('setRunning', false)
        }

        const code = await getters.prepareCode(this.apolloClient)

        // eslint-disable-next-line
        eval(code)

        // error handling done in window event listener because that's the only way to
        // get an error from an eval statement
        // https://stackoverflow.com/a/26929319
      })
    },
  },
}
