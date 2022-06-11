<template>
  <div>
    <div>
      {{ data }}
    </div>
    <Tutorial/>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',
  data() {
    return {
      data: 'Hello World!'
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
