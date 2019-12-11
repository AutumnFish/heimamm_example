// 导入 登录页
const login = ()=>import("@/views/login/login.vue")
// 导入 首页
const index = ()=>import("@/views/index/index.vue")
// 导入  嵌套路由 学科页面
const subject = ()=>import("@/views/index/subject/subject.vue")
// 导入  嵌套路由 企业页面
const enterprise = ()=>import("@/views/index/enterprise/enterprise.vue")
// 导入  嵌套路由 用户页面
const user = ()=>import("@/views/index/user/user.vue")
// 导入  嵌套路由 数据页面
const chart = ()=>import("@/views/index/chart/chart.vue")
// 导入  嵌套路由 题库页面
const question = ()=>import("@/views/index/question/question.vue")

// 暴露路由规则
export default [
  {
    path: "/",
    redirect:"/login"
  },
  {
    path: "/login",
    component: login,
    meta: {
      roles: ["超级管理员","管理员", "老师", "学生"]
    }
  },
  {
    path: "/index",
    component: index,
    redirect: "/index/subject",
    // 嵌套路由
    children: [
      {
        path: "chart",
        component: chart,
        meta: {
          title: "数据概览",
          fullPath: "/index/chart",
          icon: "el-icon-pie-chart",
          roles: ["超级管理员","管理员", "老师"]
        }
      },
      {
        path: "user",
        component: user,
        meta: {
          title: "用户列表",
          fullPath: "/index/user",
          icon: "el-icon-user",
          roles: ["超级管理员","管理员"]
        }
      },
      {
        path: "question",
        component: question,
        meta: {
          title: "题库列表",
          fullPath: "/index/question",
          icon: "el-icon-edit-outline",
          roles: ["超级管理员","管理员", "老师", "学生"]
        }
      },

      {
        path: "enterprise",
        component: enterprise,
        meta: {
          title: "企业列表",
          fullPath: "/index/enterprise",
          icon: "el-icon-notebook-2",
          roles: ["超级管理员","管理员", "老师"]
        }
      },
      {
        path: "subject",
        component: subject,
        meta: {
          title: "学科列表",
          fullPath: "/index/subject",
          icon: "el-icon-office-building",
          roles: ["超级管理员","管理员", "老师"]
        }
      }
    ]
  }
];
