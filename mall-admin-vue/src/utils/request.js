import axios from "axios";
import { getToken, setToken } from "./storage.js";
import { ElMessageBox,ElMessage } from "element-plus";
//导入nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "../router/router.js";
// const BASEURL=String(import.meta.env.VITE_BASE_URL);

axios.defaults.timeout = 5000; //响应超时时间
// axios.defaults.baseURL=import.meta.env.VITE_BASE_URL //请求的根路径

//配置请求拦截器
axios.interceptors.request.use((request) => {
  NProgress.start();
  const token = getToken();
  console.log(">>>>>>token of request: ", token);
  if (token) request.headers.token = token;
  return request;
});
//配置响应拦截器
axios.interceptors.response.use(
  //响应200
  (response) => {
    NProgress.done();
    console.log(">>>>>>response ", response);
    if (response.data.code == "200") {
      //这里获取token，使用cookie保存token
      if (response.headers.token) {
        let token = response.headers.token;
        setToken(token);
      }
    }
    if (response.data.code && response.data.code == "100003") {
      ElMessageBox.confirm(response.data.msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 确认按钮事件处理
        .then(() => {
        //   userstore.movetoken();
        //   userstore.moveuserinfo();
          ElMessage.success("退出成功");
          router.push("/");
        }).catch(() => {  
            // 点击“取消”时拒绝 Promise， 并返回 false  
            router.push("/");
        });
    }
    return Promise.resolve(response.data);
  },
  //响应4xx,5xx
  (error) => {
    NProgress.done();
    console.log(">>>>>>error: ", error);
    ElMessage({
      message: error.response.data.error+error.response.data.path,
      duration: 3000,
      type: "error",
    });
    return Promise.reject(error.response);
  }
);

export default axios;
