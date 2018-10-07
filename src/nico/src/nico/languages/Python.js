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
  language = 'python'

  constructor (...args) {
    super(...args)

    ifDoesntExist('python', () => {
      // loadScript('python', 'https://cdnjs.cloudflare.com/ajax/libs/brython/3.6.2/brython.min.js')
      loadScript('python', 'https://rawgit.com/brython-dev/brython/master/www/src/brython_dist.js')
    })
  }

  transformPython (code) {
    return `
from browser import window

def sprite(*args):
  window.sprite(*args)

${code}
    `
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

  async prepareCode (code) {
    // https://github.com/brython-dev/brython/issues/937

    const $B = window.__BRYTHON__
    // for later cleanup
    this.metaPath = $B.meta_path
    const scriptId = '__main__'

    const js = $B.py2js(this.transformPython(code), scriptId, scriptId).to_js()

    if ($B.use_VFS) {
      $B.meta_path.push($B.$meta_path[0])
    }
    $B.meta_path = $B.meta_path.concat($B.$meta_path.slice(1))

    return {
      success: true,
      code: this.transformJS(js, scriptId),
    }
  }

  cleanup () {
    window.__BRYTHON__.meta_path = this.metaPath
  }
}
