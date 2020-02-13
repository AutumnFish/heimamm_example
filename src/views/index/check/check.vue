<template>
  <div class="exam-container">
    <el-card>
      <div>
        <div class="title-box">
          <span>【试题审核】</span>
          <el-divider></el-divider>
          <el-row class="exam-row">
            <el-col :span="6"> <span class="primary-text">【编号】:</span>JX000002 </el-col>
            <el-col :span="6"> <span class="primary-text">【学科】:</span>前端与移动开发 </el-col>
            <el-col :span="6"> <span class="primary-text">【阶段】:</span>Ajax </el-col>
            <el-col :span="6"> <span class="primary-text">【难度】:</span>一般 </el-col>
          </el-row>
          <el-row class="exam-row">
            <el-col :span="6"> <span class="primary-text">【题型】:</span>单选 </el-col>
            <el-col :span="6"> <span class="primary-text">【企业】:</span>阿里巴巴 </el-col>
            <el-col :span="6"> <span class="primary-text">【城市】:</span>深圳 </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
        <span>【试题内容】</span>
        <div class="content-box">
          <p class="content">
            <span class="primary-text">单选题:</span>
            浏览器缓存localStorage中,哪个方法可以清除所有保存的数据?
          </p>
          <el-radio-group v-model="radio" class="option-box">
            <el-radio label="A">A: removeItem()</el-radio>
            <el-radio label="B">B: clear()</el-radio>
            <el-radio label="C">C: setItem()</el-radio>
            <el-radio label="D">D: getItem()</el-radio>
          </el-radio-group>
        </div>
        <el-divider></el-divider>
        <div class="answer-box">
          <span>【参考答案】: </span> B
          <el-button type="warning">视频答案解析</el-button>
        </div>
        <el-divider></el-divider>
        <div class="analysis-box">
          <span>【答案解析】: </span>
          clear会全部清除,removeItem会移除指定的选项，setItem是设置内容,getItem是获取指定的内容
        </div>
        <el-divider></el-divider>
        <div class="remark-box">
          <span>【题目备注】: </span>
          论英语的重要性
        </div>
        <el-divider></el-divider>
        <div class="submit-box">
          <el-button type="primary">审核通过</el-button>          
          <el-button type="danger">审核不通过</el-button>          
          <el-button type="warning">审核日志</el-button>          
          <el-button type="success">下一题</el-button>          
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "exam",
  data() {
    return {
      radio: ""
    };
  }
};
</script>

<style lang="less">
.exam-container {
  .primary-text {
    color: #1989fa;
  }
  .content {
    margin-top: 30px;
  }
  .el-radio {
    display: block;
    margin-top: 20px;
    padding-left: 70px;
    .el-radio__label {
      font-size: 20px;
    }
  }
  .analysis-box,.remark-box{
    margin-bottom: 20px;
  }
  .submit-box{
    text-align: center;
    margin-top: 50px;
  }
}
.exam-row {
  margin-bottom: 20px;
}
</style>
