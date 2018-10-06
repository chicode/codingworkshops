// inline loader syntax used because otherwise this loader doesn't work
// eslint-disable-next-line
import mars from '!raw-loader!./mars.raw'

import { TEMPLATES, LANGUAGES } from './constants'
import generateSet from '@/generateSet'

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

function loadScript (source, isSource = true) {
  const script = document.createElement('script')

  if (isSource) {
    script.src = source
  } else {
    script.text = source
  }
  script.type = 'text/javascript'
  document.querySelector('head').appendChild(script)
}

function runBrython (code, transformCode, transformResult, args) {
  const $B = window.__BRYTHON__
  const metaPath = $B.meta_path
  const scriptId = '__main__'

  const js = window.__BRYTHON__.py2js(transformCode(code), scriptId, scriptId).to_js()

  if ($B.use_VFS) {
    $B.meta_path.push($B.$meta_path[0])
  }
  $B.meta_path = $B.meta_path.concat($B.$meta_path.slice(1))

  try {
    console.log(js)
    // eslint-disable-next-line no-new-func
    Function(
      '_state',
      '_ctx',
      '_sprites',
      `
    var $locals___main__ = {}

    ${transformResult(js)}
    `,
    )(...args)
  } finally {
    $B.meta_path = metaPath
  }
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
    language: null,
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

    // combines user code with the mars library to make a runnable program
    prepareCode: (state) => async (apolloClient) => {
      if (state.language === 'javascript') {
        return {
          success: true,
          code: `${state.code};

          const init = init || (() => {})
          const update = update || (() => {})

          ${mars}`,
        }
      } else if (state.language === 'fsharp') {
        const {
          data: { compileCode },
        } = await apolloClient.mutate({
          mutation: require('./graphql/CompileCode.gql'),
          variables: {
            language: state.language.toUpperCase(),
            code: state.code,
          },
        })

        // rename from_ to from
        const rename = (object) => ({ ...object, from: object.from_, from_: undefined })

        if (compileCode.success) {
          // the var is required because `require` is defined without a declaration
          return {
            success: true,
            warnings: compileCode.warnings ? compileCode.warnings.map(rename) : [],
            code: `
            var ${compileCode.code};
            const module = require('4')

            const init = module.init || (() => {})
            const update = module.update || (() => {})
            const draw = module.draw

            ${mars}`,
          }
        } else {
          return {
            success: false,
            blocked: compileCode.blocked,
            errors: compileCode.errors ? compileCode.map(rename) : [],
            warnings: compileCode.warnings ? compileCode.warnings.map(rename) : [],
          }
        }
      } else {
        return {
          success: true,
          code: state.code,
        }
      }
    },
  },

  mutations: {
    ...generateSet(['errors', 'warnings', 'loading', 'loadingTime', 'mainCtx', 'paused', 'clicks']),

    setLanguage (state, language) {
      state.language = language
      if (language === 'python') {
        // loadScript('https://cdnjs.cloudflare.com/ajax/libs/brython/3.6.2/brython.min.js')
        loadScript('https://rawgit.com/brython-dev/brython/master/www/src/brython_dist.js')
      }
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
      state.code = TEMPLATES[LANGUAGES[state.language]]
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
        commit('setErrors', [convertError({ message, source, lineno, colno, error })])
        commit('setRunning', false)
      }

      // this timeout is necessary for vuex to register the change in `loading`
      setTimeout(() => {
        if (state.language === 'fsharp') {
          commit('setLoading', true)
          this.apolloClient
            .query({
              query: require('./graphql/CompilationTime.gql'),
              variables: {
                language: state.language.toUpperCase(),
              },
              fetchPolicy: 'network-only',
            })
            .then(({ data: { compilationTime } }) => {
              commit('setLoadingTime', compilationTime)
            })
        }
        getters
          .prepareCode(this.apolloClient)
          .then(({ success, code, errors, warnings, blocked }) => {
            commit('setLoading', false)
            commit('setWarnings', warnings || [])
            commit('setClicks', 0)

            if (success) {
              commit('setRunning', true)
              commit('setPaused', false)

              const _ctx = state.mainCtx // eslint-disable-line no-unused-vars
              const _state = state // eslint-disable-line no-unused-vars
              const _sprites = rootGetters['sprite/sprite/sprites'] // eslint-disable-line no-unused-vars

              if (state.language === 'python') {
                /* eslint-disable indent */
                // prettier-ignore
                runBrython(
                  state.code,
                  (code) => `
from browser import window

def sprite(*args):
  window.sprite(*args)

${code}
                  `,
                  (compiledCode) => `
${compiledCode}
const init = $locals___main__.init || (() => {})
const update = $locals___main__.update || (() => {})
const draw = $locals___main__.draw

${mars}
                  `,
                  [_state, _ctx, _sprites]
                )
                /* eslint-enable */
              } else {
                // eslint-disable-next-line
                // this timeout makes the error throw on the window level
                // 'escaping' this promise
                // eslint-disable-next-line no-eval
                setTimeout(() => eval(code))
              }
            } else if (!blocked) {
              commit('setErrors', errors || [])
            }
          })
      }, 0)
    },
  },
}
