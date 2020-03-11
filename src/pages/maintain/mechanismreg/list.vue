<template>
  <div class="Institutionalregistration">
    <div class="container">
      <!-- 头部信息 -->
      <header>
        <div class="search">
          <fourLevelLinkage
            @changeProvince="changeProvince"
            @changeCity="changeCity"
            @changeArea="changeArea"
          ></fourLevelLinkage>机构名称：
          <Input v-model.trim="Name" clearable style="width: 260px" />处方流转服务状态：
          <Select v-model="selectstate" style="width:200px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button type="primary" @click="getMechanismreg(1)">查询</Button>
          <Button @click="reset">重置</Button>
        </div>
        <div class="btn">
          <Button type="primary" @click="add">添加新机构</Button>
        </div>
      </header>
      <!-- 列表 -->
      <div class="list">
        <Table border :columns="column" :data="list" stripe no-filtered-data-text="未查询到符合条件的记录"></Table>
      </div>
      <!--分页器-->
      <div class="paging">
        <div>
          显示第1到{{selectpage}}条的记录,总共66条记录 每页显示
          <Select v-model="selectpage" style="width:60px" placement="top">
            <Option v-for="item in pageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>条记录
        </div>
        <Page :total="doctorregisterSize" @on-change="pageChange" :current="pageNo"></Page>
      </div>
    </div>
  </div>
