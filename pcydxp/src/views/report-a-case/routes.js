
const policyNoSearch = [
  {
    path: '/policNo_search',
    component: () => import('@/views/report-a-case/policyNoSearch'),
    name: 'policNoSearch',
    meta: {
      keepAlive: true,
      isActive:0,
      cardName:"保单查询"
    }
  },
  {
    path: '/policNo_add',
    component: () => import('@/views/report-a-case/policyNoAdd'),
    name: 'policNoAdd',
    meta: {
      keepAlive: true,
      isActive:0,
      cardName:"报案登记"
    }
  }
]
export default policyNoSearch
