// 导入 登录页
import login from '@/views/login/login.vue'
// 导入 首页
import index from '@/views/index/index.vue'

// 暴露路由规则
export default [
    {
        path:"/login",
        component:login
    },
    {
        path:"/index",
        component:index
    }
]