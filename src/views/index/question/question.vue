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
            <el-option label="学科1" value="1"></el-option>
            <el-option label="学科2" value="2"></el-option>
            <el-option label="学科3" value="3"></el-option>
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
            <el-option label="企业1" value="1"></el-option>
            <el-option label="企业2" value="2"></el-option>
            <el-option label="企业3" value="3"></el-option>
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
        <el-form-item label="日期" prop="create_date">
          <el-date-picker
            v-model="filterForm.create_date"
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
                '·' +
                { 1: '初级', 2: '中级', 3: '高级' }[scope.row.step]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            {{ { 1: '单选', 2: '多选', 3: '简答' }[scope.row.type] }}
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
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="editFormVisible=true">编辑</el-button>
            <el-button type="text" @click="checkFormVisible=true">审核</el-button>
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
    <questionDialog />
    <!-- 编辑对话框 -->
    <questionEditDialog ref="questionEditDialog" />
    <!-- 审核对话框 -->
    <questionCheckDialog></questionCheckDialog>
  </div>
</template>

<script>
// 导入并使用
import questionDialog from './components/questionDialog.vue';
// 编辑框
import questionEditDialog from './components/questionEditDialog.vue';
// 审核框
import questionCheckDialog from './components/questionCheck.vue';

export default {
  name: 'question',
  // 注册组件
  components: {
    questionDialog,
    questionEditDialog,
    questionCheckDialog
  },
  data() {
    return {
      filterForm: {},
      questionTable: [
        {
          id: 91,
          title: '<p>dom与jQuery对象的说法正确的是？</p>',
          subject: 97,
          step: 1,
          enterprise: 50,
          city: '440000,440300,440306',
          type: 1,
          difficulty: 1,
          status: 1,
          reads: 0,
          user_id: 3,
          single_select_answer: 'A',
          multiple_select_answer: '',
          short_answer: null,
          video: '',
          remark: 'jQuery对象是dom对象之间的关系',
          answer_analyze:
            '<p>jQuery对象是dom对象的集合可以使用</p><p>$(dom)将dom对象转换为jQuery对象。使用jquery[序号]获取到dom对象</p><p><br></p>',
          create_time: '2020-01-14 14:57:45',
          update_time: '2020-01-14 14:57:45',
          is_del: 0,
          username: 'phper_leo',
          subject_name: '前段',
          enterprise_name: '黑马',
          select_options: [
            {
              id: 781,
              question_id: 91,
              label: 'A',
              text: '$(dom)形式可以将dom对象转换为jQuery对象',
              image: 'upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg'
            },
            {
              id: 782,
              question_id: 91,
              label: 'B',
              text: 'dom与jQuery对象没有关系',
              image: 'upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg'
            },
            {
              id: 783,
              question_id: 91,
              label: 'C',
              text: 'dom对象可以直接调用jQuery下的方法',
              image: 'upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg'
            },
            {
              id: 784,
              question_id: 91,
              label: 'D',
              text: 'jQuery对象可以直接调用dom对象下的方法',
              image: 'upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg'
            }
          ]
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
      editFormVisible: false,
      // 是否显示审核框
      checkFormVisible:false
    };
  },
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
