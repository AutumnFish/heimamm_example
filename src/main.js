import Vue from "vue";
import App from "./App.vue";
// 导入路由
import router from "@/router/index.js";
// 导入仓库
import store from "@/store/store.js";
// 导入全局过滤器
import '@/filters/filters.js'
// 导入自定义指令
import '@/directives/directive.js'

// 导入element-ui
import '@/plugins/element.js'

// 导入全局样式
import "@/styles/base.less";

// 注册全局组件
import './components/index.js'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router,
  // 挂载到Vue实例上
  store
}).$mount("#app");
