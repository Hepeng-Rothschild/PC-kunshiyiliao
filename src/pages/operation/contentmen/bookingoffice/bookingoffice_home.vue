<template>
  <div class="k_department">
    <tmpHeader/>
    <div class="k_department-main">
      <!--搜索框-->
      <header>
        <div>
          <Input placeholder="请输入一级科室或二级科室查询" v-model.trim="val" style="width: 200px;margin-right:10px;" clearable/>
        </div>
        <Button type="primary" icon="ios-search" @click="valChange">查询</Button>
      </header>
      <!--列表-->
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>序号</th>
            <th>一级科室</th>
            <th>二级科室</th>
            <th>科室就诊位置</th>
            <th>是否显示</th>
            <th>排序</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in tableList" v-show="tableList.length" :key='index'>
            <td>{{ addZeros(index) }}</td>
            <td>{{ item.parentDept }}</td>
            <td>{{ item.childDept }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.display !=1? '否' :'是' }}</td>
            <td>{{ item.priority }}</td>
            <td >
              <span @click="edit(item)" style='cursor:pointer;color:#2d8cf0;'>编辑</span>
            </td>
          </tr>
        </table>
        <div class="footer" v-show="!tableList.length">暂无更多数据</div>
      </div>
    </div>
    <div style="text-align:center;margin:10px 0;">
      <Page :total="bookingofficeSize" @on-change="pageChange" :current="pageNo"/>
    </div>
  </div>
</template>

<script>
// 预约科室
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      tableList: [],
      id: sessionStorage.getItem("hospitalId"),
      bookingofficeSize: 10,
      val: "",
      pageNo: 1
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
  methods: {
    //分页器改变
    pageChange(index) {
      this.pageNo = index;
      if (this.val) {
        this.getBookingofficeData(index, this.val);
      } else {
        this.getBookingofficeData(index);
      }
    },
    edit(item) {
      let id = item.id;
       //functionJS公用跳转方法
        this.functionJS.paramsNavgationTo(this, "bookingofficeEdit", {
          id,
          pageNo:this.pageNo
        });
    },
    // 模糊查询
    valChange() {
      this.getBookingofficeData(1, this.val);
    },
    getBookingofficeData(pageNo, val) {
      let params = {
        childDept: "",
        hospitalId: this.id,
        pageNo,
        pageSize: 10
      };
      if (Boolean(val)) {
        params.searchKey = val.trim();
      }
      this.$axios.post(api.kDepartment, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.tableList = ret.list;
          this.bookingofficeSize = ret.count;
        }
      });
    }
  },
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getBookingofficeData(this.pageNo);
  }
};
</script>

<style scoped lang="less">
.k_department {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .k_department-main {
    width: 80%;
    margin: 10px auto;
    header {
      width: 100%;
      display: flex;
      flex-direction: row;
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
          background: #ebf7ff;
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