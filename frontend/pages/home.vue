<template>
  <div />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'app',
  mounted () {
    this.$router.push({ name: 'profile', params: { id: this.$auth.user.id } })
  }
})
</script>
