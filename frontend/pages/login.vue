<template>
  <div class="login-page">
    <img class="login-page__img" src="@/assets/img/gif/42monolythe.gif">
    <div class="login-container">
      <div>
        <button class="btn-login">Sign in with <img src="@/assets/img/svg/42.svg"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//https://api.intra.42.fr/oauth/authorize?client_id=29db7f986f466ac9bf7d9f77df73520dbc723313c8fed989f126eeccf2c61ddc&redirect_uri=http%3A%2F%2Flocalhost%3A1919%2Fusers%2Fauth%2Fft%2Fcallback&response_type=code

// curl -X POST http://localhost/api/auth/login -d '{"user": {"username": "john", "password": "changeme"}}' -H "Content-Type: application/json"
// curl http://localhost/api/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NTUwODU4MDAsImV4cCI6MTY1NTY5MDYwMH0.zLeE7KiG5BeAiMq1cyFJd4CpapCAnO-kc8X43gEH5lI"
export default Vue.extend({
  data: () => ({
    search: ""
  })
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
  background-color: rgb(195 195 195);
  color: #000;
  font-weight: bold;
  font-size: 14px;
  transition: 0.4s ease;
  margin-top: auto;
}

.btn-login:hover {
  background-color: rgba(195, 195, 195, 0.35);
  color: #000;
}

.btn-login img {
  width: 20px;
  margin-right: 10px;
}

@media (max-width: 1265px) {
  .login-page__img {
    display: none;
  }
}
</style>
