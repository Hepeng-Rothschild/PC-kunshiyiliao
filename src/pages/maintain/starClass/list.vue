<template>
  <div class="list">
    <header>
      <Input v-model.trim="val" placeholder="请输入标签内容查询" clearable style="width: 200px"/>
      <Button icon="ios-search" type="primary" @click="search">查询</Button>
      <Button @click="modal1=true">添加</Button>
    </header>
    <Table class="m-table" stripe :columns="columns" :data="diseaseList"></Table>
    <Page
      :total="count"
      :current="pageNo"
      :page-size="pageSize"
      @on-change="loadPage"
      style="margin-top:20px;"
    />
    <!-- 新增标签 -->
    <Modal v-model="modal1" title="新增标签" @on-ok="addTagOk" @on-cancel="addTagCancel">
      <div class="addTag">
        <div class="item">
          <span class="info">
            <span style="color:red;">*</span>星级
          </span>
          <Rate show-text v-model="addTag.starLevel"/>
        </div>
        <div class="item">
          <span class="info">
            <span style="color:red;">*</span>标签内容
          </span>
          <Input
            v-model.trim="addTag.evaLabel"
            placeholder="请输入标签内容"
            clearable
            style="width: 200px"
            :maxlength="10"
          />
        </div>
        <div class="item">
          <span class="info">
            <span style="color:red;">*</span>状态
          </span>
          <iSwitch v-model="switch1" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </iSwitch>
        </div>
      </div>
    </Modal>
    <!-- 修改标签 -->
    <Modal v-model="modal2" title="新增标签" @on-ok="editTagOk" @on-cancel="editTagCancel">
      <div class="addTag">
        <div class="item">
          <span class="info">
            <span style="color:red;">*</span>星级
          </span>
          <Rate show-text v-model="editTag.starLevel"/>
        </div>
        <div class="item">
          <span class="info">
            <span style="color:red;">*</span>标签内容
          </span>
          <Input
            v-model.trim="editTag.evaLabel"
            placeholder="请输入标签内容"
            clearable
            style="width: 200px"
            :maxlength="10"
          />
        </div>
        <div class="item">
          <span class="info">
            <span style="color:red;">*</span>状态
          </span>
          <iSwitch v-model="switch2" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </iSwitch>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Rate, Switch } from "iview";
import api from "@/api/commonApi";
export default {
  components: { Rate, iSwitch: Switch },
  data() {
    return {
      val: "",
      modal1: false,
      modal2: false,
      addTag: {
        starLevel: 0,
        evaLabel: ""
      },
      switch1: false,
      switch2: false,
      editTag: {},
      columns: [
        { title: "序号", key: "iNum", align: "center" },
        { title: "标签", key: "evaLabel", align: "center" },
        { title: "星级", key: "starLevel", align: "center" },
        {
          title: "状态",
          key: "enable",
          align: "center",
          render: (h, params) => {
            let gender = params.row.enable;
            let peoples = gender == 1 ? "正常" : "停用";
            return h("span", {
              domProps: {
                innerHTML: peoples
              }
            });
          }
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            let id = params.row.id;
            return [
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      this.$axios
                        .post(api.starClassSearch, {
                          id
                        })
                        .then(res => {
                          if (res.data.code) {
                            this.modal2 = true;
                            let ret = res.data.object;
                            this.switch2 = Boolean(ret.enable);
                            this.editTag = ret;
                          } else {
                            this.$Message.info("查询失败");
                          }
                        });
                    }
                  }
                },
                "编辑"
              )
            ];
          }
        }
      ],
      diseaseList: [],
      count: 0,
      pageSize: 10,
      pageNo: 1
    };
  },
    created(){
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/configurationWarehouse/index",
                title: "配置仓"
            },
            {
                path: "/index/maintain/starClass/list",
                title: "评价管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
  mounted() {
    this.loadingPage(this.pageNo);
  },
  methods: {
    loadPage(index) {
      this.pageNo = index;
      if (this.val) {
        this.loadingPage(this.pageNo, this.val);
      } else {
        this.loadingPage(this.pageNo);
      }
    },
    search() {
      this.loadingPage(this.pageNo, this.val);
    },
    // 添加新标签
    addTagOk() {
      let params = this.addTag;
      params.enable = Number(this.switch1);
      if (params.starLevel && params.evaLabel) {
        this.$axios.post(api.starClassAdd, params).then(res => {
          if (res.data.code) {
            this.$Message.info("添加成功");
            this.loadingPage(this.pageNo);
          } else {
            this.$Message.info("添加失败,请稍候重试");
          }
        });
      } else {
        this.$Message.info("星级或标签未填写完整");
      }
    },
    // 新标签取消
    addTagCancel() {
      this.addTag.starLevel = 0;
      this.addTag.evaLabel = "";
      this.switch1 = false;
    },
    // 修改标签
    editTagOk() {
      let params = this.editTag;
      params.enable = Number(this.switch2);
      if (params.starLevel && params.evaLabel) {
        this.$axios.post(api.starClassChange, params).then(res => {
          if (res.data.code) {
            this.$Message.info("修改成功");
            this.loadingPage(this.pageNo);
          } else {
            this.$Message.info("修改失败,请稍候重试");
          }
        });
      } else {
        this.$Message.info("星级或标签未填写完整");
      }
    },
    // 取消修改标签
    editTagCancel() {
      this.editTag = {};
      this.switch2 = false;
    },
    // 加载数据
    async loadingPage(pageNo, val) {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      if (Boolean(val)) {
        params.searchKey = val;
      }
     await this.$axios.post(api.starClassList, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.count = ret.count;
          ret.list.forEach((item, index) => {
            item.iNum = this.addZero(index);
          });
          this.diseaseList = ret.list;
        } else {
          this.$Message.info("不允许访问")
        }
      });
    },
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  header {
    margin-bottom: 20px;
  }
}
.addTag {
  width: 100%;
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 45px;
    .info {
      min-width: 80px;
    }
  }
}
</style>
