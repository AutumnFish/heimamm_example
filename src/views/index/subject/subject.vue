<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form
        :inline="true"
        ref="filterForm"
        :model="filterForm"
        class="demo-form-inline"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="filterForm.rid" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
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

            <el-button type="text">
              删除
            </el-button>
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
    <!-- 新增 对话框 -->
    <subjectDialog />
    <!-- 编辑 对话框 -->
    <subjectEditDialog ref="subjectEditDialog" />
  </div>
</template>

<script>
// 导入并使用
import subjectDialog from './components/subjectDialog.vue';
import subjectEditDialog from './components/subjectEditDialog.vue';
export default {
  name: 'subject',
  // 注册组件
  components: {
    subjectDialog,
    subjectEditDialog
  },
  data() {
    return {
      filterForm: {
        rid: '',
        name: '',
        username: '',
        status: ''
      },
      subjectTable: [
        {
          id: 98,
          rid: 'JAVA001',
          name: 'JavaWeb',
          short_name: 'JavaWeb',
          intro: 'JavaWeb',
          user_id: 3,
          remark: 'JavaWeb',
          status: 1,
          create_time: '2020-01-14 14:51:12',
          update_time: '2020-01-14 14:51:12',
          is_del: 0,
          username: 'phper_leo'
        },
        {
          id: 97,
          rid: 'QD001',
          name: '前段与移动开发',
          short_name: '前段',
          intro: '前段与移动开发',
          user_id: 3,
          remark: '',
          status: 1,
          create_time: '2020-01-14 14:49:26',
          update_time: '2020-01-14 14:49:38',
          is_del: 0,
          username: 'phper_leo'
        }
      ],
      // 是否显示新增框
      addFormVisible: false,
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 页容量
      limit: 5,
      // 是否显示编辑框
      editFormVisible: false,
    };
  },
  methods: {
    // 进入编辑状态
    enterEdit() {
      // 显示编辑框
      this.editFormVisible = true;
    },

 
  },
 
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
