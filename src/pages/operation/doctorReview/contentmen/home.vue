<template>
	<div class = 'management1'>
		<header>
			<span>机构名称</span>
			<input type="text" placeholder="请输入医疗机构名称" />
			<button>查询</button>
		</header>
		<table border="" cellspacing="" cellpadding="">
			<tr>
				<th>编号</th>
				<th>区域</th>
				<th>联系人</th>
				<th>联系电话</th>
				<th>机构类型</th>
				<th>动态新闻</th>
				<th>专家介绍</th>
				<th>特色科室</th>
				<th>预约科室</th>
				<th>线上服务</th>
				<th>门诊服务</th>
				<th>住院服务</th>
				<th>上级医院</th>
				<th>操作</th>
			</tr>
			<tr v-for="item,index in tableList">
				<th>{{ item.id }}</th>
				<th>{{ item.quyu }}</th>
				<th>{{ item.jigou }}</th>
				<th>{{ item.jianjie }}</th>
				<th>{{ item.leixing }}</th>
				<th>{{ item.xinwen }}</th>
				<th>{{ item.zhuangjia }}</th>
				<th>{{ item.keshi }}</th>
				<th>{{ item.yuyue }}</th>
				<th>{{ item.xiangshang }}</th>
				<th>{{ item.menzhen }}</th>
				<th>{{ item.zhuyuan }}</th>
				<th>-</th>
				<th>
					<span @click = 'navto'>编辑</span>
				</th>
			</tr>
		</table>
	</div>
</template>

<script>
	import api from "@/api/commonApi";
	export default{
		data () {
			return {
				tableList :[
					{
						id:'01',
						quyu:"安徽省",
						jigou:"蚌埠中医院",
						jianjie:"大罗",
						leixing:"机构类型",
						xinwen:3,
						zhuanjia:3,
						keshi:"-",
						yuyue:"-",
						xiangshang:"-",
						menzhen:"-",
						zhuyuan:"-",
						yiyuan:"-",
					}
				]
			}
		},
		mounted () {

		},
		methods :{
			navto (item) {
				this.$router.push({
					name:"reviewlist10",
					params:{
						item
					}
				})
				sessionStorage.setItem('homeID',2);
			}
		}
	}
</script>

<style scoped lang = "less">
.management1{
	width:calc(100% - 60px);
	padding:0 30px;
	header{
		width:100%;
		display:flex;
		flex-direction:row;
		margin:20px 0;
		span{
			color:black;
			line-height:30px;
		}
		input{
			height:30px;
			outline:none;
			border:none;
			border-radius:0;
			border:1px solid black;
			margin:0 10px;
			text-indent:5px;
		}
		button{
			width:50px;
			height:30px;
			background: #3399ff;
			color:#fff;
			border-radius:3px;
			outline:none;
			border:none;
		}
	}
	table{
		width:100%;
		margin:0 auto;
		tr{
			th{
				text-align:center;
				span{
					cursor:pointer;
					user-select:none;
				}
			}
		}
	}
}
</style>