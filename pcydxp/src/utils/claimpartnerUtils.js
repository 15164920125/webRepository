/*漫道新协陪PC全局工具类*/
/**
 * appStatus app任务状态
 */
export const getAppStatusObj = () => {
  return {'0':'临时','1':'待处理','2':'已提交','3':'被退回','4':'已完成','5':'已取消'}
}
/**
 * subRegist 任务类型
 */
export const getSubRegistTypeObj = () => {
  return {'1':'协赔车险任务','2':'协赔非车任务','3':'车险领款人任务','4':'车险查勘任务','5':'非车险领款人任务','6':'非车险领款人退票任务','7':'车险领款人退票任务'};
}
/**
 * 任务来源
 */
export const getTaskSourceObj = () => {
  return {'1':'理赔推送','2':'移动发起','3':'集审发起','5':'销管发起','6':'V盟发起','7':'PC端发起'}
}
/**
 * 出险原因
 */
export const getDamageCodeArr = () => {
  return [
    {value: 'A10001',label: '火灾'},
    {value: 'A10003',label: '暴雨'},
    {value: 'A10004',label: '暴风'},
    {value: 'A10005',label: '雷击'},
    {value: 'A10006',label: '台风'},
    {value: 'A10008',label: '雪灾'},
    {value: 'A10013',label: '泥石流'},
    {value: 'A10014',label: '洪水'},
    {value: 'A10029',label: '碰撞'},
    {value: 'A10031',label: '倾覆'},
    {value: 'A10062',label: '坠落'},
    {value: 'A10064',label: '地面突然下陷下沉'},
    {value: 'A10067',label: '崩塌'},
    {value: 'A10096',label: '其他意外事故'},
    {value: 'A10099',label: '其他'},
    {value: 'A10101',label: '盗窃、抢劫'},
    {value: 'A10104',label: '遗失'},
    {value: 'A10206',label: '其他外来原因'},
    {value: 'A19003',label: '交通事故'},
    {value: 'B10001',label: '暴风'},
    {value: 'B10002',label: '暴雨'},
    {value: 'B10004',label: '洪水'},
    {value: 'B10008',label: '淡水、雨淋'},
    {value: 'B10009',label: '包装破裂'},
    {value: 'B10010',label: '受潮受热'},
    {value: 'B10012',label: '碰撞'},
    {value: 'B10017',label: '交货不到'},
    {value: 'B10020',label: '倾覆'},
    {value: 'B10023',label: '盗抢'},
    {value: 'B10025',label: '坠落'},
    {value: 'B10026',label: '失踪'},
    {value: 'B10027',label: '共同海损'},
    {value: 'B10028',label: '货物短少'},
    {value: 'B10031',label: '偷窃'},
    {value: 'B10034',label: '霉变'},
    {value: 'B10035',label: '提货不着'},
    {value: 'B10037',label: '装卸货意外损失'},
    {value: 'B10044',label: '破碎'},
    {value: 'B10045',label: '渗漏'},
    {value: 'B10048',label: '包装不良'},
    {value: 'B10059',label: '运输工具其他意外事故'},
    {value: 'B10074',label: '雷击'},
    {value: 'B10075',label: '盗窃、抢劫'},
    {value: 'B10076',label: '隧道、桥梁、码头坍塌'},
    {value: 'B10085',label: '沉没'},
    {value: 'B10086',label: '装卸货意外事故'},
    {value: 'B10091',label: '火灾'},
    {value: 'B10092',label: '爆炸'},
    {value: 'B10093',label: '货物损坏'},
    {value: 'B10099',label: '短量、短少'},
    {value: 'B10100',label: '泥石流'},
    {value: 'B10101',label: '突发性滑坡'},
    {value: 'B10111',label: '其他意外事故'}
  ]
}
/**
 * 货币种类
 */
export const getEstiCurrencyArr = () => {
  return [
    {value: 'CNY',label: '人民币'},
    {value: 'USD',label: '美元'},
    {value: 'EUR',label: '欧元'},
    {value: 'JPY',label: '日元'},
    {value: 'HKD',label: '港币'},
    {value: 'GBP',label: '英镑'},
    {value: 'MOP',label: '澳门币'},
    {value: 'AUD',label: '澳元'},
    {value: 'CAD',label: '加元'},
    {value: 'SGD',label: '新加坡元'}
  ]
}
/**
 * 与被保险人关系
 */
export const getRelationShipArr = () => {
  return [
    {value:'000',label:'本人'},
    {value:'001',label:'家属'},
    {value:'002',label:'朋友'},
    {value:'003',label:'同事'},
    {value:'004',label:'修理厂'},
    {value:'005',label:'代理人'},
    {value:'007',label:'PICC员工'},
    {value:'008',label:'被保险人单位员工'},
    {value:'009',label:'分户被保险人'},
    {value:'999',label:'其他'}
  ]
}
/**
 * 格式化日期
 */
export const dateFormat = (value,format) => {
  if (value !== null) {
    var d = new Date(value)
    let o ={
    "M+" : d.getMonth()+1, //month
    "d+" : d.getDate(),  //day
    "h+" : d.getHours(),  //hour
    "m+" : d.getMinutes(), //minute
    "s+" : d.getSeconds(), //second
    "q+" : Math.floor((d.getMonth()+3)/3),  //quarter
    "S" : d.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format))
      format=format.replace(RegExp.$1,(d.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(let k in o){
      if(new RegExp("("+ k +")").test(format))
      format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
    return format;
  }
}
