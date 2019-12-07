// 导入请求对象
import request from "./request.js";

// 暴露接口 学科列表
export function subjectList(params) {
  return request({
    url: "/subject/list",
    method: "get",
    params
  });
}
// 暴露接口 添加学科
export function subjectAdd(data) {
  return request({
    url: "/subject/add",
    method: "post",
    data
  });
}

// 暴露接口 学科状态
export function subjectStatus(data) {
  return request({
    url: "/subject/status",
    method: "post",
    data
  });
}

// 暴露接口 学科编辑
export function subjectEdit(data) {
  return request({
    url: "/subject/edit",
    method: "post",
    data
  });
}

// 暴露接口 学科删除
export function subjectRemove(data) {
  return request({
    url: "/subject/remove",
    method: "post",
    data
  });
}
