import nico from './nico/store'
import sprite, { history } from './sprite/store'

export default {
  modules: {
    nico,
    sprite,
  },
  plugins: [history],
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
