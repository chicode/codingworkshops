function lowerLimit (n) {
  return n < 0 ? 0 : n
}

export default class Lang {
  needsLoading = false

  constructor (mars) {
    this.mars = mars
  }

  cleanup () {}

  convertWindowError ({ lineno: lineNumber, colno: columnNumber, ...other }, OFFSET = 0) {
    return Object.freeze({
      ...other,

      from: {
        line: lineNumber - 1 - OFFSET,
        ch: columnNumber - 1,
      },
      to: {
        line: lineNumber - 1 - OFFSET,
        ch: columnNumber,
      },
    })
  }
}
