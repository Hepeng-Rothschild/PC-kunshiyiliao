<template>
  <div class="doctorreviewlist">
    <Row>
      <Col :xs="24">
        <div class="margin-up-down">
          <fourLevelLinkage
            @changeProvince="changeProvince"
            @changeCity="changeCity"
            @changeArea="changeArea"
            @changeHospital="changeHospital"
            :province="province"
            :city="city"
            :area="area"
            :hospital="hospital"
            :isBack="isBack"
          ></fourLevelLinkage>
        </div>
        <div class="margin-up-down">
          <Input class="w-input" v-model="searchKey" :placeholder="'请输入'+keyPlaceHolder" />
        </div>
        <div class="margin-up-down">
          <Input class="w-input" v-model="deptKey" placeholder="请输入科室关键字" />
        </div>
        <div class="margin-up-down">
          <Select
            class="w-select"
            clearable
            v-model="dictType"
            placeholder="职称级别"
            style="width:130px;"
          >
            <Option
              v-for="item in titleList"
              :value="item.dictType"
              :key="item.dictType"
              style="text-align:center;"
            >{{item.dictName}}</Option>
          </Select>
        </div>
        <div class="margin-up-down">
          <Button type="primary" @click="loadPage(1)">
            <Icon type="ios-search" size="14" />查询
          </Button>
        </div>
        <div class="margin-up-down">
          <Button type="info" @click="addDoc(1)">添加专家排班信息</Button>
          <Button type="info" @click="addDoc(2)" v-show="registerIthirdparty">添加科室排班信息</Button>
        </div>
      </Col>
    </Row>
    <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
    <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage" />
    <Modal title="提示：" v-model="registertimesFlag" class-name="vertical-center-modal" footer-hide>
      <p v-html="timesHtml" style="text-align:center;"></p>
    </Modal>
  </div>
