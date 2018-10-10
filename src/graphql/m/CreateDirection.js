import { generateCreate } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./CreateDirection.gql'),
  variables,
  update: generateCreate(
    'DirectionType',
    variables,
    'slide',
    require('../q/Slide.gql'),
    queryVariables,
    'directionSet',
  ),
})
