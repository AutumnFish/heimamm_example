// 导入请求对象
import request from "./request.js";

// 暴露接口 学科列表
export function studentList(params) {
  return request({
    url: "/admin/user/find",
    method: "get",
    params
  });
}
export function studentStatus(params) {
  return request({
    url: "/admin/user/setstatus",
    method: "get",
    params
  });
}


