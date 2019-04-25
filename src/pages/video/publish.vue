<template>
    <div class="video-page">
        <Row>
            <Col :xs="24">
                <div class="video" :id="viewId"></div>
                <video
                    :id="videoId"
                    ref="videoplay"
                    poster="./../../assets/images/doctor.jpg"
                    x-webkit-airplay="allow"
                    webkit-playsinline
                    preload="auto"
                    width="640"
                    height="480"
                    autoplay
                ></video>
            </Col>
            <Col :xs="24">
                <Button type="primary" v-if="!publishStatus" @click="startPubsish">开始直播</Button>
                <Button type="primary" v-if="publishStatus" @click="stopPublish">结束直播</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getStyle } from "./../../commons/function";
export default {
    data() {
        return {
            publishStatus: false,
            url:
                "",
            viewId: "my-publisher",
            viewObj: null,
            myPublisher: null, //publisher对象
            viewWidth: 640,
            viewHeight: 480,
            viewOptions: {
                videoWidth: 640, // Number 可选 推流分辨率 宽度 default 640
                videoHeight: 480, // Number 可选 推流分辨率 高度 default 480
                fps: 18, // Number 可选 推流帧率 default 15
                bitrate: 800, // Number 可选 推流码率 default 600
                video: true, // Boolean 可选 是否推流视频 default true
                audio: true // Boolean 可选 是否推流音频 default true
            },
            flashOptions: {
                previewWindowWidth: 640, // Number 可选 预览窗口宽度 default 862
                previewWindowHeight: 480, // Number 可选 预览窗口高度 default 446

                /* String 可选 flash显示模式 default transparent
                'window' 窗口模式，flash影片是存在于Windows中的一个显示实例，独立于浏览器的HTML渲染层，总是会遮住位置与他重合的所有HTML层
                'opaque' 无窗口模式，flash影片是浏览器HTML渲染层中的一个元素，可以通过z-index来控制是否遮盖其他HTML元素
                'transparent' 透明模式，flash影片的背景色alpha值将为0，并且只会绘制stage上真实可见的对象，也可以通过z-index来控制是否遮盖其他HTML元素
                */
                wmode: "transparent",

                /* String 可选 flash质量 default high
                'low'    低
                'medium' 中
                'high'   高（推荐）
                'best'   极高
                */
                quality: "best",

                /* String 可选 flash执行脚本许可 default always
                'always' 总是允许flash执行js脚本
                'never' 总是禁止flash执行js脚本
                'samedomain' 只用当flash和js脚本来自同域时才允许flash执行js脚本
                */
                allowScriptAccess: "always"
            },
            cameraList: [], //摄像头列表
            microPhoneList: [], //麦克风列表
            sdkVersion: 0,

            //video
            videoId: "my-video",
            videoObj: null,
            streamer: null,

            //navigator
            getUserMediaFunc: null
        };
    },
    created(){
        if(!this.$route.params.url){
            this.error({content:"直播间初始化失败，请重新进入直播间",duration:5});
            return ;
        }
        this.url = this.$route.params.url;
    },
    mounted() {
        //初始化直播SDK
        this.init();
        console.log(this.myPublisher);
        this.cameraList = this.myPublisher.getCameraList();
        this.microPhoneList = this.myPublisher.getMicroPhoneList();
        if(this.cameraList.length <=0 || this.microPhoneList.length<=0){
            this.error({content:"请将浏览器的摄像头、麦克风和flash权限打开",duration:5});
            return ;
        }
    },
    methods: {
        init() {
            console.log('开始初始化');
            this.myPublisher = new nePublisher(
                this.viewId,
                this.viewOptions,
                this.flashOptions,
                this.onSuccess,
                this.onError
            );
            this.videoObj = this.$refs.videoplay;
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia; //获取媒体对象（这里指摄像头）
        },
        onSuccess() {
            /*
            function 可选 初始化成功的回调函数
            可在该回调中调用getCameraList和getMicroPhoneList方法获取 摄像头和麦克风列表
            cameraList = this.getCameraList();
            microPhoneList = this.getMicroPhoneList();
            */
            console.log("初始化成功");
            this.cameraList = this.myPublisher.getCameraList();
            console.log("cameraList",this.cameraList);
            this.microPhoneList = this.myPublisher.getMicroPhoneList();
            console.log("microPhoneList",this.microPhoneList);
            this.viewObj = document.getElementById("my-publisher");
            this.viewObj.style.position = "fixed";
            this.viewObj.style.zIndex = "-999";
            this.viewObj.style.visibility = "hidden";
            // setTimeout(()=>{
                this.videoStart();
            // },100);
        },
        onError(code, desc) {
            /*
            function 可选 初始化失败后的回调函数
            @param code 错误代码
            @param desc 错误信息
            判断是否有错误代码传入检查初始化时是否发生错误
            若有错误可进行相应的错误提示
            */
            console.log("初始化失败");
            console.log(code, desc);
            this.error({content:"直播网络错误，请重新进入直播间",duration:5});
        },
        startPubsish() {
            this.myPublisher.setCamera(0);
            this.myPublisher.setMicroPhone(0);
            this.myPublisher.startPublish(
                this.url,
                this.viewOptions,
                this.startPublishError
            );
            this.publishStatus = true;
            
        },
        startPublishError(code,desc){
            console.log(code,desc);
            // this.error({content:"采集摄像头失败，请提供摄像头、麦克风、flash获取权限",duration:5})
        },
        stopPublish() {
            this.myPublisher.stopPublish();
            this.releaseResource();
            this.videoStop();
            this.publishStatus = false;
            this.$router.push({name:'neVideo'});
        },
        releaseResource() {
            this.myPublisher.release();
        },
        videoStart(){
            navigator.getUserMedia(
                { video: true, audio: true },
                this.videoSuccess,
                this.videoError
            );
        },
        videoStop(){ 
            this.streamer.stop();
            this.streamer = null;
            this.videoObj.pause();
            this.videoObj = null;
        },
        videoSuccess(stream) {
            this.streamer = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
            try {
                this.videoObj.src = window.URL.createObjectURL(stream);
            } catch (err) {
                this.videoObj.srcObject = stream;
            }
        },
        videoError(error) {
            this.error({content:"播放器初始化失败，请重新进入直播间",duration:5});
            console.log("播放出了问题", error);
        },
        error(msg){
            if(this.publishStatus){
                this.myPublisher.stopPublish();
                this.releaseResource();
                this.videoStop();
            }
            this.$Message.error(msg);
            this.$router.push({name:"neVideo"});
        }
    },
    beforeRouteLeave (to, from, next) {
        if(this.publishStatus){
            this.myPublisher.stopPublish();
            this.releaseResource();
            this.videoStop();
        }
        next();
    }
};
</script>

<style lang="less" scoped>
.video-page {
    .poster {
        width: 640px;
        height: 480px;
        background-color: #f2f2f2;
        color: #666666;
        line-height: 480px;
        text-align: center;
        position: absolute;
    }
    .ctrls {
        position: static;
        width: 100%;
        background-image: linear-gradient(to right, red, green 50%, blue 100%);
        bottom: 15px;
        left: 0px;
        z-index: 1000;
        text-align: center;
        .screen {
            border: 0;
            border-radius: 5px;
            outline: none;
            background-image: radial-gradient(
                farthest-corner at 0px 0px,
                #f35 0%,
                #43e 100%
            );
            padding: 10px 15px;
            margin: 10px 15px;
        }
    }
}
</style>