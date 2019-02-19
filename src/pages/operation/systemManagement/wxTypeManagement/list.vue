<template>
  <div class="list">
    <header>
      <Button type="primary" @click="add" size='large'>添加新服务</Button>
    </header>
    <div class="main" v-for="item,index in list" v-show="list.length">
      <h2>{{ item.name.menuName }}</h2>
      <Button type="success" @click="fn(item)">添加新功能</Button>
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
            <td>{{ addZeros(index) }}</td>
            <td>{{ items.menuName }}</td>
            <td @click="instance(items)" style="cursor:pointer;" class="flowr">{{ items.path }}</td>
            <td>{{ items.priority }}</td>
            <td>{{ items.shortcut===1? '是':"否" }}</td>
            <td @click="edit(items,item.name.menuName)" style="cursor:pointer;">编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!item.child.length">暂无更多数据</div>
      </div>
      <hr/>
    </div>
    <div class="main" v-show="!list.length">暂无数据</div>
    <Modal v-model="modal1" title="预览跳转路径" footer-hide>
      <p class="modal_p">{{ path }}</p>
    </Modal>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import { Rate } from "iview";
export default {
  components: { Rate },
  data() {
    return {
      search: "",
      list: [],
      modal1: false,
      path: "",
      valueCustomText: 3
    };
  },
  // 页面初始化
  mounted() {
    this.$axios
      .post(api.systemManagement)
      .then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.list = ret;
        } else {
            this.$Message.info("没有访问权限");
        }
      })
      .catch(err => {
        this.$Message.info("请求失败,请稍候重试");
      });
  },
  methods: {
    // 添加新服务
    add() {
      // FunctionJS方法
      this.functionJS.queryNavgationTo(this,'/index/operation/wxTypeManagement/add')
    },
    // 编辑功能
    edit(item,name) {
      // FunctionJS方法
      this.functionJS.paramsNavgationTo(this,'wxSystemManagementEdit',{
          item,
          name
        })
    },
    // 添加新功能
    fn(index) {
      // FunctionJS方法
      this.functionJS.queryNavgationTo(this,'/index/operation/wxTypeManagement/fn',{
          id: index.name.id,
          name:index.name.menuName
        })
    },
    // 弹出modal层
    instance(item) {
      if (Boolean(item.path)) {
        this.modal1 = true;
        this.path = item.path;
      } else {
        this.$Message.info("暂无跳转路径");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.modal_p {
  word-wrap: break-word;
}
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
          background: #ebf7ff;
        }
        tr {
          border-top: 1px solid #ddd;
          height: 40px;
          td {
            text-align: center;
            min-width: 150px;
          }
          td.flowr {
            max-width: 150px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
