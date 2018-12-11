<template>
	<div class = 'news'>
		<!--头部选择-->
		<tmpHeader />
		<!--搜索/创建-->
		<div class = 'headeri'>
			<div>
				<span></span>
				<input type = "text" placeholder = "新闻标题" v-model = 'search' @keyup="press"/>
			</div>
			<button @click = 'add'>创建新闻</button>
		</div>
		<!--表格列表-->
		<div class="main" v-show = 'changeDown.length'>
			<table border="" cellspacing="" cellpadding="">
				<tr>
					<th>编号</th>
					<th>新闻标题</th>
					<th>首图</th>
					<th>新闻来源</th>
					<th>是否显示</th>
					<th>是否置顶</th>
					<th>操作</th>
				</tr>
				<tr v-for='(item,index) in changeDown' :key='index'>
					<th>{{ item.sum }}</th>
					<th>{{ item.title }}</th>
					<th>
						<img :src = "(item.newsHeadlines=='' || item.newsHeadlines == null)? '' :fileBaseUrl + item.newsHeadlines" alt = "" style='margin:10px 0;width:100px;height:50px;'/>
					</th>
					<th>{{ item.source}}</th>
					<!--是否显示-->
					<th>{{ item.enable === 1 ? '是':'否' }}</th>
					<!--是否置顶-->
					<th>{{ item.priority ==1 ? '是' : '否' }}</th>
					<th @click='navto(item)' :data-id = 'item.id' :date-id="changeDown">
						<span style = 'cursor:pointer;' :data-id = 'item.id'>查看</span>
					</th>
				</tr>
			</table>
		</div>
		<!--底部空表格-->
		<footer v-show = '!changeDown.length'>
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
	import { Switch } from 'iview';
	import tmpHeader from '@/pages/operation/contentmen/tmpHeader';
	import api from "@/api/commonApi";
	import axios from "axios";
	export default {
		components: {
			iswitch:Switch,
			tmpHeader
		},
		mounted () {
	       this.$nextTick(()=>{
		       	axios.post(api.news,{
		       		hospitalId:this.id,
		       		pageNo:1,
		       		pageSize:10
		       	}).then(res => {
					   if (res.data) {
							let ret = res.data.object.list;
							ret.forEach((item,index) => {
								item.sum = this.addZero(index);
							})
							console.log(res);
							this.tablesList = ret 
					   }
					   console.log(res);
		       	}).catch(err => {
		       		console.log(err)
		       	})
	       })
       	},
		data () {
			return {
				switch1: false,
				tablesList :[],
				search:"",
				id:sessionStorage.getItem('hospitalId')
			}
		},
		methods: {
            change (status) {
                // this.$Message.info('开关状态：' + status);
            },
        	navto (item) {
//      		console.log(item.id)
        		let id = item.id
        		this.$router.push({
        			name:"newsEdit",
        			params:{
        				id
        			}
        		})
        	},
        	add () {
        		this.$router.push({
        			name:"d_createdNews"
        		})
        	},
	        addZero (num) {
				num = num + 1;
				if (num < 10){
					return '0' + num
				}
				return num
			},
	        press () {
	        	console.log(this.search);
	        }
      },
      computed: {
      	changeDown () {
      		let arr = [];
      		if (this.search === '') {
      			return this.tablesList
      		} else {
      			for(let i = 0;i < this.tablesList.length;i++){
      				if (this.tablesList[i].title.indexOf(this.search) != -1) {
      					arr.push(this.tablesList[i]);
      				}
      			}
      		}
      		return arr
      	}
      }
      
	}
</script>

<style scoped lang="less">
.news{
	width:100%;
	.headeri{
		width:90%;
		display:flex;
		margin:0 auto;
		flex-direction: row;
		justify-content: space-between;
		span{
			display:inline-block;
			width:20px;
			margin-left:8px;
			margin-top:5px;
			height:20px;
			background:url("../../../../assets/images/search.png") no-repeat;
			background-size:100% 100%;
		}
		button{
			width:80px;
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
			border-radius:15px;
			border:1px solid black;
			width:200px;
			height:30px;
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