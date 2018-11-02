import { generateCRUD, generateMutation } from './mutation-helpers'

module.exports = {
  // workshops
  /// edit
  ...generateCRUD('Workshop', ['userWorkshops']),
  ...generateCRUD('Lesson', ['workshopLessons']),
  moveLesson: generateMutation('MoveLesson'),
  ...generateCRUD('Slide', ['lessonSlides']),
  moveSlide: generateMutation('MoveSlide'),
  ...generateCRUD('Direction', ['slide', 'directionSet']),
  moveDirection: generateMutation('MoveDirection'),

  /// misc
  syncWorkshop: generateMutation('SyncWorkshop'),

  // auth
  login: generateMutation('Login'),
  logout: generateMutation('Logout'),
}
