<template>
  <div class="full-pre">
        <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTabByName" @tab-click="tabClick" class="layout-tabs">
            <el-tab-pane v-for="(item, index) in tabs" :key="item.index" :label="item.title" :name="item.router"></el-tab-pane>
        </el-tabs>
        <el-scrollbar class="flow-x-scrollbar" :style="{ height : scrollHeight + 'px'}">
        <div class="contents">
              <keep-alive :exclude="excludeView">
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
        activeTab:"",
        scrollHeight:window.innerHeight -80,
      }
    },
    methods: {
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
      removeTabByName(targetName) {
        let tabs = this.tabs;
        let activeName = this.activeTab;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.router === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.router;
              }
            }
          });
        }
        this.activeTab = activeName;
        this.removeTab(targetName);
        if(this.tabs.length==0){
          this.setCurrentActiveMenu((new Date()).getTime()+"")//设置选中菜单为一个不存在的菜单，让左侧菜单取消选中
        }else{
          this.setCurrentActiveMenu(this.activeTab);
          this.$router.push(this.activeTab);
        }
        let routerLevel1 = targetName.substring(1);
        routerLevel1 = routerLevel1.substring(0,routerLevel1.indexOf("/")==-1?routerLevel1.length:routerLevel1.indexOf("/"))
        this.$router.options.routes.map(routeItem=>{
          if(routeItem.path == "/"+routerLevel1){
            this.addExcludeView(routeItem.component.name)//关闭tab页时，添加缓存例外
          }
        });
        // 关闭tab页提交事件
        EventBus.$emit("closeCurentMenu",this.activeTab)
        if( this.tabs.length==0){
          this.$router.push("/")
        }
      },
      dealTabs(to){
        if(to.path=="/"){
          this.setTabs([]);
        }else{
          // let routeExist = false;
          // for(let i=0;i<this.tabs.length;i++){
          //   if(this.tabs[i].router==to.path){
          //     routeExist = true;
          //     break;
          //   }
          // }
          // if(!routeExist){
          //   menuModule.menus.forEach((obj,index)=>{
          //     if(obj.sub==undefined){
          //       if(to.path == obj.path){
          //         this.addTab({router:to.path, title:obj.menuName});
          //         this.activeTab = to.path;
          //         this.setCurrentActiveMenu(to.path);
          //       }
          //     }else{
          //       obj.sub.forEach((subObj,subIndex)=>{
          //         if(to.path == subObj.path){
          //           this.addTab({router:to.path, title:subObj.menuName});
          //           this.activeTab = to.path;
          //           this.setCurrentActiveMenu(to.path);
          //         }
          //       })
          //     }
          //   })
          // }
        }
      },
      ...mapMutations([
        'removeTab','setCurrentActiveMenu','addExcludeView','addTab','setTabs'
      ])
    },
    mounted:function(){
      var _this = this;
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
    computed:{
      ...mapState([
        'tabs','excludeView'
      ])
    },
    watch: {
      '$route': function(to,from){
        this.dealTabs(to);
      }
    }
  }

</script>
