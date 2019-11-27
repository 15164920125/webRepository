<!--分页-->
<template>
	<div class="pagination" v-if="totalPage>=1">
		<span v-if="!small" class="total">从第1行到第{{limitNum}}行/共{{totalCount}}条记录</span>
		<select class="page-select" v-if="!small" v-model="limitNum" @change="turn(currentPage)">
			<option v-for="item in limitNums" :key="item" :value="item">{{item}}</option>
		</select>
    <div class="page-box">
      <span  v-if="all" class="jump"><input class="page-input" type="number" autocomplete="off" min="1" :max="totalPage" v-model="goPage" ></span>
      <span class="page-go" @click="turn(goPage)">GO</span>
      <span class="page-start" @click="turn(1)">首页</span>
      <ul class="paging">
        <li class="prev" :class="{'disabled':currentPage<=1}" @click="currentPage<=1?'':turn(currentPage-1)">上一页</li>
        <li v-for="i in showPageBtn"
          :key="i" class="num"
          :class="{'active':i==currentPage,'el-icon-more':i==='-'||i==='+','icon-d-arrow-left':toPrev&&i==='-','icon-d-arrow-right':toNext&&i==='+'}"
          @mouseenter="i==='-'?toPrev=true:i==='+'?toNext=true:''"
          @mouseleave="i==='-'?toPrev=false:i==='+'?toNext=false:''"
          @click="i==='-'?turn(currentPage-1):i==='+'? turn(currentPage+1):turn(i)">{{i>0?i:''}}</li>
        <!--<li v-else-if="i==='-'" class="num iconfont icon-more" :class="{'icon-d-arrow-left':toPrev}" @click="turn(currentPage-1)" @mouseenter="toPrev=true" @mouseleave="toPrev=false"></li>
        <li v-else-if="i==='+'" class="num iconfont icon-more" :class="{'icon-d-arrow-right':toNext}" @click="turn(currentPage+1)" @mouseenter="toNext=true" @mouseleave="toNext=false"></li>
  -->
        <li class="next" :class="{'disabled':currentPage>=totalPage}"  @click="currentPage>=totalPage?'':turn(currentPage+1)">下一页</li>
      </ul>
      <span class="page-end" @click="turn(totalPage)">末页</span>
    </div>
	</div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    currentPage: {
      //当前页
      type: Number,
      default: 1
    },
    limit: {
      //每页显示条数
      type: Number,
      default: 10
    },
    totalCount: {
      //总条数
      type: Number,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    all: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      goPage: "1",
      limitNum: "",
      limitNums: [10, 20, 50],
      toPrev: false,
      toNext: false
    };
  },
  created: function() {
    this.initLimitNums();
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / this.limit);
    },
    showPageBtn() {
      let pageNum = Number(this.totalPage),
        index = Number(this.currentPage),
        arr = [];
      if (pageNum <= 9) {
        for (let i = 1; i <= pageNum; i++) {
          arr.push(i);
        }
        return arr;
      }
      if (index < 5) return [1, 2, 3, 4, 5, 6, 7, "+", pageNum];
      if (index >= pageNum - 1)
        return [
          1,
          2,
          "-",
          pageNum - 5,
          pageNum - 4,
          pageNum - 3,
          pageNum - 2,
          pageNum - 1,
          pageNum
        ];
      if (index === pageNum - 2)
        return [
          1,
          2,
          "-",
          pageNum - 5,
          pageNum - 4,
          pageNum - 3,
          pageNum - 2,
          pageNum - 1,
          pageNum
        ];
      return [
        1,
        "-",
        index - 2,
        index - 1,
        index,
        index + 1,
        index + 2,
        "+",
        pageNum
      ];
    }
  },
  methods: {
    initLimitNums() {
      this.limitNum = this.limit;
      //if (this.limitNums.indexOf(this.limit) == -1) {
      if (!this.limitNums.includes(this.limit)) {
        this.limitNums.push(this.limit);
        this.limitNums.sort(function(a, b) {
          return a - b;
        });
      }
    },
    //翻页，显示条数变化
    turn(page) {
      let i = parseInt(Number(page));
      if (i < 1) {
        i = 1;
      } else if (i > this.totalPage) {
        i = this.totalPage;
      }
      if (this.limitNum !== this.limit && this.limitNum !== "") {
        //每页显示条数改变
        let pages = Math.ceil(this.totalCount / this.limitNum);
        if (page > pages) {
          i = pages;
        }
        this.$emit("update:limit", this.limitNum);
      }
      this.$emit("update:currentPage", i);
      this.$emit("turn");
    }
  }
};
</script>
<style scoped>
.pagination{
  margin-top: 10px;
  margin-bottom: 20px;
}
.pagination .total{
  font-size: 12px;
}
.page-box{
  float:right;
  font-size:0;
}
.page-select{
  width: 54px;
  height:22px;
  line-height: 20px;
  border-radius: 4px;
}
.page-box > span{
  text-align: center;
  display: inline-block;
  border: 1px solid #CBCBCB;
  font-size:10px;
  height:22px;
  line-height: 20px;
  cursor: pointer;
}
.page-box .page-start,
.page-box .page-end{
  width: 34px;
}
.page-box .page-start{
  border-right: 0;
}
.page-box .page-end{
 border-top-right-radius: 4px;
 border-bottom-right-radius: 4px;
}
.page-box .jump{
  width:28px;
  height:22px;
  line-height: 20px;
  border-radius: 4px;
}
.page-box .page-input{
  border: 0;
  width:100%;
  line-height: 19px;
  text-indent: 10px;
  border-radius: 4px;
}
.page-box .page-input:focus{
  border:0;
}
.paging{
  display: inline-block;
}
.page-go{
  width:34px;
  color: #1A88FF;
  margin-left: 8px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 0 !important;
}
.paging li{
  list-style: none;
  display: inline-block;
  width:28px;
  height:22px;
  line-height: 20px;
  font-size: 10px;
  color: #484848;
  text-align: center;
  border: 1px solid #CBCBCB;
  cursor: pointer;
  border-right: 0;
}
.paging li.active{
  background: #1A88FF;
  color:#FFFFFF;
  border-color: #1A88FF;
}
.paging .prev{
  width:43px;
}
.paging .next{
  width:43px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}
.el-icon-more{
  position: relative;
  top: -1px;
}
</style>
