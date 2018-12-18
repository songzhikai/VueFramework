<template>
  <div class="full-pre">
      <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTabByRouterPath" @tab-click="tabClick" class="layout-tabs">
          <el-tab-pane v-for="(item, index) in tabs" :key="item.index" :label="item.title" :name="item.router"></el-tab-pane>
      </el-tabs>
      <el-scrollbar class="flow-x-scrollbar" :style="{ height : scrollHeight + 'px'}">
        <div class="contents">
            <keep-alive :include="includeKeepAliveCompNames">
              <router-view></router-view>
            </keep-alive>
        </div>
      </el-scrollbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import EventBus from '../../components/EventBus'
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'
  import menuModule from './Menu'

  export default {
    data() {
      return {
        tabs: [], //tab数组 结构[{router: '/xxxx/xxxx/xxxx', title: 'xxxx'}, {router: '', title: ''}]
        activeTab:"",  //path的值
        scrollHeight:window.innerHeight -80,
        includeKeepAliveCompNames: []
      }
    },
    methods: {
      ...mapMutations([
        'removeTab','setCurrentActiveMenu','editIncludeKeepAliveCompNames','addTab','setTabs'
      ]),
      /**
       * tab页头点击事件
       * @param tabObj
       */
      tabClick(tabObj){
        this.$router.push(this.activeTab);
        this.setCurrentActiveMenu(this.activeTab)
      },
      /**
       * 关闭tab页
       * @param tabObj
       */
      removeTabByRouterPath(targetName) {
        let _this = this
        if(this.tabs.length == 1){
          this.$router.push('/')
        }else{
          if(targetName == this.activeTab){ //当前删除的是选中的tab
            for(let [i, v] of this.tabs.entries()){
              if(v.router == targetName){
                if(i == 0){
                  this.activeTab = this.tabs[1].router
                }else{
                  this.activeTab = this.tabs[i-1].router
                }
              }
            }
          }else{
            for(let [i, v] of this.tabs.entries()){
              if(v.router == targetName ){
                if(i == 0){
                  this.activeTab = this.tabs[1].router
                }else if(i < this.tabs.length-1){
                  this.activeTab = this.tabs[i+1].router
                }
                break;
              }
            }
          }
        }
        this.tabs = this.tabs.filter(tab => tab.router != targetName)
        this.removeTab(targetName);
        if(this.tabs.length==0){
          this.setCurrentActiveMenu((new Date()).getTime()+"")//设置选中菜单为一个不存在的菜单，让左侧菜单取消选中
        }else{
          this.setCurrentActiveMenu(this.activeTab);
          this.$router.push(this.activeTab);
        }
        //关闭tab页时，更新缓存组件
        this.editIncludeKeepAliveCompNames(this.tabs.filter(item => item.name))
      },
      dealTabs(to){
        let _this = this
        if(to.path=="/"){
          this.setTabs([]);
        }else{
          this.tabs = this.$store.state.app.tabs;
          let routeExist = false;
          for(let i=0;i<this.tabs.length;i++){
            if(this.tabs[i].router==to.path){
              _this.activeTab = this.tabs[i].router
              routeExist = true;
              break;
            }
          }

          if(!routeExist){
            menuModule.menus.forEach((obj,index)=>{
              if(obj.sub==undefined){
                if(to.path == obj.path){
                  this.addTab({router:to.path, title:obj.menuName, name: to.name});
                  this.activeTab = to.path;
                  this.setCurrentActiveMenu(to.path);
                }
              }else{
                obj.sub.forEach((subObj,subIndex)=>{
                  if(to.path == subObj.path){
                    this.addTab({router:to.path, title:subObj.menuName, name: to.name});
                    this.activeTab = to.path;
                    this.setCurrentActiveMenu(to.path);
                  }
                })
              }
            })
          }
        }
        this.editIncludeKeepAliveCompNames(this.tabs.filter(item => item.name))
      },
      init(){
        this.includeKeepAliveCompNames = this.$store.state.app.includeKeepAliveCompNames
      }
    },
    mounted:function(){
      var _this = this;
      this.init();
      //添加事件监听activeTabChange，左侧菜单点击时触发，设置当前激活的tab页
      EventBus.$on("activeTabChange",function(tabName){
        _this.activeTab=tabName;
        _this.setCurrentActiveMenu(tabName)
      });
      if(sessionStorage.getItem("openedTabs")!=undefined&&sessionStorage.getItem("openedTabs")!=""){
        let tabArr = JSON.parse(sessionStorage.getItem("openedTabs"));
        tabArr.map(tabObj=>{
          this.addTab(tabObj)
        });
      }
      if(sessionStorage.getItem("currentActiveMenu")!=undefined&&sessionStorage.getItem("currentActiveMenu")!=""){
        this.setCurrentActiveMenu(sessionStorage.getItem("currentActiveMenu"))
        this.activeTab = sessionStorage.getItem("currentActiveMenu")
      }
      this.dealTabs({path:this.$route.path});
    },
    watch: {
      '$route': function(to,from){
        this.dealTabs(to);
      }
    }
  }

</script>
