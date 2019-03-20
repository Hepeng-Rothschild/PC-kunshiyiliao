<template>
    <div class="liveAdd">
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="24">
                <h2>新增点播</h2>
            </Col>
        </Row>
        <!-- 点播 -->
        <div>
            <!-- 检索 -->
            <Row type="flex" justify="space-around" class="code-row-bg" style="margin:10px 0;">
                <Col span="24">
                    <Input
                        suffix="ios-search"
                        placeholder="输入讲课人进行查询"
                        style="width: 200px"
                        v-model.trim="live.search"
                        clearable
                    />
                    <Button type="primary" @click="InputSearch">查询</Button>
                </Col>
            </Row>
            <!-- 主讲人 -->
            <div class="live">
                <span class="i">
                    <b style="color:red;"></b>主讲人：
                </span>
                <Select v-model="live.doctorId" style="width:100px" @on-change="changeItem">
                    <Option
                        v-for="item in doctorList"
                        :value="item.doctorId"
                        :key="item.doctorId"
                    >{{ item.doctorName }}</Option>
                </Select>
            </div>
            <!-- 标题 -->
            <div class="live">
                <span class="i">标题：</span>
                <Input v-model="live.title" placeholder="请输入点播标题" clearable style="width: 200px"/>
            </div>
            <!-- 首页图片 -->
            <div class="live">
                <span class="i">首页图片：</span>
                <div class="input">
                    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                        <div v-if="item.status === 'finished'">
                            <img :src="item.url">
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
                        style="display: inline-block;width:58px;"
                    >
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="预览图片" v-model="visible" footer-hide>
                        <img :src=" uploadList[0].url " v-if="visible" style="width: 100%">
                    </Modal>
                </div>
            </div>
            <!-- 原始价格 -->
            <div class="live">
                <span class="i">原始价格：</span>
                <InputNumber
                    :max="999999"
                    :min="1"
                    v-model="live.originPrice"
                    style="width:100px"
                ></InputNumber>
            </div>
            <!-- 折后价格 -->
            <div class="live">
                <span class="i">折后价格：</span>
                <InputNumber
                    :max="999999"
                    :min="1"
                    v-model="live.discountPrice"
                    style="width:100px"
                ></InputNumber>
                <b style='margin-left:10px;'>折后价格必须大于原始价格</b>
            </div>
            <!-- 推广力度 -->
            <div class="live">
                <span class="i">推广力度：</span>
                <InputNumber
                    :max="100000000"
                    :min="1"
                    v-model="live.fictitiousNum"
                    style="width:100px"
                ></InputNumber>
            </div>
            <!-- 课堂类型 -->
            <div class="live">
                <span class="i">课堂类型：</span>
                <Select v-model="live.modalDataVal" style="width:100px">
                    <Option v-for="item in liveType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            <!-- 播放来源 -->
            <div class="live">
                <span class="i">播放来源：</span>
                <Select v-model="live.videoSource" style="width:100px">
                    <Option
                        v-for="item in videoList"
                        :value="item.id"
                        :key="item.id"
                    >{{ item.name }}</Option>
                </Select>
            </div>
            <!-- 上传的视频 -->
            <div class="live" v-if="live.videoSource==2">
                <span class="i">上传视频：</span>
                    <bigUploadFile :src="live.filePath" @getUrl="getUploadUrl"></bigUploadFile>
                <p>如需更改视频需再次上传文件即可覆盖</p>
            </div>
            <!-- 文件路径 -->
            <div class="live" v-else>
                <span class="i">网站地址：</span>
                <Input
                    v-model="live.playbackAddress"
                    placeholder="请输入文件路径"
                    clearable
                    style="width: 200px"
                />
            </div>
            <!-- 课堂介绍 -->
            <div class="live">
                <span class="i">课堂介绍：</span>
                <div class="shuru">
                    <vueEditor
                        id="editor_id"
                        :textHtml="live.introduce"
                        :urlCode="urlCode"
                        @valueHandle="afterChange"
                        :height='300'
                    ></vueEditor>
                </div>
            </div>
        </div>
        <!-- 保存 -->
        <div style="margin-top:20px;">
            <Button type="primary" @click="saveLive">保存</Button>
            <Button @click="backLive">取消</Button>
        </div>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import code from "@/configs/base.js";
