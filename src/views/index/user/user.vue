<template>
  <div class="user-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form
        :inline="true"
        ref="filterForm"
        :model="filterForm"
        class="demo-form-inline"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model="filterForm.username"
            class="short-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="filterForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="filterForm.role_id" placeholder="请选择状态">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button >清除</el-button>
          <el-button
            type="primary"
            @click="addFormVisible = true"
            icon="el-icon-plus"
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="userTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
             
              @click="enterEdit()"
              >编辑</el-button
            >
            <el-button
              type="text"
             
              @click="changeStatus()"
              >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-button
            >
            <el-button
              type="text"
            
              @click="removeUser()"
              >删除</el-button
            >
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
    <userDialog />
    <!-- 编辑对话框 -->
    <userEditDialog ref="userEditDialog" />
  </div>
</template>

<script>
// 导入并使用
import userDialog from './components/userDialog.vue';
import userEditDialog from './components/userEditDialog.vue';

export default {
  name: 'user',
  // 注册组件
  components: {
    userDialog,
    userEditDialog
  },
  data() {
    return {
      filterForm: {},
      userTable: [
        {
          id: 3,
          username: 'phper_leo',
          email: 'phper_leo@163.com',
          phone: '18520409113',
          avatar: 'upload/20200114/53043f648b360ac32398c365d9c4d2db.jpg',
          remark: '初始管理员',
          status: 1,
          role_id: 1,
          create_time: '2020-01-14 14:39:34',
          update_time: '2020-01-14 14:39:34',
          role: '超级管理员'
        },
        {
          id: 2,
          username: '18522222222',
          email: '18522222222@qq.com',
          phone: '18522222222',
          avatar: '',
          remark: '初始管理员',
          status: 1,
          role_id: 2,
          create_time: '2020-01-14 14:43:09',
          update_time: '2020-01-14 14:43:09',
          role: '管理员'
        },
        {
          id: 1,
          username: '18511111111',
          email: '18511111111@qq.com',
          phone: '18511111111',
          avatar: 'upload/20200114/53043f648b360ac32398c365d9c4d2db.jpg',
          remark: '初始超级管理员',
          status: 1,
          role_id: 1,
          create_time: '2020-01-14 14:41:51',
          update_time: '2020-01-14 14:41:51',
          role: '超级管理员'
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
      // 编辑模态框
      editFormVisible: false
    };
  },
  methods: {
    // 进入编辑状态
    enterEdit() {
      // 显示出来
      this.editFormVisible = true;
    },
    // 删除用户
    removeUser() {
     this.$message("你点击了删除按钮")
    },


    // 修改状态
    changeStatus() {
      this.$message("你点击了状态按钮")
    },
  },

};
</script>

<style lang="less">
.user-container {
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
