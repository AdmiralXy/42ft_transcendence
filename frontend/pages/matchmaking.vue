<template>
  <div class="matchmaking-container">
    <p><b-spinner label="Spinning" small /> Searching enemy</p>
    <p class="small">
      {{ timer }} seconds elapsed
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { io } from 'socket.io-client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BvToast } from 'bootstrap-vue'

export default Vue.extend({
  layout: 'app',
  data () {
    return {
      socket: null as any,
      timer: 1 as number
    }
  },
  mounted () {
    setInterval(() => {
      this.timer++
    }, 1000)
    this.openSocketConnection()
  },
  beforeDestroy () {
    this.closeSocketConnection()
  },
  methods: {
    closeSocketConnection (): void {
      if (this.socket && this.socket.connected) {
        this.socket.disconnect()
      }
    },
    openSocketConnection (): void {
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
          this.$bvToast.toast(error.message, {
            title: 'Matchmaking',
            variant: 'warning'
          })
        })

        this.socket.on('matchmakingCreated', (response: any) => {
          this.$router.push({ name: 'pong-match', params: { id: response.id } })
          this.closeSocketConnection()
        })

        if (this.$auth.user) {
          this.socket.emit('matchmakingJoin', { id: this.$auth.user.id })
          this.socket.emit('updateUserStatus', { status: 'in-matchmaking-queue' })
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.matchmaking-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
