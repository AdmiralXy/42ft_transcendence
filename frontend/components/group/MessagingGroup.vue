<template>
  <div class="direct-container" v-if="isActive">
    <div class="messages-list">
      <div class="messages-list-scrollable">
        <div
          v-for="item in messages"
          :key="item.id"
          class="message-item"
          :class="item.sender.id === $auth.user.id ? 'message-item-to' : 'message-item-from'"
        >
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
        v-model="message"
        class="messages-input__textarea"
        placeholder="Type your message here"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="createGroupMessage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'
import { io } from 'socket.io-client'
import { State } from '~/types/group-state'

export default Vue.extend({
  layout: 'app',
  props: {
    id: {
      type: Number,
      required: true
    },
    state: {
      type: Number as unknown as PropType<State>,
      required: true
    }
  },
  data () {
    return {
      socket: null as any,
      message: '' as string,
      messages: [] as any[]
    }
  },
  computed: {
    isActive (): boolean {
      return this.state === State.CONNECTED
    }
  },
  watch: {
    state (): void {
      if (this.state === State.CONNECTED) {
        console.log('state connected')
        this.openSocketConnection()
      } else {
        console.log('state disconnected')
        this.closeSocketConnection()
      }
    }
  },
  methods: {
    ...mapActions(['createGroup']),
    closeSocketConnection (): void {
      if (this.socket && this.socket.connected) {
        this.socket.disconnect()
      }
    },
    openSocketConnection (): void {
      // eslint-disable-next-line no-console
      const socketOptions = {
        transportOptions: {
          polling: {
            extraHeaders: {
              // @ts-ignore
              Authorization: this.$auth.strategy.token.get()
            }
          }
        }
      }

      this.closeSocketConnection()
      this.socket = io(this.$config.BASE_URL, socketOptions)
      this.socket.on('connect', () => {
        this.socket.on('exception', (error: any) => {
          this.socket.disconnect()
          this.$bvToast.toast(error.message, {
            title: 'Group',
            variant: 'warning'
          })
        })

        this.socket.on('groupMessage', (response: any) => {
          this.messages.push(response)
        })

        if (this.$auth.user) {
          this.socket.emit('joinGroup', { id: this.$auth.user.id })
        }
      })
    },
    createGroupMessage (): void {
      if (this.$auth.user && this.message.length > 0) {
        this.socket.emit('createGroupMessage', {
          id: this.$auth.user.id,
          text: this.message
        })
        this.message = ''
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
