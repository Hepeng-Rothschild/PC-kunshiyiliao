<template>
  <div class="i_addKeshi">
    <tmpHeader/>
    <div class="i-keshi_main">
      <!--左侧选择-->
      <div class="i-keshi_main-left" ref="oneList">
        <ul class="allList" @click="tab" v-for="item,index in departmentsList">
          <li>
            <span>+</span>
            {{ item.name}}
          </li>
          <ul class="oneList">
            <li v-for="items,indexs in item.child" :data-id="items.id">{{ items.childDept }}</li>
          </ul>
        </ul>
      </div>
      <!--右侧科室-->
      <div class="i-keshi_main-right">
        <h2>科室信息</h2>
        <!--科室名称-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span>科室名称</span>
          </div>
          <input type="text" disabled v-model.trim="title">
        </div>
        <!--科室就诊位置-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>院内名称</span>
          </div>
          <input type="text" placeholder="内一科" v-model.trim="keshiname">
        </div>
        <!--科室简介-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室简介</span>
          </div>
          <textarea name rows cols v-model="test1"></textarea>
        </div>
        <!--排序-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>排序</span>
          </div>
          <input type="text" v-model.trim="isort" style="width:80px;outline:none;">
          <p style="margin-left:5px;">备注：只能填写数字，1代表置顶以此类推</p>
        </div>
        <!--是否显示-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>是否显示</span>
          </div>
          <iSwitch v-model="switch1" style="margin-left:10px;"/>
        </div>
        <!--保存-->
        <div class="save">
          <div @click="save">保存</div>
          <div @click="back">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Switch, Upload, Icon } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    iSwitch: Switch,
    Upload,
    Icon
  },
  data() {
    return {
      keshiname: "",
      test1: "",
      test2: "",
      switch1: true,
      isort: "",
      defaultList: [],
      title: "",
      imgName: "",
      visible: false,
      uploadList: [],
      id: sessionStorage.getItem("hospitalId"),
      departmentsList: [],
      currentId: -1
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getDepartmentsData(id);
    this.$axios
      .post(api.departmentseditleft, {
        hospitalId: this.id
      })
      .then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.departmentsList = ret;
        }
      });
  },
  methods: {
    tab(e) {
      let el = e.target;
      let chilrens = el.parentNode.getElementsByTagName("ul");
      let ref = this.$refs.oneList;
      if (chilrens.length > 0) {
        let flag = chilrens[0].style.display;
        if (flag == "" || flag == "none") {
          chilrens[0].style.display = "block";
          el.parentNode.getElementsByTagName("span")[0].innerHTML = "-";
        } else {
          chilrens[0].style.display = "none";
          el.parentNode.getElementsByTagName("span")[0].innerHTML = "+";
        }
      }
      let ichildren = ref.getElementsByTagName("li");
      for (let i = 0; i < ichildren.length; i++) {
        ichildren[i].classList.remove("active");
      }
      el.classList.add("active");
      let dataId = el.getAttribute("data-id");
      if (dataId) {
        this.getDepartmentsData(dataId);
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.$router.push({
        name: "tKeshi",
        params: {
          pageNo
        }
      });
    },
    save() {
      let params = {
        //   别名
        deptNickname: this.keshiname,
        //详情
        departmentdes: this.test1,
        //排序
        priority: this.isort,
        //显示
        display: Number(this.switch1),
        // ID
        id: this.currentId
      };
      //   console.log(params);
      this.$axios
        .post(api.departmentChange, params)
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
              this.$router.push({
                name: "tKeshi",
                params: {
                  pageNo
                }
              });
            }, 500);
          } else {
            this.$Message.info("修改失败请重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDepartmentsData(id) {
      this.currentId = id;
      this.$axios
        .post(api.departmentssearch, {
          id
        })
        .then(res => {
          if (res.data) {
            let ret = res.data.object;
            //科室名
            this.title = ret.dictType;
            //   简介
            this.test1 = ret.departmentdes;
            //   显示
            this.switch1 = Boolean(ret.display);
            //  排序
            this.isort = ret.priority;
            //别名
            this.keshiname = ret.deptNickname;
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
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.i_addKeshi {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .i-keshi_main {
    width: 80%;
    height: auto;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    .i-keshi_main-left {
      min-width: 200px;
      height: 500px;
      border: 1px solid black;
      margin-right: 20px;
      ul {
        width: 100%;
        li {
          width: 100%;
          padding-left: 20px;
          user-select: none;
          cursor: pointer;
        }
        li.active {
          background: #2d8cf0;
        }
      }
      .oneList {
        display: none;
        li {
          padding-left: 40px;
        }
        li.active {
          background: #2d8cf0;
        }
      }
      .twoList {
        display: none;
        li {
          padding-left: 60px;
        }
        li.active {
          background: #2d8cf0;
        }
      }
    }

    .i-keshi_main-right {
      flex: 1;
      /*border:1px solid red;*/
      display: flex;
      flex-direction: column;
      padding: 30px 0;
      h2 {
        margin-left: 10px;
        font-size: 20px;
        padding-left: 15px;
        border-left: 3px solid #2d8cf0;
      }

      .keshi_name {
        display: flex;
        flex-direction: row;
        height: 50px;
        align-items: center;
        .left {
          min-width: 100px;
        }
        input {
          outline: none;
          width: 200px;
          height: 36px;
        }
      }
      .keshi_name_fileImgs {
        display: flex;
        flex-direction: row;
        .left {
          min-width: 100px;
        }
        p {
          margin-left: 20px;
        }
      }
      .keshi_name_text {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        .left {
          min-width: 100px;
        }
        textarea {
          outline: none;
          width: 400px;
          height: 100px;
        }
      }
      .save {
        width: 200px;
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 0 auto;
        div:first-child {
          background: #2d8cf0;
        }
        div {
          width: 80px;
          height: 30px;
          background: #c9c9c9;
          border-radius: 20px;
          text-align: center;
          line-height: 30px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>