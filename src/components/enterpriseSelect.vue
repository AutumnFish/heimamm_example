<template>
  <el-select v-model="selfValue" placeholder="请选择学科">
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import {enterpriseList} from '@/api/question.js'
  export default {
      props:['value'],
      data(){
          return {
              selfValue:this.value,
              list:[]
          }
      },
      watch:{
        value(){
          this.selfValue = this.value
        },
        selfValue(){
          this.$emit('input',this.selfValue)
        }
      },
      created(){
          enterpriseList().then(res=>{
              // console.log(res)
              this.list = res.data
          })
      }
  }
</script>

<style></style>
