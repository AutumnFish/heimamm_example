<template>
  <div class="enterprise-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="filterForm" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="filterForm.user" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="filterForm.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="filterForm.user" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" @click="addFormVisible=true" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="subjectTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="b" label="企业编号"></el-table-column>
        <el-table-column prop="c" label="企业名称"></el-table-column>
        <el-table-column prop="d" label="所属领域"></el-table-column>
        <el-table-column prop="e" label="创建者"></el-table-column>
        <el-table-column prop="f" label="创建日期"></el-table-column>
        <el-table-column prop="g" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.g === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="h" label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button
              type="text"
              >{{scope.row.g===0?"启用":"禁用"}}</el-button
            >
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!-- 分页器 -->
      <el-pagination
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <enterpriseDialog/>
  </div>
</template>

<script>
// 导入并使用
import enterpriseDialog from './components/enterpriseDialog.vue'
// 导入数据接口
export default {
  name: "enterprise",
  // 注册组件
  components:{
    enterpriseDialog
  },
  data() {
    return {
      filterForm: {},
      subjectTable: [
        {
          b: "enterprise1",
          c: "黑马程序员",
          d: "互联网",
          e: "管理员",
          f: "2019-12-4",
          g: 0
        },
        {
          b: "enterprise2",
          c: "阿里巴巴",
          d: "金融",
          e: "管理员",
          f: "2019-12-5",
          g: 1
        }
      ],
      // 是否显示新增框
      addFormVisible:false
    };
  },
  created(){}
};
</script>

<style lang="less">
.enterprise-container {
  .card-header {
    height: 103px;
    // 短的输入框
    .short-input {
      width: 100px;
    }
    // 文本
    .el-form-item__label {
      font-weight: 700;
    }
  }
  .card-main {
    margin-top: 19px;
    // 红色的高亮span
    span.red {
      color: red;
    }
  }
}
</style>
