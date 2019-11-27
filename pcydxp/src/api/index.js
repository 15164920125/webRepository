/**
 * api接口的统一出口
 */
// 报案登记模块接口
import policyServer from '@/views/report-a-case/server';
// 案件查询模块的接口
import caseServer from '@/views/case-search/server';
// 我的协陪模块的接口
import mineTaskServer from '@/views/mine-task/server';
// 公共接口
import comIterface from './common';
// 导出接口
export default {
    policyServer,
    caseServer,
    mineTaskServer,
    comIterface
}
