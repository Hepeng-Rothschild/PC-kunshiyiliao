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
                    ></fourLevelLinkage>
                    <Input
                        v-model.trim="Name"
                        placeholder="输入医生姓名/联系方式/医院名称进行查询"
                        style="width: 260px"
                        clearable
                    />
                    <Button type="primary" @click="getDoctorData(1)">查询</Button>
                </div>
                <Button type="primary" @click="branch">批量导入</Button>
            </header>
            <!-- 列表 -->
            <div class="list">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <th>编号</th>
                        <th>医生姓名</th>
                        <th>性别</th>
                        <th>城市</th>
                        <th>医院名称</th>
                        <th>就诊科室</th>
                        <th>职称</th>
                        <th>医生手机号</th>
                        <th>医生简介</th>
                        <th>擅长</th>
                        <th>注册时间</th>
                        <th>数据来源</th>
                    </tr>
                    <tr v-for="(item,index) in list" :key='index'>
                        <th>{{ addZero(index) }}</th>
                        <th>{{ item.doctorName }}</th>
                        <th>{{ item.gender == '0'? '女' :'男' }}</th>
                        <th>{{ item.city }}</th>
                        <th>{{ item.hospitalName }}</th>
                        <th>{{ item.deptType }}</th>
                        <th>{{ item.title }}</th>
                        <th>{{ item.phone }}</th>

                        <!-- <th style = 'max-width:200px;'>{{ item.personalIntroduction }}</th>
                        <th style = 'max-width:200px;'>{{ item.doctorGood }}</th>-->
                        <th class="one" @click="simple(item)">{{ item.personalIntroduction }}</th>
                        <th class="one" @click="simples(item)">{{ item.doctorGood }}</th>

                        <th>{{ item.createTime }}</th>
                        <th>{{ item.ibatch == '0'? '个人注册' :'批量导入'}}</th>
                    </tr>
                </table>
                <div class="notData" v-show="!list.length">暂无更多数据</div>
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
import { Page, Upload } from "iview";
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
            path: ""
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
        let pageNo = this.$route.params.pageNo;
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
            this.$router.push({
                name: "doctorregisterbatchone",
                params: {
                    pageNo: this.pageNo
                }
            });
        },
        // 分页
        pageChange(index) {
            this.pageNo = index;
            if (this.Name) {
                this.getDoctorData(1, this.Name);
            } else {
                this.getDoctorData(index);
            }
        },
        // 显示简介
        simple(item) {
            this.modal1 = true;
            this.path = item.personalIntroduction;
        },
        // 显示特长
        simples(item) {
            this.modal1 = true;
            this.path = item.doctorGood;
        },
        // 获取页面数据
        getDoctorData(pageNo) {
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
            console.log("医生注册信息params",params);
            this.$axios.post(api.getDoctorInfo, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.doctorregisterSize = ret.count;
                    this.list = ret.list;
                } else {
                    this.$Message.info(res.data.message);
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
        Upload,
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
        width: 90%;
        margin: 0 auto;
        header {
            width: 100%;
            height: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        .list {
            width: 100%;
            margin: 10px 0;
            table {
                width: 100%;
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
                        text-align: center;
                    }
                    th.one {
                        max-width: 150px;
                        padding: 0 6px;
                        text-align: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                    }
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