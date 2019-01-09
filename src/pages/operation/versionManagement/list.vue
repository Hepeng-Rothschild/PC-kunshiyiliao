<template>
  <div class="list">
    <!-- 头部搜索 -->
    <header>
      <span>版本号</span>
      <Input v-model.trim="params.uId" placeholder="请输入版本号进行查询" style="width: 200px;margin:0 20px;"/>
      <Button type="primary" icon="ios-search" @click="search">查询</Button>
      <Button type="primary" @click="add" style="margin-left:20px;">添加新版本</Button>
    </header>
    <!-- 列表 -->
    <div class="table">
      <Table size="small" :columns="columns1" :data="data1"></Table>
      <Page
        :total="count"
        :current="pageNo"
        :page-size="pageSize"
        @on-change="loadPage"
        class="pages"
      />
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
  data() {
    return {
      params: {
        uId: ""
      },
      pageNo: 1,
      pageSize: 10,
      count: 10,
      columns1: [
        { title: "编号", key: "sum", align: "center" },
        { title: "版本ID", key: "id", align: "center" },
        { title: "版本名", key: "versionName", align: "center" },
        { title: "版本号", key: "versionNumber", align: "center" },
        { title: "版本唯一标识", key: "versionId", align: "center" },
        { title: "类型", key: "type1", align: "center" },
        { title: "下载路径", key: "downloadPath", align: "center" },
        { title: "版本内容", key: "content", align: "center" },
        {
          title: "操作",
          key: "iOperate",
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
                        name: "versionManagementEdit",
                        params: {
                          id
                        }
                      })
                      console.log(1, id);
                    }
                  }
                },
                "编辑"
              )
            ];
          }
        }
      ],
      data1: []
    };
  },
  mounted() {
    this.loadingData(this.pageNo);
  },
  methods: {
    loadPage(index) {
      this.pageNo = index;
      if (this.params.uId) {
        this.loadingData(this.pageNo, this.params.uId);
      } else {
        this.loadingData(this.pageNo);
      }
    },
    search() {
      this.loadingData(this.ageNo, this.params.uId);
    },
    loadingData(pageNo, val) {
      let params = {
        pageNo,
        pageSize: 10
      };
      if (val != "") {
        params.searchKey = val;
      }
      this.$axios.post(api.versionlist, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.count = ret.count;
          ret.list.forEach((item, index) => {
            item.sum = index+1;
            if (item.type == 1) {
              item.type1 = "安卓";
            } else {
              item.type1 = "IOS";
            }
          });
          this.data1 = ret.list;
        } else {
          this.$Message.info("请求失败,请稍候重试");
        }
      });
    },
    add() {
      this.$router.push({
        name: "versionManagementAdd"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  width: 98%;
  padding: 10px;
  margin-left: 1%;
  margin: 0 auto;
  background: #fff;
  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }
  .pages {
    margin-top: 20px;
  }
}
</style>
