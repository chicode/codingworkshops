/* global load, update, draw */
/* eslint-disable no-unused-vars */

if (typeof draw !== 'function') throw new Error('You must define a "draw" function.')

function send (cmd, payload) {
  postMessage({ cmd, payload })
}

const rect = (...params) => send('rect', params)

const sprite = (...params) => send('sprite', params)

function main () {
  if (typeof update === 'function') update()
  draw()

  if (_running) self.requestAnimationFrame(main)
}

let _running = true
addEventListener(
  'message',
  function ({ data: { cmd, payload } }) {
    switch (cmd) {
      case 'init':
        if (typeof load === 'function') load()

        requestAnimationFrame(main)
        break

      case 'pause':
        _running = false
        break

      case 'resume':
        _running = true
        requestAnimationFrame(main)
        break
    }
  },
  false,
)
