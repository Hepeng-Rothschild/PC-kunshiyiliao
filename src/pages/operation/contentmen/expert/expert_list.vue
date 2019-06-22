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
        <Button type="primary"  icon="ios-search" @click="valChange" style="margin-left:20px;">查询</Button>
      </div>
      <Button type="info" @click="navto">添加专家</Button>
    </div>
    <!--表格列表-->
    <div class="main" v-show="!flag">
      <Table stripe :columns="columnList" :data="tablesList"></Table>
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
      flag: "",
      columnList: [
        {
          title:"序号",
          key:"sum",
          align:"center"
        },
        {
          title:"专家科室",
          key:"deptType",
          align:"center"
        },
        {
          title:"专家姓名",
          key:"doctorName",
          align:"center"
        },
        {
          title:"职称",
          key:"title",
          align:"center"
        },
        {
          title:"职务",
          key:"post",
          align:"center"
        },
        {
          title:"显示",
          key:"display",
          align:"center"
        },
        {
          title:"排序",
          key:"priority",
          align:"center"
        },
        {
          title:"操作",
          align:"center",
          render: (h,params) => {
            let row = params.row;
            return [
              h('a',{
                on: {
                  click: () => {
                    this.edit(row)
                  }
                }
              },'编辑')
            ]
          }
        }
      ]
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
      if (Boolean(val)) {
        params.doctorName = val.trim();
      }
      this.$axios
        .post(api.zj, params)
        .then(res => {
          if (res.data.success) {
            let ret = res.data.object;
            ret.list.forEach((item,index) => {
              item.sum = this.addZeros(index);
              item.display = item.display ? '是' :'否'
            })
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
  }
}
</style>