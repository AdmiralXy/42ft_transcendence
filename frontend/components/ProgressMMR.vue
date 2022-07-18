<template>
  <div class="progress-container">
    <div class="progress double">
      <div class="progress-bar" role="progressbar" :style="'width:' + progressPercentage + '%'" />
      <div class="on-progress">
        {{ rating }} MMR
      </div>
    </div>
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
      rating: 'matches/rating'
    }),
    progressPercentage (): number {
      return this.rating / 10000 * 100
    }
  },
  mounted (): void {
    this.fetchRating(this.userId)
  },
  methods: {
    ...mapActions({
      fetchRating: 'matches/fetchRating'
    })
  }
})
</script>

<style lang="scss">
.progress-container {
  margin: 15px 0 5px;
  color: #00babc;
  text-decoration: none;
}

.progress.double {
  margin-bottom: 0;
  height: 40px;
  font-size: 1.4em;
  line-height: 40px;
  background-color: rgba(32,32,38,0.75);
}

.progress-bar {
  float: left;
  width: 0;
  height: 100%;
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  text-align: center;
  background: linear-gradient(to right, #2dd57a, #00babc);
  -webkit-box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}

.progress {
  position: relative;
  height: 10px;
  border-radius: 5px;
}

.progress-bar+.on-progress {
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: .8em;
  line-height: 10px;
}

.on-progress {
  color: #fff;
  font-size: 16px;
  line-height: 35px;
  font-weight: 300;
  text-shadow:
    -0   -1px 0   #595959,
    0   -1px 0   #595959,
    -0    1px 0   #595959,
    0    1px 0   #595959,
    -1px -0   0   #595959,
    1px -0   0   #595959,
    -1px  0   0   #595959,
    1px  0   0   #595959,
    -1px -1px 0   #595959,
    1px -1px 0   #595959,
    -1px  1px 0   #595959,
    1px  1px 0   #595959,
    -1px -1px 0   #595959,
    1px -1px 0   #595959,
    -1px  1px 0   #595959,
    1px  1px 0   #595959;
}
</style>
