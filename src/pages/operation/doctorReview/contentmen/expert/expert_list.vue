<template>
	<div class = 'expert'>
		<!--列表-->
		<tmpHeader />
		<!--添加专家/搜索-->
		<div class = 'iheader'>
			<button @click = 'navto'>添加专家</button>
			<div>
				<span></span>
				<!--<img src="" alt="" />-->
				<input type="text"placeholder="专家姓名" />
			</div>
		</div>
		<!--表格列表-->
		<div class="main">
			<table border="" cellspacing="" cellpadding="">
				<tr>
					<th>编号</th>
					<th>专家姓名</th>
					<th>专家科室</th>
					<th>职称</th>
					<th>职务</th>
					<th>专业特长</th>
					<th>个人简介</th>
					<th>操作</th>
				</tr>
				<tr v-for='item,index in tablesList'>
					<th>{{ item.id }}</th>
					<th>{{ item.doctorName }}</th>
					<th>{{ item.deptType }}</th>
					<th>{{ item.title }}</th>
					<th>{{ item.title }}</th>
					<th>{{ item.title }}</th>
					<th>{{ item.personalIntroduction }}</th>
					<th @click = 'edit'>编辑</th>
				</tr>
			</table>
		</div>
		
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/doctorReview/contentmen/tmpHeader';
	import api from "@/api/commonApi";
	export default{
		components:{
			tmpHeader
		},
		data () {
			return {
				tablesList:[]
			}
		},
		created () {
			this.$axios.post(api.zj,{
				  "hospitalId": 87,
				  "pageNo": 1,
				  "pageSize": 10
			}).then(res => {
				console.log(res.data);
				if (res.data.object) {
					this.tablesList = res.data.object.list
				}
			}).catch (err => {
				console.log(err)
			})
		},
		methods:{
			navto () {
				this.$router.push({
					name:"reviewlist15"
				})
			},
			edit () {
				this.$router.push({
					name:"expert_edit"
				})
			},
			addZero (num) {
				num = num + 1;
				if (num < 10){
					return '0' + num
				}
				return num
			}
		}
	}
</script>

<style scoped lang="less">
.expert{
	width:100%;
	.iheader{
		width:90%;
		margin:20px auto;
		display:flex;
		flex-direction:row;
		justify-content: space-between;
		
		button{
			border:none;
			outline:none;
			background:#00BFFF;
			color:#fff;
			border-radius:6px;
			padding:5px 16px;	
		}
		div{
			width:200px;
			/*flex:1;*/
			height:30px;
			border:1px solid black;
			border-radius:20px;
			display:flex;
			flex-direction: row;
			span{
				display:inline-block;
				width:20px;
				margin-left:5px;
				margin-top:4px;
				height:20px;
				background:url("../../../../../assets/images/search.png") no-repeat;
				background-size:100% 100%;
			}
			input{
				width:calc(200px - 20px);
				border:none;
				outline:none;
				text-indent:5px;
				line-height:30px;
				background:none;
			}
		}
	}
	.main{
		width:90%;
		margin:0 auto;
		table{
			width:100%;
			tr:first-child{
				background: #f2f2f2;
			}
			tr{
				th{
					text-align:center;
				}
			}
		}
	}
}
</style>