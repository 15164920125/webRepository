import Vue from 'vue'
import Router from 'vue-router'

import policyNoSearch from '@/views/report-a-case/routes'//报案登记
import caseSearch from '@/views/case-search/routes'//案件查询
import mineTask from '@/views/mine-task/routes'//我的任务

Vue.use(Router)

const baseRoutes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     keepAlive: false
  //   }
  // },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('@/layout/components/regist'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('@/layout/components/resetPassword'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/layout/components/main'),
    meta: {
      keepAlive: true,
      cardName:"个人主页"
    }
  }
]

const routes = baseRoutes.concat(
  policyNoSearch,
  caseSearch,
  mineTask
)

export default new Router({
 mode: 'history',//去掉#
 routes
})
