<template>
  <div class="mechanismregAdd">
    <div class="container">
      <!-- title -->
      <header>医院基本信息</header>
      <div class="container-main">
        <!-- 区域 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">*</span>
            <span>区域</span>
          </div>
          <!-- 省 -->
          <select v-model="regionProv" @change="provChange">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="(item,index) in provList" :key="index">{{ item.name }}</option>
          </select>
          <!-- 市 -->
          <select v-model="regionCity" @change="cityChange">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="(item,index) in cityList" :key="index">{{ item.city }}</option>
          </select>
          <!-- 县 -->
          <select v-model="regionCounty">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="(item,index) in countyList" :key="index">{{ item.area }}</option>
          </select>
        </div>
        <!-- 机构名称 -->
        <div class="address">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构名称:</span>
          </div>
          <input type="text" placeholder="机构全称" v-model.trim="mechanismName">
        </div>
        <!-- 详细地址 -->
        <div class="address">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>详细地址:</span>
          </div>
          <input type="text" placeholder="请填写详细的地址:省,市,区" v-model.trim="address">
        </div>
        <!-- 机构组织编码 -->
        <div class="address">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构组织编码:</span>
          </div>
          <input type="text" placeholder="医疗组织机构代码" v-model.trim="mechanismCode">
        </div>
        <!-- 机构类型 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构类型</span>
          </div>
          <!-- 医院 -->
          <Select v-model="mechanismType1" style="width:100px">
            <Option :value="1">医院</Option>
          </Select>
          <!-- 公立 -->
          <Select v-model="mechanismType2" style="width:100px">
            <Option :value="1">公立</Option>
            <Option :value="2">私立</Option>
          </Select>
        </div>
        <!-- 机构等级 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>机构等级</span>
          </div>
          <!-- 医院等级 -->
          <Select v-model="mechanismGrade" style="width:150px">
            <Option :value="item.dictType" v-for="item in grade" :key='item.dictType'>{{ item.dictName }}</Option>
          </Select>
        </div>
        <!-- 机构电话 -->
        <div class="address">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>机构电话:</span>
          </div>
          <input type="text" placeholder="机构电话" v-model="mechanismPhone" maxlength="12">
        </div>
        <!-- 机构联系人 -->
        <div class="address">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>机构联系人:</span>
          </div>
          <input type="text" placeholder="姓名" v-model="Contacts">
        </div>
        <!-- 联系人电话 -->
        <div class="address">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>联系人电话:</span>
          </div>
          <input type="text" placeholder="电话号码" v-model="phone" maxlength="11">
        </div>
        <!-- 保存 -->
        <div class="save">
          <div style="background:#fff;" @click="back">取消</div>
          <div style="background:#4dd3d2;color:#fff;" @click="save">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
import { Select, Option } from "iview";
export default {
  components: {
    Select,
    Option
  },
  data() {
    return {
      // 序号
      number: "010101020312",
      // 省
      regionProv: "-1",
      // 市
      regionCity: "-1",
      //县
      regionCounty: "-1",
      //详细地址
      address: "",
      //机构全称
      mechanismName: "",
      //机构代码
      mechanismCode: "",
      //机构类型
      mechanismType1: "1",
      //公私
      mechanismType2: "1",
      //机构等级
      mechanismGrade: "1",
      //机构电话
      mechanismPhone: "",
      //联系人
      Contacts: "",
      //联系人电话
      phone: "",
      //城市列表
      provList: [],
      cityList: [],
      countyList: [],
      //医院等级 列表
      grade: []
    };
  },
  created() {
        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/indexManagement/index",
                title: "索引管理"
            },
            {
                path: "/index/maintain/mechanismreg/list",
                title: "机构注册信息"
            }
        ];
        this.$emit("changeBreadList", breadList);
    },
  mounted() {
    //获取省级信息
    this.getCity();
    this.getGrent();
  },
  methods: {
    save() {
      let params = {
        // 省
        provinceCode: this.regionProv,
        // 市
        cityCode: this.regionCity,
        //县
        districtCode: this.regionCounty,
        //详细地址
        hosAddr: this.address,
        //机构名称
        orgName: this.mechanismName,
        //机构组织代码
        orgCode: this.mechanismCode,
        // appid: this.mechanismCode,
        //机构类型
        hospitalType: this.mechanismType1,
        //公私
        property: this.mechanismType2,
        //机构等级
        grade: this.mechanismGrade,
        //机构电话
        telephone: this.mechanismPhone,
        //联系人
        linkman: this.Contacts,
        //联系人电话
        linkmanTelephone: this.phone
      };

      if (
        this.regionProv == "-1" ||
        this.regionCity == "-1" ||
        this.regionCounty == "-1"
      ) {
        this.$Message.info("区域不能为空");
      } else if (this.mechanismName == "") {
        this.$Message.info("机构名称不能为空");
      } else if (this.mechanismCode == "") {
        this.$Message.info("机构组织代码不能为空");
      } else if (this.mechanismType1 == "" || this.mechanismType2 == "") {
        this.$Message.info("机构类型不能为空");
      } else {
        // console.log(params);
        this.$axios.post(api.mechanismregAdd, params).then(res => {
          if (res.data.code) {
            this.$Message.info("添加成功");
            let pageNo = this.$route.params.pageNo;
            setTimeout(() => {
              this.$router.push({
                name: "mechanismreglist",
                params: {
                  pageNo
                }
              });
            }, 500);
          }
        });
      }
    },
    back() {
      let pageNo = this.$route.params.pageNo;
      // console.log(pageNo);
      this.$router.push({
        name: "mechanismreglist",
        params: {
          pageNo
        }
      });
    },
    //获取医院等级
    getGrent() {
      this.$axios.post(api.managementAll).then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.grade = ret;
        }
      });
    },
    // 获取省级
    getCity() {
      this.$axios.post(api.getCity).then(res => {
        if (res.data) {
          let ret = res.data.object;
          this.provList = ret;
        }
      });
    },
    // 省级改变获取市级
    provChange() {
      let list = this.provList;
      let len = list.length;
      if (list != -1) {
        for (let i = 0; i < len; i++) {
          if (list[i].id == this.regionProv) {
            this.cityList = list[i].cityList;
          }
        }
      }
    },
    //市级改变获取县级
    cityChange() {
      if (this.regionCity != -1) {
        this.$axios
          .post(api.getCounty, {
            cityId: this.regionCity
          })
          .then(res => {
            if (res.data) {
              let ret = res.data.object;
              this.countyList = ret;
            }
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mechanismregAdd {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    header {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }
    .container-main {
      display: flex;
      flex-direction: column;
      width: 80%;
      margin: 0 auto;
      .number,
      .region,
      .address {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        .left {
          width: 200px;
          font-size: 20px;
          span:last-child {
            font-weight: 600;
          }
        }
      }
      .region {
        select {
          width: 100px;
          margin-right: 10px;
          outline: none;
          option {
            text-align: center;
          }
        }
      }
      .address {
        input {
          display: inline-block;
          width: 400px;
          border: 1px solid #ddd;
          border-radius: 4px;
          line-height: 30px;
          outline: none;
          background: #fff;
          text-indent: 5px;
        }
      }
      .save {
        width: 300px;

        display: flex;
        justify-content: space-between;
        margin: 20px auto;
        flex-direction: row;
        div {
          cursor: pointer;
          width: 100px;
          height: 40px;
          border-radius: 6px;
          border: 1px solid #c8c8c8;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
