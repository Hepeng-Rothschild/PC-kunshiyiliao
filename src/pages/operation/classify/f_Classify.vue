<template>
  <div class="f_calssify">
    <div class="main">
      <!--头部-->
      <header>
        <button @click="navto">添加新分类</button>
      </header>
      <!--表布局-->
      <div class="tabList">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>编号</td>
            <td>功能模块</td>
            <td>显示</td>
            <td>支持类型</td>
            <td>操作</td>
          </tr>
          <tr v-for="item,index in list" v-show="list.length">
            <td>{{ addZero(1)}}</td>
            <td>功能模块</td>
            <td>显示</td>
            <td>支持类型</td>
            <td @click="change(item)" style="cursor:pointer;">编辑</td>
          </tr>
        </table>
        <div class="footer" v-show="!list.length">暂无更多数据</div>
      </div>
      <!--分页器-->
      <div style = 'text-align:center;margin:10px 0;'>
			<Page :total="classifySize"  @on-change = 'pageChange'/>
		</div>
    </div>
  </div>
</template>

<script>
import { Page, Table } from "iview";
export default {
  components: {
    Page,
    Table
  },
  created() {
  },
  data() {
    return {
      classifySize: 10,
      list: [
		  {
          id: "01",
          module: "最新资讯",
          ishow: "是",
          type: "文章",
          c: "编辑"
        }
	  ]
    };
  },
  methods: {
    navto() {
      this.$router.push({
        path: "/index/operation/newClassify"
      });
    },
    pageChange (index) {
	  
	},
	change () {
		this.$router.push({
			name:"addClassify"
		})
	},
	addZero (num) {
		num = num + 1
		if (num < 10) {
			return '0' + num
		}
		return num
	}
  }
};
</script>

<style scoped lang="less">
.f_calssify {
  width: 100%;
  .main {
    width: 80%;
    margin: 0 auto;
    header {
      width: 100%;
      height: 30px;
      margin: 10px 0;
      button {
        width: 100px;
        height: 25px;
        outline: none;
        border: none;
        color: #fff;
        background: #256ba9;
        border-radius: 6px;
      }
    }
    .tabList {
      width: 80%;
      margin: 20px auto;
      table {
        width: 100%;
          border: 1px solid #dddee1;

         tr:nth-child(odd) {
          background: #f8f8f9;
        }
        tr:nth-child(even) {
          background: #fff;
        }
        tr:not(:first-child):hover {
          background: #ebf7ff;
        }
        tr {
            border: 1px solid #dddee1;
            height:40px;

          td {
            text-align: center;
          }
          td.none {
            display: none;
          }
        }
      }
      .footer {
        width: 100%;
        text-align: center;
        border: 1px solid black;
        border-top: none;
      }
    }

    .pages {
      text-align: center;
    }
  }
}
</style>