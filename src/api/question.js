// 导入请求对象
import request from "./request.js";

// 暴露接口 题库列表
export function questionList(params) {
  return request({
    url: "/admin/question/find",
    method: "get",
    params
  });
}
// 暴露接口 添加题库
export function questionAdd(data) {
  return request({
    url: "/admin/question/add",
    method: "post",
    data
  });
}

// 暴露接口 题库状态
export function questionStatus(data) {
  return request({
    url: "/admin/question/setstatus",
    method: "post",
    data
  });
}

// 暴露接口 题库编辑
export function questionEdit(data) {
  return request({
    url: "/admin/question/edit",
    method: "post",
    data
  });
}

// 暴露接口 题库删除
export function questionRemove(data) {
  return request({
    url: "/admin/question/remove",
    method: "post",
    data
  });
}
// 获取企业列表
export function enterpriseList(){
  return request({
    url:'/admin/enterprise/short',
    method:'get'
  })
}
// 获取学科列表
export function subjectList(){
  return request({
    url:'/admin/subject/short',
    method:'get'
  })
}
// 获取学科阶段
export function stepList(params){
  return request({
    url:'/admin/step/short',
    method:'get',
    params
  })
}