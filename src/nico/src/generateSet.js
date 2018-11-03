import _ from 'lodash/fp'

export default function generateSet (variables) {
  return variables.reduce(
    (acc, val) => ({
      ...acc,
      ['set' + _.upperFirst(val)]: (state, value) => (state[val] = value),
    }),
    {},
  )
}
