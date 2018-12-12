<template>
  <div class="two">
    <div class="container">
<!-- 进度条tab -->
      <tmptab :active="1"></tmptab>
<!-- 可传入数据 -->
      <div class="info">
        <span>本次可导入</span>
        <span>数据:5条</span>
      </div>
<!-- 不可传入数据 -->
      <div class="info">
        <span>本次不可导入</span>
        <span>数据:5条</span>
      </div>
      <div class="next">
        <button @click = 'next' disabled>下一步</button>
        <span @click = 'prev'>返回重新上传</span>
      </div>
<!-- 列表 -->
      <div class="list">
        <table border cellspacing cellpadding>
          <tr>
            <th>编号</th>
            <th>医生姓名</th>
            <th>医生名称</th>
            <th>医生手机号码</th>
            <th>错误提示</th>
          </tr>
           <tr v-for = 'item in list'>
            <th>编号</th>
            <th>{{ item.name }}</th>
            <th>医生名称</th>
            <th>医生手机号码</th>
            <th>错误提示</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { Upload } from "iview";
import tmptab from "./tmptab";
export default {
  components: {
    Upload,
    tmptab
  },
  data () {
      return {
          list:[
              {
                  name:'00'
              }
          ]
      }
  },
  methods: {
    //   下一步
      next () {
        //   console.log(1)
        this.$router.push({
            name:"doctorregisterbatchthree"
        })
      },
    //   上一步
      prev () {
          this.$router.push({
              name:"doctorregisterbatchone"
          })
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
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .info {
      width: 60%;
      background: #fffbf6;
      padding: 20px 30px;
      margin: 20px auto;
    }
    .next {
      button {
        width: 150px;
        height: 30px;
        border: none;
        outline: none;
        background: skyblue;
        border-radius: 4px;
        color: #fff;
      }
      span {
        color: red;
        cursor:pointer;
      }
    }
       .list {
            width: 80%;
            margin:10px auto;
            table {
                width: 100%;
                tr:first-child{
                background-color: rgb(228, 228, 228);
                color: rgb(102, 102, 102);
                }
                tr {
                    th {
                        text-align: center;
                    }
                }
            }
            .notData{
                width:100%;
                text-align:center;
                border:1px solid black;
                border-top:none;
                
            }
    }
  }
}
</style>
