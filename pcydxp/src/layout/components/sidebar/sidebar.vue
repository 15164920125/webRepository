<template>
  <div class="sidebar-box">
    <div class="navbar-img"><img src="../../../img/sidebar/navbar.png" /></div>
    <div class="user-img"><img  src="../../../img/meinv.jpg" /></div>
    <div class="user-name">李克</div>
    <div class="function-list-box">
      <router-link :to="{ name: 'policNoSearch' }">
        <div :class="{active:0==moreActiveNum}">
          <img class="list-min" src="../../../img/sidebar/report-a-case-icon.png" /><p>报案登记</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'caseSearch' }">
        <div :class="{active:1==moreActiveNum}">
          <img class="list-min" src="../../../img/sidebar/case-seach-icon.png" /><p>案件查询</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'mineTask' }">
        <div :class="{active:2==moreActiveNum}">
          <img src="../../../img/sidebar/mine-task-icon.png"/><p>我的协赔任务</p>
        </div>
      </router-link>
      <!-- <component :is="menuName"></component> -->
      <!-- <picc-pub-menu></picc-pub-menu> -->
      <!-- <new-claim-menu></new-claim-menu> -->
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        moreActiveNum:"",
        // menuName:'picc-pub-menu'
      }
    },
    // components: {
    //   'new-claim-menu': NewClaim
    // },
    computed: {
      getUserIcons() {
        return this.$store.state.isSlideActive;
      }
    },
    watch: {
      getUserIcons(val) {
        this.moreActiveNum = val;
      }
    }
  }
</script>

<style scoped>
  .sidebar-box{
    height: 100%;
    background: #5F5F5F;
    padding-top: 10px;
  }
  .navbar-img{
    height: 14px;
    line-height: 14px;
    width: 80px;
    text-align: center;
  }
  .navbar-img img{
    width: 42px;
    height: 14px;
  }
  .user-img{
    height: 42px;
    line-height: 42px;
    width: 42px;
    margin-left: 19px;
    margin-top: 10px;
    border-radius: 50%;
    text-align: center;
    background: #6F6F6F;
  }
  .user-img img{
    height: 34px;
    width: 34px;
    margin: 4px;
    border-radius: 50%;
    background: #FFFFFF;
  }
  .user-name{
    text-align: center;
    height: 22px;
    font-size: 16px;
    color: #FFFFFF;
    margin-top: 14px;
    letter-spacing: 0;
  }
  .function-list-box{
    margin-top: 36px;
    color: #FFFFFF;
  }
  .function-list-box div{
    font-size: 0;
    height: 76px;
    text-align: center;
    cursor: pointer;
  }
  .function-list-box div img{
    height: 24px;
    width: 20px;
    margin-top: 6px;
    margin-bottom: 8px;
  }
  .function-list-box div img.list-min{
    margin-top: 16px;
    margin-bottom: 7px;
  }
  .function-list-box div p{
    margin-left: 16px;
    width: 48px;
    height: 17px;
    line-height: 17px;
    word-break: break-all;
    font-size: 12px;
    text-align: center;
  }
  .function-list-box div.active{
    cursor: default;
    background: #FF1A00;
  }
</style>
