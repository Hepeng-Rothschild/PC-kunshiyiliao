<template>
    <div>
        <!-- <video-play :src="src" :poster="poster" :videoStyle="videoStyle"></video-play> -->
        <!-- <button @click="upload">上传</button> -->
        <!-- <globalUploader :src="fileBaseUrl+src" @getUploadUrl="getUploadUrl"></globalUploader>
        <br> -->
        <bigUploadFile :src="fileBaseUrl+src" @getUrl="getUploadUrl"></bigUploadFile>
    </div>
</template>
<script>
import videoPlay from "@/components/videoPlayer";
import globalUploader from "@/components/globalUploader";
import bigUploadFile from "@/components/bigUploadFile";
// import Bus from "@/plugins/bus.js";
export default {
    data() {
        return {
            src: "",
            poster: "",
            videoStyle: { width: "400px", height: "300px" }
        };
    },
    created() {},
    components: {
        videoPlay,
        globalUploader,
        bigUploadFile
    },
    methods: {
        //获取上传的url
        getUploadUrl(url) {
            console.log("传递过来的url", url);
            this.src = url;
        }
    }
};
</script>
<style lang="less">
</style>