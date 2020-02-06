<template>
  <el-dialog
    title="新增用户"
    class="user-dialog"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form :model="addForm" :rules="rules" ref="addForm" status-icon>
      <el-form-item
        label="用户名"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="addForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="所属角色"
        prop="role_id"
        :label-width="formLabelWidth"
      >
        <el-select v-model="addForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="所属状态"
        prop="status"
        :label-width="formLabelWidth"
      >
        <el-select v-model="addForm.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="用户备注"
        prop="remark"
        :label-width="formLabelWidth"
      >
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
export default {
  name: 'user-add',
  data() {
    return {
      addForm: {},
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        role_id: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
      },
      formLabelWidth: '80px'
    };
  },
  methods: {
    submitAddForm() {
     this.$message("你点击了新增") 
    }
  }
};
</script>

<style lang="less">
.user-dialog {
  .el-dialog {
    width: 603px;
  }
}
</style>
