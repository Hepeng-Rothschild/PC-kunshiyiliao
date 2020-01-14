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
                <Table  :columns="columns5" :data="list"></Table>
            </div>
            <Modal
                v-model="modal1"
                title="查看机构名称"
                footer-hide>
                <p>{{ content }}</p>
            </Modal>
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
            Name: "",
            modal1:false,
            columns5:[
                {
                    title:"编号",
                    key:"sum",
                    align:"center",
                    width:60,
                },
                {
                    title:"openID",
                    key:"openid",
                    align:"center",
                    width:260,
                },
                {
                    title:"居民姓名",
                    key:"userName",
                    align:"center",
                    width:100,
                },
                {
                    title:"注册昵称",
                    key:"nickname",
                    align:"center",
                    // width:140
                },
                {
                    title:"联系方式（手机）",
                    key:"telephone",
                    align:"center",
                    width:150
                },
                {
                    title:"注册微信公众号",
                    key:"appNick",
                    align:"center",
                    width:200
                },
                {
                    title:"微信号绑定机构名称",
                    key:"appMechanism",
                    align:"center",
                    width:200,
                    render: (h,params) => {
                        let a = Boolean(params.row.appMechanism) ? params.row.appMechanism : "暂无";
                        return h('div', [
                    　　　　[
                    　　　　h('a', {
                    　　　　　　style: {
                    　　　　　　　　display: 'inline-block',
                    　　　　　　　　width: params.column._width*0.8+'px',
                    　　　　　　　　overflow: 'hidden',
                    　　　　　　　　textOverflow: 'ellipsis',
                    　　　　　　　　whiteSpace: 'nowrap',
                    　　　　　　},
                                attrs:{
                                    title: "点击查看绑定机构名称"
                                },
                                on:{
                                    click :() => {
                                        if(Boolean(params.row.appMechanism)) {
                                            this.simples(a)
                                        } else {
                                            this.$Message.info("暂无微信号绑定机构名称")
                                        }
                                    }
                                }
                    　　　　　　}, a)
                    　　　　]
                    　　])
                    }
                },
                {
                    title:"注册时间",
                    key:"createTime",
                    align:"center",
                    width:160
                }
            ]
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
        simples (content){
            this.content = content;
            this.modal1 = true
        },
        getData(pageNo) {
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
            console.log("居民注册信息params",params);
            this.$axios.post(api.residentReg, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    if (ret.list) {
                        this.residentregisterSize = ret.count;
                        ret.list.forEach((item,index) =>{
                            item.sum = this.addZeros(index)
                        })
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
        width: 100%;
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
        }
    }
    .paging {
        width: 100%;
        margin: 10px auto;
        text-align: center;
    }
}
</style>