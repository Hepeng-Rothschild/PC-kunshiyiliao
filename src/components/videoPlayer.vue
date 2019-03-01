<template>
    <div class="container">
        <div class="video-box" :style="videoStyle">
            <video-player
                class="video-player vjs-custom-skin video-viewport"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
            ></video-player>
        </div>
    </div>
</template>
<script>
import cookie from "./../utils/cookie.js";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            playerOptions: {
                playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0, 6.0, 12.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: "video/mp4",
                        src: "" //你的视频地址（必填）
                    }
                ],
                poster: "", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                }
            }
        };
    },
    props: {
        src: {
            type:String,
            default: ""
        },
        poster: {
            type:String,
            default: "./static/img/heicon.jpg"
        },
        videoStyle:{
            type:Object,
            default:()=>{
                return { width: "400px", height: "300px" };
            }
        }
    },
    methods: {
        onPlayerPlay(player) {
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
    mounted() {
        this.playerOptions.sources[0].src = this.src;
        this.playerOptions.poster = this.poster;
    }
};
</script>
<style lang="less" scoped>
.container {
    display:inline-block;
    .video-box {
        .video-viewport {
            width: 100%;
            height: 100%;
        }
    }
}
</style>