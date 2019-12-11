<template>
  <div class="question-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <el-form
        :inline="true"
        ref="filterForm"
        :model="filterForm"
        class="demo-form-inline"
      >
        <el-form-item label="学科" prop="subject">
          <el-select v-model="filterForm.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="filterForm.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="region">
          <el-select v-model="filterForm.region" placeholder="请选择企业">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="filterForm.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="filterForm.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="filterForm.username" class="short-input"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="filterForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker v-model="filterForm.create_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" prop="title">
          <el-input v-model="filterForm.title" class="title-input"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="filterData">搜索</el-button>
          <el-button @click="clearFilter">清除</el-button>
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
      <el-table :data="questionTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科·阶段">
          <template slot-scope="scope">
            {{
              scope.row.subject_name +
                "·" +
                { 1: "初级", 2: "中级", 3: "高级" }[scope.row.step]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            {{ { 1: "单选", 2: "多选", 3: "简答" }[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{
              scope.row.status === 0 ? "启用" : "禁用"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <questionDialog />
    <!-- 编辑对话框 -->
    <questionEditDialog ref='questionEditDialog' />
  </div>
</template>

<script>
// 导入并使用
import questionDialog from "./components/questionDialog.vue";
// 编辑框
import questionEditDialog from "./components/questionEditDialog.vue";
// 导入题库接口
import { questionList, questionStatus } from "@/api/question.js";
// 导入企业接口
import { enterpriseList } from "@/api/enterprise.js";
// 导入学科接口
import { subjectList } from "@/api/subject.js";
export default {
  name: "question",
  // 注册组件
  components: {
    questionDialog,
    questionEditDialog
  },
  data() {
    return {
      filterForm: {},
      questionTable: [
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
      addFormVisible: false,
      // 页码
      page: 1,
      // 页容量
      limit: 5,
      // 总条数
      total: 0,
      // 企业数据
      enterpriseList: [],
      // 学科数据
      subjectList: [],
      // 是否显示修改框
      editFormVisible:false,
     
    };
  },
  methods: {
    // 进入编辑状态
    enterEdit(item){
      const editForm = JSON.parse(JSON.stringify(item));
      // 城市处理一下
      editForm.city = editForm.city.split(',')
      // 多选选项处理一下
      editForm.multiple_select_answer = editForm.multiple_select_answer.split(',')
      // 显示出来
      this.$refs.questionEditDialog.editForm = editForm
      this.editFormVisible = true;
    },
    // 清除筛选
    clearFilter(){
      // 清空筛选的数据
      this.$refs.filterForm.resetFields()
      // 重新获取数据
      this.filterData()
    },
    // 数据筛选
    filterData(){
      // 去第一页
      this.page = 1;
      this.getList()
    },
    // 修改状态
    changeStatus(item) {
      questionStatus({
        id: item.id
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success("状态修改成功");
          this.getList();
        }
      });
    },
    // 获取数据
    getList() {
      // 初始数据获取不携带任何数据
      questionList({
        page: this.page,
        limit: this.limit,
        ...this.filterForm
      }).then(res => {
        // 表格数据
        this.questionTable = res.data.items;
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
  created() {
    questionList({
      page: this.page,
      limit: this.limit
    }).then(res => {
      // 保存数据
      this.total = res.data.pagination.total;
      this.questionTable = res.data.items;
    });
    // 企业数据
    enterpriseList().then(res => {
      this.enterpriseList = res.data.items;
    });
    // 学科数据
    subjectList().then(res => {
      this.subjectList = res.data.items;
    });
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
