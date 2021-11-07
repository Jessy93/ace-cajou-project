<template>
  <v-app>
    <v-main>
      <component :is="layout">
      </component>
      <Snackbar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import Snackbar from '@/components/app/Snackbar'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    EmptyLayout, MainLayout, Snackbar
  },
  data: () => ({
  }),
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
};
</script>

<style scoped>
.v-snack__content {
  display: flex;
  font-size: 16px !important;
}
.v-btn {
  letter-spacing: 0 !important;
  text-transform: lowercase !important;
}
</style>
