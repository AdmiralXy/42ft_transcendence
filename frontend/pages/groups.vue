<template>
  <div class="direct-wrapper">
    <div class="friends-list">
      <div class="friends-list__search">
        <input v-model="search" type="text" class="friends-list__search-input" placeholder="Search">
      </div>
      <div class="friend-list__item" @click="createGroup">
        <div class="friend-list__item-name">
          <span>Create new group</span>
        </div>
      </div>
      <div v-for="group in filteredGroups" :key="group.id" class="friend-list__item" @click="joinGroup(group)">
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
      <GroupComponent :id="selectedId" :state="state" />
      <JoinGroup :id="selectedId" :state="state" />
      <NewGroup :state="state" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { State } from '~/types/group-state'
import GroupComponent from '~/components/GroupComponent.vue'
import NewGroup from '~/components/group/NewGroup.vue'
import JoinGroup from '~/components/group/JoinGroup.vue'

export default Vue.extend({
  components: {
    NewGroup,
    JoinGroup,
    GroupComponent
  },
  layout: 'app',
  data () {
    return {
      state: State.DISCONNECTED as State,
      selectedId: 0 as number,
      search: '' as string
    }
  },
  computed: {
    ...mapGetters({
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
    this.$on('stateChanged', (state: State) => {
      this.state = state
    })
    this.$on('groupUpdated', () => {
      this.fetchGroups()
    })
    this.fetchGroups()
  },
  methods: {
    createGroup (): void {
      this.state = State.CREATING
    },
    joinGroup (group: any): void {
      this.state = State.DISCONNECTED
      this.selectedId = group.id
      this.fetchGroup({ id: group.id }).then(() => {
        this.state = State.CONNECTED
      }).catch(() => {
        this.state = State.CONNECTING
      })
    },
    ...mapActions({
      fetchGroup: 'groups/fetchGroup',
      fetchGroups: 'groups/fetchGroups'
    })
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/pages/chat';
</style>
