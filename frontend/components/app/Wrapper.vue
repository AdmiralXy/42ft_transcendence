<template>
  <div class="wrapper">
    <div class="left-side">
      <div class="side-wrapper">
        <div class="side-title">Apps</div>
        <div class="side-menu">
          <nuxt-link :to="{ name: 'home'}">
            <svg viewBox="0 0 512 512">
              <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0" data-original="#bfc9d1"></path>
              </g>
              <path xmlns="http://www.w3.org/2000/svg" d="M192 192h128v128H192zm0 0" fill="currentColor" data-original="#82b1ff"></path>
              <path xmlns="http://www.w3.org/2000/svg" d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0" fill="currentColor" data-original="#bfc9d1"></path>
            </svg>
            Home
          </nuxt-link>
          <nuxt-link :to="{ name: 'direct'}">
            <svg viewBox="0 0 488.932 488.932" fill="currentColor">
              <path d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z"></path>
            </svg>
            Updates
          </nuxt-link>
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">Pong</div>
        <div class="side-menu">
          <nuxt-link :to="{ name: 'direct'}">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>
            Play matchmaking
          </nuxt-link>
        </div>
        <div class="side-menu">
          <nuxt-link :to="{ name: 'direct'}">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.991 9.656c.286.638.585 1.231.882 1.783-4.065-1.348-6.501-5.334-6.873-9.439h4.077c.036.482.08.955.139 1.405h-2.689c.427 2.001 1.549 4.729 4.464 6.251zm4.613 6.344c-.499-3.947-5.604-6.197-5.604-16h14c0 9.803-5.094 12.053-5.592 16h-2.804zm-3.254-14c.205 4.648 1.99 8.333 4.346 11.053-1.887-3.26-2.636-7.432-2.647-11.053h-1.699zm9.65 17.619v4.381h-10v-4.381c1.941 0 3.369-1.433 3.571-2.619h2.866c.193 1.187 1.565 2.619 3.563 2.619zm-1 1.381h-8v2h8v-2zm3.923-19c-.036.482-.08.955-.139 1.405h2.688c-.427 2.001-1.549 4.729-4.464 6.251-.286.638-.585 1.231-.882 1.783 4.066-1.348 6.502-5.334 6.874-9.439h-4.077z"/></svg>
            Leaderboard
          </nuxt-link>
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">Chat</div>
        <div class="side-menu">
          <nuxt-link :to="{ name: 'direct'}">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1v16.981h4v5.019l7-5.019h13v-16.981h-24zm13 12h-8v-1h8v1zm6-3h-14v-1h14v1zm0-3h-14v-1h14v1z"/></svg>
            Direct
          </nuxt-link>
          <nuxt-link :to="{ name: 'groups'}">
            <svg viewBox="0 0 512 512" fill="currentColor">
              <path d="M352 0H64C28.704 0 0 28.704 0 64v320a16.02 16.02 0 009.216 14.496A16.232 16.232 0 0016 400c3.68 0 7.328-1.248 10.24-3.712L117.792 320H352c35.296 0 64-28.704 64-64V64c0-35.296-28.704-64-64-64z"></path>
              <path d="M464 128h-16v128c0 52.928-43.072 96-96 96H129.376L128 353.152V400c0 26.464 21.536 48 48 48h234.368l75.616 60.512A16.158 16.158 0 00496 512c2.336 0 4.704-.544 6.944-1.6A15.968 15.968 0 00512 496V176c0-26.464-21.536-48-48-48z"></path>
            </svg>
            Groups
          </nuxt-link>
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">Settings</div>
        <div class="side-menu">
          <nuxt-link :to="{ name: 'profile'}">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"/></svg>
            Profile
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="main-header">
        <a class="menu-link-main">All Apps</a>
        <div class="header-menu">
          <a class="main-header-link is-active">Transcendence (alpha)</a>
        </div>
      </div>
      <div class="content-wrapper">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.left-side {
  flex-basis: 240px;
  border-right: 1px solid $--border-color;
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;
}

.side-title {
  color: $--inactive-color;
  margin-bottom: 14px;
}

.side-menu {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.side-menu a {
  text-decoration: none;
  color: $--theme-color;
  display: flex;
  align-items: center;
  font-weight: 400;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  transition: 0.3s;
}

.side-menu svg {
  width: 16px;
  margin-right: 8px;
}

.side-wrapper + .side-wrapper {
  margin-top: 20px;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.main-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $--border-color;
  height: 58px;
  flex-shrink: 0;
}

.menu-link-main {
  text-decoration: none;
  color: $--theme-color;
  padding: 0 30px;
}

.main-header .header-menu {
  margin-left: 150px;
}

.header-menu {
  display: flex;
  align-items: center;
}

.main-header .header-menu a {
  padding: 20px 24px;
}

.header-menu a {
  padding: 20px 30px;
  text-decoration: none;
  color: $--inactive-color;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}

.header-menu a.is-active, .header-menu a:hover {
  color: $--theme-color;
  border-bottom: 2px solid $--theme-color;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  color: $--theme-color;
  padding: 20px 40px;
  height: 100%;
  overflow: auto;
  background-color: $--theme-bg-color;
}
</style>
