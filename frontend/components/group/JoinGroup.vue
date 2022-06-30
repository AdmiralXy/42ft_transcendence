<template>
  <div v-if="isActive" class="d-flex flex-column align-items-center justify-content-center flex-grow-1">
    <div>
      <div class="d-flex flex-row">
        <input v-model="form.password" type="text" class="new-group__input" placeholder="Group password" @keydown.enter="submit">
        <button class="new-group__button" @click="submit">
          <svg
            fill="#fff"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ><path d="M11 10v-4c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h-1v-2c0-3.312 2.689-6 6-6s6 2.689 6 6v4h10v14h-18v-14h7zm10 1h-16v12h16v-12z" /></svg>
        </button>
      </div>
    </div>
    <p v-for="error in form.errors" :key="error" class="small text-warning pt-2">
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
      form: {
        password: '',
        errors: [] as string[]
      }
    }
  },
  computed: {
    isActive (): boolean {
      return this.state === State.CONNECTING
    }
  },
  methods: {
    ...mapActions({
      joinGroup: 'groups/joinGroup',
      fetchGroup: 'groups/fetchGroup'
    }),
    submit () {
      this.form.errors = []
      this.joinGroup({ id: this.id, data: { password: this.form.password } }).then(() => {
        this.fetchGroup({ id: this.id }).then(() => {
          this.$parent.$emit('stateChanged', State.CONNECTED)
        })
      }).catch((error) => {
        this.form.errors.push(error.response.data.message)
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
