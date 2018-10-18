import _ from 'lodash'

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

export default _.merge(sprite('tile', CANVAS_SIZE), {
  modules: {
    sprite: {
      getters: {
        spritesheetDisplay: (state, getters_, rootState_, rootGetters) => () => {
          const sprites = rootGetters['sprite/sprite/rawSprites']
          return transformData(null, (ctx) => {
            _.range(0, state.spritesheet.length, 4).forEach((i) => {
              if (state.spritesheet[i + 3]) {
                // the coordinates of the original sprite are encoded into the color of the tilesheet
                const spriteX = state.spritesheet[i]
                const spriteY = state.spritesheet[i + 1]
                const [x, y] = getCoordsFromIndex(i)
                // console.log(i, x, y)
                // make sure that the sprites are drawn in grid increments
                ctx.putImageData(
                  sprites[spriteY * GRID_NUMBER + spriteX],
                  x * GRID_SIZE,
                  y * GRID_SIZE,
                )
              }
            })
          })
        },
      },
    },
    tileSelect,
  },
  getters: {
    getCoordsFromEvent: (state) => (event) => {
      return [event.offsetX, event.offsetY].map((coord) => Math.floor(coord / SCALE / GRID_SIZE))
    },
  },
})
