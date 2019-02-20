<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
            <Select
                    class="w-select"
                    :clearable="!provinceStatus"
                    v-model="province"
                    :disabled="provinceStatus"
                    placeholder="省"
                    @on-change="changeProvince"
                >
                    <Option
                        v-for="item in provinceList"
                        :value="item.id"
                        :key="item.id"
                    >{{item.name}}</Option>
                </Select>
                <Select
                    class="w-select"
                    :clearable="!cityStatus"
                    :disabled="cityStatus"
                    v-model="city"
                    placeholder="市"
                    @on-change="changeCity"
                >
                    <Option v-for="item in cityList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                <Select
                    class="w-select"
                    :clearable="!areaStatus"
                    :disabled="areaStatus"
                    v-model="area"
                    placeholder="区"
                    @on-change="changeArea"
                >
                    <Option v-for="item in areaList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                <Select
                    class="w-select-hos"
                    :clearable="!hospitalStatus"
                    :disabled="hospitalStatus"
                    v-model="hospital"
                    placeholder="机构"
                >
                    <Option
                        v-for="item in hospitalList"
                        :value="item.id"
                        :key="item.id"
                    >{{item.name}}</Option>
                </Select>
                <Input class="w-input" v-model="searchKey" placeholder="输入医生科室或职称关键字"/>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
            </Col>
        </Row>
        <Table class="m-table" stripe :columns="columns" :data="doctorList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    </div>
