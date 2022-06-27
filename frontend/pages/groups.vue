<template>
  <div class="direct-wrapper">
    <div class="friends-list">
      <div class="friends-list__search">
        <input v-model="search" type="text" class="friends-list__search-input" placeholder="Search">
      </div>
      <div class="friend-list__item" @click="newGroupDialog = true; selectedId = 0; showSettings = false">
        <div class="friend-list__item-name">
          <span>Create new group</span>
        </div>
      </div>
      <div v-for="group in filteredGroups" :key="group.id" class="friend-list__item" @click="connectToGroup(group.id)">
        <div class="friend-list__item-avatar">
          <img src="api/uploads/logo42.png" alt="">
        </div>
        <div class="friend-list__item-name">
          <span>{{ group.name }}</span>
        </div>
        <div class="friend-list__item-status">
          <span v-if="group.mode === 'private' || group.mode === 'protected'" class="offline">{{ group.mode }}</span>
          <span v-else class="online">{{ group.mode }}</span>
        </div>
      </div>
    </div>
    <div class="direct-container">
      <div v-if="selectedId" class="d-flex flex-row justify-content-end">
        <button type="button" class="settings__button" @click="showSettings = !showSettings">
          <svg
            width="24"
            height="24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ><path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126" /></svg>
        </button>
        <button type="button" class="settings__button" @click="deleteGroup(group.id)">
          <svg
            width="24"
            height="24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z" /></svg>
        </button>
      </div>
      <div v-if="newGroupDialog" class="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div>
          <div class="d-flex flex-row">
            <input v-model="form.name" type="text" class="new-group__input" placeholder="Group name">
            <button class="new-group__button" @click="createNewGroup">
              <svg
                width="21px"
                height="21px"
                fill="#fff"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-9.25 6.75v-3c0-.414.336-.75.75-.75s.75.336.75.75v3h3c.414 0 .75.336.75.75s-.336.75-.75.75h-3v3c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3h-3c-.414 0-.75-.336-.75-.75s.336-.75.75-.75z"
                  fill-rule="nonzero"
                />
              </svg>
            </button>
          </div>
        </div>
        <p v-for="error in form.errors" :key="error" class="small text-warning">
          {{ error }}
        </p>
      </div>
      <div v-if="!newGroupDialog && !showSettings" class="messages-list">
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
      <div v-if="!newGroupDialog && !showSettings" class="messages-input">
        <textarea
          v-if="selectedId"
          v-model="message"
          class="messages-input__textarea"
          placeholder="Type your message here"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="sendDirectMessage"
        />
      </div>
      <div v-if="showSettings" class="overflow-y">
        <div class="row d-flex justify-content-center">
          <div class="col-md-10">
            <div class="content-section-title">
              Group settings
            </div>
            <div class="group-settings">
              <b-form-select v-model="updateForm.mode" :options="options" />
              <input v-model="updateForm.password" type="text" class="new-group__input mt-3" placeholder="Group password">
              <button type="button" class="app-button mt-3" @click="updateCurrentGroup">
                Update
              </button>
            </div>
            <div class="content-section-title pt-3">
              Active users
            </div>
            <div v-for="user in group.users" :key="group.id" class="friend-list__item">
              <div class="friend-list__item-avatar">
                <img src="api/uploads/logo42.png" alt="">
              </div>
              <div class="friend-list__item-name">
                <span>{{ group.name }}</span>
              </div>
              <div class="friend-list__item-status">
                <b-dropdown id="dropdown-1" size="sm" text="Dropdown Button" class="m-md-2">
                  <template #button-content />
                  <b-dropdown-item-button>
                    Invite to play
                  </b-dropdown-item-button>
                  <b-dropdown-divider />
                  <b-dropdown-group header="Channel owner">
                    <b-dropdown-item-button>Give administrator privileges</b-dropdown-item-button>
                    <b-dropdown-item-button>Remove administrator privileges</b-dropdown-item-button>
                  </b-dropdown-group>
                  <b-dropdown-group header="Administrator">
                    <b-dropdown-item-button>Unban</b-dropdown-item-button>
                    <b-dropdown-item-button>Ban</b-dropdown-item-button>
                    <b-dropdown-item-button>Ban for 15m</b-dropdown-item-button>
                    <b-dropdown-item-button>Unmute</b-dropdown-item-button>
                    <b-dropdown-item-button>Mute</b-dropdown-item-button>
                    <b-dropdown-item-button>Mute for 15m</b-dropdown-item-button>
                  </b-dropdown-group>
                </b-dropdown>
              </div>
            </div>
            <div class="content-section-title pt-3">
              Users
            </div>
            <div v-for="user in users" :key="user.id" class="friend-list__item">
              <div class="friend-list__item-avatar">
                <img :src="'/api/uploads/' + user.id + '.png'" alt="">
              </div>
              <div class="friend-list__item-name">
                <span>{{ user.username }}</span>
              </div>
              <div class="friend-list__item-status">
                <span>Invite</span>
              </div>
            </div>
          </div>
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
  data () {
    return {
      selectedId: 0 as number,
      newGroupDialog: false as boolean,
      message: '' as string,
      messages: [] as any,
      form: {
        name: '' as string,
        errors: [] as string[]
      },
      updateForm: {
        mode: '' as string,
        password: '' as string,
        errors: [] as string[]
      },
      search: '' as string,
      showSettings: false as boolean,
      options: [
        { text: 'Public', value: 'public' },
        { text: 'Invite only', value: 'private' },
        { text: 'Password protected', value: 'protected' }
      ],
      selected: 'public' as string
    }
  },
  computed: {
    ...mapGetters({
      group: 'groups/group',
      groups: 'groups/groups',
      users: 'users/users'
    }),
    filteredGroups (): any {
      return this.groups.filter((group: { name: string; }) => {
        return group.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted (): void {
    this.fetchGroups()
    this.fetchUsers()
  },
  methods: {
    ...mapActions({
      fetchGroup: 'groups/fetchGroup',
      fetchGroups: 'groups/fetchGroups',
      createGroup: 'groups/createGroup',
      updateGroup: 'groups/updateGroup',
      fetchUsers: 'users/fetchUsers',
      deleteGroup: 'groups/deleteGroup'
    }),
    connectToGroup (id: number): void {
      this.newGroupDialog = false
      this.showSettings = false
      this.selectedId = id
      this.fetchGroup({ id, data: { password: '' }}).then(() => {
        this.updateForm.mode = this.group.mode
      }).catch(() => {
        this.selectedId = 0
        this.$bvToast.toast('Group not found', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      })
      // eslint-disable-next-line no-console
      console.log('Connect to: ' + id)
    },
    createNewGroup (): void {
      if (this.$auth.user) {
        this.createGroup({ ownerId: this.$auth.user.id, name: this.form.name }).then(() => {
          this.fetchGroups()
          this.form.errors = []
        }).catch((error) => {
          this.form.errors = error.response.data.message
        })
      }
    },
    updateCurrentGroup (): void {
      this.updateGroup({ id: this.selectedId, data: { ...this.updateForm } }).then(() => {
        this.fetchGroups()
        this.fetchGroup(this.selectedId)
      })
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/pages/chat';
</style>
