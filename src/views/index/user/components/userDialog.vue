<template>
  <el-dialog title="新增用户" class="user-dialog" :visible.sync="$parent.addFormVisible">
    <el-form :model="addForm" :rules="rules" ref="addForm" status-icon>
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="addForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="addForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model="addForm.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAddForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入数据接口
import { userAdd } from '@/api/user.js';
// 导入验证函数
import { checkMobile, checkEmail } from '@/utils/validator.js';
export default {
  name: 'user-add',
  data() {
    return {
      addForm: {},
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }, { validator: checkEmail }],
        phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { validator: checkMobile }],
        role_id: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
        password: [{ mix: 6, max: 12, message: '密码的长度为6到12', trigger: 'blur' }]
      },
      formLabelWidth: '80px'
    };
  },
  methods: {
    submitAddForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          userAdd(this.addForm).then(res => {
            if (res.code === 200) {
              this.$message.success('用户新增成功')
              // 重新表单
              this.$refs.addForm.resetFields();
              this.$parent.addFormVisible = false;
              this.$message.success('用户新增成功');
              // 重新获取数据
              this.$parent.getList();
            }else if(res.code===201){
              this.$message.warning(res.message)
            }
          });
        } else {
          this.$message.warning('用户信息输入有误，请检查');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.user-dialog {
  .el-dialog {
    width: 603px;
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
