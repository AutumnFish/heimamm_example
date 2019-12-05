import axios from 'axios'

// 创建副本
const instance =  axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials:true
})

// 返回 创建的axios对象
export default instance;