<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
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
                <Input class="w-input" v-model="searchKey" :placeholder="'请输入'+keyPlaceHolder"/>
                <Select class="w-select" clearable v-model="dictType" placeholder="职称级别">
                    <Option
                        v-for="item in titleList"
                        :value="item.dictType"
                        :key="item.dictType"
                    >{{item.dictName}}</Option>
                </Select>
                <Select class="w-select" clearable v-model="authStatus" placeholder="认证状态">
                    <Option v-for="(item,index) in statusList" :value="index" :key="index">{{item}}</Option>
                </Select>
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
        <Modal
            title="提示："
            @on-ok="ok"
            @on-cancel="cancel"
            v-model="modalConfirm"
            class-name="vertical-center-modal"
        >
            <p>{{confirmInfo}}</p>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,

            searchKey: "",
            keyPlaceHolder: "医生姓名",
            titleList: "",
            dictType: "",
            statusList: ["未认证", "审核中", "审核通过", "审核未通过"],
            openList: ["未开通", "未开通", "已开通", "未开通"],
            authStatus: null,
            columns: [
                { title: "序号", key: "iNum", align: "center", width: 60 },
                {
                    title: "头像",
                    key: "avatar",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        let avatar = params.row.avatar;
                        let defaultSrc = require("@/assets/images/doctor.jpg");
                        return h("img", {
                            attrs: {
                                src: avatar || defaultSrc,
                                style:
                                    "width:100%;height:100%;border-radius:50%;"
                            }
                        });
                    }
                },
                { title: "姓名", key: "name", align: "center", width: 80 },
                { title: "职称", key: "title", align: "center", width: 100 },
                {
                    title: "科室",
                    key: "deptType",
                    align: "center",
                    width: 100
                },
                {
                    title: "所在医院",
                    key: "hospitalName",
                    align: "center",
                    width: 160
                },
                {
                    title: "认证状态",
                    key: "authStatus",
                    align: "center",
                    width: 100
                },
                {
                    title: "图文问诊",
                    key: "imginquiry",
                    align: "center",
                    width: 100
                },
                {
                    title: "电话问诊",
                    key: "phoneinquiry",
                    align: "center",
                    width: 100
                },
                {
                    title: "视频问诊",
                    key: "videoinquiry",
                    align: "center",
                    width: 100
                },
                {
                    title: "家庭医生",
                    key: "homedoctor",
                    align: "center",
                    width: 100
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 140,
                    render: (h, params) => {
                        let id = params.row.id;
                        var btnTxt = "查看";
                        if (params.row.authStatus == "审核中") {
                            btnTxt = "审核";
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
                                            this.functionJS.queryNavgationTo(
                                                this,
                                                "/index/operation/doctorReview/review",
                                                {
                                                    id,
                                                    pageNo: this.pageNo,
                                                    province: this.province,
                                                    city: this.city,
                                                    area: this.area,
                                                    hospital: this.hospital,
                                                    searchKey: this.searchKey,
                                                    dictType: this.dictType,
                                                    authStatus: this.authStatus,
                                                    isBack: 2
                                                }
                                            );
                                        }
                                    }
                                },
                                btnTxt
                            ),
                            " | ",
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                            //   公用方法
                                            this.functionJS.queryNavgationTo(
                                                this,
                                                "/index/operation/doctorReview/edit",
                                                {
                                                    id,
                                                    pageNo: this.pageNo,
                                                    province: this.province,
                                                    city: this.city,
                                                    area: this.area,
                                                    hospital: this.hospital,
                                                    isBack: 2,
                                                    searchKey: this.searchKey,
                                                    dictType: this.dictType,
                                                    authStatus: this.authStatus
                                                }
                                            );
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            " | ",
                            h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.delDoctor(
                                                params.index,
                                                params.row.id,
                                                params.row.name
                                            );
                                        }
                                    }
                                },
                                "删除"
                            )
                        ];
                    }
                }
            ],
            doctorList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1,
            modalConfirm: false,
            confirmInfo: "",
            delIndex: null,
            delId: null,
            identity: null,
            identityCoding: null,
            ownArea: null,
            isBack: 1
        };
    },
    components: {
        fourLevelLinkage
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
        this.hospital = this.$route.query.hospital
            ? parseInt(this.$route.query.hospital)
            : null;
        this.isBack = this.$route.query.isBack
            ? parseInt(this.$route.query.isBack)
            : 1;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.dictType = this.$route.query.dictType
            ? this.$route.query.dictType
            : "";
        this.authStatus =
            this.$route.query.authStatus == null
                ? null
                : parseInt(this.$route.query.authStatus);
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/doctorreview/list",
                title: "医生认证"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        //获取职称列表
        this.$axios
            .post(api.getTitle)
            .then(resp => {
                this.titleList = resp.data.object;
            })
            .catch(err => {
                console.log(err);
            });
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
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
        },
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            params.title = this.dictType;
            params.authStatus = this.authStatus;
            params.name = this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log(params);
            this.$axios
                .post(api.getReviewDoctorList, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        console.log(resp.data)
                        this.doctorList = resp.data.object.list;
                        for (let i = 0; i < this.doctorList.length; i++) {
                            let item = this.doctorList[i];
                            this.doctorList[i].iNum = i + 1;
                            this.tryCatch(item.docIcon) &&
                                (this.doctorList[i].avatar =
                                    this.fileBaseUrl +
                                    this.tryCatch(item.docIcon).fileName);
                            this.doctorList[i].imginquiry = this.openList[
                                this.doctorList[i].authStatus
                            ];
                            this.doctorList[i].phoneinquiry = this.openList[
                                this.doctorList[i].authStatus
                            ];
                            this.doctorList[i].videoinquiry = this.openList[
                                this.doctorList[i].authStatus
                            ];
                            this.doctorList[i].homedoctor = this.openList[
                                this.doctorList[i].authStatus
                            ];
                            this.doctorList[i].authStatus = this.statusList[
                                this.doctorList[i].authStatus
                            ];
                            this.doctorList[i].operate = this.doctorList[i].id;
                        }
                    } else {
                        this.$Message.info("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        delDoctor(index, id, name) {
            this.confirmInfo = "是否确认删除“" + name + "”?";
            this.modalConfirm = true;
            this.delIndex = index;
            this.delId = id;
        },
        ok() {
            let params = {};
            params.id = this.delId;
            this.$axios
                .post(api.delReviewDoctor, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.doctorList.splice(this.delIndex, 1);
                        this.modalConfirm = false;
                        this.confirmInfo = "";
                        this.delIndex = null;
                        this.delId = null;
                        this.$Message.info("删除成功");
                    } else {
                        this.$Message.info("删除失败，请重试");
                    }
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重试");
                });
        },
        cancel() {
            this.modalConfirm = false;
            this.confirmInfo = "";
            this.delIndex = null;
            this.delId = null;
        }
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
    .w-select-hos {
        width: 180px;
    }
    .w-input {
        width: 200px;
    }
    .m-table {
        margin: 10px 0;
    }
}
</style>