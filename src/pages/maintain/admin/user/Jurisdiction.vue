<template>
  <div class="Jurisdiction">
    <div class="main">
      <h2>用户权限管理</h2>
      <Tree :data="data2" show-checkbox @on-check-change="selectItem"></Tree>
    </div>
  </div>
</template>
<script>
import { Tree } from "iview";
export default {
  components: {
    Tree
  },
  data() {
    return {
      data2: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              checked: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  methods: {
    selectItem(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="less" scoped>
.Jurisdiction {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .main {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
