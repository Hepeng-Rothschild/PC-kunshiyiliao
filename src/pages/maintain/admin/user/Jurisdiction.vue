<template>
  <div class="Jurisdiction">
    <div class="main">
      <h2>用户权限管理</h2>
      <Tree :data="data2" show-checkbox @on-check-change="selectItem"></Tree>
      <div class="save">
        <Button type="primary" @click="save">保存</Button>
        <Button @click="back">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import { Tree } from "iview";
export default {
  components: {
    Tree
  },
  data() {
    return {
      data2: [],
      selectData: []
    };
  },
  mounted() {
    let userId = this.$route.params.id;
    this.$axios
      .post(api.adminSearch, {
        userId
      })
      .then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          let data = [];
          //   循环
          ret.forEach((item, index) => {
            item.top.title = item.top.menuName;
            item.top.expand = Boolean(item.top.iopen);
            if (Boolean(item.top.iopen)) {
              if (item.second.length == 0) {
                item.top.checked = true;
              }
            //   console.log(item.top.id + item.top.menuName);
            }
            let a = item.top;
            let children = [];
            // 循环取到 二级菜单
            item.second.forEach((i, s) => {
              i.second.title = i.second.menuName;
              i.second.expand = Boolean(i.second.iopen);
              if (Boolean(i.second.iopen)) {
                if (i.last.length == 0) {
                  i.second.checked = Boolean(i.second.iopen);
                }
                // console.log(i.second.id + i.second.menuName);
              }
              let child = [];
              //   取到三级菜单
              i.last.forEach((s, c) => {
                s.title = s.menuName;
                s.expand = Boolean(s.iopen);
                s.checked = Boolean(s.iopen);
                child.push(s);
                if (Boolean(s.iopen)) {
                //   console.log(s.id + s.menuName);
                }
              });
              i.second.children = child;
              children.push(i.second);
              a.children = children;
            });
            data.push(a);
          });
          this.data2 = data;
        //   console.log(data);
        } else {
          this.$Message.info("查询用户权限失败");
        }
      });
  },
  methods: {
    selectItem(item) {
      this.selectData = item;
    },
    save() {
      let userId = this.$route.params.id;
      let menuIds = [];
      this.selectData.forEach(item => {
        menuIds.push(item.id);
      });
      // 主菜单
      this.data2.forEach(item => {
        if (!Boolean(item.children)) {
          return "";
        }
        // 二级菜单
        item.children.forEach(two => {
          // 功能
          two.children.forEach(free => {
            //   判断ID
            menuIds.forEach(three => {
              if (three === free.id) {
                // 功能 id
                menuIds.push(free.id);
                // console.log(free.id + free.title);
                // 二级菜单id
                menuIds.push(two.id);
                // console.log(two.id + two.title);
                // 主菜单id
                menuIds.push(item.id);
                // console.log(item.id + item.title);
              }
            });
          });
        });
      });
      let a = new Set([...menuIds]);
      // console.log(a);
      if (menuIds.size === 0) {
        this.$Message.info("修改成功");
        let pageNo = this.$route.params.pageNo;
        this.$router.push({
          name: "adminlist",
          params: {
            pageNo
          }
        });
      } else {
        this.$axios
          .post(api.adminManageChange, {
            userId,
            menuIds: a
          })
          .then(res => {
            if (res.data.code) {
              this.$Message.info("修改成功");
              let pageNo = this.$route.params.pageNo;
                this.$router.push({
                  name: "adminlist",
                  params: {
                    pageNo
                  }
                })
            } else {
              this.$Message.info(res.data.message);
            }
          });
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      this.$router.push({
        name: "adminlist",
        params: {
          pageNo
        }
      });
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
