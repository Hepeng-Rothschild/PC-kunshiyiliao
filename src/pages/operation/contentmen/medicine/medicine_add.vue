<template>
  <!--服务管理-->
  <div class="addManagement">
    <tmpHeader/>
    <div class="addManag">
      <h3>选择院内开通科室</h3>
      <div class="fuwu">
        <!--线上服务-->
        <div class="xsfw" v-for="(item,index) in allMenuList" v-if="item.dept.list.length != 0" >
          <h2 style='font-weight:bold;'>{{ item.dept.entity.dictName }}</h2>
          <!--第一行-->
          <div class="select_wufu" ref="all">
            <div v-for="(items,index) in item.dept.list" :key='index'>
              <input
                type="checkbox"
                :value="items.dictType"
                v-if="selectedArr.indexOf(items.id) == -1"
                :data-id="items.id"
                @click="forClick"
                :id="'a' + items.id"
              >
              <input
                type="checkbox"
                :value="items.dictType"
                :id="'a' + items.id"
                v-if="selectedArr.indexOf(items.id)  != -1"
                checked
                :data-id="items.id"
                @click="forClick"
              >
              <label :for="'a' + items.id">{{ items.dictName }}</label>
              <!-- <Checkbox v-model="single">{{ items.dictName }}</Checkbox> -->
            </div>
          </div>
        </div>
      </div>
      <!--保存-->
      <div class="expert_save">
        <Button type="primary" @click="navto">保存</Button>
        <Button @click="btn">取消</Button>
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
      allMenuList: [],
      checkedNames: [],
      id: sessionStorage.getItem("hospitalId"),
      selectedArr: []
    };
  },
  components: {
    tmpHeader
  },
  methods: {
    btn() {
      let pageNo = this.$route.params.pageNo;
      this.functionJS.paramsNavgationTo(this, "iKeshi", {
        // 公用方法
        pageNo
      }); 
    },
    toSelected(num) {
      let flag = false;
      for (let i = 0; i < this.selectedArr.length; i++) {
        if (this.selectedArr[i] == num) {
          flag = true;
        }
      }
      return flag;
    },
    forClick(e) {
      if (!e.target.checked) {
        this.$axios
          .post(api.medicineExpertList, {
            dictType: e.target.value,
            hospitalId: this.id
          })
          .then(res => {
            if (res.data.object.file > 0) {
              this.$Message.info("科室内有专家不可取消");
              e.target.checked = true;
            }
          });
      }
    },
    navto() {
      let wrap = document.getElementsByClassName("addManag")[0];
      let el = wrap.getElementsByTagName("input");
      let len = el.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        if (el[i].checked) {
          arr.push(el[i].value);
        }
      }

      let params = {
        // 医院ID
        hospitalId: this.id,
        // 选中科室列表
        dictTypes: arr
      };
      console.log(params);
      this.$axios.post(api.medicineSave, params).then(res => {
        console.log(res.data)
        if (res.data.code) {
          this.$Message.info("修改成功");
          setTimeout(() => {
            let pageNo = this.$route.params.pageNo;
            this.functionJS.paramsNavgationTo(this, "iKeshi", {
              // 公用方法
              pageNo
            }); 
          }, 500);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  created() {
    this.$axios
      .post(api.medicineSelectedList, {
        id: this.id
      })
      .then(res => {
        if (res.data.success) {
          let ret = res.data.object.hospitalVo.ids;
          // console.log("选中的数据",ret); 
          for (let i = 0; i < ret.length; i++) {
            this.selectedArr.push(ret[i]);
          }
        }
      });

    this.$axios
      .post(api.medicineSearchList, {
        // "hospitalId": this.id
      })
      .then(res => {
        if (res.data) {
          let ret = res.data.object[0].list;
          this.allMenuList = ret;
          // console.log("全部数据",ret);
          // this.toSelected(385);
        }
      })
      .catch(err => {
        console.log(err);
      });

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
    position:relative;
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
            margin: 10px;
            width: 20%;
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
      position: fixed;
      right: 30px;
      bottom: 30px;
      width: 200px;
    }
  }
}
</style>