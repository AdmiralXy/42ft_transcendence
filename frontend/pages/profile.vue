<template>
  <div>
    <div class="content-wrapper-header">
      <div class="content-wrapper-context">
        <div class="img-content">
          <input id="imageUpload" type="file" @change="previewFiles" hidden>
          <img @click="imageUpload" :src="'/api/uploads/' + user.image" alt="">
          <div v-if="!owner">{{ user.username }}</div>
          <div class="d-flex align-items-center" v-else>
            <span v-if="!isEditMode">{{ user.username }}</span>
            <div v-else>
              <input class="input-edit" v-model="form.username" @keyup.enter="updateUsername">
              <span class="ml-1 text-warning input-error">{{ form.error }}</span>
            </div>
            <img @click="isEditMode = !isEditMode" class="pen" src="@/assets/img/svg/pen.svg" alt="">
          </div>
        </div>
        <p v-if="imageError" class="small text-warning pt-2">Unsupported image type!</p>
        <div class="content-text">
          <p>Joined since {{ user.created_at }}</p>
          <p>5000 games</p>
          <p>W/L 0.56</p>
        </div>
      </div>
    </div>
    <div class="progress-container">
      <div class="progress double">
        <div class="progress-bar" role="progressbar" style="width: 63%"></div>
        <div class="on-progress">3000 MMR</div>
      </div>
    </div>
    <div class="content-section">
      <div class="content-section-title">Latest games:</div>
      <ul>
        <li class="game-item">
          <div class="game-info">
            <span>katia</span>
            <svg fill="#fff" width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet"><path d="M52 2H12C6.477 2 2 6.477 2 12v40c0 5.523 4.477 10 10 10h40c5.523 0 10-4.477 10-10V12c0-5.523-4.477-10-10-10M23.23 44.365h-4.877L10 19.72h5.514l5.363 18.71l5.412-18.71h5.363L23.23 44.365m28.153-1.595C49.639 44.257 47.174 45 43.988 45c-3.252 0-5.809-.732-7.672-2.197c-1.863-1.467-2.795-3.481-2.795-6.045h4.928c.158 1.125.473 1.967.939 2.524c.855 1.016 2.322 1.521 4.398 1.521c1.242 0 2.252-.134 3.029-.401c1.471-.512 2.207-1.465 2.207-2.859c0-.813-.361-1.443-1.082-1.889c-.721-.436-1.865-.82-3.43-1.154l-2.674-.584c-2.629-.581-4.434-1.211-5.418-1.891c-1.664-1.136-2.496-2.915-2.496-5.334c0-2.207.813-4.04 2.441-5.501c1.629-1.46 4.021-2.19 7.178-2.19c2.635 0 4.883.688 6.742 2.065c1.861 1.376 2.836 3.375 2.928 5.994H48.25c-.092-1.482-.756-2.536-1.994-3.16c-.824-.412-1.85-.62-3.074-.62c-1.363 0-2.451.269-3.266.804c-.813.535-1.219 1.283-1.219 2.24c0 .881.4 1.539 1.203 1.975c.516.289 1.609.629 3.281 1.019l4.336 1.021c1.898.446 3.324 1.042 4.271 1.789C53.264 33.285 54 34.962 54 37.159c0 2.252-.871 4.121-2.617 5.611" fill="currentColor"></path></svg>
            <span>imalline</span>
          </div>
          <span class="game-status">
            <span class="status-circle green"></span>
            Win (+25 MMR)
          </span>
        </li>
        <li class="game-item">
          <div class="game-info">
            <span>ptycho</span>
            <svg fill="#fff" width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet"><path d="M52 2H12C6.477 2 2 6.477 2 12v40c0 5.523 4.477 10 10 10h40c5.523 0 10-4.477 10-10V12c0-5.523-4.477-10-10-10M23.23 44.365h-4.877L10 19.72h5.514l5.363 18.71l5.412-18.71h5.363L23.23 44.365m28.153-1.595C49.639 44.257 47.174 45 43.988 45c-3.252 0-5.809-.732-7.672-2.197c-1.863-1.467-2.795-3.481-2.795-6.045h4.928c.158 1.125.473 1.967.939 2.524c.855 1.016 2.322 1.521 4.398 1.521c1.242 0 2.252-.134 3.029-.401c1.471-.512 2.207-1.465 2.207-2.859c0-.813-.361-1.443-1.082-1.889c-.721-.436-1.865-.82-3.43-1.154l-2.674-.584c-2.629-.581-4.434-1.211-5.418-1.891c-1.664-1.136-2.496-2.915-2.496-5.334c0-2.207.813-4.04 2.441-5.501c1.629-1.46 4.021-2.19 7.178-2.19c2.635 0 4.883.688 6.742 2.065c1.861 1.376 2.836 3.375 2.928 5.994H48.25c-.092-1.482-.756-2.536-1.994-3.16c-.824-.412-1.85-.62-3.074-.62c-1.363 0-2.451.269-3.266.804c-.813.535-1.219 1.283-1.219 2.24c0 .881.4 1.539 1.203 1.975c.516.289 1.609.629 3.281 1.019l4.336 1.021c1.898.446 3.324 1.042 4.271 1.789C53.264 33.285 54 34.962 54 37.159c0 2.252-.871 4.121-2.617 5.611" fill="currentColor"></path></svg>
            <span>kricky</span>
          </div>
          <span class="game-status">
            <span class="status-circle red"></span>
            Lose (-25 MMR)
          </span>
        </li>
        <li class="game-item">
          <div class="game-info">
            <span>kricky</span>
            <svg fill="#fff" width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet"><path d="M52 2H12C6.477 2 2 6.477 2 12v40c0 5.523 4.477 10 10 10h40c5.523 0 10-4.477 10-10V12c0-5.523-4.477-10-10-10M23.23 44.365h-4.877L10 19.72h5.514l5.363 18.71l5.412-18.71h5.363L23.23 44.365m28.153-1.595C49.639 44.257 47.174 45 43.988 45c-3.252 0-5.809-.732-7.672-2.197c-1.863-1.467-2.795-3.481-2.795-6.045h4.928c.158 1.125.473 1.967.939 2.524c.855 1.016 2.322 1.521 4.398 1.521c1.242 0 2.252-.134 3.029-.401c1.471-.512 2.207-1.465 2.207-2.859c0-.813-.361-1.443-1.082-1.889c-.721-.436-1.865-.82-3.43-1.154l-2.674-.584c-2.629-.581-4.434-1.211-5.418-1.891c-1.664-1.136-2.496-2.915-2.496-5.334c0-2.207.813-4.04 2.441-5.501c1.629-1.46 4.021-2.19 7.178-2.19c2.635 0 4.883.688 6.742 2.065c1.861 1.376 2.836 3.375 2.928 5.994H48.25c-.092-1.482-.756-2.536-1.994-3.16c-.824-.412-1.85-.62-3.074-.62c-1.363 0-2.451.269-3.266.804c-.813.535-1.219 1.283-1.219 2.24c0 .881.4 1.539 1.203 1.975c.516.289 1.609.629 3.281 1.019l4.336 1.021c1.898.446 3.324 1.042 4.271 1.789C53.264 33.285 54 34.962 54 37.159c0 2.252-.871 4.121-2.617 5.611" fill="currentColor"></path></svg>
            <span>gtrinida</span>
          </div>
          <span class="game-status">
            <span class="status-circle red"></span>
            Lose (-25 MMR)
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonLoader from "~/components/ButtonLoader.vue";
import { mapGetters, mapActions } from "vuex";
import { BvToast } from "bootstrap-vue";

