<template>
  <el-cascader
    v-model="cityValue"
    :options="options"
    :props="{ value: 'label' }"
  ></el-cascader>
</template>

<script>
  // 导入 省市区数据
  import { provinceAndCityData } from 'element-china-area-data'
  export default {
    props:{
      value:{
        type:Array,
      }
    },
    data() {
      return {
        // 级联选择器的数据
        options: provinceAndCityData,
      }
    },
    computed:{
      cityValue:{
        get(){
          return this.value
        },
        set(val){
          this.$emit('change',val)
        }
      }
    },
  }
</script>

<style></style>
