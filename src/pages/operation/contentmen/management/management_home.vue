<template>
  <div class="expert">
    <!--列表-->
    <tmpHeader/>
    <!--添加专家/搜索-->
    <div class="iheader">
      <Button type="primary" @click="navto" icon="ios-search">添加服务</Button>
    </div>
    <!--表格列表-->
    <div class="main">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>编号</th>
          <th>服务分类</th>
          <th>已开通服务</th>
          <th>操作</th>
        </tr>
        <tr v-for="item,index in tablesList" v-show="tablesList.length">
          <th>{{ addZeros(index) }}</th>
          <th>{{ item.menuName }}</th>
          <th>
            <span v-for="items,index in item.result">{{ items }}<span v-show='item.result.length != index+1'>、</span></span>
          </th>
          <th @click="navto(item)" style="cursor:pointer;">编辑</th>
        </tr>
      </table>
      <div class="footer" v-show="!tablesList.length">暂无更多数据</div>
    </div>
  </div>
</template>

<script>
//服务管理
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      tablesList: [],
      id: sessionStorage.getItem("hospitalId")
    };
  },
  created(){
    let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/mechanism/index",
                title: "机构运营"
            },
            {
                path: "/index/operation/home",
                title: "机构管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
  },
  mounted() {
    this.getManagementData();
  },
  methods: {
    //分页器改变
    pageChange(index) {
      //   this.getManagementData(index);
    },
    navto(item) {
      this.functionJS.paramsNavgationTo(this, "managementAdd", {
        // 公用方法
      }); 
    },
    // 请求数据
    getManagementData() {
      this.$axios
        .post(api._server, {
          hospitalId: this.id
        })
        .then(res => {
          if (res.data) {
            let ret = res.data.object;
            this.tablesList = ret;
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
.expert {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .iheader {
    width: 80%;
    margin: 10px auto;
  }
  .main {
    width: 80%;
    margin: 0 auto;
    table {
      width: 100%;
      border: 1px solid #ddd;
      tr:nth-child(odd) {
        background: #f8f8f9;
      }
      tr:nth-child(even) {
        background: #fff;
      }
      tr:not(:first-child):hover {
        background: #ebf7ff;
      }
      tr {
        border-top: 1px solid #ddd;
        height: 40px;
        th {
          text-align: center;
        }
      }
    }
    .footer {
      width: 100%;
      border: 1px solid #ddd;
      border-top: none;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>