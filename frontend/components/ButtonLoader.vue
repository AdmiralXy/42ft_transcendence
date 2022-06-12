<template>
  <button :type="nativeType" :disabled="loading" :class="{
    'btn-loading': loading
  }" class="btn"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'ButtonLoader',
  props: {
    nativeType: {
      type: String,
      default: 'submit'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
