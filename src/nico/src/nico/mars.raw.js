/* global _module, _env */

if (typeof _module.draw !== 'function') throw new Error('You must define a "draw" function.')

window.rect = (x, y, width, height, outline = false, color = null) => {
  _env.ctx.rect(x, y, width, height)
  if (outline) {
    _env.ctx.stroke()
  } else {
    _env.ctx.fill()
  }
}

window.sprite = (i, x, y) => {
  _env.ctx.putImageData(_env.sprites[i], x, y)
}

if (typeof _module.load === 'function') _module.load()

const main = () => {
  if (!_env.state.paused) {
    if (typeof _module.update === 'function') _module.update()
    _env.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    _module.draw()
  }
  if (_env.state.running) window.requestAnimationFrame(main)
}
window.requestAnimationFrame(main)
