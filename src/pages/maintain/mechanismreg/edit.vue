<template>
  <div class="mechanismregEdit">
    <div class="container">
      <!-- title -->
      <header>医院基本信息</header>
      <div class="container-main">
        <!-- 序号 -->
        <!-- <div class="number">
          <div class="left">
            <span>&nbsp;</span>
            <span>序号</span>
          </div>
          <p>{{ number }}</p>
        </div>-->
        <!-- 区域 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">*</span>
            <span>区域</span>
          </div>
          <!-- 省 -->
          <select v-model="regionProv" @change="provChange">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="item in provList">{{ item.name }}</option>
          </select>
          <!-- 市 -->
          <select v-model="regionCity" @change="cityChange">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="item in cityList">{{ item.city }}</option>
          </select>
          <!-- 县 -->
          <!-- <select v-model="regionCounty">
            <option value="-1">--请选择--</option>
            <option :value="item.id" v-for="item in countyList">{{ item.area }}</option>
          </select> -->
        </div>
        <!-- 机构名称 -->
        <div class="address">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构名称:</span>
          </div>
          <input type="text" placeholder="机构全称" v-model.trim="mechanismName">
        </div>
        <div class="address">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构地址:</span>
          </div>
          <input type="text" placeholder="机构地址" v-model.trim="hosAddr">
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
          <select v-model="mechanismType1">
            <option value="1">医院</option>
          </select>
        </div>
        <!-- 机构等级 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>机构等级</span>
          </div>
          <!-- 医院等级 -->
          <select v-model="mechanismGrade">
            <option :value="item.dictType" v-for="item in grade">{{ item.dictName }}</option>
          </select>
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
          <input type="text" placeholder="电话号码" v-model="phone">
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
export default {
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
      //机构全称
      mechanismName: "",
      //机构代码
      mechanismCode: "",
      //机构类型
      mechanismType1: "0",
      //机构等级
      mechanismGrade: "1",
      //联系人
      Contacts: "",
      //联系人电话
      phone: "",
      //城市列表
      provList: [],
      cityList: [],
      countyList: [],
      //医院等级 列表
      grade: [],
      hosAddr:"",
      hospitalId:""
    };
  },
  created() {
    this.getCity();
    this.getGrent();
  },
  mounted() {
    let id = this.$route.params.id;
    // let pageNo = this.$route.params.pargeNo;
    if (id) {
      this.$axios
        .post(api.mechanismregSearch, {
          hospitalId: id
        })
        .then(res => {
          if (res.data.code) {
            let ret = res.data.object;
            //省
            this.regionProv = ret.provinceCode;
            //市
            this.regionCity = ret.cityCode;
            //区
            this.regionCounty = ret.districtCode;
            // //机构全称
            this.mechanismName = ret.orgName;
            // //机构代码
            this.mechanismCode = ret.orgCode;
            // //机构类型
            this.mechanismType1 = ret.hospitalType;
            // //机构等级
            this.mechanismGrade = ret.grade;
            // //联系人
            this.Contacts = ret.linkman;
            // //联系人电话
            this.phone = ret.linkmanTelephone;
            // 地址
            this.hosAddr = ret.hosAddr
            // 医院ID
            this.hospitalId = ret.hospitalId;
            console.log(ret);
          } else {
            console.log(res);
          }
        });
    }
  },
  methods: {
    save() {
      let params = {
        // 省
        provinceCode: this.regionProv,
        // 市
        cityCode: this.regionCity,
        //县
        // districtCode: this.regionCounty,
        //机构全称
        orgName: this.mechanismName,
        //机构代码
        orgCode: this.mechanismCode,
        //机构类型
        hospitalType: this.mechanismType1,
        //机构等级
        grade: this.mechanismGrade,
        //联系人
        linkman: this.Contacts,
        //联系人电话
        linkmanTelephone: this.phone,
        // 地址
        hosAddr: this.hosAddr,
        // 医院Id
        id:this.hospitalId
      };
      if (
        this.regionProv == "-1" ||
        this.regionCity == "-1"
      ) {
        this.$Message.info("区域不能为空");
      } else if (this.mechanismName == "") {
        this.$Message.info("机构名称不能为空");
      } else if (this.mechanismCode =='') {
  this.$Message.info("组织机构代码不能为空");
      } else if (this.mechanismType1 =='-1') {
        this.$Message.info("机构类型不能为空");
      } else {
        this.$axios.post(api.mechanismregEdit,params).then(res => {
          if (res.data.code) {
            let ret = res.data;
            this.$Message.info("修改成功");
            let pageNo = this.$route.params.pageNo
            setTimeout(() => {
              this.$router.push({
                name:"mechanismreglist",
                params:{
                  pageNo
                }
              })
            },500)
          } else {
            this.$Message.info("修改失败请重试");
          }
        })
      }
      console.log(params);
    },
    back () {
      let pageNo = this.$route.params.pageNo
      this.$router.push({
        name:"mechanismreglist",
        params:{
          pageNo
        }
      })
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
          this.countyList = [];
          this.cityList = [];
          this.provChange(this.regionProv);
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
.mechanismregEdit {
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
          option {
            text-align: center;
          }
        }
      }
      .address {
        input {
          width: 400px;
          height: 25px;
          border: 1px solid #ddd;
          border-radius: 4px;
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
