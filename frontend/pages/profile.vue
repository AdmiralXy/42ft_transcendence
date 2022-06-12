<template>
  <div class="d-flex flex-row">
    <form class="form-profile rounded-lg">
      <p class="form-profile__title">Personal data</p>
      <div class="form-profile__input-group">
        <p class="form-profile__input-title">Username</p>
        <b-form-input v-model="form.username" class="form-profile__input"></b-form-input>
        <p class="form-profile__input-error">Username can't be empty!</p>
      </div>
      <div class="form-profile__input-group">
        <p class="form-profile__input-title">Password</p>
        <b-form-input v-model="form.password" type="password" class="form-profile__input"></b-form-input>
      </div>
      <div class="form-profile__input-group">
        <p class="form-profile__input-title">Password confirmation</p>
        <b-form-input v-model="form.password" type="password" class="form-profile__input"></b-form-input>
      </div>
      <ButtonLoader type="button" class="form-profile__button" :loading="form.loading">Update</ButtonLoader>
    </form>
    <form class="form-profile rounded-lg">
      <p class="form-profile__title">Update avatar</p>
      <div class="form-profile__input-group">
        <b-form-file class="bg-dark" id="file-small" size="sm"></b-form-file>
        <p class="form-profile__input-error">Allowed extensions: .jpeg, .png</p>
      </div>
      <ButtonLoader type="button" class="form-profile__button" :loading="form.loading">Update</ButtonLoader>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonLoader from "~/components/ButtonLoader.vue";
import { BvToast } from "bootstrap-vue";

export default Vue.extend({
  layout: 'app',
  data() {
    return {
      form: {
        username: 'kricky' as string,
        loading: false as boolean
      }
    }
  },
  methods: {
    successUpdated() {
      this.$bvToast.toast(
        'Profile successfully updated',
        {
          title: 'Success',
          autoHideDelay: 2000
        }
      )
    }
  },
  components: {
    ButtonLoader
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.form-profile {
  display: flex;
  flex-direction: column;
  width: calc(33.3% - 20px);
  font-size: 16px;
  background-color: $--content-bg;
  border-radius: 14px;
  border: 1px solid $--theme-bg-color;
  padding: 20px;
  transition: 0.3s ease;
}

.form-profile__title {
  font-size: 20px;
  margin-bottom: 20px;
}

.form-profile__input-group {
  margin-bottom: 20px;
}

.form-profile__input-title {
  font-size: 12px;
  color: #c8c9ce;
  margin-bottom: 4px;
}

.form-profile__input {
  width: 100%;
  border: none;
  border-radius: 2px;
  padding: 10px;
  background-color: $--content-bg;
  color: #fff;
  font-size: 13.4px;
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
  margin-top: auto;
}

.form-profile__button:hover {
  background-color: rgb(53 71 171);
}

.form-profile__input-error {
  font-size: 12px;
  color: #ff0000;
  margin: 6px 0 0 0;
}

.form-profile + .form-profile {
  margin-left: 3vh;
}

.form-profile__status {
  font-size: 13px;
  color: #00ff00;
}
</style>
