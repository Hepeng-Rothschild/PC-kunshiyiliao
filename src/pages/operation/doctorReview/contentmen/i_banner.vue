<template>
	<!--Banner-->
	<div class = 'iBanner'>
		<div class = 'ibanner_main'>
			<tmpHeader />
			<div class = 'ibanner_header'>
				<div class = 'header_input'>
					<span>
						<!--<Icon type=" i-icon i-icon-shop_fill" size="24" />-->
					</span>
					<input type="text" placeholder = '名称' />
				</div>
				<button @click = 'navto'>添加Banner</button>
			</div>
			<div class = 'tabList'>
				<table border="" cellspacing="" cellpadding="">
					<tr>
						<td>序号</td>
						<td>名称</td>
						<td>轮播图</td>
						<td>链接</td>
						<td>显示</td>
						<td>排序</td>
						<td>操作</td>
					</tr>
					<tr v-for = 'item,index in tbleList'>
						<td>{{ item.id }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.banner }}</td>
						<td>{{ item.lianjie }}</td>
						<td>{{ item.ishow }}</td>
						<td>{{ item.isort }}</td>
						<td>编辑</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import tmpHeader from '@/pages/operation/doctorReview/contentmen/tmpHeader';
	import { Icon } from 'iview'
	export default{
		components:{
			tmpHeader,
			Icon
		},
		data () {
			return {
				tbleList:[
					{
						id:'01',
						name:"医院大图",
						banner:"小图",
						lianjie:"www.baidu.com",
						ishow:"是",
						isort:"1"
					}
				]
			}
		},
		methods: {
			navto () {
				this.$router.push({
					name:"reviewlist18"
				})
			}
		}
	}
</script>


<style lang="less" scoped >
.iBanner{
	width:100%;
	.ibanner_main{
		display:flex;
		flex-direction:column;
		.ibanner_header{
			width:80%;
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
			width:80%;
			margin:20px auto;
			table{
				width:100%;
				tr:first-child{
					background:#e4e4e4 ;
				}
				tr{
					td{
						text-align:center;
					}
				}
			}
		}
	}
}
</style>