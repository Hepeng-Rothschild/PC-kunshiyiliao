<template>
    <div class="departmentDrug-add-page">
        <!-- 头部搜索 -->
        <header>
            <Button type="primary" @click="chooseDep" class="chooseDep">选择医疗机构</Button>
            <div class="filter-part">
                <template v-if="finalRecord">
                    <div class="filter-item">
                    <label>医疗机构ID：</label>
                    <div class="content">{{finalRecord.id}}</div>
                    </div>
                    <div class="filter-item">
                    <label>医疗机构名称：</label>
                    <div class="content">{{finalRecord.hospitalName}}</div>
                    </div>
                    <div class="filter-item">
                    <label>联系电话：</label>
                    <div class="content">{{finalRecord.linkmanTelephone}}</div>
                    </div>
                    <div class="filter-item">
                    <label>地址：</label>
                    <div class="content">{{finalRecord.hosAddr}}</div>
                    </div>
                </template>
            </div>
            <div class="fun-part">
                <i-button @click="handleShowUploadModal" :disabled="!finalRecord" type="primary">选择药品目录</i-button>
            </div>
        </header>
        <!-- 列表 -->

        <Tabs value="success">
            <TabPane :label="labelSuccess" name="success">
                <Table
                    size="small" 
                    :columns="columns" 
                    :data="data"
                    :loading="loading"
                    no-data-text="未查询到符合条件的记录"
                    stripe>
                </Table>
            </TabPane>
            <TabPane :label="labelFail" name="fail">
                <Table
                    size="small" 
                    :columns="columns" 
                    :data="data"
                    :loading="loading"
                    no-data-text="未查询到符合条件的记录"
                    stripe>
                </Table>
            </TabPane>
        </Tabs>
        <div class="btn-group">
            <Button class="btn-save btn" type="primary" @click="handleSave">保存对照结果</Button>
            <Button class="btn-cancel btn" @click="handleCancel">取消</Button>
        </div>
        <!-- 选择医疗机构弹窗 -->
        <Modal
            v-model="showChooseDrugModal"
            title="医疗机构选择弹窗"
            width="1100px"
            class="drugmanagement-departmentdrug-add-choose">
            <div class="Institutionalregistration">
                <div class="container">
                    <header style="paddingBottom: 20px;">
                        <div class="search">
                            <fourLevelLinkage
                                @changeProvince="changeProvince"
                                @changeCity="changeCity"
                                @changeArea="changeArea"
                                :province="modalFilterObj.provinceCode"
                                :city="modalFilterObj.cityCode"
                                :area="modalFilterObj.areaCode"
                            ></fourLevelLinkage>
                        <span style="margin-left:30px;">机构名称：</span>
                        <Input v-model.trim="modalFilterObj.searchKey" clearable style="width: 260px" />
                            <Button
                                type="primary"
                                @click="modalSearch()"
                                style="margin-left:30px;width:92px;height:32px"
                            >查询</Button>
                            <Button @click="modalReset" style="margin-left:30px;width:92px;height:32px">重置</Button>
                        </div>
                    </header>
                    <div class="list">
                        <Table
                            border
                            :columns="modalColumn"
                            :data="modalData"
                            stripe
                            no-filtered-data-text="未查询到符合条件的记录"></Table>
                    </div>
                    <div class="paging">
                        <div>
                        显示第{{modalFilterObj.pageSize * (modalFilterObj.pageNo - 1) + 1}}到第{{modalFilterObj.pageSize * modalFilterObj.pageNo}}条记录，总共{{modalCount}}条记录 每页显示
                        <Select v-model="modalFilterObj.pageSize" style="width:60px" placement="top">
                            <Option v-for="item in modalPageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>条记录
                        </div>
                        <Page
                            :total="modalCount"
                            @on-change="modalPageChange"
                            :page-size="modalFilterObj.pageSize"
                            :current="modalFilterObj.pageNo"
                            :loading="modalTableLoading"
                        ></Page>
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <Button class="save" type="primary" :disabled="currentChoose.id !== 0 && !currentChoose.id" :loading="saveLoading"  @click="handleModalSave">确认选择</Button>
            </div>
        </Modal>
        <!-- 选择药品目录上传弹窗 -->
        <Modal
            v-model="showUploadModal"
            title="上传药品目录弹窗"
            class="drugmanagement-departmentdrug-add-uplpadModal">
            <div class="download" @click="download"><a href="javascript:;">下载药品信息导入模版</a></div>
            <div class="uploading">
                <Upload
                ref="upload"
                multiple
                type="drag"
                :data="{json: JSON.stringify({hospitalId: finalRecord && finalRecord.id})}"
                :action="uploadUrl"
                :on-success="handleSuccess"
                :headers="fromData"
                :before-upload="() => $refs['upload'].clearFiles()"
                >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>上传填写好的药品信息导入表</p>
                </div>
                </Upload>
            </div>
            <!-- <div class="btn-group">
                <Button class="save" type="primary" :disabled="currentChoose.id !== 0 && !currentChoose.id" :loading="saveLoading"  @click="handleModalSave">确认选择</Button>
            </div> -->
        </Modal>
    </div>
