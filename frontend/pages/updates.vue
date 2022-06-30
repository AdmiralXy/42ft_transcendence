<template>
  <div class="updates-container">
    <PlanetLoader v-if="!status" />
    <h3 v-else>
      No updates available!
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlanetLoader from '../components/PlanetLoader.vue'

export default Vue.extend({
  components: {
    PlanetLoader
  },
  layout: 'app',
  data () {
    return {
      status: false as boolean
    }
  },
  created (): void {
    setTimeout(() => {
      this.status = true
    }, 3000)
  }
})
</script>

<style lang="scss" scoped>
.updates-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>
