import axios from "axios";
// 携带token
import { getToken, removeToken } from "@/utils/token.js";
// 导入路由
import router from "@/router/index.js";
// 导入Element-ui的弹框
import { Message } from "element-ui";

// 创建副本
const instance = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_BASEURL,
  // 跨域携带cookie
  withCredentials: true
});

// 拦截器
// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // 设置token
    if (getToken()) {
      console.log('有token')
      // 如果有token 就携带token
      config.headers.token = getToken();
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // 如果token无效 去登录页
    if (response.data.code === 206) {
      // 提示用户
      Message.warning(response.data.message);
      // 移除token
      removeToken();
      // 去登录页
      router.push("/login");
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// 返回 创建的axios对象
export default instance;