export default Vue.extend({
  layout: 'app',
  data() {
    return {
      isEditMode: false,
      imageError: false,
      form: {
        username: '',
        error: null as string | null,
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'profile/user'
    }),
    owner() {
      return this.user.id === this.$route.params.id;
    }
  },
  methods: {
    ...mapActions({
      fetchUserProfile: 'profile/fetchUserProfile',
      updateUserProfile: 'profile/updateUserProfile',
      setIsLoading: 'preloader/setIsLoading'
    }),
    successUpdated() {
      this.$bvToast.toast(
        'Profile successfully updated',
        {
          title: 'Success',
          autoHideDelay: 2000
        }
      )
    },
    async updateUsername() {
      try {
        await this.updateUserProfile({id: this.user.id, data: { username: this.form.username }}).then(async () => {
          this.isEditMode = !this.isEditMode
          await this.fetchUserProfile({ id: this.$route.params.id })
        })
        this.form.error = ''
      } catch (e: any) {
        this.form.error = e.response.data.message
      }
      this.form.username = this.user.username
    },
    imageUpload() {
      const input = document.getElementById("imageUpload")
      if (input)
        input.click()
    },
    async previewFiles() {
      const file = event.target.files[0]
      if (!file)
        return
      const form = new FormData()
      form.append("file", file, file.name)
      try {
        await this.$axios.post("/uploads/upload/" + this.user.id, form)
        document.getElementById("imageUpload").value = ""
        this.imageError = false
        this.fetchUserProfile({ id: this.$route.params.id })
      } catch (e) {
        this.imageError = true
      }
    }
  },
  async mounted() {
    await this.fetchUserProfile({ id: this.$route.params.id })
    if (Object.keys(this.user).length === 0)
      return this.$nuxt.error({ statusCode: 404, message: 'User profile not found' })
    this.form.username = this.user.username
  },
  components: {
    ButtonLoader
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import "~@/assets/scss/pages/home.scss";
.content-wrapper-header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-image: url('~assets/img/textures/cubes.png'), linear-gradient(to right top, #2f68da, #1557e1, #0548d9, #00319b);
  border-radius: 14px;
  padding: 20px 40px;
}

.img-content img {
  width: 28px;
  margin-right: 14px;
  border-radius: 14px;
}

.img-content img.pen {
  width: 14px;
  height: 14px;
  margin-right: 14px;
  border-radius: unset;
  margin-left: 7px;
  margin-bottom: 3px;
}

.content-text p {
  margin: 0;
  font-weight: 100;
}

.input-edit {
  border-radius: 14px;
  border: 1px solid #e6e6e64a;
  padding: 6px 11px;
  font-size: 14px;
  font-weight: 100;
  color: #e6e6e6;
  background-color: #ffffff3b;
  transition: all 0.3s ease;
}

.input-edit:focus-visible {
  outline: none;
}

.input-error {
  display: block;
  font-size: 10px;
}
</style>
