<template>
	<div class="i_keshi">
		<tmpHeader />
		<!--搜索-->
		<div class = 'i-keshi_main'>
			<div class = 'ibanner_header'>
				<div class = 'header_input'>
					<span></span>
					<input type="text" placeholder = '一级科室/二级科室' />
				</div>
			</div>
			<!--列表-->
			<div class="tabList">
				<table border="" cellspacing="" cellpadding="">
					<tr>
						<th>序号</th>
						<th>一级科室</th>
						<th>二级科室</th>
						<th>院内科室</th>
						<th>显示</th>
						<th>排序</th>
						<th>操作</th>
					</tr>
					<tr v-for = 'item,index in tableList' v-show = 'tableList.length'>
						<td>{{ addZero(index) }}</td>
						<td>{{ item.parentDept }}</td>
						<td>{{ item.childDept }}</td>
						<td>{{ item.deptNickname }}</td>
						<td>{{ item.display == '0'?'是':'否' }}</td>
						<td>{{ item.priority }}</td>
						<td class='ltd'>
							<span @click = 'navto(item)' style = 'cursor:pointer;'>编辑</span>
						</td>
					</tr>
				</table>
				<div class="footer"  v-show = '!tableList.length'>暂无更多数据</div>
			</div>
		</div>
		<div style = 'text-align:center;margin:10px 0;'>
			<Page :total="departmentsSize"  @on-change = 'pageChange'/>
		</div>
	</div>
</template>

<script>
// 特色科室
	import tmpHeader from '@/pages/operation/contentmen/tmpHeader';
	import api from "@/api/commonApi";
	import { Page } from 'iview'
	export default{
		components:{
			tmpHeader,
			Page
		},
		data () {
			return {
				tableList:[],
				id:sessionStorage.getItem('hospitalId'),
				departmentsSize:10
			}
		},
		mounted () {
			this.getDepartmentsData(1);
		},
		methods: {
			// 分页器,切换事件
			pageChange (index) {
				this.getDepartmentsData(index);
			},
			navto (item) {
				let id = item.id
				this.$router.push({
					name:"departmentsList",
					params:{
						id
					}
				})
			},
			addZero (num) {
				if (num < 9 ){
					return '0' + num
				}
				return num
			},
			getDepartmentsData (pageNo) {
				this.$axios.post(api.tesekeshi,{
					"hospitalId": this.id,
					pageNo,
					"pageSize": 10
				}).then(res => {
					if (res.data) {
						let ret = res.data.object
						this.tableList =  ret.list
						this.departmentsSize = ret.count
					}
				}).catch (err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="less">
.i_keshi{
	width:100%;
	.i-keshi_main{
		width:80%;
		margin:0 auto;
		.ibanner_header{
			width:100%;
			margin:0 auto;
			display:flex;
			flex-direction:row;
			justify-content: space-between;
			.header_input{
				width:200px;
				border-radius:15px;
				border:1px solid black;
				height:30px;
				display:flex;
				flex-direction:row;
				span{
					display:inline-block;
					width:20px;
					margin-top:5px;
					margin-left:5px;
					height:20px;
					background:url("../../../../assets/images/search.png") no-repeat;
					background-size:100% 100%;
				}
				input{
					
					border:none;
					outline:none;
					background: none;
					text-indent:5px;
				}
			}
			button{
				padding:6px 8px;
				background: #716bb2;
				color:#ffb2b2;
				border:none;
				outline:none;
				border-radius:4px;
			}
		}
		.tabList{
			width:100%;
			margin:20px 0;
			.footer{
				width:100%;
				border:1px solid black;
				border-top:none;
				text-align:center;
			}
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