<template>
  <div class="enterprise-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form
        :inline="true"
        ref="filterForm"
        :model="filterForm"
        class="demo-form-inline"
      >
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="filterForm.eid" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="filterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input
            v-model="filterForm.username"
            class="short-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="filterForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>清除</el-button>
          <el-button
            type="primary"
            @click="addFormVisible = true"
            icon="el-icon-plus"
            >新增企业</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="enterpriseTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="enterEdit">编辑</el-button>
            <el-button type="text">{{
              scope.row.status === 0 ? '启用' : '禁用'
            }}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <enterpriseDialog />
    <!-- 编辑对话框 -->
    <enterpriseEditDialog ref="enterpriseEditDialog" />
  </div>
</template>

<script>
// 导入并使用
import enterpriseDialog from './components/enterpriseDialog.vue';
import enterpriseEditDialog from './components/enterpriseEditDialog.vue';
// 导入数据接口
import { enterpriseList } from '@/api/enterprise.js';
export default {
  name: 'enterprise',
  // 注册组件
  components: {
    enterpriseDialog,
    enterpriseEditDialog
  },
  data() {
    return {
      // 筛选的表单
      filterForm: {},
      enterpriseTable: [
        {
          id: 51,
          eid: '3',
          name: '阿里巴巴',
          short_name: '阿里',
          intro: '阿里',
          user_id: 3,
          remark: '阿里',
          status: 1,
          create_time: '2020-01-14 14:52:55',
          update_time: '2020-01-14 14:52:55',
          is_del: 0,
          username: 'phper_leo'
        },
        {
          id: 50,
          eid: '2',
          name: '黑马程序员',
          short_name: '黑马',
          intro: '黑马',
          user_id: 3,
          remark: '黑马',
          status: 1,
          create_time: '2020-01-14 14:52:38',
          update_time: '2020-01-14 14:52:38',
          is_del: 0,
          username: 'phper_leo'
        },
        {
          id: 49,
          eid: '1',
          name: '传智播客',
          short_name: '传智',
          intro: '传智播客',
          user_id: 3,
          remark: '传智播客',
          status: 1,
          create_time: '2020-01-14 14:52:14',
          update_time: '2020-01-14 14:52:14',
          is_del: 0,
          username: 'phper_leo'
        }
      ],
      // 是否显示新增框
      addFormVisible: false,
      // 页码
      page: 1,
      // 页容量
      limit: 5,
      // 总条数
      total: 0,
      // 是否显示编辑框
      editFormVisible: false
    };
  },
  methods: {
    // 进入编辑状态
    enterEdit() {
      // 显示对话框
      this.editFormVisible = true;
    }
  },
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
