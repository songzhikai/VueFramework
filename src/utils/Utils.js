import jquery from "jquery"
import store from '@/store/index'

const Util = {
  uuid(){
    var len=32;//32长度
    var radix=16;//16进制
    var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid=[],i;
    radix=radix||chars.length;
    for(i=0;i<len;i++){
      uuid[i]=chars[0|Math.random()*radix];
    }
    return 'UUID'+uuid.join('');
  },
  getIdWithTypeAndUuid(type){
    let newType = type.toUpperCase()+"";
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var uuid8 = Util.uuid().substring(4, 12);
    var nowDate = year +""+ month +""+ day+"";
    return newType+nowDate+uuid8;

  },
  getNameWithDateAndUuid(prefix){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var uuid8 = Util.uuid().substring(4, 12);
    var nowDate = year +""+ month +""+ day;
    return prefix+"_"+nowDate+"_"+uuid8;
  },
  formatDate (date, fmt){
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },
  padLeftZero (str) {
    return ('00' + str).substr(str.length);
  },
compareDate(start, end) {
  var startDate;
  var endDate;
  if(start.indexOf(":")!=-1){
    var startDatePart = start.split(" ")[0].split("-");
    var startTimePart = start.split(" ")[1].split(":");
    startDate = new Date(parseInt(startDatePart[0]),parseInt(startDatePart[1])-1,parseInt(startDatePart[2]),parseInt(startTimePart[0]),parseInt(startTimePart[1]),parseInt(startTimePart[2]));

    var endDatePart = end.split(" ")[0].split("-");
    var endTimePart = end.split(" ")[1].split(":");
    endDate = new Date(parseInt(endDatePart[0]),parseInt(endDatePart[1])-1,parseInt(endDatePart[2]),parseInt(endTimePart[0]),parseInt(endTimePart[1]),parseInt(endTimePart[2]));
  }else{
    var startDatePart = start.split(" ")[0].split("-");
    startDate = new Date(parseInt(startDatePart[0]),parseInt(startDatePart[1])-1,parseInt(startDatePart[2]));

    var endDatePart = end.split(" ")[0].split("-");
    endDate = new Date(parseInt(endDatePart[0]),parseInt(endDatePart[1])-1,parseInt(endDatePart[2]));
  }

  if (startDate > endDate) {
    return true;
  } else {
    return false;
  }
},
  getEpmToken(){
    jquery.ajaxSetup({
      beforeSend: function(request) {
        // if(!!!store.state.epmToken){
        //   jquery.ajax({
        //     headers: {
        //       'X-Requested-With':'XMLHttpRequest'
        //     },
        //     beforeSend:null,
        //     type: 'get',
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
        //       console.log("请求token时发生错误>>>>>>>>>>>>>>>>>>>>");//发生错误时执行的代码
        //       console.log(result);//发生错误时执行的代码
        //       console.log(">>获取token时报错,status="+status);
        //       window.location.href = process.env.PORTAL_URL;
        //     }
        //   });
        // }
        // request.setRequestHeader("e-user-token", store.state.dataset.epmToken);
      },
    });
  }
}

export default Util
