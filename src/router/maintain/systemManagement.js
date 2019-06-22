// 运维端系统管理
const systemManagementIndex = {
    path:'maintain/systemManagement/index',
    name:'systemManagementIndex',
    meta:{
        index:1,
        title:'系统管理'
    },
    redirect: '/index/maintain/admin/user/list'
}
const adminList = {
    path:'maintain/admin/user/list',
    name:'adminlist',
    meta:{
        index:2,
        title:'系统管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement' */"@/pages/maintain/admin/user/list")
}
const adminAdd = {
    path:'maintain/admin/user/add',
    name:'adminadd',
    meta:{
        index:3,
        title:'添加账号'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-user' */"@/pages/maintain/admin/user/add")
}
const adminEdit = {
    path:'maintain/admin/user/edit',
    name:'adminedit',
    meta:{
        index:3,
        title:'编辑账号'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-user' */"@/pages/maintain/admin/user/edit")
}
const adminReset = {
    path:'maintain/admin/user/reset',
    name:'adminreset',
    meta:{
        index:3,
        title:'重置密码'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-user' */"@/pages/maintain/admin/user/reset")
}
const adminJurisdiction = {
    path:'maintain/admin/user/Jurisdiction',
    name:'adminJurisdiction',
    meta:{
        index:3,
        title:'用户权限管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-user' */"@/pages/maintain/admin/user/Jurisdiction")
}
const jurisdictionList = {
    path:'maintain/admin/jurisdiction/list',
    name:'jurisdictionList',
    meta:{
        index:2,
        title:'权限管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-power' */"@/pages/maintain/admin/jurisdiction/list")
}
const jurisdictionAdd = {
    // 权限管理-添加角色
    path:'maintain/admin/jurisdiction/add',
    name:'jurisdictionAdd',
    meta:{
        index:3,
        title:'权限管理-添加角色'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-power' */"@/pages/maintain/admin/jurisdiction/add")
}
const interfacePermiseList = {
    path:'maintain/system/iface_permise/lt',
    name:'interfacePermiseList',
    meta:{
        index:2,
        title:'权限管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-power' */"@/pages/maintain/system/interfacePermise/list")
}
const interfacePermiseEdit = {
    path:'maintain/system/iface_permise/ed',
    name:'interfacePermiseEdit',
    meta:{
        index:3,
        title:'权限管理-编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-power' */"@/pages/maintain/system/interfacePermise/edit")
}
const menuManagementList = {
    path:'maintain/system/m_manage/lt',
    name:'menuManagementList',
    meta:{
        index:2,
        title:'菜单管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-menumanagement' */"@/pages/maintain/system/menuManagement/list")
}
const menuManagementEdit = {
    path:'maintain/system/m_manage/ed',
    name:'menuManagementEdit',
    meta:{
        index:3,
        title:'菜单管理-编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-menumanagement' */"@/pages/maintain/system/menuManagement/edit")
}
const paymentHome = {
    path:'maintain/payment/index',
    name:'paymentHome',
    meta:{
        index:3,
        title:'支付方式-列表'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-menumanagement' */"@/pages/maintain/payment/index")
}
const paymentSelect = {
    path:'maintain/payment/select',
    name:'paymentSelect',
    meta:{
        index:3,
        title:'支付方式-选择'
    },
    component:()=>import(/* webpackChunkName: 'maintain-adminmanagement-menumanagement' */"@/pages/maintain/payment/select")
}
const sensitiveWordEdit = {
    path:'maintain/sensitiveWord/edit',
    name:'sensitiveWordEdit',
    meta:{
        index:2,
        title:'敏感词汇'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-starclass' */"@/pages/maintain/sensitiveWord/edit")
}

const  interfaceManagementList = {
    path:'maintain/nterfaceManagement/list',
    name:'interfaceManagementList',
    meta:{
        index: 2,
        title:'接口管理-列表'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-interfaceManagement' */"@/pages/maintain/interfaceManagement/list")
}
const  interfaceManagementAdd = {
    path:'maintain/nterfaceManagement/add',
    name:'interfaceManagementAdd',
    meta:{
        index: 2,
        title:'接口管理-新增'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-interfaceManagement' */"@/pages/maintain/interfaceManagement/add")
}
const  interfaceManagementEdit = {
    path:'maintain/nterfaceManagement/edit',
    name:'interfaceManagementEdit',
    meta:{
        index: 2,
        title:'接口管理-编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-interfaceManagement' */"@/pages/maintain/interfaceManagement/edit")
}

export default {
    // 接口管理-编辑
    interfaceManagementEdit,
    // 接口管理-新增
    interfaceManagementAdd,
    // 接口管理-列表
    interfaceManagementList,
    // 敏感词汇
    sensitiveWordEdit,
    // 支付方式-选择
    paymentSelect,
    // 支付方式-列表
    paymentHome,
    // 菜单管理-编辑
    menuManagementEdit,
    // 菜单管理
    menuManagementList,
    // 权限管理-编辑
    interfacePermiseEdit,
    // 权限管理
    interfacePermiseList,
    // 权限管理-添加角色
    jurisdictionAdd,
    // 权限管理
    jurisdictionList,
    // 用户权限管理
    adminJurisdiction,
    // 编辑账号
    adminEdit,
    // 重置密码
    adminReset,
    // 添加账号
    adminAdd,
    // 系统管理
    adminList,
    // 系统管理
    systemManagementIndex,

}