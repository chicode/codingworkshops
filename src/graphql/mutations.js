import { generateCRUD, generateMutation } from './mutation-helpers'

//
// WORKSHOP

const workshop = generateCRUD('Workshop', ['userWorkshops'])
export const createWorkshop = workshop.createWorkshop
export const editWorkshop = workshop.editWorkshop
export const deleteWorkshop = workshop.deleteWorkshop
export const syncWorkshop = generateMutation('SyncWorkshop')

const lesson = generateCRUD('Lesson', ['workshopLessons'])
export const createLesson = lesson.createLesson
export const editLesson = lesson.editLesson
export const deleteLesson = lesson.deleteLesson
export const moveLesson = generateMutation('MoveLesson')

const slide = generateCRUD('Slide', ['lessonSlides'])
export const createSlide = slide.createSlide
export const editSlide = slide.editSlide
export const deleteSlide = slide.deleteSlide
export const moveSlide = generateMutation('MoveSlide')

const direction = generateCRUD('Direction', ['slide', 'directionSet'])
export const createDirection = direction.createDirection
export const editDirection = direction.editDirection
export const deleteDirection = direction.deleteDirection
export const moveDirection = generateMutation('MoveDirection')

//
// AUTH

export const login = generateMutation('LoginUser')
export const logout = generateMutation('LogoutUser')
export const signup = generateMutation('Signup')
