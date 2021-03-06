export function initMars ({ state, ctx, sprites, clear, tilemap, flags, language, onError }) {
  ctx.font = '.3rem Karla'
  ctx.textBaseline = 'top'

  const marsState = {}

  const mars = {}

  mars.state = marsState

  const tilemapCanvas = document.createElement('canvas')
  const tilemapCtx = tilemapCanvas.getContext('2d')

  const GRID_SIZE = 8
  mars.coordMulti = 1

  function updateTilemapCanvas () {
    tilemap.forEach((row, y) =>
      row.forEach((spriteI, x) => {
        if (spriteI !== null) {
          tilemapCtx.clearRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
          tilemapCtx.drawImage(sprites[spriteI], x * GRID_SIZE, y * GRID_SIZE)
        }
      })
    )
  }

  updateTilemapCanvas()

  // drawing

  mars.rect = (x, y, width, height, outline = false, color = null) => {
    ctx.rect(
      x * mars.coordMulti,
      y * mars.coordMulti,
      width * mars.coordMulti,
      height * mars.coordMulti
    )
    if (outline) {
      ctx.stroke()
    } else {
      ctx.fill()
    }
  }

  mars.sprite = (i, x, y) => {
    ctx.drawImage(sprites[i], Math.floor(x) * GRID_SIZE, Math.floor(y) * GRID_SIZE)
  }

  mars.point = (x, y) => {
    ctx.rect(x * mars.coordMulti, y * mars.coordMulti, mars.coordMulti, mars.coordMulti)
    ctx.fill()
  }

  mars.line = (x0, y0, x1, y1) => {
    ctx.beginPath()
    ctx.moveTo(x0, y0)

    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1
    const sy = y0 < y1 ? 1 : -1
    let err = dx - dy

    while (x0 !== x1 && y0 !== y1) {
      if (2 * err > -dy) {
        err -= dy
        x0 += sx
      } else if (2 * err < dx) {
        err += dx
        y0 += sy
      }
      ctx.lineTo(x0, y0)
    }
    ctx.stroke()
  }

  mars.text = (text, x, y) => {
    ctx.fillText(text, x * mars.coordMulti, y * mars.coordMulti)
  }

  mars.tilemap = () => {
    ctx.drawImage(tilemapCanvas, 0, 0)
  }

  // key

  marsState.keys = {}
  marsState.keysPressed = {}

  document.addEventListener('keydown', event => {
    marsState.keys[event.key] = true
    // console.log(`"${event.key}" pressed!`)
  })

  document.addEventListener('keyup', event => {
    delete marsState.keys[event.key]
    marsState.keysPressed[event.key] = true
    // console.log(`"${event.key}" released!`)
  })

  mars.getKeys = () => marsState.keys

  mars.keyDown = key => {
    return !!marsState.keys[key]
  }

  mars.keyUp = key => {
    return !marsState.keys[key]
  }

  mars.keyPressed = key => {
    return !!marsState.keysPressed[key]
  }

  // button

  const mouseButtons = {
    0: 'left',
    1: 'middle',
    2: 'right',
  }
  marsState.buttons = {}
  marsState.buttonsPressed = {}
  document.addEventListener('mousedown', event => {
    marsState.buttons[mouseButtons[event.button]] = true
  })
  document.addEventListener('mouseup', event => {
    marsState.buttons[mouseButtons[event.button]] = false
    marsState.buttonsPressed[mouseButtons[event.button]] = true
  })
  document.addEventListener('mouseout', event => {
    marsState.buttons[mouseButtons[event.button]] = false
    marsState.buttonsPressed[mouseButtons[event.button]] = true
  })

  marsState.mouseCoordinates = [0, 0]
  document.addEventListener('mousemove', event => {
    marsState.mouseCoordinates = [event.pageX, event.pageY]
  })

  mars.getButtons = () => marsState.buttons

  mars.buttonDown = button => {
    return !!marsState.buttons[button]
  }

  mars.buttonUp = button => {
    return !marsState.buttons[button]
  }

  mars.buttonPressed = button => {
    return !!marsState.buttonsPressed[button]
  }

  // tilemap

  mars.hasFlag = (flag, x, y) => {
    try {
      return !!flags[Math.floor(x)][Math.floor(y)][flag]
    } catch (e) {}
  }

  mars.getTile = (x, y) => {
    try {
      return tilemap[Math.floor(x)][Math.floor(y)]
    } catch (e) {}
  }

  mars.changeTile = (i, x, y) => {
    try {
      tilemap[Math.floor(x)][Math.floor(y)] = i
      updateTilemapCanvas()
    } catch (e) {}
  }

  mars.delay = 1000 / 20
  let time = Date.now()

  const main = () => {
    const { updateFunc, drawFunc } = state
    try {
      if (!state.paused) {
        if (Date.now() - time >= mars.delay) {
          updateFunc()
          time = Date.now()
        }
        if (clear) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        drawFunc()
      }
      if (state.running) window.requestAnimationFrame(main)
      marsState.keysPressed = {}
      marsState.buttonsPressed = {}
    } catch (err) {
      console.error(err)
      onError(language.transformError(err))
    }
  }
  const updateMarsParams = ({
    state: state_,
    ctx: ctx_,
    sprites: sprites_,
    clear: clear_,
    tilemap: tilemap_,
    flags: flags_,
    language: language_,
    onError: onError_,
  }) => {
    state = state_
    ctx = ctx_
    sprites = sprites_
    clear = clear_
    tilemap = tilemap_
    flags = flags_
    language = language_
    onError = onError_
  }
  return [main, mars, updateMarsParams]
}
