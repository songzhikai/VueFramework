import store from '@/store/index'
import axios from 'axios'
import jquery from "jquery"
import { Message, MessageBox } from 'element-ui'
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url，在config下的dev.evn.js和prod.env.js中配置
  timeout: 60000
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(function(config) {
  // console.log("----request----")
  // if(!!!store.state.epmToken){
  //
  //   //store.commit("setEpmToken",'totken111');
  //   jquery.ajax({
  //     headers: {
  //       'X-Requested-With':'XMLHttpRequest'
  //     },
  //     type: 'post',
  //     url: process.env.TOKEN_API_URL,
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     async:false,
  //     beforeSend:null,
  //     success:(data)=>{
  //       let token = data;
  //       //此处需要判断是否正确生成
  //       if(!!token && token.result){
  //         store.commit("setEpmToken",token.data);
  //       }else{
  //         console.log("请求token时,返回不正确>>>>>>>>>>>>>>>>>>>>");
  //         window.location.href = process.env.PORTAL_URL;
  //       }
  //     },
  //     error:(result, status)=>{
  //       console.log("请求token时发生错误>>>>>>>>>>>>>>>>>>>>",result);//发生错误时执行的代码
  //       window.location.href = process.env.PORTAL_URL;
  //     }
  //   });
  // }
  // config.headers['e-user-token'] = store.state.dataset.epmToken;
  return config;
}, function(error) {
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use((res) => {
  if (res.status === 654) {
    Message({
      message: "请求超时",
      type: 'error',
      duration: 5 * 1000
    })
  }
  if (res.status !== 200) {
    Message({
      message: "数据返回有误",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log('promise error:' + error);
  return Promise.reject(error);
});

export default service
