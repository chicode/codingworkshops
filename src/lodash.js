import _ from 'lodash/fp'

export const toObject = _.curry((keyFunc, valFunc, input) =>
  _.zipObject(_.map(keyFunc, input), _.map(valFunc, input)),
)
