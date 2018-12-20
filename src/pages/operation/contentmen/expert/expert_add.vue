<template>
  <div class="addExpert">
    <!--导航-->
    <tmpHeader/>
    <div class="main_expert">
      <!--专家姓名-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>专家姓名</span>
        </div>
        <input type="text" placeholder="请输入专家姓名" v-model="name">
        <button @click="search">检索</button>
      </div>
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>选择专家</span>
        </div>
        <select v-model="keshi" @change="changes">
          <option :value="index" name="index" v-for="item,index in list">{{ item.doctorName }}</option>
        </select>
      </div>
      <!--机构名称-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>机构名称</span>
        </div>
        <input type="text" value="蚌埠中医院" v-model="yname" disabled>
      </div>
      <!--专家科室-->
      <div class="main_expert_experts">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>专家科室</span>
        </div>
        <div class="iselected">
          <span>{{ yKeshi }}</span>
          <span>职称</span>
          <span>{{ zhiwu }}</span>
        </div>
      </div>
      <!--职务-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>职务</span>
        </div>
        <input type="text" placeholder="请输入专家职务" style="width:200px;" v-model="post">
      </div>
      <!--专业特长-->
      <div class="main_expert_inputi">
        <div class="main_expert_title">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>专业特长</span>
        </div>
        <div class="shuru">
          <textarea name rows cols v-model="expert1" disabled></textarea>
        </div>
      </div>
      <!--个人简介-->
      <div class="main_expert_inputi">
        <div class="main_expert_title">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>个人简介</span>
        </div>
        <div class="shuru">
          <textarea name rows cols v-model="expert2" disabled></textarea>
        </div>
      </div>
      <!--排序-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <input type="text" style="width:100px;" v-model="isort" @keyup="isorts">
        <p style="margin-left:10px;">备注:只能填写数字,1代表置顶以此类推</p>
      </div>
      <!--显示-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>是否显示</span>
        </div>
        <iSwitch v-model="switch1" @on-change="change"/>
      </div>
      <!--显示-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>是否为专家</span>
        </div>
        <iSwitch v-model="switch2"/>
      </div>
      <!--保存-->
      <div class="expert_save">
        <span @click="save">保存</span>
        <span @click="back">取消</span>
      </div>
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Switch } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    iSwitch: Switch
  },
  data() {
    return {
      id: "tinymce-editor",
      id1: "tinymce-editor1",
      height: 200,
      tinymceHtml: "",
      switch1: true,
      name: "",
      yname: "",
      keshi: "",
      zhiwu: "",
      isort: "",
      expert1: "",
      expert2: "",
      post: "",
      id: sessionStorage.getItem("hospitalId"),
      list: [],
      yKeshi: "",
      currentId: -1,
      switch2: true
    };
  },
  methods: {
    isorts() {
      if (this.isort <= 0) {
        this.isort = "";
        this.$Message.info("排序置顶为1");
      }
    },
    changes() {
      console.log(this.keshi);
      let index = this.keshi;
      let data = this.list[index];
      // // 显示
      this.switch1 = Boolean(data.display);
      // 专家
      this.switch2 = Boolean(data.iexpert);
      // // 名字
      this.name = data.doctorName;
      // // 机构名称

      this.yname = data.hospitalName;
      // // 科室

      this.yKeshi = data.deptType;
      // // 排序

      this.isort = data.priority;
      // // 特长

      this.expert1 = data.doctorGood;
      // // 简介

      this.expert2 = data.personalIntroduction;
      //职称
      this.zhiwu = data.title;
      //  职务
      this.post = data.post;

      this.currentId = data.doctorId;
    },
    search() {
      this.$axios
        .post(api.expertadd, {
          hospitalId: this.id,
          doctorName: this.name,
          pageNo: 1,
          pageSize: 10
        })
        .then(res => {
          if (res.data.code) {
            if (res.data.object.list.length == 0) {
              this.$Message.info("该分类下没有专家");
            }
            this.list = res.data.object.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //显示按钮
    change(status) {
      // this.$Message.info('开关状态：' + status);
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.$router.push({
        name: "operationExpert",
        params: {
          pageNo
        }
      });
    },
    save() {
      let switch1 = 0;
      if (this.switch1) {
        switch1 = 1;
      }
      let switch2 = 0;
      if (this.switch2) {
        switch2 = 1;
      }

      let params = {
        // 显示
        display: switch1,
        // 排序
        priority: this.isort,
        // 职务
        post: this.post,
        //id
        doctorId: this.currentId,
        // 专家
        iexpert: switch2
      };

      this.$axios
        .post(api.expertedit, params)
        .then(res => {
          if (res.data.code) {
            let ret = res.data;
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
              this.$router.push({
                name: "operationExpert",
                params: {
                  pageNo
                }
              });
            }, 500);
            this.$Message.info("添加成功");
          } else {
            this.$Message.info("添加失败请重试");
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      console.log(params);
    }
  }
};
</script>

<style scoped lang="less">
.addExpert {
  width: 100%;

  .main_expert {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    .main_expert_item {
      display: flex;
      flex-direction: row;
      height: 50px;
      align-items: center;
      .main_expert_title {
        min-width: 100px;
      }
      input {
        display: inline-block;
        width: 400px;
        height: 30px;
        outline: none;
        text-indent: 5px;
      }
      button {
        width: 60px;
        height: 30px;
        border-radius: 10px;
        margin-left: 20px;
        border: none;
        outline: none;
        background: rgb(51, 204, 255);
        color: #fff;
      }
    }
    .main_expert_experts {
      display: flex;
      flex-direction: row;
      height: 50px;
      align-items: center;
      .main_expert_title {
        min-width: 100px;
      }
      .iselected {
        select {
          width: 150px;
        }
        span {
          display: inline-block;
          margin: 0 20px;
        }
      }
    }
    .main_expert_inputi {
      display: flex;
      flex-direction: row;
      margin: 10px 0;
      .main_expert_title {
        min-width: 100px;
      }
      .shuru {
        textarea {
          width: 400px;
          height: 150px;
        }
      }
    }
    .expert_save {
      width: 200px;
      height: 50px;
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 60px;
        height: 30px;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        background: #00bfff;
        cursor: pointer;
      }
    }
  }
}
</style>