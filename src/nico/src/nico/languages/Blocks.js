import Lang from './Lang'
import * as lisavm from '@chicode/lisa-vm'
import { initMarsProgram } from './lisaCommon'

/** @returns {lisavm.ast.Expression} */
function compileBlocks (blocks) {
  return {
    type: 'do',
    body: blocks.map(compileBlock),
  }
}

/** @returns {lisavm.ast.Expression} */
export function compileBlock (block) {
  switch (block.type) {
    case 'if':
      return {
        type: 'if',
        cond: compileExpr(block.condition),
        body: compileBlocks(block.children),
      }
    case 'while':
      return {
        type: 'while',
        cond: compileExpr(block.condition),
        body: compileBlocks(block.children),
      }
    case 'callMars':
      return {
        type: 'funcCall',
        func: {
          name: block.func,
        },
        args: block.params.map(compileExpr),
      }
    case 'setVar':
      return {
        type: 'setVar',
        var: block.varname,
        val: compileExpr(block.expr),
      }
    default:
      throw new Error(`invalid block type: ${JSON.stringify(block)}`)
  }
}

/** @returns {lisavm.ast.Expression} */
export function compileExpr (expr) {
  switch (expr.type) {
    case 'literal':
      switch (typeof expr.value) {
        case 'string':
          return {
            type: 'strLit',
            value: expr.value,
          }
        case 'number':
          return {
            type: 'numLit',
            value: expr.value,
          }
      }
      return
    case 'getVar':
      return {
        type: 'getVar',
        var: expr.varname,
      }
    default:
      throw new Error(`invalid expr type: ${JSON.stringify(expr)}`)
  }
}

export default class Blocks extends Lang {
  name = 'Blocks'
  boilerplate = '[]'

  async refresh (code, mars) {
    const programScope = initMarsProgram(mars)
    lisavm.evalExpression(programScope, {
      type: 'defFunc',
      name: { name: 'draw' },
      func: {
        params: [],
        body: JSON.parse(code).map(compileBlock),
      },
    })
    const drawFunc = programScope.getVar('draw').value
    return {
      success: true,
      draw: () => {
        lisavm.callFunction(drawFunc, null, [])
      },
      update: () => {},
      init: () => {},
    }
  }
}
