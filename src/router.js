import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
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
      path: '/workshops/:name',
      component: () => import(/* webpackChunkName: "workshop" */ './views/Workshop.vue'),
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
  ],
})
