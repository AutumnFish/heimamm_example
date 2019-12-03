<template>
  <div class="login-container">
    <!-- 左侧表单 -->
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <el-form-item prop="name">
          <el-input
            placeholder="请输入手机号"
            v-model="ruleForm.name"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            placeholder="请输入密码"
            v-model="ruleForm.name"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-row>
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                v-model="ruleForm.name"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img class="captcha" src="@/assets/login_captcha.png" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="rule-box">
          <el-checkbox v-model="checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <div class="right">
      <img src="@/assets/login_bg.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {},
      rules: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          window.alert("submit!");
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
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
    .btn-box{
      .el-button{
        width: 100%;
        margin-left: 0;
        margin-bottom:28px ;
      }
    }
  }
}
</style>
