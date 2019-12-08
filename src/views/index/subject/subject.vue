<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="filterForm" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="filterForm.user" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
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
          <el-button
            type="primary"
            @click="addFormVisible = true"
            icon="el-icon-plus"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="subjectTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column  label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.g === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{
              scope.row.g === 0 ? "启用" : "禁用"
            }}</el-button>
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
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <subjectDialog />
  </div>
</template>

<script>
// 导入并使用
import subjectDialog from "./components/subjectDialog.vue";
// 导入学科接口
import {subjectList} from "@/api/subject.js"
export default {
  name: "subject",
  // 注册组件
  components: {
    subjectDialog
  },
  data() {
    return {
      filterForm: {},
      subjectTable: [
        {
          b: "subject1",
          c: "前端与移动开发",
          d: "前端",
          e: "管理员",
          f: "2019-12-4",
          g: 0
        },
        {
          b: "subject2",
          c: "Java",
          d: "后端",
          e: "管理员",
          f: "2019-12-5",
          g: 1
        }
      ],
      // 是否显示新增框
      addFormVisible: false
      ,
      // 总条数
      total:0
    };
  },
  // 获取列表数据
  created(){
    // 初始数据获取不携带任何数据
    subjectList().then(res=>{
      // console.log(res)
      // 表格数据
      this.subjectTable = res.data.data.items
      // 总条数
      this.total = res.data.data.pagination.total
    })
  }
};
</script>

<style lang="less">
.subject-container {
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
