<template>
  <el-container class="index-container">
    <el-header class="header">
      <div class="left">
        <span
          class="icon el-icon-s-operation"
          @click="isCollapse = !isCollapse"
        ></span>
        <img src="@/assets/index_icon.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt="" />
        <span class="name">{{ userInfo.username }},您好</span>
        <el-button size="mini" type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width:auto" width="200px">
        <!-- 导航 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          router
          :collapse="isCollapse"
        >
          <template v-for="(item, index) in routes[2].children">
            <el-menu-item v-if="item.meta.roles.includes($store.state.userInfo.role)" :key="index" :index="item.meta.fullPath">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入路由信息
import routes from "@/router/routes.js";
// 导入退出接口
import { logout } from "@/api/login.js";
// 导入token模块
import { removeToken } from "@/utils/token.js";
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      // 路由信息
      routes
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    logout() {
      // 弹框提示用户
      this.$confirm("确定黑马面面吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 调用退出接口
          logout().then(res => {
            // console.log(res)
            if (res.code === 200) {
              // 删除token
              removeToken();
              // 删除用户信息
              this.$store.commit("SETINFO", undefined);
              // 跳转去登录页
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f9f9f9;
    .left {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 22px;
        font-size: 30px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  // 侧边导航
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .main {
    background-color: #e8e9ec;
  }
}
</style>
