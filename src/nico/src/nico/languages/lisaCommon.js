import * as lisavm from '@chicode/lisa-vm'
import { FUNCTIONS_ONLY } from '../constants'
import _ from 'lodash'

/** @returns {lisavm.values.Value["type"]} */
function paramTypeToLisaType (type) {
  switch (type) {
    case 'str':
    case 'button':
    case 'key':
      return 'str'
    case 'num':
    case 'sprite':
      return 'num'
  }
}

/** @returns {lisavm.Scope} */
export function initMarsProgram (mars) {
  const programScope = lisavm.initProgram()
  for (const func of FUNCTIONS_ONLY) {
    const marsFunc = mars[func.name]
    const lisaFuncName = _.kebabCase(func.name)

    programScope.parent.injectFunc(lisaFuncName, (loc, ...args) => {
      if (args.length !== func.parameters.length) {
        throw new lisavm.LisaError(`Wrong number of arguments to '${lisaFuncName}'`, loc)
      }

      return lisavm.jsToValue(
        marsFunc(
          ...args.map((val, i) => {
            const lisaType = paramTypeToLisaType(func.parameters[i].type)
            if (val[0].type !== lisaType) {
              throw new lisavm.LisaError(
                `Expected type '${lisaType}' for argument '${
                  func.parameters[i].name
                }' to '${lisaFuncName}', found ${val[0].type}`,
                val[1]
              )
            }
            return lisavm.valueToJs(val[0])
          })
        )
      )
    })
  }
  return programScope
}
