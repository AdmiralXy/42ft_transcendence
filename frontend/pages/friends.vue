<template>
  <div class="direct-wrapper">
    <div class="friends-list">
      <div class="friends-list__search">
        <input type="text" class="friends-list__search-input" v-model="searchFriends" placeholder="Your friends">
      </div>
      <div class="friend-list__item" v-for="user in filteredFriends">
        <div class="friend-list__item-avatar">
          <img :src="'/api/uploads/' + user.image" alt="">
        </div>
        <div class="friend-list__item-name" @click="$router.push({ name: 'profile', params: { id: user.id } })">
          <span>{{ user.username }}</span>
        </div>
        <div class="friend-list__item-status">
          <button class="friend-list__item-status-button text-warning" @click="addUserFriend(user.id)">Remove</button>
        </div>
      </div>
    </div>
    <div class="friends-list">
      <div class="friends-list__search">
        <input type="text" class="friends-list__search-input" v-model="searchAll" placeholder="Search by all users">
      </div>
      <div class="friend-list__item" v-for="user in filteredUsers">
        <div class="friend-list__item-avatar">
          <img :src="'/api/uploads/' + user.image" alt="">
        </div>
        <div class="friend-list__item-name" @click="$router.push({ name: 'profile', params: { id: user.id } })">
          <span>{{ user.username }}</span>
        </div>
        <div class="friend-list__item-status">
          <button class="friend-list__item-status-button text-success" @click="addUserFriend(user.id)">Invite to friends</button>
          <button class="friend-list__item-status-button text-danger" @click="blockUser(user.id)">Block</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapActions, mapGetters} from "vuex";

export default Vue.extend({
  layout: "app",
  data: () => ({
    searchFriends: '',
    searchAll: ''
  }),
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
      fetchFriends: 'friends/fetchFriends',
      addFriend: 'users/addFriend',
      removeFriend: 'friends/removeFriend',
    }),
    addUserFriend(id: number) {
      if (this.$auth.user)
        this.addFriend({ id: this.$auth.user.id, friendId: id });
    },
    removeUserFriend(id: number) {
      if (this.$auth.user)
        this.removeFriend({ id: this.$auth.user.id, friendId: id });
    },
  },
  computed: {
    ...mapGetters({
      users: 'users/users',
      friends: 'friends/friends'
    }),
    filteredFriends() {
      return this.friends.filter((user: { username: string; }) => {
        return user.username.toLowerCase().includes(this.searchFriends.toLowerCase())
      })
    },
    filteredUsers() {
      return this.users.filter((user: { username: string; }) => {
        return user.username.toLowerCase().includes(this.searchAll.toLowerCase())
      })
    }
  },
  async mounted() {
    await this.fetchUsers()
    if (this.$auth.user)
      await this.fetchFriends({ id: this.$auth.user.id})
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
