<template>
  <Menu
    v-if="topMenuLists.length>0"
    @on-select="changeTop"
    class="topMenu"
    mode="horizontal"
    :theme="theme1"
    :active-name="topActiveName"
  >
    <MenuItem v-for="item in topMenuLists" :key="item.id" :name="item.id">{{item.name}}</MenuItem>
    <!-- <MenuItem name="1">
            运营平台
        </MenuItem>
        <MenuItem name="2">
            运维平台
        </MenuItem>
        <MenuItem name="3">
            统计平台
        </MenuItem>
        <MenuItem name="4">
            监管平台
    </MenuItem>-->
  </Menu>
</template>
<script>
import { Menu, MenuItem } from "iview";
export default {
  data() {
    return {
      theme1: "light"
      //   lists: []
    };
  },
  props: ["topActiveName", "topMenuLists"],
  components: {
    Menu,
    MenuItem
  },
  created() {
    // this.$store.commit("setTopMenuList");
    // this.lists = this.$store.state.topMenuList;
    // this.$store.commit("setLeftMenuList",this.topActiveName);
  },
  methods: {
    changeTop(name) {
      this.$store.commit("setLeftMenuList", name);
      this.$router.push("/index");
    }
  }
};
</script>
<style lang="less" scoped>
.topMenu {
  margin-top: 10px !important;
}
</style>