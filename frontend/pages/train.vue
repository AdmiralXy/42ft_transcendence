<template>
  <div class="pong-container">
    <div class="pong">
      <canvas ref="canvas" :width="width" :height="height" />
    </div>
    <button type="button" class="pong__theme-button" @click="toggleTheme">
      Theme
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'app',
  data: () => ({
    width: 960,
    height: 540,
    theme: 'classic',
    clientState: {} as any,
    state: {
      gameLoopId: null as any,
      player1: {
        x: 0,
        y: 540 / 2,
        width: 10,
        height: 115,
        speed: 10,
        score: 0
      },
      player2: {
        x: 960 - 10,
        y: 540 / 2,
        width: 10,
        height: 115,
        speed: 10,
        score: 0
      },
      ball: {
        x: 960 / 2,
        y: 540 / 2,
        width: 20,
        height: 20,
        angle: Math.PI / 4,
        speed: 4.5
      }
    },
    canvas: null as HTMLCanvasElement | null,
    ctx: null as CanvasRenderingContext2D | null
  }),
  mounted () {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    // register event on arrow up/down keys
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 38) {
        this.state.player1.y -= this.state.player1.speed
        // prevent player from going out of bounds
        if (this.state.player1.y < 0) {
          this.state.player1.y = 0
        }
      } else if (e.keyCode === 40) {
        this.state.player1.y += this.state.player1.speed
        // prevent player from going out of bounds
        if (this.state.player1.y > this.height - this.state.player1.height) {
          this.state.player1.y = this.height - this.state.player1.height
        }
      }
    })
    this.loopServerState()
  },
  methods: {
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
        this.ctx.fillStyle = '#00ffff'
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
    },
    loopServerState (): void {
      this.state.gameLoopId = setInterval(() => {
        this.game()
        this.clientState = this.state
        this.draw()
      }, 10)
    },
    game (): void {
      this.ballMove()
      this.computerMove()
    },
    ballMove (): void {
      // move ball according to angle
      this.state.ball.x += this.state.ball.speed * Math.cos(this.state.ball.angle)
      this.state.ball.y += this.state.ball.speed * Math.sin(this.state.ball.angle)
      if (!this.checkHitPlayer()) {
        this.checkOutOfBounds()
      }
    },
    checkOutOfBounds (): void {
      if (this.state.ball.x < 0) {
        this.state.ball.x = 0
        this.state.ball.angle = Math.PI - this.state.ball.angle
        this.state.player2.score++
        // reset ball position
        this.state.ball.x = this.width / 2 - this.state.ball.width / 2
        this.state.ball.y = this.height / 2 - this.state.ball.height / 2
        // reset ball angle
        this.state.ball.angle = Math.PI
        if (this.state.player2.score === 5) {
          clearInterval(this.state.gameLoopId)
        }
      } else if (this.state.ball.x > this.width - this.state.ball.width) {
        this.state.ball.x = this.width - this.state.ball.width
        this.state.ball.angle = Math.PI - this.state.ball.angle
        this.state.player1.score++
        // reset ball position
        this.state.ball.x = this.width / 2 - this.state.ball.width / 2
        this.state.ball.y = this.height / 2 - this.state.ball.height / 2
        // reset ball angle
        this.state.ball.angle = 2 * Math.PI
        if (this.state.player1.score === 5) {
          clearInterval(this.state.gameLoopId)
        }
      }
      if (this.state.ball.y < 0) {
        this.state.ball.y = 0
        this.state.ball.angle = -this.state.ball.angle
      } else if (this.state.ball.y > this.height - this.state.ball.height) {
        this.state.ball.y = this.height - this.state.ball.height
        this.state.ball.angle = -this.state.ball.angle
      }
    },
    checkHitPlayer (): boolean {
      // check if ball hit player 1
      if (this.state.ball.x + this.state.ball.width > this.state.player1.x && this.state.ball.x < this.state.player1.x + this.state.player1.width && this.state.ball.y + this.state.ball.height > this.state.player1.y && this.state.ball.y < this.state.player1.y + this.state.player1.height) {
        this.state.ball.angle = this.generateRandomAngle(Math.PI / 4, Math.PI / 6)
        this.state.ball.x = this.state.player1.x + this.state.player1.width
        return true
      }
      // check if ball hit player 2
      if (this.state.ball.x + this.state.ball.width > this.state.player2.x && this.state.ball.x < this.state.player2.x + this.state.player2.width && this.state.ball.y + this.state.ball.height > this.state.player2.y && this.state.ball.y < this.state.player2.y + this.state.player2.height) {
        this.state.ball.angle = this.generateRandomAngle(7 * Math.PI / 6, 5 * Math.PI / 4)
        this.state.ball.x = this.state.player2.x - this.state.ball.width
        return true
      }
      return false
    },
    generateRandomAngle (min: number, max: number): number {
      return Math.random() * (max - min) + min
    },
    computerMove (): void {
      // move computer player 2 y
      // if (this.state.ball.x > this.width / 2) {
      //   if (this.state.ball.y > this.state.player2.y + this.state.player2.height / 2) {
      //     this.state.player2.y += this.state.player2.speed
      //   } else if (this.state.ball.y < this.state.player2.y + this.state.player2.height / 2) {
      //     this.state.player2.y -= this.state.player2.speed
      //   }
      // }
      // // check out of bounds
      // if (this.state.player2.y < 0) {
      //   this.state.player2.y = 0
      // } else if (this.state.player2.y > this.height - this.state.player2.height) {
      //   this.state.player2.y = this.height - this.state.player2.height
      // }
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
</style>
