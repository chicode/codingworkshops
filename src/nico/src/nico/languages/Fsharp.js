import ServerLang from './ServerLang'

export default class Fsharp extends ServerLang {
  name = 'Fsharp'
  boilerplate = `let init () =
  // initialize variables here

let update () =
  // respond to player inputs and update game state here

let draw () =
  // draw your game here
`

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

  getSyntax ({ name, parameters }) {
    return `${name} ${parameters.join(' ')}`
  }
}
