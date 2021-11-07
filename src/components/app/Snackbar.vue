<template>
  <v-snackbar
    v-model="Snackbar.showing"
    :timeout="Snackbar.timer"
    :color="Snackbar.color"
    :multi-line="false"
    top right
  >
    {{Snackbar.text}}
    <!-- <v-spacer></v-spacer>
    <v-btn text @click="Snackbar.showing = false">Fermer</v-btn> -->
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Snackbar',
  data: () => ({
  }),
  computed: {
    ...mapGetters(['Snackbar']),
  }
};
</script>

<style>
.v-snack__content {
  display: flex;
  font-size: 18px !important;
}
</style>
