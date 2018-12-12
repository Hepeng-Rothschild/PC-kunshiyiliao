const reviewList = {
    path:'operation/doctorreview/list',
    name:'reviewlist',
    meta:{
        index:2,
        title:'医生列表'
    },
    component:()=>import("@/pages/operation/doctorReview/list")
}
const reviewEdit = {
    path:'operation/doctorreview/edit',
    name:'reviewedit',
    meta:{
        index:3,
        title:'医生信息编辑'
    },
    component:()=>import("@/pages/operation/doctorReview/edit")
}
const reviewreview = {
    path:'operation/doctorreview/review',
    name:'reviewreview',
    meta:{
        index:3,
        title:'医生认证审核'
    },
    component:()=>import("@/pages/operation/doctorReview/review")
}
const registerList = {
    path:'operation/register/list',
    name:'registerlist',
    meta:{
        index:2,
        title:'医生排班列表'
    },
    component:()=>import("@/pages/operation/register/list")
}
const registerEdit = {
    path:'operation/register/edit',
    name:'registeredit',
    meta:{
        index:3,
        title:'添加医生挂号信息'
    },
    component:()=>import("@/pages/operation/register/edit")
}
const registerDetail = {
    path:'operation/register/detail',
    name:'registerdetail',
    meta:{
        index:3,
        title:'预约挂号详情'
    },
    component:()=>import("@/pages/operation/register/detail")
}

const kindeditorTest = {
    path:'operation/kindeditor',
    name:'kindeditor',
    meta:{
        index:2,
        title:'kindeditor demo'
    },
    component:()=>import("@/pages/operation/kindeditor")
}
const uploadFile = {
    path:'operation/upload/index',
    name:'uploadFile',
    meta:{
        index:3,
        title:'uploadFile'
    },
    component:()=>import("@/pages/operation/upload/index")
}

//医生端内容管理
const contentCheckList = {
	path: 'operation/contentCheck/list',
	name: 'contentcontentCheck',
	meta: {
		index: 2,
		title: '医生端内容管理'
	},
	component: () =>
		import("@/pages/operation/contentCheck/contentmanagement_home")
}
const contentCheckListAdd = {
	path: 'operation/contentCheck/add',
	name: 'contentCheckAdd',
	meta: {
		index: 2,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import("@/pages/operation/contentCheck/contentmanagement_add")
}
const contentCheckListEdit = {
	path: 'operation/contentCheck/edit',
	name: 'contentCheckEdit',
	meta: {
		index: 2,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import("@/pages/operation/contentCheck/contentmanagement_edit")
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
		title: '内容分类-添加'
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
const doctorServerManage = {
	path: 'operation/doctormanage',
	name: 'departmentsList',
	meta: {
		index: 4,
		title: '医生端服务管理'
	},
	component: () =>
		import("@/pages/operation/dovtorservermanage/doctorservermanage")
}
export default {
    reviewList,
    reviewEdit,
    reviewreview,
    registerList,
    registerEdit,
    registerDetail,
    kindeditorTest,
    uploadFile,
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
	doctorServerManage,
	// 医生端内容管理
	contentCheckList,
	contentCheckListAdd,
	contentCheckListEdit,
}