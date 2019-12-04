<template>
  <el-container class="index-container">
    <el-header class="header">
      <div class="left">
        <span class="icon el-icon-s-fold" @click="isCollapse=!isCollapse"></span>
        <img src="@/assets/index_icon.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img src="@/assets/avatar.png" alt="" />
        <span class="name" >李代沫,您好</span>
        <el-button size="mini" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width:auto" width="200px">
        <!-- 导航 -->
        <el-menu
          :default-active="$router.path"
          class="el-menu-vertical-demo"
          router
          :collapse="isCollapse"
        >
          <el-menu-item index="ch">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="subjet">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      isCollapse:true
    }
  }
};
</script>

<style lang="less">
.index-container {
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
}
</style>
