<template>
    <div class="biguploadfile">
        <div class="videoBox">
            <div class="progressBox" v-if="showProgress">
                <span class="progressItem" ref="progressItem"></span>
            </div>
            <videoPlay :src="fileBaseUrl+src" poster='' v-if="showVideo && !pauseStatus && !showProgress"></videoPlay>
        </div>
        <input type="file" class="bigFile" @change="computedSliceMd5" ref="file" name="file">
        <div class="btns">
            <Button type="primary" v-if="!pauseStatus" @click="toUpload">上传</Button>
            <Button type="default" v-if="pauseStatus" @click="pauseUpload">取消</Button>
        </div>
    </div>
</template>
<script>
import SparkMD5 from "spark-md5";
import videoPlay from "@/components/videoPlayer";
import Ajax from "@/plugins/ajax.js";
import api from "@/api/commonApi.js";
import code from "@/config/base.js";
export default {
    data() {
        return {
            showVideo: false,
            blobSlice: null,
            file: null,
            identifier: null,
            chunkSize: 1024000,
            chunks: 0,
            currentChunk: 0,
            spark: null,
            fileReader: null,
            tmpDataList: [],
            formDataList: [],
            uploadedList: [],
            start: 0,
            end: 0,
            headers: {},
            urlCode: code.urlCode.lectureDemand,
            xhr: null,
            pauseStatus: false,
            showProgress: false,
            percent: 0
        };
    },
    props: {
        src: {
            type: String,
            default: ""
        }
    },
    components: { videoPlay },
    methods: {
        pauseUpload() {
            this.xhr.abort();
            this.xhr = null;
        },
        toUpload() {
            this.$refs.file.click();
        },
        checkMd5() {
            this.showProgress = true;
            this.$axios
                .post(api.lecturedemanduploadfilemd5, { md5: this.identifier })
                .then(resp => {
                    if (resp.data.object.code == 2) {
                        let tmpIdsList = resp.data.object.ids;
                        tmpIdsList.map((el,index) => {
                            tmpIdsList[index] = parseInt(el);
                        });
                        this.uploadedList = tmpIdsList;
                    }
                    this.showVideo = false;
                    this.pauseStatus = true;
                    this.uploadFile(
                        1,
                        this.formDataList,
                        this.uploadedList,
                        this.chunks
                    );
                })
                .catch(err => {
                    this.initParam(0, "断点续传检查失败，请重试");
                });
        },
        computedSliceMd5() {
            this.file = this.$refs.file.files[0];
            this.chunks = Math.ceil(this.file.size / this.chunkSize);
            this.fileReader.onload = e => {
                this.spark.append(e.target.result); // Append array buffer
                this.currentChunk++;
                if (this.currentChunk < this.chunks) {
                    this.loadNext();
                } else {        
                    this.identifier = this.spark.end(); //文件的MD5身份标识
                    this.tmpDataList.map((el, i) => {
                        let formData = new FormData();
                        formData.append("filename", this.file.name);
                        formData.append("relativePath", this.file.name);
                        formData.append("totalSize", this.file.size);
                        formData.append("chunkSize", this.chunkSize);
                        formData.append("identifier", this.identifier);
                        formData.append("totalChunks", this.chunks);
                        formData.append("file", el.file);
                        formData.append("currentChunkSize", el.currentSize);
                        formData.append("chunkNumber", el.currentNum + 1);
                        formData.append("urlCode", this.urlCode);
                        this.formDataList.push(formData);
                    });
                    this.checkMd5();
                }
            };
            this.fileReader.onerror = function() {
                this.$Message.error("读取文件出错，请重试");
            };
            this.loadNext();
        },
        loadNext() {
            (this.start = this.currentChunk * this.chunkSize),
                (this.end =
                    this.start + this.chunkSize >= this.file.size
                        ? this.file.size
                        : this.start + this.chunkSize);
            let pieceFile = this.blobSlice.call(
                this.file,
                this.start,
                this.end
            );
            pieceFile.name = this.file.name;
            let tmpObj = {
                file: pieceFile,
                currentSize: this.end - this.start,
                currentNum: this.currentChunk
            };
            this.tmpDataList.push(tmpObj);
            this.fileReader.readAsArrayBuffer(pieceFile);
        },
        uploadFile(n, dataList, uploadedList, chunks) {
            console.log("uploadedList",uploadedList);
            let status = uploadedList.indexOf(n) == -1 ? true : false;
            console.log("status",status);
            let key = n - 1;
            if (status) {
                new Promise((resolve, reject) => {
                    Ajax(
                        resolve,
                        reject,
                        "post",
                        api.lecturedemanduploadfile,
                        this.headers,
                        dataList[key],
                        this.xhrReturn,
                        this.getProgress
                    );
                })
                .then(resp => {
                    if(resp.code == "401"){
                        this.$router.push({path:"/login"});
                        return ;
                    }
                    if (resp.object.uploadStatus == 1) {
                        let tmpUrl = JSON.parse(resp.object.fileUrl)[0]
                            .fileName;
                        this.$emit("getUrl", tmpUrl);
                        this.success();
                    } else {
                        this.uploadFile(
                            n + 1,
                            this.formDataList,
                            this.uploadedList,
                            this.chunks
                        );
                    }
                })
                .catch(err => {
                    this.initParam(0, "上传失败");
                });
            }else{
                this.percent += Math.floor(100/this.chunks);
                this.changeProgress(1);
                this.uploadFile(
                    n + 1,
                    this.formDataList,
                    this.uploadedList,
                    this.chunks
                );
            }
        },
        getProgress(evt) {
            if (evt.lengthComputable) {
                this.percent += Math.floor( 
                    (evt.loaded * 100) / this.chunks / evt.total
                );
                if(this.percent>=99){
                    this.percent = 99;
                }
                this.changeProgress(1);
            } else {
                this.changeProgress(0);
            }
        },
        changeProgress(type) {
            if (type) {
                this.$refs.progressItem.innerHTML =
                    this.percent.toFixed(2) + "%";
                this.$refs.progressItem.style.width =
                    this.percent.toFixed(2) + "%";
            } else {
                this.$refs.progressItem.innerHTML = "上传失败";
            }
        },
        success() {
            this.percent = 100;
            this.changeProgress(1);
            setTimeout(() => {
                this.initParam(1, "上传成功");
            }, 500);
        },
        failed(err) {
            this.initParam(0, err);
        },
        initParam(type, msg) {
            this.percent = 0;
            this.pauseStatus = false;
            this.showProgress = false;
            this.file = null;
            this.identifier = null;
            this.chunks = 0;
            this.currentChunk = 0;
            this.tmpDataList = [];
            this.formDataList = [];
            this.uploadedList = [];
            this.start = 0;
            this.end = 0;
            this.$refs.file.value = "";
            if (type == 1) {
                this.showVideo = true;
                this.$Message.success(msg);
            } else {
                this.showVideo = false;
                this.$Message.error(msg);
            }
        },
        xhrReturn(xhr) {
            this.xhr = xhr;
        }
    },
    created() {
        if (Boolean(this.src)) {
            this.showVideo = true;
        }
        this.blobSlice =
            window.File.prototype.slice ||
            window.File.prototype.mozSlice ||
            window.File.prototype.webkitSlice;
        this.spark = new SparkMD5.ArrayBuffer();
        this.fileReader = new FileReader();
        this.percent = 0;
    }
};
</script>
<style lang="less" scoped>
.biguploadfile {
    display: inline-block;
    .bigFile {
        display: none;
    }
    .progressBox {
        display: inline-block;
        width: 200px;
        height: 20px;
        background-color: gray;
        vertical-align: middle;
    }
    .progressItem {
        display: inline-block;
        height: 20px;
        background-color: #2d8cf0;
        font-weight: bold;
        color:#ffffff;
    }
    .btns {
        display: inline-block;
        vertical-align: middle;
    }
    .videoBox {
        display: inline-block;
        vertical-align: middle;
    }
}
</style>