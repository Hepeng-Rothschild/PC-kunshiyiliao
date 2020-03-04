<template>
    <div class="doctorreviewreview">
        <template>
            <Row>
                <!--左侧信息-->
                <i-col span="9">
                    <!--订单信息：-->
                    <i-col>
                        <i class="lit-icon"></i>
                        <b>订单信息：</b>
                        <div class="lista">
                            <p>订单编号&nbsp;:&nbsp;{{info.orderNumber || '暂无'}}</p>
                            <p>创建时间&nbsp;:&nbsp;{{info.createTime || '暂无'}}</p>
                            <p>订单类型&nbsp;:&nbsp;{{info.inqConType || '暂无'}}</p>
                            <p>问诊类型&nbsp;:&nbsp;{{info.inquiryType || '暂无'}}</p>
                            <p>接诊时间&nbsp;:&nbsp;{{info.jzTime || '暂无'}}</p>
                            <p>结诊时间&nbsp;:&nbsp;{{info.completeDate || '暂无'}}</p>  
                            <p>问诊时长&nbsp;:&nbsp;{{timelang || '暂无'}}</p>
                            <div class="starall">患者评价&nbsp;:&nbsp;
                                <span v-if="info.starLevel == null || info.starLevel == ''">暂无评价</span>
                                <img src="../../../../assets/images/star_1.png" alt="" v-if="info.starLevel == 1">
                                <img src="../../../../assets/images/star_2.png" alt="" v-if="info.starLevel == 2">
                                <img src="../../../../assets/images/star_3.png" alt="" v-if="info.starLevel == 3">
                                <img src="../../../../assets/images/star_4.png" alt="" v-if="info.starLevel == 4">
                                <img src="../../../../assets/images/star_5.png" alt="" v-if="info.starLevel == 5">
                                <p>{{info.lableTitle}}</p>
                                <p>{{info.evaluate || '暂无'}}</p>
                            </div>
                        </div>
                    </i-col>
                    <br>
                    <!--患者信息：-->
                    <i-col>
                        <i class="lit-icon"></i>
                        <b>患者信息：</b>
                        <div class="lista">
                            <p>姓名&nbsp;:&nbsp;{{info.memberName || '暂无'}}&nbsp;&nbsp;性别&nbsp;:&nbsp;{{info.gender || '暂无'}}</p>
                            <p>出生日期&nbsp;:&nbsp;{{info.birth || '暂无'}}</p>
                            <p>民族&nbsp;:&nbsp;{{info.ethnictype || '暂无'}}&nbsp;&nbsp;籍贯&nbsp;:&nbsp;{{info.hometown || '暂无'}}</p>
                            <p>联系电话&nbsp;:&nbsp;{{info.phonenumber || '暂无'}}</p>
                            <!-- <p>证件类型&nbsp;:&nbsp;</p> -->
                            <p>身份证号&nbsp;:&nbsp;{{info.idcard || '暂无'}}</p>
                            <p>户籍地址&nbsp;:&nbsp;{{info.hometown || '暂无'}}</p>
                            <p>微信昵称&nbsp;:&nbsp;{{info.nickname || '暂无'}}</p>
                            <p>来源渠道&nbsp;:&nbsp;{{info.wxappSource || '暂无'}}</p>
                        </div>
                    </i-col>
                    <br>
                    <!--医生信息：-->
                    <i-col>
                        <i class="lit-icon"></i>
                        <b>医生信息：</b>
                        <div class="lista">
                            <p>接诊医生&nbsp;:&nbsp;{{info.doctorName || '暂无'}}&nbsp;&nbsp;&nbsp;{{info.doctorTitle || '暂无'}}</p>
                            <p>接诊科室&nbsp;:&nbsp;{{info.deptTypeName || '暂无'}}</p>
                            <p>接诊机构&nbsp;:&nbsp;{{info.hospitalname || '暂无'}}</p>
                            <p>医生擅长&nbsp;:&nbsp;{{info.doctorGood || '暂无'}}</p> 
                        </div>
                    </i-col>
                </i-col>
                <!--右侧信息-->
                <i-col span="14" offset="1">
                    <Row>
                        <i-col span="24">
                            <div class="tit">
                                订单当前状态&nbsp;:&nbsp;{{info.complete || '暂无'}}
                            </div>
                            <div class="bor">
                                <scroller class="main-scroller" :on-refresh="refresh" refreshText="下拉加载" ref="my_scroller" style="z-index:1;">
                                    <div class="main-content" :style="{paddingBottom:pddBtm+'px'}" ref="main-content">
                                        <wx-chat-list
                                            type="session"
                                            :historyMsgList="historyMsgList"
                                            @showOpinionEvent="showOpinnion"
                                        ></wx-chat-list>
                                    </div>
                                </scroller>
                            </div>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
            <Row>
                <i-col class="padding-t padding-b text-r" :xs="24">
                    <Button type="primary" @click="reback">关闭</Button>
                </i-col>
            </Row>
        </template>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import wxChatList from "../../../../components/wxChatList";
