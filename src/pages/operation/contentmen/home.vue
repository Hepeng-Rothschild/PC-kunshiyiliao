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
            <span>机构名称：</span>
            <Input
                v-model.trim="val"
                placeholder="请输入医疗机构名称检索"
                style="width: 200px;margin-right:10px;"
                clearable
            />
            <Button type="primary" icon="ios-search" @click="search">查询</Button>
        </header>
        <table border="0" cellspacing="0" cellpadding="0">
            <tr>
                <th>编号</th>
                <th>区域</th>
                <th>机构名称</th>
                <th>联系人</th>
                <th>联系电话</th>
                <th>机构类型</th>
                <th>动态新闻</th>
                <th>专家介绍</th>
                <th>特色科室</th>
                <th>预约科室</th>
                <th>线上服务</th>
                <th>门诊服务</th>
                <th>住院服务</th>
                <th>联盟排序</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item,index) in tableList" :key="index" v-show="tableList.length">
                <th>{{ addZeros(index) }}</th>
                <th>{{ item.provinceName }}</th>
                <th>{{ item.orgName }}</th>
                <th>{{ item.linkman }}</th>
                <th>{{ item.linkmanTelephone }}</th>
                <th v-show="item.hospitalType==1">医院</th>
                <th>{{ item.newsCount }}</th>
                <th>{{ item.doctorCount }}</th>
                <th>{{ item.specialDeptCount }}</th>
                <th>{{ item.reservationCount }}</th>
                <th>{{ item.onlineCount }}</th>
                <th>{{ item.inqCount }}</th>
                <th>{{ item.hospitalCount }}</th>
                <th>{{ item.internetHospitalSort }}</th>
                <th>
                    <span @click="navto(item)">编辑</span>
                </th>
            </tr>
        </table>
        <div class="footer" v-show="!tableList.length">暂无更多数据</div>
        <div style="text-align:center;margin:10px 0;">
            <Page :total="homeSize" @on-change="pageChange"/>
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
            homeSize: 10
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
            let params = {
                pageNo,
                pageSize: 10
            };
            if (val != "") {
                params.orgName = val;
            }
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            console.log("机构管理列表 params",params);
            this.$axios
                .post(api.management, params)
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object.list;
                        this.homeSize = res.data.object.count;
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
            if (this.val != "") {
                this.getDate(index, this.val);
            } else {
                this.getDate(index);
            }
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
    table {
        width: 100%;
        margin: 0 auto;
        border: 1px solid #ddd;
        tr:nth-child(odd) {
            background: #f8f8f9;
        }
        tr:nth-child(even) {
            background: #fff;
        }
        tr:not(:first-child):hover {
            background: #ebf7ff;
        }
        tr {
            border-top: 1px solid #ddd;
            height: 40px;
            th {
                min-width:40px;
                text-align: center;
                span {
                    cursor: pointer;
                    user-select: none;
                }
            }
        }
    }
    .footer {
        width: 100%;
        text-align: center;
        border: 1px solid #dddddd;
        height: 40px;
        line-height: 40px;
        background: #fff;
        border-top: none;
    }
}
</style>