<template>
  <div class="list">
    <!-- 头部搜索 -->
    <header>
      <span>版本号</span>
      <Input v-model.trim="params.uId" placeholder="请输入检索版本号" style="width: 200px;margin:0 20px;"/>
      <Button type="primary" icon="ios-search">查询</Button>
      <Button type="primary"  @click="add" style ='margin-left:20px;'>添加新版本</Button>
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
        { title: "编号", key: "iNum", align: "center" },
        { title: "版本", key: "iName", align: "center" },
        { title: "版本名", key: "iSex", align: "center" },
        { title: "类型", key: "iId", align: "center" },
        { title: "下载路径", key: "iphone", align: "center" },
        { title: "版本内容", key: "iDoctor", align: "center" },
        {
          title: "操作",
          key: "iOperate",
          align: "center",
          render: (h, params) => {
            let id = params.row.fdsOrderId;
            return [
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      // this.$router.push({
                      //     name:"wxbannerList"
                      // })
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
      data1: [
        {
          iName: "John Brown",
          iNum: 18,
          iMenagement: "New York No. 1 Lake Park",
          iDate: "2016-10-03",
          iOperate: "编辑",
          id: 1
        }
      ]
    };
  },
  mounted() {},
  methods: {
    loadPage(index) {
      console.log(index);
    },
    loadingData(pageNo, pageSize, val) {
      let params = {
        pageNo,
        pageSize
      };
      if (val != "") {
        params.val = val;
      }
      //    this.$axios.post(url,params).then(res => {
      //     if (res.data.code) {
      //       let ret = res.data
      //       console.log(ret)
      //     }
      //   }).catch(err => {
      //     this.$Message.info("请求失败,请稍候重试");
      //   })
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
