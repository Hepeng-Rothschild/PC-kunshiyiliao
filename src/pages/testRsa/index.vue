<template>
    <div>
        <!-- <video-play :src="src" :poster="poster" :videoStyle="videoStyle"></video-play> -->
        <!-- <button @click="upload">上传</button> -->
        <globalUploader :src="fileBaseUrl+src" @getUploadUrl="getUploadUrl"></globalUploader>
    </div>
</template>
<script>
import videoPlay from "@/components/videoPlayer";
import globalUploader from '@/components/globalUploader'
// import Bus from "@/plugins/bus.js";
export default {
    data() {
        return {
            src:
                "https://ydjk-dev.oss-cn-beijing.aliyuncs.com/coninq/video/01_%E5%B0%9A%E5%AD%A6%E5%A0%82_%E8%82%96%E6%96%8C_hadoop_hdfs1%E5%88%86%E5%B8%83%E5%BC%8F%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F01.mp4",
            poster: "",
            videoStyle: { width: "400px", height: "300px" }
        };
    },
    created() {},
    components: {
        videoPlay,
        globalUploader
    },
    methods: {
        //获取上传的url
        getUploadUrl(url){
            console.log("传递过来的url",url);
            this.src = url;
        }
    }
};
</script>
<style lang="less">
</style>