import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: page('login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: page('home.vue')
  },
  {
    path: '/updates',
    name: 'updates',
    component: page('updates.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: page('profile.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: page('users.vue')
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
