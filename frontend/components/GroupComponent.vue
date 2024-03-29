<template>
  <div v-if="isConnected()" class="direct-container">
    <div class="d-flex flex-row justify-content-end mb-3">
      <button type="button" class="settings__button" @click="showSettings">
        <svg
          width="24"
          height="24"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"
          />
        </svg>
      </button>
      <button type="button" class="settings__button" @click="deleteGroup">
        <svg
          v-if="group.owner.id === $auth.user.id"
          width="24"
          height="24"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"
          />
        </svg>
      </button>
    </div>
    <SettingsGroup :id="id" :state="state" />
    <MessagingGroup :id="id" :state="state" :messages="messages" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { io } from 'socket.io-client'
import { State } from '~/types/group-state'
import SettingsGroup from '~/components/group/SettingsGroup.vue'
import MessagingGroup from '~/components/group/MessagingGroup.vue'

export default Vue.extend({
  components: {
    SettingsGroup,
    MessagingGroup
  },
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
      messages: [] as any[]
    }
  },
  computed: {
    ...mapGetters({
      group: 'groups/group',
      blacklist: 'blacklist/blacklist'
    })
  },
  watch: {
    state (): void {
      if (this.state === State.CONNECTED || this.state === State.SETTINGS) {
        this.openSocketConnection()
      } else {
        this.closeSocketConnection()
      }
    }
  },
  mounted (): void {
    this.$on('createGroupMessage', (data: { message: any }) => {
      this.socket.emit('createGroupMessage', {
        id: this.id,
        text: data.message
      })
    })
    this.$on('inviteToPrivateMatch', (data: { id: number }) => {
      this.inviteToPrivateMatch(data.id)
    })
    if (this.$auth.user) {
      this.fetchBlacklist(this.$auth.user.id)
    }
  },
  beforeDestroy (): void {
    this.closeSocketConnection()
  },
  methods: {
    ...mapActions({
      _deleteGroup: 'groups/deleteGroup',
      fetchGroup: 'groups/fetchGroup',
      fetchBlacklist: 'blacklist/fetchBlacklist'
    }),
    isConnected (): boolean {
      return this.state === State.CONNECTED || this.state === State.SETTINGS
    },
    showSettings (): void {
      this.$parent.$emit('stateChanged', State.SETTINGS)
    },
    deleteGroup (): void {
      this._deleteGroup(this.id)
    },
    closeSocketConnection (): void {
      this.messages = []
      if (this.socket && this.socket.connected) {
        this.socket.disconnect()
      }
    },
    inviteToPrivateMatch (id: number): void {
      if (this.isConnected()) {
        this.socket.emit('inviteToPrivateMatch', { id })
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
          if (error.code === 'DISCONNECTED') {
            this.closeSocketConnection()
          }
          this.$bvToast.toast(error.message, {
            title: 'Group ' + this.group.name,
            variant: 'warning'
          })
        })

        this.socket.on('groupMessage', (response: any) => {
          const blacklisted = this.blacklist.find(
            (blacklistedUser: any) => blacklistedUser.id === response.sender.id
          )
          if (!blacklisted) {
            this.messages.push(response)
          }
        })

        this.socket.on('groupStateChanged', () => {
          this.$parent.$emit('groupUpdated')
          this.fetchGroup({ id: this.id })
        })

        this.socket.on('privateMatchInvitation', (response: any) => {
          this.$bvToast.toast(`${response.username} invited you to a private match.`, {
            href: '/pong/match/' + response.matchId,
            title: 'Match invitation',
            variant: 'warning',
            autoHideDelay: 60000
          })
        })

        if (this.$auth.user) {
          this.socket.emit('joinGroup', { id: this.id })
          this.socket.emit('updateUserStatus', { status: 'in-chat' })
        }
      })
    }
  }
})
</script>
