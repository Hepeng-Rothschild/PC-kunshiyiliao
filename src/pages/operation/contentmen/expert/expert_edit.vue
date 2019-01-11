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
        <Input v-model="name" placeholder="请输入专家姓名" style="width: 360px" disabled/>
      </div>
      <!--机构名称-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>机构名称</span>
        </div>
        <Input v-model="yname" placeholder="蚌埠中医院" style="width: 360px" disabled/>
      </div>
      <!--专家科室-->
      <div class="main_expert_experts">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>专家科室</span>
        </div>
        <div class="iselected">
          <!-- <select v-model="keshi" disabled>
            <option :value="keshi">{{ keshi }}</option>
          </select>-->
          <Select v-model="keshi" style="width:200px" disabled>
            <Option :value="keshi" :key="keshi">{{ keshi }}</Option>
          </Select>
          <span>职称</span>
          <Select v-model="zhiwu" style="width:200px" disabled>
            <Option
              v-for="item,index in doctorList"
              :value="item.value"
              :key="item.value"
            >{{ item.value }}</Option>
          </Select>
        </div>
      </div>
      <!--职务-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>职务</span>
        </div>
        <Input v-model="post" placeholder="请输入专家职务" style="width: 200px" disabled/>
      </div>
      <!--专业特长-->
      <div class="main_expert_inputi">
        <div class="main_expert_title">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>专业特长</span>
        </div>
        <div class="shuru">
          <textarea name rows cols disabled v-model="doctorGood"></textarea>
        </div>
      </div>
      <!--个人简介-->
      <div class="main_expert_inputi">
        <div class="main_expert_title">
          <span style="color:red;">*&nbsp;&nbsp;</span>
          <span>个人简介</span>
        </div>
        <div class="shuru">
          <textarea name rows cols disabled v-model="personalIntroduction"></textarea>
        </div>
      </div>
      <!--排序-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <Input v-model="isort" placeholder="请输入专家职务" style="width: 100px" @keyup="isorts"/>
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
import { Switch, Select, Option } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    iSwitch: Switch,
    Select,
    Option
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
      personalIntroduction: "",
      doctorGood: "",
      post: "",
      switch2: true,
      doctorList: [
        {
          value: "主任医师"
        },
        {
          value: "副主任医师"
        },
        {
          value: "住院医师"
        },
        {
          value: "主治医师"
        }
      ]
    };
  },
  mounted() {
    let data = this.$route.params.item;
    if (data) {
      this.name = data.doctorName;
      this.yname = data.hospitalName;
      this.personalIntroduction = data.personalIntroduction;
      this.doctorGood = data.doctorGood;
      this.zhiwu = data.title;
      this.post = data.post;
      this.keshi = data.deptType;
      this.isort = data.priority;
      this.switch1 = Boolean(data.display);
      this.switch2 = Boolean(data.iexpert);
    }
  },
  methods: {
    isorts() {
      if (this.isort <= 0) {
        this.isort = "";
        this.$Message.info("排序置顶为1");
      }
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
      let hospitalId = sessionStorage.getItem("hospitalId");
      let doctorId = this.$route.params.item.doctorId;
      let params = {
        // 显示
        display: Number(this.switch1),
        //排序
        priority: this.isort,
        // 职务
        post: this.post,
        doctorId,
        hospitalId,
        iexpert: Number(this.switch2)
      };
      if (params.name == "") {
        this.$Message.info("专家姓名不能为空");
      } else {
        this.$axios.post(api.expertedit, params).then(res => {
          if (res.data.code) {
            let pageNo = this.$route.params.pageNo;
            this.$Message.info("修改成功");
            setTimeout(() => {
              this.$router.push({
                name: "operationExpert",
                params: {
                  pageNo
                }
              });
            }, 500);
          } else {
            this.$Message.info("修改失败请重试");
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.addExpert {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main_expert {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 10px auto;
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
        background: #2d8cf0;
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
          text-indent: 1em;
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
        background: #2d8cf0;
        cursor: pointer;
      }
    }
  }
}
</style>