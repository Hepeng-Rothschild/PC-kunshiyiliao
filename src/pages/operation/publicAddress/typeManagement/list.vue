<template>
  <div class="list">
    <tmpHeader/>
    <div class="main">

      <div class="select">
        <!-- <h3>北京市</h3> -->
        <div class="all">
          <div class="item">
            <Checkbox v-model="single">分类管理</Checkbox>
            <div>
              <span>是否默认显示</span>
              <iSwitch v-model="switch1"/>
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
      single: true,
      switch1: true,
      list:[]
    };
  },
  mounted() {
    // this.$axios.post(url, params).then(res => {
    //   if (res.data.code) {
    //     let ret = res.data;
    //   } else {
    //     this.$Message.info("保存失败,请稍候重试");
    //   }
    // })
  },
  methods: {
    // 保存
    save() {
      this.$Message.info("保存成功");
    //   this.$axios.post(url, params).then(res => {
    //     if (res.data.code) {
    //       let ret = res.data;
    //     } else {
    //       this.$Message.info("保存失败,请稍候重试");
    //     }
    //   })
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
          flex-direction: column;
          align-items: center;
          line-height: 30px;
          input {
            margin-right: 6px;
          }
          label {
            user-select: none;
          }
          div {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
