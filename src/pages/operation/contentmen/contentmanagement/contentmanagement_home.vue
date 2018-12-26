<template>
  <div class="contentHome">
    <!--标题-->
    <!--选择类型-->
    <div class="homeSelect">
      <!--类型选择-->
      <div class="selectType">
        <span>类型</span>
        <select name="type" v-model="type1">
          <option value="" selected>全部</option>
          <option value="1">文章</option>
          <option value="">视频</option>
        </select>
      </div>
      <!--发布选择-->
      <div class="selectType">
        <span>状态</span>
        <select name="type" v-model="type2">
          <option value="" selected>全部</option>
          <option value="0">未发布</option>
          <option value="1">已发布</option>
        </select>
      </div>
      <!--搜索输入-->
      <div class="search">
        <input type="text" placeholder="文章名称" v-model.trim="val">
      </div>
      <!--搜索按钮-->
      <button class="submit" @click="btn">搜索</button>
      <button class="submit" @click="add">新增</button>
    </div>
    <!--表格-->
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th>序号</th>
        
        <th>标题</th>
        <th>类型</th>
        <th>栏目</th>
        <th>状态</th>
        <th>阅读量</th>
        <th>收藏量</th>
        <th>排序</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="item,index in tableList" v-show="tableList.length">
        <th>{{ addZero(index) }}</th>
      
        <!-- 标题 -->
        <th>{{ item.title }}</th>
        <!-- 类型 -->
        <th v-show="item.type == 1">文章</th>
        <th v-show="item.type != 1">视频</th>
        <!-- 栏目 -->
        <th>{{ item.columnName || '' }}</th>
        <!-- 状态 -->
        <th style="color:red;" v-show="item.enable == 0">未发布</th>
        <th v-show="item.enable == 1">已发布</th>
        <!-- 阅读量 -->
        <th>{{ item.readAmount }}</th>
        <!-- 收藏量 -->
        <th>{{ item.countFollow}}</th>
          <!-- 排序 -->
        <th>{{ item.priority }}</th>
        <th>{{ item.updateTime }}</th>
        <th class="modi">
          <span style="color: black;cursor:pointer" @click="changeItem(item)">修改</span>
          <span
            v-show="item.enable == 0"
            style="color: red;cursor:pointer"
            @click="bottomShelf(item,index)"
          >上架</span>
          <span
            v-show="item.enable == 1"
            style="color: black;cursor:pointer"
            @click="topShelf(item,index)"
          >下架</span>
          <span style="color: black;cursor:pointer" @click="roof(item,index,$event)">置顶</span>
        </th>
      </tr>
    </table>
    <div class="footer" v-show="!tableList.length">暂无更多数据</div>
    <!--分页器-->
    <div class="paging">
      <Page :total="contentSize" @on-change="pageChange" :current = 'pageNo'/>
    </div>
    <!--info-->
    <div class="info" v-show="flag">
      <h3>提示</h3>
      <p>确定{{ content }}?</p>
      <div class="info_tishi">
        <span @click="flag = false">否</span>
        <span>是</span>
      </div>
    </div>
    <Modal v-model="modal1" title="提示" @on-ok="ok" @on-cancel="cancel">
      <p>确定{{ content }}?</p>
    </Modal>
  </div>
</template>

