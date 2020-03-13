<template>
  <!-- 注册对话框 -->
  <el-dialog
    title="个人信息修改"
    class="user-dialog"
    :visible.sync="userDialogVisiable"
    @closed="closedRegDialog"
    @open="open"
    width="600px"
  >
    <el-form :model="userForm" ref="userForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="avatarAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="img"
          :headers="headers"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-model="userForm.avatar" type="hidden"></el-input>
      </el-form-item>
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input v-model="userForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="userForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="userForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="userDialogVisiable = false">取 消</el-button>
      <el-button type="primary" @click="submituserForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { editInfo } from '@/api/index.js'
  // 验证逻辑的导入
  // import { checkEmail } from '@/utils/validator.js'
  // 导入头像上传地址
  import { adminUploadURL } from '@/utils/config.js'
  // 获取token
  import { getToken } from '@/utils/token.js'
  // // 导入用户信息获取接口
  import { userInfo } from '@/api/login.js'
  export default {
    data() {
      return {
        // 注册验证码
        regActions: process.env.VUE_APP_BASEURL + '/captcha?type=sendsms',
        // 头像上传地址
        avatarAction: adminUploadURL,
        formLabelWidth: '80px',
        userForm: {
          username: '',
          email: '',
          phone: '',
          password: '',
          avatar: ''
        },
        // 本地预览地址
        imageUrl: '',
        // 是否显示用户信息修改框
        userDialogVisiable: false,
        // 倒计时事件
        delayTime: 0,
        headers: {
          authorization: getToken()
        }
      }
    },
    methods: {
      // 打开对话框
      open() {
        for (const key in this.userForm) {
          this.userForm[key] = this.$store.state.userInfo[key]
        }
        if (this.userForm.avatar) {
          this.imageUrl = this.userForm.avatar
        }
      },
      // 关闭注册框
      closedRegDialog() {
        this.$refs.userForm.resetFields()
        this.userForm.imgCode = ''
      },
      // 用户信息修改
      submituserForm() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            // 修改接口
            editInfo({
              username: this.userForm.username,
              email: this.userForm.email,
              phone: this.userForm.phone,
              avatar: this.userForm.avatar
            }).then(res => {
              // console.log(res);
              if (res.code === 200) {
                // 头像也要清空哦
                this.imageUrl = ''
                // 关闭弹框
                this.userDialogVisiable = false
                // 提示用户
                this.$message.success('个人信息修改成功')
                userInfo().then(res => {
                  res.data.avatar =
                    process.env.VUE_APP_BASEURL + res.data.avatar
                  // 保存用户信息
                  this.$store.commit('SETINFO', res.data)
                })
              }
            })
          } else {
            this.$message.warning('请检查输入的内容')
            return false
          }
        })
      },
      handleAvatarSuccess(res, file) {
        // 生成本地的预览
        this.imageUrl = URL.createObjectURL(file.raw)
        // 准备提交的数据
        this.userForm.avatar = res.data.filePath
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 8

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG PNG GIF 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 8MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style lang="less">
  .user-dialog {
    .el-dialog {
    }
    .el-dialog__header {
      background: linear-gradient(
        right,
        rgba(1, 198, 250, 1),
        rgba(20, 147, 250, 1)
      );
      text-align: center;
      .el-dialog__title {
        color: white;
      }
    }
    .captcha {
      width: 100%;
    }
    .avatar-uploader {
      display: flex;
      justify-content: center;
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
  }
</style>
