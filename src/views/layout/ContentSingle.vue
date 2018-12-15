<template>
  <div class="full-pre full-pre-width">
        <router-view></router-view>
  </div>
</template>
<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import EventBus from '../../components/EventBus'
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        activeTab:" "
      }
    },
    methods: {
      ...mapMutations([
        'removeTab','setCurrentActiveMenu','editIncludeKeepAliveCompNames'
      ]),
      /**
       * tab页头点击事件
       * @param tabObj
       */
      tabClick(tabObj){
        this.$router.push("/"+this.activeTab);
        this.setCurrentActiveMenu("/"+this.activeTab)
      },
      /**
       * 关闭tab页
       * @param tabObj
       */
      removeTabByRouterPath(targetName) {
        let _this = this
        let tabs = this.tabs;
        let activeName = this.activeTab;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.activeTab = activeName;
        this.removeTab(targetName);
        if(this.tabs.length==0){
          this.setCurrentActiveMenu((new Date()).getTime()+"")//设置选中菜单为一个不存在的菜单，让左侧菜单取消选中
        }else{
          this.setCurrentActiveMenu("/"+this.activeTab);
          this.$router.push("/"+this.activeTab);
        }
        //关闭tab页时，更新缓存组件
        let includeKeepAliveCompNames = this.$store.state.app.includeKeepAliveCompNames;
        let route = {}
        for(let [i,v] of _this.$router.options.routes.entries()){
          if(v.path == targetName){
            route = v
            break;
          }
        }
        _this.includeKeepAliveCompNames = includeKeepAliveCompNames.filter( item => item != route.name)
        _this.editIncludeKeepAliveCompNames(_this.includeKeepAliveCompNames);

      },
    },
    mounted:function(){
      var _this = this;
      //添加事件监听activeTabChange，左侧菜单点击时触发，设置当前激活的tab页
      EventBus.$on("activeTabChange",function(tabName){
        _this.activeTab=tabName;
      });
    },
    computed:{
      reouterViewVisiable:function(){
        return this.tabs.length>0
      },
    },
    watch: {
      //监听路由变化，如果刷新的是当前路由，就调用this.$router.go(0);强制刷新（路由path相同，但参数不同，fullPath要不相同才能进来）
      '$route': function(newVal,oldVal){
        if(newVal.path==oldVal.path){
          this.$router.go(0);
        }
      }
    }
  }

</script>
