<template>
  <div class="mechanismregAdd">
    <div class="container">
      <!-- title -->
      <header>医院基本信息</header>
      <div class="container-main">
        <!-- 序号 -->
        <div class="number">
          <div class="left">
            <span>&nbsp;</span>
            <span>序号</span>
          </div>
          <p>{{ number }}</p>
        </div>
        <!-- 区域 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">*</span>
            <span>区域</span>
          </div>
           <!-- 省 -->
          <select v-model = 'regionProv' @change = 'provChange'>
            <option value="-1">--请选择--</option>
            <option :value = 'item.id' v-for = 'item in provList'>{{ item.name }}</option>
          </select>
          <!-- 市 -->
          <select v-model= 'regionCity' @change = "cityChange">
            <option value="-1">--请选择--</option>
            <option :value = 'item.id' v-for = 'item in cityList'>{{ item.city }}</option>
          </select>
          <!-- 县 -->
          <select v-model = 'regionCounty'>
            <option value="-1">--请选择--</option>
            <option :value = 'item.id' v-for = 'item in countyList'>{{ item.area }}</option>
          </select>
        </div>
        <!-- 详细地址 -->
        <div class="address">
          <div class="left">
            <span style = 'color:red;'>*</span>
            <span>详细地址:</span>
          </div>
          <input type="text" placeholder = '' v-model = 'address'>
        </div>
        <!-- 机构名称 -->
        <div class="address">
          <div class="left">
            <span style = 'color:red;'>*</span>
            <span>机构名称:</span>
          </div>
          <input type="text" placeholder = '机构全称' v-model = 'mechanismName'>
        </div>
        <!-- 机构组织编码 -->
        <div class="address">
          <div class="left">
            <span style = 'color:red;'>*</span>
            <span>机构组织编码:</span>
          </div>
          <input type="text" placeholder = '医疗组织机构代码' v-model ='mechanismCode'>
        </div>
        <!-- 机构类型 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">*</span>
            <span>机构类型</span>
          </div>
          <!-- 医院 -->
          <select v-model = 'mechanismType1'>
            <option value = '1'>医院</option>
          </select>
          <!-- 公立 -->
          <select v-model = 'mechanismType2'>
            <option value = '1'>公立</option>
          </select>
        </div>
        <!-- 机构等级 -->
        <div class="region">
          <div class="left">
            <span style="color:red;">&nbsp;</span>
            <span>机构等级</span>
          </div>
          <!-- 医院等级 -->
          <select v-model = 'mechanismGrade'>
            <option value = '1'>三级甲等</option>
          </select>
        </div>
        <!-- 机构电话 -->
        <div class="address">
          <div class="left">
            <span style = 'color:red;'>&nbsp;</span>
            <span>机构电话:</span>
          </div>
          <input type="text" placeholder = '' v-model = 'mechanismPhone'>
        </div>
        <!-- 机构联系人 -->
        <div class="address">
          <div class="left">
            <span style = 'color:red;'>&nbsp;</span>
            <span>机构联系人:</span>
          </div>
          <input type="text" placeholder = '姓名' v-model = 'Contacts'>
        </div>
        <!-- 联系人电话 -->
        <div class="address">
          <div class="left">
            <span style = 'color:red;'>&nbsp;</span>
            <span>联系人电话:</span>
          </div>
          <input type="text" placeholder = '电话号码' v-model = 'phone'>
        </div>
        <!-- 保存 -->
        <div class = 'save'>
            <div style = 'background:#fff;' @click = '$router.back()'>取消</div>
            <div style = 'background:#4dd3d2;color:#fff;' @click = 'save'>提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/commonApi";
export default {
    data () {
        return {
            // 序号
            number:'010101020312',
            // 省
            regionProv:'-1',
            // 市
            regionCity:'-1',
            //县
            regionCounty:'-1',
            //详细地址
            address:"",
            //机构全称
            mechanismName:"",
            //机构代码
            mechanismCode:"",
            //机构类型
            mechanismType1:"1",
            //公私
            mechanismType2:"1",
            //机构等级
            mechanismGrade:"1",
            //机构电话
            mechanismPhone:"",
            //联系人
            Contacts:"",
            //联系人电话
            phone:"",
            //城市列表
            provList:[],
            cityList:[],
            countyList:[]
        }
    },
    mounted () {
      //获取省级信息
      this.getCity();
    },
    methods: {
        save () {
            let params = {
                number:this.number,
                // 省
                regionProv:this.regionProv,
                // 市
                regionCity:this.regionCity,
                //县
                regionCounty:this.regionCounty,
                //详细地址
                address:this.address,
                //机构全称
                mechanismName:this.mechanismName,
                //机构代码
                mechanismCode:this.mechanismCode,
                //机构类型
                mechanismType1:this.mechanismType1,
                //公私
                mechanismType2:this.mechanismType2,
                //机构等级
                mechanismGrade:this.mechanismGrade,
                //机构电话
                mechanismPhone:this.mechanismPhone,
                //联系人
                Contacts:this.Contacts,
                //联系人电话
                phone:this.phone
            }
            console.log(params);
        },
      
         // 获取省级
        getCity () {
            this.$axios.post(api.getCity).then(res => {
              if (res.data) {
                let ret = res.data.object;
                this.provList = ret;
              }
            })
        },
        // 省级改变获取市级
        provChange () {
          let list = this.provList
          let len = list.length
          if (list != -1) {
            for (let i = 0;i < len;i++) {
                if (list[i].id == this.regionProv) {
                  this.cityList = list[i].cityList
                }
            }
          }
        },
        //市级改变获取县级
        cityChange () {
          if (this.regionCity != -1) {
            this.$axios.post(api.getCounty,{
              "cityId": this.regionCity
            }).then(res => {
              if (res.data) {
                let ret = res.data.object;
                this.countyList = ret
              }
            })
          }
        }
    }
}
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
          margin-right:10px;
          option {
            text-align: center;
          }
        }
      }
      .address{
          input{
              width:400px;
              height:25px;
              border:1px solid black;
              outline:none;
              background:#fff;
              text-indent: 5px;
          }
      }
      .save{
          width:300px;
          
          display:flex;
          justify-content: space-between;
          margin:20px auto;
          flex-direction:row;
          div{
              cursor:pointer;
              width:100px;
              height:40px;
              border-radius:6px;
              border:1px solid #c8c8c8;
              text-align:center;
              line-height:40px;
          }
      }
    }
  }
}
</style>
