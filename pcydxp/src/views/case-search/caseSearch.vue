<template>
  <div class="content-box">
  	<!-- <div class="page-tab"><span>保单查询</span><i class="el-icon-close"></i></div> -->
    <div class="search-box">
      <div class="search-box-content">
         <div class="content-l">案件查询</div>
         <div class="content-R">
           <el-input
            class="search-input"
            size="mini"
            placeholder="报案号  保单号  被保险人"
            prefix-icon="el-icon-search"
            v-model="searchInputVal"
            >
          </el-input>
          <div class="continue-search" @click="continueSearch()">继续查询</div>
         </div>
      </div>
      <div class="btn search-btn">
        <el-button type="info" round @click="clickSearchBtn()">查询</el-button>
      </div>
    </div>
    <div class="content-list-box result-box">
      <div class="box-title"><div class="box-tip"></div><span class="box-title-text">非车险保单</span></div>
      <div class="box-list">
        <el-table :data="tableData"
          style="width: 100%;font-size:12px;"
          ref="Table"
          :row-style="listRowStyle"
          :cell-style="listCellStyle"
          :header-cell-style="headerCellStyle"
          :header-cell-class-name="headerCellClassName">
          <el-table-column prop="registno" label="报案号" width="206"></el-table-column>
          <el-table-column prop="policyno" label="保单号" width="206"></el-table-column>
          <el-table-column prop="comcode" label="承保机构" width="206"></el-table-column>
          <el-table-column prop="insuredname" label="被保险人" width="103"></el-table-column>
          <el-table-column prop="damagetime" label="出险时间" sortable width="154"></el-table-column>
          <el-table-column prop="reporttime" label="报案时间" sortable width="155"></el-table-column>
          <el-table-column prop="damageaddress" label="出险地点" width="206"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                class="btn-initiate-xp"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">发起协陪</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <no-data></no-data>
          </div>
        </el-table>
        <my-pagination
          :currentPage.sync="currentPage"
          :limit.sync="pagesize"
          :totalCount="totalNum"
          :all="true"
          @turn="getCaseSearch"
          ></my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MyPagination from '../../layout/components/pagination/pagination'