</template>
<script>
// 机构注册信息
import api from "@/api/commonApi";
import { Page } from "iview";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
  data() {
    return {
      pageList: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        },
        {
          value: "6",
          label: "6"
        },
        {
          value: "7",
          label: "7"
        },
        {
          value: "8",
          label: "8"
        },
        {
          value: "9",
          label: "9"
        },
        {
          value: "10",
          label: "10"
        }
      ],
      stateList: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "未开通",
          label: "未开通"
        },
        {
          value: "已开通",
          label: "已开通"
        },
        {
          value: "已关闭",
          label: "已关闭"
        }
      ],
      selectpage: "10",
      selectstate: "全部",
      totalText: "10",
      province: null,
      city: null,
      area: null,
      isBack: 1,
      doctorregisterSize: 10,
      list: [],
      Name: "",
      pageNo: 1,
      column: [
        {
          title: "序号",
          key: "sum",
          align: "center",
          // width: 60
          render: (h, params) => {
            let sum = params.row.sum;
            return h("span", sum);
          }
        },
        {
          title: "机构名称",
          key: "hospitalName",
          align: "center",
          // width: 300,
          render: (h, params) => {
            let name = params.row.hospitalName;
            return h(
              "p",
              {
                style: {
                  display: "inline-block",
                  width: params.column._width * 0.8 + "px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              name
            );
          }
        },
        {
          title: "机构地址",
          key: "hospitalAddress",
          align: "center",
          // width: 300,
          render: (h, params) => {
            let name = params.row.hosAddr;
            return h(
              "p",
              {
                style: {
                  display: "inline-block",
                  width: params.column._width * 0.8 + "px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              name
            );
          }
        },
        {
          title: "机构分类",
          key: "internetHospital",
          align: "center",
          // width: 100,
          render: (h, params) => {
            let row = params.row;
            let name = row.internetHospital == "0" ? "企业" : "医院";
            return h("span", {}, name);
          }
        },
        {
          title: "机构级别",
          key: "levelHospital",
          align: "center",
          // width: 100,
          render: (h, params) => {
            let row = params.row;
            let name = row.grade;
            return h("span", {}, name);
          }
        },
        {
          title: "联系人",
          key: "linkman",
          align: "center",
          // width: 150,
          render: (h, params) => {
            let row = params.row;
            let name = "";
            let style = {};
            if (Boolean(row.linkman)) {
              name = row.linkman;
            } else {
              name = "暂无";
              style.color = "gray";
            }

            return h(
              "span",
              {
                style
              },
              name
            );
          }
        },
        {
          title: "联系电话",
          key: "linkmanTelephone",
          align: "center",
          // width: 150,
          render: (h, params) => {
            let row = params.row;
            let name = "";
            let style = {};
            if (Boolean(row.linkmanTelephone)) {
              name = row.linkmanTelephone;
            } else {
              name = "暂无";
              style.color = "gray";
            }

            return h(
              "span",
              {
                style
              },
              name
            );
          }
        },
        {
          title: "处方流转服务",
          key: "enable",
          align: "center",
          // width: 100,
          render: (h, params) => {
            let enable = params.row.enable;
            let name;
            if (enable == 0) {
              name = "已关闭";
            } else if (enable == 1) {
              name = "已开通";
            } else if (enable == -1) {
              name = "未开通";
            }
            return h("span", {}, name);
          }
        },
        {
          title: "操作",
          align: "center",
          // width: 300,
          fixed: "right",
          render: (h, params) => {
            let enable = params.row.enable;
            let row = params.row;
            if (enable == -1) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.edit(row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.details(row);
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.enable(row);
                      }
                    }
                  },
                  "开通"
                ),

                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.delete(row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
            if (enable == 1) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.edit(row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.details(row);
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.enable(row);
                      }
                    }
                  },
                  "关闭"
                )
              ]);
            }
            if (enable == 0) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.edit(row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.details(row);
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.enable(row);
                      }
                    }
                  },
                  "开通"
                )
              ]);
            }
          }
        }
      ]
    };
  },
  created() {
    this.province = this.$route.query.province
      ? parseInt(this.$route.query.province)
      : null;
    this.city = this.$route.query.city
      ? parseInt(this.$route.query.city)
      : null;
    this.area = this.$route.query.area
      ? parseInt(this.$route.query.area)
      : null;
    this.isBack = this.$route.query.isBack
      ? parseInt(this.$route.query.isBack)
      : 1;
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/maintain/indexManagement/index",
        title: "索引管理"
      },
      {
        path: "/index/maintain/mechanismreg/list",
        title: "机构注册信息"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  mounted() {
    let pageNo = this.$route.query.pageNo;
    if (pageNo) {
      this.pageNo = parseInt(pageNo);
    }
    this.getMechanismreg(this.pageNo);
  },
  methods: {
    reset() {
      this.selectstate = "全部";
      this.Name = "";
      this.province = null;
      this.city = null;
      this.area = null;
    },
    selectTotal(name) {
      if (name == "1") {
        this.totalText = "1";
      } else if (name == "2") {
        this.totalText = "2";
      } else if (name == "3") {
        this.totalText = "3";
      } else if (name == "4") {
        this.totalText = "4";
      } else if (name == "5") {
        this.totalText = "5";
      } else if (name == "6") {
        this.totalText = "6";
      } else if (name == "7") {
        this.totalText = "7";
      } else if (name == "8") {
        this.totalText = "8";
      } else if (name == "9") {
        this.totalText = "9";
      } else if (name == "10") {
        this.totalText = "10";
      }
    },
    select(name) {
      if (name == "全部") {
        this.MenuText = "全部";
      } else if (name == "未开通") {
        this.MenuText = "未开通";
      } else if (name == "已开通") {
        this.MenuText = "已开通";
      } else if (name == "已关闭") {
        this.MenuText = "已关闭";
      }
    },
    changeProvince(val) {
      this.province = val;
    },
    changeCity(val) {
      this.city = val;
    },
    changeArea(val) {
      this.area = val;
    },
    // 详情页面
    details(item) {
      let id = item.id;
      this.functionJS.queryNavgationTo(
        this,
        "/index/maintain/mechanismreg/mechanismregDetails",
        {
          id,
          pageNo: this.pageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          isBack: 2
        }
      );
    },
    //停用/启用
    enable(item) {
      console.log(item);
      
      let id = item.id;
      let enable = 0;
      if (!item.enable) {
        enable = 1;
      }
      this.$axios
        .post(api.mechanismregEnable, {
          enable,
          id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            item.enable = enable;
            this.$Message.info("修改成功");
          }
        });
    },
    // 删除此条数据
    delete(item) {},
    // 批量导入
    batch() {
      this.functionJS.queryNavgationTo(
        this,
        "/index/maintain/mechanismreg/batchone",
        {
          pageNo: this.pageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          isBack: 2
        }
      );
      //
    },
    pageChange(index) {
      this.getMechanismreg(index);
    },
    // 新增机构
    add() {
      this.functionJS.queryNavgationTo(
        this,
        "/index/maintain/mechanismreg/mechanismregAdd",
        {
          pageNo: this.pageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          isBack: 2
        }
      );
    },
    // 编辑机构
    edit(item) {
      let id = item.id;
      this.functionJS.queryNavgationTo(
        this,
        "/index/maintain/mechanismreg/mechanismregEdit",
        {
          id,
          pageNo: this.pageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          isBack: 2
        }
      );
    },
    getMechanismreg(pageNo) {
      this.pageNo = pageNo;
      let params = {
        pageNo,
        pageSize: 10
      };
      if (this.Name != "") {
        params.searchKey = this.Name.trim();
      }
      if (this.selectstate == "已开通") {
        params.ipres = 1;
      } else if (this.selectstate == "已关闭") {
        params.ipres = 0;
      } else if (this.selectstate == "未开通") {
        params.ipres = -1;
      }
      params.provinceCode = this.province ? this.province : null;
      params.cityCode = this.city ? this.city : null;
      params.areaCode = this.area ? this.area : null;
      console.log("机构注册信息params", params);
      this.$axios.post(api.mechanismregList, params).then(res => {        
        if (res.data.code) {
          let ret = res.data.object;
          console.log("列表数据", res.data.object);
          this.doctorregisterSize = ret.count;
          ret.list.forEach((item, index) => {
            item.sum = this.addZeros(index);
          });
          this.list = ret.list;
          console.log(this.list);
          sessionStorage.setItem("list", JSON.stringify(this.list));
        } else {
          this.$Message.info("不允许访问");
        }
      });
    }
  },

  components: {
    Page,
    fourLevelLinkage
  }
};
</script>
<style lang="less" scoped>
.Institutionalregistration {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 100%;
    margin: 0 auto;
    .paging {
      display: flex;
      width: 100%;
      margin: 10px auto;
      text-align: center;
    }
    header {
      width: 100%;
      .btn {
        margin-top: 10px;
      }
    }
    .list {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>