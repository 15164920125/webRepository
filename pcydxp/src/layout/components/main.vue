<template>
  <div class="content-box">
    <div class="content-list-box result-box">
      <el-tabs v-model="backActive">
        <el-tab-pane name="submitSuccess">
          <span slot="label">代办任务</span>
          <div class="box-list">
            <el-table :data="tableDataWait"
              style="width: 100%;font-size:12px;"
              :row-style="listRowStyle"
              :cell-style="listCellStyle"
              :header-cell-style="headerCellStyle"
              :header-cell-class-name="headerCellClassName"
              :cell-class-name="listCellClassName">
              <el-table-column prop="" label="任务号" width="160">
                <template slot-scope="scope">
                  <span style="color:#4087F6;cursor:pointer;" @click="goToTaskDetail(scope.row.subRegistId,scope.row.registNo)">{{scope.row.subRegistId}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="registNo" label="报案号" width="260"></el-table-column>
              <el-table-column prop="subRegistType" label="案件类型" width="140"></el-table-column>
              <el-table-column prop="updateTimeHis" label="报案时间" width="200"></el-table-column>
              <el-table-column prop="subRegistType" label="任务类型" width="160"></el-table-column>
              <el-table-column prop="appStatus" label="任务状态" width="120"></el-table-column>
              <el-table-column prop="taskSource" label="任务来源" width="120"></el-table-column>
              <el-table-column prop="taskNo" label="任务流水号"></el-table-column>
              <div slot="empty">
                <no-data></no-data>
              </div>
            </el-table>
            <my-pagination
              :currentPage.sync="waitCurrentPage"
              :limit.sync="waitLimit"
              :totalCount="waitTotalCount"
              :all="true"
              @turn="getTableDataWait"
              ></my-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane name="backPhoto">
          <span slot="label">已办任务</span>
          <div class="box-list">
            <el-table :data="tableDataSucc"
              style="width: 100%;font-size:12px;"
              :row-style="listRowStyle"
              :cell-style="listCellStyle"
              :header-cell-style="headerCellStyle"
              :header-cell-class-name="headerCellClassName"
              :cell-class-name="listCellClassName">
              <el-table-column prop="" label="任务号" width="160">
                <template slot-scope="scope">
                  <span style="color:#4087F6;cursor:pointer;" @click="goToTaskDetail(scope.row.subRegistId,scope.row.registNo)">{{scope.row.subRegistId}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="registNo" label="报案号" width="260"></el-table-column>
              <el-table-column prop="subRegistType" label="案件类型" width="140"></el-table-column>
              <el-table-column prop="updateTimeHis" label="报案时间" width="200"></el-table-column>
              <el-table-column prop="subRegistType" label="任务类型" width="160"></el-table-column>
              <el-table-column prop="appStatus" label="任务状态" width="120"></el-table-column>
              <el-table-column prop="taskSource" label="任务来源" width="120"></el-table-column>
              <el-table-column prop="taskNo" label="任务流水号"></el-table-column>
              <div slot="empty">
                <no-data></no-data>
              </div>
            </el-table>
            <my-pagination
              :currentPage.sync="succCurrentPage"
              :limit.sync="succLimit"
              :totalCount="succTotalCount"
              :all="true"
              @turn="getTableDataSucc"
              ></my-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin: 20px 0;overflow: auto;">
      <div class="content-list-box work-census">
        <div class="box-title"><div class="box-tip"></div><span class="box-title-text">工作统计</span></div>
        <div class="census-box">
          <div class="census-box-title">今日工作</div>
          <div class="histogramTemp">
            <div>
              <div class="finisheNum">{{finisheNum}}</div>
              <div class="box-tip-finisheNum"></div><span>完成任务</span>
            </div>
            <div>
              <div class="points">{{points}}</div>
              <div class="box-tip-points"></div><span>积分总数</span>
            </div>
          </div>
          <!-- <div id="histogram"></div>
          <div class="census-box-footer">
            <div class="inlineBlock first-box"><div class="box-tip"></div><span>完成任务</span></div>
            <div class="inlineBlock second-box" style="margin-left: 50px;"><div class="box-tip"></div><span>积分总数</span></div>
          </div> -->
        </div>
        <div class="split-line"></div>
        <div class="census-box">
          <div class="census-box-title">本月工作</div>
          <div id="ringChart"></div>
          <div class="census-box-footer">
            <div class="inlineBlock first-box month-box"><div class="box-tip"></div><span>本月工作量</span></div>
            <div class="inlineBlock second-box"><div class="box-tip"></div><span>上月工作量</span></div>
          </div>
        </div>
      </div>
      <div class="content-list-box notice-box">
        <div class="box-title"><div class="box-tip"></div><span class="box-title-text">公告栏</span></div>
        <div class="notice-box-list">
          <el-scrollbar style="height:100%">
           <ul class="li-box">
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>1</span></li>
           </ul>
          </el-scrollbar>
        </div>
      </div>
      <div class="content-list-box notice-box" style="float: right;padding-bottom: 0;min-width:288px;">
        <div class="box-title"><div class="box-tip"></div><span class="box-title-text">日历</span></div>
        <div class="notice-box-list">
          <!-- <canlendar></canlendar> -->
          <canlendar
          :dateToolsKey="2"
          :trainDateList="[]"
          :trainDateFullList="trainDateFullList"
          ref="topDateTools2"
          ></canlendar>
        </div>
      </div>
<!--      <div class="content-list-box notice-box">
        <div class="box-title"><div class="box-tip"></div><span class="box-title-text">知识库</span></div>
        <div class="notice-box-list">
          <el-scrollbar style="height:100%">
           <ul class="li-box">
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>关于新版本相关内容涉及到相关人员表单</span></li>
             <li><div class="box-tip li-tip"></div><span>1</span></li>
           </ul>
          </el-scrollbar>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import MyPagination from './pagination/pagination'
import * as mdUtils from '../../utils/claimpartnerUtils'
import NoData from '../../layout/components/nodata'
import echarts from 'echarts'
import Canlendar from './canlendar'

const statusObj = {"1":"车险","2":"非车险"};
export default {
	data() {
		return {
      waitCurrentPage: 1,//当前页码
      waitLimit: 10,//每页显示条数
      waitTotalCount:0,//总页数
      succCurrentPage: 1,//当前页码
      succLimit: 10,//每页显示条数
      succTotalCount:0,//总页数
      backActive:"submitSuccess",
      currentPage:1,
      pageSize:10,
      totalNum:0,
		  tableData: [],
      tableDataWait:[],
      tableDataSucc:[],
      finisheNum:"",
      points:"",
      trainDateFullList: []
		}
  },
  components: {
      myPagination: MyPagination,
      noData: NoData,
      canlendar: Canlendar
  },
  mounted() {
    this.getTableDataSucc();
    this.getTableDataWait();
    this.getTaskCountNum();
    let today = mdUtils.dateFormat(new Date(),"yyyyMMdd")
    console.log(today)
    this.trainDateFullList.push(today)
    console.log(this.trainDateFullList)
  },
  methods:{
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
    getTableDataWait() {//未完成任务
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        "userCode" : "W0001761",
        "type": "wwc",
        'pageNum': this.waitCurrentPage,
        'pageSize': this.waitLimit,
        "method":"getMyJob"
      };
      let _this = this;
      let tableDataWait = [];
      let taskSourceObj = mdUtils.getTaskSourceObj();
      let subRegistTypeObj = mdUtils.getSubRegistTypeObj();
      let appStatusObj = mdUtils.getAppStatusObj();
      this.$api.comIterface.getMyJob(params).then(res=> {
          if(res.data.success == true){
            let tableData = res.data.result;
            _this.waitTotalCount = res.data.total;
            for(let i=0,max=tableData.length;i<max;i++){
              tableData[i].taskSource = taskSourceObj[tableData[i].taskSource];
              tableData[i].subRegistType = subRegistTypeObj[tableData[i].subRegistType];
              tableData[i].updateTimeHis = mdUtils.dateFormat(tableData[i].updateTimeHis,"yyyy-MM-dd hh:mm:ss");
              tableData[i].appStatus = appStatusObj[tableData[i].appStatus];
              tableData[i].status = statusObj[tableData[i].status];
              tableDataWait.push(tableData[i]);
            }
            _this.tableDataWait = tableDataWait;
          }else{
            _this.$message({
              message: res.data.message,
              center: true
            });
          }
      })
    },
    getTableDataSucc(){//已完成任务
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        "userCode" : "W0001761",
        "type": "done",
        'pageNum': this.succCurrentPage,
        'pageSize': this.succLimit,
        "method":"getMyJob"
      };
      let _this = this;
      let tableDataSucc = [];
      let taskSourceObj = mdUtils.getTaskSourceObj();
      let subRegistTypeObj = mdUtils.getSubRegistTypeObj();
      let appStatusObj = mdUtils.getAppStatusObj();
      this.$api.comIterface.getMyJob(params).then(res=> {
          if(res.data.success == true){
            let tableData = res.data.result;
            _this.succTotalCount = res.data.total;
            for(let i=0,max=tableData.length;i<max;i++){
              tableData[i].taskSource = taskSourceObj[tableData[i].taskSource];
              tableData[i].subRegistType = subRegistTypeObj[tableData[i].subRegistType];
              tableData[i].updateTimeHis = mdUtils.dateFormat(tableData[i].updateTimeHis,"yyyy-MM-dd hh:mm:ss");
              tableData[i].appStatus = appStatusObj[tableData[i].appStatus];
              tableDataSucc.push(tableData[i]);
            }
            _this.tableDataSucc = tableDataSucc;
          }else{
            _this.$message({
              message: res.data.message,
              center: true
            });
          }
          console.log(res.data)
      })
    },
    getTaskCountNum(){//查询工作量
      let params = {
        "token":"ca202a412f974ff39c56411c9816693f",
        "userCode" : "W0001761",
        "method":"getTaskCountNum"
      };
      let _this = this;
      this.$api.comIterface.getTaskCountNum(params).then(res => {
        if(res.data.success == true){
          this.composeData(res.data);
        }else{
          _this.$message({
            message: res.data.message,
            center: true
          });
        }
      })
    },
    composeData(data){
      //柱形图数据
      this.finisheNum = data.finisheNum;
      this.points = data.points
      // let histogram = echarts.init(document.getElementById('histogram'));
      // let histogramOption = {
      //       series: [
      //         {
      //           name:'',
      //           type:'pie',
      //           radius: ['50%', '70%'],
      //           avoidLabelOverlap: false,
      //           label: {
      //             normal: {
      //               show: false,
      //               position: 'center',
      //               formatter: "{c} \n{b}"
      //             },
      //             emphasis: {
      //               show: true,
      //               textStyle: {
      //                   fontSize: '18'
      //               }
      //             }
      //           },
      //           labelLine: {
      //             normal: {
      //               show: false
      //             }
      //           },
      //           data:[
      //             {value:data.currentNum, name:'本月工作量'},
      //             {value:data.beforeNum, name:'上月工作量'}
      //           ],
      //           itemStyle: {
      //             normal: {
      //               //每根柱子颜色设置
      //               color: function(params) {
      //                 let colorList = [
      //                     "#00CCF8",
      //                     "#FF9B00"
      //                 ];
      //                 return colorList[params.dataIndex];
      //               }
      //             }
      //           },
      //         }
      //       ]
      //   };
      // histogram.setOption(histogramOption);
      // window.addEventListener('resize',function() {histogram.resize()});
      //环形图数据
      let ringChart = echarts.init(document.getElementById('ringChart'));
      let ringChartOption = {
            series: [
              {
                name:'',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center',
                    formatter: "{c} \n{b}"
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                  {value:data.currentNum, name:'本月工作量'},
                  {value:data.beforeNum, name:'上月工作量'}
                ],
                itemStyle: {
                  normal: {
                    //每根柱子颜色设置
                    color: function(params) {
                      let colorList = [
                          "#00CCF8",
                          "#FF9B00"
                      ];
                      return colorList[params.dataIndex];
                    }
                  }
                },
              }
            ]
        };
        ringChart.setOption(ringChartOption);
        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener('resize',function() {ringChart.resize()});
    }
  }
}
</script>

