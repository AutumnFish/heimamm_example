// 导入 登录页
import login from "@/views/login/login.vue";
// 导入 首页
import index from "@/views/index/index.vue";
// 导入  嵌套路由 学科页面
import subject from "@/views/index/subject/subject.vue";
// 导入  嵌套路由 企业页面
import enterprise from "@/views/index/enterprise/enterprise.vue";
// 导入  嵌套路由 用户页面
import user from "@/views/index/user/user.vue";
// 导入  嵌套路由 数据页面
import chart from "@/views/index/chart/chart.vue";
// 导入  嵌套路由 题库页面
import question from "@/views/index/question/question.vue";

// 暴露路由规则
export default [
  {
    path: "/login",
    component: login
  },
  {
    path: "/index",
    component: index,
    redirect: '/index/subject',
    // 嵌套路由
    children: [
      {
        path: "chart",
        component: chart,
        meta: {
          title: "数据概览",
          fullPath: "/index/chart",
          icon: "el-icon-pie-chart"
        }
      },
      {
        path: "user",
        component: user,
        meta: {
          title: "用户列表",
          fullPath: "/index/user",
          icon: "el-icon-user"
        }
      },
      {
        path: "question",
        component: question,
        meta: {
          title: "题库列表",
          fullPath: "/index/question",
          icon: "el-icon-edit-outline"
        }
      },

      {
        path: "enterprise",
        component: enterprise,
        meta: {
          title: "企业列表",
          fullPath: "/index/enterprise",
          icon: "el-icon-notebook-2"
        }
      },
      {
        path: "subject",
        component: subject,
        meta: {
          title: "学科列表",
          fullPath: "/index/subject",
          icon: "el-icon-office-building"
        }
      }
    ]
  }
];
