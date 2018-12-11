<template>
	<div class = 'management1'>
		<header>
			<span>机构名称</span>
			<input type="text" placeholder="请输入医疗机构名称" v-model = 'val' />
			<button @click = 'search'>查询</button>
		</header>
		<table border="" cellspacing="" cellpadding="">
			<tr>
				<th>编号</th>
				<th>区域</th>
				<th>机构名称</th>
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
				<th>操作</th>
			</tr>
			<tr v-for="item,index in tableList" v-show = 'tableList.length'>
				<th>{{ addZero(index) }}</th>
				<th>{{ item.provinceName }}</th>
				<th>{{ item.orgName }}</th>
				<th>{{ item.linkman }}</th>
				<th>{{ item.linkmanTelephone }}</th>
				<th>{{ item.grade }}</th>
				<th>{{ item.newsCount }}</th>
				<th>{{ item.doctorCount }}</th>
				<th>{{ item.specialDeptCount }}</th>
				<th>{{ item.reservationCount }}</th>
				<th>{{ item.onlineCount }}</th>
				<th>{{ item.inqCount }}</th>
				<th>{{ item.hospitalCount }}</th>
				<th>
					<span @click ='navto(item)'>编辑</span>
				</th>
			</tr>
		</table>
		<div class = 'footer' v-show = '!tableList.length'>暂无更多数据</div>
		<div style = 'text-align:center;margin:10px 0;'>
			<Page :total="homeSize"  @on-change = 'pageChange'/>
		</div>
	</div>
</template>

<script>
	import api from "@/api/commonApi";
	import { Page } from 'iview'
	export default {
		components: {
				Page
		},
		data () {
			return {
				tableList :[],
				val:"",
				homeSize:10
			}
		},
		mounted () {
			this.getDate(1);
		},
		methods :{
			getDate (pageNo) {
				this.$axios.post(api.management, {
					pageNo,
					pageSize:10
				}).then(res => {
					if (res.data) {
						let ret = res.data.object.list;
						this.homeSize = res.data.object.count
						this.tableList = ret
					}
				}).catch(err => {
					console.log(err);
				})
			},
			pageChange (index) {
				this.getDate(index);
			},
			navto (item) {
				sessionStorage.setItem('hospitalId',item.hospitalId);
				this.$router.push({
					name:"homeInfo",
				})
			},
			search () {
				this.$axios.post(api.management, {
					pageNo:1,
					pageSize:10,
					orgName:this.val
				}).then(res => {
					if (res.data) {
						let ret = res.data.object.list;
						this.tableList = ret
					}
				}).catch(err => {
					console.log(err);
				}) 
			},
			addZero (num) {
				num = num + 1;
				if (num < 10) {
					return '0' + num
				}
				return num 
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
	.footer{
		width:100%;
		text-align:center;
		border:1px solid black;
		border-top:none;
	}
}
</style>