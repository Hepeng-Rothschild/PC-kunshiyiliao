<template>
  <div class="list">
    <header>
      <!-- <Input
        v-model.trim="search"
        placeholder="请输入服务名称"
        clearable
        style="width: 200px;margin-right:20px;"
      />
      <Button type="primary">查询</Button>-->
      <Button type="primary" @click="add">添加新服务</Button>
    </header>
    <div class="main" v-for="item,index in list" v-show='list.length'>
      <h3>{{ item.name.menuName }}</h3>
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>序号</td>
            <td>服务名称</td>
            <td>跳转路径</td>
            <td>排序</td>
            <td>快捷菜单</td>
            <td>操作</td>
          </tr>
          <tr v-for="items,index in item.child" v-show="item.child.length">
            <td>{{ index + 1 }}</td>
            <td>{{ items.menuName }}</td>
            <td>{{ items.path }}</td>
            <td>{{ items.priority }}</td>
            <td>{{ item.shortcut ? "是" : '否'}}</td>
            <td @click="edit(items)" style='cursor:pointer;'>编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!item.child.length">暂无更多数据</div>
        <Button type="primary" @click="fn(item.name.id)" style='margin-top:20px;'>添加新功能</Button>
      </div>
    </div>
    <div class="main" v-show='!list.length'>暂无数据</div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
  data() {
    return {
      search: "",
      list: []
    };
  },
  mounted() {
    this.$axios
      .post(api.systemManagement)
      .then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.list = ret;
          console.log(this.list);
        } else {
          this.$Message.info("请求失败,请稍候重试");
        }
      })
      .catch(err => {
        this.$Message.info("请求失败,请稍候重试");
      });
  },
  methods: {
    add() {
      this.$router.push({
        name: "wxSystemManagementAdd"
      });
    },
    edit(item) {
      this.$router.push({
        name: "wxSystemManagementEdit",
        params:{
            item
        }
      })
    },
    fn(index){
        console.log(index)
        this.$router.push({
        name: "wxSystemManagementfn",
        params:{
            id:index
        }
      })
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
    .tabList {
      width: 100%;
      margin: 20px auto;
      table {
        width: 100%;
        border: 1px solid #ddd;
        tr:nth-child(odd) {
          background: #f8f8f9;
        }
        tr:nth-child(even) {
          background: #fff;
        }
        tr:not(:first-child):hover {
          background: #9dcae4;
        }
        tr {
          border-top: 1px solid #ddd;
          height: 40px;
          td {
            text-align: center;
          }
          td.none {
            display: none;
          }
        }
      }
      .footer {
        width: 100%;
        text-align: center;
        border: 1px solid #ddd;
        border-top: none;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
