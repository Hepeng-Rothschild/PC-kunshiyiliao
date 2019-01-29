//索引管理
const indexManagementIndex = {
    path:'maintain/indexManagement/index',
    name:'indexManagementIndex',
    meta:{
        index:1,
        title:'索引管理'
    },
    redirect: '/index/maintain/residentregister/list'
}
const residentRegisterList = {
    path:'maintain/residentregister/list',
    name:'reviewlist3',
    meta:{
        index:2,
        title:'居民注册信息'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-resident' */"@/pages/maintain/residentregister/list")
}
// 医生注册信息
const doctorRegisterList = {
    path:'maintain/doctorregister/list',
    name:'doctorregisterlist',
    meta:{
        index:2,
        title:'医生注册信息'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-doctor' */"@/pages/maintain/doctorregister/list")
}
const doctorRegisterBatchOne = {
    path:'maintain/doctorregister/batchone',
    name:'doctorregisterbatchone',
    meta:{
        index:3,
        title:'医生注册信息-批量加入-第一步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-doctor' */"@/pages/maintain/doctorregister/one")
}
const doctorRegisterBatchTwo = {
    path:'maintain/doctorregister/batchtwo',
    name:'doctorregisterbatchtwo',
    meta:{
        index:3,
        title:'医生注册信息-批量加入-第二步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-doctor' */"@/pages/maintain/doctorregister/two")
}
const doctorRegisterBatchThree = {
    path:'maintain/doctorregister/batchthree',
    name:'doctorregisterbatchthree',
    meta:{
        index:3,
        title:'医生注册信息-批量加入-第三步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-doctor' */"@/pages/maintain/doctorregister/three")
}

// 机构注册信息
const mechanismregList = {
    path:'maintain/mechanismreg/list',
    name:'mechanismreglist',
    meta:{
        index:2,
        title:'机构注册信息'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/list")
}
const mechanismregAdd = {
    path:'maintain/mechanismreg/mechanismregAdd',
    name:'mechanismregadd',
    meta:{
        index:3,
        title:'机构注册信息-新增'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/add")
}
const mechanismregEdit = {
    path:'maintain/mechanismreg/mechanismregEdit',
    name:'mechanismregedit',
    meta:{
        index:3,
        title:'机构注册信息-编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/edit")
}
const mechanismregBatchOne = {
    path:'maintain/mechanismreg/batchone',
    name:'mechanismregeditbatchone',
    meta:{
        index:3,
        title:'机构注册信息-批量加入-第一步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/one")
}
const mechanismregBatchTwo = {
    path:'maintain/mechanismreg/batchtwo',
    name:'mechanismregeditbatchtwo',
    meta:{
        index:3,
        title:'机构注册信息-批量加入-第二步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/two")
}
const mechanismregBatchThree = {
    path:'maintain/mechanismreg/batchthree',
    name:'mechanismregeditbatchthree',
    meta:{
        index:3,
        title:'机构注册信息-批量加入-第三步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/three")
}
//系统管理
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

// 权限管理
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
//接口权限管理
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

//菜单管理
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


//配置仓
const configurationWarehouseIndex = {
    path:'maintain/configurationWarehouse/index',
    name:'configurationWarehouseIndex',
    meta:{
        index:1,
        title:'配置仓'
    },
    redirect: '/index/maintain/dictionary/tree'
}
const dictionary = {
    path:'maintain/dictionary/tree',
    name:'dictionary',
    meta:{
        index:2,
        title:'字典管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-dictionaries' */"@/pages/maintain/dictionary/tree")
}
const diseaseList = {
    path:'maintain/disease/list',
    name:'diseaseList',
    meta:{
        index:2,
        title:'疾病管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-disease' */"@/pages/maintain/disease/list")
}
const diseaseEdit = {
    path:'maintain/disease/edit',
    name:'diseaseEdit',
    meta:{
        index:3,
        title:'疾病编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-disease' */"@/pages/maintain/disease/edit")
}
const symptomList = {
    path:'maintain/symptom/list',
    name:'symptomList',
    meta:{
        index:2,
        title:'症状管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-symptom' */"@/pages/maintain/symptom/list")
}
const symptomEdit = {
    path:'maintain/symptom/edit',
    name:'symptomEdit',
    meta:{
        index:3,
        title:'症状编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-symptom' */"@/pages/maintain/symptom/edit")
}
const starClass = {
    path:'maintain/starClass/list',
    name:'starClassList',
    meta:{
        index:3,
        title:'评价管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-disposed-starclass' */"@/pages/maintain/starClass/list")
}



export default {
    //索引管理
    indexManagementIndex,
    residentRegisterList,
    //医生 注册信息
    doctorRegisterList,
    doctorRegisterBatchOne,
    doctorRegisterBatchTwo,
    doctorRegisterBatchThree,
    //机构注册信息
    mechanismregList,
    mechanismregAdd,
    mechanismregEdit,
    mechanismregBatchOne,
    mechanismregBatchTwo,
    mechanismregBatchThree,
    //系统管理
    systemManagementIndex,
    adminList,
    adminAdd,
    adminReset,
    adminEdit,
    adminJurisdiction,
    // 权限管理
    jurisdictionList,
    jurisdictionAdd,
    //接口权限管理
    interfacePermiseList,
    interfacePermiseEdit,
    //菜单管理
    menuManagementList,
    menuManagementEdit,
    //配置仓
    configurationWarehouseIndex,
    //字典管理
    dictionary,
    //疾病/症状管理
    diseaseList,
    diseaseEdit,
    symptomList,
    symptomEdit,
    starClass
}