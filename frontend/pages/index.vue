<template>
  <div>
    <div class="accordion">
      This is: {{ data }}
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',
  layout: 'app',
  data() {
    return {
      data: 'Hello World!' as string
    }
  },
  async mounted() {
    try {
      this.data = await this.$axios.$get('/');
    } catch (e) {
      console.error(e);
    }
  }
})
</script>

<style scoped>
.accordion {
  font-family: 'Noto Sans', sans-serif;
}
</style>
