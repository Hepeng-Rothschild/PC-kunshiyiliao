<template>
    <div class = 'lookLive'>
        <!-- 医生信息 -->
        <div class ='doctorInfo'>
            <img :src="params.doctorIcon" alt="">
            <span>{{ params.doctorName }}</span>
            <h2>{{ params.doctorTitle }}</h2>
            <div class = 'buttonGroup'>
                <!-- <Button type='warning' @click='modalStatus=true'>关闭直播</Button> -->
                <Button @click='backLive'>返回讲堂</Button>
            </div>
        </div>
        <Modal
            v-model="modalStatus"
            title="确定结束直播?"
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
                <Button type='primary' @click='closeLive'>确定</Button>
                <Button @click='cancelModal'>取消</Button>
            </div>
        </Modal>
        
        <div class="lookVideo">
            <!-- 观看信息 -->
            <div class ='video'>
                <p>&nbsp;&nbsp;<span style='margin-left:20px;'>观看人次：{{ countWatch }}人观看</span></p>

                <video-player
                    class="video-player vjs-custom-skin video-viewport"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    v-if='src'
                ></video-player>

            </div>
            <!-- 互动直播 -->
            <div class ='chat' style='display:none;'>
                <p class = 'chatTitle'>互动聊天></p>
                <!-- 聊天内容 -->
                <div class="wrapper">
                    <div class ='searchChat'>
                        <!-- 刷新提示信息 -->
                        <div class="top-tip">
                            <span class="refresh-hook">{{ pulldownMsg }}</span>
                        </div>
                        <!-- 其他人发的消息 -->
                        <div class="chatLeft">
                        <img src="/static/img/doctor.jpg" alt="">
                        <div class='chatContent'>
                            <span class="title">享康健康</span>
                            <p class="content">0:文字,1:图片,2:语音,3:视频,4:名片,5:直播介绍,6:系统医生名片,7:单独禁言,8:解除单独禁言,9:全员禁言,10:解除全员禁言,11:直播正常关闭,12:直播超时关闭,13:直播系统人员异常关闭,100:开始直播</p>
                        </div>
                        </div>
                        <!-- 我发的消息 -->
                        <div class="chatRight">
                            <div class='chatContent'>
                                <p class="title">享康健康</p>
                                <p class="content">0:文字,1:图片,2:语音,3:视频,4:名片,5:直播介绍,6:系统医生名片,7:单独禁言,8:解除单独禁言,9:全员禁言,10:解除全员禁言,11:直播正常关闭,12:直播超时关闭,13:直播系统人员异常关闭,100:开始直播</p>
                            </div>
                            <img src="/static/img/doctor.jpg" alt="">
                        </div>
                        <div class="chatRight">
                            <div class='chatContent'>
                                <p class="title">享康健康</p>
                                <p class="content">0:文字,1:图片,2:语音,3:视频,4:名片,5:直播介绍,6:系统医生名片,7:单独禁言,8:解除单独禁言,9:全员禁言,10:解除全员禁言,11:直播正常关闭,12:直播超时关闭,13:直播系统人员异常关闭,100:开始直播</p>
                            </div>
                            <img src="/static/img/doctor.jpg" alt="">
                        </div>
                        <div class="chatRight">
                            <div class='chatContent'>
                                <p class="title">享康健康</p>
                                <p class="content">0:文字,1:图片,2:语音,3:视频,4:名片,5:直播介绍,6:系统医生名片,7:单独禁言,8:解除单独禁言,9:全员禁言,10:解除全员禁言,11:直播正常关闭,12:直播超时关闭,13:直播系统人员异常关闭,100:开始直播</p>
                            </div>
                            <img src="/static/img/doctor.jpg" alt="">
                        </div>

                        <!-- 底部提示信息 -->
                        <div class="bottom-tip">
                            <span class="loading-hook">{{ pullupMsg }}</span>
                        </div>
                    </div>
                </div>
                <!-- 发送框 -->
                <div class='inputContent'>
                    <Input v-model="value5" type="textarea" placeholder="请输入发送的内容" style="width: 100%" />
                    <Button type='primary'>发送</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import BScroll from 'better-scroll'
