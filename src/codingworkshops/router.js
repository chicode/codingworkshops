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
      name: 'slide',
      path: '/:human/:workshop/:lesson/:slide',
      component: () => import(/* webpackChunkName: "slide" */ './views/Slide.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'lesson',
      path: '/:human/:workshop/:lesson',
      component: () => import(/* webpackChunkName: "slide" */ './views/Slide.vue'),
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
      name: 'human',
      path: '/:human',
      component: () => import(/* webpackChunkName: "human" */ './views/Human.vue'),
    },
  ],
}
