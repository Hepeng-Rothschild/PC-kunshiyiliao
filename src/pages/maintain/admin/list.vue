<template>
  <div class="adminList">
    <!-- 头部信息 -->
    <div class="container">
      <header>
        <div class="btn">
          <button style="background:skyblue;" @click = 'add'>添加账号</button>
        </div>
        <div class="search">
          <input type="text" placeholder="登录账号/用户姓名">
        </div>
      </header>
      <div class="list">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <th>编号</th>
            <th>登录账号</th>
            <th>用户姓名</th>
            <th>机构名称</th>
            <th>添加人</th>
            <th>联系方式（手机）</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
           <tr>
            <th>编号</th>
            <th>登录账号</th>
            <th>用户姓名</th>
            <th>机构名称</th>
            <th>添加人</th>
            <th>联系方式（手机）</th>
            <th>角色</th>
            <th>
                <span @click = 'edit' style = 'cursor:pointer;'>编辑</span>
                <span @click = 'reset' style = 'cursor:pointer;'>重置密码</span>
                <span style = 'cursor:pointer;'>删除</span>
            </th>
          </tr>
        </table>
        <div class="notData" v-show="!list.length">暂无更多数据</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    add () {
        this.$router.push({
            name:"adminadd"
        })
    },
    edit () {
        this.$router.push({
            name:'adminedit'
        })
    },
    reset () {
        this.$router.push({
            name:'adminreset'
        })
    }
  }
};
</script>
<style lang="less" scoped>
.adminList {
  margin-left: 1%;
  padding: 10px;
  width: 98%;
  background: #ffffff;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
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
          color: #fff;
          width: 128px;
          height: 39px;
          border-radius: 2px;
        }
      }
      .search {
        background-color: rgb(255, 255, 255);
        width: 276px;
        height: 32px;
        border-radius: 16px;
        border-width: 1px;
        border-color: rgb(102, 102, 102);
        border-style: solid;
        input {
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          text-decoration: none;
          border: none;
          outline: none;
          font-family: 微软雅黑;
          color: rgb(102, 102, 102);
          padding-left: 28px;
          width: 100%;
          line-height: 32px;
          background: none;
        }
      }
    }
    .list {
      width: 100%;
      margin: 10px 0;
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
      .notData {
        width: 100%;
        text-align: center;
        border: 1px solid #ddd;
        border-top: none;
        line-height:40px;
      }
    }
  }
}
</style>
