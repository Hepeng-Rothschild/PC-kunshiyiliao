<template>
    <div class="management1">
        <header>
            <div class="margin-up-down">
                <fourLevelLinkage
                    @changeProvince="changeProvince"
                    @changeCity="changeCity"
                    @changeArea="changeArea"
                    @changeHospital="changeHospital"
                ></fourLevelLinkage>
            </div>
            <span style='margin-left:10px;'>&nbsp;&nbsp;机构名称：</span>
            <Input
                v-model.trim="val"
                placeholder="请输入医疗机构名称检索"
                style="width: 200px;margin-right:10px;"
                clearable
            />
            <Button type="primary" icon="ios-search" @click="search">查询</Button>
        </header>
        <Table stripe :columns="columns1" :data="tableList"></Table>
        <div style="text-align:center;margin:10px 0;">
            <Page :total="homeSize" @on-change="pageChange" :current='pageNo' />
        </div>
    </div>
</template>

<script>
import api from "@/api/commonApi";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import aesUtils from "@/plugins/aes-utils.js";
import store from "@/store";
export default {
    components: {
        fourLevelLinkage
    },
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,

            tableList: [],
            val: "",
            homeSize: 10,
            pageNo:1,
            columns1:[
                {
                    title: '排序',
                    key: 'sum',
                    align: 'center',
                    width: 60,
                },
                {
                    title: '区域',
                    key: 'provinceName',
                    align: 'center',
                    width: 80,
                },
                {
                    title: '机构名称',
                    key: 'orgName',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '联系人',
                    key: 'linkman',
                    align: 'center',
                    width: 120,
                },
                {
                    title:"联系人电话",
                    key:"linkmanTelephone",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"机构类型",
                    key:"hospitalType",
                    align: 'center',
                    width: 100,
                },
                {
                    title:"动态新闻",
                    key:"newsCount",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"专家介绍",
                    key:"doctorCount",
                    align: 'center',
                    width: 120,
                },   
                {
                    title:"特色科室",
                    key:"specialDeptCount",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"预约科室",
                    key:"reservationCount",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"线上服务",
                    key:"onlineCount",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"门诊服务",
                    key:"inqCount",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"住院服务",
                    key:"hospitalCount",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"联盟排序",
                    key:"internetHospitalSort",
                    align: 'center',
                    width: 120,
                },
                {
                    title:"操作",
                    align: 'center',
                    width: 120,
                    fixed:'right',
                    render: (h,params) => {
                        let a = params.row
                        return h('div', [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.navto(a)
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                }
            ]
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/mechanism/index",
                title: "机构运营"
            },
            {
                path: "/index/operation/home",
                title: "机构管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.getDate(1);
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
        // 获取医院列表
        getDate(pageNo, val) {
            this.pageNo = pageNo;
            let params = {
                pageNo,
                pageSize: 10
            };
            if (Boolean(val)) {
                params.orgName = val.trim();
            }
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            // console.log("机构管理列表 params",params);
            this.$axios
                .post(api.management, params)
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object.list;
                        this.homeSize = res.data.object.count;
                        ret.forEach((item,index) =>{
                            item.sum = this.addZeros(index)
                            item.hospitalType = item.hospitalType == 1 ? '医院' :""
                        })
                        this.tableList = ret;
                    } else {
                        this.$Message.error("没有访问权限");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        pageChange(index) {
            // if (this.val != "") {
                this.getDate(index, this.val);
            // } else {
            //     this.getDate(index);
            // }
        },
        navto(item) {
            let iv = store.state.iv;
            let salt = store.state.salt;
            sessionStorage.setItem("hospitalId", item.hospitalId);
            localStorage.setItem(
                "hospitalName",
                aesUtils.encrypt(salt, iv, "Doctortoservice", item.orgName)
            );
            this.$router.push({
                name: "homeInfo"
            });
        },
        search() {
            this.getDate(1, this.val);
        }
    }
};
</script>

<style scoped lang = "less">
.management1 {
    width: 98%;
    padding:10px;
    margin: 0 auto;
    background: #fff;
    header {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        span {
            color: black;
            line-height: 30px;
            margin-right: 10px;
        }
    }
}
</style>