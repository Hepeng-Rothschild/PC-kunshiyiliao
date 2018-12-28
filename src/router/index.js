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
			meta: {
				index: 0,
				title: "互联网医院管理系统"
			},
			redirect: '/index'
		},
		{
			path: '/index',
			name: 'home',
			meta: {
				index: 1,
				title: "互联网医院管理系统"
			},
			component: () => import('@/pages/index'),
			children: [
				//运营端路由
				operation.reviewList,
				operation.reviewEdit,
				operation.reviewreview,
				operation.registerList,
				operation.registerEdit,
				operation.registerDetail,
				operation.kindeditorTest,
				operation.uploaddemo,

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
				// 远程 门诊
				operation.remoteClinic,
				operation.remoteClinicEdit,
				operation.remoteClinicRoom,

				operation.doctorServerManageList,
				operation.doctorServerManageEdit,
				// 医生端运营内容管理
				operation.doctorContentCheckList,
				operation.doctorContentCheckListHelAdd,
				operation.doctorContentCheckListHelEdit,
				operation.doctorContentCheckListClsAdd,
				operation.doctorContentCheckListClsEdit,
				operation.doctorContentCheckListHotAdd,
				operation.doctorContentCheckListHotEdit,
				//订单管理
				operation.reservationOrders,
				//服务包管理
				operation.servicePackagePList,
				operation.servicePackagePAdd,
				operation.servicePackagePEdit,
				operation.servicePackageItemList,
				operation.servicePackageItemAdd,
				operation.servicePackageItemEdit,
				operation.servicePackageItemImportOne,
				operation.servicePackageItemImportTwo,
				operation.servicePackageItemImportThree,
				// 远程门诊
				operation.DoctorRemoteclinicList,
				operation.DoctorRemoteclinicEdit,
				operation.DoctorRemoteclinicAdd,
				// 远程门诊类型维护
				operation.doctorremoteClinicTypeList,
				operation.doctorremoteClinicTypeAdd,
				operation.doctorremoteClinicTypeEdit,
				// 医生远程门诊列表
				operation.doctorList,

				//运维端路由
				maintain.residentRegisterList,
				maintain.doctorRegisterList,
				maintain.doctorRegisterBatchOne,
				maintain.doctorRegisterBatchTwo,
				maintain.doctorRegisterBatchThree,
				// 机构注册信息
				maintain.mechanismregList,
				maintain.mechanismregAdd,
				maintain.mechanismregEdit,
				maintain.mechanismregBatchOne,
				maintain.mechanismregBatchTwo,
				maintain.mechanismregBatchThree,
				//系统管理
				maintain.adminList,
				maintain.adminAdd,
				maintain.adminReset,
				maintain.adminEdit,
				//疾病/症状管理
				maintain.diseaseList,
				maintain.diseaseEdit,
				maintain.symptomList,
				maintain.symptomEdit,

				//字典管理
				maintain.dictionary,
				//统计端路由
				statistics.reviewList,
				//监管端路由
				supervision.reviewList,

			]
		},
		{
			path: '/login',
			name: 'login',
			meta: {
				index: 1,
				title: "登陆"
			},
			component: () => import('@/pages/login')
		},
		{
			path: '*',
			name: '404',
			meta: {
				index: 1,
				title: "404 NOT FOUND"
			},
			component: () => import(/* webpackChunkName: 'not-found' */'@/pages/404')
		}
	]
});
