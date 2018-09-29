import { generateDelete } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./DeleteWorkshop.gql'),
  variables,
  update: generateDelete(
    variables,
    'userWorkshops',
    require('../q/UserWorkshops.gql'),
    queryVariables,
  ),
})
