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
      name: 'workshop',
      path: '/workshops/:workshop',
      component: () => import(/* webpackChunkName: "workshop" */ './views/Workshop.vue'),
    },
    {
      name: 'lesson',
      path: '/workshops/:workshop/:lesson',
      component: () => import(/* webpackChunkName: "lesson" */ './views/Lesson.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'slide',
      path: '/workshops/:workshop/:lesson/:slide',
      component: () => import(/* webpackChunkName: "lesson" */ './views/Lesson.vue'),
      meta: {
        noStatusBar: true,
      },
    },
    {
      name: 'human',
      path: '/humans/:username',
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
