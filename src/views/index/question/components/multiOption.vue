<template>
  <div class="radio-box">
    <el-checkbox :label="label">{{label}}</el-checkbox>
    <el-input v-model="selfValue" placeholder=""></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadAction"
      :show-file-list="false"
      :on-success="handleASuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="previewURL" :src="previewURL" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
      value: String,
      image: String
    },
    data() {
      return {
        // 图片的上传地址
        uploadAction: process.env.VUE_APP_BASEURL + '/question/upload',
        // 图片预览地址
        previewURL: '',
        // 内部的value
        selfValue:'',
        // 内部的图片地址
        selfImage:''
      }
    },
    // 侦听器检测数据的改变
    watch:{
        // 通知父组件 value改变了
        selfValue(){
            this.$emit('input',this.selfValue)
        },
        // 通知父组件 图片地址改变了
        selfImage(){
            this.$emit('update:image',this.selfImage)
        }
    },
    methods: {
      // 上传成功
      handleASuccess(res, file) {
        this.previewURL = URL.createObjectURL(file.raw)
        this.selfImage = res.data.url
      },
      // 上传之前的校验
      beforeAvatarUpload(file) {
        const isJPG =
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 或 GIF 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style lang="less">
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
</style>
