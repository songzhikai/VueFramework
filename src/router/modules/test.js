/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const testRouter = {
  path: '/test',
  component: Layout,
  name: 'test',
  meta: {
    title: '组件测试',
    icon: 'table'
  },
  children: [

  ]
}
export default testRouter

