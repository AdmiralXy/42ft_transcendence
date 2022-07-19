<template>
  <div>
    <TwoFAModal ref="twoFaComponent" />
    <div class="content-wrapper-header">
      <div class="content-wrapper-context">
        <input id="imageUpload" type="file" hidden @change="imageUploadHandler">
        <div class="user-profile">
          <img :class="isProfileOwner ? 'img-loadable' : ''" :src="'/api/uploads/' + user.image" alt="" @click="imageUpload">
          <p v-if="!isProfileOwner">
            {{ user.username }}
          </p>
          <input v-else v-model="form.username" type="text" class="user-profile__input" @keyup.enter="updateUsername">
        </div>
        <p v-for="error in form.errors" :key="error" class="small text-warning pt-2">
          {{ error }}
        </p>
        <div class="user-info">
          <p>{{ finishedMatches.length }} matches</p>
          <p>W/L {{ winRate }}</p>
          <div v-if="isProfileOwner" class="pt-4">
            <button type="button" class="profile-button" @click="showModal">
              Two Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </div>
    <ProgressMMR :user-id="+$route.params.id" />
    <GamesList :user-id="+$route.params.id" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ProgressMMR from '~/components/ProgressMMR.vue'
import GamesList from '~/components/GamesList.vue'
import TwoFAModal from '~/components/TwoFAModal.vue'

export default Vue.extend({
  components: {
    ProgressMMR, GamesList, TwoFAModal
  },
  layout: 'app',
  data () {
    return {
      form: {
        username: '' as string,
        errors: [] as string[]
      },
      imageError: false as boolean
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/user',
      finishedMatches: 'matches/finishedMatches'
    }),
    winRate (): string {
      if (!this.finishedMatches || this.finishedMatches.length === 0) {
        return 'n/a'
      }
      return (this.finishedMatches.filter((match: any) => match.winner.id === this.user.id).length / this.finishedMatches.length).toFixed(2)
    },
    isProfileOwner (): boolean {
      if (!this.$auth.user) {
        return false
      }
      // eslint-disable-next-line eqeqeq
      return this.$auth.user.id == this.$route.params.id
    }
  },
  async mounted (): Promise<void> {
    await this.fetchUser(this.$route.params.id)
    await this.fetchMatches(this.$route.params.id)
    this.form.username = this.user.username
  },
  methods: {
    ...mapActions({
      fetchUser: 'users/fetchUser',
      updateUser: 'users/updateUser',
      fetchMatches: 'matches/fetchMatches'
    }),
    showModal (): void {
      if (this.$refs.twoFaComponent) {
        const component = this.$refs.twoFaComponent as any
        component.showModal()
      }
    },
    updateUsername (): void {
      if (this.$auth.user && this.form.username.length > 0) {
        this.updateUser({
          id: this.$auth.user.id,
          data: {
            username: this.form.username
          }
        }).then(() => {
          this.form.errors = []
        }).catch((error) => {
          this.form.errors = error.response.data.message
        })
      }
    },
    formatDate (date: string): string {
      const d = new Date(date)
      const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
      const year = d.getFullYear()
      const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
      const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      return `${day}/${month}/${year} ${hours}:${minutes}`
    },
    imageUpload () {
      const input = document.getElementById('imageUpload')
      if (this.isProfileOwner && input) { input.click() }
    },
    imageUploadHandler (e: Event) {
      const target = e.target as HTMLInputElement
      let file
      if (target && target.files) {
        file = target.files[0]
        if (!file) { return }
        const form = new FormData()
        form.append('file', file, file.name)
        this.form.errors = []
        this.$axios.post('/uploads/upload/' + this.user.id, form).then(() => {
          this.fetchUser(this.user.id)
        }).catch((error) => {
          this.form.errors.push(error.response.data.message)
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.content-wrapper-header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-image: url('~assets/img/textures/cubes.png'), linear-gradient(to right top, #2f68da, #1557e1, #0548d9, #00319b);
  border-radius: 14px;
  padding: 20px 40px;
}

.user-profile {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.user-profile img {
  width: 44px;
  margin-right: 14px;
  border-radius: 50%;
}

.user-profile p {
  margin: 0;
  font-size: 16px;
  font-weight: 300;
}

.user-info {
  margin-top: 25px;
}

.user-info p {
  font-weight: 300;
  margin-bottom: 7px;
}

.user-profile__input {
  width: 100%;
  border: none;
  border-radius: 2px;
  padding: 9px;
  background-color: rgba(146, 151, 179, 0.13);
  font-size: 16px;
  color: #fff;
  transition: 0.3s ease;
  font-weight: 300;
}

.user-profile__input:focus-visible {
  outline: none;
  background-color: rgba(146, 151, 179, 0.35);
}

.img-loadable:hover {
  cursor: pointer;
}

.profile-button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 2px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 300;
  transition: 0.5s ease;
  cursor: pointer;
  border: unset;
}

.profile-button:hover {
  background-color: #b2b2b2;
  text-decoration: none;
}
</style>
