<template>
  <div class="Institutionalregistration">
    <div class="container">
      <!-- 头部信息 -->
      <header>
        <div class="btn">
          <button @click = 'batch'>批量导入</button>
          <button @click = 'add'>新增机构</button>
        </div>
        <div class="search">
          <Input v-model.trim="Name" placeholder="机构名称" style="width: 300px" @on-keyup='nameChange'/>
        </div>
      </header>
      <!-- 列表 -->
      <div class="list">
        <table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <th>编号</th>
            <th>城市</th>
            <th>机构名称</th>
            <th>机构类型</th>
            <th>机构编码</th>
            <th>机构等级</th>
            <th>联系人姓名</th>
            <th>联系电话</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
          <tr v-for = 'item,index in list'>
            <th>{{ addZero(index) }}</th>
            <th>{{ item.city }}</th>
            <th>{{ item.hospitalName }}</th>
            <th>{{ item.internetHospital == '0'? '企业' :'医院' }}</th>
            <th>{{ item.orgCode }}</th>
            <th>{{ item.grade }}</th>
            <th>{{ item.linkman }}</th>
            <th>{{ item.linkmanTelephone }}</th>
            <th>{{ item.enable == '0'? '关闭' :'入驻'}}</th>
            <th>{{ item.createTime }}</th>
            <th>
              <span style = 'cursor:pointer' @click = 'edit(item)'>编辑</span>
              <!-- <span style = 'cursor:pointer'>删除</span> -->
              <span style = 'cursor:pointer' @click = 'enable(item)'>{{ item.enable == '0'? '启用' :'停用' }}</span>
            </th>
          </tr>
        </table>
        <div class = 'notData' v-show = '!list.length'>暂无更多数据</div>
      </div>
      <!--分页器-->
		<div class = 'paging'>
			<Page :total = "doctorregisterSize" @on-change = 'pageChange' :current='pageNo'/>		
		</div>
    </div>
  </div>
</template>
<script>
// 机构注册信息
import api from "@/api/commonApi";
import { Page } from "iview";
export default {
  data() {
    return {
      doctorregisterSize: 10,
      list: [],
      Name: "",
      pageNo:1
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
  mounted () {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = pageNo
    }
    this.getMechanismreg(this.pageNo);
  },
  methods: {
    //停用/启用
    enable (item) {
      let id = item.id;
      let enable = 0;
      if (!item.enable) {
        enable = 1;
      }
      this.$axios.post(api.mechanismregEnable, {
        enable,
        id
      }).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          item.enable = enable;
          this.$Message.info('修改成功');
        }
      })
    },
    batch () {
      this.$router.push({
        name:"mechanismregeditbatchone"
      })
    },
    nameChange() {
     this.getMechanismreg(1, this.Name);
    },
    pageChange (index) {
      this.pageNo = index;
      if (this.Name) {
        this.getMechanismreg(this.pageNo, this.Name);
      } else {
        this.getMechanismreg(this.pageNo);
      }
    },
    add () {
      this.$router.push({
        name:"mechanismregadd",
        params:{
          pageNo:this.pageNo
        }
      })
    },
    edit (item) {
      let id = item.id;
      this.$router.push({
        name:"mechanismregedit",
        params:{
          id,
          pageNo:this.pageNo
        }
      })
    },
    getMechanismreg (pageNo,name) {
      let params = {
          pageNo,
          pageSize:10
      }
      if (name != '') {
        params.searchKey = name
      }
      this.$axios.post(api.mechanismregList, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object
          this.doctorregisterSize = ret.count
          this.list = ret.list;
        }
      })
    },
    addZero (num) {
      num = num + 1
      if (num < 10) {
        return '0' + num
      }
      return num 
    }
  },
  components: {
    Page
  }
};
</script>
<style lang="less" scoped>
.Institutionalregistration {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    .paging{
      width:100%;
      margin:10px auto;
      text-align:center;
    }
    header {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .btn {
        button {
          border: none;
          outline: none;
          color: #FFF;
          background: skyblue;
          width: 128px;
          height: 39px;
          border-radius: 2px;
        }
      }
    }
    .list {
      width: 100%;
      margin:10px 0;
      table {
        width: 100%;
        border:1px solid #ddd;
         tr:nth-child(odd) {
          background: #f8f8f9;
        }
        tr:nth-child(even) {
          background: #fff;
        }
        tr:not(:first-child):hover {
          background: #9dcae4;
        }
        tr {
          border-top:1px solid #ddd;
          height:40px;
          th {
            text-align: center;
          }
        }
      }
      .notData{
        width:100%;
        text-align:center;
        border:1px solid #ddd;
        line-height: 40px;
        border-top:none;
        
      }
    }
  }
}
</style>