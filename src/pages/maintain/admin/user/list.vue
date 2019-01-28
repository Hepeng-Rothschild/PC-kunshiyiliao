<template>
  <div class="adminList">
    <!-- 模糊查询 -->
    <div class="container">
      <header>
        <div>
          <Input
            placeholder="请输入登录账号/用户昵称进行查询"
            style="width: 250px"
            v-model.trim="searchKey"
            @on-keyup.enter="vagueSearch"
            clearable
          />
          <Button type="primary" icon="ios-search" @click="vagueSearch">查询</Button>
          <!-- 添加账号 -->
          <Button  @click="add">添加账号</Button>
        </div>
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
          key: "num",
          align: "center"
        },
        {
          title: "登录账号",
          key: "userName",
          align: "center"
        },
        {
          title: "用户昵称",
          key: "nickName",
          align: "center"
        },
        {
          title: "用户头像",
          key: "avatar",
          align: "center",
          render: (h, params) => {
            let avatar = this.analysisImages(params.row.userIcon);
            if (Boolean(avatar)) {
              avatar = this.fileBaseUrl + avatar;
            }
            return h("img", {
              attrs: {
                src: avatar || './static/img/heicon.jpg',
                style: "width:40px;height:40px;border-radius:50%;"
              }
            });
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            let status = params.row.status,
              btnText = "";
            if (status == 1) {
              btnText = "启用";
            } else {
              btnText = "禁用";
            }
            return h("span", {
              domProps: {
                innerHTML: btnText
              }
            });
          }
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            let id = params.row.id;
            return [
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/index/maintain/admin/user/edit",
                        query: {
                          pageNo: this.pageNo,
                          id
                        }
                      });
                    }
                  }
                },
                "编辑 | "
              ),
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/index/maintain/admin/user/Jurisdiction",
                        query: {
                          pageNo: this.pageNo,
                          id
                        }
                      })
                    }
                  }
                },
                "权限管理"
              )
            ];
          }
        }
      ],
      data1: []
    };
  },
  mounted() {
    let pageNo = this.$route.query.pageNo;
    if (Boolean(pageNo)) {
      this.pageNo = Number(pageNo);
    }
    // 预加载数据
    this.loadUserData();
  },
  created() {
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
  methods: {
    // 添加角色
    add() {
      this.$router.push({
        path: "/index/maintain/admin/user/add",
        query: {
          pageNo: this.pageNo
        }
      });
    },
    // 分页器改变
    loadPage(pageNo) {
      this.pageNo = pageNo;
      if (this.searchKey != "") {
        this.loadUserData(this.searchKey);
      } else {
        this.loadUserData();
      }
    },
    // 模糊查询
    vagueSearch() {
      this.loadUserData(this.searchKey);
    },
    // 请求数据
    loadUserData(val) {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      if (val != "") {
        params.searchKey = val;
      }
      this.$axios.post(api.adminList, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.count = ret.count;
          ret.list.forEach((item, index) => {
            item.num = index + 1;
          });
          this.data1 = ret.list;
        } else {
          this.$Message.info("没有访问权限");
        }
      });
    },
    analysisImages(json) {
      try {
        json = JSON.parse(json);
        return json.fileName;
      } catch (error) {
        return "";
      }
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
