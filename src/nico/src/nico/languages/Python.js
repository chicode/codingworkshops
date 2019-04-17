import _ from 'lodash/fp'
import Lang from './Lang'
import { FUNCTIONS_BARE } from '../constants.js'

let rustpython, rpProm

export default class Python extends Lang {
  name = 'Python'
  boilerplate = `def init():
  # initialize variables here
  pass

def update():
  # respond to player inputs and update game state here
  pass

def draw():
  # draw your game here
  pass
`

  constructor (onLoad) {
    super()

    if (onLoad && !rustpython) {
      rpProm = import('rustpython_wasm').then(rp => {
        rustpython = rp
      })
      rpProm.then(onLoad)
    }
  }

  async refresh (code, mars) {
    // https://github.com/brython-dev/brython/issues/937

    await rpProm

    // clear previous state
    rustpython.vmStore.destroy('mars')
    const vm = rustpython.vmStore.init('mars', false)

    for (const func of FUNCTIONS_BARE) {
      vm.addToScope(this.translateName(func), mars[func])
    }

    vm.setStdout()

    try {
      vm.exec(code)
    } catch (err) {
      console.error(err)
      return {
        success: false,
        errors: [err],
      }
    }

    const ret = {
      success: true,
    }
    for (const fn of ['init', 'draw', 'update']) {
      try {
        ret[fn] = vm.eval(fn) || (() => {})
      } catch (_) {
        ret[fn] = () => {}
      }
    }
    return ret
  }

  translateName (name) {
    return _.snakeCase(name)
  }

  getSyntax ({ name, parameters }) {
    return `${this.translateName(name)}(${parameters |> _.map(this.translateName) |> _.join(', ')})`
  }

  transformError (err) {
    return { message: err }
  }
}
