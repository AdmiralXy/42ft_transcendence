<template>
  <div class="login-page">
    <img class="login-page__img" src="@/assets/img/gif/42monolythe.gif">
    <div class="login-container">
      <div v-if="state === State.NOT_LOGGED" class="text-center">
        <a :href="intraUrl">
          <button class="btn-login">Sign in with <img src="@/assets/img/svg/42.svg" alt=""></button>
        </a>
        <a class="login-container__google" :href="googleUrl">
          or with google
        </a>
      </div>
      <div v-else-if="state === State.LOADING" class="loading">
        <p>Fetching data from API...</p>
      </div>
      <div v-else-if="state === State.LOGGED" class="loading">
        <p>Hello, {{ $auth.user.login }}!</p>
      </div>
      <div v-else-if="state === State.TOKEN_REQUIRED" class="token-required">
        <p>Please, provide two-factor authentication token!</p>
        <input v-model="tfaToken" v-mask="'######'" placeholder="- - - - - -" class="code-input shadow-sm" type="text">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BvToast } from 'bootstrap-vue'

enum State {
  NOT_LOGGED,
  LOADING,
  TOKEN_REQUIRED,
  LOGGED
}

export default Vue.extend({
  data: () => ({
    State,
    code: '' as string | (string | null)[],
    type: null as string | null | (string | null)[],
    state: State.NOT_LOGGED as State,
    tfaToken: '' as string,
    user: {} as any
  }),
  computed: {
    intraUrl () {
      return `https://api.intra.42.fr/oauth/authorize?client_id=${this.$config.CLIENT_ID}&redirect_uri=${this.$config.REDIRECT_URI}&response_type=code`
    },
    googleUrl () {
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.$config.GOOGLE_CLIENT_ID}&redirect_uri=${this.$config.GOOGLE_REDIRECT_URI}&response_type=code&scope=email&access_type=offline`
    }
  },
  watch: {
    tfaToken (): void {
      if (this.tfaToken.length === 6) {
        this.loginTfa()
      }
    }
  },
  async created (): Promise<void> {
    await this.login()
  },
  methods: {
    async login (): Promise<void> {
      if (this.$route.query.code || this.code.length > 0) {
        if (this.$route.query.code) {
          this.code = this.$route.query.code
          this.type = this.$route.query.type ? this.$route.query.type : 'intra'
          await this.$router.replace({ query: {} })
        }
        this.state = State.LOADING
        // eslint-disable-next-line promise/param-names
        // await new Promise(r => setTimeout(r, 1500))
        try {
          await this.$auth.loginWith('local', { data: { code: this.code, type: this.type } })
          this.state = State.LOGGED
        } catch (e: any) {
          if (e.response.data.message === 'Two-factor authentication is enabled') {
            this.state = State.TOKEN_REQUIRED
            this.user = e.response.data.user
          } else {
            this.$bvToast.toast('Please check your internet connection', {
              title: 'Attempt to login',
              autoHideDelay: 5000
            })
            this.state = State.NOT_LOGGED
            this.tfaToken = ''
            this.user = {}
          }
        }
      }
    },
    async loginTfa (): Promise<void> {
      this.state = State.LOADING
      try {
        await this.$auth.loginWith('localTfa', { data: { id: this.user.id, tfa_token: this.tfaToken } })
        this.state = State.LOGGED
      } catch (e: any) {
        this.$bvToast.toast(e.response.data.message, {
          title: 'Attempt to login',
          variant: 'danger'
        })
        this.state = State.TOKEN_REQUIRED
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

.code-input {
  width: 80%;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 20px;
  color: #fff;
  background-color: #000000;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  letter-spacing: 10px;
  text-align: center;
}

.code-input:focus {
  outline: 0;
}

.token-required {
  text-align: center;
}

.token-required p {
  font-size: 14px;
  color: #fff;
  margin-top: 10px;
}
</style>
