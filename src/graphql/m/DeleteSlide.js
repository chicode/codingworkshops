import { generateDelete } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./DeleteSlide.gql'),
  variables,
  update: generateDelete(
    variables,
    'lessonSlides',
    require('../q/LessonSlides.gql'),
    queryVariables,
  ),
})
