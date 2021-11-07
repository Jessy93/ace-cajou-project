<template>
  <div>
    <div class="main">
      <div class="wrapper">
        <div class="master-form__transfert">
            <h1 class="mft__title text-center">FICHE DE TRANSFERT</h1>
            <v-form class="col mft__form-transfert" ref="formulaireTransfert" @submit.prevent="submit" v-model="valid" lazy-validation>
                <v-alert outlined border="left" color="blue darken-6" class="row mft__block-first">
                    <div class="special-row">
                        <h2 class="mft__subtitle">Origine du produit</h2>
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group"> 
                            <v-text-field type="text" v-model="IdForm" :rules="IdFormRules" v-mask="'#######'" label="N° du Formulaire" placeholder="N° du Formulaire" required>
                            </v-text-field>
                        </v-col>
                    </div>
                    <v-row class="row mft__block-conteneur">
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group"> 
                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="DateChargProd" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="DateChargProd" :rules="DateChargProdRules" label="Date de Chargement" placeholder="Date de Chargement" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" autofocus="">
                                    </v-text-field> 
                                </template>
                                <v-date-picker v-model="DateChargProd" scrollable locale="fr-fr">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal = false">Annuler</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog.save(DateChargProd)">valider</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-select type="text" v-model="RegChargProd" :rules="RegChargProdRules" :items="itemsRegion"  label="Region" placeholder="Region" required>
                            </v-select>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group"> 
                            <v-select type="text" v-model="DepChargProd" :rules="DepChargProdRules" :items="departsOfReg" label="Departement" placeholder="Departement" required>
                            </v-select>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group"> 
                            <v-select type="text" v-model="SousPrefChargProd" :rules="SousPrefChargProdRules" :items="SousPrefOfDepartOfReg" label="Sous-Prefecture" placeholder="Sous-Prefecture" required>
                            </v-select>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group"> 
                            <v-text-field type="text" v-model="VillageChargProd" :rules="VillageChargProdRules" label="Village" placeholder="Village" required>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <h2 class="col-lg-12 mft__subtitle">Destination prevue</h2>
                    <v-row class="row mft__block-conteneur">

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="VilleChargProd" :rules="VilleChargProdRules" label="Ville" placeholder="Ville" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="ExpChargProd" :rules="ExpChargProdRules" label="Exportateur / Usine" placeholder="Exportateur / Usine" required>
                            </v-text-field>
                        </v-col>

                    </v-row>
                </v-alert>


                <v-alert outlined border="left" color="green darken-6" class="row mft__block-first">
                    <h2 class="col-lg-12 mft__subtitle">Informations sur l'acheteur</h2>
                    <v-row class="row mft__block-conteneur">
                      
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="NomAcheteur" :rules="NomAcheteurRules" label="Nom de l'acheteur" placeholder="Nom de l'acheteur" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="ContactAcheteur" :rules="ContactAcheteurRules" v-mask="'## - ## - ## - ## - ##'" prefix="(+225)" label="Contact" placeholder="Contact" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="CodeAcheteur" :rules="CodeAcheteurRules" v-mask="'#### - ####'" label="Code de l'Acheteur (Ex: 1234 - 5678)" placeholder="Code de l'Acheteur 1234 - 5678" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="MagAcheteur" :rules="MagAcheteurRules" label="Magasin de l'acheteur" placeholder="Magasin de l'acheteur" required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-alert>

                <v-alert outlined border="left" color="purple darken-6" class="row mft__block-first">

                    <h2 class="col-lg-12 mft__subtitle">Informations sur le transport du produit</h2>

                    <v-row class="row mft__block-conteneur">
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="NomProd" :rules="NomProdRules" label="Denomination du produit" placeholder="Denomination du produit" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number" v-model="ThDepartProd" :rules="ThDepartProdRules" label="Th Depart (Ex: 8,7)" placeholder="Th Depart (Ex: 8,7)" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number" v-model="NbreSacsProd" :rules="NbreSacsProdRules" v-mask="'#####'" label="Nombre de sacs" placeholder="Nombre de sacs" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" suffix="Tonnes" v-model="PoidsTheoProd" :rules="PoidsTheoProdRules" label="Poids theorique en tonne" placeholder="Poids theorique en tonne" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="NomTranspProd" :rules="NomTranspProdRules" label="Nom du transporteur" placeholder="Nom du transporteur" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="MarkCamionProd" :rules="MarkCamionProdRules" label="Marque du camion" placeholder="Marque du camion" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="ImmatRemorkProd"  :rules="ImmatRemorkProdRules" v-mask="'#?#?#?# AA 01'" label="N° d'immatriculation: Remorque" placeholder="Immatriculation Remorque Ex: 1234 XZ 01" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="ImmatAvCamionProd" :rules="ImmatAvCamionProdRules" v-mask="'#?#?#?# AA 01'" label="N°immatriculation: Avant du camion" placeholder="Avant du camion" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="NomChaufProd" :rules="NomChaufProdRules" label="Nom du chauffeur" placeholder="Nom du chauffeur" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="NoPermCondChaufProd" :rules="NoPermCondChaufProdRules" v-mask="'AAAA##-##-########AA'" label="N° du permis de conduire" placeholder="N° du permis de conduire" required>
                            </v-text-field>
                        </v-col>

                    </v-row>
                </v-alert>

                <v-alert outlined border="left" color="red darken-6"  class="row mft__block-first">

                    <h2 class="col-lg-12 mft__subtitle">Destination du produit</h2>

                    <v-row class="row mft__block-conteneur">

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-dialog ref="dialogtwo" v-model="modal2" :return-value.sync="DateDechargProd" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="DateDechargProd" :rules="DateDechargProdRules" label="Date de Dechargement" placeholder="Date de Dechargement" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" autofocus="">
                                    </v-text-field> 
                                </template>
                                <v-date-picker v-model="DateDechargProd" color="red lighten-6" header-color="red lighten-6" scrollable locale="fr-fr">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="red lighten-6" @click="modal2 = false">Annuler</v-btn>
                                    <v-btn text color="red lighten-6" @click="$refs.dialogtwo.save(DateDechargProd)">valider</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-dialog ref="dialogthree" v-model="modal3" :return-value.sync="HeureDechargProd" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="HeureDechargProd" :rules="HeureDechargProdRules" label="Heure de Dechargement" placeholder="Heure de Dechargement" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" suffix="ABJ" required>
                                    </v-text-field>
                                </template>
                                <v-time-picker v-if="modal3" format="24hr" v-model="HeureDechargProd" color="red lighten-6" header-color="red lighten-6" elevation="15" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="red lighten-6" @click="modal3 = false">Annuler</v-btn>
                                    <v-btn text color="red lighten-6" @click="$refs.dialogthree.save(HeureDechargProd)">Valider</v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="NomExport" :rules="NomExportRules" label="Nom de l'exportateur" placeholder="Nom de l'exportateur" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="CodeExport" :rules="CodeExportRules" label="Code de l'Exportateur" placeholder="Code de l'Exportateur" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="PortUsineProd" :rules="PortUsineProdRules" label="Port / Usine de dechargement" placeholder="Port / Usine de dechargement" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="PontBascule" :rules="PontBasculeRules" label="Pont bascule" placeholder="Pont bascule" required>
                            </v-text-field>
                        </v-col>
                        
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="NomMagasin" :rules="NomMagasinRules" label="Nom du magasin" placeholder="Nom du magasin" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text" v-model="ControleurTh" :rules="ControleurThRules" label="Controleur TH" placeholder="Controleur TH" required>
                            </v-text-field>
                        </v-col>
                    </v-row>

                </v-alert>

                <v-alert outlined border="left" color="blue darken-3"  class="row mft__block-first">
                    <h2 class="col-lg-12 mft__subtitle">Nombre de sacs</h2>

                    <v-row class="row mft__block-conteneur">

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number"  v-model="NbreSacsDecharg" :rules="NbreSacsDechargRules" label="Nombre de sacs decharges" placeholder="Nombre de sacs decharges" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number"  v-model="NbreSacsRembour" :rules="NbreSacsRembourRules" label="Nombre de sacs rembourses" placeholder="Nombre de sacs decharges" required>
                            </v-text-field>
                        </v-col>

                    </v-row>

                    <v-row class="row mft__block-conteneur">

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number"  v-model="TauxHumidite" :rules="TauxHumiditeRules" label="Taux d'Humidite" placeholder="Taux d'Humidite" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number"  v-model="PoidsBrut" :rules="PoidsBrutRules" label="Poids brut" placeholder="Poids brut" suffix="Kg" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number"  v-model="Tare" :rules="TareRules" label="TARE" placeholder="TARE" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number"  v-model="PoidsNet" :rules="PoidsNetRules" label="Poids net" placeholder="Poids net" suffix="Kg" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="number"  v-model="PrixAuKg" :rules="PrixAuKgRules" label="Prix au Kilogramme" placeholder="Prix au Kilogramme" suffix="Francs CFA" required>
                            </v-text-field>
                        </v-col>
                        
                    </v-row>
                </v-alert>

                <v-alert outlined border="left" color="orange darken-6"  class="row mft__block-first">
                    <v-row class="row mft__block-conteneur">
                        <h2 class="col-lg-12 mft__subtitle">Autorisation de sortie et de dechargement</h2>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text"  v-model="StickerCCA" :rules="StickerCCARules" label="Sticker CCA" placeholder="Sticker CCA" required>
                            </v-text-field>
                        </v-col>
                        
                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text"  v-model="NomContactAgeCCA" :rules="NomContactAgeCCARules" label="Nom, Contact de l'agent CCA" placeholder="Nom, Contact de l'agent CCA" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text"  v-model="NomContactDuMag" :rules="NomContactDuMagRules" label="Nom, Contact du magasinier" placeholder="Nom, Contact du magasinier" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" class="mft__form-group">
                            <v-text-field type="text"  v-model="NomContactContTH" :rules="NomContactContTHRules" label="Nom, Contact du controleur TH" placeholder="Nom, Contact du controleur TH" required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-alert>

                <div class="row mft_button">
                    <v-btn class="btn-submit" :disabled="!valid" @click="validate">Soumettre le formulaire</v-btn>
                </div>

            </v-form>
        </div>
      </div>
    </div>



    
  </div>
