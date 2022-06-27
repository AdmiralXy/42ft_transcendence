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
    path: '/login',
    name: 'login',
    component: page('login.vue')
  },
  {
    path: '/updates',
    name: 'updates',
    component: page('updates.vue')
  },
  {
    path: '/pong',
    name: 'pong',
    component: page('pong.vue')
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: page('leaderboard.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: page('profile.vue')
  },
  {
    path: '/friends',
    name: 'friends',
    component: page('friends.vue')
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
  }
]

export function createRouter () {
  return new Router({
    routes,
    mode: 'history'
  })
}
