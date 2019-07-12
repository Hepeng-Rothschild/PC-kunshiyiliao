<template>
    <div class = 'review'>
        <!-- 头部数据 -->
        <header>
            <div class = 'headerTitle'>
                <h2>直播数据</h2>
                <span>直播完成回来查看具体数据</span>
            </div>
            <div class = 'liveList'>
                <div class = 'liveTime'>
                    <img src="@/assets/images/time.png" alt="">
                    <div class = 'liveDate'>
                        <span>直播时长</span>
                        <span>{{ liveBroadDate.time }}</span>
                    </div>
                </div>
                <div class = 'liveTime'>
                    <img src="@/assets/images/eye.png" alt="">
                    <div class = 'liveDate'>
                        <span>观看人次</span>
                        <span>{{ liveBroadDate.Visitors }}</span>
                    </div>
                </div>
                <div class = 'liveTime'>
                    <img src="@/assets/images/xin.png" alt="">
                    <div class = 'liveDate'>
                        <span>关注人次</span>
                        <span>{{ liveBroadDate.manTime }}</span>
                    </div>
                </div>
                 <Button type="primary" style='height:40px;' @click='refreshHeadDate'>刷新</Button>
            </div>
        </header>
        <div class="main">
            <h1>直播信息</h1>
            <div class = 'liveStatus'>
                <span>状态：{{ statueName }}</span>
                <div style='float:right'>
                    <!-- <Button type="error" @click='demanStatus' v-if='playStatus == 5 && thisType == 2'>{{ params.iopen == 1 ? '恢复' : '暂停' }}</Button> -->
                    <!-- <Button type="primary" v-if='playStatus == 5 && thisType == 2' @click='enterLive' >进入直播间</Button> -->
                    <Button type="primary" @click='reback(2)' v-if='playStatus==1'>审核通过</Button>
                    <Button @click='reback(3)' v-if='playStatus==1'>审核不通过</Button>
                    <Button type="warning" @click='reback(4)' v-if='playStatus==6'>下架</Button>
                    <Button @click='back'>返回</Button>
                </div>
            </div>
            <!-- 审核人 -->
            <div class = 'columnBox' style='margin-bottom:20px;'>
                <p v-if='playStatus != 1'>审核人：{{ examineName }}</p>
                <!-- 待开播 -->
                <div class = 'uptimer' v-if='playStatus == 2'>
                    <span>倒计时：</span>
                    <p>{{ sdateName }}</p>
                </div>
                <div class = 'uptimer' v-if='playStatus == 2'>
                    <span>预计直播时长：</span>
                    <p>{{ liveStart(date) }}</p>
                </div>
            </div>
            <!-- 基本信息 -->
            <h3>基本信息</h3>
            <div class = 'information'>
                <div class = 'information_item'>
                    <span>直播标题：{{params.title}}</span>
                </div>
                <div class = 'information_item'>
                    <span>直播医生：{{params.doctorName}}</span>
                </div>
                <div class = 'information_item'>
                    <span>直播封面：</span>
                    <!-- <img :src="params.headImg" alt=""> -->
                    <img :src="params.headImg" title="点击查看大图" alt="暂无图片" style='cursor:pointer;' @click='modal2=true' v-if='params.headImg'>
                    <span v-if='!params.headImg'>暂无封面</span>
                </div>
                <div class = 'information_item'>
                    <span>预计直播时间：{{params.aboutStartTime}}</span>
                </div>
                <div class = 'information_item'>
                    <span>预计结束：{{params.aboutEndTime}}</span>
                </div>
                <div class = 'information_item' v-if='playStatus == 4 || playStatus == 5 || playStatus == 6 || playStatus == 8'>
                    <span>直播开始时间：{{params.liveStartTime}}</span>
                </div>
            </div>
            <h3>设置信息</h3>
            <div class = 'information'>
                <div class = 'information_item'>
                    <span>直播形式：{{params.liveForm}}</span>
                </div>
                <div class = 'information_item'>
                    <span>直播类型：{{params.liveType}}</span>
                </div>
                <div class = 'information_item'>
                    <span>课堂类型：{{params.type}}</span>
                </div>
                <div class = 'information_item'>
                    <span>是否收费：{{params.icharge}}</span>
                </div>
                <div class = 'information_item'>
                    <span>原始价格：{{params.originalPrice}}</span>
                </div>
                <div class = 'information_item'>
                    <span>折后价格：{{params.discountPrice}}</span>
                </div>
                <div class = 'information_item'>
                    <span>推广力度：{{params.fictitiousNum ? params.fictitiousNum : '无'}}</span>
                </div>
                <div class = 'information_item'>
                    <span>销售数量：{{ params.stock ? params.stock : '0' }}</span>
                </div>
            </div>
            <h3>课堂介绍</h3>
            <div class='information'>
                <p style="display:block;margin:10px 0;">讲堂介绍：{{ params.introduce ? params.introduce :"无"  }}</p>
            </div>
            <!-- 不通过原因 -->
            <div class='information' v-if='playStatus == 3 || playStatus == 4 || playStatus == 8'>
                <h3 style='color:red;'><span style='color:black'>审核原因：</span>{{ params.reason }}</h3>
            </div>
            
        </div>
        <Modal
            v-model="modal1"
            title="审核提示："
            @on-ok="ok"
            :mask-closable="false"
            @on-cancel="cancel">
            <p style='color:red;margin:4px 0;'  v-if='currentStatus==8'>温馨提示：此课程为收费课程，若提交原因审核通过后，课程费用需要退还给购买课程人员</p>
            <p v-if='currentStatus == 2'>确认审核通过，是否继续？</p>
            <div class='information' v-if='currentStatus!=2'>
                <span>原因：</span>
                    <Input
                        v-model="value8"
                        type="textarea"
                        :placeholder="grayinfor"
                        :rows="4"
                        style='width:90%;'
                        maxlength="200"
                    />
            </div>
        </Modal>
        <Modal v-model="modal2" width="600" footer-hide>
            <img :src="params.headImg" alt="" style='display:block;width:100%;'>
        </Modal>

        <Modal
            v-model="modalStatus"
            title="提示"
            :footer-hide='true'
            :closable = 'false'
            :mask-closable='false'
            >
            <div class='reason'>
                <span>结束原因：</span>
                <Input v-model="reason" type="textarea" placeholder="请输入结束直播及退费申请原因" />
            </div>
            <br />
            <div class = 'closeLive'>
                <Button type='primary' @click='closeLive(0)'>确定</Button>
                <Button @click='cancelModal'>取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data () {
        return {
            modalStatus: false,
            // 结束原因
            reason: "",
            modal2:false,
            grayinfor: "请输入本次审核不通过的原因",
            value8:"",
            modal1: false,
            sdate:"",
            sdateName:"00天00小时00分钟00秒",
            date:"00天00小时00分钟00秒",
            examineName:"",
            params: {
                // 标题
                title:"",
                // 介绍
                introduce:"",
                // 医生姓名 
                doctorName:"",
                // 直播时间
                aboutStartTime:"",
                // 结束时间
                aboutEndTime:"",
                // 图片
                headImg:"",
                // 是否收费
                icharge:"",
                // 直播形式
                liveForm:"",
                // 推广力度
                fictitiousNum:"",
                // 课堂类型
                type:"",
                // 直播类型
                liveType:"",
                // 状态
                playStatus:"",
                // 不通过原因
                reason:"",
                // 原始价格
                originalPrice:"",
                //折后价格
                discountPrice:"",
                id:"",
                // 真实开始时间
                liveStartTime:"",
                //销售数量
                stock:"",
                // 直播状态
                iopen:""

            },
            // 直播类型
            liveTypeList:[
                {
                    id:"0",
                    name:"医师讲堂"
                }
            ],
            // 直播形式
            liveListForm:[
                {
                    id:"0",
                    name:"轻直播"
                },
                {
                    id:"1",
                    name:"语音直播"
                },
                {
                    id:"2",
                    name:"视频直播"
                },
            ],
            // 课堂类型
            columnList:[],
            playStatus:"",
            // 状态列表
            livexsList: [
                {
                    id:"1",
                    name:"待审核"
                },
                {
                    id:"2",
                    name:"审核通过"
                },
                {
                    id:"3",
                    name:"审核未通过"
                },
                {
                    id:"4",
                    name:"下架"
                },
                {
                    id:"5",
                    name:"正在直播"
                },
                {
                    id:"6",
                    name:"已完成"
                },
                {
                    id:"7",
                    name:"已撤回"
                },
                {
                    id:"8",
                    name:"已关闭"
                }
            ],
            statueName: '',
            liveTime: "",
            currentStatus: '',
            liveBroadDate: {
                time: "暂无数据" ,
                Visitors: "暂无数据",
                manTime:"暂无数据"
            }
        }
    },
    created () {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/contentmanagement_home",
                title: "患者端运营"
            },
            {
                path: "/index/operation/physicianAudit/list",
                title: "讲堂审核"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        // 加载课堂 类型
        this.columnDate();
        // 加载直播详情
        this.getLiveData();
    },
    methods:{
        reback(val){
            this.modal1 = true
            this.currentStatus = val;
            if (val == 3) {
                this.grayinfor = '请输入本次审核不通过的原因'
            } else if (val == 8) {
                this.grayinfor = '请输入结束直播及退费申请原因'
            }
        },
        // 进入直播间
        enterLive () {
            if(this.thisType != 2) {
                this.$Message.error("仅有视频直播可进入直播间")
                return ''
            }
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/liveMant/broadlookLive",
                query
            );
        },
        back () {
            // 返回上一步
            let query = this.$route.query
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/physicianAudit/list",
                query
            );
        },
        ok () {
            let params = {}
            params.id = this.params.id,
            params.playStatus = this.currentStatus
            if(this.currentStatus != 2) {
                params.reason = this.value8
            }
            this.$axios.post(api.livestatus, params).then(res => {
                if(res.data.success) {
                    this.$Message.success("修改成功")
                    this.getLiveData();
                    setTimeout(() => {
                        this.back();
                    }, 800)
                } else {
                    let name = res.data.object.same || res.data.object.file ||　'修改失败';
                    this.$Message.error(name)
                }
            })
            
        },
        // 暂停恢复直播
        demanStatus (status) {
            if(Boolean(this.params.iopen)) {
                this.closeLive(1)
            } else {
                this.modalStatus = true
            }
        },
        // 关闭直播
        closeLive (iopen) {
            let query = this.$route.query;
            let url = api.lecturedemandupdatechannelstatus
            let params = {
                demandId: query.id,
                reason: this.reason,
                iopen: iopen
            }
            console.log(params);
            return ""
            this.$axios.post(url, params).then(res => {
                if(res.data.success) {
                    this.$Message.success("修改成功")
                    this.cancelModal();
                } else {
                    let name = res.data.object.same || res.data.object.file ||　'修改失败';
                    this.$Message.error(name)
                }
            })
            
        },
        // 取消直播
        cancelModal () {
            this.modalStatus = false;
            this.reason = ''

        },
        cancel () {
        },
        // 加载头部直播数据
        refreshHeadDate () {
            let query = this.$route.query;
            let url = api.countlivedata;
            let params = {
                id : query.id
            }
            if(this.playStatus == 2 || this.playStatus == 5 || this.playStatus == 6) {
                // console.log('加载直播数据');
                this.$axios.post(url, params).then(res => {
                    if(res.data.success) {
                        let ret = res.data.object;
                        console.log(ret);
                        this.liveBroadDate.time = this.formatSeconds(ret.liveTime);
                        this.liveBroadDate.Visitors = ret.countWatch;
                        this.liveBroadDate.manTime = ret.countFollow;
                    }
                })
            } else {
                this.$Message.error("请检查直播状态")
            }
            
        },
        // 加载直播详情
        getLiveData(){
            let query = this.$route.query;
            this.$axios.post(api.livebyid,{
                id:query.id
            }).then(resp => {
                if(resp.data.success) {
                    let ret = resp.data.object;
                    this.playStatus = Number(ret.playStatus)
                    // 通过直播状态加载直播数据
                    if(this.playStatus == 2 || this.playStatus == 5 || this.playStatus == 6) {
                        // console.log('加载直播数据');
                        this.refreshHeadDate ()
                    }
                    this.livexsList.forEach(item =>{
                        if(Number(item.id) == Number(ret.playStatus)) {
                            this.statueName = item.name
                        }
                    })
                    console.log(ret);
                    this.sdate = ret.countLiveTime || 0
                    this.date = ret.liveTimeLength || 0
                    this.sdateName = this.liveStart(this.sdate)
                    this.prevDate();
                    // 不通过原因
                    this.params.reason = ret.reason
                    // 标题
                    this.params.title = ret.title
                    // 介绍
                    this.params.introduce = ret.introduce
                    // 医生姓名 
                    this.params.doctorName = ret.doctorName
                    // // 直播时间
                    this.params.aboutStartTime = ret.aboutStartTime
                    // // 结束时间
                    this.params.aboutEndTime = ret.aboutEndTime
                    this.params.liveStartTime = ret.liveStartTime
                    this.params.iopen = ret.iopen
                    // // 图片
                    this.params.headImg = ''
                    if (ret.headImg) {
                        this.params.headImg = this.fileBaseUrl + this.pictureFormat(ret.headImg)
                    }
                    // // 是否收费
                    this.params.icharge = ret.icharge == 0 ? "免费" : "收费"
                    // 原始价格
                    this.params.originalPrice = ret.originalPrice || 0
                    //折后价格
                    this.params.discountPrice = ret.discountPrice || 0
                    // id
                    this.params.id = ret.id;
                    // // 直播形式
                    let liveFrom =''
                    this.liveListForm.forEach(item => {
                        if(Number(item.id) == Number(ret.liveForm)) {
                            liveFrom = item.name
                        }
                    })
                    this.params.liveForm = liveFrom
                    // // 推广力度
                    this.params.fictitiousNum = ret.fictitiousNum
                    // // 直播类型
                    let liveType = ''
                    this.liveTypeList.forEach(item => {
                        if(Number(item.id) == Number(ret.liveType)) {
                            liveType = item.name
                        }
                    })
                    this.params.liveType = liveType
                    let type = ''
                    this.columnList.forEach(item =>{
                        if(Number(item.id) == Number(ret.columnId)) {
                            type = item.name
                        }
                    })
                    this.params.type = type

                    this.examineName = ret.auditorName
                    this.params.stock = ret.stock
                } else {
                    this.$Message.error("加载详情失败");
                }
            })
        },
        // 倒计时未开播时间
        prevDate () {
            let timer = setInterval(() => {
                let currentDate = this.liveStart(this.sdate)
                this.sdateName = currentDate
                if (this.sdate < 1000) {
                    clearInterval(timer);
                }
                this.sdate = this.sdate - 1000;
            }, 1000)
        },
        // 毫秒数转时间
        liveStart(num) {
            let time = parseInt(num)
            let dtime = time / 1000
            // 天数
            let day = parseInt((dtime / 3600) / 24)
            let daytime = parseInt(dtime - ((day * 3600) * 24))
            // console.log("天数",day);
            // 小时
            let hours = parseInt(daytime / 3600)
            let hourstimer = parseInt(daytime - hours * 3600)
            // console.log('小时',hours);
            // 分钟
            let mintimer = parseInt(hourstimer / 60)
            // console.log('余下分钟',mintimer);
            // 秒
            let mins = parseInt(hourstimer - mintimer * 60)
            // console.log("剩下的秒数",mins);
            function addZero (num) {
                if(num < 10) {
                    return '0' + num
                }
                return num
            }
            let timers =  addZero(day) + '天' + addZero(hours) +"小时" + addZero(mintimer) + '分钟' + addZero(mins) + '秒'
            if(time <= 0) {
                timers = '00天00小时00分钟00秒'
            }
            return timers
        },
        // 秒数转时间
        secondsToDate(num) {
            let time = parseInt(num)
            let dtime = time
            // 天数
            let day = parseInt((dtime / 3600) / 24)
            let daytime = parseInt(dtime - ((day * 3600) * 24))
            // console.log("天数",day);
            // 小时
            let hours = parseInt(daytime / 3600)
            let hourstimer = parseInt(daytime - hours * 3600)
            // console.log('小时',hours);
            // 分钟
            let mintimer = parseInt(hourstimer / 60)
            // console.log('余下分钟',mintimer);
            // 秒
            let mins = parseInt(hourstimer - mintimer * 60)
            // console.log("剩下的秒数",mins);
            function addZero (num) {
                if(num < 10) {
                    return '0' + num
                }
                return num
            }
            let timers =  addZero(day) + '天' + addZero(hours) +"小时" + addZero(mintimer) + '分钟' + addZero(mins) + '秒'
            if(time < 0) {
                timers = '00天00小时00分钟00秒'
            }
            return timers
        },
        // 加载课堂类型
        columnDate() {
            this.$axios.post(api.lecturecolumnlist).then(resp => {
                if (resp.data.success) {
                    let ret = resp.data.object;
                    this.columnList = ret;
                } else {
                    this.$Message.error("请求失败,请稍候重试");
                }
            });
        },
        // 转换秒数
        formatSeconds (value) {
            var theTime = Number(value);// 秒  
            var theTime2 = 0;// 小时  
            var oldTheTime2 = theTime - parseInt(theTime / 3600)

            var theTime1 = 0;// 分  
            var oldTheTime1 = parseInt(oldTheTime2 / 60)
            var oldSection = parseInt(oldTheTime1 % 60)
            theTime2 = parseInt(theTime / 3600);
            theTime1 = parseInt(oldTheTime2 / 60);
            let result = theTime2 + '小时' + theTime1 + "分钟" + oldSection +"秒";

            return result;  
        }
    }
}
</script>
<style lang="less" scoped>
.review{
    width: calc(100% - 20px);
    margin: 0 auto;
    font-size: 12px;
    header{
        display:flex;
        flex-direction:column;
        padding: 10px 30px;
        margin:10px 0;
        background: #fff;
        .headerTitle{
            display:flex;
            flex-direction: row;
            align-items:center;
            user-select:none;
            span{
                margin-left:30px;
            }
        }
        .liveList{
            display:flex;
            flex-direction:row;
            .liveTime{
                display:flex;
                max-width:300px;
                flex-direction:row;
                align-items:center;
                padding:10px;
                margin:0 20px;
                img{
                    border-radius:50%;
                    width:75px;
                    height: 75px;
                }
                .liveDate{
                    display:flex;
                    flex-direction: column;
                    margin-left:14px;
                    align-items:center;
                }
            }
        }
    }
    .main{
        width:100%;
        padding: 10px 30px;
        margin:10px 0;
        background: #fff;
        .liveStatus{
            font-weight:bold;
        }
        h1{
            border-bottom:1px solid #f2f2f2;
            margin-bottom:10px;
            font-weight:bold;
        }
        h3{
            font-weight:bold;
        }
        .information{
            display:flex;
            flex-direction:row;
            flex-wrap: wrap;
            width:100%;
            margin:10px 0;
            margin-left:20px;
            .information_item{
                width:33%;
                height:auto;
                margin:10px 0;
                img{
                    width:100px;
                    height:60px;
                }
            }
        }
        .columnBox{
            display:flex;
            flex-direction:column;
            margin-left:20px;
            .uptimer{
                display:flex;
                flex-direction:row;
                align-items:center;
                font-size:14px;
                
            }
        }


    }
    
}
</style>