<script>
import { Page } from "iview";
import api from "@/api/commonApi";
export default {
  components: {
    Page
  },
  data() {
    return {
      modal1: false,
      currentIndex: -1,
      type1: "",
      type2: "",
      allSelect: "null",
      val: '',
      flag: false,
      content: "",
      tableList: [],
      arr1: [],
      len: 10,
      contentSize: 10,
      pageNo:1
    };
  },
  mounted() {
    let pageNo = this.$route.params.pageNo;
    if (pageNo) {
      this.pageNo = pageNo
    }
    this.getContentData(this.pageNo);
  },
  methods: {
    add() {
      this.$router.push({
        name: "contentmanagementAdd",
        params:{
          pageNo:this.pageNo
        }
      })
    },
    getContentData(pageNo, val,type,enable) {
      let params = {
        pageNo,
        pageSize: 10
      };
      if (Boolean(val)) {
        params.title = val;
      }
      if (Boolean(type)) {
        params.type = Number(type);
      }
      if (Boolean(enable)) {
        params.enable = Number(enable);
      }
      this.$axios.post(api.contentWrap, params).then(res => {
        if (res.data.code) {
          let ret = res.data.object;
          this.contentSize = ret.count;
          this.tableList = ret.list;
        }
      });
    },
    homeBtn() {
      this.$router.push({
        name: "contentmanagementAdd",
        params:{
          pageNo:this.pageNo
        }
      });
    },
    pageChange(index) {
      this.pageNo = index
      this.getContentData(index, this.val,this.type1,this.type2);
    },
    //关键字查询列表
    btn() {
      let type1 = this.type1;
      let type2 = this.type2;
      if (type1 == null) {
          type1 = ''
      }
      if (type2 == null) {
        type2 =''
      }
      this.getContentData(1, this.val,type1,type2);
    },
    // 下架
    bottomShelf(item, index) {
      this.$axios
        .post(api.upWrap, {
          ids: [item.articleId],
          idelete: 0
        })
        .then(res => {
          if (res.data.code) {
            item.idelete = 0;
            this.$Message.info("操作成功");
          }
        });
    },
    // 上架
    topShelf(item, index) {
      this.$axios
        .post(api.upWrap, {
          ids: [item.articleId],
          idelete: 1
        })
        .then(res => {
          if (res.data.code) {
            item.idelete = 1;
            this.$Message.info("操作成功");
          }
        });
    },
    //置顶
    roof(item, index, event) {
      this.$axios
        .post(api.root, {
          priority: 1,
          id: item.articleId
        })
        .then(res => {
          if (res.data.code) {
            this.tableList.splice(index, 1);
            this.tableList.unshift(item);
            this.$Message.info("置顶成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //根据ID修改对应的新闻资讯
    changeItem(item) {
      let id = item.articleId;
      // console.log(item);
      this.$router.push({
        name: "createNews",
        params: {
          id,
          pageNo:this.pageNo
        }
      });
    },
    //模态框
    ok() {
      let a = this.tableList[this.currentIndex];
    },
    cancel() {},
    addZero(num) {
      num = num + 1;
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }
  },
  watch: {
    type1: {
      deep: true,
      handler(val) {
        this.allSelect = val;
      }
    },
    type2: {
      deep: true,
      handler(val) {
        this.allSelect = val;
      }
    }
  }
};
</script>

<style scoped lang = "less">
.contentHome {
  width: 100%;
  height: auto;
  margin: 0 auto;
  position: relative;
  background: #fff;
  height: 100vh;
  /*提示*/
  .info {
    width: 200px;
    height: 100px;
    background: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    border-radius: 10px;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    border: 1px solid black;
    .info_tishi {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        display: inline-block;
        width: 40%;
        height: 30px;
        line-height: 30px;
        background: palevioletred;
        border-radius: 5px;
        color: black;
        margin: 0 5%;
      }
    }
  }
  /*标题*/
  .contentHomeTitle {
    width: 100%;
    padding-left: 20px;
    background: #ccc;
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid black;
    .homeBtn {
      text-align: center;
      width: 100px;
      height: 40px;
      color: #fff;
      line-height: 40px;
      float: right;
      margin-top: 5px;
      background: red;
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-right: 30px;
      outline: none;
    }
  }
  /*类型*/
  .homeSelect {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .selectType {
      width: 200px;
      select {
        width: 80px;
      }
      span {
        margin-right: 15px;
      }
    }
    .search {
      width: 200px;
      border-radius: 10px;
      border: 1px solid black;
      background: #fff;
      input {
        border: none;
        outline: none;
        text-indent: 1em;
        background: none;
      }
    }
    .submit {
      background: dodgerblue;
      padding: 5px 20px;
      border: none;
      outline: none;
      color: #fff;
    }
  }
  /*表单*/
  table {
    width: calc(100% - 60px);
    padding: 0 30px;
    margin: 0 auto;
    border: 1px solid #dddee1;

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
      border-top: 1px solid #dddee1;
      th {
        text-align: center;
        height: 40px;
        .modi {
          a {
            color: black;
          }
          span {
            cursor: pointer;
          }
        }
      }
      .red {
        color: red;
      }
    }
  }
  .footer {
    width: calc(100% - 60px);
    border: 1px solid #ddd;
    line-height: 40px;
    margin: 0 auto;
    border-top: none;
    text-align: center;
  }
  /*分页器*/
  .paging {
    width: 100%;
    margin: 10px auto;
    text-align: center;
  }
}
</style>