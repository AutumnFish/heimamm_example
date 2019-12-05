// 导入接口对象
import request from './request.js'


// 暴露 登录接口
export function login(data){
    return request({
        url:"/login",
        method:"post",
        data
    })
}

