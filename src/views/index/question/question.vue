<template>
  <div class="question-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="filterForm" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="filterForm.region" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="filterForm.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="filterForm.region" placeholder="请选择企业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="filterForm.region" placeholder="请选择题型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="filterForm.region" placeholder="请选择难度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="filterForm.user" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="filterForm.value"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题">
          <el-input v-model="filterForm.user" class="title-input"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button
            type="primary"
            @click="addFormVisible = true"
            icon="el-icon-plus"
            >新增试题</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="subjectTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="b" label="题目"></el-table-column>
        <el-table-column prop="c" label="学科·阶段"></el-table-column>
        <el-table-column prop="d" label="题型"></el-table-column>
        <el-table-column prop="e" label="企业"></el-table-column>
        <el-table-column prop="f" label="创建者"></el-table-column>
        <el-table-column prop="g" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.g === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="h" label="访问量"></el-table-column>
        <el-table-column label="操作">
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
        :total="20"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <questionDialog />
  </div>
</template>

<script>
// 导入并使用
import questionDialog from "./components/questionDialog.vue";
export default {
  name: "question",
  // 注册组件
  components: {
    questionDialog
  },
  data() {
    return {
      filterForm: {},
      subjectTable: [
        {
          b: "浏览器缓存",
          c: "前端·初级",
          d: "单选",
          e: "黑马",
          f: "管理员",
          g: 0,
          h: 0
        },
        {
          b: "会话技术",
          c: "后端·初级",
          d: "多选",
          e: "阿里",
          f: "jack",
          g: 0,
          h: 20
        }
      ],
      // 是否显示新增框
      addFormVisible: false
    };
  }
};
</script>

<style lang="less">
.question-container {
  .card-header {
    // 短的输入框
    .el-select,
    .el-input {
      width: 150px;
    }
    // 文本
    .el-form-item__label {
      font-weight: 700;
      padding-right: 30px;
      padding-left: 20px;
    }
    // 标题盒子
    .title-input {
      width: 388px;
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
