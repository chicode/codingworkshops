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
      name: 'enter',
      path: '/enter',
      component: () => import(/* webpackChunkName: "enter" */ './views/Enter.vue'),
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
    },
    {
      name: 'project',
      path: '/h/:user/:project',
      component: () => import(/* webpackChunkName: "workshop" */ './views/Project.vue'),
    },
    {
      name: 'user',
      path: '/h/:user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
    },
    {
      name: 'slide',
      path: '/:workshop/:lesson/:slide',
      component: () => import(/* webpackChunkName: "slide" */ './views/Slide.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'lesson',
      path: '/:workshop/:lesson',
      component: () => import(/* webpackChunkName: "lesson" */ './views/Slide.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'workshop',
      path: '/:workshop',
      component: () => import(/* webpackChunkName: "workshop" */ './views/Workshop.vue'),
    },
  ],
}
