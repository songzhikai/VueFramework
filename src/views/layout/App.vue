<template>
  <div id="app">
    <el-container class="full-pre" v-if="isFramework">
      <el-aside :style="{'width':isChangeWidth ? '70px' : '240px', 'height': '400px;'}">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-container>
        <el-header height="49px">
          <Header></Header>
        </el-header>
        <el-main>
         <ContentTab></ContentTab>
        </el-main>
      </el-container>
    </el-container>
    <el-container class="full-pre" v-if="!isFramework">
      <ContentSingle></ContentSingle>
    </el-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import '../../../theme/index.css' // 定制elment-ui主题

  import Header from './Header'
  import LeftMenu from './LeftMenu'
  import ContentTab from './ContentTab'
  import ContentSingle from './ContentSingle'
  import requestApi from './requestApi'
  import EventBus from '@/components/EventBus'


  Vue.use(ElementUI)

  export default {
    name: 'App',
    data() {
      return {
        isFramework: window.location.href.indexOf("isframe=0")!=-1?false:!process.env.isInPortal,
        isChangeWidth:false,
      }
    },
    components:{Header,LeftMenu,ContentTab,ContentSingle},
    beforeCreate:function(){
      if(sessionStorage.getItem("userInfo")==undefined){
        requestApi.getUserInfo({}).then(response=>{
          let userInfo = response.data;
          if(userInfo!=null&&userInfo!=undefined){
            sessionStorage.setItem("userInfo",userInfo);
            sessionStorage.setItem("tenantId",userInfo.tenantId);
            sessionStorage.setItem("loginId",userInfo.loginId);
            sessionStorage.setItem("channelId",userInfo.channelId);
          }
        });
        // let userInfo={"loginId":"U001","tenantId":"T001","channelId":"channelId1"};
        // sessionStorage.setItem("userInfo",userInfo);
        // sessionStorage.setItem("tenantId",userInfo.tenantId);
        // sessionStorage.setItem("loginId",userInfo.loginId);
        // sessionStorage.setItem("channelId",userInfo.channelId);
      }
    },
    methods: {
      dispatch(){
        let url=window.location.href;
        if(url.indexOf("isframe=0")!=-1){
          this.isFramework=false;
        }else{
          this.isFramework=!process.env.isInPortal;
        }
      }
    },
    beforeDestroy(){
      // 销毁OpenMenuEvent事件
      EventBus.$off('OpenMenuEvent');
    },
    mounted:function(){
      let _this = this;
      this.dispatch();
      EventBus.$on('OpenMenuEvent', function(width){
        if(width == '50px'){
          _this.isChangeWidth = true
        }else if(width == '240px'){
          _this.isChangeWidth = false
        }
      });

    }
  }
</script>


