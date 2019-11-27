<template>
  <div class="bg-img">
    <div class="regist-box">
      <div class="regist-box-header">
        <div class="regist-h-l">
          <img src="../../img/sidebar/navbar.png" />
          <span>人保财险理赔系统-合作伙伴</span>
        </div>
        <p class="regist-h-r">当前版本为：<span>1.0.3.0</span></p>
      </div>
      <div class="regist-tabs" :class="dialogTableVisible==false? '' : 'displayNo'">
          <el-tabs  v-model="tabsActive" :before-leave='leaveTab'>
            <el-tab-pane name="hrRegist">
              <span slot="label">HR编号注册</span>
              <div class="form-box">
                <el-form :rules="rules" ref="HRRuleForm" label-width="100px" :inline="true" :model="HRformData" class="demo-form-inline demo-ruleForm">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="人员分类" prop="userType">
                        <el-select v-model="HRformData.userType" class="no-arrow" placeholder="请选择人员分类">
                          <el-option
                            v-for="item in userTypeArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="姓名" prop="userName">
                        <el-input v-model="HRformData.userName" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="身份证号" prop="identityNo">
                        <el-input v-model="HRformData.identityNo" type="text" placeholder="请输入身份证号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="HR编码" prop="hrCode">
                        <el-input v-model="HRformData.hrCode" placeholder="请输入HR编码"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="HRformData.mobile" type="number" placeholder="请输入手机号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="微信号" prop="wechat">
                        <el-input v-model="HRformData.wechat" placeholder="请输入微信号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="HRformData.email" placeholder="请输入邮箱"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="服务区域" prop="serviceArea">
                        <el-input v-model="HRformData.serviceArea" placeholder="请输入服务区域"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="HRformData.password" type="password" placeholder="请输入密码" show-password></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="确认密码" prop="passwordtwo">
                        <el-input v-model="HRformData.passwordtwo" type="password" placeholder="请输入确认密码" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane name="mobileRegist">
              <span slot="label">手机号注册</span>
              <div class="form-box">
                <el-form :rules="rules" ref="mobileRuleForm" label-width="100px" :inline="true" :model="mobileFormData" class="demo-form-inline demo-ruleForm">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="人员分类" prop="userType">
                        <el-select v-model="mobileFormData.userType" class="no-arrow" placeholder="请选择人员分类">
                          <el-option
                            v-for="item in userTypeArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="姓名" prop="userName">
                        <el-input v-model="mobileFormData.userName" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="身份证号" prop="identityNo">
                        <el-input v-model="mobileFormData.identityNo" type="number" placeholder="请输入身份证号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="mobileFormData.mobile" type="number" placeholder="请输入手机号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="微信号" prop="wechat">
                        <el-input v-model="mobileFormData.wechat" placeholder="请输入微信号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="mobileFormData.email" placeholder="请输入邮箱"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="所在地" prop="area">
                        <el-input v-model="mobileFormData.area" placeholder="请输入所在地"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="机构" prop="companyCode">
                        <el-input v-model="mobileFormData.companyCode" placeholder="请输入机构"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="服务区域" prop="serviceArea">
                        <el-input v-model="mobileFormData.serviceArea" placeholder="请输入服务区域"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="mobileFormData.password" type="password" placeholder="请输入密码" show-password></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="确认密码" prop="passwordtwo">
                        <el-input v-model="mobileFormData.passwordtwo" type="password" placeholder="请输入确认密码" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="身份证照片" required class="file-box" :show-message="!isFrontIdCard">
                        <el-form-item label="" prop="frontIdCard" :rules="frontIdCard == ''?rules.frontIdCard:[{ required: false }]">
                        <div class="inlineBlock" v-model="mobileFormData.frontIdCard" :class="(isFrontIdCard==true?'isTrue':'')">
                          <div class="avatar-uploader">
                            <div v-if="frontIdCard">
                              <div class="el-upload__tip">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="file-tip">点击上传身份证正面照</div>
                                <input type="file" class="upload" @change="addImg('frontIdCard')" ref="frontIdCard" accept="image/png,image/jpeg,image/gif,image/jpg"/>
                              </div>
                              <img :src="frontIdCard">
                            </div>
                            <div v-else class="el-upload__tip">
                              <i class="el-icon-plus avatar-uploader-icon"></i>
                              <div class="file-tip">点击上传身份证正面照</div>
                              <input type="file" class="upload" @change="addImg('frontIdCard')" ref="frontIdCard" accept="image/png,image/jpeg,image/gif,image/jpg"/>
                            </div>
                          </div>
                        </div>
                        </el-form-item>
                        <el-form-item label="" style="margin-left: 10px;" prop="backIdCard" :rules="backIdCard == ''?rules.backIdCard:[{ required: false }]">
                        <div class="inlineBlock" v-model="mobileFormData.backIdCard" :class="(isBackIdCard==true?'isTrue':'')">
                          <div class="avatar-uploader">
                            <div v-if="backIdCard">
                              <div class="el-upload__tip">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="file-tip">点击上传身份证反面照</div>
                                <input type="file" class="upload" @change="addImg('backIdCard')" ref="backIdCard" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
                              </div>
                              <img :src="backIdCard">
                            </div>
                            <div v-else class="el-upload__tip">
                              <i class="el-icon-plus avatar-uploader-icon"></i>
                              <div class="file-tip">点击上传身份证反面照</div>
                              <input type="file" class="upload" @change="addImg('backIdCard')" ref="backIdCard" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
                            </div>
                          </div>
                        </div>
                        </el-form-item>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
      </div>
      <div class="clause-box" :class="dialogTableVisible==false? 'displayNo' : ''">
        <h1>用户注册须知条款</h1>
        <p class="clause-title">一、总则</p>
        <p class="clause-text">1.1 移动协赔系统的所有权和运营权归中国人民财产保险股份有限公司所有。</p>
        <p class="clause-text">1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与移动协赔系统之间自动形成协议关系，用户应当受本协议的约束。</p>
        <p class="clause-title">二、用户帐号</p>
        <p class="clause-text">2.1 经注册系统完成注册程序并通过后台审核通过的用户即成为正式用户，可以获得我司规定用户所应享有的一切权限；移动协赔系统有权对会员的权限设计进行变更。</p>
        <p class="clause-text">2.2 用户只能按照注册要求使用真实姓名，及身份证号等信息注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，我司不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请联系系统管理员。</p>
        <p class="clause-title">三、信息保密</p>
        <p class="clause-text">3.1 本系统正式用户需要对系统中涉及中国人民财产保险股份有限公司客户信息（包括客户姓名、联系方式、车辆信息等）进行严格保密，未经允许，不得泄露。</p>
        <p class="clause-text">3.2 本系统不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在我司的非公开内容，但下列情况除外：</p>
        <p class="clause-text">(1)事先获得用户的明确授权</p>
        <p class="clause-text">(2)根据有关的法律法规要求</p>
        <p class="clause-text">(3)按照相关政府主管部门的要求</p>
        <p class="clause-text">(4)为维护社会公众的利益</p>
        <p class="clause-text">3.3 我司保留对违反本协议中信息保密规定的用户账号进行停用、注销等措施。</p>
        <p class="clause-title">四、版权声明</p>
        <p class="clause-text">4.1 我司的文字、图片、音频、视频等版权均归中国人民财产保险股份有限公司，未经我司许可，不得任意转载。</p>
        <p class="clause-text">4.2 我司特有的标识、版面设计、编排方式等版权均属中国人民财产保险股份有限公司享有，未经我司许可，不得任意复制或转载。 </p>
        <p class="clause-title">五、附则</p>
        <p class="clause-text">5.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
        <p class="clause-text">5.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
        <p class="clause-text">5.3 本协议解释权及修订权归中国人民财产保险股份有限公司所有。</p>
        <div class="regist-btn">
          <el-button class="regist-agree" @click="dialogTableVisible = false;radio = true">同意</el-button>
          <el-button class="regist-noagree" @click="dialogTableVisible = false;radio = false">不同意</el-button>
        </div>
      </div>
      <div class="regist-btn" :class="dialogTableVisible==false? '' : 'displayNo'">
        <el-checkbox v-model="radio"></el-checkbox><span class="clause" @click="dialogTableVisible = true">用户注册须知条款</span>
        <el-button class="regist-submit" @click="validateForm()">确认注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
 import rules from '../../utils/validRegist'
 const HRformData = {
  "userFlag":0,
  "companyCode":""
 };
 const mobileFormData = {
  "userFlag":1
 };
