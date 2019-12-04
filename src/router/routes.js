// 导入 登录页
import login from '@/views/login/login.vue'
// 导入 首页
import index from '@/views/index/index.vue'
// 导入  嵌套路由 学科页面
import subject from '@/views/index/subject/subject.vue'
// 导入  嵌套路由 企业页面
import enterprise from '@/views/index/enterprise/enterprise.vue'

// 暴露路由规则
export default [
    {
        path:"/login",
        component:login
    },
    {
        path:"/index",
        component:index,
        // 嵌套路由
        children:[
            {
                path:"subject",
                component:subject
            },
            {
                path:"enterprise",
                component:enterprise
            }
        ]
    }
]