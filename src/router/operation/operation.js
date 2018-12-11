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

//医生端内容分类

//患者端内容管理和分类
const reviewList4 = {
	path: 'operation/contentmanagement_home',
	name: 'reviewlist4',
	meta: {
		index: 2,
		title: '内容管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_home")
}
const reviewList5 = {
	path: 'operation/contentmanagement_add',
	name: 'reviewlist5',
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

const reviewList6 = {
	path: 'operation/addClassify',
	name: 'reviewlist6',
	meta: {
		index: 3,
		title: '内容分类-添加'
	},
	component: () =>
		import("@/pages/operation/classify/addClassify")
}
const reviewList7 = {
	path: 'operation/newClassify',
	name: 'reviewlist7',
	meta: {
		index: 3,
		title: '内容分类-添加新分类'
	},
	component: () =>
		import("@/pages/operation/classify/newClassify")
}

const reviewList8 = {
	path: 'operation/patient_management',
	name: 'reviewlist8',
	meta: {
		index: 2,
		title: '患者管理'
	},
	component: () =>
		import("@/pages/operation/patientmanagement/patientmanagement_home")
}
//机构运营
const reviewList9 = {
	path: 'operation/home',
	name: 'reviewlist9',
	meta: {
		index: 2,
		title: '机构管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/home.vue")
}
const reviewList10 = {
	path: 'operation/home_info',
	name: 'reviewlist10',
	meta: {
		index: 3,
		title: '医院信息'
	},
	component: () =>
		import("@/pages/operation/contentmen/homeinfo/home_info")
}

const reviewList11 = {
	path: 'operation/news',
	name: 'reviewlist11',
	meta: {
		index: 3,
		title: '动态新闻'
	},
	component: () =>
		import("@/pages/operation/contentmen/news/new_home")
}

const reviewList14 = {
	path: 'operation/news_edit',
	name: 'reviewlist14',
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
const reviewList12 = {
	path: 'operation/expert',
	name: 'reviewlist12',
	meta: {
		index: 3,
		title: '专家介绍'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_list")
}
const reviewList15 = {
	path: 'operation/expert_add',
	name: 'reviewlist15',
	meta: {
		index: 4,
		title: '专家介绍-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_add")
}
const expert_edit = {
	path: 'operation/expert_edit',
	name: 'expert_edit',
	meta: {
		index: 4,
		title: '专家介绍-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_edit")
}
const reviewList13 = {
	path: 'operation/service_management',
	name: 'reviewlist13',
	meta: {
		index: 3,
		title: '服务管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/management/management_home")
}


const reviewList16 = {
	path: 'operation/management_add',
	name: 'reviewlist16',
	meta: {
		index: 4,
		title: '服务管理-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/management/management_add")
}
const reviewList17 = {
	path: 'operation/i_banner',
	name: 'reviewlist17',
	meta: {
		index: 3,
		title: 'Banner'
	},
	component: () =>
		import("@/pages/operation/contentmen/banner/banner_home")
}
const reviewList18 = {
	path: 'operation/banner_add',
	name: 'reviewlist18',
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
const reviewList19 = {
	path: 'operation/i_keshi',
	name: 'reviewlist19',
	meta: {
		index: 3,
		title: '院内科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_list")
}
const reviewList20 = {
	path: 'operation/medicine_add',
	name: 'reviewlist20',
	meta: {
		index: 4,
		title: '院内科室-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_add")
}
const reviewList21 = {
	path: 'operation/medicine_edit',
	name: 'reviewList21',
	meta: {
		index: 4,
		title: '院内科室-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_edit")
}
const reviewList22 = {
	path: 'operation/k_department',
	name: 'reviewlist22',
	meta: {
		index: 3,
		title: '预约科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/bookingoffice/bookingoffice_home")
}
const reviewList23 = {
	path: 'operation/bookingoffice_edit',
	name: 'reviewlist23',
	meta: {
		index: 4,
		title: '预约科室-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/bookingoffice/bookingoffice_edit")
}
const reviewList24 = {
	path: 'operation/t_keshi',
	name: 'reviewlist24',
	meta: {
		index: 3,
		title: '特色科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/departments/departments_list")
}
const reviewList25 = {
	path: 'operation/departments_list',
	name: 'reviewlist25',
	meta: {
		index: 4,
		title: '特色科室-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/departments/departments_edit")
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
	reviewList4,
	reviewList5,
	reviewList6,
	reviewList7,
	reviewList8,
	reviewList9,
	reviewList10,
	reviewList11,
	reviewList12,
	reviewList13,
	reviewList14,
	reviewList15,
	reviewList16,
	reviewList17,
	reviewList18,
	reviewList19,
	reviewList20,
	reviewList21,
	reviewList22,
	reviewList23,
	reviewList24,
	reviewList25,
	expert_edit,
	c6,
	createdNews,
	addBanner,
	createNews,
	d_createdNews,
}