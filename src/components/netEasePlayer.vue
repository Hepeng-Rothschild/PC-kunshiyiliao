<template>
    <div class="container">
        <video id="my-video" class="video-js" x-webkit-airplay="allow" webkit-playsinline controls poster="poster.png" preload="auto" width="640" height="360" data-setup="{}">
            <source :src="mp4Src" type="video/mp4">
            <source :src="flvSrc" type="video/x-flv">
            <source :src="mpegSrc" type="application/x-mpegURL">
        </video>
    </div>
</template>
<script>
import '@/assets/neteasesdk/neplayer.min.css';
import '@/assets/neteasesdk/neplayer.min.js';
import cookie from "./../utils/cookie.js";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            mp4Src:'https://live.bilibili.com/9e3e2bf5-2288-4468-b555-e247bb689617',
            flvSrc:'',
            mpegSrc:''
        };
    },
    props: {
        
    },
    methods: {
        
    },
    computed: {
        
    },
    created(){
        neplayer.setSWF('./../assets/neteasesdk/video-js.swf');
    },
    mounted() {
        
    }
};
</script>
<style lang="less" scoped>
.container {
    display:inline-block;
    
}
</style>