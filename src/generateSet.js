function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function generateSet (variables) {
  return variables.reduce(
    (acc, val) => ({
      ...acc,
      ['set' + capitalize(val)]: (state, value) => (state[val] = value),
    }),
    {},
  )
}
