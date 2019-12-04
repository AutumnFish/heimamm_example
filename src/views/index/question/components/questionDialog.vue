<template>
  <el-dialog
    title="新增试题"
    class="question-dialog"
    :visible.sync="$parent.addFormVisible"
    fullscreen
    @opened="opened"
  >
    <el-form :model="form" label-position="left">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择学科">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择阶段">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择企业">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择城市">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.radio">
          <el-radio label="单选">单选</el-radio>
          <el-radio label="多选">多选</el-radio>
          <el-radio label="简答">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.radio">
          <el-radio :label="3">简单</el-radio>
          <el-radio :label="6">一般</el-radio>
          <el-radio :label="9">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 试题标题 -->
      <el-form-item label="试题标题"> </el-form-item>
      <div ref="titleHeader" class="title-header"></div>
      <div ref="titleMain" class="title-main"></div>
      <!-- 单选 -->
      <el-form-item
        label="单选"
        class="single-item"
        :label-width="formLabelWidth"
        v-if="form.radio === '单选'"
      >
        <el-radio-group v-model="form.radio">
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>

          <div class="radio-box">
            <el-radio label="B">B</el-radio>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="C">C</el-radio>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="D">D</el-radio>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        label="多选"
        class="multiple-item"
        :label-width="formLabelWidth"
        v-else-if="form.radio === '多选'"
      >
        <el-checkbox-group v-model="form.radio">
          <div class="radio-box">
            <el-checkbox label="A">A</el-checkbox>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>

          <div class="radio-box">
            <el-checkbox label="B">B</el-checkbox>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-checkbox label="C">C</el-checkbox>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-checkbox label="D">D</el-checkbox>
            <el-input v-model="form.answer" placeholder=""></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="primary">上传缩略图</el-button>
              <el-button type="info" disabled>还未上传</el-button>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item v-else label="简答" class="answer-item">
        <el-input
          v-model="form.answer"
          type="textarea"
          rows="3"
          placeholder=""
        ></el-input>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item label="解析视频" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传video/mp4文件，且不超过2048kb
          </div>
        </el-upload>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析"> </el-form-item>
      <div ref="answerHeader" class="answer-header"></div>
      <div ref="answerMain" class="answer-main"></div>
      <!-- 简答 -->
      <el-form-item label="试题备注" class="answer-item">
        <el-input
          v-model="form.answer"
          type="textarea"
          rows="3"
          placeholder=""
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="$parent.addFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import Wangeditor from "wangeditor";
export default {
  name: "question-add",
  data() {
    return {
      form: {
        radio: "单选"
      },
      formLabelWidth: "80px",
      titleEditor: undefined,
      answerEditor: undefined
    };
  },

  methods: {
    opened() {
      if (!this.titleEditor) {
        this.titleEditor = new Wangeditor(
          this.$refs.titleHeader,
          this.$refs.titleMain
        );
        this.titleEditor.create();
      }
      if (!this.answerEditor) {
        this.titleEditor = new Wangeditor(
          this.$refs.answerHeader,
          this.$refs.answerMain
        );
        this.titleEditor.create();
      }
    },
    handleAvatarSuccess() {
      window.console.log("handleAvatarSuccess");
    },
    beforeAvatarUpload() {
      window.console.log("beforeAvatarUpload");
    }
  }
};
</script>

<style lang="less">
.question-dialog {
  .el-select,
  .el-input {
    width: 364px;
  }
  .el-form {
    display: block;
    width: 50%;
    margin: 0 auto;
  }
  .title-header,
  .answer-header {
    border: 1px solid #cecece;
  }
  .title-main,
  .answer-main {
    border: 1px solid #cecece;
    height: 100px;
  }
  .radio-box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .el-input {
      width: 476px;
      margin-right: 21px;
    }
    .el-button--primary {
      margin-right: 11px;
    }
    .el-checkbox {
      margin-right: 29px;
    }
  }
  .single-item,
  .multiple-item,
  .answer-item {
    margin-top: 59px;
  }
  .dialog-footer{
    text-align: center;
  }
}
</style>
