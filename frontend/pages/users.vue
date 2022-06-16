<template>
  <div class="direct-wrapper">
    <div class="friends-list">
      <div class="friends-list__search">
        <input type="text" class="friends-list__search-input" v-model="search" placeholder="Search">
      </div>
      <div class="friend-list__item" v-for="user in filteredUsers">
        <div class="friend-list__item-avatar">
          <img :src="'/api/uploads/' + user.image" alt="">
        </div>
        <div class="friend-list__item-name">
          <span>{{ user.username }}</span>
        </div>
        <div class="friend-list__item-status">
          <button class="friend-list__item-status-button text-success" @click="addFriend(user.id)">Add</button>
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
    search: "",
  }),
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
    }),
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    }),
    filteredUsers() {
      return this.users.filter(user => {
        return user.username.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  async mounted() {
    await this.fetchUsers()
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
