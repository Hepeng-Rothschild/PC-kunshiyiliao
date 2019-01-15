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
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    let userId = this.$route.params.id;
    this.$axios
      .post(api.adminManage, {
        userId
      })
      .then(res => {
        if (res.data.code) {
          
        } else {
            this.$Message.info("查询用户权限失败");
        }
        console.log(res);
      });
  },
  methods: {
    selectItem(item) {
      console.log(item);
    },
    save() {
      this.$Message.info("修改成功");
      let pageNo = this.$route.params.pageNo;
      this.$router.push({
        name: "adminlist",
        params: {
          pageNo
        }
      });
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
