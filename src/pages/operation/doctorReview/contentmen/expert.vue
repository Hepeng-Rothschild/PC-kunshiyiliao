<template>
	<div class = 'expert'>
		<!--列表-->
		<tmpHeader />
		<!--添加专家/搜索-->
		<div class = 'iheader'>
			<button @click = 'navto'>添加专家</button>
			<div>
				<img src="" alt="" />
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
					<th>{{ item.name }}</th>
					<th>{{ item.tushi }}</th>
					<th>{{ item.zhicheng }}</th>
					<th>{{ item.zhiwu }}</th>
					<th>{{ item.techang }}</th>
					<th>{{ item.jianjie }}</th>
					<th @click = 'navto'>查看</th>
				</tr>
			</table>
		</div>
		
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/doctorReview/contentmen/tmpHeader'
	export default{
		components:{
			tmpHeader
		},
		data () {
			return {
				tablesList:[
					{
						id:'01',
						name:"龙静",
						tushi:"心内科",
						zhicheng:"主任医师",
						zhiwu:"无",
						techang:"XXXX",
						jianjie:"XXX",
					},
					{
						id:'01',
						name:"龙静",
						tushi:"心内科",
						zhicheng:"主任医师",
						zhiwu:"无",
						techang:"XXXX",
						jianjie:"XXX",
					},
					{
						id:'01',
						name:"龙静",
						tushi:"心内科",
						zhicheng:"主任医师",
						zhiwu:"无",
						techang:"XXXX",
						jianjie:"XXX",
					},
					{
						id:'01',
						name:"龙静",
						tushi:"心内科",
						zhicheng:"主任医师",
						zhiwu:"无",
						techang:"XXXX",
						jianjie:"XXX",
					}
					
				]
			}
		},
		methods:{
			navto() {
				this.$router.push({
					name:"reviewlist15"
				})
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
			height:30px;
			border:1px solid black;
			border-radius:20px;
			input{
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