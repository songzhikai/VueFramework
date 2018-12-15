const app = {
  state: {
    token: '',
    tabs: [], //已添加的tab页
    currentActiveMenu: "/xx/xx/xx", //当前激活的菜单
    includeKeepAliveCompNames: [], //路由缓存数组 [compname1, compname2]
    currentEditComp: null
  },
  mutations: {
    /**
     * 添加tab页
     * @param state
     * @param tabObj
     */
    addTab(state,tabObj){
      let tabExist = false
      for(var i=0;i<state.tabs.length;i++){
        if(tabObj.router == state.tabs[i].router){
          tabExist = true
          break;
        }
      }
      if(!tabExist){
        state.tabs.push(tabObj);
      }
      sessionStorage.setItem("openedTabs",JSON.stringify(state.tabs));
    },
    /**
     * 删除tab页
     * @param state
     * @param tabName
     */
    removeTab(state,router){
      state.tabs = state.tabs.filter(tab => tab.router !== router);
      sessionStorage.setItem("openedTabs",JSON.stringify(state.tabs));
    },
    setTabs(state,arr){
      state.tabs = arr;
      sessionStorage.setItem("openedTabs",JSON.stringify(state.tabs));
    },
    /**
     * 设置当前选中的菜单
     * @param state
     * @param menuName
     */
    setCurrentActiveMenu(state,path){
      state.currentActiveMenu = path
      sessionStorage.setItem("currentActiveMenu",path);
    },
    /**
     * 添加路由缓存例外，关闭tab页时添加
     * @param state
     * @param viewName
     */
    addExcludeView(state,viewName){
      if(state.excludeView.indexOf(viewName)==-1){
        state.excludeView.push(viewName)
      }
    },
    /**
     * 更新缓存的组件
     * @param state
     * @param compName
     */
    editIncludeKeepAliveCompNames(state, includeKeepAliveCompNames) {
      state.includeKeepAliveCompNames = includeKeepAliveCompNames
    },
    /**
     * 删除路由缓存例外，打开tab页时添加
     * @param state
     * @param viewName
     */
    removeExcludeView(state,viewName){
      var index = state.excludeView.indexOf(viewName);
      if(index!=-1){
        state.excludeView.splice(index,1);
      }
    },
    setEpmToken(state,token){
      state.epmToken = token;
    }
  },
  actions: {

  },
  getters: {
    funcGetter(state, getter) {
      let date8 = getter.getDate8();
      return date8;
    },
    getDate8: (state) => (step) => {
      let stepNum=0;
      if (typeof (step) == 'number' ) {
        stepNum = step;
      }
      var date1 = new Date();
      date1.setDate(date1.getDate() + stepNum);
      return date1.getFullYear()+((date1.getMonth() + 1)<10?("0"+(date1.getMonth() + 1)):(""+(date1.getMonth() + 1)))+(date1.getDate()<10?("0"+date1.getDate()):(""+date1.getDate()));
    }
  }
}

export default app
