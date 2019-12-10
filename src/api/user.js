// 导入 axios 副本
import request from "./request";




// 暴露接口 用户列表
export function userList(params) {
  return request({
    url: "/user/list",
    method: "get",
    params
  });
}
// 暴露接口 添加用户
export function userAdd(data) {
  return request({
    url: "/user/add",
    method: "post",
    data
  });
}

// 暴露接口 用户状态
export function userStatus(data) {
  return request({
    url: "/user/status",
    method: "post",
    data
  });
}

// 暴露接口 用户编辑
export function userEdit(data) {
  return request({
    url: "/user/edit",
    method: "post",
    data
  });
}

// 暴露接口 用户删除
export function userRemove(data) {
  return request({
    url: "/user/remove",
    method: "post",
    data
  });
}
