const state = {
  list: ['a', 'b', 'c']
};
const actions = {
  add({ commit }, text) {
    commit('add', text);
  }
};
const mutations = {
  add(state, text) {
    state.list.push(text);
  }
};
const getters = {
  list(state) {
    return state.list;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
