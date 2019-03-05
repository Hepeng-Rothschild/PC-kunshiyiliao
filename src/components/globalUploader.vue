<template>
    <div id="global-uploader">
        <!-- 上传 -->
        <uploader
                ref="uploader"
                :options="options"
                :autoStart="false"
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                class="uploader-app">
            <uploader-unsupport></uploader-unsupport>

            <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>

            <uploader-list v-show="panelShow">
                <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
                    <!-- <div class="file-title">
                        <h2>文件列表</h2>
                        <div class="operate">
                            <button type="text" :title="collapse ? '展开':'折叠' ">
                                <i class="iconfont" :class="collapse ? 'inuc-fullscreen': 'inuc-minus-round'"></i>
                            </button>
                            <button @click="close" type="text" title="关闭">
                                <i class="iconfont icon-close"></i>
                            </button>
                        </div>
                    </div> -->
                    <button class="removeBtn" v-if="showVideo" @click="removeFile" title="移除">&times;</button>
                    <videoPlay :src="src" v-if="showVideo"></videoPlay>
                    <ul class="file-list" v-if="!showVideo">
                        <li v-for="file in props.fileList" :key="file.id">
                            <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                        </li>
                    </ul>
                    <Button type="primary" @click="toUpload" class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i>上传</Button>
                </div>
            </uploader-list>
        </uploader>
        <br/>
        <input type="file" name="testFile" style="display:none;" id="testFile">
    </div>
</template>

<script>
import videoPlay from "@/components/videoPlayer";
import { ACCEPT_CONFIG } from "@/config/acceptConfig";
import SparkMD5 from "spark-md5";
import api from "@/api/commonApi.js";
import Bus from "@/plugins/bus.js";
import code from "@/config/base.js";
import cookie from '@/utils/cookie.js';
import aesUtils from '@/plugins/aes-utils.js';
export default {
    data() {
        return {
            src:'',
            showVideo:false,
            options: {
                // target: api.lecturedemanduploadfile,
                target: api.lecturedemanduploadfile,
                chunkSize: "1024000",
                fileParameterName: "file",
                forceChunkSize:true,
                maxChunkRetries: 3,
                query:{urlCode:code.urlCode.lectureDemand},
                testChunks: true, //是否开启服务器分片校验,断点续传,秒传
                testMethod:"POST",
                // 服务器分片校验函数，秒传及断点续传基础
                checkChunkUploadedByResponse: function(chunk, message) {
                    let objMessage = {}
                    try {
                        objMessage = JSON.parse(message)
                        console.log("objMessage",objMessage);
                    } catch (e) {}
                    if (objMessage.skipUpload) { //秒传走这儿，skipUpload为true,实际情况看后台返回值下标是什么
                        return true;
                    }
                    // if(objMessage)
                    return (
                        (objMessage.uploaded || []).indexOf(chunk.offset + 1) >=
                        0
                    );
                }
            },
            attrs: {
                accept: ACCEPT_CONFIG.getAll()
            },
            panelShow: true, //选择文件后，展示上传panel
            collapse: false,
            categoryMap:{
                video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv']
            },

            bytesPerPiece: 1024*1024,
            totalPieces: 0
        };
    },
    created(){
        let env = this.$store.state.env;
        if (env == "production" || env == "test") {
            let iv = this.$store.state.iv;
            let salt = this.$store.state.salt;
            let key = cookie.getCookie("randmId");
            let access_user = aesUtils.decrypt(salt,iv,key,cookie.getCookie("access_user"));
            let tmpHeaders = {
                    Authorization:"Bearer " + window.localStorage.getItem("access_token"),
                    "OPERATE-USER":access_user,
                    "FORM-ENCODE" : 0
                }
            this.options.headers = tmpHeaders;
        }
    },
    computed: {
        //Uploader实例
        uploader() {
            return this.$refs.uploader.uploader;
        }
    },
    methods: {
        removeFile(){
            this.uploader.cancel();
            this.$emit("getUploadUrl","");
            this.showVideo = false;
        },
        toUpload(){
            document.getElementById("global-uploader-btn").click()
        },
        onFileAdded(file) {
            console.log("额外参数",code.urlCode.lectureDemand);
            this.panelShow = true;
            this.computeMD5(file);
        },
        onFileProgress(rootFile, file, chunk) {
            console.log(
                `上传中 ${file.name}，chunk：${chunk.startByte /
                    1024 /
                    1024} ~ ${chunk.endByte / 1024 / 1024}`
            );
        },
        onFileSuccess(rootFile, file, response, chunk) {
            let res = JSON.parse(response);
            console.log("上传成功的res",res);
            // 服务器自定义的错误，这种错误是Uploader无法拦截的
            if (!res.success) {
                console.log("res.message",res.message);
                this.$Message.error(res.message);
                return;
            }else{
                let tmpFileUrl = JSON.parse(res.object.fileUrl);
                let url = tmpFileUrl[0].fileName;
                this.$emit("getUploadUrl",url);
                this.showVideo = true;
            }

            // 如果服务端返回需要合并
            // if (res.needMerge) {
            //     api.mergeSimpleUpload({
            //         tempName: res.tempName,
            //         fileName: file.name,
            //         ...this.params
            //     })
            //         .then(res => {
            //             // 文件合并成功
            //             Bus.$emit("fileSuccess");
            //         })
            //         .catch(e => {});

            //     // 不需要合并
            // } else {
            //     Bus.$emit("fileSuccess");
            //     console.log("上传成功");
            // }

        },
        onFileError(rootFile, file, response, chunk) {
            console.log("response",response);
            this.$Message.error(response);
        },

        /**
         * 计算md5，实现断点续传及秒传
         * @param file
         */
        computeMD5(file) {
            let fileReader = new FileReader();
            let time = new Date().getTime();
            let md5 = "";

            file.pause();

            fileReader.readAsArrayBuffer(file.file);

            fileReader.onload = e => {
                if (file.size != e.target.result.byteLength) {
                    this.$Message.error(
                        "Browser reported success but could not read the file until the end."
                    );
                    return;
                }

                md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
                // 添加额外的参数
                // this.uploader.opts.query = {
                //     ...this.params
                // };

                console.log(
                    `MD5计算完毕：${file.id} ${
                        file.name
                    } MD5：${md5} 用时：${new Date().getTime() - time} ms`
                );

                file.uniqueIdentifier = md5;
                file.resume();
            };

            fileReader.onerror = function() {
                this.$Message.error(
                    "FileReader onerror was triggered, maybe the browser aborted due to high memory usage."
                );
            };
        },
        close() {
            this.uploader.cancel();
            this.panelShow = false;
        },
        

    },
    props: {
        src:{
            type:String,
            default:''
        }
    },
    components: {videoPlay}
};
</script>

