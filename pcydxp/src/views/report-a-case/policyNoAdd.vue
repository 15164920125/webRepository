<template>
  <div class="content-box">
  	<div class="content-list-box result-box">
  	  <div class="box-title"><div class="box-tip"></div><span class="box-title-text">保单信息</span></div>
  	  <div class="box-list">
  	    <el-table :data="tableData"
  	      style="width: 100%;font-size:12px;"
  	      :row-style="listRowStyle"
  	      :cell-style="listCellStyle"
  	      :header-cell-style="headerCellStyle"
  	      :header-cell-class-name="headerCellClassName"
          :cell-class-name="listCellClassName">
  	      <el-table-column prop="policyNo" label="保单号" width="183"></el-table-column>
          <el-table-column prop="insuredname" label="被保险人" width="100"></el-table-column>
  	      <el-table-column prop="insuredflag" label="客户等级" width="120"></el-table-column>
  	      <el-table-column prop="startdate" label="起保日期" width="170"></el-table-column>
  	      <el-table-column prop="enddate" label="终保日期" width="158"></el-table-column>
  	      <el-table-column prop="startdate" label="签单日期" width="139"></el-table-column>
  	      <el-table-column prop="comCode" label="承保机构" width="143"></el-table-column>
          <el-table-column prop="insuredname" label="产品名称"></el-table-column>
  	    </el-table>
  	  </div>
  	</div>
    <el-form :rules="rules" ref="ruleForm" label-width="100px" :inline="true" :model="formData" class="demo-form-inline demo-ruleForm">
      <div class="content-list-box">
        <div class=""><div class="box-tip"></div><span class="box-title-text">报案信息</span></div>
        <div class="form-box">
          <el-row>
            <el-col :span="8">
              <el-form-item label="报案人" prop="reporterName">
                <el-input v-model="formData.reporterName" @input="relatedVal" placeholder="请输入报案人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报案人电话" prop="reporterPhone">
                <el-input v-model="formData.reporterPhone" type="number" @input="relatedVal" placeholder="请输入报案人电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出险时间" required>
                <div class="data-picker">
                  <el-form-item prop="damageDate">
                    <el-date-picker
                      v-model="formData.damageDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="time-picker">
                  <el-form-item prop="damageHour">
                    <el-time-picker
                      v-model="formData.damageHour"
                      :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                      }"
                      placeholder="选择时间">
                    </el-time-picker>
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人" prop="contactName">
                <el-input v-model="formData.contactName" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人电话" prop="contactPhone">
                <el-input v-model="formData.contactPhone" placeholder="请输入联系人电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出险原因" prop="damageReasonCode">
                <el-select v-model="formData.damageReasonCode" class="no-arrow" placeholder="请选择出险原因">
                  <el-option
                    v-for="item in damageCodeArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="被保险人" prop="insuredName">
                <el-input v-model="formData.insuredName" placeholder="请输入被保险人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="content-list-box">
        <div class=""><div class="box-tip"></div><span class="box-title-text">出险信息</span></div>
        <div class="form-box from-p15">
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否有人伤">
                <div class="radio-input-warp">
                  <el-input placeholder="输入数量" class="input-1" v-model="formData.personInjuredNum" :disabled="formData.personLossFlag == 0">
                    <template slot="prepend"><el-button class="radio-input-btn" v-model="formData.personLossFlag" @click="checkRadio('personLossFlag',formData.personLossFlag)" ref="personLossFlag">否</el-button></template>
                    <template slot="append">伤</template>
                  </el-input><el-input placeholder="输入数量" class="input-2" v-model="formData.personDeadNum" :disabled="formData.personLossFlag == 0">
                    <template slot="append">亡</template>
                  </el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否有人尚在医院治疗" prop="treatmentFlag" class="max-form-item">
                <el-button class="btn-radio" v-model="formData.treatmentFlag" @click="checkRadio('treatmentFlag',formData.treatmentFlag)" ref="treatmentFlag">是</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否有物损" prop="propLossFlag">
                <div class="radio-input-warp">
                  <el-form-item
                  prop="lossItemName"
                  :rules="propLossFlagTemp === false?rules.lossItemName:[{ required: false, message: '请输入物损名称', trigger: 'blur' }]"
                  >
                    <el-input placeholder="请输入物损名称" v-model="formData.lossItemName" :disabled="propLossFlagTemp">
                      <template slot="prepend"><el-button class="radio-input-btn" v-model="formData.propLossFlag" @click="checkRadio('propLossFlag',formData.propLossFlag)" ref="propLossFlag">否</el-button></template>
                    </el-input>
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="relation-box">
              <el-form-item label="出险地点" class="form-item-100" required>
              <div class="leaves-box">
                <el-form-item prop="damageAddrProv">
                <el-select v-model="formData.damageAddrProv" @change="currentSel($event,'damageAddrProv')" placeholder="省">
                  <el-option
                    v-for="item in arrayProvince"
                    :key="item.codeCode"
                    :label="item.codeCname"
                    :value="item.codeCode">
                  </el-option>
                </el-select></el-form-item>
                <el-form-item prop="damageAddrCity"><el-select v-model="formData.damageAddrCity" @change="currentSel($event,'damageAddrCity')" placeholder="市">
                  <el-option
                    v-for="item in DarrayCity"
                    :key="item.codeCode"
                    :label="item.codeCname"
                    :value="item.codeCode">
                  </el-option>
                </el-select></el-form-item>
                <el-form-item prop="damageAddrCounty"><el-select v-model="formData.damageAddrCounty" @change="currentSel($event,'damageAddrCounty')" placeholder="县">
                  <el-option
                    v-for="item in DarrayCounty"
                    :key="item.codeCode"
                    :label="item.codeCname"
                    :value="item.codeCode">
                  </el-option>
                </el-select>
                </el-form-item><el-form-item prop="damageAddrDetail">
                <el-input class="relationInput max-input" style="width:342px;" @input="relatedVal" v-model="formData.damageAddrDetail" placeholder="详细地址"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="relation-box">
              <el-form-item label="查勘地点" class="form-item-100">
              <div class="leaves-box">
                <el-form-item>
                <el-select v-model="formData.checkAddrProv" @change="currentSel($event,'checkAddrProv')" placeholder="省">
                  <el-option
                    v-for="item in arrayProvince"
                    :key="item.codeCode"
                    :label="item.codeCname"
                    :value="item.codeCode">
                  </el-option>
                </el-select></el-form-item>
                <el-form-item><el-select v-model="formData.checkAddrCity" @change="currentSel($event,'checkAddrCity')" placeholder="市">
                  <el-option
                    v-for="item in DarrayCity"
                    :key="item.codeCode"
                    :label="item.codeCname"
                    :value="item.codeCode">
                  </el-option>
                </el-select></el-form-item>
                <el-form-item><el-select v-model="formData.checkAddrCounty" @change="currentSel($event,'checkAddrCounty')" placeholder="县">
                  <el-option
                    v-for="item in DarrayCounty"
                    :key="item.codeCode"
                    :label="item.codeCname"
                    :value="item.codeCode">
                  </el-option>
                </el-select>
                </el-form-item><el-form-item>
                <el-input class="relationInput max-input" style="width:342px;" @input="relatedVal" v-model="formData.checkAddrDetail" placeholder="详细地址"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="生成出险过程" class="remark-label">
                <div style="width:691px;">
                  <el-input
                    style="width:100%;"
                    type="textarea"
                    :rows="3"
                    resize="none"
                    placeholder="请输入生成出险过程"
                    v-model="formData.remark">
                  </el-input></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报损金额">
                <div class="no-inline-block money-box">
                  <el-input v-model="formData.estiLossAmount" @change="oninput" type="number" placeholder="请输入报损金额" class="input-with-select money-warp">
                    <el-select v-model="formData.estiCurrency" slot="append" placeholder="请选择" class="money-warp-option">
                      <el-option
                        v-for="item in estiCurrencyArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item label="异地出险">
                <el-checkbox v-model="formData.distantDamageFlagTemp" @change="isDifferentPlaces"></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div class="btn submit-btn">
      <el-button type="info" round @click="validateForm()">提交</el-button>
    </div>
    <el-dialog
    	width="356px"
    	custom-class="dialog-css"
      :before-close="closeThis"
    	:show-close=true
      :close-on-click-modal=false
    	:visible.sync="dialogTableVisible">
      <div>
      	<p class="dialog-title">报案成功</p>
      	<div class="station-img">
      		<img src="../../img/dialog-success.png" />
      	</div>
      	<p class="dialog-text">报案号：{{registNo}}</p>
      </div>
      <div class="box-button">
      	<el-button class="btn el-button btn-initiate-xp" type="info" round @click="initiateXp()">发起协陪</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as mdUtils from '../../utils/claimpartnerUtils'
  let adressObj = {d:{},c:{}};//保存省市县名称
  const formData = {
    "reporterName":"",//报案人
    "reporterPhone":"",//报案人电话
    "damageTime":"",//出险时间
    "damageDate":mdUtils.dateFormat(new Date(),"yyyy-MM-dd"),//出险时间日期
    "damageHour":new Date(),//出险时间Time
    "contactName":"",//联系人
    "contactPhone":"",//联系人电话
    "damageReasonCode":"",//出险原因代码
    "insuredName":"",//被保险人
    "damageAddrProv":"",//出险地点省级行政机构代码
    "damageAddrCity":"",//出险地点市级行政机构代码
    "damageAddrCounty":"",//出险地点县级行政机构代码
    "damageAddrDetail":"",//出险地点详细地址
    "checkAddrProv":"",//查勘地点省级行政机构代码
    "checkAddrCity":"",//查勘地点市级行政机构代码
    "checkAddrCounty":"",//查勘地点县级行政机构代码
    "checkAddrDetail":"",//查勘地点详细地址
    "personLossFlag":0,//0-否1-是  是否有人伤
    "personInjuredNum":"",//人伤数
    "personDeadNum":"",//人亡数
    "treatmentFlag":1,//0-否1-是 是否有人尚在住院治疗
    "propLossFlag":0,//0-否1-是 是否有物损
    "lossItemName":"",//物损名称
    "distantDamageFlag":0,//0-否1-是 是否异地出险
    "distantDamageFlagTemp":false,//是否异地出险 显示名称
    "estiLossAmount":"",//报损金额
    "estiCurrency":"CNY",//报损币别
  }
