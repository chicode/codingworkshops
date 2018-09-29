import { generateEdit } from '../mutation-helpers'

export default (variables) => ({
  mutation: require('./EditLesson.gql'),
  variables,
  update: generateEdit('LessonType', variables, require('../f/Lesson.gql')),
})
