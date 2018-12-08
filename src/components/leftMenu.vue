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
  created() {},
  computed: {
    lists() {
//    console.log(this.$store.state.leftMenuList);
      return this.$store.state.leftMenuList;
    }
  },
  methods: {
    change(path) {
      this.$router.push(path)
    }
  }
};
</script>
<style lang="less" scoped>
</style>