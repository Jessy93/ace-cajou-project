<template>
  <div class="erreur">
    <v-card class="elevation-12">
      <div class="pa-2 pa-md-4 flex-grow-1 align-center justify-center d-flex flex-column">
        <v-card class="text-center w-full error-page pa-3">
          <div class="d-flex flex-column justify-space-between align-center">
            <v-slider v-model="width" class="align-self-stretch" min="200" max="500" step="1">
            </v-slider>
            <v-img max-height="500" :aspect-ratio="9/10" :width="width" 
              :src="require(`@/assets/404-illustration.svg`)"
            >
            </v-img>
          </div>

          <div class="display-2 mt-10">Comment êtes vous parvenus ici?</div>
          <div class="mt-3 mb-6">Désolé, nous n'avons pas trouvé la page que vous cherchez.</div>
          <v-btn color="primary" to="/" rounded width="250">
              Retour à l'acceuil
          </v-btn>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
    name: 'Erreur',
    data: () => ({
      width: 400,
    }),
    methods: {
      toHome(){
        this.$router.push('/')
      }
    }
}
</script>

<style scoped>
  .erreur {
    width: 500px;
    height: auto;
    padding: 15px;
    margin: 50px auto 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 499px) {
    .erreur {
      width: 320px;
    }
  }

</style>