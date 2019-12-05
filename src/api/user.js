// 导入 axios 副本
import request from './request'
// 导入token获取函数
import {getToken} from '@/utils/token.js'

// 暴露 用户信息方法
export function userInfo(){
    return request({
        url:"/user/info",
        method:"get",
        headers:{
            token:getToken()
        }
    })
}