</template>

<script>
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
const filterObj = {
    pageNo: 1,
    pageSize: '10',
}
const modalFilterObj = {
    provinceCode: null,
    cityCode: null,
    areaCode: null,
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
}
export default {
  components: {
    fourLevelLinkage
  },
  data() {
    return {
      uploadUrl: api.insertBatchKbaoOperateDrug2,
      filterObj: this.deepClone(filterObj),
      modalFilterObj: this.deepClone(modalFilterObj),
      count: 0,
      modalCount: 0,
      loading: false,
      modalTableLoading: false,
      currentChoose: {},
      finalRecord: null,
      columns: [
        {type: 'index', title: '序号', width: 60, align: 'center'},
        { title: "医疗机构药品ID", key: "id", align: "center"},
        { title: "医疗机构药品编码", key: "hisCode2", align: "center"},
        { title: "标准库药品编码", key: "standardCode", align: "center"},
        { title: "医疗机构药品通用名", key: "ypmc", align: "center"},
        { title: "标准库药品通用名", key: "standardYpmc", align: "center"},
        { title: "医疗机构剂型", key: "ypjx", align: "center"},
        { title: "标准库剂型", key: "standardYpjx", align: "center"},
        { title: "医疗机构规格", key: "ypgg", align: "center"},
        { title: "标准库规格", key: "standardYpgg", align: "center"},
        { title: "医疗机构批准文号", key: "pzwh", align: "center"},
        { title: "标准库批准文号", key: "standardPzwhd", align: "center"},
        { title: "医疗机构厂家", key: "scqymc", align: "center"},
        { title: "标准库厂家", key: "standardScqymc", align: "center"},
        { title: "对照结果", key: "compareResult", align: "center"},
      ],
      modalColumn: [
        {
            title: '选择',
            key: 'id',
            width: 70,
            align: 'center',
            render: (h, params) => {
              let flag = false;
              if (this.currentChoose.id === params.row.id) {
                flag = true
              } else {
                flag = false
              }
              let self = this
              return h('div', [
                h('Radio', {
                  props: {
                    value: flag
                  },
                  on: {
                    'on-change': () => {
                      self.currentChoose = params.row;
                    }
                  }
                })
              ])
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
      ],
      data: [],
      modalData: [],
      showChooseDrugModal: false,
      modalPageList: [
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
      showUploadModal: false,
      labelSuccess: (h) => {
        return h('div', [
            h('span', '成功入库列表'),
            h('Badge', {
                props: {
                    // count: 3
                }
            })
        ])
      },
      labelFail: (h) => {
        return h('div', [
            h('span', '失败未入库列表'),
            h('Badge', {
                props: {
                    // count: 3
                }
            })
        ])
      },
    }
  },
  computed: {
  },
  created() {
      let breadList = [
          { path: "/index", title: "首页" },
          {
              path: "",
              title: "药品目录管理"
          },
          {
              path: "/index/operation/drugmanagement/departmentdrug/list",
              title: "医疗机构药品目录对照"
          }
      ];
      this.$emit("changeBreadList", breadList);
  },
  mounted() {
    this.findKbaoHospitalRegisterDtoPage()
    // this.findKbaoHospitalDrugDtoPage();
  },
  methods: {
      changeProvince(val) {
        this.modalFilterObj.provinceCode = val;
        this.modalFilterObj.cityCode = null;
        this.modalFilterObj.areaCode = null;
      },
      changeCity(val) {
        this.modalFilterObj.cityCode = val;
        this.modalFilterObj.areaCode = null;
      },
      changeArea(val) {
        this.modalFilterObj.areaCode = val;
      },
      handleSave() {
          
      },
      handleCancel() {
        this.functionJS.queryNavgationTo(this, "/index/operation/drugmanagement/departmentdrug/list", {
        });
      },
      modalSearch() {
          this.findKbaoHospitalRegisterDtoPage()
      },
      modalReset() {
          this.modalFilterObj = this.deepClone(modalFilterObj);
          this.findKbaoHospitalRegisterDtoPage()
      },
      handleModalSave() {
          this.finalRecord = this.currentChoose;
          this.showChooseDrugModal = false;
      },
      handleShowUploadModal() {
          if (!this.finalRecord) {
              this.$Message.info('请先选择医疗机构')
              return;
          }
          this.showUploadModal = true;
      },
      chooseDep() {
          this.showChooseDrugModal = true;
      },
      modalPageChange(index) {
          this.modalFilterObj.pageNo = index;
          this.findKbaoHospitalRegisterDtoPage();
      },

      handleSuccess(res, file) {
        res = this.uploadFileDecrypt(res);
        console.log(res);
        if (res.code === 1) {
            let ret = res.object[0];
            this.disabled = false;
            this.errorData = ret;
            this.$Message.info("上传成功");
            /* 移除上传文件列表的删除图标 start */
            for (let i = 0; i < uploadListObj.children.length; i++) {
                let liList = uploadListObj.children[i];
                let removeIcon = liList.children[1];
                if (removeIcon) removeIcon.parentNode.removeChild(removeIcon);
            }
            /* 移除上传文件列表的删除图标 end */
        } else {
            this.$Message.error({content: res.message, duration: 3});
        }
      },
      findKbaoHospitalRegisterDtoPage() {
        this.modalTableLoading = true;
        console.log(this.modalFilterObj)
        this.$axios.post(api.findKbaoHospitalRegisterDtoPage, this.modalFilterObj).then(res => {
            this.modalTableLoading = false;
            if (res.data.code === 1) {
                let ret = res.data.object;
                this.doctorregisterSize = ret.count;
                ret.list.forEach((item, index) => {
                    item.sum = this.addZeros(index);
                });
                this.modalData = ret.list;
                this.modalCount = ret.count;
            }
        });
      },
      download() {
          location.href = this.fileBaseUrl + 'excel/drugContrastTemplate.xls'
      },
      deepClone(obj) {
          return JSON.parse(JSON.stringify(obj))
      },
  },
  watch: {
      showChooseDrugModal(nv) {
          if (nv) {
              this.currentChoose = {}
          }
      },
      'modalFilterObj.pageSize'() {
        this.findKbaoHospitalRegisterDtoPage();
      }
  }
}
</script>

<style scoped lang="less">
.departmentDrug-add-page {
    width: 98%;
    min-width: 1200px;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    header {
        width: 100%;
        .filter-part {
            display: flex;
            flex-wrap: wrap;
            margin: 10px 10px 10px 0;
            .filter-item {
                display: flex;
                line-height: 32px;
                &:first-child {
                    label {
                        width: auto;
                    }
                }
                label {
                    white-space: nowrap;
                    line-height: 32px;
                    width: 120px;
                    text-align: right;
                }
                .input {
                    width: 220px;
                }
                .select {
                    width: 70px;
                }
            }
            .filter-btn-group {
                margin: 10px 10px 10px 0;
                flex: 0 0 auto;
            }
        }
        .fun-part {
            margin-bottom: 10px;
            a {
                vertical-align: bottom;
            }
        }
    }
    .btn-group {
        margin: 30px 0 10px;
        text-align: center;
        .btn-save {
            margin-right: 20px;
        }
        .btn-cancel {
            margin-left: 20px;
        }
    }
}
.drugmanagement-departmentdrug-add-choose {
    /deep/ .ivu-modal-wrap {
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
    .paging {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
    }
}
.drugmanagement-departmentdrug-add-uplpadModal {
    /deep/ .ivu-modal-wrap {
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
    .download {
        text-align: center;
        padding: 20px;
        cursor: pointer;
    }
}
</style>