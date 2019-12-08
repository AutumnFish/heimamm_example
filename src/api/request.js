import axios from "axios";
// 导入仓库
import store from "@/store/store.js";
// 携带token
import {getToken} from '@/utils/token.js'

// 创建副本
const instance = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_BASEURL,
  // 跨域携带cookie
  withCredentials: true
});

// 拦截器
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // 设置token
    if (store.state.userInfo) {
        // 如果有用户信息 就携带token 
        config.headers.token = getToken()
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
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// 返回 创建的axios对象
export default instance;
