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
	      	redirect: '/index'
    	},
		{
			path: '/index',
			name:'home',
			component:()=>import('@/pages/home')
		},
		operation.reviewList,
		operation.reviewList1,
		operation.reviewList2,
		operation.reviewList3,
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
		maintain.reviewList,
		statistics.reviewList,
		supervision.reviewList,
  		{
		    path: '*',
		    name: '404',
	      	component: () => import(/* webpackChunkName: 'not-found' */'@/pages/404')
		}
  	]
});
