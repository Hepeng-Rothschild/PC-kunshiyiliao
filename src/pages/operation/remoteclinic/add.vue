<template>
    <div class="edit">
        <!-- 主体 -->
        <div class="main">
            <!-- 添加接诊医生  -->
            <Button type="primary" class="primary" @click="addDoctr">
                <Icon type="ios-search" size="14"/>添加接诊医生
            </Button>
            <div class="doctor">
                <!-- 医院 -->
                <span>{{ selectExpert.hospitalName }}</span>
                <!-- 科室 -->
                <span>{{ selectExpert.deptType }}</span>
                <!-- 医生姓名 -->
                <span>{{ selectExpert.doctorName }}</span>
            </div>
            <!-- 选择专家 -->
            <Modal v-model="modal1" title="选择专家" :footer-hide="true">
                <div class="modelExpert">
                    <div class="searchExpertList">
                        <input type="text" placeholder="输入医生姓名、医院、科室" v-model.trim="searchName">
                        <Button type="primary" icon="ios-search" @click="searchExpert">查询</Button>
                    </div>
                    <div
                        class="modelExpert_list"
                        @click="expert(item)"
                        v-for="item,index in expertList"
                    >
                        <span>{{ item.hospitalName }}</span>
                        <span>{{ item.deptType }}</span>
                        <span>{{ item.doctorName }}</span>
                        <span>{{ item.title }}</span>
                    </div>
                    <div class="total">
                        <Page :total="expertSize" :current="expertNo" @on-change="change1"/>
                    </div>
                </div>
            </Modal>
            <!-- 远程门诊类型 -->
            <div class="item">
                <div class="item-text">
                    <span style="color:red;">*</span>
                    <p>远程门诊类型</p>
                </div>
                <Select class="w-select" @on-change="changeSearchType" v-model="searchType">
                    <Option
                        v-for="item,index in searchTypeList"
                        :value="item.id"
                        :key="item.id"
                    >{{item.name}}</Option>
                </Select>
                <p style="margin-left:20px;color:gray;">！请先选择专家后，再选择远程门诊类型。</p>
            </div>
            <!-- 医事服务费 -->
            <div class="item">
                <div class="item-text">
                    <span style="color:red;"></span>
                    <p>医事服务费</p>
                </div>
                <p>{{ money }}元</p>
            </div>
            <!-- 远程门诊时长 -->
            <div class="item">
                <div class="item-text">
                    <span style="color:red;">*</span>
                    <p>远程门诊时长</p>
                </div>
                <Select class="w-select" v-model="time" @on-change="remoteData">
                    <Option v-for="item in timeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
            </div>
            <!--  预约周期 -->
            <div class="item">
                <div class="item-text">
                    <span style="color:red;">*</span>
                    <p>预约周期</p>
                </div>
                <Select class="w-select" v-model="cycle">
                    <Option v-for="item in cycleList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
            </div>
            <!-- 是否启用 -->
            <!-- <div class="item">
        <div class="item-text">
          <span style="color:red;">*</span>
          <p>是否启用</p>
        </div>
        <iSwitch v-model="switch1"/>
            </div>-->
            <!-- 列表 -->
            <div class="table">
                <p>远程门诊接诊数量</p>
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
                                :disabled-hours="[0,1,2,3,4,13,14,15,16,17,18,19,20,21,22,23]"
                                hide-disabled-options
                            ></TimePicker>
                        </td>
                        <td>
                            <InputNumber :max="topLength" :min="0" v-model="params.oneAm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="topLength" :min="0" v-model="params.twoAm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="topLength" :min="0" v-model="params.threeAm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="topLength" :min="0" v-model="params.fourAm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="topLength" :min="0" v-model="params.fiveAm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="topLength" :min="0" v-model="params.sixAm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="topLength" :min="0" v-model="params.sevenAm"></InputNumber>
                        </td>
                    </tr>
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
                                @on-change="changeTime1"
                                :disabled-hours="[0,1,2,3,4,5,6,7,8,9,10,11,12]"
                                hide-disabled-options
                            ></TimePicker>
                        </td>
                        <td>
                            <InputNumber :max="botLength" :min="0" v-model="params.onePm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="botLength" :min="0" v-model="params.twoPm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="botLength" :min="0" v-model="params.threePm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="botLength" :min="0" v-model="params.fourPm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="botLength" :min="0" v-model="params.fivePm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="botLength" :min="0" v-model="params.sixPm"></InputNumber>
                        </td>
                        <td>
                            <InputNumber :max="botLength" :min="0" v-model="params.sevenPm"></InputNumber>
                        </td>
                    </tr>
                </table>
                <!-- <p>注：数量不能超过时间段/远程门诊时长数量（如上午8:00至12:00，时长30分钟，最多可设置8次）</p> -->
            </div>
            <!-- 预约备注 -->
            <div class="text">
                <span>预约备注：</span>
                <Input v-model.trim="text_info" type="textarea" :rows="4" placeholder="请输入备注"/>
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
import { Select, Option, TimePicker } from "iview";
import api from "@/api/commonApi";
export default {
    components: {
        tempHeader,
        Select,
        Option,
        TimePicker
    },
    data() {
        return {
            // 门诊类型
            searchType: -1,
            searchTypeList: [],
            money: 0,
            //   接诊时长
            time: 30,
            timeList: [
                { id: 30, name: "30分钟" },
                { id: 20, name: "20分钟" },
                { id: 15, name: "15分钟" },
                { id: 10, name: "10分钟" }
            ],
            topLength: 8,
            botLength: 8,
            //   预约周期
            cycle: 7,
            cycleList: [
                { id: 1, name: "一天" },
                { id: 2, name: "二天" },
                { id: 3, name: "三天" },
                { id: 4, name: "四天" },
                { id: 5, name: "五天" },
                { id: 6, name: "六天" },
                { id: 7, name: "七天" },
                { id: 8, name: "八天" },
                { id: 9, name: "九天" },
                { id: 10, name: "十天" },
                { id: 11, name: "十一天" },
                { id: 12, name: "十二天" },
                { id: 13, name: "十三天" },
                { id: 14, name: "十四天" },
                { id: 15, name: "十五天" }
            ],
            switch1: true,
            text_info: "",
            // 添加专家model
            modal1: false,
            expertNo: 1,
            expertSize: 10,
            // 上午时间
            value2: [],
            // 下午时间
            value3: [],
            // 一周号源
            params: {
                // 周一
                oneAm: null,
                onePm: null,
                // 周二
                twoAm: null,
                twoPm: null,
                // 周三
                threeAm: null,
                threePm: null,
                // 周四
                fourAm: null,
                fourPm: null,
                // 周五
                fiveAm: null,
                fivePm: null,
                // 周六
                sixAm: null,
                sixPm: null,
                // 周天
                sevenAm: null,
                sevenPm: null
            },
            // 医院ID
            id: 82,
            selectExpert: {},
            expertList: [
                {
                    hospital: "蚌埠中医院",
                    deparment: "内科",
                    name: "李正兰",
                    host: "主任医师"
                }
            ],
            searchName: "",
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,
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
                path: "/index/operation/remoteclinic/list",
                title: "远程门诊"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    methods: {
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
                "/index/operation/remoteclinic/list",
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
        // 根据选择不同的门诊类型改变不同的价格
        changeSearchType(val) {
            this.searchTypeList.forEach(item => {
                if (item.id == val) {
                    this.money = item.cost;
                }
            });
        },
        // 模态框的分页器改变
        change1(index) {
            this.expertNo = index;
            this.searchExpert();
        },
        // 保存/新增专家
        save() {
            // 号源
            let params = this.params;
            // 远程门诊类型
            params.outpatintTypeId = this.searchType;
            // 门诊时长
            params.outpatientTime = this.time;
            // 门诊周期
            params.cycleDay = this.cycle;
            // 备注
            params.remarks = this.text_info;
            // 上午间隔时间
            params.intervalTimeAmStart = this.value2[0] || null;
            params.intervalTimeAmEnd = this.value2[1] || null;
            // 下午间隔时间
            params.intervalTimePmStart = this.value3[0] || null;
            params.intervalTimePmEnd = this.value3[1] || null;
            // 医生id
            params.doctorId = this.selectExpert.doctorId;
            // 医院ID
            params.hospitalId = this.selectExpert.hospitalId;
            if (this.searchType == -1) {
                this.$Message.info("请选择远程门诊类型");
            } else if (this.time < 0) {
                this.$Message.info("请选择远程门诊时长");
            } else if (this.cycle < 0) {
                this.$Message.info("请选择远程门诊周期");
            } else if (!params.intervalTimeAmEnd || !params.intervalTimePmEnd) {
                this.$Message.info("请查看预约时间段是否未填写完整");
            } else if (params.doctorId == "") {
                this.$Message.info("请选择专家");
            } else {
                this.$axios.post(api.doctorRomteclinicAdd, params).then(res => {
                    if (res.data.code) {
                        this.$Message.info("添加成功");
                        let pageNo = this.$route.query.pageNo;
                        setTimeout(() => {
                            // function全局方法
                            this.functionJS.queryNavgationTo(
                                this,
                                "/index/operation/remoteclinic/list",
                                {
                                    pageNo,
                                    province: this.province,
                                    city: this.city,
                                    area: this.area,
                                    hospital: this.hospital,
                                    isBack: 2
                                }
                            );
                        }, 800);
                    }
                });
            }
        },
        // 选择专家
        expert(item) {
            this.modal1 = false;
            this.selectExpert = item;
            this.getRemoteClinic(item.hospitalId);
        },
        // 远程门诊时间改变
        remoteData() {
            // 设置上午时间
            if (Boolean(this.value2)) {
                let m1 = Number(this.value2[0].split(":")[1]);
                let s1 = this.value2[0].split(":")[0] * 60 + m1;
                let m2 = Number(this.value2[1].split(":")[1]);
                let s2 = this.value2[1].split(":")[0] * 60 + m2;
                let count = s2 - s1;
                if (count < this.time) {
                    this.$Message.info("开始时间与结束时间不能相同");
                    return "";
                }
                if (Boolean(count)) {
                    this.topLength = parseInt(count / this.time);
                } else {
                    this.topLength = null;
                }
                this.params.oneAm = this.topLength;
                this.params.twoAm = this.topLength;
                this.params.threeAm = this.topLength;
                this.params.fourAm = this.topLength;
                this.params.fiveAm = this.topLength;
                this.params.sixAm = this.topLength;
                this.params.sevenAm = this.topLength;
            }
            // 设置下午时间
            if (Boolean(this.value3)) {
                let m1 = Number(this.value3[0].split(":")[1]);
                let s1 = this.value3[0].split(":")[0] * 60 + m1;
                let m2 = Number(this.value3[1].split(":")[1]);
                let s2 = this.value3[1].split(":")[0] * 60 + m2;
                let count = s2 - s1;
                if (count < this.time) {
                    this.$Message.info("开始时间与结束时间不能相同");
                    return "";
                }
                if (Boolean(count)) {
                    this.topLength = parseInt(count / this.time);
                } else {
                    this.topLength = null;
                }
                this.params.onePm = this.topLength;
                this.params.twoPm = this.topLength;
                this.params.threePm = this.topLength;
                this.params.fourPm = this.topLength;
                this.params.fivePm = this.topLength;
                this.params.sixPm = this.topLength;
                this.params.sevenPm = this.topLength;
            }
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
                if (count < this.time) {
                    this.$Message.info("开始时间与结束时间不能相同");
                    return "";
                }
                if (Boolean(count)) {
                    this.topLength = parseInt(count / this.time);
                } else {
                    this.topLength = null;
                }

                this.params.oneAm = this.topLength;
                this.params.twoAm = this.topLength;
                this.params.threeAm = this.topLength;
                this.params.fourAm = this.topLength;
                this.params.fiveAm = this.topLength;
                this.params.sixAm = this.topLength;
                this.params.sevenAm = this.topLength;
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
                if (count < this.time) {
                    this.$Message.info("开始时间与结束时间不能相同");
                    return "";
                }
                if (Boolean(count)) {
                    this.topLength = parseInt(count / this.time);
                } else {
                    this.topLength = null;
                }
                this.params.onePm = this.topLength;
                this.params.twoPm = this.topLength;
                this.params.threePm = this.topLength;
                this.params.fourPm = this.topLength;
                this.params.fivePm = this.topLength;
                this.params.sixPm = this.topLength;
                this.params.sevenPm = this.topLength;
            }
        },
        // 远程门诊类型
        getRemoteClinic(id) {
            this.$axios
                .post(api.DoctorRemoteClinicTypeList, {
                    hospitalId: id
                })
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        this.searchTypeList = ret;
                    }
                });
        },
        // 获取医生列表
        searchExpert() {
            this.$axios
                .post(api.doctorRomteclinicSearchExpert, {
                    pageNo: this.expertNo,
                    pageSize: 10,
                    searchKey: this.searchName,
                    iremote: 1
                })
                .then(res => {
                    if (res.data.code) {
                        this.expertList = res.data.object.list;
                        this.expertSize = res.data.object.count;
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

