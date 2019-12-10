// 导入接口对象
import request from "./request.js";

// 暴露 登录接口
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}
// 暴露 用户信息方法
export function userInfo() {
  return request({
    url: "/info",
    method: "get"
  });
}

// 暴露短信接口
export function sendsms(data) {
  return request({
    url: "/sendsms",
    method: "post",
    data
  });
}

// 暴露注册接口
export function register(data) {
  return request({
    url: "/register",
    method: "post",
    data
  });
}

// 暴露退出接口
export function logout() {
  return request({
    url: "/logout",
    method: "get",
    
  });
}
