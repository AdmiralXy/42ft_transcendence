<template>
  <div v-if="isActive" class="direct-container">
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
    },
    messages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      message: '' as string
    }
  },
  computed: {
    isActive (): boolean {
      return this.state === State.CONNECTED
    }
  },
  methods: {
    createGroupMessage (): void {
      if (this.message.length > 0) {
        this.$parent.$emit('createGroupMessage', { message: this.message })
        this.message = ''
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
