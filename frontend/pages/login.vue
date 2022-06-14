<template>
  <div class="login-page">
    <img class="login-page__img" src="@/assets/img/gif/42monolythe.gif">
    <div class="login-container">
      <a href="https://api.intra.42.fr/oauth/authorize?client_id=1ffda2d97b6d47baa64a2b36a2646c3195cec1861aa719e2ec6d878a3b653d4b&redirect_uri=http%3A%2F%2Flocalhost%2Flogin&response_type=code">
        <button class="btn-login">Sign in with <img src="@/assets/img/svg/42.svg" alt=""></button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Auth } from "@nuxtjs/auth-next";

export default Vue.extend({
  data: () => ({
    code: '' as string | (string | null)[]
  }),
  async created() {
    if (this.$route.query.code) {
      this.code = this.$route.query.code
      await this.$router.replace({ query: {} })
      await this.$auth.loginWith('local', { data: { code: this.code } })
        .catch((e: any) => {
          this.$bvToast.toast(`Please check your internet connection`, {
            title: 'Attempt to login',
            autoHideDelay: 5000,
          })
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  overflow-y: hidden;
}

.login-page {
  background: #000;
  position: relative;
  overflow-y: hidden;
}

.login-page__img {
  position: absolute;
  top: 0;
  left: 0;
}

.login-page__title {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 170px;
  transform: rotate(90deg);
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.btn-login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 137px;
  border: none;
  border-radius: 2px;
  padding: 10px;
  background-color: rgb(233 233 233);
  color: #000;
  font-weight: bold;
  font-size: 14px;
  transition: 0.4s ease;
  margin-top: auto;
  box-shadow: 0 0 7px 2px rgba(0, 13, 255, 0.43);
}

.btn-login:hover {
  background-color: rgba(195, 195, 195, 0.55);
  color: #000;
  box-shadow: none;
}

.btn-login img {
  width: 20px;
  margin-right: 10px;
}

.login-container a {
  text-decoration: none;
}

@media (max-width: 1265px) {
  .login-page__img {
    display: none;
  }
}
</style>
