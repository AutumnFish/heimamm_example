// 导入Vue
import Vue from 'vue'
// 导入Moment.js
import moment from 'moment'

// 注册全局过滤器
Vue.filter('formatTime',v=>{
    return moment(v).format("YYYY年MM月DD日")
})