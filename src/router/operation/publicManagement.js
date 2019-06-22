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
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/publicAddress/home")
}
const wxBannerList = {
	path: 'operation/banner/list',
	name: 'wxbannerList',
	meta: {
		index: 2,
		title: 'banner图'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/publicAddress/banner/list")
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
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/publicAddress/banner/add")
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
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/publicAddress/banner/edit")
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
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/publicAddress/template/home")
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
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/publicAddress/typeManagement/list")
}
const wxopeningmanagement = {
	path: 'operation/wxopeningmanagement/index',
	name: 'wxopeningManagement',
	meta: {
		index: 2,
		title: '公众号管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/publicAddress/openingmanagement/index")
}
const fileManagementList = {
	path: 'operation/fileManagement/list',
	name: 'fileManagementList',
	meta: {
		index: 2,
		title: '档案管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-publicManagement' */"@/pages/operation/fileManagement/list")
}
export default {
    // 档案管理
    fileManagementList,
    // 公众号管理
    wxopeningmanagement,
    // 菜单管理
    typeManagement,
    // 模板管理
    templateHome,
    // banner图编辑
    wxBannerEdit,
    // banner图添加
    wxBannerAdd,
    // banner图
    wxBannerList,
    // 公众号管理
    publicAddressList,
    // 公众号托管
    publicHostingIndex,
}