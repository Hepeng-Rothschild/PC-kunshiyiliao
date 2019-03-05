<template>
    <div>
        <bigUploadFile :src="fileBaseUrl+src" @getUrl="getUploadUrl"></bigUploadFile>
    </div>
</template>
<script>
import videoPlay from "@/components/videoPlayer";
import bigUploadFile from "@/components/bigUploadFile";
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