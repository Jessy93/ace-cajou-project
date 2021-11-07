<template>
  <div v-if="listForm">
    <div class="wrapper">
      <v-data-table
        :headers="headers"
        :items="listForm"
        :items-per-page="10"
        class="elevation-1"
        :loading="!listForm || listForm.length == 0"
        :loading-text="msgLoading"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Liste de formulaires saisis</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify"
              label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:[`item.IdForm`]="{item}">
          <v-chip :color="getColor(item.IdForm)" dark>
            {{ item.IdForm }}
          </v-chip>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loader from '@/components/app/Loader.vue'

  export default {
    name: 'Home',
    components: {Loader},
    data: () => ({
      msgLoading: "Chargement en cours... Veuillez patienter",
      search: '',
      headers: [
          {
            text: 'Nuemero Formulaire',
            align: 'start',
            sortable: true,
            value: 'IdForm',
          },
          { text: 'Date de chargement', value: 'DateChargProd'},
          { text: 'Region', value: 'RegChargProd'},
          // { text: 'Exportateur/Usine', value: 'ExpChargProd'},
          { text: 'Nom de l\'acheteur', value: 'NomAcheteur'},
          // { text: 'Contact', value: 'ContactAcheteur'},
          // { text: 'Magasin de l\'acheteur', value: 'MagAcheteur'},
          // { text: 'Nom du produit', value: 'NomProd'},
          { text: 'TH Depart', value: 'ThDepartProd'},
          // { text: 'Nbres de sacs Depart', value: 'NbreSacsProd'},
          // { text: 'Pds theoriques (Tonnes)', value: 'PoidsTheoProd'},
          // { text: 'Transporteur', value: 'NomTranspProd'},
          { text: 'Date de dechargement', value: 'DateDechargProd'},
          { text: 'Exportateur', value: 'NomExport'},
          { text: 'Code', value: 'CodeExport'},
          { text: 'Sacs decharges', value: 'NbreSacsDecharg'},
          { text: 'Sacs Rembourse', value: 'CodeExport'},
          { text: 'Poids brut', value: 'CodeExport'},
          { text: 'Poids net', value: 'CodeExport'},
          { text: 'Prix au Kg(g)', value: 'PrixAuKg' },
        ],

    }),
    computed: {
      ...mapGetters(["listForm"]),
      lForm() {
        if (this.listForm && this.listForm.length) {
          return this.listForm;
        } else {
          this.msgLoading = "Vous n'avez aucune donnee";
        }
      }
    },
    methods: {
      ...mapActions(["FetchListForm"]),
      getColor (IdForm) {
        const colors = ['amber', 'green', 'purple', 'red', 'primary'];
        return colors[Math.floor(Math.random() * 3)];
      },
    },
    async mounted() {
      await this.FetchListForm();
      this.lForm;
    }
  }
</script>

<style>
  .wrapper {
    width: 100%;
    padding: 60px 60px;
    margin: 0 auto;
  }
  @media screen and (max-width: 499px) {
    .wrapper {
      width: 320px;
      padding: 15px 10px;
    }
  }
</style>
