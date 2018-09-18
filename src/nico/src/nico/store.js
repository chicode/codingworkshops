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

// combines user code with the mars library to make a runnable program
// mars goes in front so that a user syntax error does not accidentally
// propogate to the mars code
function prepareCode (code) {
  return `
    ${mars}
    ${code}
  `
}

function lowerLimit (n) {
  return n < 0 ? 0 : n
}

function convertError (error) {
  const { lineno: lineNumber, colno: columnNumber } = error

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
    worker: null,
  },

  getters: {
    pauseDisabled (state) {
      return !state.running
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
      if (state.worker) state.worker.postMessage(pause ? 'pause' : 'resume')
    },
    setError (state, error) {
      state.error = error ? convertError(error) : null
    },
    initMainCtx (state, ctx) {
      state.mainCtx = ctx
    },
    setWorker (state, worker) {
      state.worker = worker
    },
  },

  actions: {
    run ({ state, commit, rootGetters, rootState }) {
      if (state.worker) state.worker.terminate()

      commit('setView', 'game')
      commit('setError', null)
      commit('setRunning', true)
      commit('setPaused', false)

      const blob = new Blob([prepareCode(state.code)])

      const worker = new Worker(window.URL.createObjectURL(blob))
      commit('setWorker', worker)

      const sprites = rootGetters['sprite/sprite/sprites']
      const ctx = state.mainCtx
      worker.onmessage = function ({ data: { cmd, payload } }) {
        switch (cmd) {
          case 'rect':
            ctx.rect(...payload)
            if (payload[4]) {
              ctx.stroke()
            } else {
              ctx.fill()
            }
            break

          case 'sprite':
            ctx.putImageData(sprites[payload[0]], payload[1], payload[2])
            break

          case 'clear-screen':
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
            break
        }
      }
      worker.postMessage({ cmd: 'init' })
    },
  },
}
