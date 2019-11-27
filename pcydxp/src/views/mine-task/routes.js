
const mineTask = [
  {
    path: '/mineTask',
    component: () => import('@/views/mine-task/taskList'),
    name: 'mineTask',
    meta: {
      keepAlive: true,
      isActive:2,
      cardName:"我的协陪任务"
    }
  },
  {
    path: '/taskDetail',
    component: () => import('@/views/mine-task/taskDetail'),
    name: 'taskDetail',
    meta: {
      keepAlive: true,
      isActive:2,
      cardName:"协陪任务"
    }
  }
]
export default mineTask
