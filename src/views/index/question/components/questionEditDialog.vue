<template>
  <el-dialog
    title="编辑试题"
    class="question-dialog"
    :visible.sync="$parent.editFormVisible"
    fullscreen
  >
    <el-form
      :model="editForm"
      label-position="left"
      ref="editForm"
      :rules="rules"
    >
      <el-form-item label="学科" prop="subjectId" :label-width="formLabelWidth">
        <subjectSelect v-model="editForm.subjectId"></subjectSelect>
      </el-form-item>
      <el-form-item label="阶段" prop="stepId" :label-width="formLabelWidth">
        <el-select v-model="editForm.stepId" placeholder="请选择阶段">
          <el-option
            v-for="(item, index) in currentStep"
            :label="item.name"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="企业"
        prop="enterpriseId"
        :label-width="formLabelWidth"
      >
        <enterpriseSelect v-model="editForm.enterpriseId"></enterpriseSelect>
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
      <el-form-item label="标题" prop="title"    :label-width="formLabelWidth">
        <el-input v-model="editForm.title"></el-input>
      </el-form-item>

      <!-- 单选 -->
      <el-form-item
        label="单选"
        class="single-item"
        :label-width="formLabelWidth"
        v-if="editForm.type == '1'"
        prop="singleSelectAnswer"
      >
        <el-radio-group v-model="editForm.singleSelectAnswer">
          <singleOption
            v-for="(item, index) in editForm.option"
            :key="index"
            v-model="item.text"
            :image.sync="item.image"
            :label="item.label"
          ></singleOption>
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        label="多选"
        class="multiple-item"
        :label-width="formLabelWidth"
        v-else-if="editForm.type == '2'"
        prop="multipleSelectAnswer"
      >
        <el-checkbox-group v-model="editForm.multipleSelectAnswer">
          <!-- 多选选项 -->
          <multiOption
            v-for="item in editForm.option"
            :key="item.label"
            v-model="item.text"
            :image.sync="item.image"
            :label="item.label"
          ></multiOption>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item v-else label="简答" class="answer-item" prop="short_answer">
        <el-input
          v-model="editForm.shortAnswer"
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
      <el-form-item label="答案解析" prop="answerAnalyze"></el-form-item>
      <quill-editor
        v-model="editForm.answerAnalyze"
        ref="myQuillEditor"
        @blur="onEditorBlur"
      ></quill-editor>

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
  // 导入数据接口
  import { questionEdit, stepList } from '@/api/question.js'
  // 导入 单选组件
  import singleOption from './singleOption.vue'
  // 导入 多选组件
  import multiOption from './multiOption.vue'
  // 导入富文本编辑器的样式
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: 'question-edit',
    components: {
      singleOption,
      multiOption,
      quillEditor
    },
    data() {
      return {
        editForm: {},
        rules: {
          title: { required: true, message: '标题不能为空' },
          type: { required: true, message: '类型不能为空' },
          subjectId: { required: true, message: '学科不能为空' },
          stepId: { required: true, message: '阶段不能为空' },
          enterpriseId: { required: true, message: '企业不能为空' },
          difficulty: { required: true, message: '难度不能为空' }
        },
        currentStep: [],
        // 图片的上传地址
        uploadAction:
          process.env.VUE_APP_BASEURL + '/admin/question/uploadFile',
        formLabelWidth: '80px',
        // 图片预览地址
        // 视频预览地址
        videoUrl: ''
      }
    },
    watch: {
      'editForm.subjectId'(val) {
        stepList({
          subjectId: val
        }).then(res => {
          // console.log(res)
          this.currentStep = res.data
        })
      },
      // 如果从简答变成了单选或者多选 需要判断选项是否存在
      'editForm.type'() {
        // 如果没有选项 就进行特殊处理
        if (this.editForm.type != 3) {
          // 如果没有选项属性  就为他设置选项属性
          this.editForm.option = this.editForm.option||[]
          // 如果有选项属性，但是长度不对 重新赋值
          if (this.editForm.option.length != 4) {
            this.editForm.option = [
              {
                label: 'A',
                image: '',
                text: ''
              },
              {
                label: 'B',
                image: '',
                text: ''
              },
              {
                label: 'C',
                image: '',
                text: ''
              },
              {
                label: 'D',
                image: '',
                text: ''
              }
            ]
          }
        }
      }
    },
    methods: {
      // 富文本编辑器失去焦点
      onEditorBlur() {
        if (this.editForm.answerAnalyze != '') {
          this.$refs.editForm.validateField('answerAnalyze')
        }
      },
      // 提交数据
      submitForm() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            questionEdit(this.editForm).then(res => {
              if (res.code === 200) {
                this.$refs.editForm.resetFields()
                // 预览地址清空
                this.imageAUrl = ''
                this.imageBUrl = ''
                this.imageCUrl = ''
                this.imageDUrl = ''
                this.videoUrl = ''
                this.$parent.editFormVisible = false
                this.$message.success('数据修改成功')
                this.$parent.getList()
              } else {
                this.$message.warning(res.message)
              }
            })
          } else {
            this.$message.warning('题库信息输入有误，请检查')
            return false
          }
        })
      },

      handleVideoSuccess(res, file) {
        console.log(res)
        this.videoUrl = URL.createObjectURL(file.raw)
        this.editForm.video = res.data.url
      },
      beforeVideoUpload(file) {
        console.log(file)
        const isJPG = file.type === 'video/mp4'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传解析视频只能是 MP4 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传解析视频大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
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
