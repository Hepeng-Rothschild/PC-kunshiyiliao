<template>
	<div class = 'k_department'>
		<tmpHeader />
		<div class="k_department-main">
			<!--搜索框-->
			<header>
				<div>
					<span></span>
					<input type="text" placeholder="一级科室二级科室" />
				</div>
			</header>
			<!--列表-->
			<div class="tabList">
				<table border="" cellspacing="" cellpadding="">
					<tr>
						<th>序号</th>
						<th>一级科室</th>
						<th>二级科室</th>
						<th>科室就诊位置</th>
						<th>是否显示</th>
						<th>排序</th>
						<th>操作</th>
					</tr>
					<tr v-for = 'item,index in tableList'>
						<td>{{ addZero(index) }}</td>
						<td>{{ item.parentDept }}</td>
						<td>{{ item.childDept }}</td>
						<td>{{ item.address }}</td>
						<td>{{ item.display !=1? '是' :'否' }}</td>
						<td>{{ item.priority }}</td>
						<td class='ltd' @click = 'navto(item)'>编辑</td>
					</tr>
				</table>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/contentmen/tmpHeader';
	import api from "@/api/commonApi";
	export default{
		components:{
			tmpHeader
		},
		data () {
			return {
				tableList:[],
				id:sessionStorage.getItem('hospitalId')
			}
		},
		methods:{
			navto (item) {
				let id = item.id
				this.$router.push({
					name:"reviewlist23",
					params:{
						id
					}
				})
			},
			addZero (num) {
				num = num + 1;
				if (num < 10){
					return '0' + num
				}
				return num
			}
		},
		mounted () {
			this.$axios.post(api.k_department,{
				  "childDept": "",
				  "hospitalId": this.id,
				  "id": 0,
				  "pageNo": 1,
				  "pageSize": 10,
				  "parentyDept": ""
			}).then(res => {
				let ret = res.data.object
				if (ret) {
					this.tableList = ret.list
				}
				
			})
		}
	}
</script>

<style scoped lang="less">
.k_department{
	width:100%;
	.k_department-main{
		width:80%;
		margin:0 auto;
		header{
			width:100%;
			display:flex;
			flex-direction:row;
			margin:20px 0;
			div{
				border-radius:20px;
				border:1px solid black;
				display:flex;
				flex-direction:row;
				align-items:center;
				span{
					display:inline-block;
					width:20px;
					margin-left:5px;
					height:20px;
					background:url("../../../../assets/images/search.png") no-repeat;
					background-size:100% 100%;
				}
				input{
					text-indent: 5px;
					height:30px;
					outline:none;
					background:none;
					border:none;
					border-radius:0;
					margin:0 10px;
				}
			}
		}
		.tabList{
			width:100%;
			margin:20px 0;
			table{
				width:100%;
				tr:first-child{
					background:rgb(228, 228, 228);
				}
				tr{
					td{
						text-align:center;

					}
					.ltd{
						color:blue;
						user-select:none;
						cursor: pointer;
					}
					th{
						text-align:center;
					}
				}
			}
		}
	}
}



</style>