<template>
  <!--服务管理-->
  <div class="addManagement">
    <tmpHeader/>
    <div class="addManag">
      <!-- <h3>添加服务</h3> -->
      <div class="fuwu">
        <!--线上服务-->
        <div class="xsfw" v-for="item,index in allMenuList">
          <h2>{{ item.menuName }}</h2>
          <!--第一行-->
          <div class="select_wufu" ref="all">
            <div v-for="items,index in item.dtoList">
             <input
                type="checkbox"
                :value="items.id"
                v-if="!items.selected"
                :data-id="items.id"
                :id="'a' + items.id"
              >
              <input
                type="checkbox"
                :value="items.id"
                v-if="items.selected"
                checked
                :data-id="items.id"
                :id="'a' + items.id"
              >
              <label :for="'a' + items.id">{{ items.menuName }}</label>
            </div>
          </div>
        </div>
      </div>
      <!--保存-->
      <div class="expert_save">
        <Button type="primary" @click="navto">保存</Button>
        <Button @click="$router.back()">取消</Button>
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
      id: sessionStorage.getItem("hospitalId")
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
    navto() {
      let wrap = document.getElementsByClassName("addManag")[0];
      let el = wrap.getElementsByTagName("input");
      let len = el.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        if (el[i].checked) {
          arr.push(el[i].getAttribute("data-id"));
        }
      }
      this.$axios
        .post(api.setserver, {
          hospitalId: this.id,
          ids: arr
        })
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            setTimeout(() => {
              this.$router.push({
                name: "serviceManagement"
              });
            }, 500);
          } else {
            this.$Message.error("修改失败,请重试");
          }
        })
    }
  },
  mounted() {
    this.$axios
      .post(api.getServer, {
        hospitalId: this.id
      })
      .then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.allMenuList = ret;
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
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>