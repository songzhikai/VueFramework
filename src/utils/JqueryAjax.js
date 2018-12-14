import jquery from "jquery"
import store from '@/store/index'

jquery.ajaxSetup({
  beforeSend: function(request) {
    // console.log("----ajax----")
    // if(!!!store.state.epmToken){
    //   jquery.ajax({
    //     headers: {
    //       'X-Requested-With':'XMLHttpRequest'
    //     },
    //     beforeSend:null,
    //     type: 'post',
    //     xhrFields: {
    //       withCredentials: true
    //     },
    //     url: process.env.TOKEN_API_URL,
    //     async:false,
    //     success:(data)=>{
    //       let token = data;
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
    // request.setRequestHeader("e-user-token", store.state.dataset.epmToken);
  },
});

export default jquery