import flash from 'videojs-flash'
export default {
    data () {
        return {
            // 滚动对象
            scroll: null,
            // 分页数据
            pageNo: 1,
            pageSize: 10,
            // 数据所在
            data: [],
            // 提示信息
            pulldownMsg: '下拉刷新',
            pullupMsg: '加载更多',
            id: "",
            modalStatus: false,
            // 结束原因
            reason: "",
            // 观看人数
            countWatch: 0,
            params: {
                videoUrl:"",
                doctorIcon:"/static/img/doctor.jpg",
                doctorName:"的直播间",
                doctorTitle:"浅谈如何防护病毒性感冒--学术交流"
            },
            playerOptions: {
                playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0, 6.0, 12.0], //播放速度
                autoplay: true, //如果true,浏览器准备好时开始回放。
                controls:true,
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: "video/x-flv",
                        src: "" //你的视频地址（必填）
                    }
                ],
                techOrder: ['flash'],
                poster: "", //你的封面地址
                width: document.documentElement.clientWidth,
                height: '700',
                notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                }
            },
            src: '',
            poster: '',
            videoStyle: ''
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
                path: "/index/operation/liveMant/broadlookLive",
                title: "进入直播间"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted () {
        this.id = this.$route.query.id;
        // 划动数据
        this.getData()
        // 加载直播人次数据
        this.loadingliveData();
        this.playerOptions.poster = this.poster;
        this.$Notice.info({
            title: "温馨提示",
            desc: "如视频无法播放请检查网站flash是否开启或医生直播状态"
        });
    },
    methods: {
        getData () {
            const that = this;
            this.$nextTick(() => {
                let wrapper = document.querySelector('.wrapper')
                this.scroll = new BScroll(wrapper, {       //初始化better-scroll
                    probeType : 1,   //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                    click: true   //是否派发click事件
                })
                // 滑动过程中事件
                this.scroll.on('scroll', (pos) => {
                    if(pos.y > 30){
                        this.pulldownMsg = '释放立即刷新'
                    }
                });
                //滑动结束松开事件
                this.scroll.on('touchEnd', (pos) => {  //上拉刷新
                    if(pos.y > 30){
                        console.log('下拉刷新');
                        setTimeout(() => {
                            // that.getData().then((res)=>{
                                //刷新数据
                                // that.data = res;
                                //恢复刷新提示文本值
                                that.pulldownMsg = '下拉刷新'
                                //刷新成功后提示
                                // that.refreshalert();
                                //刷新列表后，重新计算滚动区域高度
                                that.scroll.refresh();
                                this.$Message.success("加载成功")
                            // })
                        },2000)
                    } else if(pos.y < (this.scroll.maxScrollY - 30)){   //下拉加载
                        this.pullupMsg = '加载中。。。';
                        console.log('加载更多');
                        setTimeout(() => {
                            
                            // that.getData().then((res)=>{
                                //恢复文本值
                                that.pullupMsg = '加载更多';
                                // that.data = this.data.concat(res);
                                that.scroll.refresh();
                                this.$Message.success("加载成功")
                            // })
                        }, 2000)
                        
                    }
                })      
            })
        },
        //转换秒数
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
        },
        // 关闭直播
        closeLive () {
            let url = api.lecturedemandupdatechannelstatus
            let params = {
                demandId6: this.id,
                reason: this.reason,
                playStatus: 8
            }
            console.log(params);
            return ""
            this.$axios.post(api.livestatus, params).then(res => {
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
        // 返回讲堂
        backLive () {
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/physicianAudit/list",
                query
            );
        },
        // 直播数据
        loadingliveData () {
            let query = this.$route.query;
            let url = api.countlivedata;
            let params = {
                id : query.id
            }
            // 直播人次
            this.$axios.post(url, params).then(res => {
                if(res.data.success) {
                    let ret = res.data.object;
                    console.log(ret);
                    this.countWatch = ret.countFollow;
                } else {
                    this.$Message.error("加载直播数据失败!")
                }
            })
            this.$axios.post(api.lecturedemandintolive, {
                demandId: query.id
            }).then(res => {
                console.log(res);
                if(res.data.success) {
                    let ret = res.data.object;
                    this.params.videoUrl = ret.httpPullUrl;
                    this.params.doctorName = ret.doctorName + this.params.doctorName
                    this.params.doctorTitle = ret.title;
                    this.src = ret.httpPullUrl;
                    // 直播链接
                    this.playerOptions.sources[0].src = ret.httpPullUrl
                    // 直播封面
                    // this.playerOptions.poster = this.poster;
                } else {
                    this.$Message.error('进入直播间失败,请重试!')
                }
            })
        },
        onPlayerPlay(player) {
            console.log(player);
            console.log("触发播放");
        },
        onPlayerPause(player) {
            console.log("触发暂停");
        }
    },
    computed: {
        player() {//暂时没用到
            return this.$refs.videoPlayer.player;
        }
    },
}
</script>
<style lang="less" scoped>
.vjs_video_3-dimensions{
    padding:50% !important;
}
.reason {
    display:flex;
    flex-direction:row;
    align-items:center;
    span{
        min-width:80px;
    }
}
.closeLive{
    width:200px;
    margin:0 auto;
    text-align:center;
}
.lookLive {
  width: 98%;
  padding: 10px;
  margin: 0 auto;
  background: #fff;
  .doctorInfo {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
    position:relative;
    .buttonGroup{
        position:absolute;
        right:0;
        top:0;
    }
    h2{
        text-align:center;
        padding-bottom:5px;
        position:absolute;
        left:50%;
        transform: translateX(-50%);
    }
    img {
        display:inline-block;
        width:60px;
        height:60px;
        border-radius:50%;
    }
    span {
        margin-left:20px;
        font-size:20px;
        font-weight:bold;
    }
  }
  .lookVideo {
    width:100%;
    height:490px;
    display:flex;
    flex-direction:row;
    .video {
        width:70%;
        margin: 0 auto;
        display:flex;
        flex-direction: column;
        .vjs-custom-skin {
            height:360px !important;
        }
        p {
            width:100%;
        }
    }
    .chat {
        flex:1;
        height:100%;
        flex-direction:column;
        position:relative;
        border:1px solid #f2f2f2;
        .chatTitle {
            text-align:center;
            font-size:16px;
        }
        .wrapper{
            width:100%;
            height:calc(100% - 130px);
            overflow:hidden;
        }
        .searchChat {
            width:100%;
            height:auto;
            background:#fff;
            position:relative;
            .top-tip {
                position: absolute;  
                top: -40px;  
                left: 0;
                z-index: 1;  
                width: 100%;  
                height:40px;  
                line-height:40px;  
                text-align:center;
                color: #555;
            } 
            .bottom-tip {
                width: 100%;
                height: 35px;
                line-height: 35px;
                text-align: center;
                color: #777;
                background: #f2f2f2;
                position: absolute;
                bottom: -35px;
                left: 0;
            }
            .chatLeft {
                padding:10px;
                width:100%;
                display:flex;
                flex-direction:row;
                img {
                    display:inline-block;
                    width:40px;
                    height:40px;
                    border-radius:50%;
                }
                .chatContent {
                    margin-left:10px;
                    .content {
                        color:#fff;
                        padding:10px;
                        border-radius:10px;
                        background:skyblue;
                    }
                }
            }
            .chatRight {
                padding:10px;
                width:100%;
                display:flex;
                flex-direction:row;
                img {
                    display:inline-block;
                    width:40px;
                    height:40px;
                    border-radius:50%;
                }
                .chatContent {
                    margin-right:10px;
                    .title {
                        text-align:right;
                    }
                    .content {
                        color:#fff;
                        padding:10px;
                        border-radius:10px;
                        background:skyblue;
                    }
                }
                
            }

        }
        .inputContent{
            width:100%;
            height:auto;
            padding:10px;
            position:absolute;
            bottom:0;
        }
    }
  }
}
</style>
