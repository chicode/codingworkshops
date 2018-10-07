import Lang from './Lang'

export default class Javascript extends Lang {
  prepareCode (code) {
    return {
      success: true,
      code: `
${code};

const init = init || (() => {})
const update = update || (() => {})

${this.mars}
      `,
    }
  }
}
