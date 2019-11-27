/**
 * 报案登记模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/https'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const server = {
    // 保单查询
    policySearch (params) {
      // return axios.post('/cpWeb/queryInsurance',qs.stringify(params));
      return axios.post(`${base.apiBase1}/cpWeb/queryInsurance`,qs.stringify(params));
    },
    //发起协陪
    initiateXp (params) {
      return axios.post(`${base.apiBase1}/cpWeb/gainCpTask`,qs.stringify(params));
    },
    //报案提交
    registCase (params) {
      return axios.post(`${base.apiBase1}/cpWeb/registCase`,qs.stringify(params));
    },
    //验证保单
    validatePolicy (params) {
      return axios.post(`${base.apiBase1}/cpWeb/checkPolicyToRegist`,qs.stringify(params));
    }
}

export default server;
