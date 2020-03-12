<template>
  <div class="step-tag-container">
    <el-tag
      :key="item.id"
      v-for="item in selfSteps"
      :disable-transitions="false"
    >
      {{ item.name }}
      <i @click="editStep(item)" class="el-icon-edit"></i>
      <i @click="removeStep(item)" class="el-icon-delete"></i>
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="addStep">
      +
    </el-button>
  </div>
</template>

<script>
  // 导入 新增阶段接口
  import { stepAdd, stepFind, stepEdit,stepRemove } from '@/api/step.js'
  export default {
    props: {
      // 定义传入的数据
      value: {
        type: Array
      },
      // 学科id，增删改查都需要使用
      subjectId: Number
    },
    data() {
      return {
        selfSteps: this.value,
        // 是否显示编辑输入框
        inputVisible: false,
        // 阶段编辑框双向绑定的数据
        inputValue: '',
        // 拖动的标记
        drag: false
      }
    },
    // 监测data的修改
    watch: {
      // 检测 父组件传入的 steps的值的大小
      value() {
        this.selfSteps = this.value
      },
      // 内部的数据改变 通知父组件
      selfSteps: {
        deep: true,
        handler() {
          console.log('selfSteps-change')
          this.$emit('input', this.selfSteps)
        }
      }
    },
    methods: {
      // 根据学科id获取学科
      getSteps() {
        // 重新获取数据
        stepFind({
          subjectId: this.subjectId
        }).then(res => {
          this.selfSteps = res.data.items
        })
      },
      // 新增内容
      addStep() {
        this.$prompt('请输入阶段名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(({ value }) => {
            if (value == '') {
              return this.$message.warning('学科名不能为空哦')
            }
            console.log(value)
            stepAdd({
              name: value,
              subjectId: this.subjectId
            }).then(res => {
              // console.log(res)
              if (res.code === 200) {
                this.$message.success('新增成功')
                // 重新获取数据
               this.getSteps()
              } else {
                this.$message.warning(res.message)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      },
      // 点击编辑
      editStep(item) {
        this.$prompt('请输入新的阶段名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.name
        })
          .then(({ value }) => {
            if (value == '') {
              return this.$message.warning('学科名不能为空哦')
            }
            stepEdit({
              name: value,
              id: item.id
            }).then(res => {
              if(res.code===200){
                this.$message.success('学科修改成功')
                this.getSteps()
              }else{
                this.$message.warning(res.message)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消编辑'
            })
          })
      },
      // 点击删除
      removeStep(item) {
        this.$confirm('此操作将永久删除该阶段, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 接口调用
            stepRemove({
              id:item.id
            }).then(res=>{
              console.log(res)
              if(res.code===200){
                this.$message.success("删除成功")
                this.getSteps()
              }else{
                this.$message.warning(res.message)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
</script>

<style lang="less">
  .step-tag-container {
    display: flex;
    align-items: center;
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    i {
      cursor: pointer;
      border-radius: 50%;
      padding: 5px;
      margin-left: 10px;
      transition: 0.5s;
      &:hover {
        background-color: #5a9cf8;
        color: white;
      }
    }
  }
</style>
