/* global _state, _ctx, _sprites, _clear, draw, init, update */
/* eslint-disable no-unused-vars */

if (typeof draw === 'undefined' || !draw) throw new Error('You must define a "draw" function.')

const SCALE = 10
const _mars = {}
;((_mars) => {
  // drawing

  window.rect = (x, y, width, height, outline = false, color = null) => {
    _ctx.rect(x * SCALE, y * SCALE, width * SCALE, height * SCALE)
    if (outline) {
      _ctx.stroke()
    } else {
      _ctx.fill()
    }
  }

  window.sprite = (i, x, y) => {
    _ctx.putImageData(_sprites[i], x * SCALE, y * SCALE)
  }

  window.point = (x, y) => {
    _ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE)
  }

  window.line = (x1, y1, x2, y2) => {
    _ctx.beginPath()
    _ctx.moveTo(x1, y1)
    _ctx.lineTo(x2, y2)
    _ctx.stroke()
  }

  window.text = (text, x, y) => _ctx.fillText(text, x, y)

  // TODO window.map = () => {}

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
    // || false because this function should return true or false, not undefined
    // console.log(_mars.keys, key, _mars.keys[key])
    return _mars.keys[key] || false
  }

  window.keyUp = (key) => {
    return !_mars.keys[key] || true
  }

  window.keyPressed = (key) => {
    return _mars.keysPressed[key] || false
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
    return _mars.buttons[button] || false
  }

  window.buttonUp = (button) => {
    return !_mars.buttons[button] || true
  }

  window.buttonPressed = (button) => {
    return _mars.buttonsPressed[button] || false
  }

  /* TODO

  // tilemap

  window.hasFlag = (x, y) => {}

  window.moveTile = (x, y, newX, newY) => {}

  window.deleteTile = (x, y) => {}

  window.createTile = (x, y, tile) => {}
  */
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
