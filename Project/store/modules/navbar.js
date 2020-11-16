const state = {
  data: []
};
const actions = {
  add({ commit }, text) {
    commit('add', text);
  }
};
const mutations = {
  add(state, text) {
    state.data.push(text);
  }
};
const getters = {
  data(state) {
    return state.data;
  }
};
export default {
  state,
  actions,
  mutations,
  getters
};
