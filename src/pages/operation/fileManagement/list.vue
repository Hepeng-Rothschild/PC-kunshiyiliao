<template>
    <div class="doctorreviewlist">
        <Row>
            <Col :xs="24">
                <span>机构名称：</span>
                <Input class="w-input" v-model="params.mechanism" placeholder="请输入机构名称"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>患者名称：</span>
                <Input class="w-input" v-model="params.memberName" placeholder="请输入患者名称"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>身份证号：</span>
                <Input class="w-input" v-model="params.idCard" placeholder="请输入患者身份证号"/>
                <Button type="primary" @click="loadPage(1)">
                    <Icon type="ios-search" size="14"/>查询
                </Button>
            </Col>
        </Row>
        <br>
        <Table class="m-table" stripe :columns="columns" :data="dataList"></Table>
        <Page :total="count" :current="pageNo" :page-size="pageSize" @on-change="loadPage"/>
    </div>
</template>
<script>
import { Select, Option, DatePicker } from "iview";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            params: {
                mechanism: "",
                userName: "",
                idCard: ""
            },
            columns: [
                { title: "编号", key: "iNum", align: "center" },
                { title: "患者姓名", key: "memberName", align: "center" },
                { title: "性别", key: "gender", align: "center" },
                { title: "身份证号", key: "idCard", align: "center" },
                { title: "电话", key: "telephone", align: "center" },
                { title: "签约医生", key: "SigningDoctor", align: "center" },
                { title: "签约日期", key: "SigningDate", align: "center" },
                { title: "签约机构", key: "SigningMechanism", align: "center" }
            ],
            dataList: [],
            count: 0,
            pageSize: 10,
            pageNo: 1
        };
    },
    components: {
        Select,
        Option
    },
    created() {},
    mounted() {
        let pageNo = this.$route.query.pageNo;
        pageNo = pageNo ? parseInt(pageNo) : 1;
        //上来就加载第一页数据
        this.loadPage(pageNo);
    },
    methods: {
        //加载列表数据
        loadPage(pageNo) {
            this.pageNo = pageNo;
            let params = this.params;
            params.pageNo = pageNo;
            params.pageSize = this.pageSize;
            this.$axios
                .post(api.ordermanagementlistbyremoteorder, params)
                .then(resp => {
                    console.log(resp);
                    if (resp.data.success) {
                        let tmpObj = resp.data.object;
                        this.count = tmpObj.count;
                        this.dataList = tmpObj.list;
                        for (let i = 0; i < this.dataList.length; i++) {
                            this.dataList[i].iNum = i + 1;
                        }
                    } else {
                        this.$Message.info("网络错误，请刷新重试");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.doctorreviewlist {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
    .w-select {
        width: 100px;
    }
    .w-input {
        width: 220px;
    }
    .w-num-input {
        width: 100px;
    }
    .m-table {
        margin: 10px 0;
    }
    .first {
        display: inline-block;
        min-width: 320px;
        text-align: right;
    }
    .second {
        display: inline-block;
        min-width: 150px;
        text-align: left;
    }
    .third {
        display: inline-block;
        min-width: 460px;
        text-align: center;
    }
}
</style>