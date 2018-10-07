/* global _state, _ctx, _sprites, draw, init, update */
/* eslint-disable no-unused-vars */

if (typeof draw === 'undefined' || !draw) throw new Error('You must define a "draw" function.')

const SCALE = 10

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

init()

// this being an arrow function is important because it makes the browser treat
// the errors thrown inside of the function as normal errors and not cross-origin errors
const main = () => {
  if (!_state.paused) {
    update()
    _ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    draw()
  }
  if (_state.running) window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
