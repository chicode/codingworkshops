window.debug = (func) => (...args) => {
  console.log(`calling ${func.name} with args ${args.join(' ')}`)
  return func(...args)
}

window.c = console

window.p = console.log
