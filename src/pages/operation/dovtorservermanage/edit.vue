<template>
  <!--服务管理-->
  <div class="doctorservermanage">
    <div class="addManag">
      <h4 class="tt">医生端服务管理
        <Button class="edit-btn" type="primary" v-if="!editFlag" @click="toEdit">编辑</Button>
        <Button class="edit-btn" type="primary" v-if="editFlag" @click="toDetail">取消</Button>
      </h4>
      <div class="fuwu">
        <!--线上服务-->
        <div class="xsfw" v-for="(item,index) of allMenuList">
          <p>{{ item.name }}</p>
          <!--第一行-->
          <div class="select_wufu" ref="all">
            <template v-if="editFlag">
              <div v-for="(items,index) in item.child">
                <input
                  type="checkbox"
                  :value="items.id"
                  :checked="items.selected == 1"
                  :data-id="items.id"
                  :id="'a' + items.id"
                >
                <label :for="'a' + items.id">{{ items.menuName }}</label>
              </div>
            </template>
            <template v-else-if="!editFlag">
              <div v-if="items.selected == 1" v-for="(items,index) in item.child">
                <label :for="'a' + items.id">{{ items.menuName }}</label>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!--保存-->
      <div class="expert_save">
        <Button type="primary" v-if="editFlag" @click="navto">保存</Button>
        <Button type="primary" @click="reback">返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/commonApi";
export default {
  data() {
    return {
      arr: [],
      allMenuList: [],
      id: sessionStorage.getItem("hospitalId"),
      editFlag: false
    };
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
          doctorId: this.id,
          ids: arr
        })
        .then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            setTimeout(() => {
              this.$router.push("/index/operation/doctormanage/list");
            }, 500);
          }
        });
    },
    toEdit() {
      this.editFlag = true;
    },
    toDetail() {
      this.editFlag = false;
    },
    reback(){
      this.$router.back(-1)
    }
  },
  mounted() {
    this.$axios
      .post(api.doctorServerManage)
      .then(res => {
        if (res.data.success) {
          let ret = res.data.object;
          for (let i = 0; i < ret.length; i++) {
            for (let j = 0; j < ret[i].child.length; j++) {
              if (j % 2 == 1) {
                ret[i].child[j].selected = 1;
                this.arr.push(ret[i].child[j].id);
              }
            }
          }
          this.allMenuList = ret;
        }
      })
      .catch(err => {
        console.log(err);
      });

  }
};
</script>

<style scoped lang="less">
.doctorservermanage {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .addManag {
    display: flex;
    flex-direction: column;
    padding: 20px;
    .tt {
      padding-left: 4px;
      border-left: 2px solid blue;
      position: relative;
      line-height: 32px;
      .edit-btn {
        position: absolute;
        right: 0;
        height: 32px;
      }
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
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: space-between;
    }
  }
}
</style>