</template>

<script>
export default {
    name: 'FormTransfert',
    data: () => ({
        valid: false,
        modal: false,
        modal2: false,
        modal3: false,
        CompDepOfRegs: null,

      IdForm: '',
      DateChargProd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      RegChargProd: 'Abidjan',
      DepChargProd: 'Abidjan',
      SousPrefChargProd: 'Abidjan',
      VillageChargProd: '',
      VilleChargProd: '',
      ExpChargProd: '',
      IdFormRules: [ v => !!v || 'N° du Formulaire obligatoire' ],
      DateChargProdRules: [ v => !!v || 'Date de chargement obligatoire' ],
      RegChargProdRules: [v => !!v || 'Region de chargement du produit obligatoire'],
      DepChargProdRules: [ v => !!v || 'Departement du chargement du produit obligatoire' ],
      SousPrefChargProdRules: [ v => !!v || 'Sous-prefecture du chargement du produit obligatoire' ],
      VillageChargProdRules: [ v => !!v || 'Village de chargement du produit obligatoire' ],
      VilleChargProdRules: [ v => !!v || 'Ville du chargement du produit obligatoire' ],
      ExpChargProdRules: [ v => !!v || 'Exportateur du chargement du produit'],

      NomAcheteur: '',
      ContactAcheteur: '',
      CodeAcheteur: '',
      MagAcheteur: '',
      NomAcheteurRules: [ v => !!v || 'Nom de l\'achteur obligatoire' ],
      ContactAcheteurRules: [ v => !!v || 'Contact de l\'achteur obligatoire' ],
      CodeAcheteurRules: [ v => !!v || 'Code de l\'achteur obligatoire' ],
      MagAcheteurRules: [ v => !!v || 'Magasin de l\'achteur obligatoire' ],

      NomProd: '',
      ThDepartProd: '',
      NbreSacsProd: '',
      PoidsTheoProd: '',
      NomTranspProd: '',
      MarkCamionProd: '',
      ImmatRemorkProd: '',
      ImmatAvCamionProd: '',
      NomChaufProd: '',
      NoPermCondChaufProd: '',
      NomProdRules: [ v => !!v || 'Denomination du produit obligatoire' ],
      ThDepartProdRules: [ v => !!v || 'Th / Depart obligatoire' ],
      NbreSacsProdRules: [ v => !!v || 'Nombre de sacs obligatoire' ],
      PoidsTheoProdRules: [ v => !!v || 'Poids theorique en tonne obligatoire' ],
      NomTranspProdRules: [ v => !!v || 'Nom du transporteur du produit obligatoire' ],
      MarkCamionProdRules: [ v => !!v || 'Marque du camion obligatoire' ],
      ImmatRemorkProdRules: [ v => !!v || 'N° d\'immatriculation: Remorque obligatoire' ],
      ImmatAvCamionProdRules: [ v => !!v || 'N°immatriculation: Avant du camion obligatoire' ],
      NomChaufProdRules: [ v => !!v || 'Nom du chauffeur obligatoire' ],
      NoPermCondChaufProdRules: [ v => !!v || 'N° du permis de conduire obligatoire' ],
      
      
      DateDechargProd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      HeureDechargProd: null,
      NomExport: '',
      CodeExport: '',
      PortUsineProd: '',
      PontBascule: '',
      NomMagasin: '',
      ControleurTh: '',
      DateDechargProdRules: [ v => !!v || 'Date de Dechargement obligatoire' ],
      HeureDechargProdRules: [ v => !!v || 'Heure de Dechargement obligatoire' ],
      NomExportRules: [ v => !!v || 'Nom de l\'exportateur obligatoire' ],
      CodeExportRules: [ v => !!v || 'Code de l\'Exportateur obligatoire' ],
      PortUsineProdRules: [ v => !!v || 'Port / Usine de dechargement obligatoire' ],
      PontBasculeRules: [ v => !!v || 'Pont bascule obligatoire' ],
      NomMagasinRules: [ v => !!v || 'Nom du magasin obligatoire' ],
      ControleurThRules: [ v => !!v || 'Controleur TH obligatoire' ],

      NbreSacsDecharg: '',
      NbreSacsRembour: '',
      NbreSacsDechargRules: [ v => !!v || 'Nombre de sacs decharges obligatoire' ],
      NbreSacsRembourRules: [ v => !!v || 'Nombre de sacs rembourses obligatoire' ],

      TauxHumidite: '',
      PoidsBrut: '',
      Tare: '',
      PoidsNet: '',
      PrixAuKg: '',
      TauxHumiditeRules: [ v => !!v || 'Taux d\'Humidite obligatoire' ],
      PoidsBrutRules: [ v => !!v || 'Poids brut obligatoire' ],
      TareRules: [ v => !!v || 'TARE obligatoire' ],
      PoidsNetRules: [ v => !!v || 'Poids net obligatoire' ],
      PrixAuKgRules: [ v => !!v || 'Prix au Kilogramme obligatoire' ],

      StickerCCA: '',
      NomContactAgeCCA: '',
      NomContactDuMag: '',
      NomContactContTH: '',
      StickerCCARules: [ v => !!v || 'Sticker CCA obligatoire' ],
      NomContactAgeCCARules: [ v => !!v || 'Nom, Contact de l\'agent CCA obligatoire' ],
      NomContactDuMagRules: [ v => !!v || 'Nom, Contact du magasinier obligatoire' ],
      NomContactContTHRules: [ v => !!v || 'Nom, Contact du controleur TH obligatoire' ],


      items: [
        {
            "region": "Abidjan", 
            "depart": ["Abidjan"],
            "Abidjan": ["Abidjan"]
        },
        {
            "region": "Yamoussoukro", 
            "depart": ["Attiégouakro", "Yamoussoukro"],
            "Attiégouakro": ["Attiégouakro", "Lolobo"],
            "Yamoussoukro": ["Yamoussoukro"]
        },
        {
            "region": "Agnéby-Tiassa", 
            "depart": ["Agboville", "Sikensi", "Tiassalé", "Taabo"],
            "Agboville": ["Aboude", "Ananguie", "Agboville", "Attobrou", "Azaguié", "Céchi", "Grand-Morié", "Loviguié", "Oress-Krobou", "Rubino"],
            "Sikensi": ["Gomon", "Sikensi"],
            "Tiassalé": ["Gbolouville", "Morokro", "N’Douci", "Tiassalé"],
            "Taabo": ["N’Douci", "Taabo"],
        },
        {
            "region": "Bafing", 
            "depart": ["Koro", "Ouaninou", "Touba"],
            "Koro": ["Booko", "Borotou", "Koro", "Mahandougou", "Niokosso"],
            "Ouaninou": ["Gbelo", "Gouekan", "Koonan", "Ouaninou", "Saboudougou", "Santa"],
            "Touba": ["Dioman", "Foungbesso", "Guintéguéla", "Touba"]
        },
        {
            "region": "Bagoué", 
            "depart": ["Boundiali", "Kouto", "Tengréla"],
            "Boundiali": ["Baya", "Boundiali", "Ganaoni", "Kasséré", "Siempurgo"],
            "Kouto": ["Blességué", "Gbon", "Kolia", "Kouto", "Sianhala"],
            "Tengréla": ["Débété", "Kanakono", "Papara", "Tengréla"]
        },
        {
            "region": "Bélier", 
            "depart": ["Didiévi", "Djékanou", "Tiébissou", "Toumodi", ],
            "Didiévi": ["Bollo", "Didiévi", "Molonou-Blé", "Raviart", "Tié-N'Diékro"],
            "Djékanou": ["Bonikro", "Djékanou"],
            "Tiébissou": ["Lomokankro", "Molonou", "Tiébissou", "Yakpabo-Sakassou"],
            "Toumodi": ["Angoda", "Kokoumbo", "Kpouébo", "Toumodi"]
        },
        {
            "region": "Béré", 
            "depart": ["Dianra", "Kounahiri", "Mankono"],
            "Dianra": ["Dianra", "Dianra-Village"],
            "Kounahiri": ["Kongasso", "Kounahiri"],
            "Mankono": ["Bouandougou", "Mankono", "Marandalah", "Sarhala", "Tiéningboué"]
        },
        {
            "region": "Bounkani", 
            "depart": ["Bouna", "Doropo", "Nassian", "Téhini"],
            "Bouna": ["Bouka", "Bouna", "Ondefidouo", "Youndouo"],
            "Doropo": ["Danoa", "Doropo", "Kalamon", "Niamoue"],
            "Nassian": ["Bogofa", "Kakpin", "Kotouba", "Nassian", "Sominassé"],
            "Téhini": ["Gogo", "Téhini", "Tougbo"]
        },
        {
            "region": "Cavally", 
            "depart": ["Bloléquin", "Guiglo", "Taï", "Toulépleu"],
            "Bloléquin": ["Bloléquin", "Diboké", "Diboké", "Tinhou", "Zéaglo"],
            "Guiglo": ["Bedy-Goazon", "Guiglo", "Kaade", "Nizahon"],
            "Taï": ["Taï", "Zagne"],
            "Toulépleu": ["Bakoubly", "Meo", "Nezobly", "Péhé", "Tiobly", "Toulépleu"]
        },
        {
            "region": "Folon", 
            "depart": ["Kaniasso", "Minignan"],
            "Kaniasso": ["Goulia", "Kaniasso", "Mahandiana-Sokourani"],
            "Minignan": ["Kimbirila-Nord", "Minignan", "Sokoro", "Tienko"]
        },
        {
            "region": "Gbêkê", 
            "depart": ["Béoumi", "Botro", "Bouaké", "Sakassou"],
            "Béoumi": ["Ando-Kékrénou", "Béoumi", "Bodokro", "Kondrobo", "Lolobo", "Marabadiassa", "N'Guessankro"],
            "Botro": ["Botro", "Diabo", "Krofoinsou", "Languibonou"],
            "Bouaké": ["Bouaké-Ville", "Bouaké-SP", "Bounda", "Brobo", "Djébonoua", "Mamini"],
            "Sakassou": ["Ayaou-Sran", "Dibri-Assirikro", "Sakassou", "Toumodi-Sakassou"]
        },
        {
            "region": "Gbôklé", 
            "depart": ["Fresco", "Sassandra"],
            "Fresco": ["Dahiri ", "Fresco", "Gbagbam"],
            "Sassandra": ["Dakpadou", "Grihiri", "Lobakuya", "Medon", "Sago", "Sassandra"]
        },
        {
            "region": "Gôh", 
            "depart": ["Gagnoa", "Oumé", "Yopohue"],
            "Gagnoa": ["Bayota", "Dahiepa-Kehi", "Dignago", "Dougroupalegnaoa", "Doukouyo", "Gagnoa", "Galebre-Galébouo", "Gnagbodougnoa", "Guibéroua", "Ouragahio", "Sérihio"],
            "Oumé": ["Diégonéfla", "Guépahouo", "Oumé", "Tonla"],
            "Yopohue": ["Yopohue"]
        },
        {
            "region": "Guémon", 
            "depart": ["Bangolo", "Duékoué", "Facobly", "Kouibly"],
            "Bangolo": ["Bangolo", "Beoue-Zibiao", "Bléniméouin", "Diéouzon", "Gohouo-Zagna", "Guinglo-Tahouaké", "Kahin-Zarabaon", "Zéo", "Zou"],
            "Duékoué": ["Bagohouo", "Duékoué", "Gbapleu", "Guézon"],
            "Facobly": ["Facobly", "Guézon", "Koua", "Sémien", "Tieny-Seably"],
            "Kouibly": ["Kouibly", "Nidrou", "Ouyably-Gnondrou", "Totrodrou"]
        },
        {
            "region": "Indénié-Djuablin", 
            "depart": ["Abengourou", "Agnibilékrou", "Béttié"],
            "Abengourou": ["Abengourou", "Amélékia", "Aniassué", "Ebilassokro", "Niablé", "Yakassé-Féyassé", "Zaranou"],
            "Agnibilékrou": ["Agnibilékrou", "Akoboissue", "Damé", "Duffrebo", "Tanguelan"],
            "Béttié": ["Béttié", "Diamarakro"]
        },
        {
            "region": "Kabadougou", 
            "depart": ["Gbéléban", "Madinani", "Odienné", "Samatiguila", "Séguélon"],
            "Gbéléban": ["Gbéléban", "Samango", "Seydougou"],
            "Madinani": ["Fengolo", "Madinani", "N'Goloblasso"],
            "Odienné": ["Bako", "Bougousso", "Dioulatièdougou", "Odienné", "Tiémé"],
            "Samatiguila": ["Kimbirila-Sud", "Samatiguila"],
            "Séguélon": ["Gbongaha", "Séguélon"]
        },
        {
            "region": "Nawa", 
            "depart": ["Buyo", "Guéyo", "Méagui", "Soubré"],
            "Buyo": ["Buyo", "Dapeoua"],
            "Guéyo": ["Dabouyo", "Guéyo"],
            "Méagui": ["Gnamangui", "Méagui", "Oupoyo"],
            "Soubré": ["Grand-Zattry", "Liliyo", "Okrouyo", "Soubré"]
        },
        {
            "region": "Lôh-Djiboua", 
            "depart": ["Divo", "Guitry", "Lakota"],
            "Divo": ["Chiepo", "Didoko", "Divo", "Hiré", "Nebo", "Ogoudou", "Zego"],
            "Guitry": ["Dairo-Didizo", "Guitry", "Lauzoua", "Yocoboue"],
            "Lakota": ["Djidji", "Gagore", "Goudouko", "Lakota", "Niambézaaria", "Zikisso"]
        },
        {
            "region": "Iffou", 
            "depart": ["Daoukro", "M'Bahiakro", "Ouéllé", "Prikro"],
            "Daoukro": ["Akpassanou", "Ananda", "Daoukro", "Ettrokro", "N'Gattakro", "Ouéllé", "Samanza"],
            "M'Bahiakro": ["Bonguéra", "Kondossou", "M'Bahiakro"],
            "Prikro": ["Anianou", "Famienkro", "Koffi-Amonkro", "Nafana", "Prikro"],
            "Ouéllé": ["Ouéllé"]
        },
        {
            "region": "Moronou", 
            "depart": ["Arrah", "Bongouanou", "M'Batto"],
            "Arrah": ["Arrah", "Kotobi", "Krebe"],
            "Bongouanou": ["Andé", "Assie-Koumassi", "Bongouanou", "N'Guessankro"],
            "M'Batto": ["Anoumaba", "Assahara", "M'Batto", "Tiémélékro"]
        },
        {
            "region": "N'Zi", 
            "depart": ["Bocanda", "Dimbokro", "Kouassi-Kouassikro"],
            "Bocanda": ["Bengassou", "Bocanda", "Kouadioblékro", "N'Zèkrézessou"],
            "Dimbokro": ["Abigui", "Diangokro", "Dimbokro", "Nofou"],
            "Kouassi-Kouassikro": ["Kouassi-Kouassikro", "Mekro"]
        },
        {
            "region": "Grands-Ponts", 
            "depart": ["Dabou", "Grand-Lahou", "Jacqueville"],
            "Dabou": ["Dabou", "Lopou", "Toupah"],
            "Grand-Lahou": ["Ahouanou", "Bacanda", "Ebounou", "Grand-Lahou", "Toukouzou"],
            "Jacqueville": ["Attoutou", "Jacqueville"]
        },
        {
            "region": "La Mé", 
            "depart": ["Adzopé", "Akoupé", "Alépé", "Yakassé-Attobrou"],
            "Adzopé": ["Adzopé", "Agou", "Annépé", "Assikoi", "Bécédi-Brignan", "Yakassé-Mé"],
            "Akoupé": ["Afféry", "Akoupé", "Bécouéfin"],
            "Alépé": ["Aboisso-Comoé", "Alépé", "Allosso", "Danguira", "Oghiwapo"],
            "Yakassé-Attobrou": ["Abongoua", "Biéby", "Yakassé-Attobrou"]
        },
        {
            "region": "Tonkpi", 
            "depart": ["Biankouma", "Danané", "Man", "Sipilou", "Zouan-Hounien"],
            "Biankouma": ["Biankouma", "Blapleu", "Gbangbégouiné", "Gbonné", "Gouiné", "Kpata", "Santa"],
            "Danané": ["Daleu", "Danané", "Gbon-Houye", "Kouan-Houle", "Mahapleu", "Seileu", "Zonneu"],
            "Man": ["Bogouiné", "Fagnampleu", "Gbangbégouiné-Yati", "Logoualé", "Man", "Podiagouine", "Sandougou-Soba", "Sangouiné", "Yapleu", "Zagoue", "Ziogouine"],
            "Sipilou": ["Sipilou", "Yorodougou"],
            "Zouan-Hounien": ["Banneu", "Bin-Houyé", "Goulaleu", "Téapleu", "Yelleu", "Zouan-Hounien"]
        },
        {
            "region": "Haut-Sassandra", 
            "depart": ["Daloa", "Issia", "Vavoua", "Zoukougbeu"],
            "Daloa": ["Bédiala", "Daloa", "Gadouan", "Gboguhé", "Gonaté", "Zaïbo"],
            "Issia": ["Boguedia", "Iboguhé", "Issia", "Nahio", "Namane", "Saïoua", "Tapeguia"],
            "Vavoua": ["Bazra-Nattis", "Danano", "Dania", "Kétro-Bassam", "Séitifla", "Vavoua"],
            "Zoukougbeu": ["Domangbeu", "Gregbeu", "Guessabo", "Zoukougbeu"]
        },
        {
            "region": "Marahoué", 
            "depart": ["Bouaflé", "Sinfra", "Zuénoula", "Bonon"],
            "Bouaflé": ["Begbessou", "Bonon", "Bouaflé", "N'Douffoukankro", "Pakouabo", "Tibeita", "Zaguiéta"],
            "Sinfra": ["Bazré", "Kononfla", "Kouetinfla", "Sinfra"],
            "Zuénoula": ["Gohitafla", "Iriefla", "Kanzra", "Maminigui", "Vouéboufla", "Zanzra", "Zuénoula"],
            "Bonon": ["Bonon"]
        },
        {
            "region": "Poro", 
            "depart": ["Dikodougou", "Korhogo", "M’Bengué", "Sinématiali"],
            "Dikodougou": ["Boron", "Dikodougou", "Guiembé"],
            "Korhogo": ["Dassoungboho", "Kanoroba", "Kiemou", "Kombolokoura", "Komborodougou", "Koni", "Korhogo", "Lataha", "Nafoun", "Napiéolédougou", "N'Ganon", "Niofoin", "Sirasso", "Sohouo", "Tioroniaradougou"],
            "M’Bengué": ["Bougou", "Katiala", "Katogo", "M’Bengué"],
            "Sinématiali": ["Bouakaha", "Kagbolodougou", "Sediego", "Sinématiali"]
        },
        {
            "region": "Tchologo", 
            "depart": ["Ferkéssédougou",  "Kong", "Ouangolodougou"],
            "Ferkéssédougou": ["Ferkéssédougou", "Koumbala", "Togoniéré"],
            "Kong": ["Bilimono", "Kong", "Nafana", "Sikolo"],
            "Ouangolodougou": ["Diawala", "Kaouara", "Niellé", "Ouangolodougou", "Toumoukoro"]
        },
        {
            "region": "Hambol", 
            "depart": ["Dabakala", "Katiola", "Niakaramadougou"],
            "Dabakala": ["Bassawa", "Boniérédougou", "Dabakala", "Foumbolo", "Niemene", "Satama-Sokoro", "Satama-Sokoura", "Sokala-Sobara", "Tiendene-Bambarasso", "Yaossedougou"],
            "Katiola": ["Fronan", "Katiola", "Timbé"],
            "Niakaramadougou": ["Arikokaha", "Badikaha", "Niakaramadougou", "Niédiékaha", "Tafiré", "Tortiya"]
        },
        {
            "region": "Gontougo", 
            "depart": ["Bondoukou", "Koun-Fao", "Sandégué", "Tanda", "Transua"],
            "Bondoukou": ["Appimandou", "Pinda-Boroko", "Bondo", "Bondoukou", "Gouméré", "Laoud-Iba", "Sapli-Sépingo", "Sorobango", "Tabagne", "Tagadi", "Taoudi", "Yezimala"],
            "Koun-Fao": ["Boahia", "Kokomian", "Kouassi-Dattékro", "Koun-Fao", "Tankéssé", "Tienkoikro"],
            "Sandégué": ["Bandakagni-Tomora", "Dimandougou", "Sandégué", "Yorobodi"],
            "Tanda": ["Amanvi", "Diamba", "Tanda", "Tchedio"],
            "Transua": ["Assuéfry", "Kouassi-Niaguini", "Transua"]
        },
        {
            "region": "San-Pédro", 
            "depart": ["San-Pédro", "Tabou"],
            "San-Pédro": ["Doba", "Dogbo", "Gabiadji", "Grand-Bereby", "San-Pédro"],
            "Tabou": ["Dapo-Iboke", "Djamandioke", "Djouroutou", "Grabo", "Olodio", "Tabou"]
        },
        {
            "region": "Sud-Comoé", 
            "depart": ["Aboisso", "Adiaké", "Grand-Bassam", "Tiapoum"],
            "Aboisso": ["Aboisso", "Adaou", "Adjouan", "Ayamé", "Bianouan", "Kouakro", "Maféré", "Yaou"],
            "Adiaké": ["Adiaké", "Assinie-Mafia", "Etuéboué"],
            "Grand-Bassam": ["Bongo", "Bonoua", "Grand-Bassam"],
            "Tiapoum": ["Noé", "Nouamou", "Tiapoum"]
        },
        {
            "region": "Worodougou", 
            "depart": ["Kani", "Séguéla"],
            "Kani": ["Djibrosso", "Fadiadougou", "Kani", "Morondo"],
            "Séguéla": ["Bobo-Diarabana", "Dualla", "Kamalo", "Massala", "Séguéla", "Sifié", "Worofla"]
        }, 
        ],

    }),
    computed: {
        itemsRegion() {
            let itemsRegion = []
            this.items.forEach(el => {
                itemsRegion.push(el.region)
            });
            return itemsRegion
        },
        departsOfReg () {
            let departsOfReg = this.items.filter((item) => item.region == this.RegChargProd)
            this.CompDepOfRegs = departsOfReg;
            return departsOfReg[0].depart
        },
        SousPrefOfDepartOfReg() {
            return this.CompDepOfRegs[0][this.DepChargProd]
        },
        formulaireTransfert () {
            return {
                IdForm: this.IdForm,
                DateChargProd: this.DateChargProd,
                RegChargProd: this.RegChargProd,
                DepChargProd: this.DepChargProd,
                SousPrefChargProd: this.SousPrefChargProd,
                VillageChargProd: this.VillageChargProd,
                VilleChargProd: this.VilleChargProd,
                ExpChargProd: this.ExpChargProd,

                NomAcheteur: this.NomAcheteur,
                ContactAcheteur: this.ContactAcheteur,
                CodeAcheteur: this.CodeAcheteur,
                MagAcheteur: this.MagAcheteur,

                NomProd: this.NomProd,
                ThDepartProd: this.ThDepartProd,
                NbreSacsProd: this.NbreSacsProd,
                PoidsTheoProd: this.PoidsTheoProd,
                NomTranspProd: this.NomTranspProd,
                MarkCamionProd: this.MarkCamionProd,
                ImmatRemorkProd: this.ImmatRemorkProd,
                ImmatAvCamionProd: this.ImmatAvCamionProd,
                NomChaufProd: this.NomChaufProd,
                NoPermCondChaufProd: this.NoPermCondChaufProd,

                DateDechargProd: this.DateDechargProd,
                HeureDechargProd: this.HeureDechargProd,
                NomExport: this.NomExport,
                CodeExport: this.CodeExport,
                PortUsineProd: this.PortUsineProd,
                PontBascule: this.PontBascule,
                NomMagasin: this.NomMagasin,
                ControleurTh: this.ControleurTh,

                NbreSacsDecharg: this.NbreSacsDecharg,
                NbreSacsRembour: this.NbreSacsRembour,

                TauxHumidite: this.TauxHumidite,
                PoidsBrut: this.PoidsBrut,
                Tare: this.Tare,
                PoidsNet: this.PoidsNet,
                PrixAuKg: this.PrixAuKg,

                StickerCCA: this.StickerCCA,
                NomContactAgeCCA: this.NomContactAgeCCA,
                NomContactDuMag: this.NomContactDuMag,
                NomContactContTH: this.NomContactContTH,
            }
        }
    },
    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
    methods: {
        // selectedDateChargProd (date) {
        //     this.$set(this.date)
        // },
      async validate () {

        console.log(this.formulaireTransfert);
        if (this.$refs.formulaireTransfert.validate()) {
            try {
                await this.$store.dispatch('saveform', this.formulaireTransfert)
                this.$refs.formulaireTransfert.reset()
            } catch (e) {}
        }
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

    },
    async mounted() {
        
    }
}
</script>

<style scoped>
  

.master-form__transfert {
    width: 100%;
    margin: 0 auto;
}
.mft__form-transfert {
    width: auto;
    height: auto;
    margin: 0 auto;
    font-size: 1rem;
    line-height: 1.5;
    color: black;
    padding: 2px 10px;
}
.mft__block-first {
    padding: 15px 0;
    margin: 20px 5px;
}
.mft__title {
  color: #56565a;
}
.mft__subtitle {
    margin: 0 auto;
    padding: 0 0 0 20px;
}
.special-row {
    display: flex;
    justify-content: flex-start;
}
.special-row > h2.mft__subtitle {
    display: flex;
    align-self: center;
    margin: 0 35px 0 0;
}
.special-row > div.mft__form-group {
    padding: 0;
}
.mft__block-conteneur {
    margin: 0 10px 20px 10px;
}
.mft__form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    margin: 5px 0 10px 5px;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.form-control input:active {
    border: 1px solid black;
}
.row.mft_button {
    margin: 10px 5px;
    margin-bottom: 15px;
}
.btn-submit {
    display: block;
    width: 300px;
    padding: .375rem .75rem;
    margin: 5px auto 10px;
    font-size: 1rem;
    line-height: 1.5;
    color: #fff;
    background-color: #f59d47;
    border: 1px solid #f59d47;
    border-radius: .25rem;
}

@media screen and (max-width: 1024px) {
    .main {
        width: 100%;
    }
    .wrapper {
        width: 100%;
        margin: 10px auto;
    }
    .mft__block-conteneur {
        margin: 15px 0;
    }
}


@media screen and (max-width: 767px) {
    .wrapper {
        margin: 5px auto;
    }
    .main {
        width: 100%;
    }
    .mft__form-transfert {
        padding: 2px 5px;
    }
    .mft__block-conteneur {
        margin: 15px 10px;
    }
    .special-row {
        flex-direction: column;
        justify-content: center;
        margin: 15px 10px;
    }
    .special-row > h2.mft__subtitle {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        padding-left: 10px;
        margin: 10px auto;
    }
    .special-row > div.mft__form-group, .mft__form-group {
        padding: 3px 5px 5px 12px;
    }
}  

</style>