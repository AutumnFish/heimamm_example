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
        // 内部的绑定数据
        cityValue:this.value
      }
    },
   watch:{
     // 监测父组件的数据改变 并同步给自己
     value(){
      this.cityValue = this.value
     },
     // 内部数据改变时，通知父组件
     cityValue:{
       // 因为是复杂类型的数据 使用 deep的方式进行监听
       deep:true,
       handler(){
         this.$emit('change',this.cityValue)
       }
     }
   }
  }
</script>

<style></style>
