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
                    <div class="file-title">
                        <h2>文件列表</h2>
                        <div class="operate">
                            <!-- <button @click="fileListShow" type="text" :title="collapse ? '展开':'折叠' ">
                                <i class="iconfont" :class="collapse ? 'inuc-fullscreen': 'inuc-minus-round'"></i>
                            </button> -->
                            <button type="text" :title="collapse ? '展开':'折叠' ">
                                <i class="iconfont" :class="collapse ? 'inuc-fullscreen': 'inuc-minus-round'"></i>
                            </button>
                            <button @click="close" type="text" title="关闭">
                                <i class="iconfont icon-close"></i>
                            </button>
                        </div>
                    </div>

                    <ul class="file-list">
                        <li v-for="file in props.fileList" :key="file.id">
                            <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                        </li>
                        <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
                    </ul>
                </div>
            </uploader-list>
        </uploader>
    </div>
</template>

<script>
import { ACCEPT_CONFIG } from "@/config/acceptConfig";
import SparkMD5 from "spark-md5";
import api from "@/api/commonApi.js";
import Bus from "@/plugins/bus.js";
import code from "@/config/base.js";
export default {
    data() {
        return {
            options: {
                target: api.fileAll,
                chunkSize: "1024000",
                fileParameterName: "upfile",
                maxChunkRetries: 3,
                query:{urlCode:code.urlCode.lectureDemand},
                testChunks: true, //是否开启服务器分片校验
                testMethod:"POST",
                // 服务器分片校验函数，秒传及断点续传基础
                checkChunkUploadedByResponse: function(chunk, message) {
                    let objMessage = JSON.parse(message);
                    if (objMessage.skipUpload) {
                        return true;
                    }

                    return (
                        (objMessage.uploaded || []).indexOf(chunk.offset + 1) >=
                        0
                    );
                },
                headers: {
                    Authorization:
                        "Bearer " + window.localStorage.getItem("access_token")
                }
            },
            attrs: {
                accept: ACCEPT_CONFIG.getAll()
            },
            panelShow: false, //选择文件后，展示上传panel
            collapse: false,
            categoryMap:{
                video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv']
            }
        };
    },
    created() {},
    mounted() {
        Bus.$on("openUploader", query => {
            this.params = query || {};

            if (this.$refs.uploadBtn) {
                document.getElementById("global-uploader-btn").click()
                // $("#global-uploader-btn").click();
            }
        });
    },
    computed: {
        //Uploader实例
        uploader() {
            return this.$refs.uploader.uploader;
        }
    },
    methods: {
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

            // 服务器自定义的错误，这种错误是Uploader无法拦截的
            if (!res.result) {
                console.log("res.message",res.message);
                this.$Message.error(res.message);
                return;
            }

            // 如果服务端返回需要合并
            if (res.needMerge) {
                api.mergeSimpleUpload({
                    tempName: res.tempName,
                    fileName: file.name,
                    ...this.params
                })
                    .then(res => {
                        // 文件合并成功
                        Bus.$emit("fileSuccess");
                    })
                    .catch(e => {});

                // 不需要合并
            } else {
                Bus.$emit("fileSuccess");
                console.log("上传成功");
            }
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
                    this.error(
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
                this.error(
                    "FileReader onerror was triggered, maybe the browser aborted due to high memory usage."
                );
            };
        },

        fileListShow() {
            console.log("fileListShow");
            // let $list = $("#global-uploader .file-list");
            let list = document.getElementById("global-uploader").getElementsByClassName("file-list");
            console.log("list",list);
            if ($list.is(":visible")) {
                $list.slideUp();
                this.collapse = true;
            } else {
                $list.slideDown();
                this.collapse = false;
            }
        },
        close() {
            this.uploader.cancel();

            this.panelShow = false;
        },

        error(msg) {
            this.$notify({
                title: this.$t("c.false"),
                message: msg,
                type: "error",
                duration: 2000
            });
        }
    },
    watch: {},
    destroyed() {
        Bus.$off("openUploader");
    },
    components: {}
};
</script>

<style scoped lang="less">
#global-uploader {
    position: fixed;
    z-index: 20;
    right: 15px;
    bottom: 15px;

    .uploader-app {
        width: 520px;
    }

    .file-panel {
        background-color: #fff;
        border: 1px solid #e2e2e2;
        border-radius: 7px 7px 0 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

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
            height: 240px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #fff;

            > li {
                background-color: #fff;
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