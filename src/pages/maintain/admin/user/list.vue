<template>
  <div class="adminList">
    <!-- 模糊查询 -->
    <div class="container">
      <header>
       
        <div>
           <!-- 添加账号 -->
          <Button type="primary" @click="add">添加账号</Button>
          <!-- 权限管理 -->
          <Button type="primary" @click='Jurisdiction'>用户权限管理</Button>
        </div>
        <Input
          placeholder="输入登录账号/用户姓名进行查询"
          style="width: 300px"
          v-model.trim="searchKey"
          @on-keyup="vagueSearch"
        />
      </header>
      <!-- 列表 -->
      <div class="list">
        <Table size="small" :columns="list" :data="data1"></Table>
      </div>
      <!-- 分页 -->
      <Page
        :total="count"
        :current="pageNo"
        :page-size="pageSize"
        @on-change="loadPage"
        style="margin-top:20px;"
      />
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
  data() {
    return {
      count: 0,
      pageNo: 1,
      pageSize: 10,
      searchKey: "",
      list: [
        {
          title: "编号",
          iNum: "num",
          align: "center"
        },
        {
          title: "登录账号",
          key: "name",
          align: "center"
        },
        {
          title: "用户昵称",
          key: "address",
          align: "center"
        },
        {
          title: "用户头像",
          key: "avatar",
          align: "center",
          render: (h, params) => {
            let avatar = params.row.avatar;
            let defaultSrc = require("@/assets/images/heicon.jpg");
            return h("img", {
              attrs: {
                src: avatar || defaultSrc,
                style: "width:40px;height:40px;border-radius:50%;"
              }
            });
          }
        },
        {
          title: "用户姓名",
          key: "age",
          align: "center"
        },
        {
          title: "电话号码",
          key: "address",
          align: "center"
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            // let id = params.row.id;
            return [
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      console.log("编辑");
                      this.$router.push({
                        name: "adminedit",
                        params: {
                          pageNo: this.pageNo
                        }
                      });
                    }
                  }
                },
                "编辑 |"
              ),
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      console.log("重置密码");
                      this.$router.push({
                        name: "adminreset",
                        params: {
                          pageNo: this.pageNo
                        }
                      });
                    }
                  }
                },
                "重置密码"
              )
            ];
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "17610653656",
          date: "2016-10-03"
        }
      ]
    };
  },
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (Boolean(pageNo)) {
      this.pageNo = pageNo;
    }
    // 预加载数据
    // this.loadUserData()
  },
  methods: {
    // 添加角色
    add() {
      this.$router.push({
        name: "adminadd"
      });
    },
    // 用户权限管理
    Jurisdiction () {
      this.$router.push({
        name:"adminJurisdiction"
      })
    },
    // 分页器改变
    loadPage(pageNo) {
      this.pageNo = pageNo;
      if (this.searchKey != "") {
      }
    },
    // 模糊查询
    vagueSearch() {
      console.log(this.searchKey);
    },
    // 请求数据
    loadUserData(val) {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      if (val != "") {
        params.searchKey = searchKey;
      }
      this.$axios.post(url, params).then(res => {
        if (res.data.code) {
          let ret = res.data;
          console.log(ret);
        } else {
          this.$Message.info("数据请求失败,请稍候重试");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.adminList {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 100%;
    margin: 0 auto;
    header {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .btn {
        button {
          border: none;
          outline: none;
          color: #fff;
          width: 128px;
          height: 39px;
          border-radius: 2px;
        }
      }
      .search {
        background-color: rgb(255, 255, 255);
        width: 276px;
        height: 32px;
        border-radius: 16px;
        border-width: 1px;
        border-color: rgb(102, 102, 102);
        border-style: solid;
        input {
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          text-decoration: none;
          border: none;
          outline: none;
          font-family: 微软雅黑;
          color: rgb(102, 102, 102);
          padding-left: 28px;
          width: 100%;
          line-height: 32px;
          background: none;
        }
      }
    }
    .list {
      width: 100%;
      margin: 10px 0;
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
          th {
            text-align: center;
          }
        }
      }
      .notData {
        width: 100%;
        text-align: center;
        border: 1px solid #ddd;
        border-top: none;
        line-height: 40px;
      }
    }
  }
}
</style>