<style scoped lang="less">
#global-uploader {
    // position: fixed;
    // z-index: 20;
    // left: 15px;

    .uploader-app {
        // width: 200px;
        display:inline-block;
        left:30px;
    }

    .file-panel {
        background-color: #fff;
        border: 1px solid #e2e2e2;
        border-radius: 7px 7px 0 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position:relative;
        .removeBtn{
            position:absolute;
            top:10px;
            right:10px;
            z-index:15;
            border-radius:50%;
            width:30px;
            height:30px;
            font-size:22px;
            background:#2d8cf0;
            outline:none;
            color:#ffffff;
            border:0;
            &:hover{
                box-shadow: 0 0 5px 3px #ffffff;
            }
        }
        .file-title {
            display: flex;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
            border-bottom: 1px solid #ddd;

            .operate {
                flex: 1;
                text-align: right;
            }
        }

        .file-list {
            position: relative;
            height: 48px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #fff;

            > li {
                background-color: #fff;
                height:100%;
                >div{
                    // height:100%;
                    // line-height:300px;
                }
            }
        }

        &.collapse {
            .file-title {
                background-color: #e7ecf2;
            }
        }
    }

    .no-file {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
    }

    /deep/.uploader-file-icon {
        &:before {
            content: "" !important;
        }

        &[icon="image"] {
            background: url(./../../static/img/image-icon.png);
        }
        &[icon="video"] {
            background: url(./../../static/img/video-icon.png);
        }
        &[icon="document"] {
            background: url(./../../static/img/text-icon.png);
        }
    }

    /deep/.uploader-file-actions > span {
        margin-right: 6px;
    }
}

/* 隐藏上传按钮 */
#global-uploader-btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
</style>