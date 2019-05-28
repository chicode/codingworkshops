import { Elm } from './lisa/src/Main.elm'
import Lang from './Lang'
import _ from 'lodash'
import * as lisavm from '@chicode/lisa-vm'
import { initMarsProgram } from './lisaCommon'

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

  async refresh (code, mars) {
    try {
      const program = await processLisa(code)
      const programScope = initMarsProgram(mars)
      lisavm.evalExpressions(programScope, program)
      const ret = {
        success: true,
      }
      for (const funcName of ['draw', 'update', 'init']) {
        ret[funcName] = () => {
          const func = programScope.getVar(funcName)
          if (func) {
            lisavm.callFunction(func.value, null, [])
          }
        }
      }
      return ret
    } catch (e) {
      return {
        success: false,
        errors: [this.transformError(e)],
      }
    }
  }

  getSyntax ({ name, parameters }) {
    return `(${_.kebabCase(name)}${parameters.map(({ name }) => ' ' + _.kebabCase(name))})`
  }
}
