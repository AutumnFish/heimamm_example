<template>
  <div class="step-tag-container">
    <el-tag
      :key="tag"
      v-for="(tag, index) in selfSteps"
      closable
      :disable-transitions="false"
      @close="handleClose(index)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="inputVisible = false"
    ></el-input>
    <el-button
      v-else
      class="button-new-tag"
      size="small"
      @click="inputVisible = true"
    >
      + New Tag
    </el-button>
  </div>
</template>

<script>
  export default {
    props:{
        // 定义传入的数据
        value:{
            type:Array
        }
    },
    data() {
      return {
        selfSteps:this.value, 
        // 是否显示编辑输入框
        inputVisible: false,
        // 阶段编辑框双向绑定的数据
        inputValue: ''
      }
    },
    // 监测data的修改
    watch:{
        // 检测 父组件传入的 steps的值的大小
        steps(){
            this.selfSteps = this.value
        },
        // 内部的数据改变 通知父组件
        selfSteps:{
            deep:true,
            handler(){
                this.$emit('change',this.selfSteps)
            }
        }
    },
    methods: {
      // 新增内容
      handleInputConfirm() {
        this.selfSteps.push(this.inputValue)
        // 清空输入的内容
        this.inputValue = ''
        this.inputVisible = false
      },
      // 点击删除
      handleClose(index) {
        this.steps.splice(index, 1)
      }
    }
  }
</script>

<style lang="less">
  .step-tag-container {
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
  }
</style>