</template>
<script>
import fourLevelLinkage from "@/components/fourLevelLinkage";
import api from "@/api/commonApi";
import tempHeader from "@/components/tmpHeader";
export default {
  data() {
    return {
      province: null,
      city: null,
      area: null,
      hospital: null,
      isBack: 1,

      searchKey: "",
      keyPlaceHolder: "医生姓名",
      deptKey: "",
      titleList: "",
      dictType: "",
      weeks: ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      days: ["", "上午", "下午"],
      registertimesFlag: false,
      columns: [
        { title: "序号", key: "iNum", align: "center", width: 60 },
        {
          title: "医院科室",
          key: "hospitaldept",
          align: "center",
          width: 200,
          render: (h, params) => {
            let item = params.row.hospitaldept;
            return h("span", {
              domProps: {
                innerHTML: item
              }
            });
          }
        },
        {
          title: "专家姓名",
          key: "doctorName",
          align: "center",
          width: 120
        },
        {
          title: "排班类型",
          key: "schedulingType",
          align: "center",
          width: 120,
          render: (h, params) => {
            let item = params.row.schedulingType == 1 ? "专家排班" : "科室排班";
            return h("span", {
              domProps: {
                innerHTML: item
              }
            });
          }
        },
        {
          title: "就诊地址",
          key: "address",
          align: "center",
          width: 150
        },
        {
          title: "预约挂号门诊时间",
          key: "registerTimes",
          align: "center",
          width: 160,
          render: (h, params) => {
            let id = params.row.id;
            let tmpTimes = params.row.registerTimes;
            return h("span", {
              domProps: {
                innerHTML: tmpTimes
              },
              style: { cursor: "pointer" },
              on: {
                click: () => {
                  this.showTimesModal(id);
                }
              }
            });
          }
        },
        { title: "预约期限", key: "term", align: "center"},
        {
          title: "备注信息",
          key: "remarks",
          align: "center",
          // width: 200
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          width: 140,
          fixed: "right",
          render: (h, params) => {
            let id = params.row.id;
            let icut = params.row.icut;
            let updateStatus = params.row.updateStatus;
            let jumpPath = "/index/operation/register/segmentationdetail";
            let updatePath = "/index/operation/register/segmentationedit";
            let btn = null,
              separator = null;
            if (icut == null || icut == 1) {
              jumpPath = "/index/operation/register/normaldetail";
              updatePath = "/index/operation/register/normaledit";
            }
            if (updateStatus !== 1) {
              separator = " | ";
              btn = h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      //   公用方法
                      this.functionJS.queryNavgationTo(this, updatePath, {
                        id,
                        pageNo: this.pageNo,
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        hospital: this.hospital,
                        isBack: 2,
                        searchKey: this.searchKey,
                        deptKey: this.deptKey,
                        dictType: this.dictType,
                        status: params.row.schedulingType
                      });
                    }
                  }
                },
                "编辑"
              );
            }
            return [
              h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      //   公用方法
                      this.functionJS.queryNavgationTo(this, jumpPath, {
                        id,
                        pageNo: this.pageNo,
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        hospital: this.hospital,
                        isBack: 2,
                        searchKey: this.searchKey,
                        deptKey: this.deptKey,
                        dictType: this.dictType,
                        status: params.row.schedulingType
                      });
                    }
                  }
                },
                "查看"
              ),
              separator,
              btn
            ];
          }
        }
      ],
      doctorList: [],
      doctorTimesList: {},
      timesHtml: "",
      count: 0,
      pageSize: 10,
      pageNo: 1,
      modalConfirm: false,
      confirmInfo: "",
      delIndex: null,
      delId: null,

      registerIthirdparty: true
    };
  },
  components: {
    fourLevelLinkage,
    tempHeader
  },
  mounted() {
    let pageNo = this.$route.query.pageNo
      ? parseInt(this.$route.query.pageNo)
      : 1;
    //获取职称列表
    this.$axios
      .post(api.getTitle)
      .then(resp => {
        console.log("职称", resp);
        this.titleList = resp.data.object;
      })
      .catch(err => {
        console.log(err);
      });
    //上来就加载第一页数据
    this.loadPage(pageNo);
  },
  methods: {
    changeProvince(val) {
      this.province = val;
    },
    changeCity(val) {
      this.city = val;
    },
    changeArea(val) {
      this.area = val;
    },
    changeHospital(val) {
      this.hospital = val;
      console.log(val);
      if (Boolean(val)) {
        let url = api.managementInfo;
        let params = {
          hospitalId: parseInt(val)
        };
        this.$axios.post(url, params).then(res => {
          if (res.data.success) {
            let ret = res.data.object;
            console.log(ret);
            this.registerIthirdparty = !Boolean(ret.registerIthirdparty);
          }
        });
      } else {
        this.registerIthirdparty = true;
      }
    },
    //加载列表数据
    loadPage(pageNo) {
      this.pageNo = pageNo;
      var params = {};
      params.dept = this.deptKey;
      params.title = this.dictType;
      params.doctorName = this.searchKey.trim();
      params.hospitalName = "";
      params.provinceCode = this.province ? this.province : null;
      params.cityCode = this.city ? this.city : null;
      params.areaCode = this.area ? this.area : null;
      params.hospitalId = this.hospital ? this.hospital : null;
      params.pageNo = pageNo;
      params.pageSize = this.pageSize;
      this.$axios
        .post(api.registerList, params)
        .then(resp => {
          if (resp.data.success) {
            console.log(resp);
            this.count = resp.data.object.count;
            this.doctorList = resp.data.object.list;
            for (let i = 0; i < this.doctorList.length; i++) {
              let item = this.doctorList[i];
              this.doctorList[i].iNum = i + 1;
              this.doctorList[i].hospitaldept =
                item.hospitalName + "<br>" + item.dept;
              let tmpTimes = item.registerTimes;
              this.doctorTimesList[item.id] = tmpTimes;
              let tmphtml = ``;
              let max = tmpTimes.length >= 2 ? 2 : tmpTimes.length;
              for (let j = 0; j < max; j++) {
                tmphtml +=
                  this.weeks[tmpTimes[j].week] +
                  "&nbsp;&nbsp;" +
                  this.days[tmpTimes[j].day];
                if (j == 0) {
                  tmphtml += "<br/>";
                }
              }
              this.doctorList[i].registerTimes = tmphtml;
            }
          } else {
            this.$Message.info("不允许访问");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 号源
    showTimesModal(id) {
      let tmpArr = this.doctorTimesList[id];
      let tmpHtml = ``;
      tmpArr.forEach((el, i) => {
        tmpHtml += `<span style="display:inline-block;width:30px;">${
          this.weeks[el.week]
        }</span><span style="width:5px;display:inline-block;"></span>
                <span style="display:inline-block;width:30px;">${
                  this.days[el.day]
                }</span><span style="width:5px;display:inline-block;"></span>
                <span style="display:inline-block;width:100px;">${
                  el.timeStart
                } - ${
          el.timeEnd
        }</span><span style="width:5px;display:inline-block;"></span><span style="display:inline-block;width:30px;">${
          el.num
        }</span><span style="width:30px;display:inline-block;"></span>`;
        if (i % 2 == 1) tmpHtml += `<br>`;
        if (i % 2 == 0 && i == tmpArr.length - 1) {
          tmpHtml += `<span style="width:242px;display:inline-block;"></span>`;
        }
      });
      this.timesHtml = tmpHtml;
      this.registertimesFlag = true;
    },
    addDoc(status) {
      //   公用方法
      this.functionJS.queryNavgationTo(
        this,
        "/index/operation/register/normaledit",
        {
          pageNo: this.pageNo,
          province: this.province,
          city: this.city,
          area: this.area,
          hospital: this.hospital,
          isBack: 2,
          searchKey: this.searchKey,
          deptKey: this.deptKey,
          dictType: this.dictType,
          status
        }
      );
    }
  },
  created() {
    let query = this.$route.query;
    this.searchKey = query.searchKey ? query.searchKey : "";
    this.deptKey = query.deptKey ? query.deptKey : "";
    this.dictType = query.dictType ? query.dictType : "";
    this.province = query.province ? parseInt(query.province) : null;
    this.city = query.city ? parseInt(query.city) : null;
    this.area = query.area ? parseInt(query.area) : null;
    this.hospital = query.hospital ? parseInt(query.hospital) : null;
    this.isBack = query.isBack ? parseInt(query.isBack) : 1;

    if (Boolean(this.hospital)) {
      this.changeHospital(this.hospital);
    }

    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/operation/doctorManagement/index",
        title: "患者端运营"
      },
      {
        path: "/index/operation/register/list",
        title: "预约挂号"
      }
    ];
    this.$emit("changeBreadList", breadList);
  }
};
</script>
<style lang="less" scoped>
.doctorreviewlist {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .w-select {
    width: 100px;
  }
  .w-input {
    width: 200px;
  }
  .m-table {
    margin: 10px 0;
  }
  .margin-up-down {
    display: inline-block;
    margin-top: 10px;
  }
}
</style>