export function compile (blocks) {
  let source = ''
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
    default:
      throw new Error(`invalid block type: ${JSON.stringify(block)}`)
  }
}

export function compileExpr (expr) {
  switch (expr.type) {
    case 'literal':
      return JSON.stringify(expr.value)
  }
}
