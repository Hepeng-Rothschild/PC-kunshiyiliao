<template>
  <div class="expert">
    <!--列表-->
    <tmpHeader/>
    <!--添加专家/搜索-->
    <div class="iheader" v-show="!flag">
      <div class="box">
        <div class="boxs">
          <Input v-model.trim="val" placeholder="请输入专家姓名查询" style="width: 200px" @on-keyup.enter="valChange" clearable/>
        </div>
        <Button type="primary" @click="valChange" style="margin-left:20px;">查询</Button>
      </div>
      <Button type="primary" @click="navto">添加专家</Button>
    </div>
    <!--表格列表-->
    <div class="main" v-show="!flag">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>编号</th>
          <th>专家科室</th>
          <th>专家姓名</th>
          <th>职称</th>
          <th>职务</th>
          <th>显示</th>
          <th>排序</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in tablesList" v-show="tablesList.length" :key='index'>
          <th>{{ addZeros(index) }}</th>
          <th>{{ item.deptType }}</th>
          <th>{{ item.doctorName }}</th>
          <th>{{ item.title }}</th>
          <th>{{ item.post }}</th>
          <th>{{ item.display ? '是' :'否' }}</th>
          <th>{{ item.priority }}</th>
          <th @click="edit(item)" style="cursor:pointer">编辑</th>
        </tr>
      </table>
      <div class="footer" v-show="!tablesList.length">暂无更多数据</div>
    </div>
    <div style="text-align:center;margin:10px 0;">
      <Page :total="expertSize" @on-change="pageChange" :current="pageNo" v-show="!flag"/>
    </div>
  </div>
</template>

<script>
// 专家介绍
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      tablesList: [],
      id: sessionStorage.getItem("hospitalId"),
      expertSize: 10,
      val: "",
      pageNo: 1,
      flag: ""
    };
  },
  created() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getExpertData(this.pageNo);

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
    this.status();
  },
  methods: {
    //分页器改变
    pageChange(index) {
      this.pageNo = index;
      if (this.val != "") {
        this.getExpertData(index, this.val);
      } else {
        this.getExpertData(index);
      }
    },
    status() {
      let flag = localStorage.getItem("status");
      if (!Boolean(flag)) {
        this.$Message.info("您还没有开通互联网医院,去开通");
        this.flag = true;
        localStorage.setItem("homeIndex", 0);
        setTimeout(() => {
          this.functionJS.paramsNavgationTo(this, "homeInfo", {
            // 公用方法
          }); 
        }, 600);
      }
    },
    // 模糊查询
    valChange() {
      this.getExpertData(1, this.val);
    },
    navto() {
      this.functionJS.paramsNavgationTo(this, "expertAdd", {
        // 公用方法
          pageNo: this.pageNo
      }); 
    },
    edit(item) {
      let id = item.doctorId;
      this.functionJS.paramsNavgationTo(this, "expert_edits", {
        // 公用方法
          item,
          pageNo: this.pageNo
      }); 
    },
    getExpertData(pageNo, val) {
      let params = {
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (val != "") {
        params.doctorName = val.trim();
      }
      this.$axios
        .post(api.zj, params)
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.tablesList = ret.list;
            this.expertSize = ret.count;
          }
        })
        .catch(err => {
          console.log(err);
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
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .box {
      display: flex;
      flex-direction: row;
      align-items: center;
      .btn {
        width: 100px;
        height: 30px;
        text-align: center;
        border: none;
        outline: none;
        background: #2d8cf0;
        color: #fff;
        border-radius: 4px;
        margin-left: 10px;
      }
    }
  }
  .main {
    width: 80%;
    margin: 0 auto;
    .footer {
      width: 100%;
      border: 1px solid #ddd;
      border-top: none;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
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
  }
}
</style>