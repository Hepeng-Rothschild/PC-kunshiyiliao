<template>
    <div class="edit">
        <!-- 主体 -->
        <div class="main">
            <!-- 添加接诊医生  -->
            <Button type="primary" class="primary" @click="addDoctr">
                <Icon type="ios-search" size="14"/>添加排班医生
            </Button>
            <!-- 接诊医生显示 -->
            <div class="doctor" v-show='selectExpert.doctorName'>
                <!-- 医院 -->
                <span>{{ selectExpert.hospitalName }}</span>
                <!-- 科室 -->
                <span>{{ selectExpert.deptType }}</span>
                <!-- 医生姓名 -->
                <span>{{ selectExpert.doctorName }}</span>
            </div>
            <!-- 医生已开通服务 -->
            <div class = 'service' v-show='selectExpert.doctorName'>
                <span>医生已开通服务：</span>
                <div style='margin-right:8px;width:auto;' v-for='item in servericeList'>
                    <Card style="width:110px;">
                        <Checkbox v-model="item.flag">{{ item.menuName }}</Checkbox>
                        <div style="text-align:center">
                            <h3>{{ item.itemFeePrice }}元</h3>
                        </div>
                    </Card>
                </div>
            </div>
            <!-- 选择专家 -->
            <Modal v-model="modal1" title="选择专家" :footer-hide="true" width="800" :styles="{top: '20px'}">
                <div class="modelExpert">
                    <div class="searchExpertList">
                        <input type="text" placeholder="输入医生姓名、医院、科室" style='width:230px;margin-right:10px;' v-model.trim="searchName">
                        <Button type="primary" icon="ios-search" @click="searchExpert">查询</Button>
                    </div>
                    <Table stripe :columns="columns" :data="expertList"style='width:100%;'></Table>
                    <div class="total">
                        <Page :total="expertSize" :current="expertNo" @on-change="change1"/>
                    </div>
                </div>
            </Modal>
            <div style='margin-top:10px;'>
                <span>班内排班启用标识：</span>
                <iSwitch v-model="inClassTime" />
            </div>
            <!-- 列表 -->
            <div class="table">
                <p style='color:red;'>设置班内接诊数量</p>
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>时间</td>
                        <td>预约时间段</td>
                        <td>星期一</td>
                        <td>星期二</td>
                        <td>星期三</td>
                        <td>星期四</td>
                        <td>星期五</td>
                        <td>星期六</td>
                        <td>星期天</td>
                    </tr>
                    <!-- @on-change="changeTime" -->
                    <tr>
                        <td>上午</td>
                        <td>
                            <TimePicker
                                :value="value2"
                                format="HH:mm"
                                type="timerange"
                                placement="bottom-end"
                                placeholder="时间段"
                                style="width: 120px"
                                :disabled-hours="[0,1,2,3,4,13,14,15,16,17,18,19,20,21,22,23]"
                                hide-disabled-options
                                @on-change="changeTime"
                            ></TimePicker>
                        </td>
                        <td v-for='item in sumList' :key='item'>
                            <InputNumber :max="topLength" :min="1" v-model="item.oneAm"></InputNumber>
                        </td>
                    </tr>
                     <!-- @on-change="changeTime1" -->
                    <tr>
                        <td>下午</td>
                        <td>
                            <TimePicker
                                :value="value3"
                                format="HH:mm"
                                type="timerange"
                                placement="bottom-end"
                                placeholder="时间段"
                                style="width: 120px"
                                :disabled-hours="[0,1,2,3,4,5,6,7,8,9,10,11,12,18,19,20,21,22,23]"
                                hide-disabled-options
                                @on-change="changeTime1"
                            ></TimePicker>
                        </td>
                        <td v-for='item in sumList' :key='item'>
                            <InputNumber :max="botLength" :min="1" v-model="item.onePm"></InputNumber>
                        </td>
                    </tr>
                    <!-- @on-change="changeTimeNight" -->
                    <tr>
                        <td>晚上</td>
                        <td>
                            <TimePicker
                                :value="value5"
                                format="HH:mm"
                                type="timerange"
                                placement="bottom-end"
                                placeholder="时间段"
                                style="width: 120px"
                                :disabled-hours="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]"
                                hide-disabled-options
                                @on-change="changeTimeNight"
                            ></TimePicker>
                        </td>
                        <td v-for='item in sumList' :key='item'>
                            <InputNumber :max="NightLength" :min="1" v-model="item.oneNm"></InputNumber>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 预约备注 -->
            <div class="text">
                <span>预约备注：</span>
                <Input v-model.trim="text_info" type="textarea" :rows="4" placeholder="请输入备注"/>
            </div>
            <div style='margin-top:10px;'>
                <span>班外时间可接诊：</span>
                <iSwitch v-model="classTime" />
            </div>
            <!-- 保存 -->
            <div class="save">
                <Button type="primary" @click="save">保存</Button>
                <Button @click="back">取消</Button>
            </div>
        </div>
    </div>
