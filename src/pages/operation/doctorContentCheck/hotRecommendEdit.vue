<template>
    <div class="edit-news">
        <Row>
            <Col class="padding-t padding-b" :xs="24">{{editTt}}</Col>
        </Row>
        <Form ref="formInline" v-if="info" :model="info" :rules="infoRules" inline>
            <Row>
                <Col :xs="24" :md="24">
                    <i class="req-icon">*</i>标题：
                    <FormItem prop="title">
                        <Input
                            class="w-input"
                            v-model="info.title"
                            type="textarea"
                            :maxlength="20"
                            placeholder="请输入标题"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="24">
                    <i class="req-icon">*</i>概要：
                    <FormItem prop="synopsis">
                        <Input
                            class="w-input"
                            v-model="info.synopsis"
                            type="textarea"
                            :maxlength="20"
                            placeholder="请输入概要"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24">
                    <i class="req-icon"></i>封面：
                    <FormItem prop="cover">
                        <span class="avatar-box" v-for="(item,index) of uploadList" :key="index">
                            <template v-if="item.status === 'finished'">
                                <Avatar
                                    class="avatar-pic"
                                    shape="square"
                                    icon="ios-person"
                                    :src="item.url"
                                />
                                <div class="avatar-cover">
                                    <Icon
                                        type="ios-eye-outline"
                                        @click.native="handleView(item.url)"
                                    ></Icon>
                                    <Icon
                                        type="ios-trash-outline"
                                        @click.native="handleRemove(item)"
                                    ></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress
                                    v-if="item.showProgress"
                                    class="progress"
                                    :percent="item.percentage"
                                    hide-info
                                ></Progress>
                            </template>
                        </span>
                        <Upload
                            ref="upload"
                            name="file"
                            :data="jsonObj"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="maxSize"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            :headers="fromData"
                            type="drag"
                            :action="uploadUrl"
                            style="display: inline-block;width:58px;"
                            class="upload-avatar"
                        >
                            <div style="width: 64px;height:64px;line-height: 64px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="24">
                    <i class="req-icon"></i>来源：
                    <FormItem prop="source">
                        <Input
                            class="w-input"
                            v-model="info.source"
                            :maxlength="20"
                            placeholder="请输入来源"
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="24">
                    <i class="req-icon"></i>栏目：
                    <FormItem prop="type">
                        <Select class="w-select" v-model="info.type">
                            <Option
                                :value="item.id"
                                v-for="item of tabList"
                                :key="item.id"
                            >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="24">
                    <i class="req-icon"></i>状态：
                    <FormItem prop="enable">
                        <Select class="w-select" v-model="info.enable">
                            <Option value="0">禁用</Option>
                            <Option value="1">启用</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :md="24">
                    <i class="req-icon"></i>内容：
                    <FormItem prop="content">
                        <vueEditor
                            id="hotRecommendEditor"
                            :textHtml="info.content"
                            :urlCode="urlCode"
                            @valueHandle="afterChange"
                        ></vueEditor>
                    </FormItem>
                </Col>
            </Row>
        </Form>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" @click="submit('formInline')">提交</Button>
        <Button type="primary" @click="reback">返回</Button>
        <Modal title="大图预览" :footer-hide="true" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import { Avatar } from "iview";