import NoData from '../../layout/components/nodata'
export default {
	data() {
		return {
      searchInputVal: "",
      policyIds: [],
      currentPage:1,//去到那一页
      pagesize:10,//每页展示几条
		  tableData: [],
      totalNum:0
		}
  },
  created () {
    // this.getCaseSearch();
  },
  components: {
      myPagination: MyPagination,
      noData: NoData
  },
  methods:{
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
    continueSearch(){
      let policyNo = "";
      let registNo = "";
      let searchInputVal= this.searchInputVal;
      if (('P' == searchInputVal.charAt(0) || 'L' == searchInputVal.charAt(0)) && searchInputVal.length == 22) {// 保单号
        policyNo = searchInputVal;
      }else if ('R' == searchInputVal.charAt(0) && searchInputVal.length == 22) {// 报案号
        registNo = searchInputVal;
      }
      if(policyNo != '' || registNo != ""){
        this.continueSearchAjax(policyNo,registNo);
      }
    },
    continueSearchAjax(policyNo,registNo){//继续查询
      let params = {
        // "token":"ca202a412f974ff39c56411c9816693f",
        "userCode": "32001000",
        "registNo": registNo,
        "policyNo": policyNo,
        "pageSize": this.pagesize+"",
        "pageNo": this.currentPage+""
      };
      this.$api.caseServer.continueQuery(params).then(res=> {
          if(res.data.success == true){
            this.tableData = res.data.registInfos;
            this.totalNum = res.data.totalNum
            this.loading = false;
          }else{
            this.$message({
              message: res.data.message,
              center: true
            });
          }
          console.log(res.data)
      })
    },
    clickSearchBtn(){
      if(this.searchInputVal != ''){
        this.currentPage = 1;
        this.getCaseSearch();
      }
    },
    getCaseSearch() {//案件查询
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        "searchWord":this.searchInputVal,
        "requestJson" : JSON.stringify({
          // "registno": this.searchInputVal,
          // "reportorname": "孙伟",
          "qflag": "1",
          "pagesize": this.pagesize+"",
          "pageindex": this.currentPage+""
        })
      };
      this.$api.caseServer.caseSearch(params).then(res=> {
          // res = {"registInfos":[{"comcode":"中国人民财产保险股份有限公司合肥市第三支公司","damageaddress":"安徽省合肥市市辖区合肥市青龙潭路与丹霞路交口","damagetime":"2019-08-18 20:30:11","insuredname":"合肥天一出租汽车有限责任公司","policyno":"PZDS201934010000001567","registno":"RZDS2019340100N0008293","reporttime":"2019-08-18 20:49:58"},{"comcode":"承德市分公司电子商务业务部直销业务部","damageaddress":"河北省承德市市辖区高速上","damagetime":"2019-08-18 15:00:32","insuredname":"孙伟","policyno":"PYEJ201913081103M00030","registno":"RYEJ2019130800N0001302","reporttime":"2019-08-18 21:47:56"},{"comcode":"商业非车险业务部业务一部","damageaddress":"包头","damagetime":"2019-08-14 12:30:51","insuredname":"孙伟","policyno":"PYEJ201915025902M00055","registno":"RYEJ201915020000010134","reporttime":"2019-08-14 12:30:51"},{"comcode":"西安市碑林支公司营销业务一部","damageaddress":"陕西省西安市周至县二府街道","damagetime":"2019-08-13 01:23:47","insuredname":"孙怡菲","policyno":"PECD201961010623Z00919","registno":"RECD2019610100N0001068","reporttime":"2019-08-15 19:37:10"},{"comcode":"大连市高新技术产业园区支公司非车险业务部","damageaddress":"辽宁省大连市沙河口区大连市高新园区龙王塘尚明珠三期18号楼401室 ","damagetime":"2019-08-11 23:14:37","insuredname":"孙伟","policyno":"PJAU201821020000000360","registno":"RJAU2019210200N0017014","reporttime":"2019-08-12 11:25:32"},{"comcode":"中国人民财产保险股份有限公司大连分公司电子商务部","damageaddress":"辽宁省大连市沙河口区沙河口区,知音园20号1-6-2 ","damagetime":"2019-08-11 21:01:04","insuredname":"孙伟","policyno":"PJEB201921021000M00191","registno":"RJEB2019210200N0016093","reporttime":"2019-08-11 21:11:54"},{"comcode":"中国人民财产保险股份有限公司莱芜市分公司","damageaddress":"莱芜市大王庄镇陡崖村","damagetime":"2019-08-11 18:08:57","insuredname":"高美华","policyno":"LJAB201937120000000048","registno":"RJAB201937120000002816","reporttime":"2019-08-14 18:38:57"},{"comcode":"中国人民财产保险股份有限公司东营市东营区支公司钻井营销服务部","damageaddress":"东营市东营区东辛采油厂耿井小区26号楼1单元301孙伟","damagetime":"2019-08-11 18:06:22","insuredname":"胜利石油管理局胜东社区管理中心治安保卫中心","policyno":"PJBF201837050000001819","registno":"RJBF201937050000037952","reporttime":"2019-08-14 18:06:22"},{"comcode":"中国人民财产保险股份有限公司东营市分公司","damageaddress":"东营市垦利县和平路华安黄小区22-2-02室","damagetime":"2019-08-11 12:30:06","insuredname":"孙伟","policyno":"LJAB201937050000000873","registno":"RJAB201937050000037225","reporttime":"2019-08-14 12:30:06"},{"comcode":"遵义市红花岗支公司业务一部","damageaddress":"遵义市红花岗区 忠深大道-道路","damagetime":"2019-08-10 08:10:38","insuredname":"孙贵友","policyno":"PEDD201852030000002581","registno":"REDD201952030000008563","reporttime":"2019-08-10 15:46:08"}],"success":true,"message":"成功"}
          // this.tableData = res.registInfos;
          if(res.data.success == true){
            this.tableData = res.data.registInfos;
            this.totalNum = res.data.totalNum
            this.loading = false;
          }else{
            this.$message({
              message: res.data.message,
              center: true
            });
          }
          console.log(res.data)
      })
    },
    handleEdit(index, row) {//发起协陪
      console.log(index, row);
      let registno = row.registno;//'RJAH201932010000000264'
      // registno = "RUDC201922010000000001";
      this.getTaskData(registno);
    },
    getTaskData(registno){//获取任务信息
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        'registNo': registno
      };
      this.$api.mineTaskServer.taskDetail(params).then(res=> {
        // 执行某些操作
        if(res.data.success == true){
          this.$router.push({
            path: '/taskDetail',
            query:{
              registNo:registno,
              type:1
            }
          });
        }else{
          this.$message({
            message: res.data.message,
            center: true
          });
        }
        console.log(res.data)
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
  .result-box{
    margin:20px 0;
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
  .btn-initiate-xp{
    width: 70px;
    height: 20px;
    line-height: 16px;
    background: #484848;
    border-radius: 20px;
    color: #fff;
    font-size: 10px;
    padding: 0;
  }
  .continue-search{
    height: 26px;
    display: inline-block;
    width: 50px;
    font-size: 12px;
    color: blue;
    margin-left: 5px;
    cursor: pointer;
  }
  /*穿透样式*/
  /deep/ .el-input{
    width: 95%;
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
</style>
