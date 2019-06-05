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
export default {
    // 机构注册信息-批量加入
    mechanismregBatchThree,
    mechanismregBatchTwo,
    mechanismregBatchOne,
    // 机构注册信息-编辑
    mechanismregEdit,
    // 机构注册信息-新增
    mechanismregAdd,
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