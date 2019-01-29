import _ from 'lodash/fp'

_.mixin({
  toObject: (keyFunc, valFunc, input) => _.zipObject(_.map(keyFunc, input), _.map(valFunc, input)),
})
