// 运营端系统管理
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
    // 添加功能
    wxSystemManagementAddFn,
    // 编辑菜单
    wxSystemManagementEdit,
    // 添加菜单
    wxSystemManagementAdd,
    // 菜单管理
    wxSystemManagement,
}