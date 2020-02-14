// 导入Vue
import Vue from 'vue'
// 导入Moment.js
import moment from 'moment'

// 注册全局过滤器
// 日期格式化
Vue.filter('formatTime',v=>{
    return moment(v).format("YYYY年MM月DD日")
})

// 移除多余内容
Vue.filter('cutSTR',v=>{
    return v.length<=15?v:v.splice(0,15)+'.....'
})