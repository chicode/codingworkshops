import Lang from './Lang'

function ifDoesntExist (id, callback) {
  if (!document.querySelector(id)) callback()
}

function loadScript (id, source) {
  const script = document.createElement('script')

  script.src = source
  script.type = 'text/javascript'
  script.id = id
  document.querySelector('head').appendChild(script)
}

export default class Python extends Lang {
  PYTHON_TEMPLATE = `
from browser import window

def sprite(*args):
  window.sprite(*args)
`
  PYTHON_TEMPLATE_LENGTH = this.PYTHON_TEMPLATE.split('\n').length

  constructor (...args) {
    super(...args)

    ifDoesntExist('python', () => {
      // loadScript('python', 'https://cdnjs.cloudflare.com/ajax/libs/brython/3.6.2/brython.min.js')
      loadScript('python', 'https://rawgit.com/brython-dev/brython/master/www/src/brython_dist.js')
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

  convertError ({ lineno, offset, msg, text }) {
    return {
      message: `${msg}: ${text.trim()}`,
      from: {
        line: lineno - this.PYTHON_TEMPLATE_LENGTH,
        ch: offset - 1,
      },
      to: {
        line: lineno - this.PYTHON_TEMPLATE_LENGTH,
        ch: offset,
      },
    }
  }

  async prepareCode (code) {
    // https://github.com/brython-dev/brython/issues/937

    const $B = window.__BRYTHON__
    if (!$B) {
      throw new Error('Brython is not loaded!')
    }

    // for later cleanup
    this.metaPath = $B.meta_path

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

    if ($B.use_VFS) {
      $B.meta_path.push($B.$meta_path[0])
    }
    $B.meta_path = $B.meta_path.concat($B.$meta_path.slice(1))

    return {
      success: true,
      code: js,
    }
  }

  cleanup () {
    window.__BRYTHON__.meta_path = this.metaPath
  }
}
