/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const datasetRouter = {
  path: '/dataset',
  component: Layout,
  name: 'dataset',
  meta: {
    title: '数据集',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/dataset/components/list'),
      name: 'list',
      meta: { title: '数据集列表' }
    },
    {
      path: 'create',
      component: () => import('@/views/dataset/components/create'),
      name: 'create',
      meta: { title: '新建数据集' }
    }
  ]
}
export default datasetRouter
