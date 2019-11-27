<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container style="height: 100%;" v-if="$route.meta.keepAlive">
      <!-- 侧边栏 -->
      <!-- <el-aside width="10%" style="height:100%;">
          <picc-pub-menu></picc-pub-menu>
      </el-aside> -->
      <el-aside width="80px" style="height:100%;">
          <left ref="sidebar"></left>
      </el-aside>
    <el-container>
      <el-header>
        <!-- 导航栏 -->
          <header-nav></header-nav>
      </el-header>
      <el-main>
        <el-tabs
          v-model="activeIndex"
          type="card"
          closable
          v-if="openTab.length"
          @tab-remove='tabRemove'
          @tab-click='tabClick'
          >
           <el-tab-pane
             v-for="(item, index) in openTab"
             :key="item.name"
             :label="item.cardName"
             :name="item.route"
           >
           </el-tab-pane>
        </el-tabs>
        <router-view @closeRouter="tabRemove"></router-view>
      </el-main>
    </el-container>
    </el-container>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import header from './layout/components/navbar/navbar'
import left from './layout/components/sidebar/sidebar'
export default {
  data(){
    return {
      // isDisplay:this.$route.meta.keepAlive,//是否显示头和侧边栏
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    this.$store.commit('add_tabs', {route: '/main', name: 'main',cardName:"个人主页"});
    this.$store.commit('set_slide_active', "-1");
    this.$router.push({path: "/main"});
    // this.init();
  },
  components: {
    headerNav: header,
    left: left,
    // 'new-claim' : left,
  },
  methods:{
    init(){
      this.$store.commit('set_slide_active', "-1");
    },
    //tab标签点击时，切换相应的路由
    tabClick(tab){
      // console.log("tab",tab);
      // console.log('active',this.activeIndex);
      this.$router.push({path: this.activeIndex});
    },
    //移除tab标签
    tabRemove(targetName){
      console.log("tabRemove",targetName);
      //首页不删
      if(targetName == '/'||targetName == '/main'){
        return
      }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          // console.log('=============',this.openTab[this.openTab.length-1].route)
          this.$store.commit('set_active_index', this.openTab[this.openTab.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
  },
  computed: {
    openTab () {
      return this.$store.state.openTab;
    },
    activeIndex:{
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch:{
    '$route'(to,from){
        //判断路由是否已经打开
        //已经打开的 ，将其置为active
        //未打开的，将其放入队列里
        let flag = false;
        for(let item of this.openTab){
          console.log("item.name",item.name)
          console.log("t0.name",to.name)
          if(item.name === to.name){
            console.log('to.path',to.path);
            this.$store.commit('set_active_index',to.path)
            this.$store.commit('set_slide_active', to.meta.isActive);
            flag = true;
            break;
          }
        }
        if(!flag){
          console.log('to.path',to.path);
          this.$store.commit('add_tabs', {route: to.path, name: to.name,cardName:to.meta.cardName});
          this.$store.commit('set_active_index',to.path)
          this.$store.commit('set_slide_active', to.meta.isActive);
        }
    }
  }

}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    background: #F2F2F2;
    height: 100%;
  }
  .isDisplay{
    display:none;
  }
  /deep/ .el-main{
    overflow: auto;
    padding: 0;
  }
  /deep/ .el-header{
    padding: 0;
  }
  .el-tabs--card /deep/ >.el-tabs__header .el-tabs__item{
    background-color: #fff;
    margin-top: 14px;
    height: 33px;
    line-height: 33px;
    text-align: left;
    min-width: 100px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 12px;
    border-bottom: 1px solid #F2F2F2;
    margin-right: 6px;
    color: #B2B2B2;
  }
  .el-tabs--card /deep/ >.el-tabs__header .el-tabs__item.is-active.is-closable{
    text-align: center;
    color: #222222;
  }
  /deep/ .el-tabs__item.is-active{
    color: #222222;
  }
  /deep/ .el-tabs__item:hover{
    color: #222222;
  }
  /deep/ .el-tabs__nav{
    margin-left: 17px;
  }
  /deep/ .el-tabs__header{
    margin: 0;
  }
  .el-tabs--card /deep/ >.el-tabs__header .el-tabs__nav{
    border: none;
  }
  .el-tabs--card /deep/ >.el-tabs__header{
    border: none;
  }
  /deep/ .el-tabs__nav-wrap{
    margin: 0;
  }
  /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(1) .el-icon-close{
      display: none !important;
  }
</style>
