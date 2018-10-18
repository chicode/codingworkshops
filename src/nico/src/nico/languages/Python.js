import _ from 'lodash'
import Lang from './Lang'
import { FUNCTIONS } from '../constants.js'

function ifDoesntExist (id, callback) {
  if (!document.querySelector(id)) callback()
}

function loadScript (id, source) {
  const script = document.createElement('script')

  script.src = source
  script.type = 'text/javascript'
  script.id = id
  script.setAttribute('crossorigin', 'anonymous')
  document.querySelector('head').appendChild(script)
}

export default class Python extends Lang {
  // prettier-ignore
  PYTHON_TEMPLATE = `
from browser import window
` + FUNCTIONS.map(funcName => `
def ${_.snakeCase(funcName)}(*args):
  return window.${funcName}(*args)
`).join('\n')

  PYTHON_TEMPLATE_LENGTH = this.PYTHON_TEMPLATE.split('\n').length

  constructor (...args) {
    super(...args)

    ifDoesntExist('python', () => {
      // loadScript('python', 'https://cdnjs.cloudflare.com/ajax/libs/brython/3.6.2/brython.min.js')
      loadScript(
        'python',
        'https://cdn.rawgit.com/brython-dev/brython/6dbf1e30eb45887283f30623ae9a9bdfcfa570fc/www/src/brython_dist.js',
      )
    })
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
    console.log('PYTHON CODE:\n', py)

    let js
    try {
      js = $B.py2js(py, scriptId, scriptId).to_js()
    } catch (e) {
      console.dir(e)
      return {
        success: false,
        errors: [this.convertError(e)],
      }
    }

    js = this.transformJS(js, scriptId)
    console.log('JS CODE:\n', js)

    return {
      success: true,
      code: js,
    }
  }
}
