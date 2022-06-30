<template>
  <div v-if="isActive" class="d-flex flex-column align-items-center justify-content-center flex-grow-1">
    <div>
      <div class="d-flex flex-row">
        <input v-model="form.name" type="text" class="new-group__input" placeholder="Group name" @keydown.enter="submit">
        <button class="new-group__button" @click="submit">
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
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'
import { State } from '~/types/group-state'

export default Vue.extend({
  layout: 'app',
  props: {
    state: {
      type: Number as unknown as PropType<State>,
      required: true
    }
  },
  data () {
    return {
      form: {
        name: '',
        errors: []
      }
    }
  },
  computed: {
    isActive (): boolean {
      return this.state === State.CREATING
    }
  },
  methods: {
    ...mapActions({
      createGroup: 'groups/createGroup',
      fetchGroups: 'groups/fetchGroups'
    }),
    submit () {
      if (this.$auth.user) {
        this.createGroup({ ownerId: this.$auth.user.id, name: this.form.name }).then(() => {
          this.fetchGroups()
          this.form.errors = []
          this.$parent.$emit('stateChanged', State.DISCONNECTED)
        }).catch((error) => {
          this.form.errors = error.response.data.message
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
