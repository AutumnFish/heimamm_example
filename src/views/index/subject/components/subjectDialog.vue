<template>
  <el-dialog
    title="学科编号"
    class="subject-dialog"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form :model="form">
      <el-form-item label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="3"
          v-model="form.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
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
.subject-dialog {
  .el-dialog {
    width: 603px;
  }
 
}
</style>