export default {
	data() {
      return {
        input:"",
        value1:"",
        value2:"",
        radio:1,
        textarea:"",
        tableData: [],
        formData:formData,
        submitFormData:"",
        submitLossInfo:"",
        estiCurrencyArr:mdUtils.getEstiCurrencyArr(),
        dialogTableVisible:false,  //弹窗是否显示
        registNo:"",
        arrayProvince:[],
        DarrayCity:[],
        DarrayCounty:[],
        CarrayCity:[],
        CarrayCounty:[],
        damageCodeArr:mdUtils.getDamageCodeArr(),
        propLossFlagTemp:true,
        rules: {
          reporterName: [{ required: true, message: '请输入报案人', trigger: 'blur' }],
          reporterPhone: [{ required: true, message: '请输入报案人电话', trigger: 'blur' }],
          contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
          contactPhone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }],
          damageReasonCode: [{ required: true, message: '请选择出险原因', trigger: 'change' },],
          insuredName: [{ required: true, message: '请输入被保险人', trigger: 'blur' }],
          treatmentFlag: [{ required: true}],
          propLossFlag: [{ required: true }],
          lossItemName: [{ required: true, message: '请输入物损名称', trigger: 'blur' }],
          damageAddrProv: [{ required: true, message: '请选择省', trigger: 'change' }],
          damageAddrCity: [{ required: true, message: '请选择市', trigger: 'change' }],
          damageAddrCounty: [{ required: true, message: '请选择县', trigger: 'change' }],
          damageAddrDetail: [{ required: true, message: '请输入出险地点详细地址', trigger: 'blur' }]
        }
    }
  },
  created(){
    let policys = JSON.parse(sessionStorage.getItem("tempPolicy"));
    let tableData = [];
    // this.tableData = policys;
    this.tableData.push(policys[0]);
    // this.tableData.insuredflag = "三级";
    this.getPCC(1,"%0000","arrayProvince");
    if(this.formData.damageAddrCity != "" || this.formData.damageAddrCounty != "" ||
       this.formData.checkAddrCity != "" || this.formData.checkAddrCounty != ""){
      this.DarrayCity = JSON.parse(sessionStorage.getItem("DarrayCity")) || [];
      this.DarrayCounty = JSON.parse(sessionStorage.getItem("DarrayCounty")) || [];
      this.CarrayCity = JSON.parse(sessionStorage.getItem("CarrayCity")) || [];
      this.CarrayCounty = JSON.parse(sessionStorage.getItem("CarrayCounty")) || [];
    }
  },
  methods: {
    checkRadio(type,val){
      if(val == 1){
        this.formData[type] = 0
        this.$refs[type].$el.innerText = "否"
      }else if(val == 0){
        this.formData[type] = 1
        this.$refs[type].$el.innerText = "是"
      }
      if(type == "propLossFlag" && this.formData[type] == 0){
        this.propLossFlagTemp = true;
      }else if( type == "propLossFlag" && this.formData[type] == 1){
        this.propLossFlagTemp = false;
      }
    },
    relatedVal(){//连带联系人
      this.formData.contactName = this.formData.reporterName;
      this.formData.contactPhone = this.formData.reporterPhone;
      this.formData.checkAddrDetail = this.formData.damageAddrDetail;
    },
    closeThis(done){
      done();
      // this.$emit('closeRouter', '/policNo_add');
    },
    isDifferentPlaces(val){
      val == true ? this.formData.distantDamageFlag = 1 : this.formData.distantDamageFlag = 0;
    },
    oninput(val) {
      // 通过正则过滤小数点后两位
      let floatLength = 2;
      let min = 0;
      // let max = 2;
      val = val.replace(/[^\d.]/g,'');
      val = val.replace(/\.*$/g,'');
      val = val.replace(/\.{2,}/g,'.');
      val = val.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
      let str = new RegExp('^(-)*(\\d+)\\.(\\d{1,'+floatLength+'}).*$')
      val = val.replace(str,'$1$2.$3')
      val = parseFloat(val)
      if(isNaN(val)){
        val = min ? min : 0
      }else{
        if(min !== undefined) val = val > min ? val : min
      }
      this.formData.estiLossAmount = val
    },
    submitHandle(){//删除多余属性
      let submitFormData = this.submitFormData;
      let submitLossInfo = {};
      //出险地址
      // submitFormData.damageAddress = adressObj.d.p+adressObj.d.c+adressObj.d.cc+submitFormData.damageAddressDetail;
      //查勘地址
      // submitFormData.checkAddress =  adressObj.c.p+adressObj.c.c+adressObj.c.cc+submitFormData.checkAddressDetail;
      for (let k in submitFormData) {
          if(k=='damageHour' || k=='damageDate' || k=='distantDamageFlagTemp'){
              delete submitFormData[k];
          }
          if(k=='personLossFlag' || k=='personInjuredNum' || k=='personDeadNum' || k=='treatmentFlag' ||
             k=='propLossFlag' || k=='lossItemName' || k=='distantDamageFlag' || k=='estiLossAmount' ||
             k=='estiCurrency'){
             submitLossInfo[k] = submitFormData[k];
             delete submitFormData[k];
          }
      }
      // submitFormData["damageAddrProv"]="32000000",//出险地点省级行政机构代码
      // submitFormData["damageAddrCity"]="32030000",//出险地点市级行政机构代码
      // submitFormData["damageAddrCounty"]="32040500",//出险地点县级行政机构代码
      // submitFormData["checkAddrProv"]="32000000",//查勘地点省级行政机构代码
      // submitFormData["checkAddrCity"]="32030000",//查勘地点市级行政机构代码
      // submitFormData["checkAddrCounty"]="32040500",//查勘地点县级行政机构代码
      this.submitFormData = submitFormData;
      this.submitLossInfo = submitLossInfo;
    },
    transformationTime(){//时间转换
      let tempDamageHour = new Date(this.submitFormData.damageHour);
      this.submitFormData.damageHour = tempDamageHour.getHours()+":"+
                                      (tempDamageHour.getMinutes() > 10 ? tempDamageHour.getMinutes() : "0"+tempDamageHour.getMinutes())+":"+
                                      tempDamageHour.getSeconds();
      this.submitFormData.damageTime = this.submitFormData.damageDate+ " " + this.submitFormData.damageHour;
    },
    getPCC(level,val,type){
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        "level":level,
        "requestJson" : JSON.stringify({
          "systemCode": "019D",
          "codeCodeOrCname": val,
          "validStatus": "1",
          "REQUEST_TYPE": "D219",
          "PAGENO": "1",
          "PAGESIZE": "1000"
        })
      };
      this.$api.comIterface.findCpCustRegistInfo(params).then(res=> {
          if(res.data.success == true){
            this[type] = res.data.data;
          }else{
            this.$message({
              message: res.data.message,
              center: true
            });
          }
          console.log(res.data)
      })
    },
    initiateXp(){//发起协陪
      // this.registNo = "RJAH201932010000000264";
      // this.$emit('closeRouter', '/policNo_add');//关闭报案登记
      this.$router.push({
        path: '/taskDetail',
        query:{
          registNo:this.registNo,
          type:1
        }
      });
    },
    validateForm(){//验证表单
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.submitReplicy();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitReplicy(){//提交报案
      // this.dialogTableVisible = true;
      let _obj = JSON.stringify(this.formData);
      this.submitFormData = JSON.parse(_obj);
      this.registNo = "RUDC201922010000000001";
      this.transformationTime();
      this.submitHandle();
      let policys = JSON.parse(sessionStorage.getItem("tempPolicy"));
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",//待取值
        "shardingComCode":"61000000",//待取值
        "userCode": "W0001761",
        "shardingRiskCode":"EAA",
        "baseInfo":JSON.stringify({
          "systemFlag":"1",
          "autoScheduleFlag":"1",
          "operatorCode":"61000000",//待取值
          "operatorName":"1",
          "operatorComCode":"61000000",//待取值
          "registSource":"1"
        }),
        policyInfoList:JSON.stringify([{
          "policyNo":policys[0].policyNo,
          // "policyNo":"PQAK201832010000000003",
          "comCode":"61000000",
          "classCode":"111",
          "riskCode":"EAA"
        }]),
        "registInfo" : JSON.stringify(this.submitFormData),
        "lossInfo" : JSON.stringify(this.submitLossInfo)
      };
      this.$api.policyServer.registCase(params).then(res=> {
          if(res.data.success == true){
            this.registNo = res.data.registNo;
            this.dialogTableVisible = true;
          }else{
            this.$message({
              message: res.data.message,
              center: true
            });
          }
      })
    },
    //用于生成uuid
    // S4(){
    //   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    // },
    // guid() {
    //   return (this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4());
    // },
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
    currentSel(selVal,type){//城市选择取值
      let obj = {};
      let flag = false;
      let temp = "";
      let val = "";
      if(type == "damageAddrProv" || type == "checkAddrProv"){
        obj = this.arrayProvince.find((item)=>{
            return item.codeCode === selVal;
        });
        type == "damageAddrProv" ? flag = true : "";
        flag == true ? temp = "DarrayCity" : temp = "CarrayCity";
        flag == true ? adressObj.d["p"] = obj.codeCname : adressObj.c["p"] = obj.codeCname;
        flag == true ? this.formData.damageAddrCity = "" : this.formData.checkAddrCity = "";
        flag == true ? this.formData.damageAddrCounty = "" : this.formData.checkAddrCounty = "";
        if(this.formData.checkAddrProv == ""){
          this.formData.checkAddrProv = this.formData.damageAddrProv;
          adressObj.c["p"] = obj.codeCname
        }
        val = selVal.substring(0,2)+"%";
        this.getPCC(2,val,temp);
        return ;
      }
      if(type == "damageAddrCity"){
        obj = this.DarrayCity.find((item)=>{
            return item.codeCode === selVal;
        });
        val = selVal.substring(0,4)+"%";
        this.getPCC(3,val,"DarrayCounty");
        this.formData.damageAddrCounty = "";
        sessionStorage.setItem("DarrayCity",JSON.stringify(this.DarrayCity))
        adressObj.d["c"] = obj.codeCname
        if(this.formData.checkAddrProv == this.formData.damageAddrProv &&
          this.formData.checkAddrCity == ""){
          this.CarrayCity = this.DarrayCity;
          this.formData.checkAddrCity = this.formData.damageAddrCity;
          sessionStorage.setItem("CarrayCity",JSON.stringify(this.CarrayCity))
          adressObj.c["c"] = obj.codeCname
        }
        return ;
      }
      if(type == "damageAddrCounty"){
        obj = this.DarrayCounty.find((item)=>{
            return item.codeCode === selVal;
        });
        adressObj.d["cc"] = obj.codeCname;
        sessionStorage.setItem("DarrayCounty",JSON.stringify(this.DarrayCounty))
        if(this.formData.checkAddrProv == this.formData.damageAddrProv &&
          this.formData.checkAddrCity == this.formData.damageAddrCity && this.formData.checkAddrCounty == ""){
          this.CarrayCounty = this.DarrayCounty;
          this.formData.checkAddrCounty = this.formData.damageAddrCounty;
          sessionStorage.setItem("CarrayCounty",JSON.stringify(this.CarrayCounty))
          adressObj.c["cc"] = obj.codeCname
        }
        return ;
      }
      if(type == "checkAddrCity"){
        obj = this.CarrayCity.find((item)=>{
            return item.codeCode === selVal;
        });
        val = selVal.substring(0,4)+"%";
        this.getPCC(3,val,"CarrayCounty");
        this.formData.checkAddrCounty = "";
        sessionStorage.setItem("CarrayCity",JSON.stringify(this.CarrayCity))
        adressObj.c["c"] = obj.codeCname
        return ;
      }
      if(type == "checkAddrCounty"){
        obj = this.CarrayCounty.find((item)=>{
            return item.codeCode === selVal;
        });
        sessionStorage.setItem("CarrayCounty",JSON.stringify(this.CarrayCounty))
        adressObj.c["cc"] = obj.codeCname
        return ;
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
  /*表单样式start*/
  .form-box /deep/ .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,
  .form-box /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-right: 0;
    position: relative;
    top: 2px;
  }
  .form-box /deep/ .el-form-item__label{
    margin-left: 35px;
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
  .form-box /deep/ .data-picker .el-input__prefix{
    left: auto;
    right: 3px;
    top: 1px;
    color: #4087F6;
  }
  .form-box .data-picker{
    width:113px !important;
  }
  .form-box .data-picker div{
    width:113px !important;
  }
  .form-box .data-picker /deep/ .el-form-item__content{
    width:113px !important;
  }
  .form-box .time-picker{
    width: 92px;
  }
  .form-box .time-picker div{
    padding-left: 0px !important;
    width:92px !important;
  }
  .form-box /deep/ .data-picker .el-input__suffix,
  .form-box /deep/ .time-picker .el-input__suffix,
  .form-box /deep/ .time-picker .el-input__prefix{
    display: none;
  }
  .form-box /deep/ .radio-input-warp .input-1{
    width: 125px;
  }
  .form-box /deep/ .radio-input-warp .input-1 input{
    width: 67px;
    padding-left: 4px;
    padding-right: 0px;
    border-right: 0;
  }
  .form-box /deep/ .radio-input-warp .input-2{
    width: 84px;
  }
  .form-box /deep/ .radio-input-warp .input-2 input{
    width: 100%;
    padding-left: 4px;
    padding-right: 0;
    border-left: 0;
    border-right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .form-box /deep/ .radio-input-warp .el-input-group__append{
    background: #ffffff;
    padding: 0;
    padding-right: 2px;
    position: relative;
    left: 0px;
    margin: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .form-box /deep/ .radio-input-warp .el-input-group__prepend{
    padding: 0 19px;
    background: #737374;
    border: 1px solid #737374;
    color: #FFFFFF;
  }
  .form-box .radio-input-warp /deep/ .el-button{
    height: 22px;
    width: 42px;
    padding: 0 !important;
  }
  .form-box /deep/ .radio-input-warp .input-2 .el-input-group__append{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .form-box .time-picker /deep/ .el-form-item__content{
    width:92px !important;
  }
  .form-box .max-form-item /deep/ .el-form-item__label{
    width: 170px !important;
    margin-left: -35px;
  }
  .form-box .leaves-box > .el-select{
    margin-right: 0;
  }
  .form-box /deep/ input::-webkit-outer-spin-button,
  .form-box /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .form-box /deep/ input[type="number"]{
    -moz-appearance: textfield;
  }
  .form-box .form-item-100{
    width: 100%;
  }
  .form-box /deep/ .form-item-100 > .el-form-item__content {
    width: 82%;
  }
  .form-box .leaves-box > .el-form-item{
    width: 210px;
    margin-right: 25px;
  }
  .form-box .leaves-box > .el-select{
    margin-right: 20px;
    width: 210px;
  }
  .form-box .remark-label /deep/ .el-form-item__label{
    width: 110px !important;
    margin-left: 25px;
  }
  .form-box .money-box > div:nth-child(1) {
    width: 210px;
  }
  .form-box .money-box /deep/ .el-input__suffix{
    right:-4px;
  }
  .form-box /deep/ .el-checkbox__inner {
    width: 12px;
    height: 12px;
    border-radius: 12px;
  }
  .form-box /deep/ .el-checkbox__inner:hover{
    border-color: #DCDFE6;
  }
  .form-box /deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
    border-color: #DCDFE6;
  }
  .form-box /deep/ .el-checkbox__inner::after {
    border: none;
  }
  .form-box /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .form-box /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FF1A00;
    border-color: #DCDFE6;
  }
  .form-box /deep/ .money-warp .el-input-group__append{
    background-color: #FFFFFF;
  }
  .form-box /deep/ .money-warp-option{
    border-left: 0;
    width: 73px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .form-box /deep/ .money-warp-option .el-input--suffix{
    height: 24px;
    line-height: 24px;
  }
  .form-box /deep/ .money-warp-option .el-input__icon{
    line-height: 24px;
  }
  .form-box /deep/ .money-warp-option input{
    width: 100% !important;
    padding: 0;
  }
  .form-box /deep/ .el-button.btn-radio:focus,
  .form-box /deep/ .el-button.btn-radio:hover{
    color:#fff;
    background-color: #737374;
    border-color: #737374;
  }
  /*表单样式end*/
  .submit-btn{
    margin-top: 39px;
    margin-bottom: 30px;
  }
  .from-p15{
    padding-bottom: 15px;
  }
  .btn-radio {
    padding: 0;
    background: #737374;
    border: 1px solid #737374;
    border-radius: 4px;
    color: #ffffff;
    width: 42px;
    height:26px;
    line-height:26px;
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
  /deep/ .el-table .cell,
  /deep/ .el-table th div,
  /deep/ .el-table--border td:first-child .cell,
  /deep/ .el-table--border th:first-child .cell{
    padding-left: 0;
  }

</style>
