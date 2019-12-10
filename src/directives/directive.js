import Vue from "vue";
import store from "@/store/store.js";

// 注册自定义指令
Vue.directive("power", {
  inserted: (el, bind) => {
    // 权限和 用户角色的判断
    if (!bind.value.includes(store.state.userInfo.role)) {
      // 如果存在，那么不做处理
      // 如果不存在，那么移除这个元素
      el.parentNode.removeChild(el);
    }
  }
});
