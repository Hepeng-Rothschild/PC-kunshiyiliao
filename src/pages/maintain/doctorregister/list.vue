<template>
    <div class="doctorregister">
        <div class="container">
            <!-- 头部信息 -->
            <header>
                <div class="search">
                    <fourLevelLinkage
                        @changeProvince="changeProvince"
                        @changeCity="changeCity"
                        @changeArea="changeArea"
                        @changeHospital="changeHospital"
                        style='margin-bottom:10px;'
                    ></fourLevelLinkage>
                    <Input
                        v-model.trim="Name"
                        placeholder="输入医生姓名/联系方式/医院名称进行查询"
                        style="width: 260px"
                        clearable
                    />
                    <Button type="primary" icon="ios-search" @click="getDoctorData(1)">查询</Button>
                    <Button @click="branch">批量导入</Button>
                    <Button type="info" @click='addDoctor'>新增医生</Button>
                </div>
            </header>
            <!-- 列表 -->
            <div class="list">
                <Table stripe :columns="columns1" :data="list"></Table>
            </div>
        </div>
        <!--分页器-->
        <div class="paging">
            <Page :total="doctorregisterSize" @on-change="pageChange" :current="pageNo"/>
        </div>
        <Modal v-model="modal1" title="预览信息" footer-hide>
            <p class="modal_p">{{ path }}</p>
        </Modal>
    </div>
</template>
<script>
// 医生注册信息
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,

            doctorregisterSize: 10,
            list: [],
            Name: "",
            pageNo: 1,
            modal1: false,
            path: "",
            columns1: [
                {
                    title: '编号',
                    key: 'sum',
                    align:"center",
                    width:100,
                    fixed:'left'
                },
                {
                    title: '医生姓名',
                    key: 'doctorName',
                    align:"center",
                    width:100,
                    fixed:'left'
                },
                {
                    title: '性别',
                    key: 'gender',
                    align:"center",
                    width:100
                },
                {
                    title: '城市',
                    key: 'city',
                    align:"center",
                    width:100
                },
                {
                    title: '医院名称',
                    key: 'hospitalName',
                    align:"center",
                    // width:100
                },
                {
                    title: '就诊科室',
                    key: 'deptType',
                    align:"center",
                    width:100
                },
                {
                    title: '职称',
                    key: 'title',
                    align:"center",
                    width:100
                },
                {
                    title: '医生手机号',
                    key: 'phone',
                    align:"center",
                    width:120
                },
                {
                    title: '医生简介',
                    key: 'personalIntroduction',
                    align:"center",
                    width:120,
                    ellipsis:true,
                    render:(h,params) => {
                        let avatar = params.row;
                        return [
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);",
                                        title: "点击查看医生简介"
                                    },
                                    on: {
                                        click: () => {
                                            this.simple(avatar)
                                        }
                                    }
                                },
                                params.row.personalIntroduction
                            )
                        ]
                    }
                },
                {
                    title: '擅长',
                    key: 'doctorGood',
                    align:"center",
                    width:120,
                    ellipsis:true,
                    render:(h,params) => {
                        let avatar = params.row;
                        return [
                            h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);",
                                        title: "点击查看医生擅长"
                                    },
                                    on: {
                                        click: () => {
                                            this.simples(avatar)
                                        }
                                    }
                                },
                                params.row.doctorGood
                            )
                        ]
                    }                    
                },
                {
                    title: '注册时间',
                    key: 'createTime',
                    align:"center",
                    // width:100
                },
                {
                    title: '数据来源',
                    key: 'ibatch',
                    align:"center",
                    width:100
                }
            ],
            data1: []
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/doctorregister/list",
                title: "医生注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        if (pageNo) {
            this.pageNo = pageNo;
        }
        this.getDoctorData(this.pageNo);
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
        // 批量导入
        branch() {
            this.functionJS.queryNavgationTo(this, "/index/maintain/doctorregister/batchone", {
                pageNo: this.pageNo
            });
        },
        addDoctor () {
            this.functionJS.queryNavgationTo(this, "/index/maintain/doctorregister/addDoctor", {
                pageNo: this.pageNo
            });
        },
        // 分页
        pageChange(index) {
            this.getDoctorData(index);
        },
        // 显示简介
        simple(item) {
            if(!Boolean(item.personalIntroduction)){
                this.$Message.info("暂无医生简介")
                return ""
            }
            this.modal1 = true;
            this.path = item.personalIntroduction;
        },
        // 显示特长
        simples(item) {
            if(!Boolean(item.doctorGood)){
                this.$Message.info("暂无医生特长")
                return ""
            }
            this.modal1 = true;
            this.path = item.doctorGood;
        },
        // 获取页面数据
        getDoctorData(pageNo) {
            this.pageNo = pageNo;
            let params = {
                pageNo,
                pageSize: 10
            };
            if (this.Name != "") {
                params.searchKey = this.Name.trim();
            }
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            console.log("医生注册信息params",params);
            this.$axios.post(api.getDoctorInfo, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    let arr = ['个人注册','批量导入','平台注册']
                    ret.list.forEach((item,index) =>{
                        item.sum = this.addZeros(index);
                        item.gender = item.gender == '0'? '女' :'男'
                        item.ibatch = arr[item.ibatch];
                    })
                    console.log(ret)
                    this.doctorregisterSize = ret.count;
                    this.list = ret.list;
                } else {
                    this.$Message.info(res.data.message);
                }
            });
        }
    },
    components: {
        fourLevelLinkage
    }
};
</script>
<style lang="less" scoped>
.doctorregister {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .container {
        width: 100%;
        margin: 0 auto;
        header {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap:wrap;
            align-items: center;
            justify-content: space-between;
        }
        .list {
            width: 100%;
            margin: 10px 0;
        }
    }
    .paging {
        width: 100%;
        margin: 10px auto;
        text-align: center;
    }
}
</style>