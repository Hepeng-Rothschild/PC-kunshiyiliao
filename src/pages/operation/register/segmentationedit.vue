<template>
    <div class="registeradd">
        <Row>
            <Col class="padding-t padding-b" :xs="24">
                <b>{{littleTitle}}</b>
            </Col>
        </Row>
        <Row style="line-height:32px;">
            <Col :xs="24" :md="3">{{hospitalName}}</Col>
            <Col :xs="24" :md="3">{{dept}}</Col>
            <Col :xs="24" :md="2">{{doctorName}}</Col>
            <Col :xs="24" :md="5">
                <Button type="primary" v-if="addBtnFlag" @click="loadPage(1)">添加专家</Button>
                <span class="expert-msg" :class="{'show-msg': expertMsgStatus}">请添加专家</span>
            </Col>
        </Row>
        <br>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">就诊地址</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Input class="w-input" :maxlength="60" @on-change="checkInput" v-model="address" placeholder="请输入就诊地址"/>
                <span class="rdColor" v-if="addressFlag">就诊地址不能为空</span>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">门诊类型</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Select class="w-select" v-model="outpatientType">
                    <Option
                        v-for="(item,index) of typeList"
                        :key="item.id"
                        :value="item.name"
                    >{{item.name}}</Option>
                </Select>
                <Button type="primary" @click="jump">普通设置</Button>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c" align="middle" :xs="24" :md="3">门诊时间</Col>
            <Col class="padding-l padding-b padding-t borderLeft" :xs="24" :md="21">
                <Row>
                    <Col :xs="2">&nbsp;</Col>
                    <Col :xs="3">&nbsp;</Col>
                    <Col :xs="2">星期一</Col>
                    <Col :xs="2">星期二</Col>
                    <Col :xs="2">星期三</Col>
                    <Col :xs="2">星期四</Col>
                    <Col :xs="2">星期五</Col>
                    <Col :xs="2">星期六</Col>
                    <Col :xs="2">星期日</Col>
                </Row>
                <Row v-for="(item,index) of upList" :key="index">
                    <Col :xs="2">
                        <span v-if="index+1 == 1">
                            <button class="cus-btn" @click="upAdItem" size="small">+</button>上午
                        </span>
                        <span v-else>&nbsp;</span>
                    </Col>
                    <Col :xs="3">
                        <TimePicker
                            :open="item[8]"
                            :value="item[0]"
                            format="HH:mm"
                            type="timerange"
                            :steps="[1,5]"
                            :clearable="false"
                            :confirm="true"
                            :editable="false"
                            :disabled-hours="[0,1,2,3,4,5,6,7,13,14,15,16,17,18,19,20,21,22,23,24]"
                            @on-change="changeUpTime($event,index)"
                            @on-ok="upOk(index)">
                            <a href="javascript:void(0)" @click="upClick(index)">
                                <Icon type="ios-clock-outline"></Icon>
                                <template v-if="item[0][0] === '' || item[0][1] === ''">选择时间段</template>
                                <template v-else>{{ item[0][0]+'-'+item[0][1] }}</template>
                            </a>
                        </TimePicker>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[1]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[2]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[3]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[4]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[5]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[6]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[7]"></InputNumber>
                    </Col>
                    <Col :xs="1">
                        <button
                            v-if="index==upList.length-1 && upList.length!=1"
                            @click="rmUpItem"
                            class="cus-btn"
                            size="small"
                        >-</button>
                    </Col>
                </Row>
                <br>
                <Row v-for="(item,index) of dnList" :key="index">
                    <Col :xs="2">
                        <span v-if="index+1 == 1">
                            <button class="cus-btn" @click="dnAdItem" size="small">+</button>下午
                        </span>
                        <span v-else>&nbsp;</span>
                    </Col>
                    <Col :xs="3">
                        <TimePicker
                            :open="item[8]"
                            :value="item[0]"
                            format="HH:mm"
                            type="timerange"
                            :steps="[1,5]"
                            :clearable="false"
                            :confirm="true"
                            :editable="false"
                            :disabled-hours="[0,1,2,3,4,5,6,7,8,9,10,11,12,18,19,20,21,22,23,24]"
                            @on-change="changeDnTime($event,index)"
                            @on-ok="dnOk(index)">
                            <a href="javascript:void(0)" @click="dnClick(index)">
                                <Icon type="ios-clock-outline"></Icon>
                                <template v-if="item[0][0] === '' || item[0][1] === ''">选择时间段</template>
                                <template v-else>{{ item[0][0]+'-'+item[0][1] }}</template>
                            </a>
                        </TimePicker>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[1]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[2]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[3]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[4]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[5]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[6]"></InputNumber>
                    </Col>
                    <Col :xs="2">
                        <InputNumber min="1" max="99" v-model="item[7]"></InputNumber>
                    </Col>
                    <Col :xs="1">
                        <button
                            v-if="index==dnList.length-1 && dnList.length!=1"
                            @click="rmDnItem"
                            class="cus-btn"
                            size="small"
                        >-</button>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">预约期限</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <InputNumber min="1" max="99" @on-change="checkInput" v-model="term"></InputNumber>天
                <span :class="{rdColor:termRd}" class="notice">预约期限不能为空且不能小于1天</span>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">医事服务费</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <InputNumber min="1" max="9999" @on-change="checkInput" v-model="cost"></InputNumber>元
                <span :class="{rdColor:costRd}" class="notice">医事服务费不能为空，最小为0元</span>
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">患者什么时候、到哪里找您领取挂号</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Input
                    class="w-area"
                    v-model="receive"
                    type="textarea"
                    :maxlength="100"
                    placeholder="请输入挂号领取处"
                />
            </Col>
        </Row>
        <Row class="bordered">
            <Col class="text-align-c borderRight" :xs="24" :md="3">备注</Col>
            <Col class="padding-l" :xs="24" :md="21">
                <Input class="w-area" v-model="remarks" :maxlength="160" placeholder="请输入备注"/>
            </Col>
        </Row>
        <br>
        <Button type="primary" @click="sure">保存</Button>
        <Button type="primary" @click="reback">返回</Button>
        <Modal v-model="docListModal">
            <p slot="header" style="text-align:center">
                <span>选择专家</span>
            </p>
            <div style="text-align:center">
                <Row class="bordered">
                    <Col class="text-align-c" :xs="24">
                        <Input
                            @on-change="loadPage(1)"
                            class="w-input"
                            v-model="doctorKey"
                            :maxlength="20"
                            placeholder="输入医生姓名、医院、科室"
                        />
                    </Col>
                </Row>
                <Row
                    @click.native="chooseDoc(item.hospitalName,item.hospitalId,item.dept,item.deptId,item.doctorName,item.doctorId,item.title)"
                    style="cursor:pointer;margin:15px 0;"
                    v-for="(item,index) of doctorList"
                    :key="index"
                >
                    <Col :xs="6">{{item.hospitalName}}</Col>
                    <Col :xs="6">{{item.dept}}</Col>
                    <Col :xs="6">{{item.doctorName}}</Col>
                    <Col :xs="6">{{item.title}}</Col>
                </Row>
                <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
            </div>
            <div slot="footer"></div>
        </Modal>
        <Modal @on-ok="submit" v-model="subModal" title="请确认时间段是否有误？如需更改请点击取消~">
            <ul style="display:inline-block;width:48%;vertical-align:middle;text-align:center;">
                <li v-for="(item,index) of upList" :key="index">{{ item[0][0]+'-'+item[0][1] }}</li>
            </ul>
            <ul style="display:inline-block;width:48%;vertical-align:middle;text-align:center;">
                <li v-for="(item,index) of dnList" :key="index">{{ item[0][0]+'-'+item[0][1] }}</li>
            </ul>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import tempHeader from "@/components/tmpHeader";
