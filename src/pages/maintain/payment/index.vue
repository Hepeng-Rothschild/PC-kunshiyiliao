<template>
    <div class="management1">
        <header>
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
            <span>机构名称：</span>
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
            <Page :current ='pageNo' :total="homeSize" @on-change="pageChange"/>
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
            isBack:1,

            tableList: [],
            val: "",
            homeSize: 10,
            columns1:[
                {
                    title: '排序',
                    key: 'sum',
                    align: 'center',
                },
                {
                    title: '机构名称',
                    key: 'org_name',
                    align: 'center',
                },
                {
                    title:"操作",
                    align: 'center',
                    render: (h,params) => {
                        let a = params.row
                        return h('div', [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.paymentSelect(a)
                                    }
                                }
                            }, '选择支付方式')
                        ])
                    }
                }
            ],
            pageNo:1
        };
    },
    created() {
        this.province = this.$route.query.provinceCode
            ? parseInt(this.$route.query.provinceCode)
            : null;
        this.city = this.$route.query.cityCode
            ? parseInt(this.$route.query.cityCode)
            : null;
        this.area = this.$route.query.areaCode
            ? parseInt(this.$route.query.areaCode)
            : null;
        this.hospital = this.$route.query.hospitalId
            ? parseInt(this.$route.query.hospitalId)
            : null;
        this.isBack = this.$route.query.isBack
            ? parseInt(this.$route.query.isBack)
            : 1;
        
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/systemManagement/index",
                title: "系统管理"
            },
            {
                path: "/index/maintain/payment/index",
                title: "支付方式-列表"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo
        if (Boolean(pageNo)) {
            this.pageNo = Number(pageNo);
        }
        this.getDate(this.pageNo);
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
            console.log(params);
            this.$axios
                .post(api.hospitalquerynamelist, params)
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        this.homeSize = ret.count;
                        ret.list.forEach((item,index) =>{
                            item.sum = this.addZeros(index)
                        })
                        this.tableList = ret.list
                    } else {
                        this.$Message.error("没有访问权限");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        pageChange(index) {
            this.pageNo = index
            if (this.val != "") {
                this.getDate(index, this.val);
            } else {
                this.getDate(index);
            }
        },
        // 查询
        search() {
            this.getDate(1, this.val);
        },
        paymentSelect (item) {
            let params = {
                pageNo: this.pageNo,
                id:item.id,
                name:item.org_name
            }
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            params.isBack = 2
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/payment/select",
                params
            );
        }
    }
};
</script>

<style scoped lang = "less">
.management1 {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    header {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin: 20px 0;
        span {
            color: black;
            line-height: 30px;
            margin-right: 10px;
        }
    }
}
</style>