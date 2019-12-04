<template>
  <div class="user-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="filterForm" class="demo-form-inline">
        <el-form-item label="用户编号">
          <el-input v-model="filterForm.user" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
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
          <el-button type="primary" @click="addFormVisible=true" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="subjectTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="b" label="用户名"></el-table-column>
        <el-table-column prop="c" label="电话"></el-table-column>
        <el-table-column prop="d" label="邮箱"></el-table-column>
        <el-table-column prop="e" label="角色"></el-table-column>
        <el-table-column prop="f" label="备注"></el-table-column>
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
    <userDialog/>
  </div>
</template>

<script>
// 导入并使用
import userDialog from './components/userDialog.vue'
export default {
  name: "user",
  // 注册组件
  components:{
    userDialog
  },
  data() {
    return {
      filterForm: {},
      subjectTable: [
        {
          b: "jack",
          c: "18888888888",
          d: "8888@qq.com",
          e: "管理员",
          f: "全能的管理员",
          g: 0
        },
        {
          b: "rose",
          c: "18888881234",
          d: "1234@qq.com",
          e: "老师",
          f: "部分权限的老师",
          g: 1
        },
                {
          b: "ice",
          c: "16666666666",
          d: "6666@qq.com",
          e: "学生",
          f: "只能学习",
          g: 0
        }
      ],
      // 是否显示新增框
      addFormVisible:false
    };
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
