<template>
	<div class = 'expert'>
		<!--列表-->
		<tmpHeader />
		<!--添加专家/搜索-->
		<div class = 'iheader'>
			
			<div>
				<span></span>
				<input type="text"placeholder="已开通服务" />
			</div>
			<button @click = 'navto'>添加服务</button>
		</div>
		<!--表格列表-->
		<div class="main" v-show = 'tablesList.length'>
			<table border="" cellspacing="" cellpadding="">
				<tr>
					<th>编号</th>
					<th>服务分类</th>
					<th>已开通服务</th>
					<th>操作</th>
				</tr>
				<tr v-for='item,index in tablesList'>
					<th>{{ addZero(index) }}</th>
					<th>{{ item.menuName }}</th>
					<th>
						<span v-for = 'items in item.result'>{{ items }}、</span>
					</th>
					<th @click = 'navto(item)'  style = 'cursor:pointer;'>编辑</th>
				</tr>
			</table>
		</div>
		
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/doctorReview/contentmen/tmpHeader'
	import api from "@/api/commonApi";
	export default{
		components: {
			tmpHeader
		},
		data () {
			return {
				tablesList:[]
			}
		},
		mounted () {
			this.$axios.post(api.server_,{
				  "hospitalId": 82,
			}).then(res => {
				let ret = res.data.object;
				console.log(ret);
				this.tablesList = ret;
			})
		},
		methods:{
			navto (item) {
				this.$router.push({
					name:"reviewlist16"
				})
				console.log(item)
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
			height:30px;
			border:1px solid black;
			display:flex;
			flex-direction: row;
			border-radius:20px;
				span{
					display:inline-block;
					width:20px;
					margin-left:5px;
					margin-top:4px;
					height:20px;
					background:url("../../../../assets/images/search.png") no-repeat;
					background-size:100% 100%;
				}
			input{
				border:none;
				outline:none;
				text-indent:10px;
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