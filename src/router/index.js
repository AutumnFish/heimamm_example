// 导入 Vue
import Vue from "vue";
// 导入 路由
import VueRouter from "vue-router";

// use 一下
Vue.use(VueRouter);
// 导入 路由规则
import routes from "@/router/routes.js";
// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

// 创建路由对象
const router = new VueRouter({
  routes
});

// 增加导航后置后卫
router.afterEach((to)=>{
  document.title = to.meta.title||'黑马面面'
})

export default router;
