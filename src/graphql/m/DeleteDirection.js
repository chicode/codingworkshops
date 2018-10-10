import { generateDelete } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./DeleteDirection.gql'),
  variables,
  update: generateDelete(
    variables,
    'slide',
    require('../q/Slide.gql'),
    queryVariables,
    'directionSet',
  ),
})
