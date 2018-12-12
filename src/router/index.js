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
				operation.contentmanagementHome,
			    operation.contentmanagementAdd,
			    operation.addClassify,
			    operation.newClassify,
			    operation.patientManagement,
			    operation.operationHome,
			    operation.homeInfo,
			    operation.operationNews,
			    operation.operationExpert,
			    operation.serviceManagement,
			    operation.newsEdit,
			    operation.expertAdd,
			    operation.managementAdd,
			    operation.iBanner,
			    operation.bannerAdd,
			    operation.iKeshi,
			    operation.medicineAdd,
			    operation.medicineEdit,
			    operation.kDepartment,
			    operation.bookingofficeEdit,
			    operation.tKeshi,
			    operation.departmentsList,
			    operation.c6,
			    operation.createdNews,
			    operation.addBanner,
			    operation.createNews,
				operation.d_createdNews,
				operation.expert_edit,
				// 医生端运营内容管理
				operation.contentCheckList,
				operation.contentCheckListAdd,
				operation.contentCheckListEdit,

				//运维端路由
				maintain.residentRegisterList,					
				maintain.doctorRegisterList,
					// 机构注册信息
				maintain.mechanismregList,
				maintain.mechanismregAdd,
				maintain.mechanismregEdit,
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
