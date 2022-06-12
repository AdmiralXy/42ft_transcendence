<template>
  <div>
    <form class="form-profile rounded-lg">
      <p class="form-profile__title">Personal data</p>
      <div class="form-profile__input-group">
        <p>Username</p>
        <b-form-input v-model="form.username" class="form-profile__input"></b-form-input>
      </div>
      <div class="form-profile__input-group">
        <p>Password</p>
        <b-form-input v-model="form.password" class="form-profile__input"></b-form-input>
      </div>
      <div class="form-profile__input-group">
        <p>Password confirmation</p>
        <b-form-input v-model="form.password" class="form-profile__input"></b-form-input>
      </div>
      <button class="form-profile__button">Update</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'app',
  data() {
    return {
      form: {
        username: 'kricky' as string,
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.form-profile {
  display: flex;
  flex-direction: column;
  width: calc(33.3% - 20px);
  font-size: 16px;
  background-color: rgb(146 151 179 / 13%);
  border-radius: 14px;
  border: 1px solid rgba(16 18 27 / 40%);
  padding: 20px;
  transition: 0.3s ease;
}

.form-profile__title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-profile__input-group {
  margin-bottom: 20px;
}

.form-profile__input-group p {
  font-size: 12px;
  color: #c8c9ce;
  margin-bottom: 4px;
}

.form-profile__input {
  width: 100%;
  border: none;
  border-radius: 2px;
  padding: 10px;
  background-color: rgb(146 151 179 / 13%);
  color: #fff;
  font-size: 14px;
  transition: 0.3s ease;
}

.form-profile__button {
  width: 100%;
  border: none;
  border-radius: 2px;
  padding: 10px;
  background-color: rgb(116 130 209 / 51%);
  color: #fff;
  font-size: 14px;
  transition: 0.3s ease;
}

.form-profile__button:hover {
  background-color: rgb(53 71 171);
}
</style>
