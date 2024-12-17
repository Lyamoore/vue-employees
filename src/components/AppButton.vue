<template>
  <v-btn @click="$emit('action')">
    <slot />
  </v-btn>
</template>
<script>
export default {
  emits: ["action"],
}
</script>
