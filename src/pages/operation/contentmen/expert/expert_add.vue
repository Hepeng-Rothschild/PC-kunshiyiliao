<template>
  <div class="addExpert">
    <!--导航-->
    <tmpHeader/>
    <div class="main_expert">
      <!--专家姓名-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;*</span>
          <span>专家姓名</span>
        </div>
        <AutoComplete
          v-model="name"
          @on-search="search"
          :data='list'
          placeholder="请输入专家姓名查询"
          @on-change= 'autoChange'
          style="width:360px">
            <Option v-for="option,index in list" :value="option.doctorName" :key="option.doctorId">
                <span class="demo-auto-complete-title">{{ option.doctorName }}</span>
            </Option>
          </AutoComplete>
      </div>
      <!--机构名称-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>机构名称</span>
        </div>
        <Input v-model="yname" placeholder="该专家所在机构名称" style="width: 360px" disabled/>
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
        <Input v-model="post" placeholder="请输入专家职务" style="width: 200px"/>
      </div>
      <!--专业特长-->
      <div class="main_expert_inputi">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>专业特长</span>
        </div>
        <div class="shuru">
          <Input
            v-model="expert1"
            type="textarea"
            disabled
            :rows="6"
            placeholder="专家专业特长"
            style="width:400px;"
          />
        </div>
      </div>
      <!--个人简介-->
      <div class="main_expert_inputi">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>个人简介</span>
        </div>
        <div class="shuru">
          <Input
            v-model="expert2"
            type="textarea"
            disabled
            :rows="6"
            placeholder="专家个人简介"
            style="width:400px;"
          />
        </div>
      </div>
      <!--排序-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>排序</span>
        </div>
        <InputNumber :max="99999" :min="1" v-model.trim="isort" style="width: 100px" placeholder="无"></InputNumber>
        <p style="margin-left:10px;">备注:只能填写数字,1代表置顶以此类推</p>
      </div>
      <!--显示-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>是否显示</span>
        </div>
        <iSwitch size="large"  v-model="switch1" >
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
        </iSwitch>
      </div>
      <!--是否为专家-->
      <div class="main_expert_item">
        <div class="main_expert_title">
          <span style="color:red;">&nbsp;&nbsp;</span>
          <span>是否为专家</span>
        </div>
        <iSwitch size="large"  v-model="switch2" >
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
        </iSwitch>
      </div>
      <!--保存-->
      <div class="expert_save">
        <Button type="primary" @click="save">保存</Button>
        <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import {AutoComplete} from 'iview'
export default {
  components: {
    tmpHeader,
    AutoComplete
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
  created() {
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
  mounted(){
    this.status()
  },
  methods: {
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
    isorts() {
      if (this.isort <= 0) {
        this.isort = "";
        this.$Message.info("排序置顶为1");
      }
    },
    // 加载医生详情
    changes() {
      if(!Boolean(this.keshi)){
          return ''
      }
      let index = this.keshi;
      let data = this.list[index-1];
      // 显示
      this.switch1 = Boolean(data.display);
      // 专家
      this.switch2 = Boolean(data.iexpert);
      // 名字
      this.name = data.doctorName;
      // 机构名称

      this.yname = data.hospitalName;
      // 科室

      this.yKeshi = data.deptType;
      // 排序

      this.isort = data.priority;
      // 特长

      this.expert1 = data.doctorGood;
      // 简介

      this.expert2 = data.personalIntroduction;
      //职称
      this.zhiwu = data.title;
      //  职务
      this.post = data.post;

      this.currentId = data.doctorId;
    },
    // 找出选择的医生
    autoChange (val) {
      for(let i=0;i<this.list.length;i++) {
        if(this.name == this.list[i].doctorName) {
          this.keshi = i+1;
        }
      }
      this.changes()
    },
    // 查询医生列表
    search() {
      if(!Boolean(this.name)){
          return ''
      }
      this.$axios
        .post(api.expertadd, {
          hospitalId: this.id,
          doctorName: this.name.trim(),
          pageNo: 1,
          pageSize: 10
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.object.list.length == 0) {
              this.$Message.error("查询失败，未查询到该专家");
            } else {
              this.$Message.success("查询成功，请选择专家");
              this.keshi = ''
              this.deloldDate();
            }
            
            this.list = res.data.object.list;
            console.log(this.list);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.functionJS.paramsNavgationTo(this, "operationExpert", {
        // 公用方法
          pageNo
      }); 
    },
    save() {
      let params = {
        // 显示
        display: Number(this.switch1),
        // 排序
        priority: this.isort,
        // 职务
        post: this.post,
        //id
        doctorId: this.currentId,
        // 专家
        iexpert: Number(this.switch2)
      };
      if (this.currentId == -1) {
        this.$Message.error("请选择专家");
      } else {
        this.$axios
          .post(api.expertedit, params)
          .then(res => {
            if (res.data.success) {
              let ret = res.data;
              let pageNo = this.$route.params.pageNo;
              setTimeout(() => {
                this.functionJS.paramsNavgationTo(this, "operationExpert", {
                  // 公用方法
                    pageNo
                }); 
              }, 500);
              this.$Message.info("添加成功");
            } else {
              this.$Message.error("添加失败请重试");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 重新搜索医生时清空医生信息
    deloldDate(){
      // 显示
      this.switch1 = false;
      // 专家
      this.switch2 = false
      // 名字
      // 机构名称
      this.yname = ''
      // 科室
      this.yKeshi = ''
      // 排序
      this.isort =''
      // 特长
      this.expert1 = ''
      // 简介
      this.expert2 = ''
      //职称
      this.zhiwu = ''
      //  职务
      this.post =''

      this.currentId = ''
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
        margin-left: 20px;
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
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>