<template>
  <div class="header">
    <div class="menu-circle" @click="logout" />
    <div class="header-menu">
      <a class="menu-link is-active" href="/">App</a>
      <a class="menu-link notify" href="https://github.com/AdmiralXy/42ft_transcendence" target="_blank">Github</a>
      <a class="menu-link" href="https://42.fr/" target="_blank">42.fr</a>
    </div>
    <div class="header-profile">
      <img class="profile-img" :src="user.image" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({
      user: 'users/user'
    })
  },
  mounted () {
    if (this.$auth.loggedIn && this.$auth.user) {
      this.fetchUser(this.$auth.user.id)
    }
  },
  methods: {
    ...mapActions({
      fetchUser: 'users/fetchUser'
    }),
    logout () {
      this.$auth.logout()
      this.$router.push('/login')
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 58px;
  width: 100%;
  border-bottom: 1px solid $--border-color;
  padding: 0 30px;
  white-space: nowrap;
}

.menu-circle {
  width: 15px;
  height: 15px;
  background-color: #f96057;
  border-radius: 50%;
  box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
  margin-right: 195px;
  flex-shrink: 0;
  transition: 0.3s ease;
}

.menu-circle:hover {
  background-color: #ff1000;
}

.header-menu {
  display: flex;
  align-items: center;
}

.header-menu a.is-active, .header-menu a:hover {
  color: $--theme-color;
  border-bottom: 2px solid $--theme-color;
}

.header-menu a {
  padding: 20px 30px;
  text-decoration: none;
  color: $--inactive-color;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}

.header-profile {
  display: flex;
  align-items: center;
  padding: 0 16px 0 40px;
  margin-left: auto;
  flex-shrink: 0;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  border: 2px solid $--theme-color;
  margin-left: 22px;
}

.notify {
  position: relative;
}

.notify:before {
  content: "";
  position: absolute;
  background-color: #3a6df0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  right: 20px;
  top: 16px;
}
</style>
