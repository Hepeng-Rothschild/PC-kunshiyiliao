<template>
	<div class = 'news'>
		<!--头部选择-->
		<tmpHeader />
		<!--搜索/创建-->
		<div class = 'headeri'>
			<button @click = 'navto'>创建新闻</button>
			<div>
				<img src="" alt="" />
				<input type = "text" placeholder = "新闻标题"/>
			</div>
		</div>
		<!--表格列表-->
		<div class="main">
			<table border="" cellspacing="" cellpadding="">
				<tr>
					<th>编号</th>
					<th>新闻标题</th>
					<th>首图</th>
					<th>新闻内容</th>
					<th>新闻来源</th>
					<th>是否显示</th>
					<th>是否置顶</th>
					<th>操作</th>
				</tr>
				<tr v-for='item,index in tablesList'>
					<th>{{ item.id }}</th>
					<th>{{ item.title }}</th>
					<th>{{ item.newImg }}</th>
					<th>{{ item.content }}</th>
					<th>{{ item.source}}</th>
					<th>是
						 <!--<iswitch v-model="switch1" @on-change="change" size="small"/>-->
					</th>
					<th>{{ item.zhiding }}</th>
					<th @click='navto'>查看</th>
				</tr>
			</table>
		</div>
		<!--底部空表格-->
		<footer>
			<table border="" cellspacing="" cellpadding="">
				<tr>
					<th>编号</th>
					<th>新闻标题</th>
					<th>首图</th>
					<th>新闻内容</th>
					<th>新闻来源</th>
					<th>是否显示</th>
					<th>是否置顶</th>
					<th>操作</th>
				</tr>
			</table>
			<div class='fooDiv'>没有数据</div>
		</footer>
	</div>
</template>

<script>
	import { Switch } from 'iview'
	import tmpHeader from '@/pages/operation/doctorReview/contentmen/tmpHeader'
	export default{
		components: {
			iswitch:Switch,
			tmpHeader
		},
		data () {
			return {
				switch1: false,
				tablesList :[
					{
						id:"01",
						title:"政府买单",
						newImg:"龙静",
						content:"XXXXXX",
						source:"国家政策",
						ishow:"true",
						zhiding:"否",
					},
					{
						id:"01",
						title:"政府买单",
						newImg:"龙静",
						content:"XXXXXX",
						source:"国家政策",
						ishow:"true",
						zhiding:"否",
					},
					{
						id:"01",
						title:"政府买单",
						newImg:"龙静",
						content:"XXXXXX",
						source:"国家政策",
						ishow:"true",
						zhiding:"否",
					},
					{
						id:"01",
						title:"政府买单",
						newImg:"龙静",
						content:"XXXXXX",
						source:"国家政策",
						ishow:"true",
						zhiding:"否",
					},
					{
						id:"01",
						title:"政府买单",
						newImg:"龙静",
						content:"XXXXXX",
						source:"国家政策",
						ishow:"true",
						zhiding:"否",
					}
				]
			}
		},
		methods: {
            change (status) {
                this.$Message.info('开关状态：' + status);
            },
            	navto () {
            		this.$router.push({
            			name:"reviewlist14"
            		})
            	}
        }
	}
</script>

<style scoped lang="less">
.news{
	width:100%;
	.headeri{
		width:100%;
		display:flex;
		flex-direction: row;
		justify-content: space-between;
		button{
			width:150px;
			height:30px;
			margin-left:20px;
			text-align:center;
			line-height:30px;
			border:none;
			outline:none;
			background: #00BFFF;
			color:#fff;
			border-radius:6px;
		}
		div{
			display:flex;
			flex-direction:row;
			border-radius:10px;
			border:1px solid black;
			width:300px;
			height:30px;
			margin-right:20px;
			input{
				border:none;
				outline:none;
				background: none;
				width:100%;
				height:30px;
				line-height:30px;
				text-indent:5px;
			}
		}
	}
	.main{
		width:calc(100% - 40px);
		margin:10px auto;
		padding:0 20px;
		table{
			width:100%;
			tr{
				th{
					text-align:center;
				}
			}
			tr:first-child{
				background: #e4e4e4;
			}
		}
	}
	footer{
		width:calc(100% - 40px);
		margin:10px auto;
		padding:0 20px;
		table{
			width:100%;
			tr{
				th{
					text-align:center;
				}
			}
			tr:first-child{
				background: #e4e4e4;
			}
		}
		.fooDiv{
			width:100%;
			border:1px solid black;
			border-top-color: transparent;
			text-align:center;
		}
	}
}
</style>