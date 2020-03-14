
// 导入请求对象
import request from "./request.js";

// 暴露接口 学科阶段新增
export function studentLogin(data) {
  return request({
    url: "/index/acount/login",
    method: "post",
    data
  });
}
// 暴露接口 学科阶段新增
export function studentInfo() {
  return request({
    url: "/index/user/getinfo",
    method: "post",
  });
}


// 获取短信验证码
export function studentSms(data) {
  return request({
    url: "/index/acount/sendsms",
    method: "post",
    data
  });
}
// 获取注册接口
export function studentRegister(data) {
  return request({
    url: "/index/acount/register",
    method: "post",
    data
  });
}