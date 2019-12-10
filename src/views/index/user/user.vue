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
          <el-button type="primary" @click="filterData">查询</el-button>
          <el-button @click="removeFilter">清除</el-button>
          <el-button
            type="primary"
            @click="addFormVisible = true"
            icon="el-icon-plus"
            v-power="['超级管理员']"
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
        <el-table-column prop="h" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" v-power="['超级管理员']" @click="enterEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" v-if="scope.row.role_id>$store.state.userInfo.role_id" @click="changeStatus(scope.row)">{{
              scope.row.status === 0 ? "启用" : "禁用"
            }}</el-button>
            <el-button type="text" v-power="['超级管理员']" @click="removeUser(scope.row)"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
import userDialog from "./components/userDialog.vue";
import userEditDialog from "./components/userEditDialog.vue";
// 导入数据接口
import { userList, userStatus, userRemove } from "@/api/user.js";
export default {
  name: "user",
  // 注册组件
  components: {
    userDialog,
    userEditDialog
  },
  data() {
    return {
      filterForm: {},
      userTable: [],
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
    enterEdit(item) {
      this.$refs.userEditDialog.editForm = JSON.parse(JSON.stringify(item));
      // 显示出来
      this.editFormVisible = true;
    },
    // 删除用户
    removeUser(item) {
      this.$confirm("是否确认删除该用户", "提示!", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 调用删除接口
          userRemove({
            id: item.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              // 重新获取数据
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    // 重置数据
    removeFilter() {
      this.$refs.filterForm.resetFields();
      // 重新获取数据
      this.getList();
    },
    // 筛选数据
    filterData() {
      // 去第一页
      this.page = 1;
      this.getList();
    },
    // 修改状态
    changeStatus(item) {
      userStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("状态修改成功");
          this.getList();
        }
      });
    },
    // 获取数据
    getList() {
      userList({
        page: this.page,
        limit: this.limit,
        ...this.filterForm
      }).then(res => {
        this.total = res.data.pagination.total;
        this.userTable = res.data.items;
      });
    },
    // 页容量改变
    handleSizeChange(limit) {
      this.limit = limit;
      this.page = 1;
      // 重新获取数据
      this.getList();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.page = page;
      // 重新获取数据
      this.getList();
    }
  },
  created() {
    // 获取用户信息
    userList({
      page: this.page,
      limit: this.limit
    }).then(res => {
      this.total = res.data.pagination.total;
      this.userTable = res.data.items;
    });
  }
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
