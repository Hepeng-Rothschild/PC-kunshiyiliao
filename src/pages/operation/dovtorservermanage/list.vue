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
                <Input class="w-input" v-model="searchKey" placeholder="输入医生科室或职称关键字"/>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
        <Modal
            v-if="mmInfo!=null"
            :mask-closable="false"
            v-model="modalStatus"
            width="760"
            :footer-hide="true"
            :closable="false"
        >
            <header class="slot-tt">平台注册医生信息与院内系统对照关联</header>
            <Row>
                <Col :xs="11">
                    <Row class="m-row">
                        <Col class="c-tt" :xs="24">互联网平台信息</Col>
                    </Row>
                    <Row class="m-row">
                        <Col :xs="24">&nbsp;</Col>
                    </Row>
                    <Row class="m-row m-text">
                        <Col :xs="6">医生姓名:</Col>
                        <Col :xs="18">{{mmInfo.doctorName}}</Col>
                    </Row>
                    <Row class="m-row m-text">
                        <Col :xs="6">所属医院:</Col>
                        <Col :xs="18">{{mmInfo.hospitalName}}</Col>
                    </Row>
                    <Row class="m-row m-text">
                        <Col :xs="6">所属科室:</Col>
                        <Col :xs="18">{{mmInfo.deptType}}</Col>
                    </Row>
                    <Row class="m-row m-text">
                        <Col :xs="6">医师职称:</Col>
                        <Col :xs="18">{{mmInfo.title}}</Col>
                    </Row>
                    <Row class="m-row m-text">
                        <Col :xs="6">联系电话:</Col>
                        <Col :xs="18">{{mmInfo.phone}}</Col>
                    </Row>
                    <Row class="m-row m-text">
                        <Col :xs="6">院内编码:</Col>
                        <Col :xs="18">
                            <Input v-model="mmInfo.hisId" class="m-input" placeholder="院内编码"/>
                        </Col>
                    </Row>
                </Col>
                <Col :xs="11" push="2">
                    <Row class="m-row">
                        <Col class="c-tt" :xs="24">医院院内信息</Col>
                    </Row>
                    <Row class="m-row">
                        <Col :xs="18">
                            <Input v-model="hSearchKey" class="m-input" placeholder="名称或院内编码"/>
                        </Col>
                        <Col :xs="6">
                            <Button type="primary" @click="hLoadPage(1)">查询</Button>
                        </Col>
                    </Row>
                    <template v-if="hDetail">
                        <Row class="m-row m-text">
                            <Col :xs="6">医生姓名:</Col>
                            <Col :xs="18">
                                {{hDetailInfo.doctorName}}
                                <i class="x-back" @click="hCloseDetail">X</i>
                            </Col>
                        </Row>
                        <Row class="m-row m-text">
                            <Col :xs="6">所属医院:</Col>
                            <Col :xs="18">{{hDetailInfo.hospitalName}}</Col>
                        </Row>
                        <Row class="m-row m-text">
                            <Col :xs="6">所属科室:</Col>
                            <Col :xs="18">{{hDetailInfo.deptType}}</Col>
                        </Row>
                        <Row class="m-row m-text">
                            <Col :xs="6">医师职称:</Col>
                            <Col :xs="18">{{hDetailInfo.title}}</Col>
                        </Row>
                        <Row class="m-row m-text">
                            <Col :xs="6">联系电话:</Col>
                            <Col :xs="18">{{hDetailInfo.phone}}</Col>
                        </Row>
                        <Row class="m-row m-text">
                            <Col :xs="6">院内编码:</Col>
                            <Col :xs="18">{{hDetailInfo.hisId}}</Col>
                        </Row>
                    </template>
                    <template v-if="!hDetail">
                        <Table size="small" stripe :columns="hColumns" :data="hList"></Table>
                        <Page
                            size="small"
                            :total="hCount"
                            :current="hPageNo"
                            :page-size="hPageSize"
                            @on-change="hLoadPage"
                        />
                    </template>
                </Col>
            </Row>
            <footer class="slot-ft">
                <Button type="primary" @click="toSaveCode" class="m-btn-l">保存</Button>
                <Button type="default" @click="closeModal" class="m-btn-r">关闭</Button>
            </footer>
        </Modal>
    </div>
