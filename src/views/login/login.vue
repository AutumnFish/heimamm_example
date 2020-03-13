<template>
  <div class="login-container">
    <!-- 左侧表单 -->
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">{{ isStudent ? '学员' : '管理员' }}登录</span>
      </div>
      <div class="switch-box">
        登录切换
        <el-switch v-model="isStudent"></el-switch>
      </div>
      <!-- 表单 -->
      <el-form :model="logForm" :rules="rules" ref="logForm" class="login-form">
        <el-form-item prop="name">
          <el-input
            placeholder="请输入手机/邮箱/用户名"
            v-model="logForm.name"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="logForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                v-model="logForm.code"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <!-- 学员验证码 -->
              <img
                class="captcha"
                @click="randomStudentCaptcha"
                :src="studentActions"
                alt=""
                v-if="isStudent"
              />
              <!-- 管理员验证码 -->
              <img
                class="captcha"
                @click="randomAdminCaptcha"
                :src="adminActions"
                alt=""
                v-else
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="rule-box" prop="checked">
          <el-checkbox v-model="logForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('logForm')">
            登录
          </el-button>
          <el-button
            v-show="isStudent"
            @click="$refs.registerDialog.registerFormVisible = true"
          >
            学员注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <div class="right">
      <img src="@/assets/login_bg.png" alt="" />
    </div>
    <registerDialog ref="registerDialog"></registerDialog>
  </div>
</template>

<script>
  // 导入登录接口
  import { login } from '@/api/login.js'
  // 验证逻辑的导入
  import { checkAgree, checkEmail } from '@/utils/validator.js'
  // 数据 获取的接口
  import { setToken } from '@/utils/token.js'
  // 导入注册组件
  import registerDialog from './components/registerDialog.vue'

  export default {
    name: 'login',
    data() {
      return {
        logForm: {
          name: '18888888888',
          password: '88888888',
          code: '1234',
          checked: false
        },
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
            { min: 6, max: 6, message: '短信验证码长度为6' }
          ],
          checked: [{ validator: checkAgree }]
        },
        // 是否是学生
        isStudent: false,

        // 管理员验证码
        adminActions: process.env.VUE_APP_BASEURL + 'admin/acount/makeCaptcha',
        // 学生验证码
        studentActions:
          process.env.VUE_APP_BASEURL +
          'index/acount/makecaptcha?type=user_login'
      }
    },
    components: {
      registerDialog
    },
    methods: {
      // 重新获取管理员登录验证码
      randomAdminCaptcha() {
        // 通过时间戳来重新获取验证码
        this.adminActions = `${process.env.VUE_APP_BASEURL}admin/acount/makeCaptcha?t=${Date.now()}`
      },
      // 重新获取学生验证码
      randomStudentCaptcha() {
        // 通过时间戳来重新获取验证码
        this.studentActions = `${process.env.VUE_APP_BASEURL}index/acount/makecaptcha?type=user_login&t=${Date.now()}`
      },

      // 用户登录
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 登录接口
            login(this.logForm).then(res => {
              console.log(res)
              // 判断状态
              if (res.code === 200) {
                // 提示用户
                this.$message.success('登录成功')
                // 保存token
                setToken(res.data.authorization)
                // 跳转到首页
                this.$router.push('/index')
              } else {
                this.$message.warning(res.message)
                // 刷新验证码
                this.randomLoginCaptcha()
              }
            })
          } else {
            this.$message.warning('请检查输入的内容')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="less">
  .login-container {
    height: 100%;
    background: linear-gradient(
      225deg,
      rgba(1, 198, 250, 1),
      rgba(20, 147, 250, 1)
    );
    display: flex;
    align-items: center;
    justify-content: space-around;
    .left {
      width: 478px;
      height: 550px;
      background: rgba(245, 245, 245, 1);
      padding: 48px;
      .title-box {
        display: flex;
        align-items: center;

        img {
          width: 22px;
          height: 17px;
          margin-right: 16px;
        }
        .title {
          font-size: 24px;
          margin-right: 14px;
        }
        .line {
          width: 1px;
          background-color: #c7c7c7;
          height: 27px;
          margin-right: 12px;
        }
        .sub-title {
          font-size: 22px;
        }
      }
      .login-form {
        margin-top: 29px;
        .captcha {
          display: block;
          width: 110px;
          height: 42px;
        }
      }

      .rule-box {
        .el-checkbox {
          display: flex;
          align-items: center;
          .el-checkbox__label {
            display: flex;
            align-items: center;
          }
        }
      }
      .btn-box {
        .el-button {
          width: 100%;
          margin-left: 0;
          margin-bottom: 28px;
        }
      }
    }
    .switch-box {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: gray;
      padding-top: 10px;
    }
  }
</style>
