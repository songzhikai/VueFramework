<template>
  <div class="left-menu">
    <h1 class="logo">VueFramework</h1>
    <el-scrollbar class="flow-x-scrollbar" :style="{ height : scrollHeight + 'px'}">
    <el-menu :router="true" :default-active="currentActiveMenu" class="el-menu-vertical-demo" @select="selectMenu"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <template v-for="(item,index) in menus">
        <el-submenu :index="index+''" v-if="item.sub!=undefined">
          <template slot="title">
            <i class="iconfont icon-erjicaidanzonghefenxi"></i>
            <span>{{item.menuName}}</span>
          </template>
            <el-menu-item v-for="(subItem,subIndex) in item.sub" :index="subItem.path" :key="subIndex">
              <span>{{subItem.menuName}}</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i class="iconfont icon-ceng"></i>
          <span>{{item.menuName}} </span>
        </el-menu-item>
      </template>
    </el-menu>
    </el-scrollbar>
    <i v-show="isCollapse" class="el-icon-arrow-right" @click="openMenu('240px')"></i>
    <i v-show="!isCollapse" class="el-icon-arrow-left" @click="openMenu('50px')"></i>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import menuModule from './Menu'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import EventBus from '../../components/EventBus'

export default {
    data(){
      return {
        menus:menuModule.menus,
        isCollapse: false,
        scrollHeight:window.innerHeight -100,
      }
    },
    methods: {
      /**
       * 获得当前选择的菜单对象
       * @param index
       * @returns {*}
       */
      getSelectedMenu(path){
        for(var i=0;i<this.menus.length;i++){
          if(this.menus[i].sub==undefined){
            if(path == this.menus[i].path){
              return this.menus[i];
            }
          }else{
            let sub = this.menus[i].sub;
            for(let j=0;j<sub.length;j++){
              if(sub[j].path==path){
                return sub[j];
              }
            }
          }

        }
      },
      openMenu(width){
        this.isCollapse = !this.isCollapse
        EventBus.$emit('OpenMenuEvent', width)
      },

      /**
       * 菜单项点击事件
       * @param index
       * @param indexPath
       */
      handleOpen(index, indexPath) {
        // console.log('open');
      },
      handleClose(index, indexPath) {
        // console.log('close');
      },
      selectMenu(index, indexPath) {
         let routerLevel1 = index.substring(1);
         routerLevel1 = routerLevel1.substring(0,routerLevel1.indexOf("/")==-1?routerLevel1.length:routerLevel1.indexOf("/"))
         let tabObj = {
           name:routerLevel1 ,
           router:index,
           title:this.getSelectedMenu(index).menuName
         };
         this.addTab(tabObj);
         EventBus.$emit("activeTabChange",index);//激活当前选择菜单对应的tab
      },
      ...mapMutations([
        'addTab'
      ])
    },
    mounted:function(){
      // var _this = this
      // var routerMap = {}
      // //从菜单模块遍历动态添加路由
      // menuModule.menus.forEach((obj,index)=>{
      //   if(obj.sub==undefined){
      //     if(routerMap[obj.path]==undefined){
      //       routerMap[obj.path] = obj
      //       _this.$router.options.routes.push({//插入路由
      //         path: obj.path,
      //         component: resolve => require(['@/views'+obj.comp+'.vue'], resolve)
      //       });
      //     }
      //   }else{
      //     obj.sub.forEach((subObj,subIndex)=>{
      //       if(routerMap[subObj.path]==undefined){
      //         routerMap[subObj.path] = subObj
      //         _this.$router.options.routes.push({//插入路由
      //           path: subObj.path,
      //           component: resolve => require(['@/views'+subObj.comp+'.vue'], resolve)
      //         });
      //       }
      //     })
      //   }
      // })
      // this.$router.addRoutes(this.$router.options.routes);//调用addRoutes添加路由
    },
  computed:{
    ...mapState([
      'currentActiveMenu'
    ])
  }
}

</script>
<style>
</style>
