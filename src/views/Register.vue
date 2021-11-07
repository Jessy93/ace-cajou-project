<template>
  <div class="login">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>S'INSCRIRE</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="FormRegister" v-model="valid" lazy-validation >
            <v-text-field v-model="firstName" label="Prénom" :rules="firstNameRules" class="mb-3"></v-text-field>
            <v-text-field v-model="lastName" label="Nom de famille" :rules="lastNameRules" class="mb-4"></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="monadresse@mail.com" placeholder="xxx@mail.com" persistent-placeholder class="mb-4"></v-text-field>
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[pwRules.required, pwRules.min]" :type="show1 ? 'text' : 'password'" 
              name="input-10-1" label="Mot de passe" placeholder="Mot de passe" persistent-placeholder hint="Pas moins de 8 caractere" 
              counter  @click:append="show1 = !show1" class="mb-3">
            </v-text-field>
            <v-text-field v-model="phoneNumber" label="Numéro de téléphone" 
              placeholder="07 - 09 - 84 - 04 - 09" v-mask="'## - ## - ## - ## - ##'"
              required pattern="[0-9]{2} - [0-9]{2} - [0-9]{2} - [0-9]{2} - [0-9]{2}" 
              :rules="phoneNumberRules" class="mb-3">
            </v-text-field>
          <v-card-actions>
            <v-btn class="mt-4 mx-auto px-8" :disabled="!valid" color="primary" @click="validate">
              S'inscrire
            </v-btn>
          </v-card-actions>

          <p class="mt-8 mx-auto px-4">
            Déjà un compte ?
            <router-link to="/connexion">Se connecter</router-link>
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Register',
    data: () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      isActive: true,
      show1: false,
      valid: false,
      role: 'Agent de saisi',
      levelPermission: 3,

      firstNameRules: [ v => !!v || 'Le prénom est obligatoire'],
      lastNameRules: [ v => !!v || 'Le Nom de famille est obligatoire'],
      phoneNumberRules: [ v => !!v || 'Le numéro de téléphone est obligatoire'],
      url: 'http://localhost:5000/models/register',
      emailRules: [
        v => !!v || 'E-mail est obligatoire',
        v => /.+@.+\..+/.test(v) || 'Format E-mail incorrecte',
      ],
      pwRules: {
        required: value => !!value || 'Mot de passe obligatoire.',
        min: v => v.length >= 6 || '8 caractères minimum',
      },
    }),
    computed: {
      FormRegister () {
        return {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          role: this.role,
          levelPermission: this.levelPermission,
          isActive: this.isActive
        }
      }
    },
    methods: {
      ...mapActions(['register']),
      async validate () {
        if (this.$refs.FormRegister.validate()) {
          try {
            await this.register(this.FormRegister)
            this.$router.push('/form-transfert')
          } catch (e) {}
        }
      },
      reset () {
        this.$refs.FormRegister.reset()
      },
    },

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

