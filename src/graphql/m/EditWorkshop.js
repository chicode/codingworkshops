import { generateEdit } from '../mutation-helpers'

export default (variables) => ({
  mutation: require('./EditWorkshop.gql'),
  variables,
  update: generateEdit('WorkshopType', variables, require('../f/Workshop.gql')),
})
