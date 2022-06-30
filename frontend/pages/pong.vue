<template>
  <div class="pong">
    <canvas ref="canvas" :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'app',
  data: () => ({
    width: 960,
    height: 540,
    clientState: {} as any,
    state: {
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
        xStep: 3,
        yStep: 3
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
    draw () {
      this.drawNeon()
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
        // draw ball as circle with border
        this.ctx.fillStyle = '#00ffff'
        this.ctx.beginPath()
        this.ctx.arc(this.state.ball.x, this.state.ball.y, this.state.ball.width / 2, 0, 2 * Math.PI)
        this.ctx.strokeStyle = '#0c1ad0'
        this.ctx.lineWidth = 5
        this.ctx.stroke()
        this.ctx.fill()
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
      setInterval(() => {
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
      this.state.ball.x += this.state.ball.xStep
      this.state.ball.y += this.state.ball.yStep
      // check if ball hits the top or bottom
      if (this.canvas && (this.state.ball.y < 0 || this.state.ball.y + this.state.ball.width > this.canvas.height)) {
        this.state.ball.yStep = -this.state.ball.yStep
      }
      // check if ball hits player1
      else if (this.state.ball.x < this.state.player1.x + this.state.player1.width && this.state.ball.y > this.state.player1.y && this.state.ball.y < this.state.player1.y + this.state.player1.height) {
        this.state.ball.xStep = -this.state.ball.xStep
      }
      // check if ball hits player2
      else if (this.state.ball.x + this.state.ball.width > this.state.player2.x && this.state.ball.y > this.state.player2.y && this.state.ball.y < this.state.player2.y + this.state.player2.height) {
        this.state.ball.xStep = -this.state.ball.xStep
      }
      // check if ball hits the left or right side
      else if (this.canvas && (this.state.ball.x < 0 || this.state.ball.x + this.state.ball.width > this.canvas.width)) {
        if (this.state.ball.x < this.width / 2) {
          this.state.player2.score++
        } else {
          this.state.player1.score++
        }
        // reset ball position to center
        this.state.ball.x = this.width / 2
        this.state.ball.y = this.height / 2
      }
    },
    computerMove (): void {
      if (this.state.ball.xStep > 0) {
        if (Math.random() > 0.5) {
          this.state.player2.y -= this.state.player2.speed
        } else {
          this.state.player2.y += this.state.player2.speed
        }
        if (this.state.ball.y > this.state.player2.y + this.state.player2.height / 2) {
          this.state.player2.y += this.state.player2.speed
        } else if (this.state.ball.y < this.state.player2.y + this.state.player2.height / 2) {
          this.state.player2.y -= this.state.player2.speed
        }
        if (this.state.player2.y < 0) {
          this.state.player2.y = 0
        } else if (this.state.player2.y > this.height - this.state.player2.height) {
          this.state.player2.y = this.height - this.state.player2.height
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
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
</style>
