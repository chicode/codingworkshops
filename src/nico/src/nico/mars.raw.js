/* global load, update, draw, _env */
/* eslint-disable no-unused-vars */

if (typeof draw !== 'function') throw new Error('You must define a "draw" function.')

const UPDATE_WAIT = 3

function rect (x, y, width, height, outline = false, color = null) {
  _env.ctx.rect(x, y, width, height)
  if (outline) {
    _env.ctx.stroke()
  } else {
    _env.ctx.fill()
  }
}

function sprite (i, x, y) {
  _env.ctx.putImageData(_env.sprites[i], x, y)
}

if (typeof load === 'function') load()

const main = () => {
  if (!_env.state.paused) {
    if (typeof update === 'function') update()
    _env.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    draw()
  }
  if (_env.state.running) window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
