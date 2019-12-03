<template>
  <el-container class="index-container">
    <el-header class="header">
      <div class="left">
        <span class="icon el-icon-s-fold"></span>
        <img src="@/assets/index_icon.png" alt="">
        <span class='title'>黑马面面</span>
      </div>
      <div class="right">
        <img src="@/assets/avatar.png" alt="">
        <span class="name">李代沫,您好</span>
        <el-button size="mini" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">侧边栏</el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="less">
  .index-container{
    .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f9f9f9;
      .left{
        display: flex;
        align-items: center;
        .icon{
          margin-right: 22px;
          font-size: 30px;
        }
        img{
          width: 33px;
          height: 28px;
          margin-right: 11px;
        }
        .title{
          font-size: 22px;
          color:#49A1FF;
        }
      }
      .right{
        display: flex;
        align-items: center;
        img{
          width: 43px;
          height: 43px;
          margin-right: 9px;
          border-radius: 50%;
        }
        .name{
          margin-right: 38px;
        }
      }

    }
  }
</style>
