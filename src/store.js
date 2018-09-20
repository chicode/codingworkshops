import nico from '@/nico/src/store'
import codingworkshops from '@/codingworkshops/store.js'

export default {
  ...nico,
  modules: {
    ...nico.modules,
    codingworkshops,
  },
}

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function generateSet (variables) {
  return variables.reduce(
    (acc, val) => ({
      ...acc,
      ['set' + capitalize(val)]: (state, value) => (state[val] = value),
    }),
    {},
  )
}
