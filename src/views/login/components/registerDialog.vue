<template>
  <!-- 注册对话框 -->
  <el-dialog
    title="用户注册"
    class="register-dialog"
    :visible.sync="registerFormVisible"
    @closed="closedRegDialog"
    width="600px"
  >
    <el-form :model="regForm" :rules="rules" ref="regForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="avatarAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="img"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-model="regForm.avatar" type="hidden"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="regForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="regForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="regForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="regForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="regForm.imgCode"
              autocomplete="off"
              @keyup.enter.native="submitRegForm"
            ></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img
              class="captcha"
              :src="regActions"
              @click="randomRegisterCaptcha"
              alt=""
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="regForm.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getPhoneCode" :disabled="delayTime !== 0">
              {{
                delayTime == 0 ? '获取用户验证码' : `${delayTime}S后再次获取`
              }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="registerFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitRegForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // 导入登录接口
  import { studentRegister, studentSms } from '@/api/student.js'
  // 验证逻辑的导入
  import { checkAgree, checkEmail } from '@/utils/validator.js'

  export default {
    data() {
      return {
        // 注册验证码
        regActions: process.env.VUE_APP_BASEURL + '/index/acount/makecaptcha?type=send_sms',
        // 头像上传地址
        avatarAction: process.env.VUE_APP_BASEURL+'/index/acount/uploadimg',
        formLabelWidth: '80px',
        regForm: {
          phone: '',
          username: '',
          rcode: '',
          avatar: '',
          password: '',
          // 图形验证码
          imgCode: ''
        },
        // 校验规则
        rules: {
          name: [{ required: true, message: '用户名不能为空' }],
          email: [
            { required: true, message: '邮箱号不能为空' },
            { validator: checkEmail }
          ],
          username: [{ required: true, message: '用户名不能为空' }],
          avatar: [
            { required: true, message: '头像不能为空', trigger: 'change' }
          ],
          password: [
            { required: true, message: '密码不能为空' },
            { min: 4, max: 12, message: '密码长度为4~12个字符' }
          ],
          code: [
            { required: true, message: '验证码不能为空' },
            { min: 4, max: 4, message: '验证码长度为4' }
          ],
          rcode: [
            { required: true, message: '短信验证码不能为空' },
            { min: 4, max: 4, message: '短信验证码长度为4' }
          ],
          checked: [{ validator: checkAgree }]
        },
        // 本地预览地址
        imageUrl: '',
        // 是否显示注册框
        registerFormVisible: false,
        // 倒计时事件
        delayTime: 0
      }
    },
    methods: {
      // 关闭注册框
      closedRegDialog() {
        this.$refs.regForm.resetFields()
        this.regForm.imgCode = ''
      },
      // 用户注册
      submitRegForm() {
        this.$refs.regForm.validate(valid => {
          if (valid) {
            // 登录接口
            studentRegister(this.regForm).then(res => {
              // console.log(res);
              if (res.code === 200) {
                // 头像也要清空哦
                this.imageUrl = ''
                // 关闭弹框
                this.registerFormVisible = false
                // 提示用户
                this.$message.success('注册成功')
              }else{
                this.$message.warning(res.message)
              }
            })
          } else {
            this.$message.warning('请检查输入的内容')
            return false
          }
        })
      },
      // 获取手机验证码
      getPhoneCode() {
        // 验证码判断
        if (this.regForm.imgCode.length != 4) {
          return this.$message.warning('验证码错误,请检查')
        }
        // 手机号判断
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (!reg.test(this.regForm.phone)) {
          return this.$message.warning('手机号不对哦，请检查')
        }
        if (this.delayTime === 0) {
          this.delayTime = 60
          let interId = setInterval(() => {
            this.delayTime--
            if (this.delayTime == 0) {
              clearInterval(interId)
            }
          }, 100)
          // 调用短信接口
          studentSms({
            code: this.regForm.imgCode,
            phone: this.regForm.phone
          }).then(res => {
            // console.log(res)
            if(res.code==200){
              this.$message.info('短信验证码是:' + res.data.captcha)
            }else{
              this.$message.warning(res.message)
            }
          })
        }
      },
      // 重新获取注册验证码
      randomRegisterCaptcha() {
        // 通过时间戳来重新获取验证码
        this.regActions = `${
          process.env.VUE_APP_BASEURL
        }/index/acount/makecaptcha?type=send_sms&t=${Date.now()}`
      },
      handleAvatarSuccess(res, file) {
        // 生成本地的预览
        this.imageUrl = URL.createObjectURL(file.raw)
        // 准备提交的数据
        this.regForm.avatar = res.data.filePath
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG PNG GIF 格式!')
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
  .register-dialog {
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
