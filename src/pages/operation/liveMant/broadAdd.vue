<template>
    <div class="broadAdd">
        <div class="val">
            <!-- 直播标题 -->
            <div class = 'spacing'>直播标题
                <Input v-model="params.title" placeholder="请输入直播标题" style="width: 300px"/>
            </div>
            <!-- 选择直播 -->
            <div class = 'spacing'>选择主播
                <Button type="primary" @click="modalStatusclick">添加</Button>
                <!-- 模态框 -->
                <Modal title="添加主播医生" width="1000" footer-hide v-model='modalStatus'>
                    <div>
                        <!-- 查询条件 -->
                        <Row>
                            <Col span="24">
                                <Input
                                    v-model="search"
                                    placeholder="搜索主播医生"
                                    style="width: 200px"
                                />
                                <Button type="primary" icon="ios-search">查询</Button>
                            </Col>
                        </Row>
                        <!-- 显示列表 -->
                        <Row
                            type="flex"
                            justify="space-around"
                            class="code-row-bg"
                            style="margin-top:20px;"
                        >
                            <Col span="24">
                                <Table stripe :columns="columns" :data="data1"></Table>
                                    <Page 
                                    :total="40" 
                                    size="small"             
                                    :current="pageNo"
                                    :page-size="pageSize"
                                    @on-change="loading"
                                    />
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
            <!-- 开始时间 -->
            <div class = 'spacing'>
                <Row>
                    <Col span="12">直播时间
                        <DatePicker
                            type="date"
                            placeholder="选择年月日"
                            style="width: 200px"
                            @on-change="startTimeChange"
                        ></DatePicker>
                        <TimePicker
                            type="time"
                            placeholder="选择时间"
                            style="width: 168px"
                            v-model='startTimers'
                        ></TimePicker>
                    </Col>
                </Row>
            </div>
            <!-- 预计结束 -->
            <div class = 'spacing'>
                <Row>
                    <Col span="12">预计结束
                        <DatePicker
                            type="date"
                            placeholder="选择年月日"
                            style="width: 200px"
                            @on-change="endTimeChange"
                        ></DatePicker>
                        <TimePicker
                            type="time"
                            placeholder="选择时间"
                            style="width: 168px"
                            v-model='endTimers'
                        ></TimePicker>
                    </Col>
                </Row>
            </div>
            <!-- 直播封面 -->
            <div class="main_imgs">
                <div class="main_title_info">
                    <span>直播封面</span>
                </div>
                <div class="input">
                    <div class="demo-upload-list" v-for="item in uploadList">
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
            <div class = 'spacing'>原始价格
                <InputNumber :max="9999" :min="1" v-model="params.oldPrice"></InputNumber>
            </div>
            <!-- 折后价格 -->
            <div class = 'spacing'>折后价格
                <InputNumber :max="9999" :min="1" v-model="params.newPrice"></InputNumber>
                <span>折后价格需要小于原始价格</span>
            </div>
            <!-- 推广力度 -->
            <div class = 'spacing'>推广力度
                <InputNumber :max="99999" :min="1" v-model="params.Intensity"></InputNumber>
            </div>
            <!-- 课堂类型 -->
            <div class = 'spacing'>课堂类型
                <Select v-model="params.type" style="width:160px">
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
            </div>
            <!-- 讲堂介绍 -->
            <div class="vueeditor spacing">
                <span>讲堂介绍</span>
                <div >
                    <vueEditor
                    id="homeInfo"
                    :textHtml="params.content"
                    :urlCode="urlCode"
                    @valueHandle="afterChange"
                ></vueEditor>
                </div>
                
            </div>
            <!-- 创建/取消 -->
            <Button type="primary" @click="saveLive">创建</Button>
            <Button @click="back">取消</Button>
        </div>
    </div>
</template>
<script>
import { DatePicker, TimePicker } from "iview";
import vueEditor from "@/components/vueEditor";
import api from "@/api/commonApi";
import code from "@/configs/base.js";
export default {
    components: {
        DatePicker,
        TimePicker,
        vueEditor
    },
    data() {
        return {
            // 医生查询数据
            search:"",
            // 开始时间
            startTime:"",
            startTimers:"",
            // 结束时间
            endTime:"",
            endTimers:"",
            params: {
                // 标题
                title: "",
                doctor:"",
                
                // 价格
                oldPrice:"",
                newPrice:"",
                // 力度
                Intensity:"",
                // 类型
                type:"",
                // 介绍
                content:""
            },
            cityList: [
                {
                    value: 1,
                    label: "New York"
                },
                {
                    value: 2,
                    label: "London"
                }
            ],
                modalStatus: false,
                // 列表数据
                data1: [],
                // 表头数据
                columns: [
                    {
                        title: "序号",
                        key: "name",
                        align: "center"
                    },
                    {
                        title: "头像",
                        key: "age",
                        align: "center"
                    },
                    {
                        title: "姓名",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "所在医院",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "科室",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "职称",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "operate",
                        align: "center",
                        width: 60,
                        render: (h, params) => {
                            // let id = params.row.remoteClinicId;
                            return h(
                                "a",
                                {
                                    attrs: {
                                        href: "javascript:void(0);"
                                    },
                                    on: {
                                        click: () => {
                                        }
                                    }
                                },
                                "添加"
                            );
                        }
                    }
                ],
                uploadModal: true,
                uploadData: { json: '{"urlCode":"' + code.urlCode.hospitalBanner + '"}' },
                activeUploadId: "5c2bf345-b973-4ffd-a52e-87bb9c1d2b72",
                uploadUrl: api.fileAll,

                // 页码
                pageNo:1,
                // 页数
                pageSize:10,
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/contentmanagement_home",
                title: "患者端运营"
            },
            {
                path: "/index/operation/liveMant/broadAdd",
                title: "添加直播"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
        // 选择时间对象
        startTimeChange(val) {
            this.startTime = val
        },
        // 结束时间
        endTimeChange(val){
            this.endTime = val
        },
        // 富文本内容同步
        afterChange(val) {
            this.params.content = val;
        },
        // 模态框显示
        modalStatusclick() {
            this.modalStatus = true;
            console.log(this.modalStatus);
        },
        //  w创建
        saveLive() {
            this.params.startTime = this.startTime+' '+this.startTimers
            this.params.endTime = this.endTime +" "+this.endTimers
            this.params.images = this.images
            console.log(this.params);
            // let query = this.$route.query;
            // this.functionJS.queryNavgationTo(
            //     this,
            //     "/index/operation/liveMant/list",
            //     query
            // );
        },
        // 返回
        back() {
            let query = this.$route.query;
            this.functionJS.queryNavgationTo(
                this,
                "/index/operation/liveMant/list",
                query
            );
        },
        // 页码改变 
        loading (index) {
            console.log(index);
            this.pageNo = index
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
            file.url = this.fileBaseUrl + res.object[0].fileName;
            this.images = JSON.stringify(res.object[0]);
            file.name = res.object[0].fileName;
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "格式错误",
                desc: "文件 " + file.name + " 上传失败,请重试"
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "文件过大",
                desc: `文件${file.name}过大，文件最大限制为2000KB`
            });
        },
        handleBeforeUpload(file) {
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
.broadAdd {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .val {
        .spacing {
            margin: 6px 0;
        }
    }
    .main_imgs {
        display: flex;
        flex-direction: row;
        align-items:center;
        .main_title_info {
            min-width: 100px;
        }
    }
    .vueeditor {
        display: flex;
        flex-direction: row;
        align-items: center;
        div{
            min-width:600px;
        }
    }
}
</style>
