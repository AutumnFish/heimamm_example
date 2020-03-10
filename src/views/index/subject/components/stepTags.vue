<template>
  <div class="step-tag-container">
    <draggable
      v-model="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group>
        <el-tag
          :key="tag"
          v-for="(tag, index) in selfSteps"
          closable
          :disable-transitions="false"
          @close="handleClose(index)"
        >
          {{ tag }}
        </el-tag>
      </transition-group>
    </draggable>
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
  import draggable from 'vuedraggable'
  // 导入拖动组件
  export default {
    components:{
      draggable
    },
    props: {
      // 定义传入的数据
      value: {
        type: Array
      }
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
          this.$emit('input', this.selfSteps)
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
        this.selfSteps.splice(index, 1)
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
