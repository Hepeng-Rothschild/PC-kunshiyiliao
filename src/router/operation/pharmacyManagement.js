// 药店端系统管理
const pharmacyManagement = {
	path: 'operation/pharmacyManagement/index',
	name: 'pharmacyManagement',
	meta: {
		index: 1,
		title: '药店端系统管理'
	},
	redirect:'/index/operation/pharmacyManagement/list'
}
const rolePermissions = {
	path: 'operation/pharmacyManagement/list',
	name: 'rolePermissions',
	meta: {
		index: 2,
		title: '药店端角色权限管理'
	},
	component: () => import(/* webpackChunkName: 'operation-pharmacyManagement-rolePermissions' */"@/pages/operation/pharmacyManagement/list")
}
// 药店端系统管理
export default{ 
    //药店端角色权限管理
    rolePermissions,
    //药店端系统管理
    pharmacyManagement,
}