<style scoped>
#histogram{
  width: 240px;
  height: 233px;
  margin: 0 auto;
}
.split-line{
  height: 100px;
  width: 1px;
  background: #F2F2F2;
  display: inline-block;
  float: left;
  margin: 54px 10% 0;
}
.histogramTemp{
  width: 240px;
  height: 233px;
  padding-top: 100px;
  float: left;
}
.histogramTemp > div{
  display: inline-block;
  font-size: 30px;
  text-align: center;
}
.histogramTemp > div span{
  color: #000000;
  font-size: 12px;
}
.histogramTemp .finisheNum{
  margin-bottom: 60px;
}
.histogramTemp .points{
  margin-bottom: 60px;
}
.histogramTemp > div:first-child{
  color: #00CCF8;
  width: 60%;
}
.histogramTemp > div:last-child{
  color: #FF9B00;
  width: 30%;
}
.histogramTemp .box-tip-finisheNum{
  display: inline-block;
  background: #00CCF8;
  width: 6px;
  height:6px;
  margin-right: 5px;
}
.histogramTemp .box-tip-points{
  display: inline-block;
  background: #FF9B00;
  width: 6px;
  height:6px;
  margin-right: 5px;
}
#ringChart{
  width: 240px;
  height: 233px;
  margin: 0 auto;
  margin-left: 35px;
}
.content-box{
  overflow: auto;
}
.result-box{
  border-top-left-radius: 0;
}
.work-census{
  width: 56%;
  float:left;
}
.notice-box{
  width: 21%;
  float:left;
  margin-left: 1%;
}
.notice-box-list{
  height: 253px;
  overflow-y: auto;
  overflow-x:hidden;
  padding-bottom: 20px;
}
.li-box li{
  list-style: none;
  font-size: 12px;
  height: 29px;
  line-height:29px;
  position: relative;
  border-bottom: 1px solid #EBEEF5;
  cursor: pointer;
}
.li-box li .li-tip{
  width:4px;
  height:4px;
  margin-top: 12px;
  background: #999999;
}
.li-box li:hover .li-tip{
  background: #FF1A00;
}
.li-box li span{
  margin-left: 10px;
}
/deep/ .el-scrollbar__wrap{overflow-x: hidden !important;}
.census-box{
   height:252px;
   position:relative;
   display: inline-block;
   float: left;
}
.census-box-title{
  position:absolute;
  margin-top:7px;
  margin-left:10px;
}
.census-box-footer{
  position:relative;
  bottom: 20px;
}
.first-box{
  font-size: 12px;
  margin-left: 40px;
}
.first-box .box-tip{
  background: #00CCF8;
  width: 6px;
  height:6px;
}
.month-box{
  margin-left: 60px;
}
.month-box .box-tip{
  background: #00CCF8;
}
.second-box{
  font-size: 12px;
  margin-left: 30px;
}
.second-box .box-tip{
  background: #FF9B00;
  width: 6px;
  height:6px;
}
.inlineBlock span{
  margin-left: 12px;
}
/deep/ .el-tabs__nav-wrap::after{
  height: 1px;
}
/deep/ .el-tabs__active-bar{
  background-color: #FF1A00;
  left: 21px;
  width: 14px !important;
  bottom: 6px;
}
</style>
