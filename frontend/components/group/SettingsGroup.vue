<template>
  <div v-if="isActive" class="col-12">
    <div v-if="isOwner">
      <div class="content-section-title">
        Group settings
      </div>
      <div class="group-settings">
        <b-form-select v-model="updateForm.mode" :options="options" />
        <input v-model="updateForm.password" type="text" class="new-group__input mt-3" placeholder="Group password">
        <span v-for="error in updateForm.errors" :key="error" class="small text-warning pt-2">{{ error }}</span>
        <button type="button" class="app-button mt-3" @click="updateCurrentGroup">
          Update
        </button>
      </div>
    </div>
    <div class="content-section-title pt-3">
      Active users
    </div>
    <div v-for="user in group.users" :key="'s-' + user.id" class="friend-list__item">
      <div class="friend-list__item-avatar">
        <svg
          v-if="group.owner.id === user.id"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ddbf61"
          width="21"
          height="21"
          viewBox="0 0 24 24"
        ><path d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-1.293l7.06-7.06c-.214-.26-.413-.533-.599-.815l-6.461 6.461v-2.293l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z" /></svg>
        <svg
          v-else-if="group.admin_list.some(e => e.id === user.id)"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ddbf61"
          width="21"
          height="21"
          viewBox="0 0 24 24"
        ><path d="M12 4.942c1.827 1.105 3.474 1.6 5 1.833v7.76c0 1.606-.415 1.935-5 4.76-4.592-2.826-5-3.158-5-4.76v-7.76c1.526-.233 3.173-.728 5-1.833zm9-1.942v11.535c0 4.603-3.203 5.804-9 9.465-5.797-3.661-9-4.862-9-9.465v-11.535c3.516 0 5.629-.134 9-3 3.371 2.866 5.484 3 9 3zm-2 1.96c-2.446-.124-4.5-.611-7-2.416-2.5 1.805-4.554 2.292-7 2.416v9.575c0 3.042 1.69 3.83 7 7.107 5.313-3.281 7-4.065 7-7.107v-9.575z" /></svg>
        <img :src="'/api/uploads/' + user.id + '.png'" alt="">
      </div>
      <div class="friend-list__item-name">
        <span>{{ user.username }}</span>
      </div>
      <div class="friend-list__item-status">
        <b-dropdown
          size="sm"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          class="m-md-2"
          right
        >
          <template #button-content>
            <svg
              fill="#fff"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ><path d="M14 19h-14v-1h14v1zm9.247-8.609l-3.247 4.049-3.263-4.062-.737.622 4 5 4-5-.753-.609zm-9.247 2.609h-14v-1h14v1zm0-6h-14v-1h14v1z" /></svg>
          </template>
          <b-dropdown-item-button>
            Invite to play
          </b-dropdown-item-button>
          <b-dropdown-divider v-if="isOwner || isAdmin" />
          <b-dropdown-group v-if="isOwner" header="Channel owner">
            <b-dropdown-item-button @click="addAdmin({ id, data: { userId: user.id } }).catch((e) => { showError(e) })">
              Make admin
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="removeAdmin({ id, data: { userId: user.id } }).catch((e) => { showError(e) })">
              Remove admin
            </b-dropdown-item-button>
          </b-dropdown-group>
          <b-dropdown-group v-if="isAdmin" header="Administrator">
            <b-dropdown-item-button @click="removeFromBanList({ id, data: { userId: user.id } }).catch((e) => { showError(e) })">
              Unban
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="addToBanList({ id, data: { userId: user.id, seconds: 3155760000 } }).catch((e) => { showError(e) })">
              Ban
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="addToBanList({ id, data: { userId: user.id, seconds: 900 } }).catch((e) => { showError(e) })">
              Ban for 15m
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="removeFromMuteList({ id, data: { userId: user.id } }).catch((e) => { showError(e) })">
              Unmute
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="addToMuteList({ id, data: { userId: user.id, seconds: 3155760000 } }).catch((e) => { showError(e) })">
              Mute
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="addToMuteList({ id, data: { userId: user.id, seconds: 900 } }).catch((e) => { showError(e) })">
              Mute for 15m
            </b-dropdown-item-button>
          </b-dropdown-group>
        </b-dropdown>
      </div>
    </div>
    <div class="content-section-title pt-3">
      Users
    </div>
    <div v-for="user in users" :key="'i-' + user.id" class="friend-list__item">
      <div class="friend-list__item-avatar">
        <img :src="'/api/uploads/' + user.id + '.png'" alt="">
      </div>
      <div class="friend-list__item-name">
        <span>{{ user.username }}</span>
      </div>
      <div v-if="isAdmin" class="friend-list__item-status" @click="addToInviteList({ id, data: { userId: user.id } })">
        <span>Invite</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapGetters } from 'vuex'
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
      updateForm: {
        mode: '' as string,
        password: '' as string,
        errors: [] as string[]
      },
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
      users: 'users/users'
    }),
    isActive (): boolean {
      return this.state === State.SETTINGS
    },
    isAdmin (): boolean {
      return this.isOwner || this.group.admin_list.some((e: any) => this.$auth.user && e.id === this.$auth.user.id)
    },
    isOwner (): boolean {
      if (this.$auth.user) {
        return this.group.owner.id === this.$auth.user.id
      }
      return false
    }
  },
  mounted () {
    this.fetchUsers()
  },
  methods: {
    ...mapActions({
      updateGroup: 'groups/updateGroup',
      fetchUsers: 'users/fetchUsers',
      addAdmin: 'groups/addAdmin',
      removeAdmin: 'groups/removeAdmin',
      addToInviteList: 'groups/addToInviteList',
      removeFromInviteList: 'groups/removeFromInviteList',
      addToBanList: 'groups/addToBanList',
      removeFromBanList: 'groups/removeFromBanList',
      addToMuteList: 'groups/addToMuteList',
      removeFromMuteList: 'groups/removeFromMuteList'
    }),
    isAdminUser (user: any): boolean {
      return this.group.owner.id === user.id || this.group.admin_list.some((e: any) => e.id === user.id)
    },
    updateCurrentGroup (): void {
      this.updateGroup({ id: this.id, data: { ...this.updateForm } }).then(() => {
        this.updateForm.errors = []
        this.$parent.$parent.$emit('groupUpdated')
      }).catch((error) => {
        this.updateForm.errors = error.response.data.message
      })
    },
    showError (e: any): void {
      this.$bvToast.toast(e.response.data.message, {
        title: 'Group ' + this.group.name,
        variant: 'warning',
        solid: true,
        autoHideDelay: 5000
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
