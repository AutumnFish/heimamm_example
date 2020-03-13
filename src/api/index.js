// 导入 axios 副本
import request from "./request";
// 暴露接口 用户列表
export function editInfo(data) {
  return request({
    url: "/admin/admin/editinfo",
    method: "post",
    data
  });
}