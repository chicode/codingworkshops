/* global _state, _ctx, _sprites, _clear, _tilemap, _flags, draw, init, update */
/* eslint-disable no-unused-vars */

if (typeof draw === 'undefined' || !draw) throw new Error('You must define a "draw" function.')

const _mars = {}
;((_mars) => {
  const tilemapCanvas = document.createElement('canvas')
  const tilemapCtx = tilemapCanvas.getContext('2d')

  const GRID_SIZE = 8

  function updateTilemapCanvas () {
    _tilemap.forEach((row, y) =>
      row.forEach((spriteI, x) => {
        if (spriteI !== null) {
          tilemapCtx.clearRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
          tilemapCtx.drawImage(_sprites[spriteI], x * GRID_SIZE, y * GRID_SIZE)
        }
      }),
    )
  }

  updateTilemapCanvas()

  // drawing

  window.rect = (x, y, width, height, outline = false, color = null) => {
    _ctx.rect(x * GRID_SIZE, y * GRID_SIZE, width, height)
    if (outline) {
      _ctx.stroke()
    } else {
      _ctx.fill()
    }
  }

  window.sprite = (i, x, y) => {
    _ctx.drawImage(_sprites[i], x * GRID_SIZE, y * GRID_SIZE)
  }

  window.point = (x, y) => {
    _ctx.rect(x * GRID_SIZE, y * GRID_SIZE, 1, 1)
  }

  window.line = (x1, y1, x2, y2) => {
    _ctx.beginPath()
    _ctx.moveTo(x1, y1)
    _ctx.lineTo(x2, y2)
    _ctx.stroke()
  }

  window.text = (text, x, y) => _ctx.fillText(text, x, y)

  window.tilemap = () => {
    _ctx.drawImage(tilemapCanvas, 0, 0)
  }

  // key

  _mars.keys = {}
  _mars.keysPressed = {}
  document.addEventListener('keydown', (event) => {
    _mars.keys[event.key] = true
    // console.log(`"${event.key}" pressed!`)
  })

  document.addEventListener('keyup', (event) => {
    _mars.keys[event.key] = false
    _mars.keysPressed[event.key] = true
    // console.log(`"${event.key}" released!`)
  })

  window.getKeys = () => _mars.keys

  window.keyDown = (key) => {
    return !!_mars.keys[key]
  }

  window.keyUp = (key) => {
    return !_mars.keys[key]
  }

  window.keyPressed = (key) => {
    return !!_mars.keysPressed[key]
  }

  // button

  const mouseButtons = {
    0: 'left',
    1: 'middle',
    2: 'right',
  }
  _mars.buttons = {}
  _mars.buttonsPressed = {}
  document.addEventListener('mousedown', (event) => {
    _mars.buttons[mouseButtons[event.button]] = true
  })
  document.addEventListener('mouseup', (event) => {
    _mars.buttons[mouseButtons[event.button]] = false
    _mars.buttonsPressed[mouseButtons[event.button]] = true
  })
  document.addEventListener('mouseout', (event) => {
    _mars.buttons[mouseButtons[event.button]] = false
    _mars.buttonsPressed[mouseButtons[event.button]] = true
  })

  let mouseCoordinates = [0, 0]
  document.addEventListener('mousemove', (event) => {
    mouseCoordinates = [event.pageX, event.pageY]
  })

  window.getButtons = () => _mars.buttons

  window.buttonDown = (button) => {
    return !!_mars.buttons[button]
  }

  window.buttonUp = (button) => {
    return !_mars.buttons[button]
  }

  window.buttonPressed = (button) => {
    return !!_mars.buttonsPressed[button]
  }

  // tilemap

  window.hasFlag = (flag, x, y) => {
    return !!_flags[x][y][flag]
  }

  window.getTile = (x, y) => {
    return _tilemap[x][y]
  }

  window.changeTile = (i, x, y) => {
    _tilemap[x][y] = i
    updateTilemapCanvas()
  }
})(_mars)

init()

// this being an arrow function is important because it makes the browser treat
// the errors thrown inside of the function as normkl errors and not cross-origin errors
const _main = () => {
  if (!_state.paused) {
    update()
    if (_clear) _ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    draw()
  }
  if (_state.running) window.requestAnimationFrame(_main)
  _mars.keysPressed = {}
  _mars.buttonsPressed = {}
}
window.requestAnimationFrame(_main)
