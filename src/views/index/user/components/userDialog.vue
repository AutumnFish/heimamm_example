<template>
  <el-dialog
    title="新增用户"
    class="user-dialog"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属角色" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择角色">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属状态" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="$parent.addFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "subject-add",
  data() {
    return {
      form: {},
      formLabelWidth: "80px"
    };
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
