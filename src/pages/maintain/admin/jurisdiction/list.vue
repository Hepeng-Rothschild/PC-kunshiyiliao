<template>
  <div class="list">
    <header>
      <Button type="primary" @click= 'addRole'>添加角色</Button>
      <Input v-model="value" placeholder="角色名称/角色描述" style="width: 300px" v-model.trim="user"/>
    </header>
    <div class="table">
      <Table size="small" :columns="columns1" :data="data1" stripe></Table>
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
export default {
  data() {
    return {
      user: "",
      pageNo: 1,
      pageSize: 10,
      count: 10,
      columns1: [
        { title: "编号", key: "iNum", align: "center" },
        { title: "角色名称", key: "memberName", align: "center" },
        { title: "人数", key: "gender", align: "center" },
        { title: "角色描述", key: "idcard", align: "center" },
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
                      // 生成下载链接
                    }
                  }
                },
                "编辑"
              ),
              " | ",
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      // 生成下载链接
                      //   window.open(ret.message)
                      // 公用方法
                      // this.functionJS.queryNavgationTo(this, '/index/operation/register/edit',{
                      //   id,pageNo:this.pageNo
                      // });
                    }
                  }
                },
                "删除"
              )
            ];
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    loadPage(index) {
      this.pageNo = index;
    },
    // 添加角色
    addRole () {
      // 公用方法
        this.functionJS.paramsNavgationTo(this, 'jurisdictionAdd');
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
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .table {
    margin-top: 20px;
    width: 100%;
    .pages {
      margin-top: 20px;
    }
  }
}
</style>
