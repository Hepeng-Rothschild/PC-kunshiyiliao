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
		<!-- <div>
			<Page :total="managementSize"  @on-change = 'pageChange'/>
		</div>		 -->
		
	</div>
</template>

<script>
//服务管理
	import tmpHeader from '@/pages/operation/contentmen/tmpHeader'
	import api from "@/api/commonApi";
	import { Page } from 'iview'
	export default{
		components: {
			tmpHeader
		},
		data () {
			return {
				tablesList:[],
				id:sessionStorage.getItem('hospitalId')
				// managementSize:10
			}
		},
		mounted () {
			this.getManagementData()
		},
		methods: {
			//分页器改变
			pageChange (index) {
				this.getManagementData(index);
			},
			navto (item) {
				this.$router.push({
					name:"managementAdd"
				})
			},
			addZero (num) {
				num = num + 1;
				if (num < 10){
					return '0' + num
				}
				return num
			},
			getManagementData () {
				this.$axios.post(api._server, {
					"hospitalId": this.id
				}).then(res => {
					if (res.data) {
						let ret = res.data.object;
						this.tablesList = ret;
					}
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