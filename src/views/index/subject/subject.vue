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
          <el-button type="primary" @click="filterData">查询</el-button>
          <el-button @click="resetFilter">清除</el-button>
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
            <el-button type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeState(scope.row)">{{
              scope.row.status === 0 ? "启用" : "禁用"
            }}</el-button>
            <!-- <el-button type="text" v-if="['超级管理员'].includes($store.state.userInfo.role)" @click="removeSubject(scope.row)"> -->
            <el-button type="text" v-power="['超级管理员']" @click="removeSubject(scope.row)">
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!-- 新增 对话框 -->
    <subjectDialog />
    <!-- 编辑 对话框 -->
    <subjectEditDialog  ref="subjectEditDialog" />
  </div>
</template>

<script>
// 导入并使用
import subjectDialog from "./components/subjectDialog.vue";
import subjectEditDialog from "./components/subjectEditDialog.vue";
// 导入学科接口
import { subjectList, subjectStatus, subjectRemove } from "@/api/subject.js";
export default {
  name: "subject",
  // 注册组件
  components: {
    subjectDialog,subjectEditDialog
  },
  data() {
    return {
      filterForm: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
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
      addFormVisible: false,
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 页容量
      limit: 5,
      // 是否显示编辑框
      editFormVisible: false,
      // 编辑表单
      editForm:{}
    };
  },
  methods: {
    // 进入编辑状态
    enterEdit(item){
      // 数据传递
      this.$refs.subjectEditDialog.editForm = JSON.parse(JSON.stringify(item));
      // 显示编辑框
      this.editFormVisible = true;
    },
    // 删除数据
    removeSubject(item) {
      this.$confirm("此操作将删除这个学科, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subjectRemove({
            id: item.id
          }).then(res => {
            if (res.data.code !== 200) {
              return this.$message.error(res.data.message);
            }
            // 重新获取数据
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    filterData() {
      // 去第一页
      this.page = 1;
      // 重新获取数据
      this.getList();
    },
    resetFilter() {
      this.$refs.filterForm.resetFields();
    },
    // 修改状态
    changeState(item) {
      subjectStatus({
        id: item.id
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          // 提示用户
          this.$message.success("状态修改成功");
          // 重新获取数据
          this.getList();
        }
      });
    },
    // 获取数据
    getList() {
      // 初始数据获取不携带任何数据
      subjectList({
        page: this.page,
        limit: this.limit,
        ...this.filterForm
      }).then(res => {
        // 表格数据
        this.subjectTable = res.data.items;
        // 总条数
        this.total = res.data.pagination.total;
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
  // 获取列表数据
  created() {
    // 初始数据获取不携带任何数据
    this.getList();
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
