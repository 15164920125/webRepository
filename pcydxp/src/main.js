// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 导入路由文件
import ElementUI from 'element-ui';// 导入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex' //导入vuex文件
import store from './store/store' //导入vuex文件
import './styles/index.scss'
import Router from 'vue-router'
import api from './api' //导入api接口
// import VCharts from 'v-charts' //导入图标插件

Vue.use(Vuex)
Vue.use(ElementUI)
// Vue.use(VCharts)
Vue.config.productionTip = false //阻止显示生产模式的消息
Vue.prototype.$api = api; // 将api挂载到vue的原型上

const originalPush = Router.prototype.push //修改 Router本身的push
// const originalPushs = router.prototype.push //修改 Router本身的push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err) //解决name:""NavigationDuplicated"报错
}
// router.prototype.push = function push(location) {
//   return originalPushs.call(this, location).catch(err => err) //解决name:""NavigationDuplicated"报错
// }
window._router = router;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
