<template>
    <div class="management">
        <tmpHeader :index="3"/>
        <!-- 功能管理 -->
        <div class = 'wrapper' v-for="(item,index) in list"
            :key="index">
            <span class ='name'>{{ item.title }}</span>
            <iSwitch size="large" v-model="item.status">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </iSwitch>
        </div>

        <div class = 'wrapper'>
            <span class ='name'>功能未开通时是否显示菜单</span>
            <Select v-model="showVal" style="width:150px;">
                <Option v-for="(item,index) in showList" :value="index" :key="index">{{ item }}</Option>
            </Select>
        </div>

        <!-- <div class = 'wrapper'>
            <span class ='name'>首页推荐医生显示数量</span>
            <InputNumber :max="10" :min="1" v-model="params.doctorShowNumber" style="width:200px;"></InputNumber>
        </div>
        <div class = 'wrapper'>
            <span class ='name'>首页推荐医生显示规则</span>
            <Select v-model="params.doctorVal" style="width:200px;">
                <Option v-for="(item,index) in doctorList" :value="index" :key="index">{{ item }}</Option>
            </Select>
            <Select v-model="params.doctorVal" style="width:100px;margin:0 20px;">
                <Option v-for="(item,index) in doctorList" :value="index" :key="index">{{ item }}</Option>
            </Select>
        </div>
        <div class = 'wrapper'>
            <span class ='name'>公众号承载机构类型</span>
            <Select v-model="params.mengentType" style="width:100px">
                <Option v-for="(item,index) in mengentList" :value="index" :key="index">{{ item }}</Option>
            </Select>
        </div>  -->
        
        <!-- <fourLevelLinkage
          @changeProvince="changeProvince"
          @changeCity="changeCity"
          @changeArea="changeArea"
          @changeHospital="changeHospital"
          :province="province"
          :city="city"
          :area="area"
          :hospital="hospital"
        ></fourLevelLinkage>
        -->

        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="4">
                <Button type="primary" @click="save">保存</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import tmpHeader from "../tmpHeader";
import aesUtils from "@/plugins/aes-utils.js";
import fourLevelLinkage from "@/components/fourLevelLinkage";
import store from "@/store";
export default {
    components: {
        tmpHeader,
        fourLevelLinkage
    },
    data() {
        return {
            // province: null,
            // city: null,
            // area: null,
            // hospital: null,
            // isBack: 2,

            appid: "",
            list: [
                {
                    title: "OCR管理",
                    status: false
                }
            ],
            showVal:"",
            showList: ['不显示','显示正常菜单','显示灰色菜单'],
            doctorList: ['默认随机','患者评分','接诊量','自定义'],
            mengentList:['单体机构','多个机构'],
            params: {
                // 首页医生显示数量
                doctorShowNumber: "",
                // 医生显示规则
                doctorVal:"",
                // 公众号承载机构类型
                mengentType:""

            },
            
        };
    },
    created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/operation/publicHosting/index",
                title: "公众号托管"
            },
            {
                path: "/index/operation/wxopeningmanagement/index",
                title: "公众号管理"
            }
        ];
        let iv = store.state.iv;
        let salt = store.state.salt;
        this.appid = aesUtils.decrypt(
            salt,
            iv,
            "wxAppid",
            localStorage.getItem("appid")
        );
    },
    mounted() {
        this.$axios
            .post(api.wxMangentSearch, {
                appid: this.appid
            })
            .then(res => {
                if (res.data.code) {
                    let ret = res.data.object;
                    console.log('ret: ', ret);
                    // OCR管理状态
                    this.list[0].status = Boolean(ret.ocrStatus);
                    // 是否支付
                    // this.list[1].status = Boo/lean(ret.ipay)
                    // 是否显示菜单
                    this.showVal = Number(ret.showmenu)
                } else {
                    this.$Message.error("请求失败,请稍候重试");
                }
            });
    },
    methods: {
        // changeProvince(val) {
        //     this.province = val;
        // },
        // changeCity(val) {
        //     this.city = val;
        // },
        // changeArea(val) {
        //     this.area = val;
        // },
        // changeHospital(val) {
        //     this.hospital = val;
        // },
        // 保存
        save() {
            let params = {
                appid: this.appid,
                // OCR管理状态
                ocrStatus: Number(this.list[0].status),
                // 是否显示菜单
                showmenu: this.showVal.toString()
            };
            console.log(params);
            // wxMangent
            this.$axios.post(api.wxMangent, params).then(res => {
                if (res.data.code) {
                    let ret = res.data.data;
                    console.log(res);
                    this.$Message.info("修改成功");
                } else {
                    this.$Message.error("修改失败,请重试");
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.management {
    width: calc(100% - 20px);
    padding: 10px 30px;
    margin: 0 auto;
    background: #fff;
    .code-row-bg {
        margin-top: 20px;
    }
    .wrapper{
        width:100%;
        height:auto;
        display:flex;
        flex-direction:row;
        align-items:center;
        padding:0 10px;
        margin:15px 0;
        .name {
            min-width:200px;
        }
    }
}
</style>
