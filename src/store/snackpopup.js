
export default {
  state: {
    snackbar: {
      showing: false,
      timer: -1,
      text: "",
      color: "success"
    }
  },
  actions: {
    setSnackbar(ctx, {showing = true, timer = 2000, color = 'success', text}) {
      let sb = {};
      sb.showing = showing;
      sb.color = color;
      sb.timer = timer;
      sb.text = text;
      ctx.commit('SET_SNACKBAR', sb)
    }
  },
  mutations: {
    SET_SNACKBAR (state, snackbar) {
      state.snackbar = snackbar;
    },
    clearSnackbar(state) {
      state.snackbar.showing = false
    }
  },
  getters: {
    Snackbar: s => s.snackbar
  }
}
