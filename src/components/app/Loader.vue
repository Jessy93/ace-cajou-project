<template>
  <div class="text-center">
    <v-progress-circular :size="50" :color="color" indeterminate>
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  computed: {
    color() {
      const colors = ['amber', 'green', 'purple', 'red', 'primary']
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>