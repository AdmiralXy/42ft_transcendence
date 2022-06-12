import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
  {
    path: '/',
    name: 'home',
    component: page('home.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: page('profile.vue')
  },
  {
    path: '/direct',
    name: 'direct',
    component: page('direct.vue')
  },
  {
    path: '/groups',
    name: 'groups',
    component: page('groups.vue')
  },
  // {
  //   path: '/group/{groupId}',
  //   name: 'group',
  //   component: page('group.vue')
  // },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: page('leaderboard.vue')
  }
]

export function createRouter () {
  return new Router({
    routes,
    mode: 'history'
  })
}
