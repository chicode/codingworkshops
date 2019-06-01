import { Elm } from './lisa/src/Main.elm'
import Lang from './Lang'
import _ from 'lodash'
import { makeExecutor } from '../pureMars'

const app = Elm.Main.init()

const processLisa = source =>
  new Promise((resolve, reject) => {
    app.ports.out.subscribe(sub)
    app.ports.incoming.send(source)
    function sub (result) {
      app.ports.out.unsubscribe(sub)

      if (result.status === 'ok') {
        resolve(result.result)
      } else {
        reject(result.error)
      }
    }
  })

export default class Lisa extends Lang {
  name = 'Lisa'

  transformError (err) {
    return {
      message: err.msg || err.message,
      from: {
        line: err.location.startRow - 1,
        ch: err.location.startCol - 1,
      },
      to: {
        line: err.location.endRow - 1,
        ch: err.location.endCol - 1,
      },
    }
  }

  async refresh (code, mars, libLevel) {
    try {
      const program = await processLisa(code)
      return makeExecutor(program, mars, libLevel)
    } catch (e) {
      console.error(e)
      return {
        success: false,
        errors: [this.transformError(e)],
      }
    }
  }

  getSyntax ({ name, parameters }) {
    return `(${name}${parameters.map(({ name }) => ' ' + name)})`
  }
}
