import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import geo from "./modules/geo";

Vue.use(Vuex);
const store = () =>
  new Vuex.Store({
    modules: {
      geo
    },
    actions: {
      async nuxtServerInit({ commit }) {
        const { status, data } = await axios.get(
          "http://localhost:3000/geo/getPosition"
        );
        const { cip, cid, cname } = data.data;
        commit(
          "geo/setPositions",
          status === 200
            ? { cip, cid, cname }
            : { cip: "", cid: "", cname: "定位失败" }
        );
      }
    }
  });

export default store;
