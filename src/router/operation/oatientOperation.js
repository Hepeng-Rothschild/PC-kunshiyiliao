// 患者端运营
const patientOperation = {
	path: 'operation/patient/index',
	name: 'patientOperation',
	meta: {
		index: 1,
		title: '患者端运营'
	},
	redirect: '/index/operation/contentmanagement_home'
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
		import(/* webpackChunkName: 'operation-poatientOperation-contentmanagement' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_home")
}
const contentmanagementAdd = {
	path: 'operation/contentmanagement_add',
	name: 'contentmanagementAdd',
	meta: {
		index: 3,
		title: '内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-poatientOperation-contentmanagement' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_add")
}

const createNews = {
	path: 'operation/contentmanagement_edit',
	name: 'createNews',
	meta: {
		index: 3,
		title: '内容管理-修改'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-poatientOperation-contentmanagement' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const createdNews = {
	path: 'operation/createNews',
	name: 'createdNews',
	meta: {
		index: 3,
		title: '内容管理-创建新闻'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-poatientOperation-contentmanagement' */"@/pages/operation/contentmen/contentmanagement/contentmanagement_edit")
}
const c6 = {
	path: 'operation/f_Classify',
	name: 'c6',
	meta: {
		index: 2,
		title: '内容分类'
	},
	component: () =>
		import(/* webpackChunkName: 'no-used' */"@/pages/operation/classify/f_Classify")
}

const addClassify = {
	path: 'operation/addClassify',
	name: 'addClassify',
	meta: {
		index: 3,
		title: '内容分类-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'no-used' */"@/pages/operation/classify/addClassify")
}
const newClassify = {
	path: 'operation/newClassify',
	name: 'newClassify',
	meta: {
		index: 3,
		title: '内容分类-添加新分类'
	},
	component: () =>
		import(/* webpackChunkName: 'no-used' */"@/pages/operation/classify/newClassify")
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
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/liveMant/list")
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
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/liveMant/liveAdd")
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
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/liveMant/liveEdit")
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
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/liveMant/broadAdd")
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
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/liveMant/broadEdit")
}
const broadReview = {
	// 直播管理
	path: 'operation/liveMant/broadReview',
	name: 'liveMantbroadReview',
	meta: {
		index: 3,
		title: '查看直播'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/liveMant/broadReview")
}
const broadlookLive = {
	// 直播管理
	path: 'operation/liveMant/broadlookLive',
	name: 'liveMantbroadlookLive',
	meta: {
		index: 3,
		title: '进入直播'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/liveMant/broadLookLive")
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
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/physicianAudit/list")
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
		import(/* webpackChunkName: 'operation-poatientOperation-liveMant' */"@/pages/operation/physicianAudit/search")
}
const physicianReview = {
	// 讲堂审核
	path: 'operation/physicianAudit/liveReview',
	name: 'physicianReview',
	meta: {
		index: 3,
		title: '直播审核'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-poatientOperation' */"@/pages/operation/physicianAudit/review")
}
const registerList = {
	path: 'operation/register/list',
	name: 'registerlist',
	meta: {
		index: 2,
		title: '医生排班列表'
	},
	component: () => import(/* webpackChunkName: 'operation-poatientOperation' */"@/pages/operation/register/list")
}
const registerNormalEdit = {
	path: 'operation/register/normaledit',
	name: 'registerNormalEdit',
	meta: {
		index: 3,
		title: '添加医生挂号信息'
	},
	component: () => import(/* webpackChunkName: 'operation-poatientOperation' */"@/pages/operation/register/normaledit")
}
const registerSegmentationEdit = {
	path: 'operation/register/segmentationedit',
	name: 'registerSegmentationEdit',
	meta: {
		index: 3,
		title: '添加医生挂号信息'
	},
	component: () => import(/* webpackChunkName: 'operation-poatientOperation' */"@/pages/operation/register/segmentationedit")
}
const registerNormalDetail = {
	path: 'operation/register/normaldetail',
	name: 'registernormaldetail',
	meta: {
		index: 3,
		title: '预约挂号详情'
	},
	component: () => import(/* webpackChunkName: 'operation-poatientOperation' */"@/pages/operation/register/normaldetail")
}
const registerSegmentationDetail = {
	path: 'operation/register/segmentationdetail',
	name: 'registersegmentationdetail',
	meta: {
		index: 3,
		title: '预约挂号详情'
	},
	component: () => import(/* webpackChunkName: 'operation-poatientOperation' */"@/pages/operation/register/segmentationdetail")
}
const patientManagement = {
	path: 'operation/patient_management',
	name: 'patientManagement',
	meta: {
		index: 2,
		title: '患者管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-poatientOperation' */"@/pages/operation/patientmanagement/patientmanagement_home")
}
// 直播转换
const liveTransitionList = {
	path: 'operation/liveTransition/list',
	name: 'liveTransitionList',
	meta: {
		index: 2,
		title: '患者管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-liveTransition' */"@/pages/operation/liveTransition/list")
}
const liveTransitionReview = {
	path: 'operation/liveTransition/review',
	name: 'liveTransitionReview',
	meta: {
		index: 2,
		title: '患者管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-liveTransition' */"@/pages/operation/liveTransition/review")
}
export default{
	// 查看直播转换
	liveTransitionReview,
	// 直播转换
	liveTransitionList,
    // 患者端运营
    patientOperation,
    // 内容管理列表
    contentmanagementHome,
    // 内容管理添加
    contentmanagementAdd,
    // 内容管理编辑
    createNews,
    // 内容管理-创建新闻
    createdNews,
    // 内容分类列表
    c6,
    // 内容分类-编辑
    addClassify,
    // 内容分类-添加新分类
    newClassify,
    // 讲堂点播 
    liveMantList,
    // 点播添加
    liveMantAdd,
    // 点播编辑
    liveMantEdit,
    // 添加直播
    broadAdd,
    // 编辑直播
	broadEdit,
	// 进入直播
	broadlookLive,
    // 查看直播
    broadReview,
    // 讲堂审核列表
    physicianAudit,
    // 讲堂查看
    physicianAuditSee,
    // 直播审核
    physicianReview,
    // 医生排班列表
    registerList,
    // 添加医生挂号信息
    registerNormalEdit,
    // 添加医生挂号信息
    registerSegmentationEdit,
    // 预约挂号详情
    registerNormalDetail,
    // 预约挂号详情
	registerSegmentationDetail,
	// 患者管理
	patientManagement,
}