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
      <el-form :model="logForm" :rules="rules" ref="logForm" class="login-form">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model="logForm.phone"
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
              <img class="captcha" @click="randomLoginCaptcha"  :src="actions" alt="" />
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
          <el-button type="primary" @click="submitForm('logForm')"
            >登录</el-button
          >
          <el-button @click="registerFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <div class="right">
      <img src="@/assets/login_bg.png" alt="" />
    </div>
    <!-- 注册对话框 -->
    <el-dialog
      title="用户注册"
      class="register-dialog"
      :visible.sync="registerFormVisible"
    >
      <el-form :model="regForm">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" offset="1">
              <img class="captcha" src="@/assets/login_captcha.png" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" offset="1">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 验证逻辑的导入
import { checkMobile } from "./validator.js";
export default {
  name: "login",
  data() {
    return {
      logForm: {
        phone:"18888888888",
        password:"88888888",
        code:"1234"
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空" },
          { validator: checkMobile }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min:6,max:12,message:"密码长度为6~12个字符" }
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { min:4,max:4, message:"验证码长度为4" }
        ]
      },
      registerFormVisible: false,
      formLabelWidth: "60px",
      regForm: {},
      imageUrl: "",
      checked: false,
      // 验证码
      actions:process.env.VUE_APP_BASEURL +"/captcha?type=login"
    };
  },
  methods: {
    // 重新获取注册验证码
    randomLoginCaptcha(){
      // 通过时间戳来重新获取验证码
      this.actions = `${process.env.VUE_APP_BASEURL}/captcha?type=login&t=${Date.now()}`
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("123")
        } else {
          this.$message.warning("请检查输入的内容")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
    .btn-box {
      .el-button {
        width: 100%;
        margin-left: 0;
        margin-bottom: 28px;
      }
    }
  }
  .register-dialog {
    .el-dialog {
      width: 600px;
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
}
</style>
