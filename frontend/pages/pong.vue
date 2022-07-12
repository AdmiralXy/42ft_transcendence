<template>
  <div class="pong-game">
    <button type="button" class="pong-game__button">
      Start matchmaking
    </button>
    <button type="button" class="pong-game__button pong-game__button-train" @click="$router.push({ name: 'pong-train' })">
      Train
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { io } from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  layout: 'app',
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.pong-game {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.pong-game__button {
  border: none;
  padding: 12px;
  background: rgba(207, 177, 31, 0.93);
  margin: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: ease 0.4s;
}

.pong-game__button:hover {
  background: #ccc;
}
</style>
