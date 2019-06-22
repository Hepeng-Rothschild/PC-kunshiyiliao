<template>
  <div class="list">
    <tmpHeader :index='2' />
    <div class="main">
      <div class="select" v-for="(item,index) in list" :key='index'>
        <h2>{{ item.name }}</h2>
        <div class="all">
          <div class="item" v-for="(items,index) in item.child" :key='index'>
              <Checkbox v-model="items.flag" style='min-width:100px;'>{{ items.menuName }}</Checkbox>
              <!-- 排序 -->
              <div class="sort">
                <span>排序</span>
                <InputNumber :min="1" :max='999' v-model="items.priority" style="width:100px;"></InputNumber>
              </div>
              <!-- 快捷菜单 -->
              <div class="sort">
                <span>快捷菜单</span>
                <iSwitch v-model='items.shortcutFlag' />
              </div>
              <!-- 是否支付 -->
              <!-- <div class="sort">
                <span>是否支付</span>
                <iSwitch v-model='items.ipayFlag' />
              </div> -->
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
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
  components: {
    tmpHeader
  },
  data() {
    return {
      appid: '',
      switch1: true,
      list: []
    };
  },
  created() {
    let iv = store.state.iv;
    let salt = store.state.salt;
    this.appid = aesUtils.decrypt(salt,iv,"wxAppid",localStorage.getItem("appid"))
      let breadList = [
          { path: "/index", title: "首页" },
          {
              path: "/index/operation/publicHosting/index",
              title: "公众号托管"
          },
          {
              path: "/index/operation/publicAddress/list",
              title: "公众号管理"
          }
      ];
      this.$emit("changeBreadList", breadList);
  },
  mounted() {
    this.$axios.post(api.wxMenuList,{
        appid:this.appid
    }).then(res => {
      if (res.data.code) {
        let ret = res.data;
        this.list = ret.object;
        console.log(ret.object);
        this.list.forEach(item => {
          item.child.forEach((items,index) => {
            items.flag = Boolean(Number(items.open));
            items.shortcutFlag = Boolean(items.shortcut);
            items.ipayFlag = Boolean(Number(items.ipay))
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
            changeList.push({
              menuid: items.id,
              open: "1",
              priority: items.priority,
              prentId:items.prentId,
              ipay: Number(items.ipayFlag),
              shortcut: Number(items.shortcutFlag).toString()
            });
          }
        });
      })
      let params = {
        appid: this.appid,
        list: changeList
      };
      console.log(params)
      this.$axios.post(api.wxMenuListChange, params).then(res => {
        if (res.data.code) {
          this.$Message.info("保存成功");
        } else {
          this.$Message.info("保存失败,请稍候重试");
        }
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
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        .item {
          width: 48%;
          display: flex;
          flex-direction: row;
          align-items: center;
          line-height: 40px;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
