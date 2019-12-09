<template>
  <el-dialog
    title="新增学科"
    class="subject-dialog"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          rows="3"
          v-model="addForm.intro"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
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
import { subjectAdd } from "@/api/subject.js";
export default {
  name: "subject-add",
  data() {
    return {
      addForm: {
        rid:'',
        name:'',
        short_name:'',
        intro:"",
        remark:""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    submitAddForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          subjectAdd(this.addForm).then(res=>{
            // console.log(res)
            if(res.code===200){
              // 重新表单
              this.$refs.addForm.resetFields()
              this.$parent.addFormVisible = false;
              // 重新获取数据
              this.$parent.getList();
            }
          })
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
