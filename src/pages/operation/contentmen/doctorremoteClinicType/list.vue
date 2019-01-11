<template>
  <div class="list">
    <tmpHeader/>
    <div class="main">
      <Button type="primary" class="primary" @click="add">新增远程门诊类型</Button>
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>序号</td>
            <td>名称</td>
            <td>医事服务费价格（元）</td>
            <td>操作</td>
          </tr>
          <tr v-for="item,index in list" v-show="list.length">
            <td>{{ index+1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.cost }}</td>
            <td style="cursor:pointer;" @click="edit(item)">编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!list.length">暂无更多数据</div>
      </div>
      <!-- 新增model -->
      <Modal v-model="model.one" title="新增远程门诊类型" @on-ok="oneSave" @on-cancel="oneCancel">
        <div class="model">
          <div class="user">
            <span>门诊名称：</span>
            <input type="text" placeholder="请输入远程门诊类型名称" v-model.trim="one.name">
          </div>
          <div class="user">
            <span>门诊价格：</span>
            <input type="text" placeholder="请输入价格" v-model.trim="one.cost">
          </div>
        </div>
      </Modal>

      <!-- 编辑model -->
      <Modal v-model="model.two" title="编辑远程门诊类型" @on-ok="twoSave" @on-cancel="twoCancel">
        <div class="model">
          <div class="user">
            <span>门诊名称：</span>
            <input type="text" placeholder="请输入远程门诊类型名称" v-model.trim="two.name">
          </div>
          <div class="user">
            <span>门诊价格：</span>
            <input type="text" placeholder="请输入价格" v-model.trim="two.cost">
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
      model: {
        one: false,
        two: false
      },
      one: {
        name: "",
        cost: ""
      },
      two: {
        name: "",
        cost: "",
        id: ""
      },
      list: [],
      id: sessionStorage.getItem("hospitalId")
    };
  },
  mounted() {
    let doctor = sessionStorage.getItem("doctor");
    if (!doctor) {
      this.$Message.info("您还没有开通远程门诊,去开通");
      sessionStorage.setItem("homeIndex", 0);
      setTimeout(() => {
        this.$router.push({
          name: "homeInfo"
        });
      }, 800);
    }
    this.getDataDoctorList();
  },
  methods: {
    //  新增
    add() {
      this.model.one = true;
    },
    // 取消
    oneCancel() {
      this.model.one = false;
      this.one.name = "";
      this.one.cost = "";
    },
    //添加
    oneSave() {
      this.model.one = false;
      let params = this.one;
      params.hospitalId = this.id;
      this.$axios.post(api.DoctorRemoteClinicTypeAdd, params).then(res => {
        if (res.data.code) {
          this.$Message.info("操作成功");
          this.getDataDoctorList();
        }
      });
      console.log(params);
    },
    //  编辑
    edit(item) {
      this.model.two = true;
      this.two.name = item.name;
      this.two.cost = item.cost;
      this.two.id = item.id;
    },
    // 取消
    twoCancel() {
      this.model.two = false;
      this.two.name = "";
      this.two.cost = "";
    },
    // 添加
    twoSave() {
      this.model.two = false;
      let params = this.two;
      params.hospitalId = this.id;
      this.$axios.post(api.DoctorRemoteClinicTypeEdit, params).then(res => {
        if (res.data.code) {
          this.$Message.info("修改成功");
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
  display: flex;
  flex-direction: column;
  position: relative;
  .main {
    width: 80%;
    margin: 0 auto;
    .wrapper {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      .model {
        width: 400px;
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 30px;
        border: 1px solid #ddd;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
        .save {
          width: 200px;
          margin: 15px auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          div {
            cursor: pointer;
            width: 80px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 40px;
          }
        }
      }
    }

    .primary {
      margin: 10px 10px;
      float: right;
    }
    .tabList {
      width: 100%;
      margin: 20px auto;
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
          td {
            text-align: center;
          }
          td.none {
            display: none;
          }
        }
      }
      .footer {
        width: 100%;
        text-align: center;
        border: 1px solid #ddd;
        border-top: none;
        height: 40px;
        line-height: 40px;
        background: #fff;
      }
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
  .save {
    width: 200px;
    margin: 15px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    div {
      cursor: pointer;
      width: 80px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 40px;
    }
  }
}
</style>
