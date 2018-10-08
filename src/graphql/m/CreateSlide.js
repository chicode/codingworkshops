import { generateCreate } from '../mutation-helpers'

export default (variables, queryVariables) => ({
  mutation: require('./CreateSlide.gql'),
  variables,
  update: generateCreate(
    'SlideType',
    variables,
    'lessonSlides',
    require('../q/LessonSlides.gql'),
    queryVariables,
  ),
})