import { Avatar } from "iview";
export default {
    data() {
        return {
            id: null,
            info: null,
            lPageNo: null,
            searchKey: "",
            deptKey: "",
            dictType: "",
            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,

            littleTitle: "编辑",
            addBtnFlag: false,
            doctorName: null,
            doctorId: null,
            hospitalName: null,
            hospitalId: null,
            title: null,
            dept: null,
            deptId: null,
            address: null,
            typeList: [
                { id: 1, name: "普通门诊" }
                // {id:2,name:"社保门诊"}
            ],
            outpatientType: "普通门诊",
            term: 1,
            cost: 0,
            receive: null,
            remarks: null,
            docListModal: false,
            doctorList: [
                { hospitalName: "", dept: "", doctorName: "", title: "" }
            ],
            doctorKey: "",
            pageNo: 0,
            pageSize: 10,
            count: 0,

            expertMsgStatus: false,
            icut: 2,

            upList: [
                [["08:00", "09:00"], null, null, null, null, null, null, null, false],
                [["09:00", "10:00"], null, null, null, null, null, null, null, false],
                [["10:00", "11:00"], null, null, null, null, null, null, null, false],
                [["11:00", "12:00"], null, null, null, null, null, null, null, false]
            ],
            dnList: [
                [["13:00", "14:00"], null, null, null, null, null, null, null, false],
                [["14:00", "15:00"], null, null, null, null, null, null, null, false],
                [["15:00", "16:00"], null, null, null, null, null, null, null, false],
                [["16:00", "17:00"], null, null, null, null, null, null, null, false]
            ],

            open: false,
            value3: '',

            termRd: false,
            costRd: false,

            addressFlag:false,

            subModal:false
        };
    },
    watch: {
        doctorId(newId, oldId) {
            if (newId == null || newId == "" || newId == undefined) {
                this.expertMsgStatus = true;
            } else {
                this.expertMsgStatus = false;
            }
        }
    },
    created() {
        this.id = this.$route.query.id
            ? parseInt(this.$route.query.id)
            : null;
        this.pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.deptKey = this.$route.query.deptKey
            ? this.$route.query.deptKey
            : "";
        this.dictType = this.$route.query.dictType
            ? this.$route.query.dictType
            : "";
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
        this.hospitalName = this.$route.query.hospitalName
            ? this.$route.query.hospitalName
            : null;
        this.hospitalId = this.$route.query.hospitalId
            ? parseInt(this.$route.query.hospitalId)
            : null;
        this.dept = this.$route.query.dept
            ? this.$route.query.dept
            : null;
        this.deptId = this.$route.query.deptId
            ? this.$route.query.deptId
            : null;
        this.doctorName = this.$route.query.doctorName
            ? this.$route.query.doctorName
            : null;
        this.doctorId = this.$route.query.doctorId
            ? parseInt(this.$route.query.doctorId)
            : null;
        this.title = this.$route.query.title
            ? this.$route.query.title
            : null;
        this.address = this.$route.query.address
            ? this.$route.query.address
            : null;
        this.outpatientType = this.$route.query.outpatientType
            ? this.$route.query.outpatientType
            : "普通门诊";
        this.cost = this.$route.query.cost
            ? parseInt(this.$route.query.cost)
            : 0;
        this.term = this.$route.query.term
            ? parseInt(this.$route.query.term)
            : 1;
        this.receive = this.$route.query.receive
            ? this.$route.query.receive
            : null;
        this.remarks = this.$route.query.remarks
            ? this.$route.query.remarks
            : null;
        this.docListModal = false;
        /* 
        ,
                    address:this.address,
                    outpatientType:this.outpatientType,
                    cost:this.cost,
                    term:this.term,
                    receive:this.receive,
                    remarks:this.remarks
        */

        if (this.id) {
            this.littleTitle = "编辑";
            this.addBtnFlag = false;
        } else {
            this.littleTitle = "添加";
            this.addBtnFlag = true;
            this.expertMsgStatus = true;
        }
        if (this.id) {
            this.$axios
                .post(api.registerDoctorDetail, { registerId: this.id })
                .then(resp => {
                    this.info = resp.data.object;
                    this.info.registerTimes.map((el, i) => {
                        if(el.day == 1){
                            this.upList = [];
                            return ;
                        }else if(el.day == 2){
                            this.dnList = [];
                            return ;
                        }
                    });
                    this.info.registerTimes.map((el, i) => {
                        if(el.day == 1){
                            let tmpPiece = [el.timeStart, el.timeEnd];
                            if(this.upList.length<=0){
                                let tmpArr = [tmpPiece,null,null,null,null,null,null,null];
                                tmpArr[el.week] = el.num;
                                this.upList.push(tmpArr);
                            }else{
                                let pFlag = true;
                                let tmpIndex = null;
                                let tmpArr = [tmpPiece,null,null,null,null,null,null,null];
                                this.upList.map((ele,i)=>{
                                    if(ele[0].toString() === tmpPiece.toString()){
                                        pFlag = false;
                                        tmpIndex = i;
                                    }
                                })
                                if(pFlag){
                                    tmpArr[el.week] = el.num;
                                    this.upList.push(tmpArr);
                                }else{
                                    this.upList[tmpIndex][el.week] = el.num;
                                }
                            }
                        }else if(el.day == 2){
                            let tmpPiece = [el.timeStart, el.timeEnd];
                            if(this.dnList.length<=0){
                                let tmpArr = [tmpPiece,null,null,null,null,null,null,null];
                                tmpArr[el.week] = el.num;
                                this.dnList.push(tmpArr);
                            }else{
                                let pFlag = true;
                                let tmpIndex = null;
                                let tmpArr = [tmpPiece,null,null,null,null,null,null,null];
                                this.dnList.map((ele,i)=>{
                                    if(ele[0].toString() === tmpPiece.toString()){
                                        pFlag = false;
                                        tmpIndex = i;
                                    }
                                })
                                if(pFlag){
                                    tmpArr[el.week] = el.num;
                                    this.dnList.push(tmpArr);
                                }else{
                                    this.dnList[tmpIndex][el.week] = el.num;
                                }
                            }
                        }
                    });
                    
                    this.doctorName = this.info.doctorName;
                    this.doctorId = this.info.doctorId;
                    this.hospitalName = this.info.hospitalName;
                    this.hospitalId = this.info.hospitalId;
                    this.dept = this.info.dept;
                    this.deptId = this.info.deptId;
                    this.address = this.info.address;
                    this.outpatientType = this.info.outpatientType;
                    this.term = this.info.term;
                    this.cost = this.info.cost;
                    this.receive = this.info.receive;
                    this.remarks = this.info.remarks;
                })
                .catch(err => {
                    // this.$Message.info("服务器超时，请重新访问");
                });
        }

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/register/list",
                title: "预约挂号"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    components: { Avatar, tempHeader },
    methods: {
        upAdItem() {
            let time = this.upList[this.upList.length - 1][0][1].toString();
            let status = time < "12:00"; //js 里面 date类型 11:00 比 12:00 大
            if (status) {
                let sliceh = parseInt(time.slice(0, 2));
                let afterh = sliceh+1;
                let slicem = time.slice(3);
                slicem = afterh>=12?'00':slicem;
                afterh = afterh<10?'0'+afterh:afterh>12?'12':afterh;
                let tmph = afterh + ":" + slicem;
                let tmpItem = [[time, tmph], null, null, null, null, null, null, null];
                this.upList.push(tmpItem);
            } else {
                this.infoMsg(
                    "上午的结束时间不能超过12:00,请先调整时间段时间再添加"
                );
            }
        },
        dnAdItem() {
            let time = this.dnList[this.dnList.length - 1][0][1].toString();
            let status = time < "17:00"; //js 里面 date类型 11:00 比 12:00 大
            if (status) {
                let sliceh = parseInt(time.slice(0, 2));
                let afterh = sliceh+1;
                let slicem = time.slice(3);
                slicem = afterh>=17?'00':slicem;
                afterh = afterh<10?'0'+afterh:afterh>17?'17':afterh;
                let tmph = afterh + ':' + slicem;
                let tmpItem = [[time, tmph], null, null, null, null, null, null, null];
                this.dnList.push(tmpItem);
            } else {
                this.infoMsg(
                    "下午的结束时间不能超过17:00,请先调整时间段时间再添加"
                );
            }
        },
        rmUpItem() {
            this.upList.pop();
        },
        rmDnItem() {
            this.dnList.pop();
        },
        backTime(minTime,maxTime,startTime,endTime){
            let min = startTime,max = endTime;
            let tmpMinArr = minTime.split(":");
            let tmpMaxArr = maxTime.split(":");
            let tmpStartArr = startTime.split(":");
            if(min<=minTime){
                min = minTime;
                if(max<=minTime){
                    tmpMinArr[1] = parseInt(tmpMinArr[1])+5;
                    tmpMinArr[0] = tmpMinArr[1]>55?parseInt(tmpMinArr[0])+1:parseInt(tmpMinArr[0]);
                    tmpMinArr[0] = tmpMinArr[0]<10?'0'+tmpMinArr[0]:tmpMinArr[0];
                    tmpMinArr[1] = tmpMinArr[1]>55?0:tmpMinArr[1];
                    tmpMinArr[1] = tmpMinArr[1]<10?'0'+tmpMinArr[1]:tmpMinArr[1];
                    max = tmpMinArr[0]+':'+tmpMinArr[1];
                }
            }
            if(max>=maxTime){
                max = maxTime;
                if(min>=maxTime){
                    tmpMaxArr[1] = parseInt(tmpMaxArr[1])-5;
                    tmpMaxArr[0] = tmpMaxArr[1]<0?parseInt(tmpMaxArr[0])-1:parseInt(tmpMaxArr[0]);
                    tmpMaxArr[0] = tmpMaxArr[0]<10?'0'+tmpMaxArr[0]:tmpMaxArr[0];
                    tmpMaxArr[1] = tmpMaxArr[1]<0?55:tmpMaxArr[1];
                    tmpMaxArr[1] = tmpMaxArr[1]<10?'0'+tmpMaxArr[1]:tmpMaxArr[1];
                    min = tmpMaxArr[0]+':'+tmpMaxArr[1];
                }
            }
            if(min == max){
                let minute1 = parseInt(tmpStartArr[1])+5;
                tmpStartArr[0] = minute1>55?parseInt(tmpStartArr[0])+1:parseInt(tmpStartArr[0]);
                tmpStartArr[0] = tmpStartArr[0]<10?'0'+tmpStartArr[0]:tmpStartArr[0];
                minute1 = minute1<10?'0'+minute1:minute1>55?'00':minute1;
                max = tmpStartArr[0]+":"+minute1;
            }
            return [min,max];
        },
        changeUpTime(time,index) {
            if(index>0){ //非第一行
                if(index<this.upList.length-1){ //中间的
                    let prev = this.upList[index-1][0][1]; //最低时间
                    let next = this.upList[index+1][0][0]; //最高时间
                    time = this.backTime(prev,next,time[0],time[1]);
                }else{ //最后一行
                    let prev = this.upList[index-1][0][1]; //最小时间
                    let next = '12:00';
                    time = this.backTime(prev,next,time[0],time[1]);
                }
            }else{ //第一行
                if(this.upList.length>1){ //多行第一行
                    let nextTime = this.upList[index+1][0][0];//最高时间
                    let prev = '08:00';
                    time = this.backTime(prev,nextTime,time[0],time[1]);
                }else{  //就剩一行
                    let prev = '08:00';
                    let next = '12:00';
                    time = this.backTime(prev,next,time[0],time[1]);
                }
            }
            this.upList[index][0] = time;
            this.$forceUpdate();
        },
        upClick (index) {
            this.upList[index][8] = true;
            this.$forceUpdate();
        },
        upOk (index) {
            this.upList[index][8] = false;
            this.$forceUpdate();
        },

        changeDnTime(time,index) {
            if(index>0){ //非第一行
                if(index<this.dnList.length-1){ //中间的
                    let prev = this.dnList[index-1][0][1];
                    let next = this.dnList[index+1][0][0];
                    time = this.backTime(prev,next,time[0],time[1]);
                }else{ //最后一行
                    let prev = this.dnList[index-1][0][1];
                    let next = '17:00';
                    time = this.backTime(prev,next,time[0],time[1]);
                }
            }else{ //第一行
                if(this.dnList.length>1){
                    let prev = '13:00';
                    let nextTime = this.dnList[index+1][0][0];
                    time = this.backTime(prev,nextTime,time[0],time[1]);
                }else{
                    let prev = '13:00';
                    let next = '17:00';
                    time = this.backTime(prev,next,time[0],time[1]);
                }
            }
            this.dnList[index][0] = time;
            this.$forceUpdate();
        },
        dnClick (index) {
            this.dnList[index][8] = true;
            this.$forceUpdate();
        },
        dnOk (index) {
            this.dnList[index][8] = false;
            this.$forceUpdate();
        },
        sure(){
            this.subModal = true;
        },
        submit(name) {
            let flag = true;
            if (this.cost == null) return (this.costRd = true);
            if (this.term == null) return (this.termRd = true);
            let tmpRegistertimes = [];
            this.upList.map((el,i)=>{
                for(let i=1;i<=7;i++){
                    if(el[i] != '' && el[i]>0){
                        let tmpObj = {};
                        tmpObj.timeStart = el[0][0];
                        tmpObj.timeEnd = el[0][1];
                        tmpObj.num = el[i];
                        tmpObj.day = 1;
                        tmpObj.week = i;
                        tmpRegistertimes.push(tmpObj);
                    }
                }
            })
            this.dnList.map((el,i)=>{
                for(let i=1;i<=7;i++){
                    if(el[i] != '' && el[i]>0){
                        let tmpObj = {};
                        tmpObj.timeStart = el[0][0];
                        tmpObj.timeEnd = el[0][1];
                        tmpObj.num = el[i];
                        tmpObj.day = 2;
                        tmpObj.week = i;
                        tmpRegistertimes.push(tmpObj);
                    }
                }
            })
            if(!this.address){
                this.addressFlag = true;
                flag = false;
            }
            if(tmpRegistertimes.length<=0){
                flag = false;
                this.$Message.error({content:"请至少有一个号源有号再保存，谢谢",duration:5});
            }
            let params = {};
            params.address = this.address;
            params.cost = this.cost;
            params.dept = this.dept;
            params.deptId = this.deptId;
            params.doctorId = this.doctorId;
            params.hospitalId = this.hospitalId;
            params.iclose = this.iclose;
            params.id = this.id;
            params.outpatientType = this.outpatientType;
            params.receive = this.receive;
            params.remarks = this.remarks;
            params.term = this.term;
            params.registerTimes = tmpRegistertimes;
            params.icut = this.icut;
            let url = "";
            let msg = "";
            if (this.id) {
                url = api.registerDoctorUpdate;
                msg = "修改";
            } else {
                url = api.registerDoctorInsert;
                msg = "添加";
            }
            if (params.doctorId) {
                if(flag){
                    this.$axios
                        .post(url, params)
                        .then(resp => {
                            if (resp.data.success) {
                                this.$Message.info(msg + "成功");
                                //   公用方法
                                this.functionJS.queryNavgationTo(
                                    this,
                                    "/index/operation/register/list",
                                    {
                                        pageNo: this.lPageNo,
                                        province: this.province,
                                        city: this.city,
                                        area: this.area,
                                        hospital: this.hospital,
                                        isBack: 2,
                                        searchKey: this.searchKey,
                                        deptKey: this.deptKey,
                                        dictType: this.dictType
                                    }
                                );
                            } else {
                                this.$Message.info(msg + "失败，请重试");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            } else {
                this.expertMsgStatus = true;
            }
        },

        checkInput() {
            if (this.term == null) this.termRd = true;
            else this.termRd = false;
            if (this.cost == null) this.costRd = true;
            else this.costRd = false;
            if (!this.address) this.addressFlag = true;
            else this.addressFlag = false;
        },
        reback() {
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/register/list",
                {
                    pageNo: this.lPageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack: 2,
                    searchKey: this.searchKey,
                    deptKey: this.deptKey,
                    dictType: this.dictType
                }
            );
        },
        chooseDoc(
            hospitalName,
            hospitalId,
            dept,
            deptId,
            doctorName,
            doctorId,
            title
        ) {
            this.hospitalName = hospitalName;
            this.hospitalId = hospitalId;
            this.dept = dept;
            this.deptId = deptId;
            this.doctorName = doctorName;
            this.doctorId = doctorId;
            this.title = title;
            this.docListModal = false;
        },
        loadPage(pageNo) {
            this.pageNo = pageNo;
            var params = {};
            params.searchKey = this.doctorKey.trim();
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.registerDoctorList, params)
                .then(resp => {
                    if (resp.data.success) {
                        this.doctorList = resp.data.object.list;
                        this.count = resp.data.object.count;
                        this.pageNo = pageNo;
                        this.docListModal = true;
                    } else {
                        this.$Message.info("查询失败，请重试");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        infoMsg(msg) {
            this.$Message.info({ content: msg, duration: 5 });
        },
        errMsg(msg) {
            this.$Message.error({ content: msg, duration: 5 });
        },
        jump() {
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/register/normaledit",
                {
                    id: this.id,
                    pageNo: this.lPageNo,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    hospital: this.hospital,
                    isBack:2,
                    searchKey: this.searchKey,
                    deptKey: this.deptKey,
                    dictType: this.dictType,
                    hospitalName: this.hospitalName,
                    hospitalId: this.hospitalId,
                    dept: this.dept,
                    deptId: this.deptId,
                    doctorName: this.doctorName,
                    doctorId: this.doctorId,
                    title: this.title,
                    address:this.address,
                    outpatientType:this.outpatientType,
                    cost:this.cost,
                    term:this.term,
                    receive:this.receive,
                    remarks:this.remarks
                }
            );
        }
    }
};
</script>
<style lang="less" scoped>
.registeradd {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .padding-l {
        padding-left: 5px;
    }
    .padding-r {
        padding-right: 5px;
    }
    .padding-t {
        padding-top: 15px;
    }
    .padding-b {
        padding-bottom: 15px;
    }
    .borderRight {
        border-right: 1px solid #e5e5e5;
    }
    .borderLeft {
        border-left: 1px solid #e5e5e5;
    }
    .borderBottom {
        border-bottom: 1px solid #e5e5e5;
    }
    .borderTop {
        border-top: 1px solid #e5e5e5;
    }
    .w-select {
        width: 100px;
    }
    .w-input {
        width: 200px;
    }
    .req-icon {
        font-size: 18px;
        color: red;
        display: inline-block;
        height: 18px;
        width: 18px;
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
    }
    .text-align-c {
        text-align: center;
        line-height: 32px;
    }
    .bordered {
        border: 1px solid #e5e5e5;
    }
    b {
        font-weight: bold;
    }
    .expert-msg {
        color: #f00;
        display: none;
    }
    .show-msg {
        display: inline-block;
    }
    .cus-btn {
        vertical-align: middle;
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: #ffffff;
        font-size: 30px;
        border: 0;
        border-radius: 50%;
        background: #2d8cf0;
        &:focus {
            border: 0;
            outline: none;
        }
    }
    .w-area{
        width:80%;
    }
    .notice {
        display: inline-block;
        margin-left: 15px;
        color: #aaa;
    }
    span.rdColor {
        color: #ff0000;
    }
}
</style>
<style lang="less">
    .ivu-btn-ghost{
        display:none;
    }
</style>