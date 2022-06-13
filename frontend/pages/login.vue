<template>
  <div class="login-page">
    <img class="login-page__img" src="@/assets/img/gif/42monolythe.gif">
    <div class="login-container">
      <div>
        <button class="btn-login">Sign in with <img src="@/assets/img/svg/42.svg" alt=""></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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
