import { generateDelete } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./DeleteLesson.gql'),
  variables,
  update: generateDelete(
    variables,
    'workshopLessons',
    require('../q/WorkshopLessons.gql'),
    queryVariables,
  ),
})
