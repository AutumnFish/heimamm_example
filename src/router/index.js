// 导入 Vue
import Vue from 'vue'
// 导入 路由
import VueRouter from 'vue-router'
// // 导入token操纵函数
import { getToken,removeToken } from '@/utils/token.js'
// // 导入element-ui的弹框
import { Message } from 'element-ui'
// // 导入用户信息获取接口
import { userInfo } from '@/api/login.js'
// // 导入仓库
import store from '@/store/store.js'

// use 一下
Vue.use(VueRouter)
// 导入 路由规则
import routes from '@/router/routes.js'

// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 创建路由对象
const router = new VueRouter({
  routes
})

// 地址白名单
const whitePaths = ['/login']
// 增加导航守卫
router.beforeEach((to, from, next) => {
  // 首页才需要判断token
  if (!whitePaths.includes(to.path)) {
    if (!getToken()) {
      Message.error('请先登录')
      return next('/login')
    }
    // 如果没有用户信息
    if (!store.state.userInfo) {
      // 用户信息获取 并且 token正确性判断
      userInfo().then(res => {
        console.log(res)
        if (res.code === 207) {
          // token验证失效
          Message.error('登录状态有误，请重新登录')
          // 删除错误的token
          removeToken()
          // 跳转去登录页
          next('/login')
        } else {
          // 用户状态判断
          if (res.data.status === 0) {
            Message.warning('你是被禁用状态,请联系管理员')
            next('/login')
          } else {
            // 用户的头像地址缺少了一个基地址
            res.data.avatar =
              process.env.VUE_APP_BASEURL + res.data.avatar
            // 保存用户信息
            store.commit('SETINFO', res.data)
            // token验证成功
            next()
          }
        }
      })
    } else {
      // 如果有用户信息，就判断是否允许访问
      if (to.meta.roles.includes(store.state.userInfo.roleName)) {
        // 直接放过去
        next()
      } else {
        // 不允许访问
        Message.warning('你没有访问的权限！')
      }
    }
  } else {
    // 放过去
    next()
  }
})

// 增加导航后置后卫
router.afterEach(to => {
  document.title = to.meta.title || '黑马面面'
})

export default router
