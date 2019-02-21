<template>
    <div class="residentregister">
        <div class="container">
            <!-- 头部信息 -->
            <header>
                <div class="search">
                    <fourLevelLinkage
                        @changeProvince="changeProvince"
                        @changeCity="changeCity"
                        @changeArea="changeArea"
                        @changeHospital="changeHospital"
                    ></fourLevelLinkage>
                    <Input
                        v-model.trim="Name"
                        placeholder="输入注册昵称/联系方式/公众号名称查询"
                        style="width: 250px;margin-right:10px;"
                        clearable
                    />
                </div>
                <Button type="primary" icon="ios-search" @click="getData(1)">查询</Button>
            </header>
            <!-- 列表 -->
            <div class="list">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <th>编号</th>
                        <th>openID</th>
                        <th>居民姓名</th>
                        <th>注册昵称</th>
                        <th>联系方式（手机）</th>
                        <th>注册微信公众号</th>
                        <th>微信号
                            <br>绑定机构名称
                        </th>
                        <th>注册时间</th>
                    </tr>
                    <tr v-for="item,index in list">
                        <th>{{ addZero(index) }}</th>
                        <th>{{ item.openid }}</th>
                        <th>{{ item.userName }}</th>
                        <th>{{ item.nickname }}</th>
                        <th>{{ item.telephone }}</th>
                        <th>{{ item.appNick }}</th>
                        <th>{{ item.appMechanism }}</th>
                        <th>{{ item.createTime }}</th>
                    </tr>
                </table>
                <div class="notData" v-show="!list.length">暂无更多数据</div>
            </div>
        </div>
        <!--分页器-->
        <div class="paging">
            <Page :total="residentregisterSize" @on-change="pageChange"/>
        </div>
    </div>
</template>
<script>
// 居民注册信息
import api from "@/api/commonApi";
import { Page } from "iview";
import fourLevelLinkage from "@/components/fourLevelLinkage";
export default {
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            residentregisterSize: 10,
            list: [],
            Name: ""
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
                path: "/index/maintain/residentregister/list",
                title: "居民注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.getData(1);
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
        pageChange(index) {
            if (this.Name) {
                this.getData(index, this.Name);
            } else {
                this.getData(index);
            }
        },
        getData(pageNo) {
            let params = {
                pageNo,
                pageSize: 10
            };
            if (this.Name != "") {
                params.searchKey = this.Name;
            }
            params.provinceCode = this.province ? this.province : null;
            params.cityCode = this.city ? this.city : null;
            params.areaCode = this.area ? this.area : null;
            params.hospitalId = this.hospital ? this.hospital : null;
            console.log("居民注册信息params",params);
            this.$axios.post(api.residentReg, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    if (ret.list) {
                        this.residentregisterSize = ret.count;
                        this.list = ret.list;
                    } else {
                        this.residentregisterSize = 10;
                        this.list = [];
                        this.$Message.info("查询结果为空");
                    }
                } else {
                    this.$Message.info("不允许访问");
                }
            });
        },
        addZero(num) {
            num = num + 1;
            if (num < 10) {
                return "0" + num;
            }
            return num;
        }
    },
    components: {
        Page,
        fourLevelLinkage
    }
};
</script>
<style lang="less" scoped>
.residentregister {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .container {
        width: 90%;
        margin: 0 auto;
        header {
            width: 100%;
            height: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .list {
            width: 100%;
            margin: 10px 0;
            table {
                width: 100%;
                border: 1px solid #ddd;
                tr {
                    border-top: 1px solid #ddd;
                    height: 40px;
                    th {
                        text-align: center;
                    }
                }
                tr:nth-child(odd) {
                    background: #f8f8f9;
                }
                tr:nth-child(even) {
                    background: #fff;
                }
                tr:not(:first-child):hover {
                    background: #ebf7ff;
                }
            }
            .notData {
                width: 100%;
                text-align: center;
                border: 1px solid #ddd;
                border-top: none;
                line-height: 40px;
            }
        }
    }
    .paging {
        width: 100%;
        margin: 10px auto;
        text-align: center;
    }
}
</style>