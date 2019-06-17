<template>
  <div class="i_addKeshi">
    <tmpHeader/>
    <div class="i-keshi_main">
      <!--左侧选择-->
      <div class="i-keshi_main-left" ref="oneList">
        <Tree :data="data1" @on-select-change="threeChild"></Tree>
      </div>
      <!--右侧科室-->
      <div class="i-keshi_main-right">
        <h2>科室信息</h2>
        <!--科室名称-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室名称</span>
          </div>
          <Input disabled v-model.trim="title" style="width: 300px"/>
        </div>
        <!--科室就诊位置-->
        <div class="keshi_name">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>院内名称</span>
          </div>
          <Input placeholder="例：内一科" v-model.trim="keshiname" style="width: 300px"/>
        </div>
        <!--科室简介-->
        <div class="keshi_name_text">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>科室简介</span>
          </div>
          <Input v-model="test1" type="textarea" :rows="6" placeholder="请输入科室简介" style='width:350px;'/>
        </div>
        <!--排序-->
        <div class="keshi_name_text" style="align-items:center;">
          <div class="left">
            <span style="color:red;">&nbsp;&nbsp;&nbsp;</span>
            <span>排序</span>
          </div>
          <Input v-model.trim="isort" style="width: 80px"/>
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
          <Button type="primary" @click="save">保存</Button>
          <Button @click="back">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import { Tree } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    tmpHeader,
    Tree
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
      currentId: -1,
      data1: []
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
    let id = this.$route.params.id;
    this.getDepartmentsData(id);
    this.$axios
      .post(api.departmentseditleft, {
        hospitalId: this.id
      })
      .then(res => {
        if (res.data) {
          let ret = res.data.object;
          let data1 = [];
           let id = this.$route.params.id;
          ret.forEach((item, index) => {
            let a = {};
            a.title = item.name;
            let children = [];
            item.child.forEach((i, s) => {
              i.title = i.childDept;
              if (id == i.id) {
                i.selected = true;
                a.expand=true
              }
              children.push(i);
            });
            a.children = children;
            data1.push(a);
          });
          this.data1 = data1;
          this.departmentsList = ret;
          
        }
      });
  },
  methods: {
    // 返回
    back() {
      let pageNo = this.$route.params.pageNo;
      this.functionJS.paramsNavgationTo(this, "tKeshi", {
        // 公用方法
        pageNo
      });
    },
    // 保存
    save() {
      let params = {
        //   别名
        deptNickname: this.keshiname.trim(),
        //详情
        departmentdes: this.test1.trim(),
        //排序
        priority: this.isort,
        //显示
        display: Number(this.switch1),
        // ID
        id: this.currentId
      };
      this.$axios
        .post(api.departmentChange, params)
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
              this.functionJS.paramsNavgationTo(this, "tKeshi", {
              // 公用方法
              pageNo
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
    // 获取科室信息
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
    },
    threeChild(index) {
      if(index.length == 0) {
        return ""
      }
      if (Boolean(index[0].id) && index[0].id != this.currentId) {
        this.currentId = index[0].id;
        this.getDepartmentsData(index[0].id);
      }
    }
  }
};
</script>

<style scoped lang="less">
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
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
      border: 1px solid #ccc;
      border-radius:10px;
      margin-right: 20px;
      overflow:auto;
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
      display: flex;
      flex-direction: column;
      padding: 30px 0;

      .keshi_name {
        display: flex;
        flex-direction: row;
        height: 50px;
        align-items: center;
        .left {
          min-width: 130px;
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
          min-width: 130px;
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
          min-width: 130px;
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