const rulesType = {
  type:"hrRegist"
}
let validatePass2 = (rule, value, callback) => {
 if (rulesType.type == "hrRegist" && HRformData.password && value !== HRformData.password) {
   callback(new Error('两次输入密码不一致!'));
 } else if (rulesType.type == "mobileRegist" && mobileFormData.password && value !== mobileFormData.password) {
   callback(new Error('两次输入密码不一致!'));
 }else{
   callback();
 }
};
 export default {
   data() {
     return {
       dialogTableVisible: false,
       tabsActive:"hrRegist",
       HRformData:HRformData,
       mobileFormData:mobileFormData,
       radio:'',
       frontIdCard: '',
       isFrontIdCard: false,
       isBackIdCard: false,
       backIdCard: '',
       userTypeArr:[],
       rules: {
         userType: [{ required: true, message: '请选择人员分类', trigger: 'change' }],
         userName: [
           { required: true, message: '请输入姓名', trigger: 'blur' },
           {validator: rules.RegistValid.valid().userNameValid, trigger: "blur" } // 自定义校验
         ],
         identityNo: [
           { required: true, message: '请输入身份证号', trigger: 'blur' },
           {validator: rules.RegistValid.valid().identityNoValid, trigger: "blur" } // 自定义校验
         ],
         hrCode: [
           { required: true, message: '请输入HR编码', trigger: 'blur' },
           {validator: rules.RegistValid.valid().hrCodeValid, trigger: "blur" }
         ],
         mobile: [
           { required: true, message: '请输入手机号', trigger: 'blur' },
           {validator: rules.RegistValid.valid().mobileValid, trigger: "blur" } // 自定义校验
         ],
         email : [{validator: rules.RegistValid.valid().emailValid, trigger: "blur" }],
         serviceArea : [{validator: rules.RegistValid.valid().serviceAreaValid, trigger: "blur" }],
         companyCode: [{ required: true, message: '请输入机构', trigger: 'blur' },],
         password: [
           { required: true, message: '请输入密码', trigger: 'blur' },
           {validator: rules.RegistValid.valid().passwordValid, trigger: "blur" }
         ],
         passwordtwo: [
           { required: true, message: '请输入确认密码', trigger: 'blur' },
           {validator: validatePass2, trigger: "blur" },
         ],
         frontIdCard: [{required: true, message: '请上传身份证正面照', trigger: 'change' }],
         backIdCard: [{required: true, message: '请上传身份证反面照', trigger: 'change' }]
       }
     }
   },
   watch:{
     frontIdCard: function(){
      this.$nextTick(()=>{
        this.$refs.ruleForm.clearValidate('frontIdCard')
      });
     },
     backIdCard: function(){
       this.$nextTick(()=>{
         this.$refs.ruleForm.clearValidate('backIdCard')
       });
     }
   },
   created() {
     if(JSON.stringify(returnCitySN)=='{}'){
       this.$message({
         message: "定位失败！",
         center: true
       });
     }else{
       this.HRformData.companyCode = returnCitySN.cid;
       this.mobileFormData.companyCode = returnCitySN.cid;
     }
     this.userTypeList();
   },
   methods:{
     addImg(type){//添加照片
       let inputDOM = this.$refs[type];
       // 通过DOM取文件数据
       let file = inputDOM.files[0];
       var url = null ;
       if (window.createObjectURL!=undefined) { // basic
         url = window.createObjectURL(file) ;
       } else if (window.URL!=undefined) { // mozilla(firefox)
         url = window.URL.createObjectURL(file) ;
       } else if (window.webkitURL!=undefined) { // webkit or chrome
         url = window.webkitURL.createObjectURL(file) ;
       }
       this[type] = url;
       this.mobileFormData[type] = file;
       if(type == "frontIdCard"){
         this.isFrontIdCard = true;
       }else{
         this.isBackIdCard = true;
       }
     },
     validateForm(){//验证表单
        let formType = "";
        if(this.tabsActive == "hrRegist"){
          formType = "HRRuleForm";
        }else{
          formType = "mobileRuleForm";
        }
        this.$refs[formType].validate((valid) => {
          if (valid) {
            if(this.radio == true){//是否勾选用户须知
              if(formType == "HRRuleForm"){
                this.submitRegist("HRformData")
              }else{
                let _this = this;
                this.imgToBase64(this["mobileFormData"]["frontIdCard"],function(data){
                  _this["mobileFormData"]["frontIdCard"] = data;
                  _this.imgToBase64(_this["mobileFormData"]["backIdCard"],function(data){
                    _this["mobileFormData"]["backIdCard"] = data;
                    _this.submitRegist("mobileFormData")
                  });
                });
              }
            }else{
              this.$message({
                message: "请确认勾选用户注册须知条款",
                center: true
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     },
     submitRegist(formDataType){
       // this[formDataType]
       this[formDataType]["method"] = "register";
       let params = this[formDataType];
       let _this = this;
       this.$api.comIterface.submitRegist(params).then(res=> {
         console.log(res)
          if(res.data.success == true){
          }else{
            _this.$message({
              message: res.data.message,
              center: true
            });
          }
      })
     },
     imgToBase64(imgFile,callback){
        var reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = function (e) {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          callback(imgcode)
        }
     },
     userTypeList(){//人员分类
       let params = {
         codeItemId:"XIEPEI_TYPE",
         method:"userTypeList"
       }
       let _this = this;
       this.$api.comIterface.userTypeList(params).then(res=> {
           if(res.status == "200"){
             let userTypeList = res.data.list;
             for (let i = 0; i < userTypeList.length; i++) {
               let key = userTypeList[i].codeId;
               let value = userTypeList[i].codeName;
               let obj = {value:key,label:value}
               this.userTypeArr.push(obj);
             }

           }else{
             _this.$message({
               message: res.data.message,
               center: true
             });
           }
       })
     },
     leaveTab(activeName, oldActiveName) {//切换清楚验证报错
       this.$nextTick(()=>{
         if(oldActiveName == "hrRegist"){
           this.$refs["HRRuleForm"].clearValidate()
         }else{
           this.$refs["mobileRuleForm"].clearValidate()
         }
       });
       this.tabsActive = activeName;
       rulesType.type = activeName;
     },
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
  overflow: auto;
}
.displayNo{
  display: none;
}
.clause-box{
  margin-top: 36px;
}
.clause-box h1{
  font-size: 18px;
  color: #222222;
  height: 25px;
  line-height:25px;
  font-weight: normal;
}
.clause-box .clause-title{
  font-size: 12px;
  color: #444444;
  height: 17px;
  line-height:17px;
}
.clause-box .clause-text{
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  line-height: 20px;
}
.clause-box .regist-agree,
.clause-box .regist-noagree{
  width: 210px;
  height: 38px;
  line-height: 38px;
  padding: 0;
  border-radius: 19px;
  font-size: 14px;
}
.clause-box .regist-agree{
  background: #FF4B38;
  color: #FFFFFF;
}
.clause-box .regist-noagree{
  border: 1px solid #FF4B38;
  color: #FF4B38;
}
.clause-box .regist-btn{
  margin-bottom: 38px;
}
.clause-box /deep/ .regist-noagree.el-button:focus,
.clause-box /deep/ .regist-noagree.el-button:hover{
  background: #FFFFFF;
}
.regist-box{
  width: 1084px;
  min-width: 1084px;
  margin: 0 auto;
  margin-top: 66px;
  border-radius: 20px;
  padding: 0 20px 0 47px;
  background-color: #FFFFFF;
  overflow: hidden;
}
.regist-box .regist-h-l{
  margin-top: 17px;
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
  margin-top: 20px;
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
  left: 37px;
  width: 14px !important;
  bottom: 6px;
}
/*表单样式*/
.form-box{
  margin-top: 14px;
  background: #F2F2F2;
  padding-top: 16px;
}
.form-box /deep/ .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,
.form-box /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
  margin-right: 0;
  position: relative;
  top: 2px;
}
.form-box /deep/ .el-form-item__label{
  /* margin-left: 35px; */
  padding-right:20px;
  line-height: 26px;
  font-weight: normal;
}
.form-box /deep/ .el-form-item__content{
  line-height:26px;
  width: 210px;
}
.form-box /deep/ .el-input__inner{
  height:26px;
  line-height:24px;
}
.form-box .data-picker,
.form-box .time-picker{
  display: inline-block;
}
.form-box .data-picker /deep/ .el-input--prefix .el-input__inner,
.form-box .time-picker /deep/ .el-input--prefix .el-input__inner{
  padding-left: 10px;
}
.form-box .data-picker /deep/ .el-input--suffix .el-input__inner,
.form-box .time-picker /deep/ .el-input--suffix .el-input__inner{
  padding-right: 20px;
}
.form-box /deep/ .el-input--suffix{
  height: 24px;
  line-height: 24px;
}
.form-box /deep/ .el-input__icon{
  line-height: 24px;
}
.form-box /deep/ input::-webkit-outer-spin-button,
.form-box /deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.form-box /deep/ input[type="number"]{
  -moz-appearance: textfield;
}
.regist-box .regist-btn {
  margin-top: 38px;
  text-align: center;
}
.regist-box .regist-btn .el-radio {
  font-size: 10px;
  color: #F2F2F2;
}
.regist-btn .regist-submit{
  display: block;
  padding: 0;
  width: 210px;
  height:38px;
  line-height: 38px;
  background: #FF4B38;
  color: #FFFFFF;
  font-size: 14px;
  text-align: center;
  border-radius: 19px;
  margin: 10px auto 38px;
}
.file-box /deep/ .el-form-item__content{
  height: 90px;
  width: auto !important;
}
/deep/ .file-box .el-form-item{
  margin-right: 0;
}
.avatar-uploader{
  width: 130px;
  height: 90px;
  display: inline-block;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #ffffff;
  position: relative;
}
.avatar-uploader img{
  width: 128px;
  height: 88px;
  position: relative;
  border-radius: 4px;
}
.avatar-uploader input {
  opacity: 0;
  height: 90px;
  width: 130px;
  position: relative;
  top: -90px;
  cursor: pointer;
  line-height: 90px;
  font-size:0;
}
.file-box /deep/ .inlineBlock{
  height: 90px;
  width: 130px;
}
.file-box /deep/ .inlineBlock.isTrue .avatar-uploader{
  position: absolute;
  top: 0;
}
.file-box /deep/ .inlineBlock.isTrue .el-upload__tip{
  z-index: 99;
  position: absolute;
  top: 0;
  width: 130px;
  display: none;
}
.file-box /deep/ .inlineBlock.isTrue:hover .el-upload__tip{
  display: block;
}
.avatar-uploader /deep/ .el-upload__tip{
  margin: 0;
  height: 90px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #e0e0e0;
  text-align: center;
  width: 130px;
  position: relative;
  padding-top: 20px;
  cursor: pointer;
}
.file-tip{
  text-align: center;
  color: #e0e0e0;
  padding-top: 10px;
  cursor: pointer;
}
.regist-btn /deep/ .el-checkbox__inner{
  border-radius: 100%;
}
.regist-btn /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
  color: #484848;
}
.regist-btn /deep/ .clause{
  opacity: 0.8;
  font-size: 10px;
  color: #484848;
  display: inline-block;
  margin-left: 5px;
}
.regist-btn /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.regist-btn /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #FF4B38;
  border-color: #FF4B38;
}
.regist-btn /deep/ .el-checkbox__inner::after{
  display: none;
}
</style>
