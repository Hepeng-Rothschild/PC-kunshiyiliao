<template>
    <div class="Institutionalregistration">
        <div class="container">
            <!-- 头部信息 -->
            <header>
                <div class="search">
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
                    <Input
                        v-model.trim="Name"
                        clearable
                        placeholder="输入机构名称进行查询"
                        style="width: 260px"
                    />
                    <Button type="primary" @click="getMechanismreg(1)">
                        <Icon type="ios-search" size="14"/>查询
                    </Button>
                </div>
                <div class="btn">
                    <Button  @click="batch">批量导入</Button>
                    <Button type="info" @click="add">新增机构</Button>
                </div>
            </header>
            <!-- 列表 -->
            <div class="list">
                <Table :columns="column" :data="list" stripe></Table>
            </div>
            <!--分页器-->
            <div class="paging">
                <Page :total="doctorregisterSize" @on-change="pageChange" :current="pageNo"/>
            </div>
        </div>
    </div>
</template>
<script>
// 机构注册信息
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
            isBack: 1,

            doctorregisterSize: 10,
            list: [],
            Name: "",
            pageNo: 1,
            column:[
                {
                    title:"序号",
                    key:"sum",
                    align:"center",
                    width:60
                },
                {
                    title:"城市",
                    key:"city",
                    align:"center",
                    width:100
                },
                {
                    title:"机构名称",
                    key:"hospitalName",
                    align:"center",
                    width:200,
                    render: (h, params) => {
                        let name = params.row.hospitalName;
                        return h('p',{
                            style: {
                    　　　　　　　　display: 'inline-block',
                    　　　　　　　　width: params.column._width*0.8+'px',
                    　　　　　　　　overflow: 'hidden',
                    　　　　　　　　textOverflow: 'ellipsis',
                    　　　　　　　　whiteSpace: 'nowrap',
                    　　　　　　},
                        },name)
                    }
                },
                {
                    title:"机构类型",
                    key:"internetHospital",
                    align:"center",
                    width:100,
                    render : (h, params) =>{
                        let row = params.row;
                        let name = row.internetHospital == '0' ? '企业' :'医院'
                        return h('span',{

                        },name)
                    }
                },
                {
                    title:"机构编码",
                    key:"orgCode",
                    align:"center",
                    width:150
                },
                {
                    title:"机构等级",
                    key:"grade",
                    align:"center",
                    width:120
                },
                {
                    title:"联系人姓名",
                    key:"linkman",
                    align:"center",
                    width:150,
                    render : (h, params) =>{
                        let row = params.row;
                        let name = '';
                        let style = {}
                        if(Boolean(row.linkman)) {
                            name = row.linkman
                        } else {
                            name = '暂无'
                            style.color = 'gray'
                        }
                        
                        return h('span',{
                                style
                        }, name)
                    }
                },
                {
                    title:"联系电话",
                    key:"linkmanTelephone",
                    align:"center",
                    width:150,
                    render : (h, params) =>{
                        let row = params.row;
                        let name = '';
                        let style = {}
                        if(Boolean(row.linkmanTelephone)) {
                            name = row.linkmanTelephone
                        } else {
                            name = '暂无'
                            style.color = 'gray'
                        }
                        
                        return h('span',{
                            style
                        }, name)
                    }
                },
                {
                    title:"状态",
                    key:"enable",
                    align:"center",
                    width:80,
                    render:(h, params) => {
                        let name = params.row.enable == 0 ? '关闭' : '入驻'
                        return h('span',{

                        }, name)
                    }
                },
                {
                    title:"注册时间",
                    key:"createTime",
                    align:"center",
                    width:150
                },
                {
                    title:"操作",
                    align:"center",
                    width:140,
                    fixed:"right",
                    render:(h, params) =>{
                        let row = params.row;
                        let name = row.enable == '0'? '启用' :'停用'
                        return h('div', [
                            h('a', {
                                on:{
                                    click: () => {
                                        this.edit(row)
                                    }
                                }
                            }, '编辑'),
                            " | ",
                            h('a', {
                                on:{
                                    click: () => {
                                        this.enable(row)
                                    }
                                }
                            }, name)
                        ])
                    }
                },

            ]
        };
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
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/mechanismreg/list",
                title: "机构注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        let pageNo = this.$route.query.pageNo;
        if (pageNo) {
            this.pageNo = parseInt(pageNo);
        }
        this.getMechanismreg(this.pageNo);
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
        //停用/启用
        enable(item) {
            let id = item.id;
            let enable = 0;
            if (!item.enable) {
                enable = 1;
            }
            this.$axios
                .post(api.mechanismregEnable, {
                    enable,
                    id
                })
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        item.enable = enable;
                        this.$Message.info("修改成功");
                    }
                });
        },
        // 批量导入
        batch() {
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/mechanismreg/batchone",
                {
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
            // 
        },
        pageChange(index) {
            this.getMechanismreg(index);
        },
        // 新增机构
        add() {
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/mechanismreg/mechanismregAdd",
                {
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
        },
        // 编辑机构
        edit(item) {
            let id = item.id;
            this.functionJS.queryNavgationTo(
                this,
                "/index/maintain/mechanismreg/mechanismregEdit",
                {
                    id,
                    pageNo: this.pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
        },
        getMechanismreg(pageNo) {
            this.pageNo = pageNo
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
            console.log("机构注册信息params", params);
            this.$axios.post(api.mechanismregList, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    this.doctorregisterSize = ret.count;
                    ret.list.forEach((item,index) => {
                        item.sum = this.addZeros(index)
                    })
                    this.list = ret.list;
                } else {
                    this.$Message.info("不允许访问");
                }
            });
        }
    },
    components: {
        Page,
        fourLevelLinkage
    }
};
</script>
<style lang="less" scoped>
.Institutionalregistration {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .container {
        width: 90%;
        margin: 0 auto;
        .paging {
            width: 100%;
            margin: 10px auto;
            text-align: center;
        }
        header {
            width: 100%;
            .btn{
                margin-top:10px;
            }
        }
        .list {
            width: 100%;
            margin: 10px 0;
        }
    }
}
</style>