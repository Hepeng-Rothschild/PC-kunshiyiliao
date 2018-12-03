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
