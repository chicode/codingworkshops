import Lang from './Lang'
import { compile } from '../compileBlocks'

export default class Blocks extends Lang {
  name = 'Blocks'
  boilerplate = '[]'

  constructor (onLoad) {
    super()
    onLoad()
  }

  async refresh (code, mars) {
    return {
      success: true,
      draw: eval(`(function(){${compile(JSON.parse(code))}})`),
      update: () => {},
      init: () => {},
    }
  }
}
