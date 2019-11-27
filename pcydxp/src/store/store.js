import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
    openTab:[],//所有打开的路由
    activeIndex:'/main' ,//激活状态
    isSlideActive:""
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      this.state.openTab.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.openTab.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, path) {
      this.state.activeIndex = path;
    },
    set_slide_active (state, index) {
      this.state.isSlideActive = index;
    }
  }
})

export default store
