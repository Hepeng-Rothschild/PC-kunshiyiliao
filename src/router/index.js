import Vue from 'vue';
import Router from 'vue-router';
import operation from './operation';
import maintain from './maintain';
import statistics from './statistics';
import supervision from './supervision';
import netease from './netease';
import chat from './chat';

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
			component: () => import(/* webpackChunkName: 'index' */'@/pages/index'),
			children: [
				{
					path: 'test',
					name: 'test',
					meta: {
						index: 1,
						title: 'test'
					},
					component: () => import(/* webpackChunkName: 'rsa' */'@/pages/testRsa')
				},
				{
					path: 'test_jump',
					name: 'test_jump',
					meta: {
						index: 2,
						title: 'test_jump'
					},
					component: () => import(/* webpackChunkName: 'rsa' */'@/pages/testRsa/jump')
				},
				//运营端路由
				operation.doctorManagement,
				operation.reviewList,
				operation.reviewEdit,
				operation.reviewreview,
				operation.registerList,
				operation.registerNormalEdit,
				operation.registerSegmentationEdit,
				operation.registerNormalDetail,
				operation.registerSegmentationDetail,
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
				// 远程门诊
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
				// 医生端讲堂 点播
				operation.liveMantList,
				operation.liveMantAdd,
				operation.liveMantEdit,
				operation.broadAdd,
				// 讲堂审核
				operation.physicianAudit,
				operation.physicianAuditSee,
				//订单管理
				operation.ordersManagement,
				operation.reservationOrders,
				operation.contractManagement,
				operation.remoteClinicOrders,
				operation.remoteClinicOrdersDetail,
				//服务包管理
				operation.servicePackagePList,
				operation.servicePackagePAdd,
				operation.servicePackagePEdit,
				operation.servicePackagePDetail,
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
				// 医生远程门诊列表
				operation.doctorList,
				// 服务包管理
				operation.servicePackagePindex,
				operation.servicePackageList,
				operation.servicePackageEdit,

				operation.versionManagementList,
				operation.versionManagementAdd,
				operation.versionManagementEdit,
				// 公众号管理
				operation.publicHostingIndex,
				operation.publicAddressList,
				operation.wxBannerList,
				operation.wxBannerAdd,
				operation.wxBannerEdit,
				// 微信公众号模板
				operation.templateHome,
				operation.typeManagement,
				operation.wxopeningmanagement,
				//档案管理
				operation.fileManagementList,
				// 系统管理/菜单管理
				operation.wxSystemManagement,
				operation.wxSystemManagementAdd,
				operation.wxSystemManagementEdit,
				operation.wxSystemManagementAddFn,

				//患者端运营
				operation.patientOperation,
				//机构运营
				operation.mechanismOperation,

				//索引管理
				maintain.indexManagementIndex,
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
				maintain.systemManagementIndex,
				maintain.adminList,
				maintain.adminAdd,
				maintain.adminReset,
				maintain.adminEdit,
				maintain.adminJurisdiction,
				// 权限管理
				maintain.jurisdictionList,
				maintain.jurisdictionAdd,
				//接口权限管理
				maintain.interfacePermiseList,
				maintain.interfacePermiseEdit,
				// 菜单管理
				maintain.menuManagementList,
				maintain.menuManagementEdit,
				//疾病/症状管理
				maintain.diseaseList,
				maintain.diseaseEdit,
				maintain.symptomList,
				maintain.symptomEdit,
				maintain.starClass,

				//配置仓
				maintain.configurationWarehouseIndex,
				//字典管理
				maintain.dictionary,
				//敏感词
				maintain.sensitiveWordEdit,

				//统计端路由
				statistics.reviewList,
				//监管端路由
				supervision.reviewList,

				//网易云信
				netease.session,
				netease.sysmsgs,
				netease.chat,
				netease.chathistory,
				netease.room,
				netease.roomChat,
				netease.contacts,
				netease.namecard,
				netease.namecardremark,
				netease.searchuser,
				netease.teaminvite,
				netease.general,
				netease.teamlist,
				netease.teamcard,
				netease.teammanage,
				netease.teamsetting,
				netease.teammembers,
				netease.teammembercard,
				netease.teamSendMsgReceipt,
				netease.msgReceiptDetail,

				chat.teamList,
				chat.teamChat,
				chat.teamHistory,

			]
		},
		{
			path: '/login',
			name: 'login',
			meta: {
				index: 1,
				title: "登陆"
			},
			component: () => import(/* webpackChunkName: 'login' */'@/pages/login')
		},
		{
			path: '/public',
			name: 'publicmodel',
			meta: {
				index: 1,
				title: "公共平台"
			},
			component: () => import(/* webpackChunkName: 'rsa' */'@/pages/public/index'),
			redirect: '/public/index',
			children: [
				{
					path: 'index',
					name: 'publicIndex',
					meta: {
						index: 1,
						title: '提示'
					},
					component: () => import(/* webpackChunkName: 'rsa' */'@/pages/public/notice')
				}
			]
		},
		{
			path: '*',
			name: '404',
			meta: {
				index: 1,
				title: "404 NOT FOUND"
			},
			component: () => import(/* webpackChunkName: 'not-found' */'@/pages/public/404')
		}
	]
});
