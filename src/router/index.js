import Vue from 'vue';
import Router from 'vue-router';
import operation from './operation/operation';
import maintain from './maintain/maintain';
import statistics from './statistics/statistics';
import supervision from './supervision/supervision';
Vue.use(Router);

export default new Router({
	mode: 'hash',
  	routes: [
		{
			path: '/',
			meta:{
				title:"互联网医院管理系统"
			},
	      	redirect: '/index/operation/index'
    	},
		{
			path: '/index',
			name:'home',
			meta:{
				title:"互联网医院管理系统"
			},
			component:()=>import('@/pages/index'),
			redirect:'/index/operation/index',
			children:[
				//运营端路由
				operation.reviewList,
				operation.reviewList1,
				operation.reviewList2,
				operation.reviewList3,
				operation.kindeditorTest,

				//运维端路由
				maintain.reviewList,
				maintain.reviewList4,
			    maintain.reviewList5,
			    maintain.reviewList6,
			    maintain.reviewList7,
			    maintain.reviewList8,
			    maintain.reviewList9,
			    maintain.reviewList10,
			    maintain.reviewList11,
			    maintain.reviewList12,
			    maintain.reviewList13,
			    maintain.reviewList14,
			    maintain.reviewList15,
			    maintain.reviewList16,
			    maintain.reviewList17,
			    maintain.reviewList18,
			    maintain.reviewList19,
			    maintain.reviewList20,
			    maintain.reviewList21,
			    maintain.reviewList22,
			    maintain.reviewList23,
			    maintain.reviewList24,
			    maintain.reviewList25,
				//统计端路由
				statistics.reviewList,
				//监管端路由
				supervision.reviewList,
			]
		},
		{
			path: '/login',
			name:'login',
			meta:{
				title:"登陆"
			},
			component:()=>import('@/pages/login')
		},
  		{
		    path: '*',
		    name: '404',
	      	component: () => import(/* webpackChunkName: 'not-found' */'@/pages/404')
		}
  	]
});
