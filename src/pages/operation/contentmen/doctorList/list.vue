<template>
  <div class="doctorList">
    <tmpHeader/>
    <div class="main">
      <div class="list">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>序号</td>
            <td>医生名称</td>
            <td>医院</td>
            <td>科室</td>
            <td>开通远程门诊</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in expertList" v-show="expertList.length" :key='index'>
            <td>{{ index+1 }}</td>
            <td>{{ item.doctorName }}</td>
            <td>{{ item.hospitalName }}</td>
            <td>{{ item.deptType }}</td>
            <td>{{ item.iremote>0? '是' : '否'}}</td>
            <td @click="edit(item)" style="cursor:pointer;color:#2d8cf0;">编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!expertList.length">暂无更多数据</div>
      </div>
      <!-- 编辑医生 -->
      <Modal v-model="modal1" title="编辑医生" @on-ok="ok" @on-cancel="cancel">
        <div class="modal">
          <div class="item">
            <span class="user">医生名称：</span>
            <Input v-model="item.doctorName" placeholder="请输入医生名称" style="width: 300px" disabled/>
          </div>
          <div class="item">
            <span class="user">医生所属医院：</span>
            <Input
              v-model="item.hospitalName"
              placeholder="请输入医生所属医院"
              style="width: 300px"
              disabled
            />
          </div>
          <div class="item">
            <span class="user">开通远程门诊：</span>
            <iSwitch v-model="switch1"/>
          </div>
        </div>
      </Modal>
      <!-- 新增医生 -->
      <div style="text-align:center;margin:10px 0;">
        <Page :total="doctorSize" @on-change="pageChange" :current="pageNo"/>
      </div>
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
      modal1: false,
      switch1: true,
      pageNo: 1,
      doctorSize: 10,
      name: "",
      hospialName: "",
      expertList: [],
      item: {}
    };
  },
  mounted() {
    let doctor = localStorage.getItem("doctor");
    if (!doctor) {
      this.$Message.info("您还没有开通远程门诊,去开通");
      localStorage.setItem("homeIndex", 0);
      setTimeout(() => {
        this.functionJS.paramsNavgationTo(this, "homeInfo");
        // 公用方法
      
      }, 800)
      return ""
    }
    this.getIremote();
  },
  methods: {
    edit(item) {
      this.modal1 = true;
      this.item = item;
      this.switch1 = Boolean(item.iremote);
    },
    ok() {
      this.$axios
        .post(api.DoctorListEdit, {
          doctorId: this.item.doctorId,
          hospitalId: this.item.hospitalId,
          iremote: Number(this.switch1)
        })
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            this.getIremote();
          }
        });
    },
    cancel() {
        this.itme = {}
    },
    pageChange(index) {
      this.pageNo = index;
      this.getIremote();
    },
    getIremote() {
      this.$axios
        .post(api.doctorRomteclinicSearchExpert, {
          pageNo: this.pageNo,
          pageSize: 10
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            this.expertList = ret.list;
            this.doctorSize = ret.count;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.doctorList {
  width: 100%;
  .main {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    .list {
      width: 100%;
      margin: 20px auto;
      table {
        width: 100%;
        border: 1px solid #ddd;
        font-size:12px;
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
        background: #fff;
        border-top: none;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
.modal {
  display: flex;
  flex-direction: column;
  .item {
    width: 80%;
    align-items: center;
    font-size: 18px;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 0 auto;
    .user {
      margin: 10px 0;
      display: block;
      width: 150px;
    }
  }
}
</style>
