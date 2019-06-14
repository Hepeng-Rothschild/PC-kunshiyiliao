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
	component: () => import(/* webpackChunkName: 'operation-doctorOperation-Doctor_certification' */"@/pages/operation/doctorReview/list")
}
const reviewEdit = {
	path: 'operation/doctorreview/edit',
	name: 'reviewedit',
	meta: {
		index: 3,
		title: '医生信息编辑'
	},
	component: () => import(/* webpackChunkName: 'operation-doctorOperation-Doctor_certification' */"@/pages/operation/doctorReview/edit")
}
const reviewreview = {
	path: 'operation/doctorreview/review',
	name: 'reviewreview',
	meta: {
		index: 3,
		title: '医生认证审核'
	},
	component: () => import(/* webpackChunkName: 'operation-doctorOperation-Doctor_certification' */"@/pages/operation/doctorReview/review")
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
		import(/* webpackChunkName: 'operation-doctorOperation-Remoteclinic' */"@/pages/operation/remoteclinic/list")
}
const DoctorRemoteclinicEdit = {
	path: 'operation/remoteclinic/edit',
	name: 'DoctorRemoteclinicEdit',
	meta: {
		index: 3,
		title: '远程门诊-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Remoteclinic' */"@/pages/operation/remoteclinic/edit")
}

