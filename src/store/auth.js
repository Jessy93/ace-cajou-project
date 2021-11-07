import firebase from "firebase/app"
export default {
  actions: {
    async login({dispatch}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        dispatch('setSnackbar', {text: 'vous êtes connectés avec succès'});
      } catch (e) {
        let message
        if (e.code == "auth/user-not-found") {
          message = "C'est utilisateur n'existe pas ou a été supprimé"
        } else {
          message = "Mot de passe incorrecte"
        }
        dispatch('setSnackbar', {text: message, color: 'red'});
        throw e
      }
    },
    async register({dispatch}, {email, password, firstName, lastName, phoneNumber, role, levelPermission, isActive}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          email,
          firstName,
          lastName,
          phoneNumber,
          role,
          levelPermission,
          isActive
        })
        dispatch('setSnackbar', {text: 'Votre compte a été crée avec succès'});
      } catch (e) {
        dispatch('setSnackbar', {text: "Adresse mail deja utilisé par un autre utilisateur", color: 'red'});
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return  user ? user.uid : null
    },
    async logout({commit, dispatch}) {
      await firebase.auth().signOut()
      commit('clearInfo')
      dispatch('setSnackbar', {text: 'Vous etes déconnectés avec succès'});
    }
  }
}