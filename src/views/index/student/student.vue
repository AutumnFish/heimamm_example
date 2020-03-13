<template>
  <div class="student-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form
        :inline="true"
        ref="filterForm"
        :model="filterForm"
        class="demo-form-inline"
      >
        <el-form-item label="学员姓名" prop="username">
          <el-input
            v-model="filterForm.username"
            class="short-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="学员邮箱" prop="email">
          <el-input v-model="filterForm.email"></el-input>
        </el-form-item>
        <el-form-item label="学员手机" prop="phone">
          <el-input v-model="filterForm.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="filterData">查询</el-button>
          <el-button @click="removeFilter">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="studentTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img class='avatar' :src="scope.row.avatar" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="h" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="enterEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="text" @click="changeStatus(scope.row)">
              {{ scope.row.status == 0 ? '启用' : '禁用' }}
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
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
  // 导入数据接口
  import { studentList, studentStatus } from '@/api/student.js'
  export default {
    data() {
      return {
        filterForm: {
          username: '',
          email: '',
          phone: ''
        },
        // 分页相关数据
        page: 1,
        limit: 5,
        total: 0,
        // table的数据
        studentTable: []
      }
    },
    created() {
      // 获取学生数据
      this.getStudent()
    },
    // 方法
    methods: {
      getStudent() {
        studentList({
          page: this.page,
          limit: this.limit,
          ...this.filterForm
        }).then(res => {
          // console.log(res)
          this.total = res.data.pagination.total
          res.data.items.forEach(v=>{
            v.avatar = process.env.VUE_APP_BASEURL+v.avatar
          })
          this.studentTable = res.data.items
        })
      },
      // 查询数据
      filterData() {
        this.getStudent()
      },
      // 清除查询
      removeFilter() {
        this.$refs.filterForm.resetFields()
        this.getStudent()
      },
      // 切换状态
      changeStatus(item) {
        studentStatus({
          id: item.id
        }).then(res => {
          if (res.code == 200) {
            this.$message.success('状态修改成功')
            this.getStudent()
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      // 分页组件
      // 页容量改变
      handleSizeChange(newSize) {
        this.limit = newSize
        this.page = 1
        this.getStudent()
      },
      // 页码改变
      handleCurrentChange(newPage) {
        this.page = newPage
        this.getStudent()
      }
    }
  }
</script>

<style lang="less">
  .student-container {
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
    .avatar{
      width: 50px;
      height: 50px;
      border-radius:50%;
    }
  }
</style>
