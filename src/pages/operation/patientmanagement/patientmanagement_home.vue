<template>
	<div class='patient_management'>
		<!--头部搜索框-->
		<header>
			<div class='header_title'>
				<span></span>
				<input type="text" placeholder="手机号查询" v-model='phone' maxlength='11' />
			</div>
			<button @click='isearch'>确定</button>
		</header>
		<!--表格列表-->
		<table border="" cellspacing="" cellpadding="">
			<tr class='first_tr'>
				<th>序号</th>
				<th>微信号</th>
				<th>手机号</th>
				<th>姓名</th>
				<th>性别</th>
				<th>关系</th>
				<th>身份</th>
				<th>状态</th>
				<th>创建时间</th>
				<th>最近登录</th>
			</tr>
			<!--表格内容-->
			<tr v-for='item,index in tableList'>
				<th>{{ item.id }}</th>
				<th>{{ item.wx }}</th>
				<th>{{ item.phone }}</th>
				<th>{{ item.name }}</th>
				<th>{{ item.sex }}</th>
				<th>{{ item.nexus }}</th>

				<th v-show='item.ident=="实名"'>{{ item.ident }}</th>
				<th v-show='item.ident=="未实名"' style='color:red;'>{{ item.ident }}</th>

				<!--<th>{{ item.status }}</th>-->

				<th v-show='item.status == "正常"'>{{ item.status }}</th>
				<th v-show='item.status == "锁定"' style='color:red;'>{{ item.status }}</th>
				<th>{{ item.found }}</th>
				<th>{{ item.targetDate }}</th>
			</tr>
		</table>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				phone: "",
				manageList: [{
					id: "01",
					wx: "VX-0193947564323",
					phone: '13521336779',
					name: '王偶偶',
					sex: "男",
					nexus: "本人",
					ident: "实名",
					status: "锁定",
					found: "2018-10-09 14：50",
					targetDate: "2018-10-09"
				}],
				selected: 'all'
			}
		},
		methods: {
			isearch() {
				this.selected = this.phone;
			}
		},
		computed: {
			tableList() {
				if(this.selected == 'all') {
					return this.manageList
				} else {
					let len = this.selected.length
					return this.manageList.filter(item => {
						return item.phone.substr(0, len) == this.selected
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.patient_management {
		width: 100%;
		display: flex;
		flex-direction: column;
		header {
			display: flex;
			flex-direction: row;
			width: calc(100% - 60px);
			padding: 10px 30px;
			.header_title {
				width: 200px;
				height: 25px;
				line-height: 30px;
				border-radius: 20px;
				border: 1px solid black;
				display: flex;
				flex-direction: row;
				span {
					display:inline-block;
					width:20px;
					margin-top:2px;
					margin-left:5px;
					height:20px;
					background:url("../../../assets/images/search.png") no-repeat;
					background-size:100% 100%;
				}
				input {
					width: calc(100% - 32px);
					border: none;
					text-indent:5px;
					outline: none;
					background: none;
				}
			}
			button {
				padding: 0 8px;
				border: none;
				margin-top: 4px;
				height: 20px;
				background: none;
				outline: none;
				border: 1px solid black;
				border-radius: 8px;
				margin-left: 20px;
			}
		}
		table {
			width: 80%;
			margin: 0 auto;
			.first_tr {
				background: #bcbcbc;
			}
			tr {
				background: #fff;
				th {
					text-align: center;
				}
			}
		}
	}
</style>