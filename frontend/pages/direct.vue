<template>
  <div class="direct-wrapper">
    <div class="friends-list">
      <div class="friends-list__search">
        <input v-model="search" type="text" class="friends-list__search-input" placeholder="Search">
      </div>
      <div v-for="friend in filteredFriends" :key="friend.id" class="friend-list__item" @click="selectUser(friend.id)">
        <div class="friend-list__item-avatar">
          <img :src="'api/uploads/' + friend.image" alt="">
        </div>
        <div class="friend-list__item-name">
          <span>{{ friend.username }}</span>
        </div>
        <div class="friend-list__item-status">
          <span v-if="friend.status === 0" class="offline">Offline</span>
          <span v-else-if="friend.status === 1" class="online">Online</span>
          <span v-else class="ingame">In game</span>
        </div>
      </div>
    </div>
    <div class="direct-container">
      <div class="messages-list">
        <div class="messages-list-scrollable">
          <div v-for="item in messages" :key="item.id" class="message-item" :class="item.sender.id === $auth.user.id ? 'message-item-to' : 'message-item-from'">
            <div class="message-item__content">
              <div class="message-item__user">
                <div class="message-item__content-avatar">
                  <img :src="'/api/uploads/' + item.sender.id + '.png'" alt="">
                </div>
                <div class="message-item__content-username">
                  <span>{{ item.sender.username }}</span>
                </div>
              </div>
              <div class="message-item__content-message">
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="messages-input">
        <textarea
          v-if="selectedId"
          v-model="message"
          class="messages-input__textarea"
          placeholder="Type your message here"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="sendDirectMessage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { io } from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  layout: 'app',
  data: () => ({
    search: '',
    messages: [] as any,
    message: '' as string,
    selectedId: 0 as number,
    socket: null as any
  }),
  computed: {
    ...mapGetters({
      friends: 'friends/friends'
    }),
    filteredFriends (): any {
      return this.friends.filter((user: { username: string; }) => {
        return user.username.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted (): void {
    if (this.$auth.user) { this.fetchFriends(this.$auth.user.id) }
  },
  beforeDestroy () {
    this.closeSocketConnection()
  },
  methods: {
    ...mapActions({
      fetchFriends: 'friends/fetchFriends'
    }),
    closeSocketConnection () {
      if (this.socket && this.socket.connected) {
        this.socket.disconnect()
      }
    },
    sendDirectMessage () {
      if (this.message.length > 0 && this.$auth.user) {
        this.socket.emit('createDirect', { senderId: this.$auth.user.id, receiverId: this.selectedId, text: this.message })
        this.message = ''
      }
    },
    selectUser (id: number) {
      this.selectedId = id
      this.closeSocketConnection()
      this.socket = io('http://localhost')

      this.socket.on('connect', () => {
        this.socket.on('exception', (error: any) => {
          this.socket.disconnect()
          this.$bvToast.toast(error.message, {
            title: 'Direct message',
            variant: 'warning'
          })
        })

        this.socket.on('messageDirect', (response: any) => {
          this.messages.push(response)
        })

        if (this.$auth.user) {
          this.socket.emit('joinDirect', { id: this.$auth.user.id, friendId: this.selectedId }, (response: any) => {
            this.messages = response
          })
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/chat';
</style>
