import _ from 'lodash'
import Lang from './Lang'
import { FUNCTIONS_BARE } from '../constants.js'

function ifDoesntExist (id, callback) {
  if (!document.querySelector(id)) callback()
}

function loadScript (id, source, onLoad) {
  const script = document.createElement('script')

  script.src = source
  script.type = 'text/javascript'
  script.id = id
  script.setAttribute('crossorigin', 'anonymous')
  script.onload = onLoad
  document.querySelector('head').appendChild(script)
}

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

  // prettier-ignore
  PYTHON_TEMPLATE = `
from browser import window
` + FUNCTIONS_BARE.map(funcName => `
def ${_.snakeCase(funcName)}(*args):
  return window.${funcName}(*args)
`).join('\n')

  PYTHON_TEMPLATE_LENGTH = this.PYTHON_TEMPLATE.split('\n').length

  constructor (mars, onLoad) {
    super(mars)

    if (onLoad) {
      ifDoesntExist('python', () => {
        loadScript('python', 'https://s3.us-east-2.amazonaws.com/chicode/brython.js', onLoad)
      })
    }
  }

  transformPython (code) {
    return this.PYTHON_TEMPLATE + code
  }

  transformJS (code, scriptId) {
    return `
var $locals_${scriptId} = {}
${code};

const init = $locals___main__.init || (() => {})
const update = $locals___main__.update || (() => {})
const draw = $locals___main__.draw

${this.mars}
    `
  }

  convertWindowError ({ error, ...other }) {
    return this.convertError(error)
  }

  convertError (error) {
    // TODO find a way to get the location of runtime errors
    // https://github.com/brython-dev/brython/issues/938
    console.log('RUNTIME ERROR:')
    console.dir(error)
    return {
      message: `${error.args[0]}`,
    }
  }

  convertSyntaxError (e) {
    return {
      message: `${e.msg}: ${e.text.trim()}`,
      from: {
        line: e.lineno - this.PYTHON_TEMPLATE_LENGTH,
        ch: e.offset - 1,
      },
      to: {
        line: e.lineno - this.PYTHON_TEMPLATE_LENGTH,
        ch: e.offset,
      },
    }
  }

  async prepareCode (code) {
    // https://github.com/brython-dev/brython/issues/937

    const $B = window.__BRYTHON__
    if (!$B) {
      throw new Error('Brython is not loaded!')
    }

    $B.meta_path = $B.$meta_path.slice()
    if (!$B.use_VFS) {
      $B.meta_path.shift()
    }

    const scriptId = '__main__'

    let py = this.transformPython(code)
    // console.log('PYTHON CODE:\n', py)

    let js
    try {
      js = $B.py2js(py, scriptId, scriptId).to_js()
    } catch (e) {
      return {
        success: false,
        errors: [this.convertSyntaxError(e)],
      }
    }

    js = this.transformJS(js, scriptId)
    // console.log('JS CODE:\n', js)

    return {
      success: true,
      code: js,
    }
  }

  getSyntax ({ name, parameters }) {
    return `${name}(${parameters.join(', ')})`
  }
}
