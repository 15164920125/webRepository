<template>
  <div class="content-box">
    <el-form ref="form" :model="xpData">
      <div class="content-list-box">
        <div class=""><div class="box-tip"></div><span class="box-title-text">协陪信息</span></div>
        <div class="from-box">
          <el-row>
            <el-col :span="8"><div class="row-first">协陪任务号</div><div class="from-box-r">{{xpData.taskId}}</div></el-col>
            <el-col :span="8"><div>案件类型</div><div class="from-box-r">{{xpData.caseType}}</div></el-col>
            <el-col :span="8"><div>机构</div><div class="from-box-r">{{xpData.comcode}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="row-first">任务类型</div><div class="from-box-r">{{xpData.taskType}}</div></el-col>
            <el-col :span="8"><div>任务来源</div><div class="from-box-r">{{xpData.taskSource}}</div></el-col>
            <el-col :span="8"><div>任务内容</div><div class="from-box-r">{{xpData.taskContent}}</div></el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <el-form ref="form" :model="noCarCaseInfoVo">
      <div class="content-list-box" style="padding-top: 0;">
        <el-collapse v-model="activeNames">
          <el-collapse-item  name="1">
            <template slot="title">
              <div class=""><div class="box-tip"></div><span class="box-title-text">案件信息</span></div>
            </template>
            <div class="from-box from-p15">
              <el-row>
                <el-col :span="8"><div class="row-first">报案号</div><div class="from-box-r">{{noCarCaseInfoVo.registNo}}</div></el-col>
                <el-col :span="8"><div>案件性质</div><div class="from-box-r">{{noCarCaseInfoVo.caseXz}}</div></el-col>
                <el-col :span="8"><div>险种代码</div><div class="from-box-r">{{noCarCaseInfoVo.riskCode}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="row-first">险种名称</div><div class="from-box-r">{{noCarCaseInfoVo.caseName}}</div></el-col>
                <el-col :span="8"><div>险别代码</div><div class="from-box-r">{{noCarCaseInfoVo.kindCode}}</div></el-col>
                <el-col :span="8"><div>险别名称</div><div class="from-box-r">{{noCarCaseInfoVo.kindName}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="row-first">出险地点</div><div class="from-box-r">{{noCarCaseInfoVo.damageAddress}}</div></el-col>
                <el-col :span="8"><div>出险时间</div><div class="from-box-r">{{noCarCaseInfoVo.damageDate}}</div></el-col>
                <el-col :span="8"><div>报案时间</div><div class="from-box-r">{{noCarCaseInfoVo.reportDate}}</div></el-col>
              </el-row>
              <el-row style="margin-bottom: 0;">
                <el-col :span="8"><div class="row-first">出险原因</div><div class="from-box-r">{{noCarCaseInfoVo.damageName}}</div></el-col>
                <el-col :span="16"><div style="vertical-align: top;">出险经过</div><div class="from-box-r" style="width: 688px;height: 70px;">{{noCarCaseInfoVo.remark}}</div></el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-form>
    <el-form ref="form" :model="noCarCustomerMsgVo">
      <div class="content-list-box" style="padding-top: 0;">
        <el-collapse v-model="activeNames">
          <el-collapse-item  name="2">
            <template slot="title">
              <div class=""><div class="box-tip"></div><span class="box-title-text">客户信息</span></div>
            </template>
            <div class="from-box from-p15 special-input">
              <el-row>
                <el-col :span="8"><div class="row-first">联系人</div><div class="from-box-r">{{noCarCustomerMsgVo.linkerName}}</div></el-col>
                <el-col :span="8"><div>联系人电话</div><div class="from-box-r">{{noCarCustomerMsgVo.linkerNumber}}</div></el-col>
                <el-col :span="8"><div>联系人手机</div><div class="from-box-r">{{noCarCustomerMsgVo.phoneNumber}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="row-first">报案人</div><div class="from-box-r">{{noCarCustomerMsgVo.reportorName}}</div></el-col>
                <el-col :span="8"><div>报案人电话</div><div class="from-box-r">{{noCarCustomerMsgVo.reportorNumber}}</div></el-col>
                <el-col :span="8"><div>保单号</div><div class="from-box-r">{{noCarCustomerMsgVo.policyNo}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="row-first">被保险人</div><div class="from-box-r">{{noCarCustomerMsgVo.insuredName}}</div></el-col>
                <el-col :span="8"><div>承保公司</div><div class="from-box-r">{{noCarCustomerMsgVo.cbgs}}</div></el-col>
                <el-col :span="8"><div>保险期限</div><div class="from-box-r">{{noCarCustomerMsgVo.startEndTime}}</div></el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-form>
    <el-form>
      <div class="content-list-box">
        <div class="box-title"><div class="box-tip"></div><div class="box-title-text"><span>案件照片</span></div>
        <div class="box-title-r">
          <span class="back" @click="backPhotosShow">已提交/退回照片</span>
        </div>
        </div>
        <div class="from-box">
          <el-tabs v-model="tabsActive" :before-leave='leaveTab'>
            <el-tab-pane name="lossWBox">
              <span slot="label">损失照片(物损及其他)</span>
              <div>
                <ul class="preview-box">
                  <li v-for='item in resultLossImgWs'>
                    <img :src="getResultPhotosURL(item.photoSite)">
                  </li>
                  <li v-for='(value, key) in lossImgWs'>
                    <a class="close" @click="delImg(key)">×</a>
                    <img :src="getObjectURL(value)">
                    <el-checkbox v-model="lossImgWsCheck[key]"></el-checkbox>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane name="lossPBox">
              <span slot="label">损失照片(人伤)</span>
              <div>
                <ul class="preview-box">
                  <li v-for='item in resultLossImgs'>
                    <img :src="getResultPhotosURL(item.photoSite)">
                  </li>
                  <li v-for='(value, key) in lossImgs'>
                    <a class="close" @click="delImg(key)">×</a>
                    <img :src="getObjectURL(value)">
                    <el-checkbox v-model="lossImgsCheck[key]"></el-checkbox>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane name="docBox">
              <span slot="label">单证照片</span>
              <div>
                <ul class="preview-box">
                  <li v-for='item in resultDocImgs'>
                    <img :src="getResultPhotosURL(item.photoSite)">
                  </li>
                  <li v-for='(value, key) in docImgs'>
                    <a class="close" @click="delImg(key)">×</a>
                    <img :src="getObjectURL(value)">
                    <el-checkbox v-model="docImgsCheck[key]"></el-checkbox>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane name="otherBox">
              <span slot="label">其他</span>
              <div>
                <ul class="preview-box">
                  <li v-for='item in resultOtherImgs'>
                    <img :src="getResultPhotosURL(item.photoSite)">
                  </li>
                  <li v-for='(value, key) in otherImgs'>
                    <a class="close" @click="delImg(key)">×</a>
                    <img :src="getObjectURL(value)">
                    <el-checkbox v-model="otherImgsCheck[key]"></el-checkbox>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-form>
    <div class="btn submit-btn" :class="pageStatus==true?'':'displayNo'">
      <el-button type="info" round @click="checkAll()">全选/全不选</el-button>
      <el-button type="info" round @click="delAllChecked()">删除选中</el-button>
      <el-button type="info" round style="vertical-align: bottom;">
         <template>
          <div class="file"><input type="file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>上传照片</div>
        </template>
      </el-button>
      <el-button type="info" round @click="uploadAdd()">提交</el-button>
    </div>
    <el-dialog class="dialog-photo" title="已提交/退回照片" :visible.sync="dialogTableVisible">
      <el-tabs v-model="backActive">
        <el-tab-pane name="submitSuccess">
          <span slot="label">已提交</span>
          <div>
            <ul class="preview-box">
              <li v-for='item in resultPhotos'>
                <img :src="getResultPhotosURL(item.photoSite)">
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane name="backPhoto">
          <span slot="label">已退回</span>
          <div>
            <ul class="preview-box">
              <li v-for='item in backPhotos'>
                <img :src="getResultPhotosURL(item.photoSite)">
                <p>退回原因：{{item.photoResolution}}</p>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
const xpData = {
  taskId:'',
  caseType:'非车险',
  comcode:'中国人民财产保险股份有限公司',
  taskType:'协陪任务',
  taskSource:'后台发起',
  taskContent:'通用单证材料'
}
const noCarCaseInfoVo = {
  "damageAddress":"",
  "damageDate":"",
  "damageName":"",
  "kindCode":"",
  "kindName":"",
  "registId":"",
  "registNo":"",
  "remark":"",
  "reportDate":"",
  "riskCode":"",
  "caseXz":"",
  "caseName":""
}
const noCarCustomerMsgVo = {
  "insuredName":"",
  "linkerName":"",
  "linkerNumber":"",
  "phoneNumber":"",
  "policyNo":"",
  "reportorName":"",
  "reportorNumber":"",
  "startEndTime":"",
  "cbgs":"中国人民财产保险股份有限公司"
}
export default {
	data() {
      return {
        registId:"",
        textarea:"",
        dialogTableVisible:false,  //弹窗是否显示
        activeNames:[],//展开收起
        lossImgWs: {},
        lossImgWsCheck:{},
        lossImgs: {},
        lossImgsCheck:{},
        docImgs: {},
        docImgsCheck:{},
        otherImgs: {},
        otherImgsCheck:{},
        tabsActive:"lossWBox",
        backActive:"submitSuccess",
        isCheckAll:false,
        xpData:xpData,
        noCarCaseInfoVo:noCarCaseInfoVo,
        noCarCustomerMsgVo:noCarCustomerMsgVo,
        resultLossImgWs:[],
        resultLossImgs:[],
        resultDocImgs:[],
        resultOtherImgs:[],
        resultPhotos:[],
        backPhotos:[],
        pageType:"",//页面类型  router传过来的type
        pageStatus:true,//页面状态  用于判断是什么类型任务
        registNo:""
    }
  },
  created(){
    this.getType();
  },
  methods: {
    backPhotosShow(){
      this.dialogTableVisible = true;
    },
    getResultPhotosURL(photoSrc){
      return "http://10.10.1.229:8002/ydxp/userPic/image/get?filePath="+photoSrc;
    },
    uploadAdd(){
      // const loading = this.$loading({
      //   lock: true,
      //   text: '加载中……',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      // var that = this;
      // setTimeout(function(){
      //   loading.close()
      //   that.$message({
      //     message: "上传成功！",
      //     type: "success",
      //     center: true
      //   });
      // },3000)
      let _this = this;
      Promise.all([
        this.uploadType("Loss1","lossImgWs"),
        this.uploadType("Loss2","lossImgs"),
        this.uploadType("Doc","docImgs"),
        this.uploadType("Other","otherImgs")])
      .then(function(results){
          console.log(results);
          // this.$message({
          //   message: "上传成功！",
          //   type: "success",
          //   center: true
          // });
          let flag = true;
          for(let i=0,max = results.length;i<max;i++){
            if(results[i] == false){
              flag = false;
              return ;
            }
          }
          if(flag){
            _this.submitTaks();
          }else{
            _this.$message.error({
              message: "照片提交失败",
              center: true
            });
          }
      });
    },
    uploadType(photoType,photoObj){
      let form = new FormData();
      form.append("token","ca202a412f974ff39c56411c9816693f");
      form.append("registId",this.registId);
      form.append("taskId",this.xpData.taskId);
      form.append("remark",photoType);
      form.append("photoTime","");
      form.append("userCode","W0001761");
      for(let key in this[photoObj]){
        form.append(key,this[photoObj][key]);
      }
      this.uploadPhoto(form);
    },
    // 上传图片
    uploadPhoto(params){
      this.$api.comIterface.uploadPhoto(params).then(res=> {
        // 执行某些操作
        if(res.data.success == true){
          return true;
        }else{
          this.$message.error(res.data.message);
        }
      })
    },
    submitTaks(){
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        'subRegistId': this.xpData.taskId,
        "method":"submitTask",
        "userCode": "W0001761",//待取值
      };
      let that = params;
      let _this = this;
      this.$api.mineTaskServer.taskList(params).then(res=> {
        if(res.data.success == true){
          _this.$message({
            message: "上传成功！",
            type: "success",
            center: true
          });
          _this.pageStatus = false;
          sessionStorage.setItem("tempType","2");
          sessionStorage.setItem("tempRegistNo",this.registNo);
          sessionStorage.setItem("tempTaskId",that.subRegistId);
        }else{
          _this.$message({
            message: res.data.message,
            center: true
          });
        }
      })
    },
    listCellClassName({row, column, rowIndex, columnIndex}){
      if(columnIndex === 0){
        return 'clear-cell-pad'
      }
    },
    listCellStyle({row, column, rowIndex, columnIndex}){//控制所有行添加style 返回object
      return {"padding":"0","color":"#484848"}
    },
    headerCellStyle({row, rowIndex}){//控制表头添加style 返回object
      return {"padding":"0","color":"#B2B2B2"};
    },
    headerCellClassName({row, column, rowIndex, columnIndex}){//控制表头添加classname 返回string
      if(columnIndex === 0){
        return 'list-checkbox'
      }
    },
    listRowStyle({row, rowIndex}){//控制所有行添加style 返回object
      return {"height":"30px"};
    },
    isDifferentPlaces(val){
      val == true ? this.formData.distantDamageFlag = 1 : this.formData.distantDamageFlag = 0;
    },
    addImg(event){
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      if(this.tabsActive == "lossPBox"){
        this.$set(this.lossImgs,this.fil[0].name+'?'+new Date().getTime(),this.fil[0]);
        this.$set(this.lossImgsCheck,this.fil[0].name+'?'+new Date().getTime(),false);
      }
      if(this.tabsActive == "lossWBox"){
        this.$set(this.lossImgWs,this.fil[0].name+'?'+new Date().getTime(),this.fil[0]);
        this.$set(this.lossImgWsCheck,this.fil[0].name+'?'+new Date().getTime(),false);
      }
      if(this.tabsActive == "docBox"){
        this.$set(this.docImgs,this.fil[0].name+'?'+new Date().getTime(),this.fil[0]);
        this.$set(this.docImgsCheck,this.fil[0].name+'?'+new Date().getTime(),false);
      }
      if(this.tabsActive == "otherBox"){
        this.$set(this.otherImgs,this.fil[0].name+'?'+new Date().getTime(),this.fil[0]);
        this.$set(this.otherImgsCheck,this.fil[0].name+'?'+new Date().getTime(),false);
      }
    },
    getObjectURL(file) {//预览图片
      var url = null ;
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
    },
    delImg(key){//删除照片
      if(this.tabsActive == "lossPBox"){
        this.$delete(this.lossImgs,key);
        this.$delete(this.lossImgsCheck,key);
      }else if(this.tabsActive == "lossWBox"){
        this.$delete(this.lossImgWs,key);
        this.$delete(this.lossImgWsCheck,key);
      }else if(this.tabsActive == "docBox"){
        this.$delete(this.docImgs,key);
        this.$delete(this.docImgsCheck,key);
      }else if(this.tabsActive == "otherBox"){
        this.$delete(this.otherImgs,key);
        this.$delete(this.otherImgsCheck,key);
      }
    },
    checkAll(){//全选
      console.log(this.isCheckAll)
      console.log(this.tabsActive)
      this.isCheckAll == true ? this.isCheckAll = false : this.isCheckAll = true;
      if(this.tabsActive == "lossPBox"){
        this.forCheckAll("lossImgsCheck");
      }else if(this.tabsActive == "lossWBox"){
        this.forCheckAll("lossImgWsCheck");
      }else if(this.tabsActive == "docBox"){
        this.forCheckAll("docImgsCheck");
      }else if(this.tabsActive == "otherBox"){
        this.forCheckAll("otherImgsCheck");
      }
    },
    forCheckAll(checkedObj){//循环全选
      let flag = this.isCheckAll;
      for(let key in this[checkedObj]){
        if(flag){
          this[checkedObj][key] = true;
        }else{
          this[checkedObj][key] = false;
        }
      }
    },
    delAllChecked(){//删除选中
      if(this.tabsActive == "lossPBox"){
        this.forChecked(this.lossImgsCheck,this.lossImgs);
      }else if(this.tabsActive == "lossWBox"){
        this.forChecked(this.lossImgWsCheck,this.lossImgWs);
      }else if(this.tabsActive == "docBox"){
        this.forChecked(this.docImgsCheck,this.docImgs);
      }else if(this.tabsActive == "otherBox"){
        this.forChecked(this.otherImgsCheck,this.otherImgs);
      }
    },
    forChecked(checkedObj,imgObj){//循环删除
      for(let key in checkedObj){
        if(checkedObj[key] == true){
          this.$delete(imgObj,key);
        }
      }
    },
    leaveTab(activeName, oldActiveName) {
      this.tabsActive = activeName;
      this.isCheckAll = false;
      if(oldActiveName == "lossPBox"){
        this.forCheckAll("lossImgsCheck");
      }else if(oldActiveName == "lossWBox"){
        this.forCheckAll("lossImgWsCheck");
      }else if(oldActiveName == "docBox"){
        this.forCheckAll("docImgsCheck");
      }else if(oldActiveName == "otherBox"){
        this.forCheckAll("otherImgsCheck");
      }
    },
    getType(){//报案 type:1 案件查询 type:2
      let type = this.$route.query.type;
      if(!type || type == ""){
        type = sessionStorage.getItem("tempType")
      }
      this.pageType = type;
      if(type == 1){
        this.getTaskData();
      }else{
        this.getTaskDataDetail();
        this.getTaskDataDetail2();
      }
    },
    getTaskDataDetail(){//获取任务信息
      let taskId = this.$route.query.taskId;
      let registNo = this.$route.query.registNo;
      let type = this.$route.query.type;
      if(!taskId || taskId == ""){
        taskId = sessionStorage.getItem("tempTaskId")
        registNo = sessionStorage.getItem("tempRegistNo")
        type = sessionStorage.getItem("tempType")
      }
      this.registNo = registNo;
      sessionStorage.setItem("tempTaskId",taskId);
      sessionStorage.setItem("tempRegistNo",registNo);
      sessionStorage.setItem("tempType",type);
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        "userCode": "W0001761",
        'subRegistId': taskId,
        "method":"findOneTask"
      };
      this.$api.mineTaskServer.taskList(params).then(res=> {
        if(res.data.success == true){
          this.xpData.taskId = res.data.task.subRegistId;
          this.registId = res.data.regist.registId;
          this.resultPhotos = res.data.photos;
          this.backPhotos = res.data.noPassPhotos;
          let appstatus = res.data.task.appStatus;
          if(appstatus == 2 || appstatus == 4 || appstatus == 5){
            this.pageStatus = false;
          }
        }else{
          this.$message({
            message: res.data.message,
            center: true
          });
        }
      })
    },
    getTaskDataDetail2(){//获取任务信息
      let taskId = this.$route.query.taskId;
      let registNo = this.$route.query.registNo;
      let type = this.$route.query.type;
      if(!taskId || taskId == ""){
        taskId = sessionStorage.getItem("tempTaskId")
        registNo = sessionStorage.getItem("tempRegistNo")
        type = sessionStorage.getItem("tempType")
      }
      sessionStorage.setItem("tempTaskId",taskId);
      sessionStorage.setItem("tempRegistNo",registNo);
      sessionStorage.setItem("tempType",type);
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        'registNo': registNo,
        "userCode": "W0001761",
        "method":"queryNoCarTaskMsgforPc"
      };
      this.$api.mineTaskServer.taskList(params).then(res=> {
        if(res.data.success == true){
          this.noCarCaseInfoVo = res.data.noCarCaseInfoVo;
          this.noCarCaseInfoVo.caseXz="自赔";//留着
          this.noCarCaseInfoVo.caseName="";//留着
          // this.noCarCaseInfoVo.damageDate="2019-08-29 00:00:00";
          // this.noCarCaseInfoVo.reportDate="2019-08-29 00:00:00";
          // this.noCarCaseInfoVo.damageAddress="辽宁省锦州市北镇市大街";
          this.noCarCustomerMsgVo = res.data.noCarCustomerMsgVo;
          // this.noCarCustomerMsgVo.linkerName = "孙伟";
          // this.noCarCustomerMsgVo.reportorName = "孙伟";
          // this.noCarCustomerMsgVo.insuredName = "孙伟";
          // this.noCarCustomerMsgVo.linkerNumber = "13800138000";
          // this.noCarCustomerMsgVo.phoneNumber = "13800138000";
          // this.noCarCustomerMsgVo.reportorNumber = "13800138000";
          this.noCarCustomerMsgVo["cbgs"] = "中国人民财产保险股份有限公司";
          this.desensitization("noCarCustomerMsgVo","phoneNumber");
          this.desensitization("noCarCustomerMsgVo","reportorNumber");
          this.desensitization("noCarCustomerMsgVo","linkerNumber");
        }else{
          this.$message({
            message: res.data.message,
            center: true
          });
        }
        console.log(res.data)
      })
    },
    getTaskData(){//获取任务信息
      let registNo = this.$route.query.registNo;
      if(!registNo || registNo == ""){
        registNo = sessionStorage.getItem("tempRegistNo")
      }
      sessionStorage.setItem("tempRegistNo",registNo);
      sessionStorage.setItem("tempType",this.$route.query.type);
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        'registNo': registNo,
        "userCode": "W0001761",
      };
      this.$api.mineTaskServer.taskDetail(params).then(res=> {
        // 执行某些操作
        if(res.data.success == true){
          this.xpData.taskId = res.data.task.subRegistId;
          this.noCarCaseInfoVo = res.data.noCarCaseInfoVo;
          this.noCarCaseInfoVo.caseXz="自赔";//留着
          this.noCarCaseInfoVo.caseName="";//留着
          // this.noCarCaseInfoVo.damageDate="2019-08-29 00:00:00";
          // this.noCarCaseInfoVo.reportDate="2019-08-29 00:00:00";
          // this.noCarCaseInfoVo.damageAddress="辽宁省锦州市北镇市大街";
          this.noCarCustomerMsgVo = res.data.noCarCustomerMsgVo;
          // this.noCarCustomerMsgVo.insuredName = "孙伟";
          // this.noCarCustomerMsgVo.linkerName = "孙伟";
          // this.noCarCustomerMsgVo.reportorName = "孙伟";
          // this.noCarCustomerMsgVo.linkerNumber = "13800138000";
          // this.noCarCustomerMsgVo.phoneNumber = "13800138000";
          // this.noCarCustomerMsgVo.reportorNumber = "13800138000";
          this.noCarCustomerMsgVo["cbgs"] = "中国人民财产保险股份有限公司";
          this.desensitization("noCarCustomerMsgVo","phoneNumber");
          this.desensitization("noCarCustomerMsgVo","reportorNumber");
          this.desensitization("noCarCustomerMsgVo","linkerNumber");
          // this.noCarCustomerMsgVo.policyNo = "PJCB1997210105B0006709";
        }else{
          this.$message({
            message: res.data.message,
            center: true
          });
        }
        console.log(res.data)
      })
    },
    desensitization(obj,key){//手机号脱敏
      let reg = /(\d{3})\d*(\d{4})/;
      if(obj){
        this[obj][key] = this[obj][key].replace(reg,'$1****$2');
      }else{
        this[key] = this[key].replace(reg,'$1****$2');
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .result-box{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .content-list-box{
    margin-bottom: 11px;
  }
  .content-list-box .box-title-no{
    border-bottom: none;
  }
  .submit-btn{
    margin-top: 39px;
    margin-bottom: 30px;
  }
  .from-p15{
    padding-bottom: 15px;
  }
  .data-picker{
    width:113px !important;
  }
  .data-picker div{
    width:113px !important;
  }
  /deep/ .el-collapse{
    border:none;
  }
  /deep/ .el-collapse-item__header{
    height: 54px;
    line-height: 54px;
  }
  .el-collapse .box-tip{
    margin-top: 22px;
  }
  .el-collapse .box-title-text{
    margin-bottom: 0;
  }
  .special-input /deep/ .el-row .el-col input{
    color: #FF1A00;
  }
  .from-box .el-row .el-col > div:nth-child(1){
    width: 110px !important;
    color:#B2B2B2;
    vertical-align: top;
  }
  .from-box /deep/ .el-row {
    min-height:26px;
    height:auto;
  }
  .from-box .el-row .el-col /deep/ .data-picker input {
    width:100% !important;
    padding-left: 15px;
    padding-right: 20px;
  }
  .from-box .from-box-r{
    width: 210px;
    border: 1px solid #E4E7ED;
    border-radius: 4px;
    margin-left: 20px;
    min-height: 26px;
    padding-right:20px;
	  background-color: #F2F2F2;
  }
  .time-picker div{
    padding-left: 0px !important;
    width:93px !important;
  }
  /deep/ .data-picker .el-input__prefix{
    left: auto;
    right: 3px;
    top: -6px;
    color: #4087F6;
  }
  .from-box .el-row .el-col /deep/ .time-picker{
    padding-left: 0;
  }
  .from-box .el-row .el-col /deep/ .time-picker input {
    width:100% !important;
    padding-left: 15px;
    padding-right: 20px;
  }
  .box-button{
    text-align: center;
    margin: 30px 0;
  }
  .dialog-css .dialog-title{
    font-size: 20px;
    color: #000000;
    font-weight: bold;
  }
  .btn-initiate-xp{
    width: 100px;
    height: 24px;
    line-height: 20px;
    background: #484848;
    border-radius: 20px;
    color: #fff;
    font-size: 10px;
    padding: 0;
  }
  .preview-box li{
    position:relative;
    width: 230px;
    height:160px;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 15px;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
  }
  .preview-box li a.close{
    position: absolute;
    right: 0;
    background: #FF1A00;
    border-radius: 2px;
    color: #fff;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    display: inline-block;
    font-size: 18px;
    border-top-right-radius: 4px;
  }
  .preview-box li img{
    width: 230px;
    height:160px;
    background-size: 100%;
    border-radius: 4px;
  }
  .box-title-r{
    display: inline-block;
    float: right;
  }
  .box-title-r .back{
    display: inline-block;
    width: 110px;
    border: 1px solid #656566;
    border-radius: 22px;
    height: 22px;
    line-height: 20px;
    text-align: center;
    font-size: 10px;
    cursor: pointer;
  }
  .dialog-photo .preview-box li{
    margin-right: 30px;
    height: auto;
    border: 0;
  }
  .dialog-photo .preview-box li:nth-child(3n+3){
    margin-right:0;
  }
  .dialog-photo /deep/ .el-dialog__body{
    padding-top: 0;
  }
  .preview-box /deep/ .el-checkbox{
    position: absolute;
    bottom: -3px;
    right: -1px;
    border-radius: 4px;
  }
  .preview-box /deep/ .el-checkbox__inner{
    width: 14px !important;
    height: 14px !important;
    border-radius: 0 !important;
    border-bottom-right-radius: 4px !important;
  }
  .displayNo{
    display: none;
  }
  .file{
    width: 100px;
    height: 26px;
    line-height: 25px;
    text-align: center;
    position: relative;
    cursor: pointer;
  }
  .file input{
    width: 100px;
    height: 25px;
    opacity:0;
    filter:alpha(opacity=0);
    position:absolute;
    left:0;
    top:0;
    font-size:0;
    cursor: pointer;
  }
  /deep/ .el-tabs__nav{
    margin-left: 0;
  }
  /deep/ .el-tabs__item{
    padding: 0 10px;
    color:#B2B2B2;
  }
  /deep/ .el-tabs__active-bar,
  /deep/ .el-tabs__nav-wrap::after{
    height: 0;
    background: none;
  }
  .from-box /deep/ .el-checkbox__inner{
    width: 12px;
    height: 12px;
    border-radius: 12px;
  }
  .from-box /deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
    border-color: #DCDFE6;
  }
  .from-box /deep/ .el-checkbox__inner::after{
    border: none;
  }
  .from-box /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .from-box /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #FF1A00;
    border-color: #DCDFE6;
  }
  .from-box /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: none;
  }
  /deep/ .data-picker .el-input__suffix,
  /deep/ .time-picker .el-input__suffix,
  /deep/ .time-picker .el-input__prefix{
    display: none;
  }
  /deep/ .el-input.is-disabled .el-input__inner,
  /deep/ .el-textarea.is-disabled .el-textarea__inner{
    background: #fff;
    color: initial;
  }
</style>
