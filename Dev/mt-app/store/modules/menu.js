const state = {
  menuList: []
};
const mutations = {
  setMenu(state, data) {
    state.menuList = data;
  }
};
const actions = {
  setMenu({ commit }, data) {
    commit("setMenu", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
