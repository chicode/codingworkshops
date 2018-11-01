import _ from 'lodash'

_.mixin({
  toObject: (input, keyFunc = _.iteratee, valFunc = _.iteratee) =>
    _.zipObject(_.map(input, keyFunc), _.map(input, valFunc)),
})
