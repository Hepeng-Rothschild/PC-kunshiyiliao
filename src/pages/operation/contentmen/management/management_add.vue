<template>
  <!--服务管理-->
  <div class="addManagement">
    <tmpHeader/>
    <div class="addManag">
      <!-- <h3>添加服务</h3> -->
      <div class="fuwu">
        <!--线上服务-->
        <div class="xsfw" v-for="(item,index) in allMenuList" :key='index'>
          <h2 style='font-weight:bold;'>{{ item.menuName }}</h2>
          <!--第一行-->
          <div class="select_wufu" >
            <div v-for="(items,index) in item.dtoList" :key='index' style='margin:5px 0;'>
                <Checkbox v-model="items.flag" style='width:90px;' @on-change='flagChange(items)'>{{ items.menuName }}</Checkbox>
                <div>
                  <span style='min-width:80px;'>是否支付：</span>
                  <iSwitch v-model="items.ipay" @on-change='ipayChange(items)'/>
                </div>
                <div v-show='items.flag'>
                  <span style='min-width:80px;'>支付方式：</span>
                  <CheckboxGroup v-model="items.paytype"  v-show='paymentList.length' >
                    <Checkbox v-for="item in paymentList" :label='item.id' :key='item.id'>{{ item.paymentTypeName +' ' + item.paymentChannelName }}</Checkbox>
                  </CheckboxGroup>
                  <span v-show='!paymentList.length' style='color:gray;'>暂无支付方式</span>
                </div>
                
            </div>
          </div>
        </div>
      </div>
      <!--保存-->
      <div class="expert_save">
        <Button type="primary" @click="save">保存</Button>
        <Button @click="$router.back()">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import tmpHeader from "@/pages/operation/contentmen/tmpHeader";
import api from "@/api/commonApi";
export default {
  data() {
    return {
      allMenuList: [],
      id: sessionStorage.getItem("hospitalId"),
      // 支付方式列表
      paymentList: [],
    };
  },
  components: {
    tmpHeader
  },
  created() {
    let breadList = [
      { path: "/index", title: "首页" },
      {
        path: "/index/operation/mechanism/index",
        title: "机构运营"
      },
      {
        path: "/index/operation/home",
        title: "机构管理"
      }
    ];
    this.$emit("changeBreadList", breadList);
    this.loadingHospitalId();
  },
  methods: {
    save() {
      let menuList = []
      // 循环出已经选择的服务
      this.allMenuList.forEach(item => {
        item.dtoList.forEach(i => {
          if(Boolean(i.flag)) {
            let obj = {
              menuId: i.id,
              ipay: Number(i.ipay).toString(),
              paytype: ""
            }
            if(i.ipay) {
              obj.paytype = i.paytype.join(",")
            }
            menuList.push(obj);
          }
        })
      })
      console.log("请求参数",menuList);
      let flag = false;
      menuList.forEach(items => {
        if (!Boolean(items.paytype) && Boolean(Number(items.ipay))) {
          flag = true
        }
      })
      if(flag) {
        this.$Message.error('请选择勾选服务的支付方式')
        return ""
      }
      this.$axios
        .post(api.setserver, {
          hospitalId: this.id,
          menuList
        })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$Message.info("修改成功");
            setTimeout(() => {
              this.functionJS.paramsNavgationTo(this, "serviceManagement", {
                // 公用方法
              }); 
            }, 500);
          } else {
            this.$Message.error("修改失败,请重试");
          }
        })
    },
    // 是否支付 开关
    ipayChange (row) {
      if(!row.ipay) {
        row.paytype = []
        row.ipay = false
      }
    },
    // 服务是否开启
    flagChange (row) {
      if(!row.flag) {
        row.paytype = [];
        row.ipay = false
      }
    },
    // 加载医院支付方式列表
    loadingHospitalId () {
        this.$axios.post(api.querylist, {
            hospitalId:this.id
        }).then(res => {
            if(res.data.success) {
                let ret = res.data.object;
                ret.forEach(item => {
                  item.id = String(item.id)
                })
                this.paymentList = ret || []
                
                console.log('支付方式列表', ret);
            } else {
                this.$Message.error("加载医院支付方式列表失败,请重试")
            }
        })
    },
    // 加载服务列表
    loadingManagementList (){
      this.$axios
      .post(api.getServer, {
        hospitalId: this.id
      })
      .then(res => {
        if (res.data.success) {
          let ret = res.data.object;
          // 循环出已经选中的服务
          ret.forEach(item => {
            item.dtoList.forEach(i => {
              i.flag = Boolean(i.selected);
              i.ipay = Boolean(Number(i.ipay))
              i.paytype = Boolean(i.paytype) ? i.paytype.split(',') : []
            })
          })
          console.log(ret);
          this.allMenuList = ret;
        } else {
          this.$Message.error("加载医院服务失败")
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.loadingManagementList(); 
  },
};
</script>

<style scoped lang="less">

.addManagement {
  width: calc(100% - 20px);
  padding: 10px 30px;
  margin: 0 auto;
  background: #fff;
  .addManag {
    display: flex;
    flex-direction: column;
    padding: 20px;
    .fuwu {
      width: calc(100% - 100px);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgb(242, 242, 242);
      .xsfw {
        margin: 10px 0;
        .select_wufu {
          margin: 5px 30px;
          padding: 14px 20px;
          font-size:12px;
          div {
            // width: 100%;
            margin:0 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
          }
        }
      }
    }
    .expert_save {
      width: 200px;
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>