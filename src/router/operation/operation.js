const reviewList = {
	path: 'operation/doctorreview/list',
	name: 'reviewlist',
	meta: {
		index: 2,
		title: '医生列表'
	},
	component: () => import("@/pages/operation/doctorReview/list")
}
const reviewEdit = {
	path: 'operation/doctorreview/edit',
	name: 'reviewedit',
	meta: {
		index: 3,
		title: '医生信息编辑'
	},
	component: () => import("@/pages/operation/doctorReview/edit")
}
const reviewreview = {
	path: 'operation/doctorreview/review',
	name: 'reviewreview',
	meta: {
		index: 3,
		title: '医生认证审核'
	},
	component: () => import("@/pages/operation/doctorReview/review")
}
const registerList = {
	path: 'operation/register/list',
	name: 'registerlist',
	meta: {
		index: 2,
		title: '医生排班列表'
	},
	component: () => import("@/pages/operation/register/list")
}
const registerEdit = {
	path: 'operation/register/edit',
	name: 'registeredit',
	meta: {
		index: 3,
		title: '添加医生挂号信息'
	},
	component: () => import("@/pages/operation/register/edit")
}
const registerDetail = {
	path: 'operation/register/detail',
	name: 'registerdetail',
	meta: {
		index: 3,
		title: '预约挂号详情'
	},
	component: () => import("@/pages/operation/register/detail")
}

const kindeditorTest = {
	path: 'operation/kindeditor',
	name: 'kindeditor',
	meta: {
		index: 2,
		title: 'kindeditor demo'
	},
	component: () => import("@/pages/operation/kindeditor")
}
const uploaddemo = {
	path: 'operation/uploaddemo',
	name: 'uploaddemo',
	meta: {
		index: 2,
		title: 'uploaddemo'
	},
	component: () => import("@/pages/operation/upload")
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
		import("@/pages/operation/doctorContentCheck/home")
}
const doctorContentCheckListHelAdd = {
	path: 'operation/doctorContentCheck/hel-add',
	name: 'doctorContentCheckListHelAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import("@/pages/operation/doctorContentCheck/healthEducationEdit")
}
const doctorContentCheckListHelEdit = {
	path: 'operation/doctorContentCheck/hel-edit',
	name: 'doctorContentCheckListHelEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import("@/pages/operation/doctorContentCheck/healthEducationEdit")
}
const doctorContentCheckListClsAdd = {
	path: 'operation/doctorContentCheck/cls-add',
	name: 'doctorContentCheckListClsAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import("@/pages/operation/doctorContentCheck/classicCaseEdit")
}
const doctorContentCheckListClsEdit = {
	path: 'operation/doctorContentCheck/cls-edit',
	name: 'doctorContentCheckListClsEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import("@/pages/operation/doctorContentCheck/classicCaseEdit")
}
const doctorContentCheckListHotAdd = {
	path: 'operation/doctorContentCheck/hot-add',
	name: 'doctorContentCheckListHotAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import("@/pages/operation/doctorContentCheck/hotRecommendEdit")
}
const doctorContentCheckListHotEdit = {
	path: 'operation/doctorContentCheck/hot-edit',
	name: 'doctorContentCheckListHotEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import("@/pages/operation/doctorContentCheck/hotRecommendEdit")
}

//医生端内容分类

