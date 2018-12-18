import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: '/VueFramework/',
  routes: [
    { path: '/dataset/components/list', component: () => import('@/views/dataset/components/list'), name: 'datasetList' },
    { path: '/dataset/components/create', component: () => import('@/views/dataset/components/create'), name: 'datasetCreate' },
    { path: '/test/testDataset', component: () => import('@/views/test/testDataset'), name: 'testDataset' },
    { path: '/test/testForm', component: () => import('@/views/test/testForm'), name: 'testForm' },
    { path: '/test/testTree', component: () => import('@/views/test/testTree'), name: 'testTree' },
    { path: '/test/testSelect', component: () => import('@/views/test/testSelect'), name: 'testSelect' }
  ]
})
