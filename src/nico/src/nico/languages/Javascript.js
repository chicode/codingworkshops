import Lang from './Lang'

export default class Javascript extends Lang {
  language = 'javascript'

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
}
