import { lowerBoundary, upperBoundary } from '../helpers'

export default {
  namespaced: true,

  state: {
    selectStart: [0, 0],
    selectSize: [0, 0],
    selectionTool: null,
  },

  getters: {
    getRectParams: (state) => [
      state.selectStart[0] + (state.selectSize[0] < 0 ? state.selectSize[0] : 0),
      state.selectStart[1] + (state.selectSize[1] < 0 ? state.selectSize[1] : 0),
      Math.abs(state.selectSize[0]),
      Math.abs(state.selectSize[1]),
    ],
    getCircleParams: (state) => [...state.selectStart, ...state.selectSize, 0, 0, Math.PI * 2],
    selectionContains: (state, getters) => ([x, y]) => {
      if (state.selectTool === 'rectangle-select') {
        let params = getters.getRectParams
        return (
          x >= params[0] && y >= params[1] && x < params[0] + params[2] && params[1] + params[3]
        )
      } else if (state.selectTool === 'circle-select') {
        return (
          (x - state.selectStart[0]) ** 2 / state.selectSize[0] ** 2 +
            (y - state.selectStart[1]) ** 2 / state.selectSize[1] ** 2 <=
          1
        )
      }
    },
    selectionExists: (state) => {
      return state.selectSize[0] !== 0 || state.selectSize[1] !== 0
    },
  },

  mutations: {
    resizeSelect (state, coords) {
      coords = upperBoundary(coords)
      state.selectSize = [coords[0] - state.selectStart[0], coords[1] - state.selectStart[1]]
      if (state.selectTool === 'circle-select') {
        state.selectSize = lowerBoundary(state.selectSize)
      }
    },
    resetSelect (state) {
      state.selectSize = [0, 0]
    },
    startSelect (state, { start, tool }) {
      state.selectSize = [0, 0]
      state.selectStart = lowerBoundary(start)
      state.selectTool = tool
    },
  },
}
