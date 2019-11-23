<template>
    <div class="addNews">
        <h2 style='margin:20px 0;font-weight:bold;'>修改内容管理</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
            <!-- 新闻标题 -->
            <FormItem label="新闻标题" prop="title">
                <Input v-model.trim="formValidate.title" placeholder="请输入新闻标题" style="width: 350px" :maxlength="30"/>
            </FormItem>
            <!-- 副酷暑 -->
            <FormItem label="副标题" prop="synopsis">
                <Input v-model.trim="formValidate.synopsis" placeholder="请输入新闻副标题" style="width: 350px" :maxlength="30"/>
            </FormItem>
            <!-- 小图 -->
            <FormItem label="列表小图" >
                <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                    <div v-if="item.status === 'finished'">
                        <img :src="fileBaseUrl + item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </div>
                    <div v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </div>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2000"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    :action="uploadUrl"
                    :headers="fromData"
                    :data="uploadData"
                    accept="image/jpeg, image/x-png, image/gif"
                    style="display: inline-block;width:58px;"
                >
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="预览图片" v-model="visible" footer-hide>
                    <img :src="preview" v-if="visible" style="width: 100%">
                </Modal>
            </FormItem>
            <!-- 栏目 -->
            <FormItem label="栏目" prop="ids">
                <Select v-model="formValidate.ids" style="width:100px">
                    <Option :value="1" :key="1">头条</Option>
                    <Option :value="2" :key="2">今日热点</Option>
                    <Option :value="3" :key="3">医学前沿</Option>
                    <Option :value="4" :key="4">宝宝喂养</Option>
                    <Option :value="5" :key="5">科普</Option>
                    <Option :value="6" :key="6">决策者说</Option>
                </Select>
            </FormItem>
            <!-- 排序 -->
            <FormItem label="排序" prop="priority">
                <Input v-model.trim="formValidate.priority" style="width: 100px"/>
                <span>备注：只能填写数字，1代表置顶以此类推</span>
            </FormItem>
            <!-- 新闻内容 -->
            <FormItem label="新闻内容" >
                <div class="articletext">
                <vueEditor
                    id="analysis"
                    :textHtml="info.content"
                    :urlCode="urlCode"
                    @valueHandle="afterChange"
                    :height='100'
                    style='margin:0;'
                ></vueEditor>
                </div>
            </FormItem>
            <FormItem label="新闻来源">
                <Input v-model.trim="formValidate.source" style="width: 100px"/>
            </FormItem>
            <FormItem label="是否发布">
                <iSwitch v-model="formValidate.enable" size="large">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </iSwitch>
            </FormItem>
        </Form>
        <div class="save">
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="back">取消</Button>
        </div>
    </div>
</template>

<script>
import api from "@/api/commonApi";
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import vueEditor from "@/components/vueEditor";
import code from "@/configs/base.js";
export default {
    components: {
        tmpHeader,
        vueEditor
    },
    data() {
        return {
            imgName: "",
            id: sessionStorage.getItem("hospitalId"),
            info: {
                content: ""
            },
            formValidate:{
                title: "",
                synopsis: "",
                ids:"",
                priority: "",
                source: "",
                enable: false,
            },
            ruleValidate:{
                title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
                synopsis: [{ required: true, message: '请输入新闻副标题', trigger: 'blur' }],
                ids: [{ required: true, message: '请选择新闻栏目', trigger: 'change', type:"number" }],
                priority: [{ required: true, message: '请输入新闻排序', trigger: 'blur' }],
            },
            // 上传图片相关
            visible: false,
            uploadList: [],
            switch1: false,
            defaultList: [],
            uploadData: {
                json: '{"urlCode":"' + code.urlCode.patientNews + '"}'
            },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
            images: "",
            source: "",
            preview: ""
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/patient/index",
                title: "患者端运营"
            },
            {
                path: "/index/operation/contentmanagement_home",
                title: "内容管理"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        let id = this.$route.query.id;
        if (id) {
            this.$axios
                .post(api.getWrap, {
                    id
                })
                .then(res => {
                    if (res.data.code) {
                        let ret = res.data.object;
                        let detail = ret.kbaoOperateArticleEntity;
                        if (detail.cover) {
                            this.uploadList = [];
                            this.source = detail.cover;
                            this.uploadList.push({
                                name: "a42bdcc1178e62b4694c830f028db5c0",
                                percentage: 100,
                                status: "finished",
                                uid: 1544263544970,
                                url: this.analysisImages(detail.cover)
                            });
                            // 预览图片
                            this.preview =
                                this.fileBaseUrl +
                                this.analysisImages(detail.cover);
                        }

                        this.info.content = detail.content;
                        this.formValidate.ids = ret.columnId;
                        this.formValidate.title = detail.title;
                        this.formValidate.synopsis = detail.synopsis;
                        this.formValidate.priority = detail.priority.toString();
                        this.formValidate.content = detail.content;
                        this.formValidate.source = detail.source;
                        this.formValidate.enable = Boolean(detail.enable);
                    }
                });
        }
    },
    methods: {
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.uploadList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            res = this.uploadFileDecrypt(res);
            file.url = res.object[0].fileName;
            this.images = JSON.stringify(res.object[0]);
            file.name = res.object[0].fileName;
            if(this.uploadList.length > 0) {
                return ""
            }
            this.uploadList.push({
                name: "a42bdcc1178e62b4694c830f028db5c0",
                percentage: 100,
                status: "finished",
                uid: 1544263544970,
                url: this.analysisImages(this.images)
            });
        },
        handleFormatError(file) {
            this.$Message.info("文件" + file.name + "上传失败");
        },
        handleMaxSize(file) {
            this.$Message.info("文件" + file.name + "过大");
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Message.info("只能上传一张图片");
            }
            return check;
        },
        // 返回
        back() {
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/contentmanagement_home",
                query
            );
        },
        // 保存
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let query = this.$route.query;
                    let images = "";
                    if (this.images && this.uploadList.length) {
                        images = this.images;
                    } else if (this.uploadList.length) {
                        images = this.source;
                    } else {
                        images = "";
                    }

                    let params = {
                        //栏目
                        ids: [this.formValidate.ids],
                        kbaoOperateArticleEntity: {
                            //标题
                            title: this.formValidate.title.trim(),
                            // 副标题
                            synopsis: this.formValidate.synopsis.trim(),
                            //图片
                            cover: images,
                            //排序
                            priority: this.formValidate.priority,
                            //内容
                            content: this.info.content,
                            //来源
                            source: this.formValidate.source,
                            //显示
                            enable: Number(this.formValidate.enable),
                            //新闻资讯ID
                            id: this.$route.query.id
                        }
                    };
                    if (this.info.content == "") {
                        this.$Message.info("新闻内容不能为空");
                    } else {
                        this.$axios
                            .post(api.changeWrap, params)
                            .then(res => {
                                if (res.data.code) {
                                    this.$Message.info("修改成功");
                                    setTimeout(() => {
                                        this.back()
                                    }, 800);
                                } else {
                                    this.$Message.info("修改失败请重试");
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                } else {
                    this.$Message.error('请完整必款项!');
                }
            })
            
        },
        afterChange(val) {
            this.info.content = val;
        },
        analysisImages(json) {
            try {
                json = JSON.parse(json);
                return json.fileName;
            } catch (error) {
                return "";
            }
        }
    }
};
</script>

<style scoped lang="less">
.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
.addNews {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
}
</style>