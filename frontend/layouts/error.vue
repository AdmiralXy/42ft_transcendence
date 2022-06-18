<template>
  <div class="error-container">
    <h2>Page not found</h2>
    <NuxtLink to="/">
      Back to home
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'app'
}
</script>

<style lang="scss" scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.error-container a {
  color: #fff;
  text-decoration: none;
  transition: 0.3s ease;
}

.error-container a:hover {
  transition: 0.3s ease;
  color: #3396a8;
}
</style>
