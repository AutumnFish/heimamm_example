// 导入 Vue
import Vue from "vue";
// 导入 路由
import VueRouter from "vue-router";
// 导入token操纵函数
import { getToken, removeToken } from "@/utils/token.js";
// 导入element-ui的弹框
import { Message } from "element-ui";
// 导入用户信息获取接口
import { userInfo } from "@/api/user.js";
// 导入仓库
import store from "@/store/store.js";

// use 一下
Vue.use(VueRouter);
// 导入 路由规则
import routes from "@/router/routes.js";

const router = new VueRouter({
  routes
});

// 地址白名单
const whitePaths = ["/login"]; 
// 增加导航守卫
router.beforeEach((to, from, next) => {
  // 首页才需要判断token
  if (!whitePaths.includes(to.path)) {
    if (!getToken()) {
      Message.error("必须登录才可以访问首页");
      return next("/login");
    }
    // 如果没有用户信息
    if (!store.state.userInfo) {
      // 用户信息获取 并且 token正确性判断
      userInfo().then(res => {
        if (res.data.code === 0) {
          // token验证失效
          Message.error("登录状态有误，请重新登录");
          // 删除错误的token
          removeToken();
          // 跳转去登录页
          next("/login");
        } else {
          // 保存用户信息
          store.commit("SETINFO", res.data.data);
          // token验证成功
          next();
        }
      });
    }else{
      // 直接放过去
      next();
    }
  } else {
    // 放过去
    next();
  }
});

export default router;

window.console.log(router);
