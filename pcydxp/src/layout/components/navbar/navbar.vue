<template>
  <div class="header-box">
    <el-row :gutter="20" style="margin: 0;">
      <el-col :span="6" style="padding: 0;">
        <div class="header-box-l"><p>人保财险理赔系统-合作伙伴</p></div>
      </el-col>
      <el-col :span="18" style="padding: 0;">
        <div class="header-box-r"><p>当前版本为：<span>1.0.3.0</span></p></div>
       </el-col>
    </el-row>
  </div>
</template>

<script>
</script>

<style scoped>
  .header-box{
    height: 60px;
    padding: 0;
    background: #FFFFFF;
    /* border-top: 1px solid #d8d8d8; */
    box-shadow:5px 5px 10px #d8d8d8;
    -webkit-box-shadow:5px 5px 10px #d8d8d8;
    -moz-box-shadow:5px 5px 10px #d8d8d8;
  }
  .header-box-l p{
    color: #484848;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 60px;
    margin-left: 20px;
    min-width: 227px;
  }
  .header-box-r{
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
    line-height: 60px;
    text-align: right;
    padding-right: 74px;
    opacity: 0.5;
  }
</style>
