import _ from 'lodash'
import { FLAG_NUMBER } from '../constants'

import historyPlugin from '../../image-editor/store/history-plugin'
import sprite from '../../image-editor/store'
import tileSelect from './tile-select'

import { transformData } from '../../image-editor/helpers'
import { getCoordsFromIndex } from '../../image-editor/bucket-fill'
import { GRID_NUMBER, GRID_SIZE, CANVAS_SIZE, SCALE } from '../../image-editor/constants'

export const history = historyPlugin(['tile', 'sprite'], (store) => {
  // hacky fix to save spritesheet without mutation
  window.localStorage.setItem('tilesheet', store.state.sprite.sprite.spritesheet)
  window.lastCoords = [null, null]
})

export function getStoredFlags () {
  const flags = window.localStorage.getItem('flags')
  if (flags) {
    try {
      return JSON.parse(flags)
    } catch (e) {}
  }
  return _.range(GRID_NUMBER).map(() =>
    _.range(GRID_NUMBER).map(() => Array(FLAG_NUMBER).fill(false)),
  )
}

export default _.merge(sprite('tile', CANVAS_SIZE), {
  modules: {
    sprite: {
      getters: {
        spritesheetDisplay: (state, getters, _rootState, rootGetters) => () => {
          const sprites = rootGetters['sprite/sprite/rawSprites']
          const tilemap = getters.tilemap()

          console.log(tilemap)
          return transformData(null, (ctx) => {
            tilemap.forEach((row, y) =>
              row.forEach((spriteI, x) => {
                if (spriteI !== null) {
                  ctx.putImageData(sprites[spriteI], x * GRID_SIZE, y * GRID_SIZE)
                }
              }),
            )
          })
        },
        tilemap: (state) => () => {
          const result = _.range(GRID_NUMBER).map(() => Array(GRID_NUMBER))

          _.range(0, state.spritesheet.length, 4).forEach((i) => {
            const spriteX = state.spritesheet[i]
            const spriteY = state.spritesheet[i + 1]
            const [y, x] = getCoordsFromIndex(i)
            if (x < GRID_NUMBER && y < GRID_NUMBER) {
              if (state.spritesheet[i + 3]) {
                result[x][y] = spriteY * GRID_SIZE + spriteX
              } else {
                result[x][y] = null
              }
            }
          })
          return result
        },
      },
    },
    tileSelect,
  },
  state: () => ({
    ...sprite('tile', CANVAS_SIZE).state(),
    flags: getStoredFlags(),
  }),
  mutations: {
    setFlags (state, flags) {
      const newFlags = _.cloneDeep(state.flags)
      const [x, y] = state.tileSelect.selectStart.map((coord) =>
        Math.floor(coord / (GRID_SIZE * SCALE)),
      )
      newFlags[x][y] = flags
      state.flags = newFlags
      window.localStorage.setItem('flags', JSON.stringify(newFlags))
    },
  },
  actions: {
    toggleFlag ({ commit, getters }, i) {
      const flags = getters.currentFlags
      flags[i] = !flags[i]
      commit('setFlags', flags)
    },
  },
  getters: {
    getCoordsFromEvent: (state) => (event) => {
      return [event.offsetX, event.offsetY].map((coord) => Math.floor(coord / SCALE / GRID_SIZE))
    },
    currentFlags: (state, getters) => {
      const [x, y] = getters['tileSelect/selectStartCoords']
      return state.flags[x][y].slice()
    },
  },
})
