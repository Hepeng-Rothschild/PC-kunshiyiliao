// 服务包管理
const servicePackagePindex = {
	path: 'operation/servicePackage/pindex',
	name: 'servicePackagePindex',
	meta: {
		index: 1,
		title: '服务包管理'
	},
	redirect: '/index/operation/servicePackage/pList'
}
const servicePackageItemList = {
	path: 'operation/servicePackage/itemList',
	name: 'servicePackageitemList',
	meta: {
		index: 2,
		title: '服务项目管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/itemList")
}
const servicePackageItemAdd = {
	path: 'operation/servicePackage/itemAdd',
	name: 'servicePackageitemAdd',
	meta: {
		index: 3,
		title: '添加服务项'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/itemEdit")
}
const servicePackageItemEdit = {
	path: 'operation/servicePackage/itemEdit',
	name: 'servicePackageitemEdit',
	meta: {
		index: 3,
		title: '编辑服务项'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/itemEdit")
}
const servicePackageItemImportOne = {
	path: 'operation/servicePackage/itemImportOne',
	name: 'servicePackageItemImportOne',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/itemImportOneStep")
}
const servicePackageItemImportTwo = {
	path: 'operation/servicePackage/itemImportTwo',
	name: 'servicePackageItemImportTwo',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/itemImportTwoStep")
}
const servicePackageItemImportThree = {
	path: 'operation/servicePackage/itemImportThree',
	name: 'servicePackageItemImportThree',
	meta: {
		index: 3,
		title: '服务项批量导入'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/itemImportThreeStep")
}

const servicePackagePList = {
	path: 'operation/servicePackage/pList',
	name: 'servicePackagePList',
	meta: {
		index: 2,
		title: '服务包管理'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/packageList")
}
const servicePackagePEdit = {
	path: 'operation/servicePackage/pEdit',
	name: 'servicePackagePEdit',
	meta: {
		index: 3,
		title: '编辑服务包'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/packageEdit")
}
const servicePackagePDetail = {
	path: 'operation/servicePackage/pDetail',
	name: 'servicePackagePDetail',
	meta: {
		index: 3,
		title: '查看服务包'
	},
	component: () =>
		import(/* webpackChunkName: 'operation-servicepackage' */"@/pages/operation/servicePackage/packageDetail")
}

export default {
    // 查看服务包
    servicePackagePDetail,
    // 编辑服务包
    servicePackagePEdit,
    // 服务包管理
    servicePackagePList,
    // 服务包管理
    servicePackagePindex,
    // 服务项批量导入/
    servicePackageItemImportThree,
    servicePackageItemImportTwo,
    servicePackageItemImportOne,
    // 编辑服务项
    servicePackageItemEdit,
    // 添加服务项
    servicePackageItemAdd,
    // 服务项目管理
    servicePackageItemList,

}