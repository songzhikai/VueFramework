import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import dataset from './modules/dataset'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 初始化的数据
  state: {
    newConnect: null
  },
  // 改变state里面的值得方法
  mutations: {
    newConnect(state, data) {
      state.newConnect = data
    }
  },
  modules: {
    app,
    dataset
  },
})

export default store
