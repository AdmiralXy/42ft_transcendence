<template>
  <div v-if="isActive" class="col-12">
    <div v-if="isOwner">
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
    </div>
    <div class="content-section-title pt-3">
      Active users
    </div>
    <div v-for="user in group.users" :key="'s-' + user.id" class="friend-list__item">
      <div class="friend-list__item-avatar">
        <img :src="'/api/uploads/' + user.id + '.png'" alt="">
      </div>
      <div class="friend-list__item-name">
        <span><span v-if="group.admin_list.some(e => e.id === user.id)">Admin:</span> {{ user.username }}</span>
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
          <b-dropdown-divider />
          <b-dropdown-group header="Channel owner">
            <b-dropdown-item-button @click="addAdmin({ id, data: { userId: user.id } })">
              Make admin
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="removeAdmin({ id, data: { userId: user.id } })">
              Remove admin
            </b-dropdown-item-button>
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
    <div v-for="user in users" :key="'i-' + user.id" class="friend-list__item">
      <div class="friend-list__item-avatar">
        <img :src="'/api/uploads/' + user.id + '.png'" alt="">
      </div>
      <div class="friend-list__item-name">
        <span>{{ user.username }}</span>
      </div>
      <div v-if="isAdmin" class="friend-list__item-status">
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
      return this.group.admin_list.some((e: any) => this.$auth.user && e.id === this.$auth.user.id)
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
      addAdmin: 'groups/addAdmin',
      removeAdmin: 'groups/removeAdmin',
      updateGroup: 'groups/updateGroup',
      fetchUsers: 'users/fetchUsers'
    }),
    updateCurrentGroup (): void {
      this.updateGroup({ id: this.id, data: { ...this.updateForm } }).then(() => {
        this.$parent.$parent.$emit('groupUpdated')
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
