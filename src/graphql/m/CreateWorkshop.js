import { generateCreate } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./CreateWorkshop.gql'),
  variables,
  update: generateCreate(
    'WorkshopType',
    variables,
    'userWorkshops',
    require('../q/UserWorkshops.gql'),
    queryVariables,
  ),
})
