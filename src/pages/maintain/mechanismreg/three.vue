<template>
  <div class="two">
    <div class="container">
        <tmptab :active = '2'></tmptab>
<!-- 可传入数据 -->
      <div class="info">
        <span>本次可导入</span>
        <span>数据:{{ success }}条</span>
      </div>
<!-- 不可传入数据 -->
      <div class="info">
        <span>本次不可导入</span>
        <span>数据:{{ error }}条</span>
      </div>
      <button class = 'btn' @click = 'btn'>完成</button>
    </div>
  </div>
</template>
<script>
import { Upload } from 'iview'
import tmptab from './tmptab'
export default {
    components:{
        Upload,
        tmptab
    },
    data () {
      return {
        success:0,
        error:0
      }
    },
  created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/mechanismreg/list",
                title: "机构注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
      let fail = this.$route.params;
      if (fail) {
        this.success = fail.success 
        this.error = fail.error 
      }
    },
    methods: {
        btn () {
          // functionJS公用 方法
            this.functionJS.paramsNavgationTo(this, "mechanismreglist");
        }
    }

};
</script>
<style lang="less" scoped>
.two {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container{
      width:100%;
      display:flex;
      flex-direction: column;
    .info {
      width: 60%;
      background: #fffbf6;
      padding: 20px 30px;
      margin: 20px auto;
    }
    .btn{
        border:none;
        outline:none;
        background:#2d8cf0;
        width:150px;
        line-height:30px;
        color:#fff;
        font-size:18px;
        margin:0 auto;
        border-radius:4px;
    }
  }
}
</style>