</template>
<script>
import { Select, Option, Switch } from "iview";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            provinceList: [],
            province: null,
            provinceStatus: false,
            cityList: [],
            city: null,
            cityStatus: false,
            areaList: [],
            area: null,
            areaStatus: false,
            hospitalList: [],
            hospital: null,
            hospitalStatus: false,
            searchKey: "",
            columns: [
                { title: "序号", key: "iNum", align: "center" },
                { title: "医生姓名", key: "doctorName", align: "center" },
                { title: "所在医院", key: "hospitalName", align: "center" },
                { title: "科室", key: "deptType", align: "center" },
                { title: "职称", key: "title", align: "center" },
                { title: "联系电话", key: "phone", align: "center" },
                {
                    title: "远程门诊",
                    key: "remoteClinic",
                    align: "center",
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
                    render: (h,params) => {
                        let id = params.row.doctorId,
                            sort = params.row.sort,
                            sortStatus = params.row.sortStatus,
                            _index = params.row._index;
                        let content = h("span",{
                                on:{
                                    click:(e)=>{
                                        this.closeOther(_index);
                                        let tmpArr = this.doctorList[_index];
                                        tmpArr.sortStatus = true;
                                        this.$set(this.doctorList,_index,tmpArr);
                                    }
                                }
                            },sort);
                        if(sortStatus){
                            content = h("Input",{
                                props:{
                                    type:"text",
                                    value:sort
                                },
                                on:{
                                    'on-blur':(e)=>{
                                        if(this.controlTimes == 1){
                                            this.controlTimes++;
                                            let val = e.target.value,
                                                _index = params.row._index;
                                            this.changeSort(id,val,_index);
                                            
                                        }
                                    },
                                    'on-enter':(e)=>{
                                        if(this.controlTimes == 1){
                                            this.controlTimes++;
                                            let val = e.target.value,
                                                _index = params.row._index;
                                            this.changeSort(id,val,_index);
                                        }
                                    }
                                }
                            })
                        }
                        return content
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: "center",
                    render: (h, params) => {
                        let id = params.row.doctorId;
                        return h(
                            "a",
                            {
                                attrs: {
                                    href: "javascript:void(0);"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:
                                                "/index/operation/doctormanage/edit",
                                            query: {
                                                id,
                                                pageNo: this.pageNo,
                                                searchKey: this.searchKey
                                            }
                                        });
                                    }
                                }
                            },
                            "管理服务"
                        );
                    }
                }
            ],
            doctorList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1,
            controlTimes:1
        };
    },
    components: {
        Select,
        Option,
        "i-switch": Switch
    },
    created() {
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
        this.identity = this.$store.getters.getIdentity;
        this.identityCoding = this.$store.getters.getIdentityCoding;
        this.ownArea = JSON.parse(this.$store.getters.getOwnArea);
        if (this.ownArea.province) {
            this.provinceStatus = true;
            this.provinceList.push(this.ownArea.province);
            this.province = this.ownArea.province.id;
        }
        if (this.ownArea.city) {
            this.cityStatus = true;
            this.cityList.push(this.ownArea.city);
            this.city = this.ownArea.city.id;
        }
        if (this.ownArea.area) {
            this.areaStatus = true;
            this.areaList.push(this.ownArea.area);
            this.area = this.ownArea.area.id;
        }
        if (this.identity == 1) {
            this.provinceList = this.$store.getters.getProvinceList;
        } else if (this.identity == 2) {
            this.cityList = this.$store.getters.getCityList(this.province);
        } else if (this.identity == 3) {
            this.areaList = this.$store.getters.getAreaList(this.city);
        } else if (this.identity == 4) {
            var params = {};
            params.provinceCode = parseInt(this.province);
            params.cityCode = parseInt(this.city);
            params.districtCode = parseInt(this.area);
            this.$axios
                .post(api.hospitalselectbyprovincecode, params)
                .then(resp => {
                    let list = resp.data.object;
                    list.map((el, i) => {
                        let tmpObj = {};
                        tmpObj.id = parseInt(el.id);
                        tmpObj.name = el.orgName;
                        this.hospitalList.push(tmpObj);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (this.identity == 5) {
            this.hospital = parseInt(this.identityCoding);
            this.hospitalStatus = true;
            this.$axios
                .post(api.managementInfo, {
                    hospitalId: parseInt(this.identityCoding)
                })
                .then(resp => {
                    this.hospitalList.push({
                        id: resp.data.object.hospitalId,
                        name: resp.data.object.orgName
                    });
                })
                .catch(err => {});
        }
    },
    mounted() {
        let pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        //上来就加载第一页数据
        this.loadPage(pageNo);
    },
    methods: {
        changeProvince() {
            this.city = null;
            this.area = null;
            this.hospital = null;
            this.hospitalList = [];
            this.cityList = this.$store.getters.getCityList(this.province);
        },
        changeCity() {
            this.area = null;
            this.hospital = null;
            this.hospitalList = [];
            this.areaList = this.$store.getters.getAreaList(this.city);
        },
        changeArea() {
            this.hospital = null;
            this.hospitalList = [];
            if (this.area) {
                var params = {};
                params.provinceCode = parseInt(this.province);
                params.cityCode = parseInt(this.city);
                params.districtCode = parseInt(this.area);
                this.$axios
                    .post(api.hospitalselectbyprovincecode, params)
                    .then(resp => {
                        let list = resp.data.object;
                        list.map((el, i) => {
                            let tmpObj = {};
                            tmpObj.id = parseInt(el.id);
                            tmpObj.name = el.orgName;
                            this.hospitalList.push(tmpObj);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.provinceCode = parseInt(this.province ? this.province : null);
            params.cityCode = parseInt(this.city ? this.city : null);
            params.areaCode = parseInt(this.area ? this.area : null);
            params.hospitalId = parseInt(this.hospital ? this.hospital : null);
            params.searchKey = this.searchKey;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            console.log(params);
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
        closeOther(_index){
            this.doctorList.map((el,i)=>{
                if(i != _index){
                    let tmp = el;
                    el.sortStatus = false;
                    this.$set(this.doctorList,i,el);
                }
            })
        },
        changeSort(id,sort,_index){
            let tmpArr = this.doctorList[_index];
            tmpArr.sortStatus = false;
            this.$set(this.doctorList,_index,tmpArr);
            sort = Number(sort);
            if(!Number.isInteger(sort) || sort<1){
                this.$Message.info("排序值只能为大于0的整数");
                sort = this.doctorList[_index].sort;
            }
            let params = {};
            params.id = parseInt(id);
            params.sort = parseInt(sort);
            this.$axios
                .post(api.doctorupdatedoctorsort, params)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpArr = this.doctorList[_index];
                        tmpArr.sort = sort;
                        this.$set(this.doctorList,_index,tmpArr);
                        this.controlTimes = 1;
                    };
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