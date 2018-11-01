import Lang from './Lang'

export default class Javascript extends Lang {
  name = 'Javascript'
  boilerplate = `function init () {
  // initialize variables here
}

function update () {
  // respond to player inputs and update game state here
}

function draw () {
  // draw your game here
}
`

  async prepareCode (code) {
    return {
      success: true,
      code: `
${code};

var init = init || (() => {})
var update = update || (() => {})

${this.mars}
      `,
    }
  }

  getSyntax ({ name, parameters }) {
    return `${name}(${parameters.join(', ')})`
  }
}
