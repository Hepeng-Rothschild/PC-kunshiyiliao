<template>
  <div class="list">
    <tmpHeader/>
    <div class="main">
      <div class="select" v-for="item,index in list">
        <h3>{{ item.name }}</h3>
        <div class="all">
          <div class="item" v-for="items,index in item.child">
            <Checkbox v-model="items.flag">{{ items.menuName }}</Checkbox>
            <div class="sort">
              <span>排序</span>
              <InputNumber :min="1" v-model="items.priority" style="width:100px;"></InputNumber>
            </div>
          </div>
        </div>
      </div>
      <Button type="primary" @click="save">保存</Button>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import tmpHeader from "../tmpHeader";
import { Checkbox, Switch } from "iview";
export default {
  components: {
    tmpHeader,
    Checkbox,
    iSwitch: Switch
  },
  data() {
    return {
      appid: sessionStorage.getItem("appid"),
      switch1: true,
      list: []
    };
  },
  mounted() {
    this.$axios.post(api.wxMenuList,{
        appid:this.appid
    }).then(res => {
      if (res.data.code) {
        let ret = res.data;
        this.list = ret.object;
        this.list.forEach(item => {
          item.child.forEach(item => {
            item.flag = Boolean(item.shortcut);
          });
        });
      } else {
        this.$Message.info("查询失败,请稍候重试");
      }
    });
  },
  methods: {
    // 保存
    save() {
      let changeList = [];
      this.list.forEach(item => {
        item.child.forEach(items => {
          if (items.flag) {
            items.open = "1";
            changeList.push({
              menuid: items.id,
              open: "1",
              priority: items.priority,
              shortcut: "1"
            });
          }
        });
      });

      let params = {
        appid: this.appid,
        list: changeList
      };
      this.$axios.post(api.wxMenuListChange, params).then(res => {
        if (res.data.code) {
          this.$Message.info("保存成功");
        } else {
          this.$Message.info("保存失败,请稍候重试");
        }
        console.log(res.data);
      });
    },
    switchBoolean(num) {
      return Boolean(num);
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .main {
    width: 100%;
    margin-top: 10px;
    .select {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .all {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        .item {
          width: 25%;
          display: flex;
          flex-direction: row;
          align-items: center;
          line-height: 40px;
          justify-content: space-around;
          input {
            margin-right: 6px;
          }
          label {
            user-select: none;
          }
          .sort {
          }
          //   div {
          //     width: 100%;
          //     display: flex;
          //     flex-direction: row;
          //     align-items: center;
          //     justify-content: space-around;
          //     span {
          //       font-size: 12px;
          //     }
          //   }
        }
      }
    }
  }
}
</style>
