<template>
  <div>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="bold mr-2">ACE</span>

        <v-img
          alt="ACE Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('@/assets/logo.jpeg')"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="white-text my-5">{{ date | date('datetime' )}}</span>
        <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-btn 
                  class="ma-2"
                  :class="item.color"
                  :to="item.link"
                >
                  {{ item.text }}
                  <v-spacer></v-spacer>
                  <template class="ml-auto">
                    <span class="custom-loader">
                      <v-icon light>{{ item.icon }}</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
      </div>
    </v-app-bar>

  </div>
</template>

<script>
import messages from '@/utils/messages'
export default {
  name: 'EmptyLayout',
  
  data: () => ({
    date: new Date(),
    interval: null,
    items: [
      { text: 'S\'inscrire', icon: 'mdi-account-plus', link: '/inscription', color: 'success' },
      { text: 'Se connecter', icon: 'mdi-login', link: '/connexion', color: 'info' },
    ],
  }),
  mounted() {
    this.interval = setInterval(() => {
    this.date = new Date()
    }, 1000);
  },
  beforeDestroy() {
      clearInterval(this.interval)
  }
}
</script>
<style>
.v-list.v-sheet .v-btn__content{
  display: flex;
  justify-content: space-between;
  width: 174px;
}
</style>