<template>
  <div class="expert">
    <!--列表-->
    <tmpHeader/>
    <!--添加专家/搜索-->
    <div class="iheader">
      <Button type="info" @click="navto">添加服务</Button>
    </div>
    <!--表格列表-->
    <div class="main">
      <Table stripe :columns="columns" :data="tablesList"></Table>
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
      id: sessionStorage.getItem("hospitalId"),
      columns: [
        {
          key:"isum",
          title:"编号",
          align:"center"
        },
        {
          key:"menuName",
          title:"服务分类",
          align:"center",
        },
        {
          key:"result",
          title:"已开通服务",
          align:'center'
        },
        {
          title:"操作",
          align:'center',
          render:(h,params) => {
            return h('a', {
              on: {
                click: () => {
                  this.navto(params.row)
                }
              }
            }, '编辑')
          }
        }
      ]
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
          if (res.data.success) {
            let ret = res.data.object;
            ret.forEach((item,index) => {
              item.result = item.result.join('、');
              item.isum = this.addZeros(index)
            })
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
  }
}
</style>