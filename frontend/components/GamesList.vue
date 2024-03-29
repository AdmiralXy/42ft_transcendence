<template>
  <div v-if="finishedMatches && finishedMatches.length > 0" class="content-section">
    <div class="content-section-title">
      Latest games:
    </div>
    <ul>
      <li v-for="match in finishedMatches" :key="match.id" class="game-item game-item__active" @click="$router.push({ name: 'pong-match-results', params: { id: match.id } })">
        <div class="game-info">
          <div>{{ match.player1.username }}</div>
          <svg
            fill="#fff"
            width="24px"
            height="24px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--emojione-monotone"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M52 2H12C6.477 2 2 6.477 2 12v40c0 5.523 4.477 10 10 10h40c5.523 0 10-4.477 10-10V12c0-5.523-4.477-10-10-10M23.23 44.365h-4.877L10 19.72h5.514l5.363 18.71l5.412-18.71h5.363L23.23 44.365m28.153-1.595C49.639 44.257 47.174 45 43.988 45c-3.252 0-5.809-.732-7.672-2.197c-1.863-1.467-2.795-3.481-2.795-6.045h4.928c.158 1.125.473 1.967.939 2.524c.855 1.016 2.322 1.521 4.398 1.521c1.242 0 2.252-.134 3.029-.401c1.471-.512 2.207-1.465 2.207-2.859c0-.813-.361-1.443-1.082-1.889c-.721-.436-1.865-.82-3.43-1.154l-2.674-.584c-2.629-.581-4.434-1.211-5.418-1.891c-1.664-1.136-2.496-2.915-2.496-5.334c0-2.207.813-4.04 2.441-5.501c1.629-1.46 4.021-2.19 7.178-2.19c2.635 0 4.883.688 6.742 2.065c1.861 1.376 2.836 3.375 2.928 5.994H48.25c-.092-1.482-.756-2.536-1.994-3.16c-.824-.412-1.85-.62-3.074-.62c-1.363 0-2.451.269-3.266.804c-.813.535-1.219 1.283-1.219 2.24c0 .881.4 1.539 1.203 1.975c.516.289 1.609.629 3.281 1.019l4.336 1.021c1.898.446 3.324 1.042 4.271 1.789C53.264 33.285 54 34.962 54 37.159c0 2.252-.871 4.121-2.617 5.611"
              fill="currentColor"
            />
          </svg>
          <div>{{ match.player2.username }}</div>
        </div>
        <div v-if="match.winner.id === userId" class="game-status">
          <span class="status-circle green" />
          <span v-if="match.type !== 'MATCHMAKING'">Win (+0 MMR)</span>
          <span v-else>Win (+25 MMR)</span>
        </div>
        <div v-else class="game-status">
          <span class="status-circle red" />
          <span v-if="match.type !== 'MATCHMAKING'">Lose (-0 MMR)</span>
          <span v-else>Lose (-25 MMR)</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  layout: 'app',
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      finishedMatches: 'matches/finishedMatches'
    })
  },
  mounted (): void {
    this.fetchMatches(this.userId)
  },
  methods: {
    ...mapActions({
      fetchMatches: 'matches/fetchMatches'
    })
  }
})
</script>

<style lang="scss" scoped>
.game-item {
  list-style: none;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  font-size: 16px;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  transition: 0.3s;
}

.game-info {
  display: flex;
  align-items: center;
  width: 150px;
}

.game-info svg {
  width: 28px;
  border-radius: 6px;
  margin-right: 10px;
  margin-left: 10px;
  flex-shrink: 0;
}

.game-status {
  margin-left: auto;
  width: 140px;
  font-size: 15px;
  position: relative;
}

.status-circle {
  width: 6px;
  height: 6px;
  background-color: #396df0;
  position: absolute;
  border-radius: 50%;
  top: 8px;
  left: -20px;
}

.status-circle.green {
  background-color: #3bf083;
}

.status-circle.red {
  background-color: #f14949;
}
</style>
