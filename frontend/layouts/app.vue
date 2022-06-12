<template>
  <div class="app-body">
    <BackgroundWaves />
    <a href="https://github.com/AdmiralXy/42ft_transcendence" target="_blank">
      <div class="github">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </div>
    </a>
    <div class="app">
      <Header />
      <Wrapper />
      <div class="overlay-app"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import Vue from 'vue'
import Header from '~/components/app/Header.vue'
import Wrapper from '~/components/app/Wrapper.vue'
import BackgroundWaves from "~/components/app/BackgroundWaves.vue";

export default Vue.extend({
  name: 'AppLayout',
  components: {
    BackgroundWaves,
    Header, Wrapper
  }
})
</script>

<style>
*, html, body {
  font-family: 'Noto Sans', sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(1 2 3 / 40%);
  border-radius: 10px;
}

.content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.content-section-title {
  color: #999ba5;
  margin-bottom: 14px;
}

.content-section ul {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  background-color: rgb(146 151 179 / 13%);
  padding-left: 0;
  margin: 0;
  border-radius: 14px;
  border: 1px solid rgba(16 18 27 / 40%);
  cursor: pointer;
}

.content-section ul li + li {
  border-top: 1px solid rgba(113 119 144 / 25%);
}
</style>

<style lang="scss" scoped>
:root {
  --theme-bg-color: rgba(16 18 27 / 40%);
  --border-color: rgba(113 119 144 / 25%);
  --theme-color: #f9fafb;
  --inactive-color: rgb(113 119 144 / 78%);
  --body-font: "Poppins", sans-serif;
  --hover-menu-bg: rgba(12 15 25 / 30%);
  --content-title-color: #999ba5;
  --content-bg: rgb(146 151 179 / 13%);
  --button-inactive: rgb(249 250 251 / 55%);
  --dropdown-bg: #21242d;
  --dropdown-hover: rgb(42 46 60);
  --popup-bg: rgb(22 25 37);
  --search-bg: #14162b;
  --overlay-bg: rgba(36, 39, 59, 0.3);
  --scrollbar-bg: rgb(1 2 3 / 40%);
}

.app-body {
  font-family: var(--body-font);
  background: #0e6cc4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;
  width: 100%;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.overlay-app {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: all;
  background-color: rgba(36, 39, 59, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.github {
  position: fixed;
  bottom: 50px;
  right: 30px;
  background-color: #21242d;
  box-shadow: -1px 3px 8px -1px rgb(0 0 0 / 20%);
  padding: 8px;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;
}

.github svg {
  width: 24px;
  flex-shrink: 0;
  fill: #5f65c9;
  stroke: #5f65c9;
  transition: 0.5s;
  margin: 2px;
}

.app {
  background-color: rgba(16 18 27 / 40%);
  max-width: 1350px;
  max-height: 760px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
}
</style>