</template>
<script>
import tempHeader from "@/components/tmpHeader";
import { TimePicker } from "iview";
import api from "@/api/commonApi";
import { Card } from 'iview'
export default {
    components: {
        tempHeader,
        TimePicker,
        Card
    },
    data() {
        return {
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,

            topLength: 9999,
            botLength: 9999,
            NightLength: 9999,
            switch1: true,
            text_info: "",
            // 添加专家model
            modal1: false,
            expertNo: 1,
            expertSize: 10,
            // 上午时间
            value2: ["08:00", "12:00"],
            // 下午时间
            value3: ["13:00", "17:00"],
            // 晚上时间
            value5: ['18:00','21:00'],
            // 一周号源
            sumList : [
                {
                    // 周一
                    oneAm: null,
                    onePm: null,
                    oneNm: null,
                },
                {
                    // 周二
                    oneAm: null,
                    onePm: null,
                    oneNm: null,
                },
                {
                    // 周三
                    oneAm: null,
                    onePm: null,
                    oneNm: null,
                },
                {
                    // 周四
                    oneAm: null,
                    onePm: null,
                    oneNm: null,
                },
                {
                    // 周五
                    oneAm: null,
                    onePm: null,
                    oneNm: null,
                },
                {
                    // 周六
                    oneAm: null,
                    onePm: null,
                    oneNm: null,
                },
                {
                    // 周天
                    oneAm: null,
                    onePm: null,
                    oneNm: null,
                }
            ],

            // 医院ID
            id: '',
            selectExpert: {},
            expertList: [],
            // 医生表头信息
            columns:[
                {
                    title:"医院名称",
                    key:"hospitalName",
                    align:"center"
                },
                {
                    title:"科室名称",
                    key:"deptType",
                    align:"center"
                },
                {
                    title:"医生名称",
                    key:"doctorName",
                    align:"center"
                },
                {
                    title:"职称",
                    key:"title",
                    align:"center"
                },
                {
                    title:"选择",
                    align:"center",
                    render:(h,params) =>{
                        let row = params.row;
                        
                        return [
                            h('a',{
                                on:{
                                    click: () => {
                                        this.expert(row)
                                    }
                                }
                            },"选择")
                        ]
                    }
                }
            ],
            searchName: "",
            // 班外时间可接诊
            classTime: true,
            // 班内时间
            inClassTime: true,

            single: true,
            // 医生服务列表
            servericeList: [],

        };
    },
    created() {
        this.province = this.$route.query.province?parseInt(this.$route.query.province):null;
        this.city = this.$route.query.city?parseInt(this.$route.query.city):null;
        this.area = this.$route.query.area?parseInt(this.$route.query.area):null;
        this.hospital = this.$route.query.hospital?parseInt(this.$route.query.hospital):null;
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/interScheduling",
                title: "互联网排班"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    methods: {
        // 加载弹窗并请求医生接口
        addDoctr() {
            this.searchExpert();
            this.modal1 = true;
        },
        //  取消,后退 上一次
        back() {
            let pageNo = this.$route.query.pageNo;
            // function全局方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/interScheduling",
                {
                    pageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2
                }
            );
        },
        // 模态框的分页器改变
        change1(index) {
            this.expertNo = index;
            this.searchExpert();
        },
        // 保存/新增专家
        save() {
            // 医生服务
            let typeList = []
            this.servericeList.forEach(item =>{
                if(item.flag) {
                    typeList.push(item.serviceType)
                }
            })
            // 号源
            let timsList = []
            console.log(this.sumList);
            this.sumList.forEach((item, index) => {
                if(Boolean(item.oneAm)) {
                    // 上午
                    timsList.push({
                        // 上下晚
                    "day": 1,
                        // 号源
                    "num": item.oneAm,
                    "timeEnd": this.value2[1] || null,
                    "timeStart": this.value2[0] || null,
                        // 周几
                    "week": index + 1
                    })
                }
                if(Boolean(item.onePm)) {
                     // 下午
                    timsList.push({
                        // 上下晚
                    "day": 2,
                        // 号源
                    "num": item.onePm,
                    "timeEnd": this.value3[1] || null,
                    "timeStart": this.value3[0] || null,
                        // 周几
                    "week": index + 1
                    })
                }
                if(Boolean(item.oneNm)) {
                    // 晚上
                    timsList.push({
                        // 上下晚
                    "day": 3,
                        // 号源
                    "num": item.oneNm,
                    "timeEnd": this.value5[1] || null,
                    "timeStart": this.value5[0] || null,
                        // 周几
                    "week": index + 1
                    })
                }
            })
            
            let params = {
                "areaCode": this.area,
                "cityCode": this.city,
                "provinceCode": this.province,
                "doctorId": this.selectExpert.doctorId,
                "hospitalId": this.selectExpert.hospitalId,
                "inUsed": Number(this.inClassTime).toString(),
                "outUsed": Number(this.classTime).toString(),
                "remark": this.text_info,
                timesList: timsList,
                typeList,
            }
            if(params.timesList.length == 0) {
                this.$Message.error("请选择号源")
                return ""
            }
            if(!Boolean(params.doctorId)) {
                this.$Message.error("请选择医生!");
                return ""
            } else if (!this.value2[1] || !this.value3[1] || !this.value5[1]) {
                this.$Message.error("请检查是否有时间段未填写完整!");
                return ""
            } else if (typeList.length <= 0) {
                this.$Message.error("当前医生/医院未开通服务")
                return ''
            }
            this.$axios.post(api.insertdoctorscheduling, params).then(res => {
                console.log(res);
                if (res.data.code) {
                    this.$Message.info(res.data.object.success);
                    setTimeout(() => {
                        this.back()
                    }, 800);
                } else {
                    this.$Message.error(res.data.object.file || res.data.object.same)
                }
            });
            
        },
        // 选择专家
        expert(item) {
            this.modal1 = false;
            this.selectExpert = item;
            console.log(item);
            // 通过选择的医生加载医生服务列表
            this.$axios.post(api.querydoctormenulist, {
                doctorId: item.doctorId
            }).then(res => {
                if(res.data.success) {
                    let ret = res.data;
                    this.servericeList = ret.object;
                    this.servericeList.forEach(item => {
                        item.flag = false;
                    })
                    if(this.servericeList.length == 0) {
                        this.$Message.info("当前医生/医院没有开通服务")
                    }
                } else {
                    this.$Message.error("加载医生服务列表失败")
                }
            })
        },
        // 选择时间/上午
        changeTime(val) {
            this.value2 = val;
            if (Boolean(val)) {
                let m1 = Number(val[0].split(":")[1]);
                let s1 = val[0].split(":")[0] * 60 + m1;
                let m2 = Number(val[1].split(":")[1]);
                let s2 = val[1].split(":")[0] * 60 + m2;
                let count = s2 - s1;
                console.log(count);
                if (count <= 0) {
                    this.$Message.error("结束时间不能小于或等于开始时间");
                    this.value2 = ["08:00", "12:00"]
                    return "";
                }
                // if (Boolean(count)) {
                //     this.topLength = parseInt(count / this.time);
                // } else {
                //     this.topLength = null;
                // }

                // this.params.oneAm = this.topLength;
                // this.params.twoAm = this.topLength;
                // this.params.threeAm = this.topLength;
                // this.params.fourAm = this.topLength;
                // this.params.fiveAm = this.topLength;
                // this.params.sixAm = this.topLength;
                // this.params.sevenAm = this.topLength;
            }
        },
        // 选择时间/下午
        changeTime1(val) {
            this.value3 = val;
            if (Boolean(val)) {
                let m1 = Number(val[0].split(":")[1]);
                let s1 = val[0].split(":")[0] * 60 + m1;
                let m2 = Number(val[1].split(":")[1]);
                let s2 = val[1].split(":")[0] * 60 + m2;
                let count = s2 - s1;
                if (count <= 0) {
                    this.$Message.error("结束时间不能小于或等于开始时间");
                    this.value3 = ["13:00", "17:00"]
                    return "";
                }
                // if (Boolean(count)) {
                //     this.botLength = parseInt(count / this.time);
                // } else {
                //     this.botLength = null;
                // }
                // this.params.onePm = this.botLength;
                // this.params.twoPm = this.botLength;
                // this.params.threePm = this.botLength;
                // this.params.fourPm = this.botLength;
                // this.params.fivePm = this.botLength;
                // this.params.sixPm = this.botLength;
                // this.params.sevenPm = this.botLength;
            }
        },
        // 选择时间/晚上
        changeTimeNight (val) {
            this.value5 = val;
            if (Boolean(val)) {
                let m1 = Number(val[0].split(":")[1]);
                let s1 = val[0].split(":")[0] * 60 + m1;
                let m2 = Number(val[1].split(":")[1]);
                let s2 = val[1].split(":")[0] * 60 + m2;
                let count = s2 - s1;
                if (count <= 0) {
                    this.$Message.error("结束时间不能小于或等于开始时间");
                    this.value3 = ['18:00','22:00']
                    return "";
                }
                // if (Boolean(count)) {
                //     this.NightLength = parseInt(count / this.time);
                // } else {
                //     this.NightLength = null;
                // }
                // this.params.oneNm = this.NightLength;
                // this.params.twoNm = this.NightLength;
                // this.params.threeNm = this.NightLength;
                // this.params.fourNm = this.NightLength;
                // this.params.fiveNm = this.NightLength;
                // this.params.sixNm = this.NightLength;
                // this.params.sevenNm = this.NightLength;
            }
        },
        // 获取医生列表
        searchExpert() {
            this.$axios
                .post(api.selectdoctorlist, {
                    pageNo: this.expertNo,
                    pageSize: 10,
                    searchKey: this.searchName.trim(),
                    "areaCode": this.area,
                    "cityCode": this.city,
                    "hospitalId": this.hospital,
                    provinceCode : this.province
                })
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        console.log(ret);
                        this.expertList = ret.list;
                        this.expertSize = ret.count;
                    } else {
                        this.$Message.error("加载医生列表失败")
                    }
                });
        }
    }
};
</script>
<style lang="less" scoped>
.edit {
    width: 98%;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    .main {
        width: 80%;
        margin: 15px auto;
        .service{
            margin-top:20px;
            display:flex;
            flex-direction: row;
            align-items:center;
        }
        .doctor {
            width: 100%;
            display: flex;
            height: 40px;
            flex-direction: row;
            align-items: center;
            margin: 10px 0;
            span {
                margin-right: 20px;
                font-size: 20px;
            }
        }
        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 10px 0;
            .item-text {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100px;
            }
            .w-select {
                width: 150px;
            }
        }
        .table {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin: 10px 0;
            p {
                text-align: center;
                margin: 10px 0;
            }
            table {
                width: 100%;
                border: 1px solid #ddd;
                tr:not(:first-child):hover {
                    background: #ebf7ff;
                }
                tr:first-child{
                    background: #f8f8f9;
                }
                tr {
                    border-top: 1px solid #ddd;
                    height: 40px;
                    td {
                        text-align: center;
                    }
                    td.none {
                        display: none;
                    }
                }
            }
            .nodata {
                width: calc(100% - 1px);
                line-height: 40px;
                background: #fff;
                border: 1px solid #ddd;
                border-top: none;
                text-align: center;
            }
        }
        .text {
            width: 100%;
            display: flex;
            flex-direction: row;
            span {
                display: inline-block;
                width: 100px;
            }
        }
        .save {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 200px;
            margin: 10px auto;
            justify-content: space-around;
        }
    }
}
.modelExpert {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .total {
        text-align: center;
        margin: 10px 0;
    }
    .modelExpert_list {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        span {
            width: 25%;
            text-align: center;
            user-select: none;
        }
    }
    .searchExpertList {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        // justify-content: space-between;
        margin-bottom: 20px;
        input {
            width: 80%;
            background: #fff;
            border: none;
            outline: none;
            text-indent: 10px;
            line-height: 30px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    }
}
</style>