export default {
    components: {
        wxChatList
    },
    data() {
        return {
            id: null,
            info: {
            },
            timelang:'',
            histNo:0,
            pageNo: 0,
            pageSize: 10,
            casePic: [{ fileName: require("@/assets/images/weixiaobao.jpg") }],
            showViewModal: false,
            modalSrc: "",

            searchKey: "",
            startDate: "",
            endDate: "",
            status: null,

            province: null,
            city: null,
            area: null,
            hospital: null,
            isBack: 2,
            historyMsgList: [],
        };
    },
    created() {
        this.id = parseInt(this.$route.query.serviceId);
        this.pageNo = this.$route.query.pageNo
            ? parseInt(this.$route.query.pageNo)
            : 1;
        this.searchKey = this.$route.query.searchKey
            ? this.$route.query.searchKey
            : "";
        this.startDate = this.$route.query.startDate
            ? this.$route.query.startDate
            : "";
        this.endDate = this.$route.query.endDate
            ? this.$route.query.endDate
            : "";
        this.status =
            this.$route.query.status == null
                ? null
                : parseInt(this.$route.query.status);
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
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/ordersmanagement/index",
                title: "订单管理"
            },
             {
                path: "/index/operation/orders/consultingorder/list",
                title: "咨询问诊订单"
            }
        ];
        this.$emit("changeBreadList", breadList);
        this.$axios.post(api.operateinqfindDetailIngByid, {serviceId: this.id}).then(resp => {
                this.info = resp.data.object;
                console.log('咨询详情',this.info)
                //性别
                if(this.info.gender == 1){
                    this.info.gender = '男'
                }else{
                    this.info.gender = '女'
                }
                if(this.info.complete == 1){
                    this.info.complete = '已完成'
                }else{
                    this.info.complete = '未完成'
                    this.info.completeDate = '暂无'
                    this.timelang = '暂无'
                }
                //问诊类型
                if(this.info.inquiryType == 0){ 
                    this.info.inquiryType = '图文'
                }else if(this.info.inquiryType == 1){
                    this.info.inquiryType = '语音'
                }else if(this.info.inquiryType == 2){
                    this.info.inquiryType = '视频'
                }
                //订单类型
                if(this.info.inqConType == 0){
                    this.info.inqConType = '咨询'
                }else if(this.info.inqConType == 1){
                    this.info.inqConType = '问诊'
                }else if(this.info.inqConType == 2){
                    this.info.inqConType = '复诊'
                }else if(this.info.inqConType == 3){
                    this.info.inqConType = '续方'
                }else if(this.info.inqConType == 4){
                    this.info.inqConType = '药品咨询'
                }
                //民族
                if(this.info.ethnictype == '01'){
                    this.info.ethnictype = '汉族'
                }
                this.SecondToDate(this.info.jzOften)
            }).catch(err => {
                // this.$Message.info("服务器超时，请重新访问")
        });
        this.gethistydata()
    },
    methods: {
        handleView(src) {
            this.modalSrc = src;
            this.showViewModal = true;
        },
        reback(){
            //   公用方法
            this.functionJS.queryNavgationTo(
                this,"/index/operation/orders/consultingorder/list",
                {
                    pageNo: this.pageNo,
                    searchKey: this.searchKey,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    // status: this.status,
                    // province: this.province,
                    // city: this.city,
                    // area: this.area,
                    hospital: this.hospital,
                    // isBack: 2
                }
            );
        },
        //下拉加载
        refresh() {
            this.getWxChatPage();
        },
        gethistydata() {
            let data = {
                histNo: this.histNo + 1,
                pageSize: this.pageSize,
                serviceId: this.id,
                chatId: this.chatId
            };
             console.log('记录入参',data)
            this.$axios.post(api.operateinqfindWxChatPage, data).then(res => {
                let resObj = res.data.object;
                if(resObj.list.length>0){
                    resObj.list.forEach(item => {
                        this.historyMsgList.unshift(item);
                    });
                    this.histNo = resObj.pageNo;
                    this.pageSize = resObj.pageSize;
                    this.chatId = resObj.list[resObj.list.length - 1]["id"];
                }
                this.ishistory = true;
                console.log('聊天记录',resObj)
            })
            .catch(err => {
                console.log(err);
            });
        },
        getWxChatPage(){
            let data = {
                serviceId: this.id,
                histNo: 1,
                pageSize :this.pageSize,
                chatId: this.chatId
            }
            console.log('下拉入参',data)
            this.$axios.post(api.operateinqfindWxChatPage,data).then(resp => {
                let resObj = resp.data.object
                if(resObj.list.length>0){
                    resObj.list.forEach(item => {
                        this.historyMsgList.unshift(item);
                    });
                this.histNo = resObj.pageNo;
                this.pageSize = resObj.pageSize;
                this.chatId = resObj.list[resObj.list.length - 1]["id"];
                this.$refs.my_scroller.finishPullToRefresh();
                }else{
                    this.$refs.my_scroller.finishPullToRefresh(true);
                }
                this.ishistory = true;
                console.log('聊天记录',resp)
                this.$Message.success('聊天记录加载成功');
            }).catch(err => {
                this.$refs.my_scroller.finishPullToRefresh();
                this.$Message.success('聊天记录加载失败');
                console.log(err);
            });  
        },
        //滚动到底部
        scrollToBtm() {
            setTimeout(() => {
                let height = window.document.getElementsByClassName("main-content")[0].offsetHeight;
                if (this.$refs.my_scroller) {
                this.$refs.my_scroller.scrollTo(0, height, true);
                }
            }, 0);
        },
        //时间转换
        SecondToDate(jzOften){
            var time = jzOften
            if (null != time && "" != time) {
            if (time > 60 && time < 60 * 60) {
                time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
                parseInt(time / 60.0)) * 60) + "秒";
            }else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + "分钟" +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
            }else if (time >= 60 * 60 * 24) {
                time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
                parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + "分钟" +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
            }else{
                time = parseInt(time) + "秒";
            }
        }
            this.timelang = time
        }
    }
};
</script>
<style lang="less" scoped>
.doctorreviewreview {
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
    i{
        margin-top: -7px;
    }
    b {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .text-r {
        text-align: right;
    }
    .text-c {
        text-align: center;
    }
    .text-l {
        text-align: left;
    }
    .tt-box {
        position: relative;
        b {
            line-height: 30px;
        }
        .order-status {
            position: absolute;
            right: 30px;
            border: 1px solid #2d8cf0;
            padding: 5px 15px 5px 15px;
        }
    }
    .lit-icon {
        display: inline-block;
        background-color: #2d8cf0;
        width: 5px;
        height: 16px;
        vertical-align: middle;
    }
    .img-box {
        display: inline-block;
        min-width: 320px;
        min-height: 160px;
        margin: 10px 10px;
        img {
            max-width: 320px !important;
            max-height: 160px !important;
        }
    }
    .lista{
        line-height: 25px;
        font-size: 14px;
        padding-left: 18px;
        .starall{
            img{
                width: 134px;
                height: 22px;
            }
        }
    }
    .tit{
        width: 100%;
        height: 40px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        background: #2d8cf0;
        z-index: 999;
        position:absolute;
    }
    .bor{
        width: 100%;
        height: 700px;
        background: #fdfdfd;
        overflow-y: hidden;
        padding-top: 20px;
        border:1.5px solid #f5f5f5;
    }
    .main-content {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 50px 0 5px 0;
        z-index: 1;
        cursor: pointer;
        background: #fdfdfd;
    }
}
</style>