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
          <el-button type="primary" @click="filterData">查询</el-button>
          <el-button @click="clearFilter">清除</el-button>
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
            <el-button type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{
              scope.row.status === 0 ? "启用" : "禁用"
            }}</el-button>
            <el-button type="text" @click="removeItem(scope.row)"
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
    <enterpriseDialog />
    <!-- 编辑对话框 -->
    <enterpriseEditDialog ref="enterpriseEditDialog"/>
  </div>
</template>

<script>
// 导入并使用
import enterpriseDialog from "./components/enterpriseDialog.vue";
import enterpriseEditDialog from "./components/enterpriseEditDialog.vue";
// 导入数据接口
import {
  enterpriseList,
  enterpriseStatus,
  enterpriseRemove
} from "@/api/enterprise.js";
export default {
  name: "enterprise",
  // 注册组件
  components: {
    enterpriseDialog,
    enterpriseEditDialog
  },
  data() {
    return {
      filterForm: {},
      enterpriseTable: [
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
      addFormVisible: false,
      // 页码
      page: 1,
      // 页容量
      limit: 5,
      // 总条数
      total: 0,
      // 是否显示编辑框
      editFormVisible:false
    };
  },
  methods: {
    // 进入编辑状态
    enterEdit(item){
      this.$refs.enterpriseEditDialog.editForm = JSON.parse(JSON.stringify(item));
      // 显示对话框
      this.editFormVisible = true;
    },
    // 删除数据
    removeItem(item) {
      // 提示用户
      this.$confirm("你确定要删除这个企业", "提示!", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseRemove({
            id: item.id
          }).then(res => {
            if(res.code===200){
              // 重新获取数据
              this.getList()
            }
          });
        })
        .catch(() => {});
    },
    // 清除筛选
    clearFilter() {
      this.$refs.filterForm.resetFields();
      // 重新获取数据
      this.getList();
    },
    // 筛选数据
    filterData() {
      // 重新获取数据
      this.getList();
    },
    // 修改状态
    changeStatus(item) {
      enterpriseStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("状态修改成功");
          this.getList();
        }
      });
    },
    // 获取列表数据
    getList() {
      enterpriseList({
        limt: this.limit,
        page: this.page,
        ...this.filterForm
      }).then(res => {
        // 总条数
        this.total = res.data.pagination.total;
        // 表格数据
        this.enterpriseTable = res.data.items;
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
    enterpriseList({
      limit: this.limit,
      page: this.page
    }).then(res => {
      // 总条数
      this.total = res.data.pagination.total;
      // 表格数据
      this.enterpriseTable = res.data.items;
    });
  }
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
