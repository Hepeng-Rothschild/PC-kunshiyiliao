// 索引信息
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
const doctorRegisterList = {
    path:'maintain/doctorregister/list',
    name:'doctorregisterlist',
    meta:{
        index:2,
        title:'医生注册信息'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-doctor' */"@/pages/maintain/doctorregister/list")
}
const doctorRegisterAdd = {
    path:'maintain/doctorregister/addDoctor',
    name:'doctorregisterAdd',
    meta:{
        index:3,
        title:'添加医生'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-doctor' */"@/pages/maintain/doctorregister/addDoctor")
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
const mechanismregDepartment = {
    path:'maintain/mechanismreg/mechanismregDepartment',
    name:'mechanismregdepartment',
    meta:{
        index:3,
        title:'机构注册信息-院内科室'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/department")
}
const mechanismregDepartmentAdd = {
    path:'maintain/mechanismreg/mechanismregDepartment/add',
    name:'mechanismregdepartmentadd',
    meta:{
        index:3,
        title:'机构注册信息-新增-院内科室'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/departmentadd")
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
const mechanismregDetails = {
    path:'maintain/mechanismreg/mechanismregDetails',
    name:'mechanismregedetails',
    meta:{
        index:3,
        title:'机构注册信息-详情'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/mechanismreg/details")
}
const pharmacyBatchOne = {
    path:'maintain/pharmacy/batchone',
    name:'pharmacyeditbatchone',
    meta:{
        index:3,
        title:'药店信息管理-批量加入-第一步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/pharmacy/one")
}
const pharmacyBatchTwo = {
    path:'maintain/pharmacy/batchtwo',
    name:'pharmacyeditbatchtwo',
    meta:{
        index:3,
        title:'药店信息管理-批量加入-第二步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/pharmacy/two")
}
const pharmacyBatchThree = {
    path:'maintain/pharmacy/batchthree',
    name:'pharmacyeditbatchthree',
    meta:{
        index:3,
        title:'药店信息管理-批量加入-第三步'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-mechanism' */"@/pages/maintain/pharmacy/three")
}
const pharmacyList = {
    path:'maintain/pharmacy/list',
    name:'pharmacyList',
    meta:{
        index:2,
        title:'药店信息管理'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-pharmacyList' */"@/pages/maintain/pharmacy/list")
}
const pharmacyEdit = {
    path:'maintain/pharmacy/edit',
    name:'pharmacyEdit',
    meta:{
        index:3,
        title:'药店信息管理-编辑'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-pharmacyList' */"@/pages/maintain/pharmacy/edit")
}
const pharmacyDetails = {
    path:'maintain/pharmacy/details',
    name:'pharmacyDetails',
    meta:{
        index:3,
        title:'药店信息管理-详情'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-pharmacyList' */"@/pages/maintain/pharmacy/details")
}
const pharmacyListAdd = {
    path:'maintain/pharmacy/add',
    name:'pharmacyAdd',
    meta:{
        index:3,
        title:'添加新药店'
    },
    component:()=>import(/* webpackChunkName: 'maintain-residentregister-pharmacyList' */"@/pages/maintain/pharmacy/add")
}
export default {
    // 药店信息管理
    pharmacyList,
    // 药店信息管理-编辑
    pharmacyDetails,
    pharmacyEdit,
    // 添加药店
    pharmacyListAdd,
    // 药店信息管理-批量加入
    pharmacyBatchOne,
    pharmacyBatchTwo,
    pharmacyBatchThree,
    // 机构注册信息-编辑
    mechanismregEdit,
    // 机构注册信息-详情
    mechanismregDetails,
    // 机构注册信息-新增
    mechanismregAdd,
    //新增院内科室
    mechanismregDepartment,
    mechanismregDepartmentAdd,
    // 机构注册信息
    mechanismregList,
    // 医生注册信息-批量加入
    doctorRegisterBatchThree,
    doctorRegisterBatchTwo,
    doctorRegisterBatchOne,
    // 单个添加医生
    doctorRegisterAdd,
    // 医生注册信息
    doctorRegisterList,
    // 居民注册信息/
    residentRegisterList,
    // 索引管理
    indexManagementIndex,

}