import vueEditor from "@/components/vueEditor";
import bigUploadFile from "@/components/bigUploadFile";
export default {
    components:{
        vueEditor,
        bigUploadFile
    },
    data() {
        return {
            // 新增直播/点播
            status: "",
            tabList: [
                {
                    title: "直播",
                    value: 1
                },
                {
                    title: "点播",
                    value: 2
                }
            ],
            // 检索医生列表
            doctorList: [],
            // 上传图片相关
            defaultList: [],
            visible: false,
            uploadList: [],
            uploadModal: true,
            urlCode: '{"urlCode":"' + code.urlCode.richText + '"}',
            uploadData: { json: '{"urlCode":"' + code.urlCode.onDemand + '"}' },
            activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
            uploadUrl: api.fileAll,
            images: "",
            // 点播
            live: {
                // 课堂介绍
                introduce:"",
                // 输入值
                search: "",
                // 主讲人名字
                doctorName: "",
                // 主讲人ID
                doctorId: "",
                // 点播标题
                title: "",
                // 原始价格
                originPrice: null,
                // 折后价格
                discountPrice: null,
                // 推广力度
                fictitiousNum: null,
                // 播放地址/上传的视频
                playbackAddress: "",
                // 文件路径
                filePath: "",
                // 播放来源
                videoSource: 1,
                // 课堂类型
                modalDataVal: ""
            },
            // 栏目数据
            liveType: [],
            // 视频上传方式
            videoList: [
                {
                    id: 1,
                    name: "网站地址"
                },
                {
                    id: 2,
                    name: "本地上传"
                }
            ],
            src:"",
            poster: "",
            videoStyle: { width: "400px", height: "300px" }
        };
    },
    created(){  
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/contentmanagement_home",
                title: "患者端运营"
            },
            {
                path: "/index/operation/liveMant/list",
                title: "医师讲堂"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.status = this.$route.query.status;
        this.uploadList = this.$refs.upload.fileList;
        // 加载栏目
        this.modalData();
    },
    methods: {
        afterChange(val) {
            this.live.introduce = val;
        },
        // 根据选择的主讲人获得主讲人信息
        changeItem(val) {
            this.doctorList.forEach((item, index) => {
                if (item.doctorId == val) {
                    this.live.doctorName = item.doctorName;
                    this.live.doctorId = item.doctorId;
                }
            });
        },
        // 查询主讲人
        InputSearch() {
            if (!Boolean(this.live.search)) {
                this.$Message.error("查询失败,请输入主讲人姓名");
                return "";
            }
            this.$axios
                .post(api.doctorList, {
                    searchKey: this.live.search,
                    pageNo: 1,
                    pageSize: 10
                })
                .then(resp => {
                    if (resp.data.success) {
                        let ret = resp.data.object.list;
                        if (ret.length > 0) {
                            this.$Message.info("查询成功请选择主讲人");
                        } else {
                            this.$Message.error("未查询到该医生");
                        }
                        this.doctorList = ret;
                    } else {
                        this.$Message.error("不允许访问");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 保存
        saveLive() {
            // 折后价格与原始价格
            if (
                Number(this.live.originPrice) <
                    Number(this.live.discountPrice) ||
                !Boolean(this.live.originPrice) ||
                !Boolean(this.live.discountPrice)
            ) {
                this.$Message.error("请检查原始价格与折后价格是否填写完整");
                return "";
            } else if (this.live.doctorId=='') {
                this.$Message.error("请选择主讲人");
                return "";
            }
            let params = {
                // 医生姓名及ID
                doctorName: this.live.doctorName,
                doctorId: this.live.doctorId,
                // 点播标题
                title: this.live.title,
                // 原始价格与折后价格
                originalPrice: this.live.originPrice,
                discountPrice: this.live.discountPrice,
                // 推广力度
                fictitiousNum:this.live.fictitiousNum,
                // 文件路径
                filePath: this.live.filePath,
                // 播放地址
                playbackAddress: this.live.playbackAddress,
                // 点播类型
                type: this.live.modalDataVal,
                // 标题图片
                headImg: this.images,
                // 播放来源
                videoSource:this.live.videoSource,
                // 课堂介绍
                introduce:this.live.introduce
            };

            this.$axios.post(api.lecturedemandinsert, params).then(res => {
                if (res.data.success) {
                    let ret = res.data.object;
                    this.$Message.info("添加成功");
                    let query = this.$route.query;
                    setTimeout(()=>{
                        this.functionJS.queryNavgationTo(
                            this,
                            "/index/operation/liveMant/list",
                            query
                        );
                    },800)
                } else {
                    this.$Message.error("添加失败请重试");
                }
            });
            
        },
        // 后退
        backLive() {
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/liveMant/list",
                query
            );
        },
        // 获取栏目数据
        modalData() {
            this.$axios.post(api.lecturecolumnlist).then(resp => {
                if (resp.data.success) {
                    let ret = resp.data.object;
                    this.liveType = ret;
                } else {
                    this.$Message.error("请求失败,请稍候重试");
                }
            });
        },
        // 标题图片上传
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        //获取上传的url
        getUploadUrl(url){
            // console.log("传递过来的url",url);
            this.src = url;
            this.live.filePath = url
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            res = this.uploadFileDecrypt(res);
            file.url = this.fileBaseUrl + res.object[0].fileName;
            this.images = JSON.stringify(res.object[0]);
            file.name = res.object[0].fileName;
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "上传失败",
                desc: "文件格式错误"
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "文件过大",
                desc: `文件${file.name}过大，文件最大限制为2000KB`
            });
        },
        handleBeforeUpload(file) {
            console.log(file)
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Message.info("只能上传一张图片");
            }
            return check;
        }
    }
};
</script>
<style lang="less" scoped>
.shuru {
    width:700px;
    div {
        margin: 0;
    }
}
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
.liveAdd {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .live {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
        span {
            display: inline-block;
            min-width: 80px;
            margin-right: 30px;
        }
        p{
            margin-left:20px;
        }
    }
}
</style>
