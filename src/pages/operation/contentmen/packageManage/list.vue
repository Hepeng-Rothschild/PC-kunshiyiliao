<template>
    <div class="expert">
        <!--列表-->
        <tmpHeader/>
        <!--添加专家/搜索-->
        <div class="iheader">
            <Button type="info" @click="navtoAdd">添加服务包</Button>
        </div>
        <!--表格列表-->
        <div class="main">
            <Table stripe :columns="columns" :data="tablesList"></Table>
        </div>
    </div>
</template>

<script>
//服务管理
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
    components: {
        tmpHeader
    },
    data() {
        return {
            tablesList: [],
            hospitalId: sessionStorage.getItem("hospitalId"),
            columns:[
                {
                    key:"isum",
                    title:"编号",
                    align:"center"
                },
                {
                    key:"menuName",
                    title:"服务分类",
                    align:"center",
                },
                {
                    key:"result",
                    title:"已开通服务",
                    align:'center'
                },
                {
                    title:"操作",
                    align:'center',
                    render:(h,params) => {
                        return h('a', {
                        on: {
                            click: () => {
                                this.navto(params.row)
                            }
                        }
                        }, '编辑')
                    }
                }
            ]
        };
    },
  created(){
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
        this.getManagementData();
    },
    methods: {
        //分页器改变
        pageChange(index) {
            //   this.getManagementData(index);
        },
        navto() {
            this.functionJS.queryNavgationTo(this, "/index/operation/servicePackage/edit", {
            // 公用方法
            }); 
        },
        navtoAdd() {
            this.functionJS.queryNavgationTo(this, "/index/operation/servicePackage/pAdd", {
                // 公用方法
                type:1
            }); 
        },
        getManagementData() {
            this.$axios
                .post(api.servicepackagelistpackagebyhospital, {
                    hospitalId: parseInt(this.hospitalId)
                })
                .then(res => {
                    
                    if (res.data.success) {
                        let ret = res.data.object[0];
                        console.log(ret);
                        let list = [];
                        let proList = {
                            menuName:'省',
                            result:[],
                        }
                        if(ret.listPro){
                            ret.listPro.map((el,i)=>{
                                proList.result.push(el);
                            })
                        }
                        let cityList = {
                            menuName:'市',
                            result:[],
                        }
                        if(ret.listCity){
                            ret.listCity.map((el,i)=>{
                                cityList.result.push(el);
                            })
                        }
                        let areaList = {
                            menuName:'区',
                            result:[],
                        }
                        if(ret.listArea){
                            ret.listArea.map((el,i)=>{
                                areaList.result.push(el);
                            })
                        }
                        let orgList = {
                            menuName:'上级',
                            result:[],
                        }
                        if(ret.listOrg){
                            ret.listOrg.map((el,i)=>{
                                orgList.result.push(el);
                            })
                        }
                        let hosList = {
                            menuName:'当前',
                            result:[],
                        }
                        if(ret.listHos){
                            ret.listHos.map((el,i)=>{
                                hosList.result.push(el);
                            })
                        }
                        this.tablesList.push(proList);
                        this.tablesList.push(cityList);
                        this.tablesList.push(areaList);
                        this.tablesList.push(orgList);
                        this.tablesList.push(hosList);
                        this.tablesList.forEach((item,index) => {
                            let _result = []
                            item.result.forEach(s => {
                                _result.push(s.packageName)
                            })
                            item.result = _result.join(" | ")
                            item.isum = this.addZeros(index)
                        })
                    }else{
                        this.$Message.info("查询失败,请重试");
                    }
                });
        }
    }
};
</script>

<style scoped lang="less">
.expert {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .iheader {
        width: 80%;
        margin: 10px auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .main {
        width: 80%;
        margin: 0 auto;
    }
}
</style>