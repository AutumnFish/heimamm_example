// 导入请求对象
import request from "./request.js";

// 暴露接口 学科列表
export function enterpriseList(params) {
  return request({
    url: "/admin/enterprise/find",
    method: "get",
    params
  });
}
// 暴露接口 添加学科
export function enterpriseAdd(data) {
  return request({
    url: "/admin/enterprise/add",
    method: "post",
    data
  });
}

// 暴露接口 学科状态
export function enterpriseStatus(data) {
  return request({
    url: "/admin/enterprise/setstatus",
    method: "post",
    data
  });
}

// 暴露接口 学科编辑
export function enterpriseEdit(data) {
  return request({
    url: "/admin/enterprise/edit",
    method: "post",
    data
  });
}

// 暴露接口 学科删除
export function enterpriseRemove(data) {
  return request({
    url: "/admin/enterprise/remove",
    method: "post",
    data
  });
}
