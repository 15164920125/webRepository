<template>
  <div class="bg-img">
    <div class="logo-box">
      <div class="logo-l-box">
        <div class="logo-l-up"></div>
        <div class="logo-l-text">
          <img src="../../img/logo/logo-picc.png" />
          <p>THE PEOPLES INSURANCE COMPANY  OF CHIAN LIMTED</p>
        </div>
      </div>
      <div class="logo-r-box">
        <p class="logo-r-version">当前版本为：<span>1.0.3.0</span></p>
        <h2 class="logo-r-title">人保财险理赔系统-合作伙伴</h2>
        <div class="input-box">
          <div :class="(isActive==1?'is-focus':'')">
            <i class="icon-before" :class="(isActive==1?'icon-user-focus':'icon-user')"></i><el-input
              placeholder="请输入HR码/手机号"
              @focus="activeClass('1')"
              @blur="blurActive()"
              v-model="userName">
            </el-input>
          </div>
          <div :class="(isActive==2?'is-focus':'')">
            <i class="icon-before" :class="(isActive==2?'icon-password-focus':'icon-password')"></i><el-input
              placeholder="请输入密码"
              v-model="password"
              @focus="activeClass('2')"
              @blur="blurActive()"
              show-password>
            </el-input>
          </div>
        </div>
        <p class="reset-pass" @click="restPass()">重置密码</p>
        <div class="btn-box btn-logo">
          <el-button class="btn logo-btn" @click="logo()">登录</el-button>
        </div>
        <div class="btn-box">
          <el-button class="btn regist-btn">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       userName:"",
       password:"",
       isActive:0
     }
   },
   methods:{
     logo(){
       this.$router.push({path: '/main'});
     },
     activeClass(index){
       this.isActive = index;
     },
     blurActive(){
       this.isActive = 0;
     },
     restPass(){
       this.password = "";
     }
   }
 }
</script>

<style scoped="scoped">
*{
  font-family: PingFangSC-Medium;
}
.bg-img{
  width: 100%;
  height:100%;
  background: url(../../img/logo/logo-bg.png) no-repeat;
  background-size: 100% 100%;
}
.logo-box{
  width: 1048px;
  min-width: 1048px;
  margin: 0 auto;
}
.logo-l-box{
  float:left;
  margin-top: 105px;
  text-align: center;
  font-size: 0;
}
.logo-l-up{
  width: 566px;
  height: 352px;
  background: url(../../img/logo/logo-bg-l.png) no-repeat;
  background-size: 100% 100%;
}
.logo-l-text{
  margin-top: -3px;
  height: 202px;
  background-color: #FF4B38;
  color: #FFFFFF;
  border-bottom-left-radius: 20px;
}
.logo-l-text img{
  margin-top: 45px;
}
.logo-l-text p{
  height: 18px;
  line-height: 18px;
  color: #FFFFFF;
  font-size: 13px;
}
.logo-r-box{
  float: left;
  margin-top: 66px;
  width: 482px;
  height: 632px;
  border-radius: 20px;
  background-color: #FFFFFF;
}
.logo-r-version{
  font-size: 12px;
  color: #666666;
  letter-spacing: 0;
  height: 17px;
  line-height: 17px;
  text-align: right;
  padding-right: 21px;
  margin-top: 20px;
  opacity: 0.5;
}
.logo-r-title{
  margin-top: 105px;
  font-size: 18px;
  color: #484848;
  text-align: center;
  height: 25px;
  line-height:25px;
}
.input-box{
  margin-top: 50px;
}
.input-box > div{
  width: 380px;
  margin:0 auto;
  border-bottom: 1px solid #999999;
}
.input-box > div .el-input{
  width: 355px;
}
.input-box > div:first-child{
  margin-bottom: 10px !important;
}
.input-box > div.is-focus{
  border-bottom: 1px solid #FF4B38;
}
.input-box > div /deep/ .el-input__inner{
  border:0;
  padding-left: 10px;
}
.icon-before{
  width: 15px;
  display: inline-block;
  height: 16px;
  background-size: 100% 100%;
}
.icon-user{
  background: url(../../img/logo/icon-user.png) no-repeat;
}
.icon-user-focus{
  background: url(../../img/logo/icon-user-focus.png) no-repeat;
}
.icon-password{
  background: url(../../img/logo/icon-pass.png) no-repeat;
}
.icon-password-focus{
  background: url(../../img/logo/icon-pass-focus.png) no-repeat;
}
.reset-pass{
  font-size: 14px;
  color: #444444;
  text-align: right;
  padding-right: 58px;
  margin-top: 17px;
  height:20px;
  line-height:20px;
  font-weight: bold;
  cursor: pointer;
}
.btn-box{
  text-align: center;
}
.btn{
  width: 210px;
  height:36px;
  line-height: 36px;
  border-radius: 18px;
  font-size: 14px;
  padding: 0;
  margin: 0 auto;
}
.btn-logo{
  margin-top: 110px;
  margin-bottom: 8px;
}
.logo-btn{
  background: #FF4B38;
  color: #FFFFFF;
}
.regist-btn{
  border: 1px solid #FF4B38;
  color: #FF4B38;
}
</style>
