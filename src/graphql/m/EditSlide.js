import { generateEdit } from '../mutation-helpers'

export default (variables) => ({
  mutation: require('./EditSlide.gql'),
  variables,
  update: generateEdit('SlideType', variables, require('../f/Slide.gql')),
})
