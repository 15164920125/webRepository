
const caseSearch = [
  {
    path: '/caseSearch',
    component: () => import('@/views/case-search/caseSearch'),
    name: 'caseSearch',
    meta: {
      keepAlive: true,
      isActive:1,
      cardName:"案件查询"
    }
  }
]
export default caseSearch
