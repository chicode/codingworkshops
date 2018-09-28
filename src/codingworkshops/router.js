import Home from './views/Home'

export default {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'edit-slide',
      path: '/:human/edit/:workshop/:lesson/:slide',
      component: () => import(/* webpackChunkName: "edit-lesson" */ './views/EditLesson.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'edit-lesson',
      path: '/:human/edit/:workshop/:lesson',
      component: () => import(/* webpackChunkName: "edit-lesson" */ './views/EditLesson.vue'),
    },
    {
      name: 'edit-workshop',
      path: '/:human/edit/:workshop',
      component: () => import(/* webpackChunkName: "edit-workshop" */ './views/EditWorkshop.vue'),
    },
    {
      name: 'slide',
      path: '/:human/:workshop/:lesson/:slide',
      component: () => import(/* webpackChunkName: "lesson" */ './views/Lesson.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'lesson',
      path: '/:human/:workshop/:lesson',
      component: () => import(/* webpackChunkName: "lesson" */ './views/Lesson.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'workshop',
      path: '/:human/:workshop',
      component: () => import(/* webpackChunkName: "workshop" */ './views/Workshop.vue'),
    },
    {
      name: 'human',
      path: '/:human',
      component: () => import(/* webpackChunkName: "human" */ './views/Human.vue'),
    },
    {
      name: 'enter',
      path: '/enter',
      component: () => import(/* webpackChunkName: "enter" */ './views/Enter.vue'),
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
    },
  ],
}