</template>
<script>
import { Switch } from "iview";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            modalStatus: false,
            mmInfo: null,
            mId: null,
            mIndex: null,
            hDetailInfo: null,
            hDetail: false,
            hColumns: [
                {
                    title: "医生姓名",
                    key: "doctorName",
                    align: "center",
                    width: 100,
                    render: (h, params) => {
                        let doctorName = params.row.doctorName,
                            _index = params.row._index;
                        return h(
                            "span",
                            {
                                style: {
                                    cursor: "pointer"
                                },
                                on: {
                                    click: () => {
                                        this.hShowDetail(_index);
                                    }
                                }
                            },
                            doctorName
                        );
                    }
                },
                {
                    title: "所属医院",
                    key: "hospitalName",
                    align: "center",
                    width: 180
                },
                {
                    title: "院内编码",
                    key: "hisId",
                    align: "center",
                    width: 100
                }
            ],
            hList: [],
            hCount: 0,
            hPageSize: 4,
            hPageNo: 1,
            hSearchKey: null,

            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 1,

            searchKey: "",
            columns: [
                { title: "序号", key: "iNum", align: "center", width: 60 },
                {
                    title: "医生姓名",
                    key: "doctorName",
                    align: "center",
                    // width: 100,
                    // fixed: 'left',
                },
                {
                    title: "院内编码",
                    key: "hisId",
                    align: "center",
                    // width: 100
                },
                {
                    title: "所在医院",
                    key: "hospitalName",
                    align: "center",
                    width: 220
                },
                { title: "科室", key: "deptType", align: "center", width: 120 },
                { title: "职称", key: "title", align: "center", width: 100 },
                {
                    title: "联系电话",
                    key: "phone",
                    align: "center",
                    width: 120
                },
                {
                    title: "远程门诊",
                    key: "remoteClinic",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let iremote = params.row.iremote,
                            btnText = "已关闭",
                            _index = params.row._index,
                            id = params.row.doctorId;
                        if (iremote == 1) {
                            btnText = "已开启";
                        }
                        return h(
                            "Button",
                            {
                                attrs: {
                                    type: "primary"
                                },
                                on: {
                                    click: () => {
                                        this.changeRemoteClinic(
                                            id,
                                            iremote,
                                            _index
                                        );
                                    }
                                }
                            },
                            btnText
                        );
                    }
                },
                {
                    title: "排序",
                    key: "sort",
                    align: "center",
                    width: 100,
                    render: (h, params) => {
                        let id = params.row.doctorId,
                            sort = params.row.sort,
                            sortStatus = params.row.sortStatus,
                            _index = params.row._index;
                        let content = h(
                            "span",
                            {
                                style: {
                                    cursor: "pointer"
                                },
                                attrs: {
                                    title: "双击修改"
                                },
                                on: {
                                    dblclick: e => {
                                        this.closeOther(_index);
                                        let tmpArr = this.doctorList[_index];
                                        tmpArr.sortStatus = true;
                                        this.$set(
                                            this.doctorList,
                                            _index,
                                            tmpArr
                                        );
                                    }
                                }
                            },
                            sort
                        );
                        if (sortStatus) {
                            let tmpVal = sort;
                            content = h("InputNumber", {
                                props: {
                                    value: sort
                                },
                                attrs: {
                                    min: 1,
                                    max: 999
                                },
                                on: {
                                    "on-change": (event) => {
                                        tmpVal = event;
                                    },
                                    "on-blur": () => {
                                        this.changeSort(id, tmpVal, _index);
                                    }
                                }
                            });
                        }
                        return content;
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    width: 180,
                   // fixed: 'right',
                    render: (h, params) => {
                        let id = params.row.doctorId,
                            _index = params.row._index;
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
                                                "/index/operation/doctormanage/edit",
                                                {
                                                    id,
                                                    pageNo: this.pageNo,
                                                    searchKey: this.searchKey,
                                                    province: this.province,
                                                    city: this.city,
                                                    area: this.area,
                                                    hospital: this.hospital,
                                                    isBack: 2
                                                }
                                            );
                                        }
                                    }
                                },
                                "管理服务"
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
                                            this.showModal(id, _index);
                                        }
                                    }
                                },
                                "信息关联"
                            )
                        ];
                    }
                }
            ],
            doctorList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1
        };
    },
    components: {
        fourLevelLinkage,
        "i-switch": Switch
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
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/doctormanage/list",
                title: "医生管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        //上来就加载第一页数据
        this.loadPage(pageNo);
    },
    methods: {
        hShowDetail(_index) {
            this.hDetailInfo = this.hList[_index];
            this.hDetail = true;
        },
        hCloseDetail() {
            this.hDetail = false;
            this.hDetailInfo = null;
        },
        hLoadPage(pageNo) {
            this.hPageNo = pageNo;
            let params = {};
            params.searchKey = this.hSearchKey.trim();
            params.pageNo = this.hPageNo;
            params.pageSize = this.hPageSize;
            this.$axios
                .post(api.doctorselecthisdoctorlist, params)
                .then(resp => {
                    this.hCount = resp.data.object.count;
                    this.hList = resp.data.object.list;
                    console.log(this.hList);
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问")
                });
        },
        toSaveCode() {
            if (this.mmInfo.hisId == "" || this.mmInfo.hisId == null)
                return this.$Message.warning({
                    content: "互联网平台信息院内编码不能为空",
                    duration: 3
                });
            let params = {};
            params.doctorId = this.mId;
            params.hisId = this.mmInfo.hisId;
            this.$axios
                .post(api.doctorupdatedoctorhisid, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.$Message.success("保存成功");
                        this.doctorList[this.mIndex][
                            "hisId"
                        ] = this.mmInfo.hisId;
                    } else {
                        this.$Message.error("保存失败");
                    }
                    this.closeModal();
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问")
                });
        },
        closeModal() {
            this.modalStatus = false;
        },
        showModal(id, _index) {
            this.mIndex = _index;
            this.$axios
                .post(api.doctorselectdoctorhisid, { doctorId: id })
                .then(resp => {
                    this.mId = id;
                    this.mmInfo = resp.data.object;
                    this.modalStatus = true;
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问")
                });
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
            params.searchKey = this.searchKey.trim();
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log("params",params)
            this.$axios
                .post(api.doctorList, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.count = resp.data.object.count;
                        this.doctorList = resp.data.object.list;
                        for (let i = 0; i < this.doctorList.length; i++) {
                            this.doctorList[i].iNum = i + 1;
                            this.doctorList[i].sortStatus = false;
                        }
                        
                    } else {
                        this.$Message.info("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        closeOther(_index) {
            this.doctorList.map((el, i) => {
                if (i != _index) {
                    let tmp = el;
                    el.sortStatus = false;
                    this.$set(this.doctorList, i, el);
                }
            });
        },
        changeSort(id, val, _index) {
            if(val == undefined){
                let tmpArr = this.doctorList[_index];
                tmpArr.sortStatus = false;
                this.$set(this.doctorList, _index, tmpArr);
                this.$Message.warning({content:'修改失败，数字范围1~999，请三思而后改 ^o^!',duration:5})
                return ;
            }
            let sort = parseInt(val);
            let params = {};
            params.id = parseInt(id);
            params.sort = parseInt(sort);
            this.$axios
                .post(api.doctorupdatedoctorsort, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpArr = this.doctorList[_index];
                        tmpArr.sort = sort;
                        tmpArr.sortStatus = false;
                        this.$set(this.doctorList, _index, tmpArr);
                        this.$Message.success('修改成功');
                    }else{
                        this.$Message.error('修改失败');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changeRemoteClinic(id, iremote, _index) {
            let status, text;
            if (iremote == 1) {
                status = 0;
                text = "关闭";
            } else {
                status = 1;
                text = "开启";
            }
            let params = {};
            params.doctorId = parseInt(id);
            params.iremote = parseInt(status);
            this.$axios
                .post(api.remotedoctorupdateremotestatus, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.$Message.success(text + "成功");
                        this.doctorList[_index].iremote = status;
                    } else this.$Message.info(text + "失败，请重试");
                })
                .catch(err => {
                    console.log(err);
                });
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
<style lang="less">
.m-row {
    line-height: 32px;
    margin: 10px 15px;
}
.m-input {
    width: 220px;
}
.slot-tt {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
}
.slot-ft {
    text-align: center;
}
.c-tt {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
.m-text {
    font-size: 14px;
    font-weight: bold;
}
.m-btn-l {
    margin-right: 30px;
}
.m-btn-r {
    margin-left: 30px;
}
.x-back {
    display: inline-block;
    width: 30px;
    height: 30px;
    color: #fff;
    border: 0;
    border-radius: 50%;
    text-align: center;
    background: #2d8cf0;
    font-weight: normal;
    position: absolute;
    right: 20px;
}
.x-back:hover {
    cursor: pointer;
    background: #57a3f3;
}
</style>