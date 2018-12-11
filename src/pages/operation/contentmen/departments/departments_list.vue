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
					<tr v-for = 'item,index in tableList'>
						<td>{{ addZero(index) }}</td>
						<td>{{ item.parentDept }}</td>
						<td>{{ item.childDept }}</td>
						<td>{{ item.deptNickname }}</td>
						<td>{{ item.display=='0'?'是':'否' }}</td>
						<td>{{ item.priority }}</td>
						<td class='ltd'>
							<span @click = 'navto(item)' style = 'cursor:pointer;'>编辑</span>
						</td>
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
				tableList:[
					{
						sum:"01",
						title:"内科",
						keshi2:"普通内科",
						yname:"普通内科",
						yuyue:"是",
						tese:"1"
					}
				],
				id:sessionStorage.getItem('hospitalId')
			}
		},
		mounted () {
			this.$axios.post(api.tesekeshi,{
				  "hospitalId": this.id,
				  "pageNo": 1,
				  "pageSize": 10
			}).then(res => {
				if (res.data) {
					let ret = res.data.object
					this.tableList =  ret.list
				}
			}).catch (err => {
				console.log(err)
			})
		},
		methods: {
			navto (item) {
				let id = item.id
				this.$router.push({
					name:"reviewlist25",
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