import Vue from "vue";
import Vuex from "vuex";

// use 一下
Vue.use(Vuex);
// 创建仓库
const store = new Vuex.Store({
  state: {
    userInfo: ''
  },
  mutations: {
    SETINFO(state, info) {
      state.userInfo = info;
    }
  }
});

// 暴露出去
export default store;
