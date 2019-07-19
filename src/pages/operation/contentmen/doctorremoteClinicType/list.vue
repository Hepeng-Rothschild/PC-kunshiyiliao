<template>
  <div class="list">
    <tmpHeader/>
    <div class="main">
      <Button type="info" @click="add" style='margin:10px;'>新增远程门诊类型</Button>
      <div class="tabList">
        <Table stripe :columns="columns1" :data="list"></Table>
      </div>
      <!-- model -->
      <Modal v-model="modalStatus" title="编辑远程门诊类型" @on-ok="Save" @on-cancel="Cancel">
        <div class="model">
          <div class="user">
            <span>门诊名称：</span>
            <input type="text" placeholder="请输入远程门诊类型名称" v-model.trim="params.name">
          </div>
          <div class="user">
            <span>门诊价格：</span>
            <InputNumber :min='0' v-model.number="params.cost"></InputNumber>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      modalStatus:false,
      params: {
        name: "",
        cost: "",
        id: ""
      },
      list: [],
      id: sessionStorage.getItem("hospitalId"),
      columns1:[
        {
          key:"isum",
          title:"编号",
          align:"center",
        },
        {
          key:"name",
          title:"名称",
          align:"center"
        },
        {
          key:"cost",
          title:"医事服务费价格（元）",
          align:"center"
        },
        {
          title:"操作",
          align:'center',
          render:(h,params) => {
            return h('a', {
              on: {
                click: () => {
                  this.edit(params.row)
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
    let doctor = localStorage.getItem("doctor");
    if (!doctor) {
      this.$Message.info("您还没有开通远程门诊,去开通");
      localStorage.setItem("homeIndex", 0);
      setTimeout(() => {
        this.functionJS.paramsNavgationTo(this, "homeInfo");
        // 公用方法
      }, 800);
    }
    this.getDataDoctorList();
  },
  methods: {
    //  新增
    add() {
      this.modalStatus = true;
    },
    //  编辑
    edit(item) {
      this.modalStatus = true;
      this.params.name = item.name;
      this.params.cost = item.cost;
      this.params.id = item.id;
    },
    // 取消
    Cancel() {
      this.modalStatus = false;
      this.params.name = "";
      this.params.cost = "";
      this.params.id = ''
    },
    // 修改成功
    Save() {
      let _params = this.params;
      let _message = '成功'
      let _url = ''
      if(Boolean(_params.id)) {
        _url = api.DoctorRemoteClinicTypeEdit
        _message = '修改成功'
      } else {
        _url = api.DoctorRemoteClinicTypeAdd
        _params.id = null;
        _message = '添加成功'
      }
      _params.hospitalId = this.id;
      this.$axios.post(_url, _params).then(res => {
        if (res.data.success) {
          this.modalStatus = false;
          this.$Message.info(_message);
          this.getDataDoctorList();
        }
      });
    },
    // 加载门诊列表
    getDataDoctorList() {
      this.$axios
        .post(api.DoctorRemoteClinicTypeList, {
          hospitalId: this.id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            ret.forEach((item,index) => {
              item.isum = this.addZeros(index)
            })
            this.list = ret;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 80%;
    margin: 0 auto;
    .tabList {
      width: 100%;
      margin: 0 auto;
    }
  }
}
.model {
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 10px;
  .user {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
    span {
      width: 100px;
    }
    input {
      text-indent: 10px;
      flex: 1;
      border-radius: 4px;
      line-height: 30px;
      border: none;
      border: 1px solid #ddd;
      outline: none;
    }
  }
}
</style>
