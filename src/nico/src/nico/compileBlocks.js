export function compile (blocks) {
  let source = 'var vars = {};'
  for (const block of blocks) {
    source += `;${compileBlock(block)};\n`
  }
  return source
}

export function compileBlock (block) {
  switch (block.type) {
    case 'if':
      return `if(${compileExpr(block.condition)}){${compile(block.children)}}`
    case 'while':
      return `while(${compileExpr(block.condition)}){${compile(block.children)}}`
    case 'callMars':
      return `mars[${JSON.stringify(block.func)}](${block.params.map(compileExpr).join(',')})`
    case 'setVar':
      return `vars[${JSON.stringify(block.varname)}]=${compileExpr(block.expr)}`
    default:
      throw new Error(`invalid block type: ${JSON.stringify(block)}`)
  }
}

export function compileExpr (expr) {
  switch (expr.type) {
    case 'literal':
      return JSON.stringify(expr.value)
    case 'getVar':
      return `vars[${JSON.stringify(expr.varname)}]`
    default:
      throw new Error(`invalid expr type: ${JSON.stringify(expr)}`)
  }
}
