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
				index:0,
				title:"互联网医院管理系统"
			},
	      	redirect: '/index'
    	},
		{
			path: '/index',
			name:'home',
			meta:{
				index:1,
				title:"互联网医院管理系统"
			},
			component:()=>import('@/pages/index'),
			children:[
				//运营端路由
				operation.reviewList,
				operation.reviewEdit,
				operation.reviewreview,
				operation.registerList,
				operation.registerEdit,
				operation.registerDetail,
				operation.kindeditorTest,
				operation.uploadFile,

				operation.reviewList4,
			    operation.reviewList5,
			    operation.reviewList6,
			    operation.reviewList7,
			    operation.reviewList8,
			    operation.reviewList9,
			    operation.reviewList10,
			    operation.reviewList11,
			    operation.reviewList12,
			    operation.reviewList13,
			    operation.reviewList14,
			    operation.reviewList15,
			    operation.reviewList16,
			    operation.reviewList17,
			    operation.reviewList18,
			    operation.reviewList19,
			    operation.reviewList20,
			    operation.reviewList21,
			    operation.reviewList22,
			    operation.reviewList23,
			    operation.reviewList24,
			    operation.reviewList25,
			    operation.c6,
			    operation.createdNews,
			    operation.addBanner,
			    operation.createNews,
				operation.d_createdNews,
				operation.expert_edit,

				//运维端路由
				maintain.reviewList,
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
				index:1,
				title:"登陆"
			},
			component:()=>import('@/pages/login')
		},
  		{
		    path: '*',
			name: '404',
			meta:{
				index:1,
				title:"404 NOT FOUND"
			},
	      	component: () => import(/* webpackChunkName: 'not-found' */'@/pages/404')
		}
  	]
});
