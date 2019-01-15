<template>
  <div class="i_keshi">
    <tmpHeader/>
    <!--搜索-->
    <div class="i-keshi_main" v-show = '!flag'>
      <div class="ibanner_header">
        <div class="header_input">
          <span></span>
          <Input v-model.trim="search" placeholder="一级科室/二级科室" style="width: 200px" @on-keyup='searchs'/>
        </div>
      </div>
      <!--列表-->
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>序号</th>
            <th>一级科室</th>
            <th>二级科室</th>
            <th>院内科室</th>
            <th>显示</th>
            <th>排序</th>
            <th>操作</th>
          </tr>
          <tr v-for="item,index in tableList" v-show="tableList.length">
            <td>{{ addZero(index) }}</td>
            <td>{{ item.parentDept }}</td>
            <td>{{ item.childDept }}</td>
            <td>{{ item.deptNickname }}</td>
            <td>{{ changeshow(item.display) }}</td>
            <td>{{ item.priority }}</td>
            <td class="ltd">
              <span @click="navto(item)" style="cursor:pointer;">编辑</span>
            </td>
          </tr>
        </table>
        <div class="footer" v-show="!tableList.length">暂无更多数据</div>
      </div>
    </div>
    <div style="text-align:center;margin:10px 0;" v-show = '!flag'>
      <Page :total="departmentsSize" @on-change="pageChange" :current = "pageNo"/>
    </div>
  </div>
</template>

<script>
// 特色科室
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import { Page } from "iview";
export default {
  components: {
    tmpHeader,
    Page
  },
  data() {
    return {
      tableList: [],
      id: sessionStorage.getItem("hospitalId"),
      departmentsSize: 10,
      search:"",
      pageNo:1,
      flag:""
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
    this.status()
     let pageNo = this.$route.params.pageNo
    if(pageNo) {
      this.pageNo = pageNo;
    }
    this.getDepartmentsData(this.pageNo);
  },
  methods: {
    // 分页器,切换事件
    pageChange(index) {
      this.pageNo = index
      if (this.search) {
        this.getDepartmentsData(index,this.search);
      } else {
        this.getDepartmentsData(index);
      }
    },
    status() {
      let flag = localStorage.getItem("status");
      if (!Boolean(flag)) {
        this.$Message.info("您还没有开通互联网医院,去开通");
        this.flag = true;
        sessionStorage.setItem("homeIndex", 0);
        setTimeout(() => {
          this.$router.push({
            name: "homeInfo"
          })
        }, 600)
      }
    },
    searchs() {
      this.getDepartmentsData(1,this.search);
    },
    navto(item) {
      let id = item.id;
      this.$router.push({
        name: "departmentsList",
        params: {
          id,
          pageNo:this.pageNo
        }
      });
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    getDepartmentsData(pageNo,val) {
      let params = {
          hospitalId: this.id,
          pageNo,
          pageSize: 10
        }
        if (val != '') {
          params.searchKey = val
        }
      this.$axios
        .post(api.tesekeshi, params)
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.tableList = ret.list;
            this.departmentsSize = ret.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeshow (show) {
      if (show !=1) {
        return '否'
      }
      return '是'
    }
  }
};
</script>

<style scoped lang="less">
.i_keshi {
   width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .i-keshi_main {
    width: 80%;
    margin: 10px auto;
    .ibanner_header {
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      button {
        padding: 6px 8px;
        background: #716bb2;
        color: #ffb2b2;
        border: none;
        outline: none;
        border-radius: 4px;
      }
    }
    .tabList {
      width: 100%;
      margin: 20px 0;
      .footer {
        width: 100%;
        border: 1px solid #ddd;
        height: 40px;
        line-height: 40px;
        border-top: none;
        text-align: center;
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
          background: #9dcae4;
        }
        tr {
          border-top: 1px solid #ddd;
          height: 40px;
          td {
            text-align: center;
          }
          .ltd {
            color: black;
            user-select: none;
            cursor: pointer;
          }
          th {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>