
// 导入请求对象
import request from "./request.js";

// 暴露接口 学科阶段新增
export function stepAdd(data) {
  return request({
    url: "/admin/step/add",
    method: "post",
    data
  });
}
// 暴露接口 学科阶段编辑
export function stepEdit(data) {
  return request({
    url: "/admin/step/edit",
    method: "post",
    data
  });
}
// 暴露接口 学科阶段删除
export function stepRemove(data) {
  return request({
    url: "/admin/step/remove",
    method: "post",
    data
  });
}
// 暴露接口 学科阶段列表
export function stepFind(params) {
  return request({
    url: "/admin/step/find",
    method: "get",
    params
  });
}