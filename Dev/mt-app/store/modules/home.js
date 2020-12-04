const state = {
  hotPlace: []
};
const mutations = {
  setHotPlace(state, data) {
    state.hotPlace = data;
  }
};
const actions = {
  setHostPlace({ commit }, data) {
    commit("setHotPlace", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