import code from "@/config/base.js";
import vueEditor from "@/components/vueEditor";
export default {
    components: {
        Avatar,
        vueEditor
    },
    data() {
        return {
            defaultList: [],
            uploadList: [],
            uploadUrl: api.fileAll,
            jsonObj: { json: '{"urlCode":"'+ code.urlCode.hotRecommend +'"}' },
            urlCode: '{"urlCode":"'+ code.urlCode.richText+'"}',
            count: 1,
            maxSize: 2028, //单位kb
            imgName: "",
            visible: false,

            info: {
                id: null,
                title: null,
                synopsis: null,
                content: "",
                cover: null,
                source: null,
                enable: "1",
                type: 1
            },
            editTt: "",
            id: null,
            pageNo: null,
            tabId: null,
            sonTab: null,
            publicationStatus: null,
            articleText: "",

            tabList: [{ id: 0, name: "全部" }],
            hotRecommendSontab: [
                { id: 1, name: "头条" },
                { id: 2, name: "今日热点" },
                { id: 3, name: "医学前沿" },
                { id: 4, name: "决策者说" }
            ],
            infoRules: {
                title: [
                    { required: true, message: "标题不能为空", trigger: "blur" }
                ],
                synopsis: [
                    { required: true, message: "概要不能为空", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        let id = parseInt(this.$route.query.id);
        this.tabId = parseInt(this.$route.query.tabId);
        this.pageNo = this.$route.query.pageNo?parseInt(this.$route.query.pageNo):1;
        this.sonTab = this.$route.query.sonTab?parseInt(this.$route.query.sonTab):null;
        this.publicationStatus = this.$route.query.publicationStatus == null?null:parseInt(this.$route.query.publicationStatus);
        this.articleText = this.$route.query.articleText?this.$route.query.articleText:"";

        this.tabList = this.hotRecommendSontab;
        if (isNaN(id)) {
            this.editTt = `新增-热门推荐`;
        } else {
            this.editTt = `修改-热门推荐`;
            this.id = id;
            this.$axios
                .post(api.recommendDetailById, { id: this.id })
                .then(resp => {
                    if (resp.data.success) {
                        this.info = resp.data.object;
                        this.info.enable = String(this.info.enable);
                        this.tryCatch(this.info.cover) &&
                            this.defaultList.push({
                                url:
                                    this.fileBaseUrl +
                                    this.tryCatch(this.info.cover).fileName
                            });
                        this.$nextTick(() => {
                            this.uploadList = this.$refs.upload.fileList;
                        });
                    } else {
                        console.log("查询失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/doctorManagement/index",
                title: "医生端运营"
            },
            {
                path: "/index/operation/doctorContentCheck/list",
                title: "健康宣教"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    methods: {
        afterChange(val) {
            this.info.content = val;
        },
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (
                        this.info.content != "请输入..." &&
                        this.info.content != ""
                    ) {
                        let successMsg = this.id ? "修改成功" : "新增成功";
                        let failMsg = this.id ? "修改失败" : "新增失败";
                        let subApi = this.id
                            ? api.recommendUpdate
                            : api.recommendInsert;
                        this.info.id = this.id && parseInt(this.id);
                        this.info.enable = parseInt(this.info.enable);
                        this.$axios
                            .post(subApi, this.info)
                            .then(resp => {
                                if (resp.data.success) {
                                    this.$Message.success(successMsg);
                                     //   公用方法
                                    this.functionJS.queryNavgationTo(
                                        this,
                                        "/index/operation/doctorContentCheck/list",
                                        {
                                            tabId: this.tabId,
                                            pageNo: this.pageNo,
                                            sonTab: this.sonTab,
                                            publicationStatus: this.publicationStatus,
                                            articleText: this.articleText
                                        }
                                    );

                                } else {
                                    this.$Message.error(failMsg);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        this.$Message.error("内容不能为空");
                    }
                } else {
                    this.$Message.error("数据不正确");
                }
            });
        },
        reback() {
             //   公用方法
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/doctorContentCheck/list",
                {
                    tabId: this.tabId, 
                    pageNo: this.pageNo,
                    sonTab: this.sonTab,
                    publicationStatus: this.publicationStatus,
                    articleText: this.articleText
                }
            );

        },
        onContentChange(val) {
            this.info.content = val;
        },
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            res = this.uploadFileDecrypt(res);
            if (res.success) {
                console.log("上传成功");
                this.info.cover = JSON.stringify(res.object[0]);
                file.url = this.fileBaseUrl + res.object[0].fileName;
            } else {
                this.alertMsg("网络错误上传失败，请重试");
            }
        },
        handleFormatError(file) {
            this.alertMsg("只支持jpg/jpeg/png格式上传");
        },
        handleMaxSize(file) {
            this.alertMsg(
                `文件${file.name}过大，文件最大限制${this.maxSize}KB`
            );
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < this.count;
            if (!check) {
                this.alertMsg(
                    `最多上传${this.count}张图片,请先点击图片删除老图片`
                );
            }
            return check;
        },
        alertMsg(msg) {
            this.$Message.error({
                render: h => {
                    return h("span", {
                        domProps: {
                            innerHTML: msg
                        },
                        style: { color: "#f00" }
                    });
                },
                duration: 3
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.uploadList = this.$refs.upload.fileList;
        });
    }
};
</script>

<style scoped lang="less">
.edit-news {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .padding-l {
        padding-left: 5px;
    }
    .padding-r {
        padding-right: 5px;
    }
    .padding-t {
        padding-top: 15px;
    }
    .padding-b {
        padding-bottom: 15px;
    }
    .borderRight {
        border-right: 1px solid #e5e5e5;
    }
    .borderLeft {
        border-left: 1px solid #e5e5e5;
    }
    .borderBottom {
        border-bottom: 1px solid #e5e5e5;
    }
    .borderTop {
        border-top: 1px solid #e5e5e5;
    }
    .w-select {
        width: 100px;
    }
    .w-input {
        width: 200px;
    }
    .req-icon {
        font-size: 18px;
        color: red;
        display: inline-block;
        height: 18px;
        width: 18px;
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
    }
}
</style>
<style lang="less">
.upload-avatar {
    display: inline-block;
    vertical-align: middle;
    width: 64px !important;
    height: 64px !important;
    margin-bottom: 3px;
}
.avatar-box {
    position: relative;
    display: inline-block;
    .avatar-pic {
        width: 64px;
        height: 64px;
    }
    .avatar-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        width: 64px;
        height: 64px;
    }
}
.avatar-box:hover .avatar-cover {
    display: block;
    text-align: center;
}
.avatar-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
    line-height: 64px;
}
.progress {
    width: 64px;
}
</style>