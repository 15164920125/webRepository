/**
 * 报案登记模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/https'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const server = {
    taskDetail (params) {
      return axios.post(`${base.apiBase1}/cpWeb/gainCpTask`,qs.stringify(params));
    },
    taskList (params) {
      return axios.post(`${base.apiBase1}/cpWeb/dispatcher`,qs.stringify(params));
    }
}

export default server;
