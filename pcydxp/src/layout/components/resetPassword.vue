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
      <div class="logo-r-box regist-box">
        <div class="regist-box-header">
          <div class="regist-h-l">
            <img src="../../img/sidebar/navbar.png" />
            <span>人保财险理赔系统-合作伙伴</span>
          </div>
          <p class="regist-h-r">当前版本为：<span>1.0.3.0</span></p>
        </div>
        <div class="tabs-box">
          <el-tabs  v-model="tabsActive" :before-leave='leaveTab'>
            <el-tab-pane name="resetOne">
              <span slot="label">验证方式一</span>
              <div class="form-box">
                <div class="input-box">
                  <div :class="(isActive==1?'is-focus':'')">
                    <i class="icon-before" :class="(isActive==1?'icon-user-focus':'icon-user')"></i><el-input
                      placeholder="请输入HR码"
                      @focus="activeClass('1')"
                      @blur="blurActive()"
                      v-model="hrCode">
                    </el-input>
                  </div>
                  <div :class="(isActive==2?'is-focus':'')">
                    <i class="icon-before" :class="(isActive==2?'icon-phone-focus':'icon-phone')"></i><el-input
                      placeholder="请输入注册手机号"
                      v-model="mobile"
                      @focus="activeClass('2')"
                      @blur="blurActive()"
                      type="number">
                    </el-input>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="resetTwo">
              <span slot="label">验证方式二</span>
              <div class="form-box">
                <div class="input-box">
                  <div :class="(isActive==1?'is-focus':'')">
                    <i class="icon-before" :class="(isActive==1?'icon-user-focus':'icon-user')"></i><el-input
                      placeholder="请输入姓名"
                      @focus="activeClass('1')"
                      @blur="blurActive()"
                      v-model="userName">
                    </el-input>
                  </div>
                  <div :class="(isActive==2?'is-focus':'')">
                    <i class="icon-before" :class="(isActive==2?'icon-card-focus':'icon-card')"></i><el-input
                      placeholder="请输入身份证号"
                      v-model="identityNo"
                      @focus="activeClass('2')"
                      @blur="blurActive()">
                    </el-input>
                  </div>
                  <div :class="(isActive==2?'is-focus':'')">
                    <i class="icon-before" :class="(isActive==3?'icon-phone-focus':'icon-phone')"></i><el-input
                      placeholder="请输入注册手机号"
                      v-model="mobile"
                      @focus="activeClass('3')"
                      @blur="blurActive()"
                      type="number">
                    </el-input>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="btn-box btn-logo">
          <p class="tip">新密码将会发到您的注册手机</p>
          <el-button class="btn logo-btn" @click="valid()">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       hrCode:"",
       userName:"",
       mobile:"",
       identityNo:"",
       isActive:0,
       tabsActive:"resetOne"
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
     leaveTab(activeName, oldActiveName) {//切换清除input
       this.tabsActive = activeName;
       this.hrCode = "";
       this.userName = "";
       this.mobile = "";
       this.identityNo = "";
     },
     valid(){
       let flag = true;
       if(this.tabsActive == "resetOne"){
         if(this.hrCode == ""){
           this.$message({message: "请输入HR码",center: true});
           return flag = false;
         }
         if(this.mobile == ""){
           this.$message({message: "请输入手机号",center: true});
           return flag = false;
         }
       }else{
         if(this.userName == ""){
           this.$message({message: "请输入姓名",center: true});
           return flag = false;
         }
         if(this.identityNo == ""){
           this.$message({message: "请输入身份证号",center: true});
           return flag = false;
         }
         if(this.mobile == ""){
           this.$message({message: "请输入手机号",center: true});
           return flag = false;
         }
       }
       if(flag){
         this.resetPass();
       }
     },
     resetPass(){//重置密码
       let params = {
         hrCode: this.hrCode,
         userName: this.userName,
         mobile: this.mobile,
         identityNo: this.identityNo,
       }
       let _this = this;
       this.$api.comIterface.resetPassword(params).then(res => {
         if(res.status == "200"){

         }else{
           _this.$message({
             message: res.data.message,
             center: true
           });
         }
       })
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
.tabs-box{
  margin-top: 104px;
}
/deep/ .el-tabs__nav{
  margin-left: 140px;
  margin-bottom: 50px;
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
.icon-card{
  top: 2px;
  position: relative;
  background: url(../../img/icon-card.png) no-repeat;
}
.icon-card-focus{
  top: 2px;
  position: relative;
  background: url(../../img/icon-card-focus.png) no-repeat;
}
.icon-phone{
  top: 1px;
  position: relative;
  background: url(../../img/icon-phone.png) no-repeat;
}
.icon-phone-focus{
  top: 1px;
  position: relative;
  background: url(../../img/icon-phone-focus.png) no-repeat;
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
.regist-box .regist-h-l{
  margin-top: 13px;
  margin-left: 20px;
  display: inline-block;
}
.regist-box .regist-h-r{
  float: right;
  display: inline-block;
  font-size: 12px;
  color: #666666;
  letter-spacing: 0;
  height: 17px;
  line-height: 17px;
  text-align: right;
  padding-right: 21px;
  margin-top: 18px;
  opacity: 0.5;
}
/*tabs*/
.regist-box .regist-tabs {
  margin-top: 20px;
}
.regist-box /deep/ .el-tabs__item.is-active{
  opacity: 1;
}
.regist-box /deep/ .el-tabs__item {
  color: #484848;
  opacity: .5;
  font-size: 16px;
}
.regist-box /deep/ .el-tabs__nav-wrap::after{
  height: 0px;
}
.regist-box /deep/ .el-tabs__active-bar{
  background-color: #FF1A00;
  left: 33px;
  width: 14px !important;
  bottom: 6px;
}
.tip{
  opacity: 0.5;
  font-size: 14px;
  color: #484848;
  letter-spacing: 0;
  height: 20px;
  line-height:20px;
  margin-bottom: 8px;
}
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/deep/ input[type="number"]{
  -moz-appearance: textfield;
}
</style>
