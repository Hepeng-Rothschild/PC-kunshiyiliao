// 订单管理
const ordersManagement = { //订单管理
	path: 'operation/ordersmanagement/index',
	name: 'ordersManagement',
	meta: {
		index: 1,
		title: '订单管理'
	},
	redirect: '/index/operation/orders/reservation/list'
}
const reservationOrders = { //预约挂号订单
	path: 'operation/orders/reservation/list',
	name: 'reservationOrders',
	meta: {
		index: 2,
		title: '预约挂号订单管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement-reservation' */"@/pages/operation/orders/reservation/list")
}
const remoteClinicOrders = { //远程门诊订单
	path: 'operation/orders/remoteClinic/list',
	name: 'remoteClinicOrders',
	meta: {
		index: 2,
		title: '远程门诊订单管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement-remoteclinic' */"@/pages/operation/orders/remoteClinic/list")
}
const remoteClinicOrdersDetail = { //远程门诊订单详情
	path: 'operation/orders/remoteClinic/detail',
	name: 'remoteClinicOrdersDetail',
	meta: {
		index: 3,
		title: '远程门诊订单详情'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement-remoteclinic' */"@/pages/operation/orders/remoteClinic/detail")
}
// 家医签约管理
const contractManagement = {
	path: 'operation/contractManagement/list',
	name: 'contractManagement',
	meta: {
		index: 2,
		title: '家医签约管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-ordersmanagement-contractmanagement' */"@/pages/operation/contractManagement/list")
}

//医生端运营
const doctorManagement = {
	path: 'operation/doctorManagement/index',
	name: 'doctorManagement',
	meta: {
		index: 1,
		title: '医生端运营'
	},
	redirect:'/index/operation/doctorreview/list'
}
const reviewList = {
	path: 'operation/doctorreview/list',
	name: 'reviewlist',
	meta: {
		index: 2,
		title: '医生认证'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-doctorreview' */"@/pages/operation/doctorReview/list")
}
const reviewEdit = {
	path: 'operation/doctorreview/edit',
	name: 'reviewedit',
	meta: {
		index: 3,
		title: '医生信息编辑'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-doctorreview' */"@/pages/operation/doctorReview/edit")
}
const reviewreview = {
	path: 'operation/doctorreview/review',
	name: 'reviewreview',
	meta: {
		index: 3,
		title: '医生认证审核'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-doctorreview' */"@/pages/operation/doctorReview/review")
}
const registerList = {
	path: 'operation/register/list',
	name: 'registerlist',
	meta: {
		index: 2,
		title: '医生排班列表'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/register/list")
}
const registerNormalEdit = {
	path: 'operation/register/normaledit',
	name: 'registerNormalEdit',
	meta: {
		index: 3,
		title: '添加医生挂号信息'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/register/normaledit")
}
const registerSegmentationEdit = {
	path: 'operation/register/segmentationedit',
	name: 'registerSegmentationEdit',
	meta: {
		index: 3,
		title: '添加医生挂号信息'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/register/segmentationedit")
}
const registerNormalDetail = {
	path: 'operation/register/normaldetail',
	name: 'registernormaldetail',
	meta: {
		index: 3,
		title: '预约挂号详情'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/register/normaldetail")
}
const registerSegmentationDetail = {
	path: 'operation/register/segmentationdetail',
	name: 'registersegmentationdetail',
	meta: {
		index: 3,
		title: '预约挂号详情'
	},
	component: () => import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/register/segmentationdetail")
}

// 医生远程门诊列表
const DoctorRemoteclinicList = {
	path: 'operation/remoteclinic/list',
	name: 'DoctorRemoteclinicList',
	meta: {
		index: 2,
		title: '远程门诊'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/remoteclinic/list")
}
const DoctorRemoteclinicEdit = {
	path: 'operation/remoteclinic/edit',
	name: 'DoctorRemoteclinicEdit',
	meta: {
		index: 3,
		title: '远程门诊-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/remoteclinic/edit")
}

const DoctorRemoteclinicAdd = {
	path: 'operation/remoteclinic/add',
	name: 'DoctorRemoteclinicAdd',
	meta: {
		index: 3,
		title: '远程门诊-新增'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-docrormanagement-register' */"@/pages/operation/remoteclinic/add")
}
const uploaddemo = {
	path: 'operation/uploaddemo',
	name: 'uploaddemo',
	meta: {
		index: 2,
		title: 'uploaddemo'
	},
	component: () => import(/* webpackChunkName: 'operation-doctormanagement-demo' */"@/pages/operation/upload")
}

//医生端内容管理
const doctorContentCheckList = {
	path: 'operation/doctorContentCheck/list',
	name: 'doctorContentCheckList',
	meta: {
		index: 2,
		title: '医生端内容管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorContentCheck' */"@/pages/operation/doctorContentCheck/home")
}
const doctorContentCheckListHelAdd = {
	path: 'operation/doctorContentCheck/hel-add',
	name: 'doctorContentCheckListHelAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorContentCheck' */"@/pages/operation/doctorContentCheck/healthEducationEdit")
}
const doctorContentCheckListHelEdit = {
	path: 'operation/doctorContentCheck/hel-edit',
	name: 'doctorContentCheckListHelEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorContentCheck' */"@/pages/operation/doctorContentCheck/healthEducationEdit")
}
const doctorContentCheckListClsAdd = {
	path: 'operation/doctorContentCheck/cls-add',
	name: 'doctorContentCheckListClsAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorContentCheck' */"@/pages/operation/doctorContentCheck/classicCaseEdit")
}
const doctorContentCheckListClsEdit = {
	path: 'operation/doctorContentCheck/cls-edit',
	name: 'doctorContentCheckListClsEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorContentCheck' */"@/pages/operation/doctorContentCheck/classicCaseEdit")
}
const doctorContentCheckListHotAdd = {
	path: 'operation/doctorContentCheck/hot-add',
	name: 'doctorContentCheckListHotAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorContentCheck' */"@/pages/operation/doctorContentCheck/hotRecommendEdit")
}
const doctorContentCheckListHotEdit = {
	path: 'operation/doctorContentCheck/hot-edit',
	name: 'doctorContentCheckListHotEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorContentCheck' */"@/pages/operation/doctorContentCheck/hotRecommendEdit")
}
// 医生列表
const doctorServerManageList = {
	path: 'operation/doctormanage/list',
	name: 'doctorServerManageList',
	meta: {
		index: 2,
		title: '医生列表'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorlist' */"@/pages/operation/dovtorservermanage/list")
}
const doctorServerManageEdit = {
	path: 'operation/doctormanage/edit',
	name: 'doctorServerManageEdit',
	meta: {
		index: 3,
		title: '医生服务管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-doctorlist' */"@/pages/operation/dovtorservermanage/edit")
}
const versionManagementList = {
	// 医生端安卓/ios版本管理
	path: 'operation/versionManagement/home',
	name: 'versionManagementHome',
	meta: {
		index: 2,
		title: '版本管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-versionmanagement' */"@/pages/operation/versionManagement/list")
}

const versionManagementAdd = {
	// 医生端安卓/ios版本管理
	path: 'operation/versionManagement/add',
	name: 'versionManagementAdd',
	meta: {
		index: 3,
		title: '版本管理添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-versionmanagement' */"@/pages/operation/versionManagement/add")
}
const versionManagementEdit = {
	// 医生端安卓/ios版本管理
	path: 'operation/versionManagement/edit',
	name: 'versionManagementEdit',
	meta: {
		index: 3,
		title: '版本管理修改'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-versionmanagement' */"@/pages/operation/versionManagement/edit")
}
// 讲堂点播
const liveMantList = {
	// 直播管理
	path: 'operation/liveMant/list',
	name: 'liveMantList',
	meta: {
		index: 2,
		title: '讲堂点播'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-liveMant' */"@/pages/operation/liveMant/list")
}
const liveMantAdd = {
	// 直播管理
	path: 'operation/liveMant/liveAdd',
	name: 'liveMantAdd',
	meta: {
		index: 3,
		title: '点播添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-liveMant' */"@/pages/operation/liveMant/liveAdd")
}
const liveMantEdit = {
	// 直播管理
	path: 'operation/liveMant/liveEdit',
	name: 'liveMantEdit',
	meta: {
		index: 3,
		title: '点播编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-liveMant' */"@/pages/operation/liveMant/liveEdit")
}
const broadAdd = {
	// 直播管理
	path: 'operation/liveMant/broadAdd',
	name: 'liveMantBroadAdd',
	meta: {
		index: 3,
		title: '添加直播'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-liveMant' */"@/pages/operation/liveMant/broadAdd")
}
const broadEdit = {
	// 直播管理
	path: 'operation/liveMant/broadEdit',
	name: 'liveMantBroadEdit',
	meta: {
		index: 3,
		title: '编辑直播'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-liveMant' */"@/pages/operation/liveMant/broadEdit")
}
const physicianAudit = {
	// 讲堂审核
	path: 'operation/physicianAudit/list',
	name: 'physicianAuditList',
	meta: {
		index: 2,
		title: '讲堂审核'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-liveMant' */"@/pages/operation/physicianAudit/list")
}
const physicianAuditSee = {
	// 讲堂审核
	path: 'operation/physicianAudit/search',
	name: 'physicianAuditSearch',
	meta: {
		index: 3,
		title: '讲堂查看'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctormanagement-liveMant' */"@/pages/operation/physicianAudit/search")
}

//患者端运营内容管理
const patientOperation = {
	path: 'operation/patient/index',
	name: 'patientOperation',
	meta: {
		index: 1,
		title: '患者端运营'
	},
	redirect:'/index/operation/contentmanagement_home'
}
//患者端内容管理和分类
const contentmanagementHome = {
	path: 'operation/contentmanagement_home',
	name: 'contentmanagementHome',
	meta: {
		index: 2,
		title: '内容管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-patient-contentmanagement' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_home")
}
const contentmanagementAdd = {
	path: 'operation/contentmanagement_add',
	name: 'contentmanagementAdd',
	meta: {
		index: 3,
		title: '内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-patient-contentmanagement' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_add")
}

const createNews = {
	path: 'operation/contentmanagement_edit',
	name: 'createNews',
	meta: {
		index: 3,
		title: '内容管理-修改'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-patient-contentmanagement' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const createdNews = {
	path: 'operation/createNews',
	name: 'createdNews',
	meta: {
		index: 3,
		title: '内容管理-创建新闻'
	},
	component: () =>
		import(/* webpackChunkName: 'not-used' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const c6 = {
	path: 'operation/f_Classify',
	name: 'c6',
	meta: {
		index: 2,
		title: '内容分类'
	},
	component: () =>
		import(/* webpackChunkName: 'not-used' */"@/pages/operation/classify/f_Classify")
}

const addClassify = {
	path: 'operation/addClassify',
	name: 'addClassify',
	meta: {
		index: 3,
		title: '内容分类-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'not-used' */"@/pages/operation/classify/addClassify")
}
const newClassify = {
	path: 'operation/newClassify',
	name: 'newClassify',
	meta: {
		index: 3,
		title: '内容分类-添加新分类'
	},
	component: () =>
		import(/* webpackChunkName: 'not-used' */"@/pages/operation/classify/newClassify")
}

const patientManagement = {
	path: 'operation/patient_management',
	name: 'patientManagement',
	meta: {
		index: 2,
		title: '患者管理'
	},
	component: () =>
		import(/* webpackChunkName: 'not-used' */"@/pages/operation/patientmanagement/patientmanagement_home")
}

//机构运营
const mechanismOperation = {
	path: 'operation/mechanism/index',
	name: 'mechanismOperation',
	meta: {
		index: 1,
		title: '机构运营'
	},
	redirect:'/index/operation/home'
}
const operationHome = {
	path: 'operation/home',
	name: 'operationHome',
	meta: {
		index: 2,
		title: '机构管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-home' */"@/pages/operation/contentmen/home.vue")
}
const homeInfo = {
	path: 'operation/home_info',
	name: 'homeInfo',
	meta: {
		index: 3,
		title: '医院信息'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-home-info' */"@/pages/operation/contentmen/homeinfo/home_info")
}

const operationNews = {
	path: 'operation/news',
	name: 'operationNews',
	meta: {
		index: 3,
		title: '动态新闻'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-news' */"@/pages/operation/contentmen/news/new_home")
}

const newsEdit = {
	path: 'operation/news_edit',
	name: 'newsEdit',
	meta: {
		index: 4,
		title: '动态新闻-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-news' */"@/pages/operation/contentmen/news/news_edit")
}
const d_createdNews = {
	path: 'operation/news_add',
	name: 'd_createdNews',
	meta: {
		index: 4,
		title: '动态新闻-新增'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-news' */"@/pages/operation/contentmen/news/news_add")
}
const operationExpert = {
	path: 'operation/expert',
	name: 'operationExpert',
	meta: {
		index: 3,
		title: '专家介绍'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-expert' */"@/pages/operation/contentmen/expert/expert_list")
}
const expertAdd = {
	path: 'operation/expert_add',
	name: 'expertAdd',
	meta: {
		index: 4,
		title: '专家介绍-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-expert' */"@/pages/operation/contentmen/expert/expert_add")
}
const expert_edit = {
	path: 'operation/expert_edit',
	name: 'expert_edits',
	meta: {
		index: 4,
		title: '专家介绍-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-expert' */"@/pages/operation/contentmen/expert/expert_edit")
}
const serviceManagement = {
	path: 'operation/service_management',
	name: 'serviceManagement',
	meta: {
		index: 3,
		title: '服务管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-servicemanagement' */"@/pages/operation/contentmen/management/management_home")
}

const managementAdd = {
	path: 'operation/management_add',
	name: 'managementAdd',
	meta: {
		index: 4,
		title: '服务管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-servicemanagement' */"@/pages/operation/contentmen/management/management_add")
}
const iBanner = {
	path: 'operation/i_banner',
	name: 'iBanner',
	meta: {
		index: 3,
		title: 'Banner'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-banner' */"@/pages/operation/contentmen/banner/banner_home")
}
const bannerAdd = {
	path: 'operation/banner_add',
	name: 'bannerAdd',
	meta: {
		index: 4,
		title: 'Banner-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-banner' */"@/pages/operation/contentmen/banner/banner_add")
}
const addBanner = {
	path: 'operation/banner_edit',
	name: 'addBanner',
	meta: {
		index: 4,
		title: 'Banner-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-banner' */"@/pages/operation/contentmen/banner/banner_edit")
}
const iKeshi = {
	path: 'operation/i_keshi',
	name: 'iKeshi',
	meta: {
		index: 3,
		title: '院内科室'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-medicine' */"@/pages/operation/contentmen/medicine/medicine_list")
}
const medicineAdd = {
	path: 'operation/medicine_add',
	name: 'medicineAdd',
	meta: {
		index: 4,
		title: '院内科室-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-medicine' */"@/pages/operation/contentmen/medicine/medicine_add")
}
const medicineEdit = {
	path: 'operation/medicine_edit',
	name: 'medicineEdit',
	meta: {
		index: 4,
		title: '院内科室-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-medicine' */"@/pages/operation/contentmen/medicine/medicine_edit")
}
const kDepartment = {
	path: 'operation/k_department',
	name: 'kDepartment',
	meta: {
		index: 3,
		title: '预约科室'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-bookingoffice' */"@/pages/operation/contentmen/bookingoffice/bookingoffice_home")
}
const bookingofficeEdit = {
	path: 'operation/bookingoffice_edit',
	name: 'bookingofficeEdit',
	meta: {
		index: 4,
		title: '预约科室-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-bookingoffice' */"@/pages/operation/contentmen/bookingoffice/bookingoffice_edit")
}
const tKeshi = {
	path: 'operation/t_keshi',
	name: 'tKeshi',
	meta: {
		index: 3,
		title: '特色科室'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-departments' */"@/pages/operation/contentmen/departments/departments_list")
}
const departmentsList = {
	path: 'operation/departments_list',
	name: 'departmentsList',
	meta: {
		index: 4,
		title: '特色科室-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-departments' */"@/pages/operation/contentmen/departments/departments_edit")
}
// 远程门诊
const remoteClinic = {
	path: 'operation/remoteClinic_list',
	name: 'remoteClinicList',
	meta: {
		index: 3,
		title: '远程门诊'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-remoteclinic' */"@/pages/operation/contentmen/remoteClinic/list")
}
// 第三方厂家
const thirdParty = {
	path: 'operation/thirdParty',
	name: 'thirdParty',
	meta: {
		index: 3,
		title: '远程门诊'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-thirdPart' */"@/pages/operation/contentmen/thirdparty/index")
}
const remoteClinicEdit = {
	path: 'operation/remoteClinic_edit',
	name: 'remoteClinicEdit',
	meta: {
		index: 4,
		title: '远程门诊-查看'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-remoteclinic' */"@/pages/operation/contentmen/remoteClinic/edit")
}
const remoteClinicRoom = {
	path: 'operation/remoteClinicRoom',
	name: 'remoteClinicRoomList',
	meta: {
		index: 4,
		title: '远程门诊-云诊室列表'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-remoteclinic' */"@/pages/operation/contentmen/remoteClinic/room")
}
// 远程门诊类型维护
const doctorremoteClinicTypeList = {
	path: 'operation/doctorremoteClinic_list',
	name: 'doctorremoteClinicTypeList',
	meta: {
		index: 3,
		title: '远程门诊类型'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-remoteclinictype' */"@/pages/operation/contentmen/doctorremoteClinicType/list")
}
// 医生远程门诊列表
const doctorList = {
	path: 'operation/doctorList',
	name: 'doctorList',
	meta: {
		index: 4,
		title: '医生远程门诊列表'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-remoteclinictype' */"@/pages/operation/contentmen/doctorList/list")
}
// 服务包管理
const servicePackageList = {
	path: 'operation/servicePackage/list',
	name: 'servicePackageList',
	meta: {
		index: 3,
		title: '服务包管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-packagemanage' */"@/pages/operation/contentmen/packageManage/list")
}
// 服务包编辑
const servicePackageEdit = {
	path: 'operation/servicePackage/edit',
	name: 'servicePackageEdit',
	meta: {
		index: 4,
		title: '查看服务包'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-mechanism-packagemanage' */"@/pages/operation/contentmen/packageManage/edit")
}

//服务包管理菜单
const servicePackagePindex = {
	path: 'operation/servicePackage/pindex',
	name: 'servicePackagePindex',
	meta: {
		index: 1,
		title: '服务包管理'
	},
	redirect: '/index/operation/servicePackage/pList'
}
const servicePackagePList = {
	path: 'operation/servicePackage/pList',
	name: 'servicePackagePList',
	meta: {
		index: 2,
		title: '服务包管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackage' */"@/pages/operation/servicePackage/packageList")
}
const servicePackagePAdd = {
	path: 'operation/servicePackage/pAdd',
	name: 'servicePackagePAdd',
	meta: {
		index: 3,
		title: '添加服务包'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackage' */"@/pages/operation/servicePackage/packageEdit")
}
const servicePackagePEdit = {
	path: 'operation/servicePackage/pEdit',
	name: 'servicePackagePEdit',
	meta: {
		index: 3,
		title: '编辑服务包'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackage' */"@/pages/operation/servicePackage/packageEdit")
}
const servicePackagePDetail = {
	path: 'operation/servicePackage/pDetail',
	name: 'servicePackagePDetail',
	meta: {
		index: 3,
		title: '查看服务包'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackage' */"@/pages/operation/servicePackage/packageDetail")
}
const servicePackageItemList = {
	path: 'operation/servicePackage/itemList',
	name: 'servicePackageitemList',
	meta: {
		index: 2,
		title: '服务项目管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackageitem' */"@/pages/operation/servicePackage/itemList")
}
const servicePackageItemAdd = {
	path: 'operation/servicePackage/itemAdd',
	name: 'servicePackageitemAdd',
	meta: {
		index: 3,
		title: '添加服务项'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackageitem' */"@/pages/operation/servicePackage/itemEdit")
}
const servicePackageItemEdit = {
	path: 'operation/servicePackage/itemEdit',
	name: 'servicePackageitemEdit',
	meta: {
		index: 3,
		title: '编辑服务项'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackageitem' */"@/pages/operation/servicePackage/itemEdit")
}
const servicePackageItemImportOne = {
	path: 'operation/servicePackage/itemImportOne',
	name: 'servicePackageItemImportOne',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackageitem' */"@/pages/operation/servicePackage/itemImportOneStep")
}
const servicePackageItemImportTwo = {
	path: 'operation/servicePackage/itemImportTwo',
	name: 'servicePackageItemImportTwo',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackageitem' */"@/pages/operation/servicePackage/itemImportTwoStep")
}
const servicePackageItemImportThree = {
	path: 'operation/servicePackage/itemImportThree',
	name: 'servicePackageItemImportThree',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackagepindex-servicepackageitem' */"@/pages/operation/servicePackage/itemImportThreeStep")
}
// 公众号管理
const publicHostingIndex = {
	path: 'operation/publicHosting/index',
	name: 'publicHostingIndex',
	meta: {
		index: 1,
		title: '公众号托管'
	},
	redirect: '/index/operation/publicAddress/list'
}
const publicAddressList = {
	path: 'operation/publicAddress/list',
	name: 'publicAddressList',
	meta: {
		index: 2,
		title: '公众号管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publichosting-publicaddresslist' */"@/pages/operation/publicAddress/home")
}
// 微信首页banner图
const wxBannerList = {
	path: 'operation/banner/list',
	name: 'wxbannerList',
	meta: {
		index: 2,
		title: 'banner图'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publichosting-publicaddresslist-wxbanner' */"@/pages/operation/publicAddress/banner/list")
}
const wxBannerAdd = {
	// 添加微信首页banner图
	path: 'operation/banner/add',
	name: 'wxbannerAdd',
	meta: {
		index: 3,
		title: 'banner图添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publichosting-publicaddresslist-wxbanner' */"@/pages/operation/publicAddress/banner/add")
}
const wxBannerEdit = {
	// 添加微信首页banner图
	path: 'operation/banner/edit',
	name: 'wxbannerEdit',
	meta: {
		index: 3,
		title: 'banner图编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publichosting-publicaddresslist-wxbanner' */"@/pages/operation/publicAddress/banner/edit")
}
const templateHome = {
	// 微信公众号模板
	path: 'operation/template/home',
	name: 'templateHome',
	meta: {
		index: 2,
		title: '模板管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publichosting-publicaddresslist-template' */"@/pages/operation/publicAddress/template/home")
}
const typeManagement = {
	// 微信公众号分类管理
	path: 'operation/typeManagement/list',
	name: 'typeManagementList',
	meta: {
		index: 2,
		title: '菜单管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publichosting-publicaddresslist-typemanagement' */"@/pages/operation/publicAddress/typeManagement/list")
}
// 公众号开通管理
const wxopeningmanagement = {
	path: 'operation/wxopeningmanagement/index',
	name: 'wxopeningManagement',
	meta: {
		index: 2,
		title: '公众号管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publichosting-publicaddresslist-wxopeningManagement' */"@/pages/operation/publicAddress/openingmanagement/index")
}

//档案管理
const fileManagementList = {
	path: 'operation/fileManagement/list',
	name: 'fileManagementList',
	meta: {
		index: 2,
		title: '档案管理'
	},
	component: () =>
		import(/* webpackChunkName: 'not-used' */"@/pages/operation/fileManagement/list")
}


// 系统管理/菜单管理
const wxSystemManagement = {
	path: 'operation/wxTypeManagement/list',
	name: 'wxTypeManagementList',
	meta: {
		index: 2,
		title: '菜单管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-systemmanagement-wxtypemanagementlist' */"@/pages/operation/systemManagement/wxTypeManagement/list")
}
// 系统管理/添加菜单
const wxSystemManagementAdd = {
	path: 'operation/wxTypeManagement/add',
	name: 'wxSystemManagementAdd',
	meta: {
		index: 3,
		title: '添加菜单'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-systemmanagement-wxtypemanagementlist' */"@/pages/operation/systemManagement/wxTypeManagement/add")
}
// 系统管理/编辑菜单
const wxSystemManagementEdit = {
	path: 'operation/wxTypeManagement/edit',
	name: 'wxSystemManagementEdit',
	meta: {
		index: 3,
		title: '编辑菜单'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-systemmanagement-wxtypemanagementlist' */"@/pages/operation/systemManagement/wxTypeManagement/edit")
}
// 添加菜单功能
const wxSystemManagementAddFn = {
	path: 'operation/wxTypeManagement/fn',
	name: 'wxSystemManagementfn',
	meta: {
		index: 3,
		title: '添加功能'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-systemmanagement-wxtypemanagementlist' */"@/pages/operation/systemManagement/wxTypeManagement/function")
}

export default {
	//医生端运营
	doctorManagement,
	reviewList,
	reviewEdit,
	reviewreview,
	registerList,
	registerNormalEdit,
	registerSegmentationEdit,
	registerNormalDetail,
	registerSegmentationDetail,
	uploaddemo,
	//机构运营
	contentmanagementHome,
	contentmanagementAdd,
	addClassify,
	newClassify,
	patientManagement,
	operationHome,
	homeInfo,
	operationNews,
	operationExpert,
	serviceManagement,
	newsEdit,
	expertAdd,
	managementAdd,
	iBanner,
	bannerAdd,
	iKeshi,
	medicineAdd,
	medicineEdit,
	kDepartment,
	bookingofficeEdit,
	tKeshi,
	departmentsList,
	expert_edit,
	c6,
	createdNews,
	addBanner,
	createNews,
	d_createdNews,
	doctorServerManageList,
	doctorServerManageEdit,
	// 远程门诊
	remoteClinic,
	remoteClinicEdit,
	remoteClinicRoom,
	//第三方 厂家
	thirdParty,
	// 远程门诊类型维护
	doctorremoteClinicTypeList,
	// 医生远程门诊列表
	doctorList,
	//服务包管理
	servicePackagePindex,
	servicePackageList,
	servicePackageEdit,

	// 医生端内容管理
	doctorContentCheckList,
	doctorContentCheckListHelAdd,
	doctorContentCheckListHelEdit,
	doctorContentCheckListClsAdd,
	doctorContentCheckListClsEdit,
	doctorContentCheckListHotAdd,
	doctorContentCheckListHotEdit,
	//订单管理
	ordersManagement,
	reservationOrders,

	// 家医签约管理
	contractManagement,
	remoteClinicOrders,
	remoteClinicOrdersDetail,
	// 版本管理
	versionManagementList,
	versionManagementAdd,
	versionManagementEdit,
	// 讲堂点播
	liveMantList,
	liveMantAdd,
	liveMantEdit,
	// 直播添加
	broadAdd,
	broadEdit,
	// 讲堂审核
	physicianAudit,
	physicianAuditSee,
	//服务包管理
	servicePackagePList,
	servicePackagePAdd,
	servicePackagePEdit,
	servicePackagePDetail,
	//服务项目管理
	servicePackageItemList,
	servicePackageItemAdd,
	servicePackageItemEdit,
	servicePackageItemImportOne,
	servicePackageItemImportTwo,
	servicePackageItemImportThree,
	// 远程门诊
	DoctorRemoteclinicList,
	DoctorRemoteclinicEdit,
	DoctorRemoteclinicAdd,
	// 公众号管理
	publicHostingIndex,
	publicAddressList,
	// 微信首页banner图
	wxBannerList,
	wxBannerAdd,
	wxBannerEdit,
	// 微信公众号模板
	templateHome,
	// 分类管理
	typeManagement,
	//档案管理
	fileManagementList,
	wxopeningmanagement,
	// 系统管理/菜单管理 
	wxSystemManagement,
	wxSystemManagementAdd,
	wxSystemManagementEdit,
	wxSystemManagementAddFn,
	//患者端运营
	patientOperation,
	//机构运营
	mechanismOperation,
}