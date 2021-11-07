import firebase from "firebase/app"
import info from "./info"
export default {
  state: {
    form: []
  },
  mutations: {
    setForm(state, form) {
      state.form = form
    },
    clearForm(state) {
      state.form = []
    }
  },
  getters: {
    listForm(state) {
      return state.form
    }
  },
  actions: {
    async saveform({dispatch, commit}, {
      IdForm, DateChargProd, RegChargProd, DepChargProd, SousPrefChargProd, 
      VillageChargProd, VilleChargProd, ExpChargProd,

      NomAcheteur, ContactAcheteur, CodeAcheteur, MagAcheteur,

      NomProd, ThDepartProd, NbreSacsProd, PoidsTheoProd, NomTranspProd, 
      MarkCamionProd, ImmatRemorkProd, ImmatAvCamionProd, NomChaufProd, 
      NoPermCondChaufProd,

      DateDechargProd, HeureDechargProd, NomExport, CodeExport, PortUsineProd, 
      PontBascule, NomMagasin, ControleurTh,

      NbreSacsDecharg, NbreSacsRembour,

      TauxHumidite, PoidsBrut, Tare, PoidsNet, PrixAuKg,

      StickerCCA, NomContactAgeCCA, NomContactDuMag, NomContactContTH,
    }) 
    {
      try {
        const uid = await dispatch('getUid')
        const timeSaved = Date.now() - (new Date()).getTimezoneOffset() * 60000;
        await firebase.database().ref(`/listform`).push({
          idUserSavedForm: uid, timeSaved, IdForm,

          DateChargProd, RegChargProd, DepChargProd, SousPrefChargProd,
          VillageChargProd, VilleChargProd, ExpChargProd,

          NomAcheteur, ContactAcheteur, CodeAcheteur, MagAcheteur,

          NomProd, ThDepartProd, NbreSacsProd, PoidsTheoProd, NomTranspProd,
          MarkCamionProd, ImmatRemorkProd, ImmatAvCamionProd, NomChaufProd,
          NoPermCondChaufProd,

          DateDechargProd, HeureDechargProd, NomExport, CodeExport, PortUsineProd,
          PontBascule, NomMagasin, ControleurTh,

          NbreSacsDecharg, NbreSacsRembour,

          TauxHumidite, PoidsBrut, Tare, PoidsNet, PrixAuKg,

          StickerCCA, NomContactAgeCCA, NomContactDuMag, NomContactContTH,          
        })
        dispatch('setSnackbar', {text: 'Formulaire enregistré'});
      } catch (e) {
        dispatch('setSnackbar', {text: e.message, color: 'red'});
        throw e
      }
    },
    async FetchListForm({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const allForms = (await firebase.database().ref('/listform').once('value')).val()

        const allFormObj = Object.keys(allForms).map(key => (
            {...allForms[key], id: key}
        ))
        
        const form = [];

        if (this.state.info.info.levelPermission == 3) {
          for (let id = 0; id < allFormObj.length; id++) {
            if (allFormObj[id].idUserSavedForm == uid) {
              form.push(allFormObj[id])
            }
          }
        } else {
          form = allFormObj;
        }
        console.log("http://localhost:8080/", this.state.info);

        commit('setForm', form)
      } catch (e) {
        dispatch('setSnackbar', {text: e.message, color: 'red'});
        throw e
      }
    }
  }
}