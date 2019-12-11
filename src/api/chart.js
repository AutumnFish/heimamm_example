// 导入 axios 副本
import request from "./request";




// 暴露接口 顶部数据统计
export function chatTitle() {
  return request({
    url: "/data/title",
    method: "post",
  });
}
// 暴露接口 企业数据
export function enterpriseData() {
  return request({
    url: "/data/statistics",
    method: "post",
  });
}

