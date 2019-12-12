<template>
  <Menu
    v-if="leftMenuLists.length>0"
    :active-name="leftActiveName"
    :open-names="openList"
  >
    <Submenu :name="index" v-for="(item,index) in leftMenuLists" :key="index">
      <template slot="title">{{item.name}}</template>
      <template v-if="item.childLists.length>0">
        <MenuItem
          :title="childItem.name"
          v-for="(childItem,index) in item.childLists"
          :key="index"
          :name="item.id+'-'+childItem.id"
          :to="childItem.path"
          :replace="true"
          @click.native="change(childItem.path)"
        >{{childItem.name}}</MenuItem>
      </template>
    </Submenu>
  </Menu>
</template>
<script>
import { Menu, Submenu, MenuItem, MenuGroup } from "iview";
export default {
  data() {
    return {};
  },
  props:["leftActiveName","openList","leftMenuLists"],
  components: { Menu, Submenu, MenuItem, MenuGroup },
  mounted() {},
  computed: {
    lists() {
      return this.$store.state.leftMenuList;
    }
  },
  methods: {
    change(path) {
      // 公用方法
      this.functionJS.queryNavgationTo(this, path);
    }
  }
};
</script>
<style lang="less">
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff;
    background: #2d8cf0;
    border-right: 2px solid #2d8cf0;
    z-index: 2;
  }
  .ivu-menu-submenu-title{
    padding: 14px 24px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    color: #fff;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    padding: 14px 24px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    color: #fff;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 14px 24px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    color: #fff;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background: #2988fd;
    color: #fff;
}
</style>