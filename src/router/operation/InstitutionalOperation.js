// 机构管理
const mechanismOperation = {
	path: 'operation/mechanism/index',
	name: 'mechanismOperation',
	meta: {
		index: 1,
		title: '机构运营'
	},
	redirect: '/index/operation/home'
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
const remoteClinic = {
	path: 'operation/remoteClinic_list',
	name: 'remoteClinicList',
	meta: {
		index: 3,
		title: '远程门诊'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-InstitutionalOperation' */"@/pages/operation/contentmen/remoteClinic/list")
}
const remoteClinicEdit = {
	path: 'operation/remoteClinic_edit',
	name: 'remoteClinicEdit',
	meta: {
		index: 4,
		title: '远程门诊-查看'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-InstitutionalOperation' */"@/pages/operation/contentmen/remoteClinic/edit")
}
const remoteClinicRoom = {
	path: 'operation/remoteClinicRoom',
	name: 'remoteClinicRoomList',
	meta: {
		index: 4,
		title: '远程门诊-云诊室列表'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-InstitutionalOperation' */"@/pages/operation/contentmen/remoteClinic/room")
}
const doctorremoteClinicTypeList = {
	path: 'operation/doctorremoteClinic_list',
	name: 'doctorremoteClinicTypeList',
	meta: {
		index: 3,
		title: '远程门诊类型'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-InstitutionalOperation' */"@/pages/operation/contentmen/doctorremoteClinicType/list")
}
const thirdParty = {
	path: 'operation/thirdParty',
	name: 'thirdParty',
	meta: {
		index: 3,
		title: '第三方厂家'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-InstitutionalOperation' */"@/pages/operation/contentmen/thirdparty/index")
}
const doctorList = {
	path: 'operation/doctorList',
	name: 'doctorList',
	meta: {
		index: 4,
		title: '医生远程门诊列表'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-InstitutionalOperation' */"@/pages/operation/contentmen/doctorList/list")
}


export default {
    // 医生远程门诊列表
    doctorList,
    // 第三方厂家
    thirdParty,
    // 远程门诊类型
    doctorremoteClinicTypeList,
    // 远程门诊-云诊室列表
    remoteClinicRoom,
    // 远程门诊-查看
    remoteClinicEdit,
    // 远程门诊
    remoteClinic,
    // 查看服务包
    servicePackageEdit,
    // 添加服务包
    servicePackagePAdd,
    // 服务包管理
    servicePackageList,
    // 服务管理-添加
    managementAdd,
    // 服务管理
    serviceManagement,
    // 专家介绍-编辑
    expert_edit,
    // 专家介绍-添加
    expertAdd,
    // 专家介绍
    operationExpert,
    // 预约科室-编辑
    bookingofficeEdit,
    // 预约科室
    kDepartment,
    // 特色科室-添加
    departmentsList,
    // 特色科室
    tKeshi,
    // 院内科室-编辑
    medicineEdit,
    // 院内科室-添加
    medicineAdd,
    // 院内科室
    iKeshi,
    // Banner-编辑
    addBanner,
    // 机构Banner添加
    bannerAdd,
    // 机构banner
    iBanner,
    // 动态新闻新增
    d_createdNews,
    // 动态新闻编辑
    newsEdit,
    // 动态新闻列表
    operationNews,
    // 机构详情
    homeInfo,
    // 机构管理列表
    operationHome,
    // 机构运营
    mechanismOperation,
}