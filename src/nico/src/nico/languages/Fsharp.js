import ServerLang from './ServerLang'

export default class Python extends ServerLang {
  language = 'fsharp'

  transformCode (code) {
    // the var is required because `require` is defined without a declaration
    return `
var ${code};
const module = require('4')

const init = module.init || (() => {})
const update = module.update || (() => {})
const draw = module.draw

${this.mars}
    `
  }
}
