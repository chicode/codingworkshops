import {
  getCanvasFromData,
  getCanvasFromData2,
  scaleCanvas,
  scale,
  transformData,
  createCanvas
} from '../helpers'
import { GRID_NUMBER, GRID_SIZE, SCALE } from '../constants'
import bucketFill, { correctAntialiasing } from '../bucket-fill'

export function getStoredSpritesheet (rootModule, CANVAS_SIZE) {
  const spritesheet = window.localStorage.getItem(rootModule + 'sheet')
  if (spritesheet) {
    try {
      return JSON.parse('[' + window.localStorage.getItem(rootModule + 'sheet') + ']')
    } catch (e) {}
  }
  return new Array(CANVAS_SIZE ** 2 * 4)
}

export default (rootModule, CANVAS_SIZE) => ({
  namespaced: true,

  state: () => ({
    spritesheet: getStoredSpritesheet(rootModule, CANVAS_SIZE),
  }),

  getters: {
    sprites: (state) => {
      const ctx = getCanvasFromData(state.spritesheet).getContext('2d')

      let sprites = []
      for (let y = 0; y < GRID_NUMBER; y++) {
        for (let x = 0; x < GRID_NUMBER; x++) {
          sprites.push(
            createCanvas(ctx.getImageData(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE), GRID_SIZE, GRID_SIZE),
          )
        }
      }
      return sprites
    },
    rawSprites: (state) => {
      const ctx = getCanvasFromData(state.spritesheet).getContext('2d')
      let sprites = []
      for (let y = 0; y < GRID_NUMBER; y++) {
        for (let x = 0; x < GRID_NUMBER; x++) {
          sprites.push(ctx.getImageData(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE))
        }
      }
      return sprites
    },
    spritesheetDisplay: (state) => () => state.spritesheet,
  },

  mutations: {
    setSpritesheet (state, data) {
      state.spritesheet = data
      window.localStorage.setItem(rootModule + 'sheet', state.spritesheet)
    },
  },

  actions: {
    handleAction ({ state, commit, getters, rootGetters, rootState }, payload) {
      let imageData

      const rootModuleState = rootState[rootModule]

      if (payload.type === 'tool' && rootModuleState.tool === 'bucket') {
        imageData = bucketFill(state.spritesheet, payload.coords, rootModuleState.color)
      } else {
        let ellipse
        if (payload.type === 'selection' && rootModuleState.select.selectTool === 'circle-select') {
          let ellipseData = transformData(null, (ctx) => {
            ctx.fillStyle = rootModuleState.color
            ctx.beginPath()
            ctx.ellipse(...rootGetters['sprite/select/getCircleParams'], 0, 0, Math.PI * 2)
            ctx.fill()
          })
          // the canvas doesn't support turning off antialiasing,
          // so sometimes it's necessary to correct the antialiased pixels
          // TODO: remove this hack when the browsers come out with a decent canvas api that includes the ability to control antialiasing
          correctAntialiasing(ellipseData, rootModuleState.color)
          // 2 function is used so that this doesn't interfere with the other canvas below
          ellipse = getCanvasFromData2(ellipseData)
        }

        imageData = transformData(state.spritesheet, (ctx) => {
          if (payload.type === 'clear') {
            ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
          } else if (payload.type === 'selection') {
            if (rootModuleState.select.selectTool === 'rectangle-select') {
              ctx.fillStyle = rootModuleState.color
              ctx.fillRect(...rootGetters['sprite/select/getRectParams'])
            } else if (rootModuleState.select.selectTool === 'circle-select') {
              ctx.drawImage(ellipse, 0, 0)
            }
          } else if (payload.type === 'tool') {
            const width = rootModuleState.width
            const params = [
              payload.coords[0] - Math.floor(width / 2),
              payload.coords[1] - Math.floor(width / 2),
              width,
              width,
            ]
            if (rootGetters['sprite/isTool'](['pencil'])) {
              ctx.fillStyle = rootModuleState.color
              ctx.fillRect(...params)
            } else if (rootGetters['sprite/isTool'](['eraser'])) {
              ctx.clearRect(...params)
            }
          }
        })
      }

      commit('setSpritesheet', imageData)
    },

    clear ({ dispatch }) {
      dispatch('handleAction', { type: 'clear' })
    },
  },
})
