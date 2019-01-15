<template>
  <div class="adminList">
    <!-- 头部信息 -->
    <div class="container">
      <header>
        <Input placeholder="使用登录账号/用户姓名进行查询" style="width: 260px" v-model.trim="searchKey"/>
        <Button type="primary" @click="add">添加账号</Button>
      </header>
      <div class="list">
        <Table size="small" :columns="list" :data="data1"></Table>
      </div>
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
          iNum: "num"
        },
        {
          title: "登录账号",
          key: "name"
        },
        {
          title: "用户姓名",
          key: "age"
        },
        {
          title: "机构名称",
          key: "address"
        },
        {
          title: "添加人",
          key: "age"
        },
        {
          title: "联系方式（手机）",
          key: "address"
        },
        {
          title: "角色",
          key: "user"
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
                        name: "adminedit"
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
                        name: "adminreset"
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
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        }
      ]
    };
  },
  created(){
    let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/systemManagement/index",
                title: "系统管理"
            },
            {
                path: "/index/maintain/admin/user/list",
                title: "账号管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
  },
  mounted () {
    
  },
  methods: {
    // 添加角色
    add() {
      this.$router.push({
        name: "adminadd"
      });
    },
    // 分页器改变
    loadPage(pageNo) {
      this.pageNo = pageNo;
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
    width: 90%;
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