//患者端内容管理和分类
const contentmanagementHome = {
	path: 'operation/contentmanagement_home',
	name: 'contentmanagementHome',
	meta: {
		index: 2,
		title: '内容管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_home")
}
const contentmanagementAdd = {
	path: 'operation/contentmanagement_add',
	name: 'contentmanagementAdd',
	meta: {
		index: 3,
		title: '内容管理-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_add")
}

const createNews = {
	path: 'operation/contentmanagement_edit',
	name: 'createNews',
	meta: {
		index: 3,
		title: '内容管理-修改'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const createdNews = {
	path: 'operation/createNews',
	name: 'createdNews',
	meta: {
		index: 3,
		title: '内容管理-创建新闻'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const c6 = {
	path: 'operation/f_Classify',
	name: 'c6',
	meta: {
		index: 2,
		title: '内容分类'
	},
	component: () =>
		import("@/pages/operation/classify/f_Classify")
}

const addClassify = {
	path: 'operation/addClassify',
	name: 'addClassify',
	meta: {
		index: 3,
		title: '内容分类-编辑'
	},
	component: () =>
		import("@/pages/operation/classify/addClassify")
}
const newClassify = {
	path: 'operation/newClassify',
	name: 'newClassify',
	meta: {
		index: 3,
		title: '内容分类-添加新分类'
	},
	component: () =>
		import("@/pages/operation/classify/newClassify")
}

const patientManagement = {
	path: 'operation/patient_management',
	name: 'patientManagement',
	meta: {
		index: 2,
		title: '患者管理'
	},
	component: () =>
		import("@/pages/operation/patientmanagement/patientmanagement_home")
}
//机构运营
const operationHome = {
	path: 'operation/home',
	name: 'operationHome',
	meta: {
		index: 2,
		title: '机构管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/home.vue")
}
const homeInfo = {
	path: 'operation/home_info',
	name: 'homeInfo',
	meta: {
		index: 3,
		title: '医院信息'
	},
	component: () =>
		import("@/pages/operation/contentmen/homeinfo/home_info")
}

const operationNews = {
	path: 'operation/news',
	name: 'operationNews',
	meta: {
		index: 3,
		title: '动态新闻'
	},
	component: () =>
		import("@/pages/operation/contentmen/news/new_home")
}

const newsEdit = {
	path: 'operation/news_edit',
	name: 'newsEdit',
	meta: {
		index: 4,
		title: '动态新闻-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/news/news_edit")
}
const d_createdNews = {
	path: 'operation/news_add',
	name: 'd_createdNews',
	meta: {
		index: 4,
		title: '动态新闻-新增'
	},
	component: () =>
		import("@/pages/operation/contentmen/news/news_add")
}
const operationExpert = {
	path: 'operation/expert',
	name: 'operationExpert',
	meta: {
		index: 3,
		title: '专家介绍'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_list")
}
const expertAdd = {
	path: 'operation/expert_add',
	name: 'expertAdd',
	meta: {
		index: 4,
		title: '专家介绍-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_add")
}
const expert_edit = {
	path: 'operation/expert_edit',
	name: 'expert_edits',
	meta: {
		index: 4,
		title: '专家介绍-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_edit")
}
const serviceManagement = {
	path: 'operation/service_management',
	name: 'serviceManagement',
	meta: {
		index: 3,
		title: '服务管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/management/management_home")
}


const managementAdd = {
	path: 'operation/management_add',
	name: 'managementAdd',
	meta: {
		index: 4,
		title: '服务管理-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/management/management_add")
}
const iBanner = {
	path: 'operation/i_banner',
	name: 'iBanner',
	meta: {
		index: 3,
		title: 'Banner'
	},
	component: () =>
		import("@/pages/operation/contentmen/banner/banner_home")
}
const bannerAdd = {
	path: 'operation/banner_add',
	name: 'bannerAdd',
	meta: {
		index: 4,
		title: 'Banner-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/banner/banner_add")
}
const addBanner = {
	path: 'operation/banner_edit',
	name: 'addBanner',
	meta: {
		index: 4,
		title: 'Banner-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/banner/banner_edit")
}
const iKeshi = {
	path: 'operation/i_keshi',
	name: 'iKeshi',
	meta: {
		index: 3,
		title: '院内科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_list")
}
const medicineAdd = {
	path: 'operation/medicine_add',
	name: 'medicineAdd',
	meta: {
		index: 4,
		title: '院内科室-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_add")
}
const medicineEdit = {
	path: 'operation/medicine_edit',
	name: 'medicineEdit',
	meta: {
		index: 4,
		title: '院内科室-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_edit")
}
const kDepartment = {
	path: 'operation/k_department',
	name: 'kDepartment',
	meta: {
		index: 3,
		title: '预约科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/bookingoffice/bookingoffice_home")
}
const bookingofficeEdit = {
	path: 'operation/bookingoffice_edit',
	name: 'bookingofficeEdit',
	meta: {
		index: 4,
		title: '预约科室-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/bookingoffice/bookingoffice_edit")
}
const tKeshi = {
	path: 'operation/t_keshi',
	name: 'tKeshi',
	meta: {
		index: 3,
		title: '特色科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/departments/departments_list")
}
const departmentsList = {
	path: 'operation/departments_list',
	name: 'departmentsList',
	meta: {
		index: 4,
		title: '特色科室-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/departments/departments_edit")
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
		import("@/pages/operation/contentmen/remoteClinic/list")
}
const remoteClinicEdit = {
	path: 'operation/remoteClinic_edit',
	name: 'remoteClinicEdit',
	meta: {
		index: 4,
		title: '远程门诊-查看'
	},
	component: () =>
		import("@/pages/operation/contentmen/remoteClinic/edit")
}
const remoteClinicRoom = {
	path: 'operation/remoteClinicRoom',
	name: 'remoteClinicRoomList',
	meta: {
		index: 4,
		title: '远程门诊-云诊室列表'
	},
	component: () =>
		import("@/pages/operation/contentmen/remoteClinic/room")
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
		import("@/pages/operation/contentmen/doctorremoteClinicType/list")
}
const doctorremoteClinicTypeAdd = {
	path: 'operation/doctorremoteClinic_Add',
	name: 'doctorremoteClinicTypeAdd',
	meta: {
		index: 4,
		title: '远程门诊类型-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/doctorremoteClinicType/add")
}
const doctorremoteClinicTypeEdit = {
	path: 'operation/doctorremoteClinic_Edit',
	name: 'doctorremoteClinicTypeEdit',
	meta: {
		index: 4,
		title: '远程门诊类型-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/doctorremoteClinicType/edit")
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
		import("@/pages/operation/contentmen/doctorList/list")
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
		import("@/pages/operation/dovtorservermanage/list")
}
const doctorServerManageEdit = {
	path: 'operation/doctormanage/edit',
	name: 'doctorServerManageEdit',
	meta: {
		index: 3,
		title: '医生服务管理'
	},
	component: () =>
		import("@/pages/operation/dovtorservermanage/edit")
}
// 预约挂号
const reservationOrders = {
	path: 'operation/reservationOrders/list',
	name: 'reservationOrders',
	meta: {
		index: 2,
		title: '预约挂号订单管理'
	},
	component: () =>
		import("@/pages/operation/reservationOrders/list")
}
// 医生远程门诊
const DoctorRemoteclinicList = {
	path: 'operation/remoteclinic/list',
	name: 'DoctorRemoteclinicList',
	meta: {
		index: 2,
		title: '远程门诊'
	},
	component: () =>
		import("@/pages/operation/remoteclinic/list")
}
const DoctorRemoteclinicEdit = {
	path: 'operation/remoteclinic/edit',
	name: 'DoctorRemoteclinicEdit',
	meta: {
		index: 2,
		title: '远程门诊-编辑'
	},
	component: () =>
		import("@/pages/operation/remoteclinic/edit")
}

const DoctorRemoteclinicAdd = {
	path: 'operation/remoteclinic/add',
	name: 'DoctorRemoteclinicAdd',
	meta: {
		index: 2,
		title: '远程门诊-新增'
	},
	component: () =>
		import("@/pages/operation/remoteclinic/add")
}

const servicePackagePList = {
	path: 'operation/servicePackage/pList',
	name: 'servicePackagePList',
	meta: {
		index: 2,
		title: '服务包管理'
	},
	component: () =>
		import("@/pages/operation/servicePackage/packageList")
}
const servicePackagePAdd = {
	path: 'operation/servicePackage/pAdd',
	name: 'servicePackagePAdd',
	meta: {
		index: 3,
		title: '添加服务包'
	},
	component: () =>
		import("@/pages/operation/servicePackage/packageEdit")
}
const servicePackagePEdit = {
	path: 'operation/servicePackage/pEdit',
	name: 'servicePackagePEdit',
	meta: {
		index: 3,
		title: '编辑服务包'
	},
	component: () =>
		import("@/pages/operation/servicePackage/packageEdit")
}
const servicePackageItemList = {
	path: 'operation/servicePackage/itemList',
	name: 'servicePackageitemList',
	meta: {
		index: 2,
		title: '服务项目管理'
	},
	component: () =>
		import("@/pages/operation/servicePackage/itemList")
}
const servicePackageItemAdd = {
	path: 'operation/servicePackage/itemAdd',
	name: 'servicePackageitemAdd',
	meta: {
		index: 3,
		title: '添加服务项'
	},
	component: () =>
		import("@/pages/operation/servicePackage/itemEdit")
}
const servicePackageItemEdit = {
	path: 'operation/servicePackage/itemEdit',
	name: 'servicePackageitemEdit',
	meta: {
		index: 3,
		title: '编辑服务项'
	},
	component: () =>
		import("@/pages/operation/servicePackage/itemEdit")
}
const servicePackageItemImportOne = {
	path: 'operation/servicePackage/itemImportOne',
	name: 'servicePackageItemImportOne',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import("@/pages/operation/servicePackage/itemImportOneStep")
}
const servicePackageItemImportTwo = {
	path: 'operation/servicePackage/itemImportTwo',
	name: 'servicePackageItemImportTwo',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import("@/pages/operation/servicePackage/itemImportTwoStep")
}
const servicePackageItemImportThree = {
	path: 'operation/servicePackage/itemImportThree',
	name: 'servicePackageItemImportThree',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import("@/pages/operation/servicePackage/itemImportThreeStep")
}
export default {
	reviewList,
	reviewEdit,
	reviewreview,
	registerList,
	registerEdit,
	registerDetail,
	kindeditorTest,
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
	// 远程门诊类型维护
	doctorremoteClinicTypeList,
	doctorremoteClinicTypeAdd,
	doctorremoteClinicTypeEdit,
	// 医生远程门诊列表
	doctorList,

	// 医生端内容管理
	doctorContentCheckList,
	doctorContentCheckListHelAdd,
	doctorContentCheckListHelEdit,
	doctorContentCheckListClsAdd,
	doctorContentCheckListClsEdit,
	doctorContentCheckListHotAdd,
	doctorContentCheckListHotEdit,
	//订单管理
	reservationOrders,
	//服务包管理f
	servicePackagePList,
	servicePackagePAdd,
	servicePackagePEdit,
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


}