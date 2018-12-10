<template>
	<div class="f_calssify">
		<div class='main'>
			<!--头部-->
			<header>
				<button @click='navto'>添加新分类</button>
			</header>
			<!--表布局-->
			<div class='tables'>
				<Table border :columns="columns1" :data="data1" @on-row-click='aa'></Table>
			</div>
			<!--分页器-->
			<div class = 'pages'>
				<Page :total = "100" />
			</div>
		</div>
	</div>
</template>

<script>
	import { Page, Table } from 'iview'
	export default {
		components: {
			Page,
			Table
		},
		created () {
//			console.log(this.$route.fullPath);
		},
		data() {
			return {
				columns1: [{
						title: '编号',
						key: 'id',
						align:'center'
					},
					{
						title: '功能模块',
						key: 'module',
						align:'center'
					},
					{
						title: '显示',
						key: 'ishow',
						align:'center'
					},
					{
						title: '支持类型',
						key: 'type',
						align:'center'
					},
					{
						title: '操作',
						key: 'c',
						align:'center'
					}
				],
				data1: [{
					id: '01',
					module: '最新资讯',
					ishow: '是',
					type: '文章',
					c: "编辑"
				}]
			}
		},
		methods: {
			navto() {
				this.$router.push({path: "/index/operation/newClassify"})
			},
			aa (index) {
				console.log(index);
			}
		}
	}
</script>

<style scoped lang="less">
	.f_calssify {
		width: 100%;
		.main {
			width: 80%;
			margin: 0 auto;
			header {
				width: 100%;
				height: 30px;
				margin: 10px 0;
				button {
					width: 100px;
					height: 25px;
					outline: none;
					border: none;
					color: #fff;
					background: #256ba9;
					border-radius: 6px;
				}
			}
			.tables {
				margin-bottom: 10px;
			}
			.pages {
				text-align: center;
			}
		}
	}
</style>