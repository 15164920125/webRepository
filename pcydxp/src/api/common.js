/**
 * 公共接口模块列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/https'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const server = {
    // 查询省市县
    findCpCustRegistInfo (params) {
      // return axios.post('/cpWeb/queryInsurance',qs.stringify(params));
      return axios.post(`${base.apiBase1}/cpWeb/getPrpDAreaCode`,qs.stringify(params));
    },
    //照片上传
    uploadPhoto (params) {
      // params["method"] = "uploadRegistPhoto";
      // return axios.post('/cpWeb/dispatcher',qs.stringify(params));
      return axios.post(`${base.apiBase1}/cpWeb/upload`,params);
    },
    //任务统计量
    getTaskCountNum (params) {
      return axios.post(`${base.apiBase1}/cpWeb/dispatcher`,qs.stringify(params));
    },
    //main列表查询
    getMyJob (params) {
      return axios.post(`${base.apiBase1}/cpWeb/dispatcher`,qs.stringify(params));
    },
    //查询机构
    getCompanys (params) {
      return axios.post(`${base.apiBase1}/cpWeb/getCompanys`,qs.stringify(params));
    },
    //注册接口
    submitRegist (params) {
      return axios.post(`${base.apiBase1}/cpWeb/dispatcher`,qs.stringify(params));
    },
    //人员分类机构
    userTypeList (params) {
      return axios.post(`${base.apiBase1}/cpWeb/dispatcher`,qs.stringify(params));
    },
    //重置密码
    resetPassword  (params) {
      return axios.post(`${base.apiBase1}/cpWeb/dispatcher`,qs.stringify(params));
    }
}

export default server;
