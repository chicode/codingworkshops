export default class Lang {
  needsLoading = false

  cleanup () {}

  convertWindowError (
    { lineno: lineNumber, colno: columnNumber, ...other },
    OFFSET = 0
  ) {
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
