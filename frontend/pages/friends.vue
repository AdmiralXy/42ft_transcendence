<template>
  <div class="direct-wrapper">
    <div class="friends-list">
      <div class="friends-list__search">
        <input v-model="searchFriends" type="text" class="friends-list__search-input" placeholder="Your friends">
      </div>
      <div v-for="user in filteredFriends" :key="user.id" class="friend-list__item">
        <div class="friend-list__item-avatar">
          <img :src="'/api/uploads/' + user.image" alt="">
        </div>
        <div class="friend-list__item-name" @click="$router.push({ name: 'profile', params: { id: user.id } })">
          <span>{{ user.username }}</span>
        </div>
        <div class="friend-list__item-status">
          <button class="friend-list__item-status-button text-warning" @click="removeFriend(user.id)">
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="friends-list">
      <div class="friends-list__search">
        <input v-model="searchAll" type="text" class="friends-list__search-input" placeholder="Search by all users">
      </div>
      <div v-for="user in filteredUsers" :key="user.id" class="friend-list__item">
        <div class="friend-list__item-avatar">
          <img :src="'/api/uploads/' + user.image" alt="">
        </div>
        <div class="friend-list__item-name" @click="$router.push({ name: 'profile', params: { id: user.id } })">
          <span>{{ user.username }}</span>
        </div>
        <div class="friend-list__item-status">
          <button class="friend-list__item-status-button text-success" @click="addFriend(user.id)">
            Invite to friends
          </button>
          <button v-if="!blacklist.some(e => e.id === user.id)" class="friend-list__item-status-button text-danger" @click="blockUser(user.id)">
            Block
          </button>
          <button v-else class="friend-list__item-status-button text-danger" @click="unblockUser(user.id)">
            Unblock
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  layout: 'app',
  data: () => ({
    searchFriends: '',
    searchAll: ''
  }),
  computed: {
    ...mapGetters({
      users: 'users/users',
      friends: 'friends/friends',
      blacklist: 'blacklist/blacklist'
    }),
    filteredFriends (): any {
      return this.friends.filter((user: { username: string; }) => {
        return user.username.toLowerCase().includes(this.searchAll.toLowerCase())
      })
    },
    filteredUsers (): any {
      return this.users.filter((user: { username: string; }) => {
        return user.username.toLowerCase().includes(this.searchAll.toLowerCase())
      })
    }
  },
  async mounted (): Promise<void> {
    await this.fetchUsers()
    if (this.$auth.user) {
      await this.fetchFriends(this.$auth.user.id)
      await this.fetchBlacklist(this.$auth.user.id)
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
      fetchFriends: 'friends/fetchFriends',
      sendFriendRequest: 'friends/sendFriendRequest',
      removeFriendRequest: 'friends/removeFriendRequest',
      fetchBlacklist: 'blacklist/fetchBlacklist',
      addToBlacklist: 'blacklist/addToBlacklist',
      removeFromBlacklist: 'blacklist/removeFromBlacklist'
    }),
    addFriend (id: number): void {
      if (this.$auth.user) {
        this.sendFriendRequest({ id: this.$auth.user.id, friendId: id }).then(() => {
          if (this.$auth.user) { this.fetchFriends(this.$auth.user.id) }
          this.$bvToast.toast('Friend request sent successfully', {
            title: 'Friend request',
            variant: 'success'
          })
        }).catch((error) => {
          this.$bvToast.toast(error.response.data.message, {
            title: 'Friend request',
            variant: 'danger'
          })
        })
      }
    },
    removeFriend (id: number): void {
      if (this.$auth.user) {
        this.removeFriendRequest({ id: this.$auth.user.id, friendId: id }).then(() => {
          if (this.$auth.user) { this.fetchFriends(this.$auth.user.id) }
        })
      }
    },
    blockUser (id: number): void {
      if (this.$auth.user) {
        this.addToBlacklist({ id: this.$auth.user.id, blockId: id }).then(() => {
          if (this.$auth.user) { this.fetchBlacklist(this.$auth.user.id) }
          this.$bvToast.toast('User blocked successfully', {
            title: 'Block user',
            variant: 'success'
          })
        }).catch((error) => {
          this.$bvToast.toast(error.response.data.message, {
            title: 'Block user',
            variant: 'danger'
          })
        })
      }
    },
    unblockUser (id: number): void {
      if (this.$auth.user) {
        this.removeFromBlacklist({ id: this.$auth.user.id, blockId: id }).then(() => {
          if (this.$auth.user) { this.fetchBlacklist(this.$auth.user.id) }
          this.$bvToast.toast('User unblocked successfully', {
            title: 'Unblock user',
            variant: 'success'
          })
        }).catch((error) => {
          this.$bvToast.toast(error.response.data.message, {
            title: 'Unblock user',
            variant: 'danger'
          })
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/chat';

.friends-list {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.friends-list {
  border-right: none;
}

.friend-list__item-status-button {
  border: none;
  background: none;
  color: #fff;
  font-size: 12px;
  padding: 0;
  cursor: pointer;
  margin-right: 15px;
}
</style>
