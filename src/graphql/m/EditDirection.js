import { generateEdit } from '../mutation-helpers'

export default (variables) => ({
  mutation: require('./EditDirection.gql'),
  variables,
  update: generateEdit('DirectionType', variables, require('../f/Direction.gql')),
})
