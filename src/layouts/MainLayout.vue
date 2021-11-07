<template>
  <div>
    <v-app-bar app color="primary" dark >
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
        <span class="white-text my-5 mr-3">{{ date | date('datetime' )}}</span>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{info.firstName}} {{info.lastName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append dark>
        <div class="pa-2">
          <v-btn block dark @click="logOuting">
            Se deconnecter
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'MainLayout',
  data: () => ({
    date: new Date(),
    interval: null,
    drawer: false,
    items: [
      { title: 'Acceuil', icon: 'mdi-home-city', link: '/' },
      { title: 'Formulaire', icon: 'mdi-clipboard-text', link: '/form-transfert' },
      { title: 'Dashboard Statistiques', icon: 'mdi-view-dashboard', link: '/all-forms' },
      { title: 'Mon compte', icon: 'mdi-account-box', link: '/profile' },
      { title: 'Contacter l\'Administrateur', icon: 'mdi-card-account-phone', link: '/contact' },
    ],
  }),
  computed: {
    ...mapGetters(["info"]),
    userInfos() {
      return this.info
    },
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    ...mapActions(["fetchInfo", "logout"]),
    async logOuting() {
      await this.logout()
      this.$router.push('/connexion')
    }
  },
  async mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000);
    if (!Object.keys(this.info).length) {
      await this.fetchInfo()
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style>
aside.v-navigation-drawer {
  position: fixed;
}
</style>