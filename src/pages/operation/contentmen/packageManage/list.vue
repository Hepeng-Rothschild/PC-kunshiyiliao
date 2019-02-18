<template>
    <div class="expert">
        <!--列表-->
        <tmpHeader/>
        <!--添加专家/搜索-->
        <div class="iheader">
            <Button type="primary" @click="navtoAdd">添加服务包</Button>
        </div>
        <!--表格列表-->
        <div class="main">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <th>编号</th>
                    <th>范围</th>
                    <th>服务包</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item,index in tablesList" v-show="tablesList.length">
                    <th>{{ addZeros(index) }}</th>
                    <th>{{ item.menuName }}</th>
                    <th>
                        <span v-for="(items,index) in item.result" v-show='items.packagestatus!=0'>{{index == 0?'':' | '}}{{ items.packageName }}</span>
                    </th>
                    <th @click="navto(item)" style="cursor:pointer;">编辑</th>
                </tr>
            </table>
            <div class="footer" v-show="!tablesList.length">暂无更多数据</div>
        </div>
    </div>
</template>

<script>
//服务管理
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
import { Page } from "iview";
export default {
    components: {
        tmpHeader
    },
    data() {
        return {
            tablesList: [],
            hospitalId: sessionStorage.getItem("hospitalId")
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
            this.$router.push({
                path: "/index/operation/servicePackage/edit"
            });
        },
        navtoAdd() {
            this.$router.push({
                path: "/index/operation/servicePackage/pAdd",
                query:{
                    type:1
                }
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
            }
        }
        .footer {
            width: 100%;
            border: 1px solid #ddd;
            border-top: none;
            text-align: center;
            height: 40px;
            line-height: 40px;
        }
    }
}
</style>