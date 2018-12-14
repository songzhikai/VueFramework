import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: '/VueFramework/',
  routes: [
    { path: '/dataset/components/list', component: () => import('@/views/dataset/components/list') },
    { path: '/dataset/components/create', component: () => import('@/views/dataset/components/create') },
    { path: '/test/testDataset', component: () => import('@/views/test/testDataset') }
  ]
})
