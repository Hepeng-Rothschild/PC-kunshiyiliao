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
          ></fourLevelLinkage>
          <span style="margin-left:30px;">药店名称：</span>

          <Input v-model.trim="Name" clearable placeholder style="width: 260px" />
          <span style="margin-left:30px;">处方流转服务状态：</span>

          <Select v-model="selectstate" style="width:200px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button
            type="primary"
            @click="getMechanismreg(1)"
            style="margin-left:30px;width:92px;height:32px"
          >查询</Button>
          <Button @click="reset" style="margin-left:30px;width:92px;height:32px">重置</Button>
        </div>
        <div class="btn">
          <Button type="primary" @click="add">添加新药店</Button>
          <Button type="primary" @click="handleBatchDelete">批量删除</Button>
          <Button type="primary" @click="batch">批量导入</Button>
          <!-- <a href style="color:skyblue;text-decoration:underline;" @click="download">下载药店导入模板</a> -->
        </div>
      </header>
      <!-- 列表 -->
      <div class="list">
        <Table
          border
          :columns="column"
          :data="list"
          stripe
          no-filtered-data-text="未查询到符合条件的记录"
          @on-selection-change="selectChange"
        ></Table>
      </div>
      <!--分页器-->
      <div class="paging">
        <div>
          显示第1到{{pageSize}}条的记录,总共{{pagetotal}}条记录 每页显示
          <Select v-model="pageSize" style="width:60px" placement="top">
            <Option v-for="item in pageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>条记录
        </div>
        <Page
          :total="doctorregisterSize"
          @on-change="pageChange"
          :current="pageNo"
          :page-size="pageSize"
        ></Page>
      </div>
    </div>
    <!-- 删除确认弹窗 -->
    <Modal v-model="showDelModal" title="确认删除弹窗" class="drugmanagement-commondrug-list-delModal">
      <p>删除后不可恢复，确认删除所选项吗？</p>
      <div slot="footer">
        <Button class="cancel-btn btn" @click="showDelModal = false">取消</Button>
        <Button class="save-btn btn" type="primary" :loading="delLoading" @click="delDrug">确认</Button>
      </div>
    </Modal>
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
      selections: [],
      showDelModal: false,
      delLoading: false,
      pagetotal: null,
      pageSize: 10,
      pageList: [
        {
          value: 5,
          label: 5
        },
        {
          value: 10,
          label: 10
        },
        {
          value: 20,
          label: 20
        },
        {
          value: 50,
          label: 50
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

      selectstate: "全部",
      province: null,
      city: null,
      area: null,
      pharmacy: null,
      isBack: 1,
      doctorregisterSize: 10,
      list: [],
      Name: "",
      pageNo: 1,
      column: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "sum",
          align: "center",
          width: 70
        },
        {
          title: "药店名称",
          key: "pharmacyName",
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
          title: "药店地址",
          key: "pharmacyAddress",
          align: "center",
          // width: 300,
          render: (h, params) => {
            let province = params.row.province;
            let city = params.row.city;
            let district = params.row.district;
            let name = province + city + district + params.row.hosAddr;
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
          title: "省医保定点",
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
          title: "市医保定点",
          key: "levelHospital",
          align: "center",
          width: 100,
          render: (h, params) => {
            // let row = params.row;
            // let name = row.internetHospital == "0" ? "企业" : "医院";
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
            let ipres = params.row.ipres;
            let name;
            if (ipres == 0) {
              name = "已关闭";
            } else if (ipres == 1) {
              name = "已开通";
            } else if (ipres == null) {
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
            let ipres = params.row.ipres;
            let row = params.row;
            if (ipres == null) {
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
                      size: "small",
                      type: "primary"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        // this.enable(row);
                        this.open(row);
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
            if (ipres == 1) {
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
                        this.close(row);
                      }
                    }
                  },
                  "关闭"
                )
              ]);
            }
            if (ipres == 0) {
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
                        this.open(row);
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
  watch: {
    pageSize(nv, ov) {
      this.getMechanismreg();
    }
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
        path: "/index/maintain/pharmacy/list",
        title: "药店信息管理"
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
    // 关闭处方流转
    close(item) {
      let id = item.id;
      this.$axios
        .post(api.mechanismregClose, {
          id
        })
        .then(res => {
          console.log(res);
          if (res.data.code) {
            this.$Message.info("修改成功");
          }
        });
    },
    // 开启处方流转
    open(item) {
      let id = item.id;
      this.$axios
        .post(api.mechanismregOpen, {
          id
        })
        .then(res => {
          console.log(res);
          if (res.data.code) {
            this.$Message.info("修改成功");
          }
        });
    },
    //  操作按钮删除
    handleRemove(record) {
      this.removeType = "single";
      this.showDelModal = true;
      this.curRecord = record.row;
    },
    selectChange(selections) {
      this.selections = selections;
    },
    // 批量删除
    handleBatchDelete() {
      if (!this.selections.length) {
        this.$Message.error("请选择删除项");
      } else {
        this.removeType = "batch";
        this.showDelModal = true;
      }
    },
    // 删除弹框
    delDrug() {
      let reqData = [];
      if (this.removeType === "single") {
        reqData[0] = this.curRecord;
      } else if (this.removeType === "batch") {
        reqData = this.selections;
      }
      console.log(reqData);
      this.delLoading = true;
      this.$axios
        .post(api.delDrug, reqData)
        .then(res => {
          this.$Message.success("删除成功");
          this.findOperateDrugPage();
          this.showDelModal = false;
          this.delLoading = false;
        })
        .catch(res => {
          console.log(res);
          this.delLoading = false;
        });
    },
    //  下载药店导入模板
    // download() {
    //   this.$axios
    //     .post(api.downloadTxt, {
    //       type: 2
    //     })
    //     .then(res => {
    //       if (res.data.code) {
    //         // console.log(res.data.code);

    //         let ret = res.data;
    //         window.open(ret.message);
    //       }
    //     });
    // },
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
    //停用/启用
    enable(item) {
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
    // 批量导入
    batch() {
      this.functionJS.queryNavgationTo(
        this,
        "/index/maintain/pharmacy/batchone",
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
    // 药店详情
    details() {
      this.functionJS.queryNavgationTo(
        this,
        "/index/maintain/pharmacy/details",
        {
          pageNo: this.pageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          pharmacy: this.pharmacy,
          isBack: 2
        }
      );
    },
    // 新增机构
    add() {
      this.functionJS.queryNavgationTo(this, "/index/maintain/pharmacy/add", {
        pageNo: this.pageNo,
        province: this.province,
        city: this.city,
        area: this.area,
        pharmacy: this.pharmacy,
        isBack: 2
      });
    },
    // 编辑机构
    edit(item) {
      let id = item.id;
      this.functionJS.queryNavgationTo(this, "/index/maintain/pharmacy/edit", {
        id,
        pageNo: this.pageNo,
        province: this.province,
        city: this.city,
        area: this.area,
        isBack: 2
      });
    },
    getMechanismreg(pageNo) {
      this.pageNo = pageNo;
      let params = {
        pageNo,
        pageSize: this.pageSize
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
      console.log("药店信息params", params);
      // console.log(api);

      this.$axios.post(api.pharmacyInfo, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          console.log("列表数据", res.data.object);
          this.doctorregisterSize = ret.count;
          ret.list.forEach((item, index) => {
            item.sum = this.addZeros(index);
          });
          this.list = ret.list;
          this.pagetotal = ret.list.length;

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
      flex-direction: row;
      justify-content: space-between;
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
.drugmanagement-commondrug-list-MedicalModal {
  /deep/ .ivu-modal-wrap {
    label.ivu-form-item-label {
      padding-right: 0;
    }
    .ivu-modal-footer {
      display: none;
    }
    .btn-group {
      text-align: center;
      .save {
        width: 100px;
        margin-right: 20px;
      }
      .close {
        margin-left: 20px;
        width: 100px;
      }
    }
  }
}
.drugmanagement-commondrug-list-delModal {
  /deep/ .ivu-modal-wrap {
    .btn {
      width: 80px;
    }
  }
}
</style>