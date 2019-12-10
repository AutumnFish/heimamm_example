// 导入请求对象
import request from "./request.js";

// 暴露接口 题库列表
export function questionList(params) {
  return request({
    url: "/question/list",
    method: "get",
    params
  });
}
// 暴露接口 添加题库
export function questionAdd(data) {
  return request({
    url: "/question/add",
    method: "post",
    data
  });
}

// 暴露接口 题库状态
export function questionStatus(data) {
  return request({
    url: "/question/status",
    method: "post",
    data
  });
}

// 暴露接口 题库编辑
export function questionEdit(data) {
  return request({
    url: "/question/edit",
    method: "post",
    data
  });
}

// 暴露接口 题库删除
export function questionRemove(data) {
  return request({
    url: "/question/remove",
    method: "post",
    data
  });
}
