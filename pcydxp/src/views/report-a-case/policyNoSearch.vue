<template>
  <div class="content-box">
  	<!-- <div class="page-tab"><span>保单查询</span><i class="el-icon-close"></i></div> -->
    <div class="search-box">
      <div class="search-box-content">
         <div class="content-l">保单查询</div>
         <div class="content-R">
           <el-input
            class="search-input"
            size="mini"
            placeholder="保单号 被保险人 被保险人证件号"
            prefix-icon="el-icon-search"
            v-model="searchInputVal"
            >
          </el-input>
         </div>
      </div>
      <div class="btn search-btn">
        <!-- <el-button type="info" round @click="getPolicySearch()">查询</el-button> -->
        <el-button type="info" round @click="clickSearchBtn()">查询</el-button>
      </div>
    </div>
    <div class="content-list-box result-box">
      <div class="box-title"><div class="box-tip"></div><span class="box-title-text">保单</span></div>
      <div class="box-list">
        <el-table :data="tableData"
          style="width: 100%;font-size:12px;"
          ref="Table"
          :row-style="listRowStyle"
          empty-text="暂无数据"
          :cell-style="listCellStyle"
          :header-cell-style="headerCellStyle"
          :header-cell-class-name="headerCellClassName"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="15">
          </el-table-column>
          <el-table-column prop="policyNo" label="保单号" width="186"></el-table-column>
          <el-table-column prop="insuredflag" label="客户等级" width="102"></el-table-column>
          <el-table-column prop="insuredname" label="被保险人" width="102"></el-table-column>
          <el-table-column prop="identifynumber" label="被保险人证件号" width="204"></el-table-column>
          <el-table-column prop="startdate" label="起保日期" width="102"></el-table-column>
          <el-table-column prop="enddate" label="终保日期" sortable width="102"></el-table-column>
          <el-table-column prop="clausetype" label="条款" sortable width="102"></el-table-column>
          <el-table-column prop="underwriteflag" label="保单状态" width="102"></el-table-column>
          <el-table-column prop="comCode" label="承保机构"></el-table-column>
          <div slot="empty">
            <no-data></no-data>
          </div>
        </el-table>
        <my-pagination
          :currentPage.sync="currentPage"
          :limit.sync="pagesize"
          :totalCount="totalNum"
          :all="true"
          @turn="getPolicySearch"
          ></my-pagination>
      </div>
    </div>
    <div class="btn policy-btn">
      <el-button type="info" round @click="policySubmit">报案</el-button>
    </div>
  </div>
</template>

<script>
import MyPagination from '../../layout/components/pagination/pagination'
import NoData from '../../layout/components/nodata'
export default {
	data() {
		return {
      searchInputVal: "",//搜索框值
      loading: true,
      policyIds: [],
      currentPage:1,//去到那一页
      pagesize:10,//每页展示几条
      tableData: [],
      totalNum:0,
      companys:[]//机构
		}
  },
  components: {
      myPagination: MyPagination,
      noData: NoData
  },
  created() {
    // this.getCompanys();
  },
  methods:{
    getCompanys(){
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        "comCodeOrName":"00000000",
        "upperComCode":"",
        "flag":"",
        "validStatus":"",
        "queryType":"ALLSUB",
        "requestType":"D123",
        "systemCode":"",
        "pageNo":"1",
        "pageSize":"1000"
      };
      this.$api.comIterface.getCompanys(params).then(res=> {
          if(res.data.success == true){

          }else{
            this.$message.error({
              message: res.data.message,
              center: true
            });
          }
      })
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
    handleSelectionChange(val){
      //多选
      // console.log(val)
      // this.policyIds = val;
      // //单选
      if (val.length > 1) {
        this.$refs.Table.clearSelection()
        this.$refs.Table.toggleRowSelection(val.pop())
      }
      this.policyIds = val
      // console.log(this.policyIds)
    },
    policySubmit(){//报案
    // this.$router.push({path: '/policNo_add'});
      if(this.policyIds != ''){
        let policyList = this.policyIds;
        for (let i = 0; i < policyList.length; i++) {
          policyList[i]['loginComCode'] = '61000000'
        }
        let params = {
          "token":"ca202a412f974ff39c56411c9816693f",
          "policyInfoList" : JSON.stringify(policyList)
        };
        let _this = this;
        //验证保单
        this.$api.policyServer.validatePolicy(params).then(res=> {
            if(res.data.success == true){
              _this.$router.push({path: '/policNo_add'});
              let tempPolicy = JSON.stringify(_this.policyIds);
              sessionStorage.setItem("tempPolicy",tempPolicy);
            }else{
              _this.$message.error({
                message: res.data.message,
                center: true
              });
            }
        })
      }
    },
    clickSearchBtn(){
      if(this.searchInputVal != ''){
        this.currentPage = 1;
        this.getPolicySearch();
      }
    },
    getPolicySearch() {//保单查询
        let params = {
          "token":"ca202a412f974ff39c56411c9816693f",
          "searchWord" : this.searchInputVal,
          "requestJson" : JSON.stringify({
            // "prpcopyinsured.insuredname": "孙伟",
            "qflag": "1",
            "pagesize": this.pagesize+"",
            "pageindex": this.currentPage+""
          })
        };
        this.$api.policyServer.policySearch(params).then(res=> {
            if(res.data.success == true){
              this.tableData = res.data.policyInfos;
              this.totalNum = res.data.totalNum;
            }else{
              this.$message.error({
                message: res.data.message,
                center: true
              });
            }
        })
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
  .el-pagination{
    margin-top: 5px;
    margin-bottom: 14px;
  }
  /*穿透样式*/
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
    width: 15px;
    height: 15px;
    border-radius: 15px;
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
  /deep/ .el-checkbox__inner::after{
    border:0;
  }
</style>