const DoctorRemoteclinicAdd = {
	path: 'operation/remoteclinic/add',
	name: 'DoctorRemoteclinicAdd',
	meta: {
		index: 3,
		title: '远程门诊-新增'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Remoteclinic' */"@/pages/operation/remoteclinic/add")
}
const uploaddemo = {
	path: 'operation/uploaddemo',
	name: 'uploaddemo',
	meta: {
		index: 2,
		title: 'uploaddemo'
	},
	component: () => import(/* webpackChunkName: 'no-used' */"@/pages/operation/upload")
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
		import(/* webpackChunkName: 'operation-doctorOperation-Contentmanagement' */"@/pages/operation/doctorContentCheck/home")
}
const doctorContentCheckListHelAdd = {
	path: 'operation/doctorContentCheck/hel-add',
	name: 'doctorContentCheckListHelAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Contentmanagement' */"@/pages/operation/doctorContentCheck/healthEducationEdit")
}
const doctorContentCheckListHelEdit = {
	path: 'operation/doctorContentCheck/hel-edit',
	name: 'doctorContentCheckListHelEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Contentmanagement' */"@/pages/operation/doctorContentCheck/healthEducationEdit")
}
const doctorContentCheckListClsAdd = {
	path: 'operation/doctorContentCheck/cls-add',
	name: 'doctorContentCheckListClsAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Contentmanagement' */"@/pages/operation/doctorContentCheck/classicCaseEdit")
}
const doctorContentCheckListClsEdit = {
	path: 'operation/doctorContentCheck/cls-edit',
	name: 'doctorContentCheckListClsEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Contentmanagement' */"@/pages/operation/doctorContentCheck/classicCaseEdit")
}
const doctorContentCheckListHotAdd = {
	path: 'operation/doctorContentCheck/hot-add',
	name: 'doctorContentCheckListHotAdd',
	meta: {
		index: 3,
		title: '医生端内容管理-添加'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Contentmanagement' */"@/pages/operation/doctorContentCheck/hotRecommendEdit")
}
const doctorContentCheckListHotEdit = {
	path: 'operation/doctorContentCheck/hot-edit',
	name: 'doctorContentCheckListHotEdit',
	meta: {
		index: 3,
		title: '医生端内容管理-编辑'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-Contentmanagement' */"@/pages/operation/doctorContentCheck/hotRecommendEdit")
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
		import(/* webpackChunkName: 'operation-doctorOperation-DoctorList' */"@/pages/operation/dovtorservermanage/list")
}
const doctorServerManageEdit = {
	path: 'operation/doctormanage/edit',
	name: 'doctorServerManageEdit',
	meta: {
		index: 3,
		title: '医生服务管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-DoctorList' */"@/pages/operation/dovtorservermanage/edit")
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
		import(/* webpackChunkName: 'operation-doctorOperation-version' */"@/pages/operation/versionManagement/list")
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
		import(/* webpackChunkName: 'operation-doctorOperation-version' */"@/pages/operation/versionManagement/add")
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
		import(/* webpackChunkName: 'operation-doctorOperation-version' */"@/pages/operation/versionManagement/edit")
}
// 医生小组列表
const doctorGroup = {
	path: 'operation/doctorGroup',
	name: 'doctorGroup',
	meta: {
		index: 2,
		title: '医生工作组列表'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-doctorGroup' */"@/pages/operation/doctorGroup/list")
}
// 新增医生工作组
const doctorAdd = {
	path: 'operation/doctorAdd',
	name: 'doctorAdd',
	meta: {
		index: 3,
		title: '新增医生工作组'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-doctorGroup' */"@/pages/operation/doctorGroup/add")
}
// 查看医生工作组
const doctorReview = {
	path: 'operation/doctorReview',
	name: 'doctorReview',
	meta: {
		index: 3,
		title: '查看医生工作组'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-doctorGroup' */"@/pages/operation/doctorGroup/review")
}
// 编辑医生工作组
const doctorEdit = {
	path: 'operation/doctorEdit',
	name: 'doctorEdit',
	meta: {
		index: 3,
		title: '编辑医生工作组'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-doctorGroup' */"@/pages/operation/doctorGroup/edit")
}
// 互联网排班
const interScheduling = {
	path: 'operation/interScheduling',
	name: 'interScheduling',
	meta: {
		index: 2,
		title: '互联网排班列表'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-interScheduling' */"@/pages/operation/interScheduling/list")
}
// 新增互联网排班
const interSchedulingAdd = {
	path: 'operation/interSchedulingAdd',
	name: 'interSchedulingAdd',
	meta: {
		index: 3,
		title: '新增互联网排班'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-interScheduling' */"@/pages/operation/interScheduling/add")
}
// 修改互联网排班
const interSchedulingEdit = {
	path: 'operation/interSchedulingEdit',
	name: 'interSchedulingEdit',
	meta: {
		index: 3,
		title: '修改互联网排班'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-doctorOperation-interScheduling' */"@/pages/operation/interScheduling/edit")
}
//医生端运营
export default{
	// 修改互联网排班
	interSchedulingEdit,
	// 新增互联网排班
	interSchedulingAdd,
	// 互联网排班
	interScheduling,
    // 医生端运营
    doctorManagement,
    // 医生认证
    reviewList,
    // 医生信息编辑
    reviewEdit,
    // 医生认证审核
    reviewreview,
    // uploaddemo
    uploaddemo,
    // 医生小组
    doctorGroup,
    // 医生小组添加
    doctorAdd,
    // 医生小组查看
    doctorReview,
    // 医生小组编辑
    doctorEdit,
    // 医生端内容管理
    doctorContentCheckList,
    // 医生端内容管理-添加
    doctorContentCheckListHelAdd,
    // 医生端内容管理-编辑
    doctorContentCheckListHelEdit,
    // 医生端内容管理-添加
    doctorContentCheckListClsAdd,
    // 医生端内容管理-编辑
    doctorContentCheckListClsEdit,
    // 医生端内容管理-添加
    doctorContentCheckListHotAdd,
    // 医生端内容管理-编辑
    doctorContentCheckListHotEdit,
    // 版本管理 列表 
    versionManagementList,
    // 添加版本
    versionManagementAdd,
    // 编辑版本
    versionManagementEdit,
	// 远程门诊
    DoctorRemoteclinicList,
    // 远程门诊编辑
    DoctorRemoteclinicEdit,
    // 远程门诊添加
    DoctorRemoteclinicAdd,
    // 医生列表
    doctorServerManageList,
    // 医生服务管理
    doctorServerManageEdit,
}