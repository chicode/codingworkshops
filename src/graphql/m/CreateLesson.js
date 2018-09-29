import { generateCreate } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./CreateLesson.gql'),
  variables,
  update: generateCreate(
    'LessonType',
    variables,
    'workshopLessons',
    require('../q/WorkshopLessons.gql'),
    queryVariables,
  ),
})
