<template>
  <div class="content-box">
  	<!-- <div class="page-tab"><span>保单查询</span><i class="el-icon-close"></i></div> -->
    <el-form ref="form" :model="formData">
      <div class="content-list-box result-box">
        <div class=""><div class="box-tip"></div><span class="box-title-text">查询</span></div>
        <div class="from-box">
          <el-row>
            <el-col :span="6"><div class="row-first">报案号</div><div><el-input v-model="formData.registNo" placeholder="请输入报案号"></el-input></div></el-col>
            <el-col :span="6"><div>任务号</div><div><el-input v-model="formData.subRegistId" type="number" placeholder="请输入任务号"></el-input></div></el-col>
            <el-col :span="6"><div>任务状态</div><div>
            <el-select v-model="formData.appStatus" placeholder="请选择">
              <el-option
                v-for="item in taskTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div></el-col>
          </el-row>
        </div>
        <div class="btn search-btn">
          <el-button type="info" round @click="resetSearch()">重置</el-button><el-button class="search" type="info" round @click="clickSubmit()">查询</el-button>
        </div>
      </div>
    </el-form>
    <div class="content-list-box">
      <div class="box-title"><div class="box-tip"></div><span class="box-title-text">任务列表</span></div>
      <div class="box-list">
        <el-table :data="tableData"
          style="width: 100%;font-size:12px;"
          :row-style="listRowStyle"
          :cell-style="listCellStyle"
          :header-cell-style="headerCellStyle"
          :header-cell-class-name="headerCellClassName"
          :cell-class-name="listCellClassName">
          <el-table-column prop="" label="任务号" width="160">
            <template slot-scope="scope">
              <span style="color:#4087F6;cursor:pointer;" @click="goToTaskDetail(scope.row.taskId,scope.row.registNo)">{{scope.row.taskId}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="registNo" label="报案号" width="260"></el-table-column>
          <el-table-column prop="registType" label="案件类型" width="140"></el-table-column>
          <el-table-column prop="reportDate" label="报案时间" width="200"></el-table-column>
          <el-table-column prop="subRegistType" label="任务类型" width="160"></el-table-column>
          <el-table-column prop="appStatus" label="任务状态" width="120"></el-table-column>
          <el-table-column prop="taskSource" label="任务来源" width="120"></el-table-column>
          <el-table-column prop="taskNo" label="任务流水号"></el-table-column>
          <div slot="empty">
            <no-data></no-data>
          </div>
        </el-table>
        <my-pagination
          :currentPage.sync="currentPage"
          :limit.sync="pageSize"
          :totalCount="totalNum"
          :all="true"
          @turn="searchSubmit"
          ></my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MyPagination from '../../layout/components/pagination/pagination'
import * as mdUtils from '../../utils/claimpartnerUtils'
import NoData from '../../layout/components/nodata'
const taskTypeArr = [ //任务类型
  {value: '',label: '全部'},
  {value: '0',label: '临时'},
  {value: '1',label: '待处理'},
  {value: '2',label: '已提交'},
  {value: '3',label: '被退回'},
  {value: '4',label: '已完成'},
  {value: '5',label: '已取消'}
];

const formData = {
  registNo:"",
  subRegistId:"",
  appStatus:"",
  subRegistType:"2"
}
export default {
	data() {
		return {
      searchInputVal: "",
      policyIds: [],
      currentPage:1,
      pageSize:10,
      totalNum:0,
      formData:formData,
      taskTypeArr:taskTypeArr,
		  tableData: [],
			optionsvalue:"018"
		}
  },
  created(){
    this.searchSubmit();
  },
  components: {
      myPagination: MyPagination,
      noData: NoData
  },
  methods:{
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
    resetSearch(){//重置
      for(let key in this.formData){
        this.formData[key] = ""
      }
    },
    clickSubmit(){
      this.currentPage = 1;
      this.searchSubmit();
    },
    searchSubmit(){//搜索
       let params = {
        "token":"03ecae48568a4c6e9744b1cc89f136b4",
        "userCode": "W0001761",
        "registNo" : this.formData.registNo,
        "appStatus": this.formData.appStatus,
        "subRegistId": this.formData.subRegistId,
        "subRegistType": this.formData.subRegistType,
        'page': this.currentPage,
        'rows': this.pageSize,
        "method":"findMyTask"
      };
      let taskSourceObj = mdUtils.getTaskSourceObj();
      let subRegistTypeObj = mdUtils.getSubRegistTypeObj();
      let appStatusObj = mdUtils.getAppStatusObj();
      // params = JSON.stringify(params)
      this.$api.mineTaskServer.taskList(params).then(res=> {
          if(res.data.success == true){
            this.tableData = res.data.ipage.rows;
            this.totalNum = res.data.ipage.pageCount;
            for(let i=0,max=this.tableData.length;i<max;i++){
              this.tableData[i].taskSource = taskSourceObj[this.tableData[i].taskSource];
              this.tableData[i].appStatus = appStatusObj[this.tableData[i].appStatus];
              this.tableData[i].subRegistType = subRegistTypeObj[this.tableData[i].subRegistType];
              this.tableData[i].reportDate = mdUtils.dateFormat(this.tableData[i].reportDate,"yyyy-MM-dd hh:mm:ss");
            }
          }else{
            this.$message({
              message: res.data.message,
              center: true
            });
          }
          console.log(res.data)
      })
    },
    goToTaskDetail(taskId,registNo){
      // registNo = "RYEJ201932010200000053";
      this.$router.push({
        path: '/taskDetail',
        query:{
          taskId:taskId,
          registNo:registNo,
          type:2
        }
      });
    }
  }
}
</script>

<style scoped>
  .search-box{
    background-color: #fff;
    height: 140px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 17px 17px 0;
  }
  .search-box-content{
    height:64px;
    width:100%;
    background: #f3f3f3;
    border-radius: 6px;
    padding:20px 37px 20px 14px;
    font-size: 0;
  }
  .search-box-content .content-l{
    display: inline-block;
    width: 64px;
    height: 22px;
    line-height:22px;
    font-size: 16px;
    color: #484848;
    letter-spacing: 0;
  }
  .search-box-content .content-R{
    display: inline-block !important;
    margin-left: 16px;
    width: 92% !important;
  }
  .search-btn{
    margin-top: 14px;
  }
  .policy-btn{
    width: 100%;
    padding: 0 34px;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .search-btn{
    margin-bottom: 22px;
  }
  .search-btn .search{
    margin-left: 22px;
  }
  .data-picker div{
    width:85px !important;
  }
  .time-picker div{
    padding-left: 0px !important;
    width:93px !important;
  }
  /*穿透样式*/
  .from-box .el-row .el-col /deep/ .data-picker input {
    width:100% !important;
    padding-left: 5px;
    padding-right: 5px;
  }
   /deep/ .data-picker .el-input__prefix{
    left: auto;
    right: 3px;
    top: -6px;
    color: #4087F6;
  }
  .from-box /deep/ .el-input--suffix{
    height: 24px;
    line-height: 24px;
  }
  .from-box /deep/ .el-input__icon{
    display: none;
    line-height: 24px;
  }
  /deep/ .from-box .el-row .el-col input{
    width: 160px;
  }
  /deep/ .from-box .el-row .el-col > div:nth-child(1){
    width: 100px;
  }
  .search-box-content /deep/ .el-input--mini .el-input__inner{
    height: 24px;
    line-height: 24px;
    font-size: 10px;
    border-radius: 12px;
  }
  .search-box-content /deep/ .el-input--mini .el-input__icon {
    line-height: 24px;
    font-size: 14px;
  }
  .list-checkbox /deep/ .cell{
    padding: 0;
  }
  .box-list /deep/ .el-table-column--selection .cell{
    padding: 0;
  }
  .box-list /deep/ th.el-table-column--selection .cell{
    display: none;
  }
  .box-list /deep/ .el-checkbox__inner{
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }
  .box-list /deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
    border-color: #DCDFE6;
  }
  .box-list /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .box-list /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #FF1A00;
    border-color: #DCDFE6;
  }
  .box-list /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: none;
  }
  .box-list /deep/ .el-checkbox__inner::after{
    height: 4px;
    left: 2px;
  }
  .box-list /deep/ .ascending .sort-caret.ascending{
    border-bottom-color: #FF1A00;
  }
  .box-list /deep/ .descending .sort-caret.descending{
    border-top-color: #FF1A00;
  }

  .content-list-box{
    margin-bottom: 11px;
  }
  .result-box{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  /deep/ .el-table .cell,
  /deep/ .el-table th div,
  /deep/ .el-table--border td:first-child .cell,
  /deep/ .el-table--border th:first-child .cell{
    padding-left: 0;
  }
  .from-box /deep/ input::-webkit-outer-spin-button,
  .from-box /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .from-box /deep/ input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
