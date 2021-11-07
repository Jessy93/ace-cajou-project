<template>
  <div class="login">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="mx-a">Se connecter</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="loginform" v-model="valid" lazy-validation >
          <v-text-field v-model="email" :rules="emailRules" label="adresse Email" placeholder="adresse@email.com" persistent-placeholder required>
          </v-text-field>
          <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[pwRules.required, pwRules.min]" :type="show1 ? 'text' : 'password'" 
            name="current-password" label="Mot de passe" placeholder="Mot de Passe" persistent-placeholder hint="Pas moins de 8 caractères" 
            counter  @click:append="show1 = !show1">
          </v-text-field>
          <v-card-actions>
            <v-btn class="mt-6 mx-auto px-8" :disabled="!valid" color="primary"  @click="validate">
              Se connecter
            </v-btn>
          </v-card-actions>
          <p class="mt-8 mx-auto px-4">
            J'ai pas de compte ?
            <router-link to="/inscription">S' inscrire</router-link>
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data: () => ({
      email: '',
      password: '',
      show1: false,
      valid: false,
      emailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+\..+/.test(v) || 'Format E-mail non-valide',
      ],
      pwRules: {
        required: value => !!value || 'Mot de passe Obligatoire',
        min: v => v.length >= 8 || '8 caractères minimum',
      },
    }),
    computed: {
      loginform () {
        return {
          email: this.email,
          password: this.password,
        }
      }
    },
    methods: {
      ...mapActions(['login']),
      async validate () {
        if (this.$refs.loginform.validate()) {
          try {
            await this.login(this.loginform)
            this.$router.push('/')
          } catch (e) {}
        }
      }
    }

}
</script>

<style scoped>
  .login {
    width: 500px;
    height: auto;
    padding: 15px;
    margin: 50px  auto 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 5px solid black;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232d3561' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E") 1;
  }
  .login > .elevation-12 {
    width: 100%;
  }

  /* Restylisation du formulaire */
  .v-text-field .v-label {
    top: 0 !important;
    font-size: 20px !important;
  }
  .v-input input {
    max-height: 40px !important;
  }
  .v-text-field input {
    line-height: 23px !important;
    margin-top: 3px !important;
  }
  .v-messages__message {
    margin-bottom: 10px !important;
  }
  /* Restylisation du formulaire */

  @media screen and (max-width: 499px) {
    .login {
      width: 320px;
    }
  }

</style>