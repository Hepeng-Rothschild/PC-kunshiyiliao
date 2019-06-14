<template>
    <div class="edit">
        <!-- 主体 -->
        <div class="main">
            <!-- 接诊医生显示 -->
            <div class="doctor">
                <!-- 医院 -->
                <span>{{ selectExpert.hospitalName }}</span>
                <!-- 科室 -->
                <span>{{ selectExpert.deptType }}</span>
                <!-- 医生姓名 -->
                <span>{{ selectExpert.doctorName }}</span>
            </div>
            <!-- 医生已开通服务 -->
            <div class = 'service'>
                <span>服务列表：</span>
                <div style='margin-right:8px;' v-for='(item,index) in leftList'>
                    <RadioGroup v-model="serviceType"  @on-change='checkedChange(item, index)'>
                        <Card style="width:110px;">

                            <Checkbox :disabled='item.inUsed == 1' v-model="item.flag" v-if='item.inUsed==1'>{{ item.menuName }}</Checkbox>

                            <Radio :label='item.serviceType' v-if='item.inUsed != 1'>{{ item.menuName }}</Radio>
                            <div style="text-align:center">
                                <h3>{{ item.itemFeePrice }}元</h3>
                            </div>
                        </Card>
                    </RadioGroup>
                </div>
            </div>
            <!-- 已开启的服务 -->
            <div class = 'leftList' v-show='selectList.length'>
                <span style='color:red;'>已开启的服务：</span>
                <ul>
                    <li v-for='(item,index) in selectList' :class="{ active: serviceType == item.serviceType }" @click='clickCurrent(item,index)'>{{ item.menuName }}</li>
                </ul>
            </div>
            <div style='margin-top:10px;'>
                <span>班内排班启用标识：</span>
                <iSwitch v-model="inClassTime" />
            </div>
            <!-- 列表 -->
            <div class="table">
                <p style='color:red;'>设置班内接诊数量</p>
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>时间段</td>
                        <td>排班时间</td>
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
                                @on-change="changeTime"
                                :disabled-hours="[0,1,2,3,4,5,6,7,13,14,15,16,17,18,19,20,21,22,23]"
                                hide-disabled-options
                            ></TimePicker>
                        </td>
                        <td v-for='item in sumList' :key='item'>
                            <InputNumber :max="topLength" :min="0" v-model="item.AM"></InputNumber>
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
                            <InputNumber :max="botLength" :min="0" v-model="item.PM"></InputNumber>
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
                            <InputNumber :max="NightLength" :min="0" v-model="item.NM"></InputNumber>
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
            // 最大号源限制
            topLength: 9999,
            botLength: 9999,
            NightLength: 9999,

            // 备注
            text_info: "",
            // 上午时间
            value2: ["08:00", "12:00"],
            // 下午时间
            value3: ["13:00", "17:00"],
            // 晚上时间
            value5:['18:00','21:00'],
            // 一周号源
            sumList : [
                {
                    // 周一
                    AM: '',
                    PM: '',
                    NM: '',
                },
                {
                    // 周二
                    AM: '',
                    PM: '',
                    NM: '',
                },
                {
                    // 周三
                    AM: '',
                    PM: '',
                    NM: '',
                },
                {
                    // 周四
                    AM: '',
                    PM: '',
                    NM: '',
                },
                {
                    // 周五
                    AM: '',
                    PM: '',
                    NM: '',
                },
                {
                    // 周六
                    AM: '',
                    PM: '',
                    NM: '',
                },
                {
                    // 周天
                    AM: '',
                    PM: '',
                    NM: '',
                }
            ],
            selectExpert: {
                // 医院名称
                hospitalName: "",
                // 科室名称
                deptType: '',
                // 医生名称
                doctorName: '',
                doctorId:""
            },
            // 班外时间可接诊
            classTime: true,
            // 班内时间接诊
            inClassTime: true,

            // 医生服务列表
            serveiceList: [],
            id:"",

            single: true,
            leftList: [],
            current: 0,
            selectList: [],
            // 当前选择中的单选
            serviceType: '',
            //限制第一次加载时
            sum: 1,
            // 当前选择的数据
            currentDate: {},

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
        let id = this.$route.query.id;
        this.id = id
        this.getDefaultData(id)
    },
    methods: {
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
        // 保存/新增专家
        save() {
            let serviceType = []
            let timsList = []
            this.sumList.forEach((item, index) => {
                if(Boolean(item.AM)) {
                    // 上午
                    timsList.push({
                        // 上下晚
                    "day": 1,
                        // 号源
                    "num": item.AM,
                    "timeEnd": this.value2[1] || null,
                    "timeStart": this.value2[0] || null,
                        // 周几
                    "week": index + 1
                    })
                }
                if(Boolean(item.PM)) {
                     // 下午
                    timsList.push({
                        // 上下晚
                    "day": 2,
                        // 号源
                    "num": item.PM,
                    "timeEnd": this.value3[1] || null,
                    "timeStart": this.value3[0] || null,
                        // 周几
                    "week": index + 1
                    })
                }
                if(Boolean(item.NM)) {
                    // 晚上
                    timsList.push({
                        // 上下晚
                    "day": 3,
                        // 号源
                    "num": item.NM,
                    "timeEnd": this.value5[1] || null,
                    "timeStart": this.value5[0] || null,
                        // 周几
                    "week": index + 1
                    })
                }
            })
            let url = api.insertdoctorscheduling;
            console.log(this.currentDate);
            let params = {
                "areaCode": this.area,
                "cityCode": this.city,
                "provinceCode": this.province,
                "doctorId": this.selectExpert.doctorId,
                "inUsed": Number(this.inClassTime).toString(),
                "outUsed": Number(this.classTime).toString(),
                "remark": this.text_info,
                timesList: timsList,
            }
            if(Boolean(Number(this.currentDate.inUsed))) {
                url = api.updatedoctorscheduling
                params.id = this.currentDate.schedulingId
                params.serviceType = this.currentDate.serviceType;
            } else {
                params.typeList = [this.currentDate.serviceType]
            }
            console.log("请求地址", url);
            console.log("传递参数", params);
            if (!this.value2[1] || !this.value3[1] || !this.value5[1]) {
                this.$Message.error("请检查是否有时间段未填写完整!");
                return ""
            }
            this.$axios.post(url, params).then(res => {
                console.log(res);
                if (res.data.success) {
                    this.$Message.info(res.data.object.success);
                    setTimeout(() => {
                        this.back()
                    }, 800);
                } else {
                    this.$Message.error(res.data.object.file || res.data.object.same)
                }
            });
            
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
                if (count <= 0) {
                    this.$Message.error("结束时间不能小于或等于开始时间");
                    this.value2 = ["08:00", "12:00"]
                    return "";
                }
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
            }
        },
        // 选择时间/晚上
        changeTimeNight (val) {
            this.value3 = val;
            if (Boolean(val)) {
                let m1 = Number(val[0].split(":")[1]);
                let s1 = val[0].split(":")[0] * 60 + m1;
                let m2 = Number(val[1].split(":")[1]);
                let s2 = val[1].split(":")[0] * 60 + m2;
                let count = s2 - s1;
                if (count <= 0) {
                    this.$Message.error("结束时间不能小于或等于开始时间");
                    this.value5 = ['18:00','22:00']
                    return "";
                }
            }
        },  
        // 单选
        checkedChange (row,index) {
            if(this.sum != 1) {
                this.selectList.shift()
            }
            this.sum++;
            this.selectList.push(row)
            this.currentDate = row
            if(row.flag) {
                this.getServiceTime(id)
            } else {
                this.clearData();
            }
        },
        // TAB页改变加载不同页的数据
        clickCurrent (row, index) {
            let id = row.schedulingId;
            this.serviceType = row.serviceType
            this.currentDate = row;
            if(row.flag) {
                this.getServiceTime(id)
            } else {
                this.clearData();
            }
            
        },
        // 获取医生已开通服务
        getDefaultData (id) {
            let url = api.querydoctorschedulinglist
            let params = { doctorId: id }
            this.$axios.post(url, params).then(res => {
                if(res.data.success) {
                    let ret = res.data.object;
                    console.log(ret);

                    this.leftList = []
                    
                    ret.forEach(item => {
                        this.leftList.push({
                            doctorId: item.doctorId,
                            inUsed: item.status,
                            itemFeePrice: 10,
                            menuName: item.menuName,
                            schedulingId: item.schedulingId,
                            serviceType: item.serviceType,
                            flag : Boolean(Number(item.status)),
                            status:item.status
                        })
                        if(Boolean(Number(item.status))){
                            this.selectList.push({
                                doctorId: item.doctorId,
                                inUsed: item.status,
                                itemFeePrice: 10,
                                menuName: item.menuName,
                                schedulingId: item.schedulingId,
                                serviceType: item.serviceType,
                                flag : Boolean(Number(item.status)),
                                status:item.status
                            })
                        }
                    })
                    if(this.selectList.length > 0) {
                        this.getServiceTime(this.selectList[0].schedulingId)
                        this.serviceType = this.selectList[0].serviceType
                        this.currentDate = this.selectList[0]
                    }
                    console.log('leftList',this.leftList);
                }
            })
        },
        // 通过医生ID和服务类型获取医生预约时间段
        getServiceTime(id) {
            this.clearData();
            
            this.selectExpert.hospitalName = ''
            this.selectExpert.deptType = ''
            this.selectExpert.doctorName = ''
            this.selectExpert.doctorId = ''

            this.$axios.post(api.doctorschedulingquerybyid, {
               id
            }).then(res => {
                // console.log("通过ID查询排班列表", res);
                if(res.data.success) {
                    let ret = res.data.object;
                    console.log(ret);
                    
                    this.selectExpert.hospitalName = ret.hospitalName
                    // 科室名称
                    this.selectExpert.deptType = ret.deptName
                    // 医生名称
                    this.selectExpert.doctorName = ret.doctorName
                    this.selectExpert.doctorId = ret.doctorId

                    this.classTime = Boolean(Number(ret.outUsed))
                    // 班内时间接诊
                    this.inClassTime = Boolean(Number(ret.inUsed))

                    this.text_info = ret.remark

                    this.id = ret.id;
                    ret.timesList.forEach(item => {
                        let day = item.day;
                        if(Number(item.day) == 1) {
                            // console.log("上午");
                            this.sumList[item.week-1].AM = item.num
                            this.value2 = [item.timeStart, item.timeEnd]
                        } else if(Number(item.day) == 2) {
                            // console.log("下午");
                            this.sumList[item.week-1].PM = item.num
                            // 下午时间
                            this.value3 = [item.timeStart, item.timeEnd]
                        } else {
                            // console.log("晚上");
                            this.sumList[item.week-1].NM = item.num
                            // 晚上时间
                            this.value5 = [item.timeStart, item.timeEnd]
                        }
                    })

                } else {
                    this.$Message.error('查询医生服务排班失败!')
                }
            })

        },
        // 清空查询内容
        clearData () {
            this.sumList.forEach(item => {
                item.AM = ''
                item.PM = ''
                item.NM = ''
            })
            this.classTime = true
            // 班内时间接诊
            this.inClassTime = true

            this.text_info = ''
        },
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
        position: relative;
        .leftList {
            width: auto;
            height:40px;
            display:flex;
            flex-direction:row;
            align-items:center;
            ul{
                width:80%;
                display:flex;
                flex-direction:row;
                align-items:center;
                border-bottom: 1px solid #ddd;
                li{
                    text-align:center;
                    padding:10px 20px;
                    cursor:pointer;
                    border-bottom: 2px solid transparent;
                    transition: all 0.5s;
                }
                li:hover {
                    color: #57a3f3;
                    border-bottom: 2px solid #2d8cf0;
                }
                li.active {
                    color: #2d8cf0;
                    border-bottom: 2px solid #2d8cf0;
                }
            }
        }
        .service{
            margin-top:20px;
            display:flex;
            flex-direction: row;
            align-items:center;
            flex-wrap:wrap;
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
        justify-content: space-between;
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

