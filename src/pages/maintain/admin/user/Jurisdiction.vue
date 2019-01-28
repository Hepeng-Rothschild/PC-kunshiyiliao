<template>
  <div class="Jurisdiction">
    <div class="main">
      <h2>用户权限管理</h2>
      <Tree :data="data2" show-checkbox @on-check-change="selectItem"></Tree>
      <div class="save">
        <Button type="primary" @click="save" >保存</Button>
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
    let userId = this.$route.query.id;
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
              }
              let child = [];
              //   取到三级菜单
              i.last.forEach((s, c) => {
                s.title = s.menuName;
                s.expand = Boolean(s.iopen);
                s.checked = Boolean(s.iopen);
                child.push(s);
                if (Boolean(s.iopen)) {
                }
              });
              i.second.children = child;
              children.push(i.second);
              a.children = children;
            });
            data.push(a);
          });
          this.data2 = data;
        } else {
          this.$Message.info("查询用户权限失败");
        }
      });
  },
  methods: {
    // 获取用户菜单
    selectItem(item) {
      this.selectData = item;
    },
    // 修改用户权限
    save() {
      let userId = this.$route.query.id;
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
            if (free.checked) {
              menuIds.push(free.id);
              // 二级菜单id
              menuIds.push(two.id);
              // 主菜单id
              menuIds.push(item.id);
            }
            //   判断ID
            // menuIds.forEach(three => {
            //   // console.log(three);
            //   if (three === free.id) {
            //     // 功能 id
            //     menuIds.push(free.id);
            //     // 二级菜单id
            //     menuIds.push(two.id);
            //     // 主菜单id
            //     menuIds.push(item.id);
            //   }
            // })
          });
        });
      });

      let a = new Set([...menuIds]);

      console.log(a);

      if (a.size === 0) {
        this.$Message.error("请至少选择一个功能");
      } else {
        this.$axios
          .post(api.adminManageChange, {
            userId,
            menuIds: a
          })
          .then(res => {
            if (res.data.code) {
              this.$Message.info("修改成功");
              let pageNo = this.$route.query.pageNo;
              this.$router.push({
                path: "/index/maintain/admin/user/list",
                query: {
                  pageNo
                }
              });
            } else {
              this.$Message.info(res.data.message);
            }
          })
      }
    },
    back() {
      let pageNo = this.$route.query.pageNo;
      this.$router.push({
        path: "/index/maintain/admin/user/list",
        query: {
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
