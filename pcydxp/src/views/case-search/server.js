/**
 * 报案登记模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/https'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const server = {
    // 案件查询
    caseSearch (params) {
      return axios.post(`${base.apiBase1}/cpWeb/queryRegistCaseList`,qs.stringify(params));
    },
    // 继续查询
    continueQuery (params) {
      return axios.post(`${base.apiBase1}/cpWeb/continueQuery`,qs.stringify(params));
    }
    // post提交
    // login (params) {
    //     return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
    // }
    // 其他接口…………
}

export default server;
