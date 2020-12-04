import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import geo from "./modules/geo";
import menu from "./modules/menu";
import home from "./modules/home";

Vue.use(Vuex);
const store = () =>
  new Vuex.Store({
    modules: {
      geo,
      menu,
      home
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
        // 初始化菜单信息
        const { status: statusForMenu, data: dataForMenu } = await axios.get(
          "http://localhost:3000/menus/getMenuList"
        );
        const { menu } = dataForMenu.data;
        commit("menu/setMenu", statusForMenu === 200 ? menu : []);
        // 初始化热门搜索
        const { status: statusForHome, data: dataForHome } = await axios.get(
          "http://localhost:3000/poi/hotPlace"
        );
        const result = dataForHome.data;
        console.log(result);
        commit("home/setHotPlace", statusForHome === 200 ? result : []);
      }
    }
  });

export default store;
