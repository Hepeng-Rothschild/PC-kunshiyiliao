<template>
	<div class='classify'>
		<!--添加新分类-->
		<div class='addcify'>
			<a href="###">添加新分类</a>
		</div>
		<!--内容分类-->
		<table border="" cellspacing="" cellpadding="">
		<!--内容选项-->
			<tr style='background:#f2f2f2;'>
				<th>编号</th>
				<th>专栏名称</th>
				<th>显示</th>
				<th>类型</th>
				<th>查看子分类</th>
				<th>编辑</th>
			</tr>
		<!--内容列表-->
			<tr v-for = 'item,index in classifyList'>
				<th>{{ item.id }}</th>
				<th>{{ item.zhuanlan }}</th>
				<th>{{ item.show }}</th>
				<th>{{ item.type }}</th>
				<th class = 'thparents'>
					<div class = 'search_list' v-show = 'flag'>
						<ul class = 'list' @click = 'flag = false'>
							<li v-for='items,index in item.childType'>{{ items.title }}</li>
						</ul>
					</div>
				</th>
				<th>
					 <Icon custom="i-icon i-icon-shop_fill" size="24" />
				</th>
			</tr>
		</table>
		<div class='pagesClassify'>
			<Page :total="100" />
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				flag:false,
				classifyList:[
					{
						id:'01',
						zhuanlan:'问诊就医-医师讲堂',
						show:"显示",
						type:"视频",
						childType:[
							{
								title:"医生说"
							},
							{
								title:"宝宝讲堂"
							},
							{
								title:'健康说'
							}
						]
					}
				]
			}
		}
	}
</script>

<style scoped lang="less">
	.classify {
		width: 100%;
		height: 100%;
		.addcify {
			width: 100%;
			height: 50px;
			background: #fff;
			border: 1px solid black;
			line-height: 50px;
			a {
				margin-left: 10px;
				padding: 3px 6px;
				background: #256ba9;
				border-radius: 4px;
				color: #fff;
			}
		}
		table {
			width: 80%;
			margin: 10px auto;
			tr {
				th {
					text-align: center;
					padding: 10px;
					img {
						display: blcok;
						width: 20px;
						height: 20px;
					}
				}
				.thparents{
					position:relative;
					.search_list {
						width:100px;
						position:absolute;
						top:50%;
						left:50%;
						.list {
							display:flex;
							flex-direction:column;
							text-align:center;
							background: rgba(255,0,0,.3);
							border:1px solid #944747;
							li{
								cursor: pointer;
							}
							li:hover{
								background: #7a8b99;
							}
						}
					}
				}
			}
		}
		.pagesClassify {
			width: 100%;
			text-align: center;
		}
	}
</style>