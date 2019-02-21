<template>
  <!--服务管理-->
  <div class="addManagement">
    <tmpHeader/>
    <div class="addManag">
      <h4 @click="btn" class="little-tittle">查看
        <Button class="editBtn" type="primary" v-if="!editFlag" @click="toEdit">编辑</Button>
        <Button class="editBtn" type="primary" v-if="editFlag" @click="toDetail">取消</Button>
      </h4>
      <div class="fuwu">
        <!--线上服务-->
        <div class="xsfw" v-for="(item,index) of allServerList">
          <p>{{ item.name }}</p>
          <!--第一行-->
          <div class="select_wufu" ref="all">
            <template v-if="editFlag">
              <div v-for="(items,index) in item.result">
                <input
                  type="checkbox"
                  :value="items.packageId"
                  :checked="items.selected == 1"
                  :data-id="items.packageId"
                  :id="'a' + items.packageId"
                >
                <label :for="'a' + items.packageId">{{ items.packageName }}</label>
              </div>
            </template>
            <template v-else-if="!editFlag">
              <div v-if="items.selected == 1" v-for="(items,index) in item.result">
                <label :for="'a' + items.packageId">{{ items.packageName }}</label>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!--保存-->
      <div class="expert_save">
        <Button type="primary" v-if="editFlag" @click="save">保存</Button>
        <Button type="primary" @click="reback">返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  data() {
    return {
      arr: [],
      allServiceList: [],
      docServiceList: [],
      id: sessionStorage.getItem("hospitalId"),
      editFlag: false
    };
  },
  components: {
    tmpHeader
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
  methods: {
    toEdit() {
      this.editFlag = true;
    },
    toDetail() {
      this.editFlag = false;
    },
    btn() {},
    save() {
      let wrap = document.getElementsByClassName("addManag")[0];
      let el = wrap.getElementsByTagName("input");
      let len = el.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        if (el[i].checked) {
          arr.push(parseInt(el[i].getAttribute("data-id")));
        }
      }

      this.$axios
        .post(api.servicepackageupdatepageagehospital, {
          hospitalId: parseInt(this.id),
          packageIds: arr
        })
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            setTimeout(() => {
              this.functionJS.queryNavgationTo(
                this,
                "/index/operation/servicePackage/list",
                {
                  // 公用方法
                }
              );
            }, 500);
          }
        });
    },
    reback() {
      this.functionJS.queryNavgationTo(
        this,
        "/index/operation/servicePackage/list"
      );
      // 公用方法
    }
  },
  mounted() {
    this.$axios
      .post(api.servicepackagelistallpackage, {
        hospitalId: parseInt(this.id)
      })
      .then(res => {
        if (res.data.success) {
          let ret = res.data.object[0];
          let proList = {
            name: "省",
            result: []
          };
          if (ret.listPro) {
            ret.listPro.map((el, i) => {
              proList.result.push(el);
            });
          }
          let cityList = {
            name: "市",
            result: []
          };
          if (ret.listCity) {
            ret.listCity.map((el, i) => {
              cityList.result.push(el);
            });
          }
          let areaList = {
            name: "区",
            result: []
          };
          if (ret.listArea) {
            ret.listArea.map((el, i) => {
              areaList.result.push(el);
            });
          }
          let orgList = {
            name: "上级",
            result: []
          };
          if (ret.listOrg) {
            ret.listOrg.map((el, i) => {
              orgList.result.push(el);
            });
          }
          let hosList = {
            name: "当前",
            result: []
          };
          if (ret.listHos) {
            ret.listHos.map((el, i) => {
              hosList.result.push(el);
            });
          }
          this.allServiceList.push(proList);
          this.allServiceList.push(cityList);
          this.allServiceList.push(areaList);
          this.allServiceList.push(orgList);
          this.allServiceList.push(hosList);
        } else {
          this.$Message.info("查询失败,请重试");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .post(api.servicepackagelistpackagebyhospital, {
        hospitalId: parseInt(this.id)
      })
      .then(res => {
        let ret = res.data.object[0];
        if (ret.listPro) {
          ret.listPro.map(el => {
            this.docServiceList.push(el.packageId);
          });
        }
        if (ret.listCity) {
          ret.listCity.map((el, i) => {
            this.docServiceList.push(el.packageId);
          });
        }
        if (ret.listArea) {
          ret.listArea.map((el, i) => {
            this.docServiceList.push(el.packageId);
          });
        }
        if (ret.listOrg) {
          ret.listOrg.map((el, i) => {
            this.docServiceList.push(el.packageId);
          });
        }
        if (ret.listHos) {
          ret.listHos.map((el, i) => {
            this.docServiceList.push(el.packageId);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 数据更新后的DOM结构
  updated() {
    let wrap = document.getElementsByClassName("addManag")[0];
    let el = wrap.getElementsByTagName("input");
    let len = el.length;
    let arr = [];
    for (let i = 0; i < len; i++) {
      if (el[i].checked) {
        arr.push(el[i]);
      }
    }
  },
  computed: {
    allServerList() {
      for (let i = 0; i < this.allServiceList.length; i++) {
        //循环获取result
        for (let j = 0; j < this.allServiceList[i].result.length; j++) {
          //循环result对比packageId
          let index = this.docServiceList.indexOf(
            this.allServiceList[i].result[j].packageId
          );
          if (index != -1) {
            this.allServiceList[i].result[j].selected = 1;
          } else {
            this.allServiceList[i].result[j].selected = 0;
          }
        }
      }
      return this.allServiceList;
    }
  }
};
</script>

<style scoped lang="less">
.addManagement {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .addManag {
    display: flex;
    flex-direction: column;
    padding: 20px;
    h4 {
      padding-left: 4px;
      border-left: 2px solid #2d8cf0;
    }
    .fuwu {
      width: calc(100% - 100px);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgb(242, 242, 242);
      .xsfw {
        margin: 10px 0;
        .select_wufu {
          margin: 0 30px;
          display: flex;
          flex-direction: row;
          padding: 14px 20px;
          align-items: center;
          flex-wrap: wrap;
          div {
            width: 20%;
            margin: 10px 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            input {
              outline: none;
              border: none;
            }
            label {
              user-select: none;
            }
          }
        }
      }
    }
    .expert_save {
      width: 200px;
      height: 50px;
      margin: 10px auto;
    }
    .little-tittle {
      position: relative;
      .editBtn {
        position: absolute;
        right: 30px;
      }
    }
  }
}
</style>