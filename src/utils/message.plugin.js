export default {
  install(Vue, options) {
    Vue.prototype.$message = function(text) {
      text = `<v-snackbar timeout="2000">${text}</v-snackbar>`
    }

    Vue.prototype.$error = function(html) {
      //<v-snackbar timeout="2000">{`[Erreur]: ${html}`}</v-snackbar>
    }

    Vue.prototype.$snackbar = function(html) {
      `<v-snackbar :timeout="2000" :snackbar="true">${html}</v-snackbar>`
    }
  }
}