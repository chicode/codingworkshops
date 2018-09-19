/* global _state, _ctx, _sprites, draw, init, update */
/* eslint-disable no-unused-vars */

if (!draw) throw new Error('You must define a "draw" function.')

window.rect = (x, y, width, height, outline = false, color = null) => {
  _ctx.rect(x, y, width, height)
  if (outline) {
    _ctx.stroke()
  } else {
    _ctx.fill()
  }
}

window.sprite = (i, x, y) => {
  _ctx.putImageData(_sprites[i], x, y)
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
