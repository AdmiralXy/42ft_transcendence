<template>
  <div v-if="isActive" class="d-flex flex-column align-items-center justify-content-center flex-grow-1">
<!--    <div class="messages-list">-->
<!--      <div class="messages-list-scrollable">-->
<!--        <div-->
<!--          v-for="item in messages"-->
<!--          :key="item.id"-->
<!--          class="message-item"-->
<!--          :class="item.sender.id === $auth.user.id ? 'message-item-to' : 'message-item-from'"-->
<!--        >-->
<!--          <div class="message-item__content">-->
<!--            <div class="message-item__user">-->
<!--              <div class="message-item__content-avatar">-->
<!--                <img :src="'/api/uploads/' + item.sender.id + '.png'" alt="">-->
<!--              </div>-->
<!--              <div class="message-item__content-username">-->
<!--                <span>{{ item.sender.username }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="message-item__content-message">-->
<!--              <p>{{ item.text }}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="messages-input">-->
<!--      <textarea-->
<!--        v-if="selectedId"-->
<!--        v-model="message"-->
<!--        class="messages-input__textarea"-->
<!--        placeholder="Type your message here"-->
<!--        @keydown.enter.exact.prevent-->
<!--        @keyup.enter.exact="sendDirectMessage"-->
<!--      />-->
<!--    </div>-->
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
        name: '',
        errors: []
      }
    }
  },
  computed: {
    isActive (): boolean {
      return this.state === State.CONNECTED
    }
  },
  methods: {
    ...mapActions(['createGroup']),
    submit () {

    }
  }
})
</script>

<style lang="scss" scoped>

</style>
