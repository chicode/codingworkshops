import generateSet from '@/generateSet'
import * as languages from './languages'

import { initMars } from './mars'

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
    language: new languages.Python(),
    loading: false,
    langLoading: false,
    loadingTime: null,
    clicks: 0,
    mars: null,
    drawFunc: null,
    updateFunc: null,
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
    ...generateSet([
      'errors',
      'warnings',
      'loading',
      'loadingTime',
      'mainCtx',
      'paused',
      'clicks',
      'language',
      'langLoading',
      'mars',
      'drawFunc',
      'updateFunc',
    ]),

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
      state.code = state.language.boilerplate
    },
  },

  actions: {
    setLanguage ({ commit }, language) {
      commit('setLangLoading', true)
      commit(
        'setLanguage',
        new languages[language](() => commit('setLangLoading', false))
      )
    },

    run ({ state, commit, rootGetters, rootState }) {
      commit('setClicks', state.clicks + 1)
      if (state.loading || state.langLoading) return

      commit('setView', 'game')
      commit('setRunning', false)
      commit('setErrors', [])
      commit('setLoading', false)

      const { language } = state

      if (!state.mars) {
        commit(
          'setMars',
          initMars({
            state,
            ctx: state.mainCtx,
            sprites: rootGetters['sprite/sprite/sprites'],
            clear: true,
            tilemap: rootGetters['tile/sprite/tilemap'](),
            flags: rootState.tile.flags,
            language,
            onError: err => {
              commit('setErrors', [err])
              commit('setRunning', false)
            },
          })
        )
      }

      const [startMars, mars] = state.mars

      // this timeout is necessary for vuex to register the change in `loading`
      setTimeout(() => {
        language
          .refresh(state.code, mars)
          .then(
            ({ success, draw, update, init, errors, warnings, blocked }) => {
              commit('setLoading', false)
              commit('setWarnings', warnings || [])
              commit('setClicks', 0)

              if (success) {
                commit('setRunning', true)
                commit('setPaused', false)

                commit('setDrawFunc', draw)
                commit('setUpdateFunc', update)

                init()
                startMars()
              } else if (!blocked) {
                commit('setErrors', errors)
              }
            }
          )
        // delay helps make sure that the old game stops
      }, 100)
    },
  },
}
