<template>
  <el-dialog
    title="编辑试题"
    class="question-dialog"
    :visible.sync="$parent.editFormVisible"
    fullscreen
    @opened="opened"
  >
    <el-form :model="editForm" label-position="left" ref="editForm" :rules="rules">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="editForm.subject" placeholder="请选择学科">
          <el-option
            v-for="item in $parent.subjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="editForm.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="企业"
        prop="enterprise"
        :label-width="formLabelWidth"
      >
        <el-select v-model="editForm.enterprise" placeholder="请选择企业">
          <el-option
            v-for="item in $parent.enterpriseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <el-cascader
          v-model="editForm.city"
          :options="options"
          :props="{ value: 'label' }"
        ></el-cascader>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="editForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="难度"
        prop="difficulty"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="editForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 试题标题 -->
      <el-form-item label="试题标题" prop="title"></el-form-item>
      <div ref="titleHeader" class="title-header"></div>
      <div ref="titleMain" class="title-main"  ></div>
      <!-- 单选 -->
      <el-form-item
        label="单选"
        class="single-item"
        :label-width="formLabelWidth"
        v-if="editForm.type === 1"
        prop="single_select_answer"
      >
        <el-radio-group v-model="editForm.single_select_answer">
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <el-input
              v-model="editForm.select_options[0].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleASuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="B">B</el-radio>
            <el-input
              v-model="editForm.select_options[1].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleBSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="C">C</el-radio>
            <el-input
              v-model="editForm.select_options[2].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleCSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="D">D</el-radio>
            <el-input
              v-model="editForm.select_options[3].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleDSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        label="多选"
        class="multiple-item"
        :label-width="formLabelWidth"
        v-else-if="editForm.type === 2"
        prop="multiple_select_answer"
      >
        <el-checkbox-group v-model="editForm.multiple_select_answer">
          <!-- 选项A -->
          <div class="radio-box">
            <el-checkbox label="A">A</el-checkbox>
            <el-input
              v-model="editForm.select_options[0].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleASuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="radio-box">
            <el-checkbox label="B">B</el-checkbox>
            <el-input
              v-model="editForm.select_options[1].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleBSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="radio-box">
            <el-checkbox label="C">C</el-checkbox>
            <el-input
              v-model="editForm.select_options[2].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleCSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="radio-box">
            <el-checkbox label="D">D</el-checkbox>
            <el-input
              v-model="editForm.select_options[3].text"
              placeholder=""
            ></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleDSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item v-else label="简答" class="answer-item" prop="short_answer">
        <el-input
          v-model="editForm.short_answer"
          type="textarea"
          rows="3"
          placeholder=""
        ></el-input>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item
        label="解析视频"
        prop="video"
        class="video-item"
        :label-width="formLabelWidth"
      >
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传video/mp4文件，且不超过2048kb
          </div>
        </el-upload>
        <video class="video" controls :src="videoUrl"></video>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" prop="answer_analyze"> </el-form-item>
      <div ref="answerHeader" class="answer-header"></div>
      <div ref="answerMain" class="answer-main" ></div>
      <!-- 简答 -->
      <el-form-item label="试题备注" prop="remark" class="answer-item">
        <el-input
          v-model="editForm.remark"
          type="textarea"
          rows="3"
          placeholder=""
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入富文本
import Wangeditor from "wangeditor";
// 导入 省市区数据
import { provinceAndCityData } from "element-china-area-data";
// 导入数据接口
import { questionEdit } from "@/api/question.js";
export default {
  name: "question-edit",
  data() {
    return {
      editForm:{},
      rules: {
        title: { required: true, message: "标题不能为空" },
        type: { required: true, message: "类型不能为空" },
        subject: { required: true, message: "学科不能为空" },
        step: { required: true, message: "阶段不能为空" },
        enterprise: { required: true, message: "企业不能为空" },
        difficulty: { required: true, message: "难度不能为空" },
        single_select_answer: { required: true, message: "单选题答案不能为空" },
        multiple_select_answer: {
          required: true,
          message: "多选题答案不能为空"
        },
        video: { required: true, message: "视频不能为空" },
        remark: { required: true, message: "备注不能为空" },
        city: { required: true, message: "城市不能为空" },
        short_answer: { required: true, message: "简答题答案不能为空" },
        answer_analyze: { required: true, message: "答案解析不能为空" },
        select_options: { required: true, message: "选项不能为空" }
      },
      // 图片的上传地址
      uploadAction: process.env.VUE_APP_BASEURL + "/question/upload",
      formLabelWidth: "80px",
      // 级联选择器数据
      options: provinceAndCityData,
      titleEditor: undefined,
      answerEditor: undefined,
      // 图片预览地址
      imageAUrl: "",
      imageBUrl: "",
      imageCUrl: "",
      imageDUrl: "",
      // 视频预览地址
      videoUrl: ""
    };
  },

  methods: {
    // 提交数据
    submitForm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          questionEdit(this.editForm).then(res => {
            if(res.code===200){
            this.$refs.editForm.resetFields();
            // 富文本的清空需要自己来
            this.titleEditor.txt.html('')
            this.answerEditor.txt.html('')
            // 预览地址清空
            this.imageAUrl = ''
            this.imageBUrl = ''
            this.imageCUrl = ''
            this.imageDUrl = ''
            this.videoUrl = ''
            this.$parent.editFormVisible = false;
            this.$parent.getList();
            }
          });
        } else {
          this.$message.warning("题库信息输入有误，请检查");
          return false;
        }
      });
    },
    opened() {
      // 初始化富文本
      if (!this.titleEditor) {
        this.titleEditor = new Wangeditor(
          this.$refs.titleHeader,
          this.$refs.titleMain
        );
        // 绑定 change事件
        this.titleEditor.customConfig.onchange = html => {
          this.editForm.title = html;
        };
        this.titleEditor.create();
      }
      if (!this.answerEditor) {
        this.answerEditor = new Wangeditor(
          this.$refs.answerHeader,
          this.$refs.answerMain
        );
        // 绑定 change事件
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // console.log(html);
          this.editForm.answer_analyze = html;
        };
        this.answerEditor.create();
      }
      // 设置富文本的内穿欧能
      this.titleEditor.txt.html(this.editForm.title);
      this.answerEditor.txt.html(this.editForm.answer_analyze);
      // 设置视频地址
      this.imageAUrl = process.env.VUE_APP_BASEURL+"/"+this.editForm.select_options[0].image
      this.imageBUrl = process.env.VUE_APP_BASEURL+"/"+this.editForm.select_options[1].image
      this.imageCUrl = process.env.VUE_APP_BASEURL+"/"+this.editForm.select_options[2].image
      this.imageDUrl = process.env.VUE_APP_BASEURL+"/"+this.editForm.select_options[3].image
      this.videoUrl = process.env.VUE_APP_BASEURL+"/"+this.editForm.video
    },
    handleVideoSuccess(res, file) {
      console.log(res);
      this.videoUrl = URL.createObjectURL(file.raw);
      this.editForm.video = res.data.url;
    },
    handleASuccess(res, file) {
      this.imageAUrl = URL.createObjectURL(file.raw);
      this.editForm.select_options[0].image = res.data.url;
    },
    handleBSuccess(res, file) {
      this.imageBUrl = URL.createObjectURL(file.raw);
      this.editForm.select_options[1].image = res.data.url;
    },
    handleCSuccess(res, file) {
      this.imageCUrl = URL.createObjectURL(file.raw);
      this.editForm.select_options[2].image = res.data.url;
    },
    handleDSuccess(res, file) {
      this.imageDUrl = URL.createObjectURL(file.raw);
      this.editForm.select_options[3].image = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeVideoUpload(file) {
      console.log(file);
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传解析视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传解析视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  .dialog-footer {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .video {
    width: 360px;
  }
}
</style>
