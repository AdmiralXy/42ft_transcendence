<template>
  <div class="login-page">
    <img class="login-page__img" src="@/assets/img/gif/42monolythe.gif">
    <div class="login-container">
      <a v-if="!isLoading" :href="intraUrl">
        <button class="btn-login">Sign in with <img src="@/assets/img/svg/42.svg" alt=""></button>
      </a>
      <a v-if="!isLoading" class="login-container__google" :href="googleUrl">
        or with google
      </a>
      <div v-else class="loading">
        <p v-if="!isLogged">
          Fetching data from API...
        </p>
        <p v-else>
          Hello, {{ $auth.user.login }}!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BvToast } from 'bootstrap-vue'

export default Vue.extend({
  data: () => ({
    code: '' as string | (string | null)[],
    type: null as string | null | (string | null)[],
    isLoading: false as boolean,
    isLogged: false as boolean
  }),
  computed: {
    intraUrl () {
      return `https://api.intra.42.fr/oauth/authorize?client_id=${this.$config.CLIENT_ID}&redirect_uri=${this.$config.REDIRECT_URI}&response_type=code`
    },
    googleUrl () {
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.$config.GOOGLE_CLIENT_ID}&redirect_uri=${this.$config.GOOGLE_REDIRECT_URI}&response_type=code&scope=email`
    }
  },
  async created (): Promise<void> {
    if (this.$route.query.code) {
      this.code = this.$route.query.code
      this.type = this.$route.query.type ? this.$route.query.type : 'intra'
      await this.$router.replace({ query: {} })
      this.isLoading = true
      // eslint-disable-next-line promise/param-names
      await new Promise(r => setTimeout(r, 1500))
      try {
        await this.$auth.loginWith('local', { data: { code: this.code, type: this.type } })
        this.isLogged = true
      } catch (e) {
        this.$bvToast.toast('Please check your internet connection', {
          title: 'Attempt to login',
          autoHideDelay: 5000
        })
        this.isLoading = false
      }
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
  box-shadow: 0 0 7px 2px rgba(221, 223, 238, 0.43);
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

.loading p {
  z-index: 10;
  font-size: 28px;
  color: #fff;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.login-container__google {
  font-size: 14px;
  color: #fff;
}
</style>
