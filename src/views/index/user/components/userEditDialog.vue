<template>
  <el-dialog
    title="编辑用户"
    class="user-dialog"
    :visible.sync="$parent.editFormVisible"
  >
    <el-form :model="editForm" :rules="rules" ref="editForm" status-icon>
      <el-form-item
        label="用户名"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="editForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="所属角色"
        prop="role_id"
        :label-width="formLabelWidth"
      >
        <el-select v-model="editForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="所属状态"
        prop="status"
        :label-width="formLabelWidth"
      >
        <el-select v-model="editForm.status" placeholder="请选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="用户备注"
        prop="remark"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submiteditForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'user-add',
  data() {
    return {
      editForm: {},
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
    submiteditForm() {
      this.$message('你点击了确认按钮')
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
