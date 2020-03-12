<template>
  <el-dialog
    title="修改学科"
    class="subject-dialog"
    :visible.sync="$parent.editFormVisible"
  >
    <el-form :model="editForm" ref="editForm" :rules="rules">
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="学科简称"
        prop="shortName"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editForm.shortName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="3"
          v-model="editForm.intro"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="学科状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model="editForm.status" placeholder="请选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
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
// 导入 新增方法
import { subjectEdit } from "@/api/subject.js";
export default {
  name: "subject-edit",
  data() {
    return {
      // 编辑用表单
      editForm:{},
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },

  methods: {
    submiteditForm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          subjectEdit(this.editForm).then(res => {
            // console.log(res)
            if (res.code === 200) {
              // 重新表单
              this.$refs.editForm.resetFields();
              this.$parent.editFormVisible = false;
              this.$message.success('数据修改成功');
              // 重新获取数据
              this.$parent.getList();
            }else{
              this.$message.warning(res.message)
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
.subject-dialog {
  .el-dialog {
    width: 603px;
  }
}
</style>
