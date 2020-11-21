const state = {
  position: {
    cip: "",
    cid: "",
    cname: "定位失败"
  }
};
const mutations = {
  setPositions(state, data) {
    state.position = data;
  }
};
const actions = {
  setPositions({ commit }, data) {
    commit("setPositions", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
