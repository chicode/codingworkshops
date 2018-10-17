import _ from 'lodash'

import { lowerBoundary, upperBoundary } from '../../image-editor/helpers'
import { GRID_SIZE, SCALE } from '../../image-editor/constants'

export default {
  namespaced: true,

  state: () => ({
    selectStart: [0, 0],
    selectSize: [GRID_SIZE, GRID_SIZE],
  }),

  getters: {
    getRectParams: (state) => [
      state.selectStart[0] + (state.selectSize[0] < 0 ? state.selectSize[0] : 0),
      state.selectStart[1] + (state.selectSize[1] < 0 ? state.selectSize[1] : 0),
      Math.abs(state.selectSize[0]),
      Math.abs(state.selectSize[1]),
    ],
    selectionExists: (state) => {
      return state.selectSize[0] !== 0 || state.selectSize[1] !== 0
    },
  },

  mutations: {
    resizeSelect (state, coords) {
      coords = upperBoundary(coords)
      state.selectSize = [coords[0] - state.selectStart[0], coords[1] - state.selectStart[1]]
    },
    resetSelect (state) {
      state.selectSize = [0, 0]
    },
    startSelect (state, coords) {
      state.selectStart = lowerBoundary(coords)
    },
  },
  actions: {
    mouseDown ({ commit }, coords) {
      // encodes the coordinates of the original sprite in the color that is drawn onto the tilesheet
      commit(
        'tile/setColor',
        `rgb(${Math.floor(coords[0] / (GRID_SIZE * SCALE))}, ${Math.floor(
          coords[1] / (GRID_SIZE * SCALE),
        )}, 0)`,
        {
          root: true,
        },
      )
      commit('startSelect', coords)
    },
    mouseUp () {},
    mouseLeave () {},
    mouseMove () {},
  },
}
