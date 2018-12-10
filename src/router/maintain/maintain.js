const reviewList = {
    path:'maintain/index',
    name:'reviewlist',
    meta:{
        index:2,
        title:'运维列表'
    },
    component:()=>import("@/pages/maintain/doctorReview/list")
}
const reviewList4 = {
	path: '/index/maintain/contentmanagement_home',
	name: 'reviewlist4',
	meta: {
		index: 2,
		title: '内容管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_home")
}
const reviewList5 = {
	path: '/index/maintain/contentmanagement_add',
	name: 'reviewlist5',
	meta: {
		index: 2,
		title: '内容管理-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_add")
}

const createNews = {
	path: '/index/maintain/contentmanagement_edit',
	name: 'createNews',
	meta: {
		index: 2,
		title: '内容管理-修改'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const createdNews = {
	path: '/index/maintain/createNews',
	name: 'createdNews',
	meta: {
		index: 2,
		title: '内容管理-创建新闻'
	},
	component: () =>
		import("@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const c6 = {
	path: '/index/maintain/f_Classify',
	name: 'c6',
	meta: {
		index: 2,
		title: '内容分类'
	},
	component: () =>
		import("@/pages/operation/classify/f_Classify")
}

const reviewList6 = {
	path: '/index/maintain/addClassify',
	name: 'reviewlist6',
	meta: {
		index: 2,
		title: '内容分类-添加'
	},
	component: () =>
		import("@/pages/operation/classify/addClassify")
}
const reviewList7 = {
	path: '/index/maintain/newClassify',
	name: 'reviewlist7',
	meta: {
		index: 2,
		title: '内容分类-添加新分类'
	},
	component: () =>
		import("@/pages/operation/classify/newClassify")
}

const reviewList8 = {
	path: '/index/maintain/patient_management',
	name: 'reviewlist8',
	meta: {
		index: 2,
		title: '患者管理'
	},
	// patientmanagement
	component: () =>
		import("@/pages/operation/contentmen/patientmanagement/patientmanagement_home")
}

const reviewList9 = {
	path: '/index/maintain/home',
	name: 'reviewlist9',
	meta: {
		index: 2,
		title: '机构管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/home.vue")
}
const reviewList10 = {
	path: '/index/maintain/home_info',
	name: 'reviewlist10',
	meta: {
		index: 2,
		title: '医院信息'
	},
	component: () =>
		import("@/pages/operation/contentmen/homeinfo/home_info")
}

const reviewList11 = {
	path: '/index/maintain/news',
	name: 'reviewlist11',
	meta: {
		index: 2,
		title: '动态新闻'
	},
	component: () =>
		import("@/pages/operation/contentmen/news/new_home")
}

const reviewList14 = {
	path: '/index/maintain/news_edit',
	name: 'reviewlist14',
	meta: {
		index: 2,
		title: '动态新闻-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/news/news_edit")
}
const d_createdNews = {
	path: '/index/maintain/news_add',
	name: 'd_createdNews',
	meta: {
		index: 2,
		title: '动态新闻-新增'
	},
	component: () =>
		import("@/pages/operation/contentmen/news/news_add")
}
const reviewList12 = {
	path: '/index/maintain/expert',
	name: 'reviewlist12',
	meta: {
		index: 2,
		title: '专家介绍'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_list")
}
const reviewList15 = {
	path: '/index/maintain/expert_add',
	name: 'reviewlist15',
	meta: {
		index: 2,
		title: '专家介绍-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_add")
}
const expert_edit = {
	path: '/index/maintain/expert_edit',
	name: 'reviewlist15',
	meta: {
		index: 2,
		title: '专家介绍-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/expert/expert_edit")
}
const reviewList13 = {
	path: '/index/maintain/service_management',
	name: 'reviewlist13',
	meta: {
		index: 2,
		title: '服务管理'
	},
	component: () =>
		import("@/pages/operation/contentmen/management/management_home")
}


const reviewList16 = {
	path: '/index/maintain/management_add',
	name: 'reviewlist16',
	meta: {
		index: 2,
		title: '服务管理-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/management/management_add")
}
const reviewList17 = {
	path: '/index/maintain/i_banner',
	name: 'reviewlist17',
	meta: {
		index: 2,
		title: 'Banner'
	},
	component: () =>
		import("@/pages/operation/contentmen/banner/banner_home")
}
const reviewList18 = {
	path: '/index/maintain/banner_add',
	name: 'reviewlist18',
	meta: {
		index: 2,
		title: 'Banner-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/banner/banner_add")
}
const addBanner = {
	path: '/index/maintain/banner_edit',
	name: 'addBanner',
	meta: {
		index: 2,
		title: 'Banner-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/banner/banner_edit")
}
const reviewList19 = {
	path: '/index/maintain/i_keshi',
	name: 'reviewlist19',
	meta: {
		index: 2,
		title: '院内科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_list")
}
const reviewList20 = {
	path: '/index/maintain/medicine_add',
	name: 'reviewlist20',
	meta: {
		index: 2,
		title: '院内科室-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_add")
}
const reviewList21 = {
	path: '/index/maintain/medicine_edit',
	name: 'expert_edit',
	meta: {
		index: 2,
		title: '院内科室-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/medicine/medicine_edit")
}
const reviewList22 = {
	path: '/index/maintain/k_department',
	name: 'reviewlist22',
	meta: {
		index: 2,
		title: '预约科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/bookingoffice/bookingoffice_home")
}
const reviewList23 = {
	path: '/index/maintain/bookingoffice_edit',
	name: 'reviewlist23',
	meta: {
		index: 2,
		title: '预约科室-编辑'
	},
	component: () =>
		import("@/pages/operation/contentmen/bookingoffice/bookingoffice_edit")
}
const reviewList24 = {
	path: '/index/maintain/t_keshi',
	name: 'reviewlist24',
	meta: {
		index: 2,
		title: '特色科室'
	},
	component: () =>
		import("@/pages/operation/contentmen/departments/departments_list")
}
const reviewList25 = {
	path: '/index/maintain/departments_list',
	name: 'reviewlist25',
	meta: {
		index: 2,
		title: '特色科室-添加'
	},
	component: () =>
		import("@/pages/operation/contentmen/departments/departments_edit")
}

export default {
	reviewList,
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