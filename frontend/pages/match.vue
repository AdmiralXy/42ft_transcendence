<template>
  <div class="pong-container">
    <div :hidden="Object.keys(state).length === 0">
      <div class="pong">
        <canvas ref="canvas" :width="width" :height="height" />
      </div>
      <button type="button" class="pong__theme-button" @click="toggleTheme">
        Theme
      </button>
    </div>
    <div v-if="winner.length > 0">
      <div class="pong__winner">
        <h1>Winner: {{ winner }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { io } from 'socket.io-client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BvToast } from 'bootstrap-vue'

export default Vue.extend({
  layout: 'app',
  data: () => ({
    socket: null as any,
    width: 960 as number,
    height: 540 as number,
    theme: 'classic' as string,
    state: {} as any,
    canvas: null as HTMLCanvasElement | null,
    ctx: null as CanvasRenderingContext2D | null,
    winner: '' as string,
    isKeyUp: false as boolean,
    isKeyDown: false as boolean
  }),
  mounted () {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    // register event on arrow up/down keys
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 38) {
        this.isKeyUp = true
      } else if (e.keyCode === 40) {
        this.isKeyDown = true
      } else if (e.keyCode === 39) {
        this.isKeyUp = true
      } else if (e.keyCode === 37) {
        this.isKeyDown = true
      }
    })
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 38) {
        this.isKeyUp = false
      } else if (e.keyCode === 40) {
        this.isKeyDown = false
      } else if (e.keyCode === 39) {
        this.isKeyUp = false
      } else if (e.keyCode === 37) {
        this.isKeyDown = false
      }
    })
    // timer for up/down movement
    setInterval(() => {
      if (this.isKeyUp) {
        this.socket.emit('matchMove', { matchId: this.$route.params.id, direction: 'UP' })
      }
      if (this.isKeyDown) {
        this.socket.emit('matchMove', { matchId: this.$route.params.id, direction: 'DOWN' })
      }
    }, 24)
    this.openSocketConnection()
  },
  methods: {
    closeSocketConnection (): void {
      if (this.socket && this.socket.connected) {
        this.socket.disconnect()
      }
    },
    openSocketConnection (): void {
      const socketOptions = {
        transportOptions: {
          polling: {
            extraHeaders: {
              // @ts-ignore
              Authorization: this.$auth.strategy.token.get()
            }
          }
        }
      }

      this.closeSocketConnection()
      this.socket = io(this.$config.BASE_URL, socketOptions)
      this.socket.on('connect', () => {
        this.socket.on('exception', (error: any) => {
          this.$bvToast.toast(error.message, {
            autoHideDelay: 8000,
            title: 'Pong match',
            variant: 'warning'
          })
          this.closeSocketConnection()
        })

        this.socket.on('matchUpdate', (response: any) => {
          this.state = response
          this.draw()
        })

        this.socket.on('matchFinished', (response: any) => {
          this.state = {}
          this.winner = response.winner
          this.$router.push({ name: 'pong-match-results', params: { id: this.$route.params.id } })
        })

        if (this.$auth.user) {
          this.socket.emit('matchJoin', { matchId: this.$route.params.id })
          this.socket.emit('updateUserStatus', { status: 'in-game' })
        }
      })
    },
    toggleTheme () {
      this.theme = this.theme === 'classic' ? 'neon' : 'classic'
    },
    draw () {
      if (this.theme === 'classic') {
        this.drawClassic()
      } else if (this.theme === 'neon') {
        this.drawNeon()
      }
    },
    drawNeon (): void {
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // fill background with abstract neon color
        this.ctx.fillStyle = 'rgb(108,203,203)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        // draw player 1 with neon border
        this.ctx.fillStyle = '#00ffff'
        this.ctx.fillRect(this.state.player1.x, this.state.player1.y, this.state.player1.width, this.state.player1.height)
        this.ctx.strokeStyle = '#0c1ad0'
        this.ctx.strokeRect(this.state.player1.x, this.state.player1.y, this.state.player1.width, this.state.player1.height)
        // draw player 1 with neon border
        this.ctx.fillStyle = '#00ffff'
        this.ctx.fillRect(this.state.player2.x, this.state.player2.y, this.state.player2.width, this.state.player2.height)
        this.ctx.strokeStyle = '#0c1ad0'
        this.ctx.strokeRect(this.state.player2.x, this.state.player2.y, this.state.player2.width, this.state.player2.height)
        // draw ball as circle with border and offset for center
        this.ctx.fillStyle = '#0c1ad0'
        this.ctx.beginPath()
        this.ctx.arc(this.state.ball.x + this.state.ball.width / 2, this.state.ball.y + this.state.ball.height / 2, this.state.ball.width / 2, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.strokeStyle = '#0c1ad0'
        this.ctx.stroke()
        // draw shadow for ball
        this.ctx.shadowColor = '#0c1ad0'
        this.ctx.shadowBlur = 5
        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 0
        this.drawMetaInfo()
        this.drawLine()
      }
    },
    drawClassic (): void {
      if (this.ctx && this.canvas) {
        this.ctx.fillStyle = '#ffffff'
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillRect(this.state.player1.x, this.state.player1.y, this.state.player1.width, this.state.player1.height)
        this.ctx.fillRect(this.state.player2.x, this.state.player2.y, this.state.player2.width, this.state.player2.height)
        // draw ball
        this.ctx.fillRect(this.state.ball.x, this.state.ball.y, this.state.ball.width, this.state.ball.height)
        this.drawMetaInfo()
        this.drawLine()
      }
    },
    drawMetaInfo (): void {
      if (this.ctx && this.canvas) {
        // draw score
        this.ctx.fillStyle = '#0c1ad0'
        this.ctx.font = '30px Arial'
        // score to string
        this.ctx.fillText(this.state.player1.score.toString(), 50, 50)
        this.ctx.fillText(this.state.player2.score.toString(), this.width - 50, 50)
      }
    },
    drawLine (): void {
      if (this.ctx && this.canvas) {
        // draw line between players
        this.ctx.beginPath()
        this.ctx.moveTo(this.width / 2, 0)
        this.ctx.lineTo(this.width / 2, this.height)
        this.ctx.strokeStyle = '#0c1ad0'
        this.ctx.stroke()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.pong-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

.pong {
  width: 960px;
  height: 540px;
  background: #000;
  position: relative;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.pong__theme-button {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.pong__winner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 0 0 10px #000;
}
</style>
