<template>
  <el-dialog
    title="新增企业"
    class="enterprise-dialog"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form :model="addForm" :rules="rules" ref="addForm">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        label="企业简称"
        prop="short_name"
        :label-width="formLabelWidth"
      >
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="3"
          v-model="addForm.intro"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="企业备注"
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
// 导入 新增方法
import { enterpriseAdd } from "@/api/enterprise.js";
export default {
  name: "enterprise-add",
  data() {
    return {
      addForm: {},
      formLabelWidth: "80px",
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitAddForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          enterpriseAdd(this.addForm).then(res => {
            if (res.code === 200) {
              console.log(res)
              // 重新表单
              this.$refs.addForm.resetFields();
              this.$parent.addFormVisible = false;
              // 重新获取数据
              this.$parent.getList();
            }
          });
        } else {
          this.$message.warning("学科信息输入有误，请检查");
          return false;
        }
      });
    }
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
