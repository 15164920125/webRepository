/**
 * registValid 注册校验类
 */
let RegistValid = (function(){
  function RegistValid () {}
  RegistValid.valid = function(){
    return {
      //姓名
      userNameValid (rule, value, callback) {
        if(!/^([\u4E00-\uFA29]{2,15}|[\uE7C7-\uE7F3]{2,15})$/.test(value)) {
          return callback(new Error("姓名为2-15位中文"));
        } else {
          callback();
        }
      },
      //Hr编码
      hrCodeValid (rule, value, callback) {
        if(!/^[A-Za-z0-9]{8}$/.test(value)) {
          return callback(new Error("HR编码为8位英文或数字"));
        } else {
          callback();
        }
      },
      //身份证
      identityNoValid (rule, value, callback) {
        if(!/^\d{17}[\d|X]$|^\d{15}$/.test(value)) {
          return callback(new Error("身份证为15位或者18位数字或英文"));
        } else {
          callback();
        }
      },
      //手机号
      mobileValid (rule, value, callback) {
        if(!/^\d{11}$/.test(value)) {
          return callback(new Error("手机号为11位数字"));
        } else {
          callback();
        }
      },
      //邮箱
      emailValid (rule, value, callback) {
        if(value && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
          return callback(new Error("邮箱格式不正确"));
        } else if(value && !/^.{1,50}$/.test(value)){
          return callback(new Error("邮箱必须为50字以内"));
        }else{
          callback();
        }
      },
      //邮箱
      serviceAreaValid (rule, value, callback) {
        if(value && !/^.{0,20}$/.test(value)) {
          return callback(new Error("服务区域最多20个字以内"));
        }else{
          callback();
        }
      },
      //密码
      passwordValid (rule, value, callback) {
        if(!/^.{6,12}$/.test(value)) {
          return callback(new Error("密码至少6位,至多12位"));
        } else {
          callback();
        }
      },
    }
  }
  return RegistValid
})()

exports.RegistValid = RegistValid
