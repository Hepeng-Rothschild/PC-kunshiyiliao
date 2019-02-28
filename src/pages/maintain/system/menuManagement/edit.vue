<template>
  <div class="doctorreviewedit">
    <Row>
      <Col class="padding-t padding-b" :xs="24">基本信息</Col>
    </Row>
    <Form ref="formInline" :model="info" :rules="infoRules" inline>
      <Row class>
        <Col :xs="24" :md="24">
          <Row>
            <Col :xs="24">
              <Row>
                <Col :xs="3" class="text-r">
                  <i class="req-icon">*</i>名称：
                </Col>
                <Col :xs="21">
                  <FormItem class="fullItem" prop="menuName">
                    <Input class="w-input" v-model="info.menuName" placeholder="请输入名称"/>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :xs="24">
              <Row v-if="this.info.level == 2">
                <Col :xs="3" class="text-r">
                  <i class="req-icon"></i>路径：
                </Col>
                <Col :xs="21">
                  <FormItem class="fullItem" prop="path">
                    <Input class="w-input" v-model="info.path" placeholder="请输入路径"/>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :xs="24">
              <Row>
                <Col :xs="3" class="text-r">
                  <i class="req-icon"></i>类型：
                </Col>
                <Col :xs="21">
                  <FormItem class="fullItem" prop="function">
                    <Select class="w-select" @on-change="changeFunction" v-model="info.function">
                      <Option
                        v-for="(item,index) in functionList"
                        :value="item.id"
                        :key="index"
                      >{{item.name}}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :xs="24">
              <Row>
                <Col :xs="3" class="text-r">
                  <i class="req-icon"></i>菜单层级：
                </Col>
                <Col :xs="21">
                  <FormItem class="fullItem" prop="remark">
                    <Select class="w-select" v-model="info.level" @on-change="changeLevel">
                      <Option
                        v-for="(item,index) in levelList"
                        :value="item.id"
                        :key="index"
                      >{{item.val}}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <template v-if="info.level != 0">
              <Col :xs="24">
                <Row>
                  <Col :xs="3" class="text-r">
                    <i class="req-icon"></i>上级菜单：
                  </Col>
                  <Col :xs="21">
                    <FormItem class="fullItem" prop="no">
                      <Select
                        class="w-select"
                        v-if="info.level != 0"
                        v-model="info.topMenu"
                        @on-change="changeTopMenu"
                      >
                        <Option
                          v-for="(item,index) in topList"
                          :value="item.id"
                          :key="index"
                        >{{item.menuName}}</Option>
                      </Select>
                      <Select class="w-select" v-if="info.level == 2" v-model="info.secondMenu">
                        <Option
                          v-for="(item,index) in secondList"
                          :value="item.id"
                          :key="index"
                        >{{item.menuName}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </template>
            <Col :xs="24">
              <Row v-if="info.level == 2">
                <Col :xs="3" class="text-r">
                  <i class="req-icon"></i>权限路径：
                </Col>
                <Col :xs="21">
                  <FormItem class="fullItem" prop="no">
                    <Row>
                      <Col :xs="24">
                        <Input class="w-input" v-model="searchKey" placeholder="权限/备注"/>
                        <Button type="primary" @click="loadPermise(1)">
                          <Icon type="ios-search" size="14"/>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col :xs="24" :md="9">
                        <h2 class="text-c">可选权限路径</h2>
                        <Table border :columns="allCol" :data="allData"></Table>
                        <Page
                          :total="pcount"
                          size="small"
                          :current="ppageNo"
                          :page-size="ppageSize"
                          @on-change="loadPermise"
                        />
                      </Col>
                      <Col :xs="0" :md="2">&nbsp;</Col>
                      <Col :xs="24" :md="9">
                        <h2 class="text-c">已选权限路径</h2>
                        <Table border :columns="selCol" :data="selData"></Table>
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :xs="24">
              <Row>
                <Col :xs="3" class="text-r">
                  <i class="req-icon"></i>备注：
                </Col>
                <Col :xs="21">
                  <FormItem class="fullItem-area" prop="remark">
                    <Input
                      v-model="info.remark"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3 }"
                      placeholder="备注"
                    />
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col :xs="24">
              <Row>
                <Col :xs="3" class="text-r">&nbsp;</Col>
                <Col :xs="21">
                  <Button type="primary" @click="submit('formInline')">提交</Button>
                  <Button type="primary" @click="reback">返回</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
  data() {
    return {
      id: null,
      func: null,
      level: null,
      info: {
        menuName: null,
        remark: null,
        function: "2",
        level: 2,
        topMenu: null,
        secondMenu: null
      },
      functionList: [{ id: "1", name: "菜单" }, { id: "2", name: "功能" }],
      levelList: [{ id: 2, val: 2 }],
      topList: [],
      secondList: [],
      pageNo: null,
      infoRules: {
        menuName: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ]
      },
      map: null,
      allCol: [
        {
          title: "权限路径",
          key: "permisePath",
          align: "center"
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          width: 80,
          render: (h, params) => {
            let id = params.row.id;
            let status = true;
            for (let item of this.selData) {
              if (item.id == id) {
                status = false;
              }
            }
            let selBtn = h("Icon", {
              props: {
                type: "checkmark"
              },
              class: "cus-icon"
            });
            if (status) {
              selBtn = h(
                "a",
                {
                  attrs: {
                    href: "javascript:void(0);"
                  },
                  on: {
                    click: () => {
                      this.selThis({
                        id: params.row.id,
                        permisePath: params.row.permisePath
                      });
                    }
                  }
                },
                "选择"
              );
            }
            return [selBtn];
          }
        }
      ],
      selCol: [
        {
          title: "权限路径",
          key: "permisePath",
          align: "center"
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          width: 80,
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
                      this.selRemove(params.row._index);
                    }
                  }
                },
                "移除"
              )
            ];
          }
        }
      ],
      allData: [],
      selData: [],
      ids: [],
      searchKey: null,
      ppageNo: 1,
      ppageSize: 10,
      pcount: null
    };
  },
  created() {
    this.id = this.$route.query.id ? parseInt(this.$route.query.id) : null;
    this.func = this.$route.query.func ? this.$route.query.func : null;
    this.level = parseInt(this.$route.query.level);
    this.pageNo = this.$route.query.pageNo
      ? parseInt(this.$route.query.pageNo)
      : 1;
    this.searchKey = this.$route.query.searchKey
      ? this.$route.query.searchKey
      : "";
    this.map = new Map();
    this.$axios
      .post(api.operatemenuprentlist, { level: 2 })
      .then(resp => {
        let menuList = resp.data.object;
        let tmpTop = [];
        let tmpSecond = [];
        menuList.map((el, i) => {
          if (el.level == 0) {
            tmpTop.push(el);
          } else {
            tmpSecond.push(el);
          }
        });
        this.map.set("topMenu", tmpTop);
        tmpTop.map((el1, i1) => {
          let tmp = [];
          for (let j = 0; j < tmpSecond.length; j++) {
            let tmpSecondList = tmpSecond[j];
            if (el1.id == tmpSecondList.prentId) {
              tmp.push(tmpSecondList);
            }
          }
          this.map.set(el1.id, tmp);
        });
        this.topList = this.map.get("topMenu");
        if (this.id) {
          this.$axios
            .post(api.operatemenuquerybymenuid, {
              id: this.id,
              function: this.func,
              level: this.level
            })
            .then(resp => {
              this.info = resp.data.object;
              if (this.info.level == 0 || this.info.level == 1) {
                this.levelList = [{ id: 0, val: 0 }, { id: 1, val: 1 }];
              } else if (this.info.level == 2) {
                this.levelList = [{ id: 2, val: 2 }];
              }
              if (this.info.level == 2) {
                this.info.topMenu = this.info.topMenuId;
                this.info.secondMenu = this.info.prentId;
                this.secondList = this.map.get(this.info.topMenu);
              } else if (this.info.level == 1) {
                this.info.topMenu = this.info.prentId;
              }
              this.info.auths.map((el, i) => {
                el.permisePath = el.name + "(" + el.remark + ")";
                this.ids.push(el.id);
                this.selData.push(el);
              });
            })
            .catch(err => {
              // this.$Message.info("服务器超时，请重新访问")
            });
        }
      })
      .catch(err => {
        // this.$Message.info("服务器超时，请重新访问")
      });
    this.loadPermise(1);

    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/maintain/systemManagement/index",
        title: "系统管理"
      },
      {
        path: "/index/maintain/system/m_manage/lt",
        title: "菜单管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
  },
  methods: {
    selThis(obj) {
      this.selData.push(obj);
      this.ids.push(obj.id);
    },
    selRemove(_index) {
      this.selData.splice(_index, 1);
      this.ids.splice(_index, 1);
    },
    loadPermise(pageNo) {
      this.ppageNo = pageNo;
      //查询所有接口权限
      let params = {};
      params.searchKey = this.searchKey;
      params.pageNo = this.ppageNo;
      params.pageSize = this.ppageSize;
      this.$axios
        .post(api.operateauthlist, params)
        .then(resp => {
          this.pcount = resp.data.object.count;
          this.allData = resp.data.object.list;
          this.allData.map((el, i) => {
            this.allData[i].permisePath = el.name + " (" + el.remark + ") ";
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeFunction() {
      this.info.level = null;
      this.info.topMenu = null;
      this.info.secondMenu = null;
      this.info.prentId = null;
      let func = this.info.function;
      if (func == 1) {
        this.levelList = [{ id: 0, val: 0 }, { id: 1, val: 1 }];
      } else {
        this.info.level = 2;
        this.levelList = [{ id: 2, val: 2 }];
      }
    },
    changeLevel() {
      this.info.prentId = null;
      this.info.topMenu = null;
      this.info.secondMenu = null;
      this.info.path = null;
      this.ids = [];
      this.selData = [];
    },
    changeTopMenu() {
      this.secondList = this.map.get(this.info.topMenu);
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let operateApi = "";
          let subMitObj = {};
          let noticeMsg = "";
          if (this.id) {
            operateApi = api.operatemenuupdate;
            noticeMsg = "修改";
          } else {
            noticeMsg = "添加";
            operateApi = api.operatemenuinsert;
          }
          subMitObj.id = this.info.id ? parseInt(this.info.id) : null;
          subMitObj.ids = this.ids;
          subMitObj.menuName = this.info.menuName;
          subMitObj.remark = this.info.remark;
          subMitObj.function = this.info.function;
          subMitObj.path = this.info.path;
          subMitObj.level = this.info.level;
          subMitObj.prentId = this.info.secondMenu
            ? this.info.secondMenu
            : this.info.topMenu
            ? this.info.topMenu
            : 0;
          this.$axios
            .post(operateApi, subMitObj)
            .then(resp => {
              if (resp.data.code == 1) {
                //   公用方法
                this.functionJS.queryNavgationTo(
                  this,
                  "/index/maintain/system/m_manage/lt",
                  {
                    pageNo: this.pageNo,
                    searchKey: this.searchKey
                  }
                );
              } else {
                this.$Message.error(noticeMsg + "失败，请重试");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("数据不正确");
        }
      });
    },
    reback() {
        //   公用方法
        this.functionJS.queryNavgationTo(
            this,
            "/index/maintain/system/m_manage/lt",
            {
                pageNo: this.pageNo,
                searchKey: this.searchKey
            }
        );
    }
  }
};
</script>
<style lang="less" scoped>
.doctorreviewedit {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .padding-l {
    padding-left: 5px;
  }
  .padding-r {
    padding-right: 5px;
  }
  .padding-t {
    padding-top: 15px;
  }
  .padding-b {
    padding-bottom: 15px;
  }
  .borderRight {
    border-right: 1px solid #e5e5e5;
  }
  .borderLeft {
    border-left: 1px solid #e5e5e5;
  }
  .borderBottom {
    border-bottom: 1px solid #e5e5e5;
  }
  .borderTop {
    border-top: 1px solid #e5e5e5;
  }
  .w-select {
    width: 100px;
  }
  .w-input {
    width: 200px;
  }
  .req-icon {
    font-size: 18px;
    color: red;
    display: inline-block;
    height: 18px;
    width: 18px;
    text-align: center;
    line-height: 18px;
    vertical-align: middle;
  }
  .fullItem {
    width: 100%;
  }
  .fullItem-area {
    width: 500px;
  }
  .text-r {
    text-align: right;
  }
  .text-c {
    text-align: center;
  }
}
</style>
<style lang="less">
.upload-avatar {
  display: inline-block;
  vertical-align: middle;
  width: 32px !important;
  height: 32px !important;
  margin-bottom: 3px;
  //   div {
  //     border: 0 !important;
  //   }
}
.avatar-box {
  position: relative;
  display: inline-block;
  .avatar-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 32px;
    height: 32px;
  }
}
.avatar-box:hover .avatar-cover {
  display: block;
  text-align: center;
}
.avatar-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
  line-height: 32px;
}
.progress {
  width: 32px;
}
.cus-icon {
  color: #2d8cf0;
}
</style>