<template>
  <el-dialog
    title="新增企业"
    class="enterprise-dialog"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form :model="form">
      <el-form-item label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属领域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择领域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="3"
          v-model="form.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
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
.enterprise-dialog {
  .el-dialog {
    width: 603px;
  }
}
</style>
