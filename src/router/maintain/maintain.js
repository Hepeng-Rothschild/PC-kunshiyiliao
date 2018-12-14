const residentRegisterList = {
    path:'maintain/residentregister/list',
    name:'reviewlist3',
    meta:{
        index:2,
        title:'居民注册信息'
    },
    component:()=>import("@/pages/maintain/residentregister/list")
}
// 医生注册信息
const doctorRegisterList = {
    path:'maintain/doctorregister/list',
    name:'doctorregisterlist',
    meta:{
        index:2,
        title:'医生注册信息'
    },
    component:()=>import("@/pages/maintain/doctorregister/list")
}
const doctorRegisterBatchOne = {
    path:'maintain/doctorregister/batchone',
    name:'doctorregisterbatchone',
    meta:{
        index:2,
        title:'医生注册信息-批量加入-第一步'
    },
    component:()=>import("@/pages/maintain/doctorregister/one")
}
const doctorRegisterBatchTwo = {
    path:'maintain/doctorregister/batchtwo',
    name:'doctorregisterbatchtwo',
    meta:{
        index:2,
        title:'医生注册信息-批量加入-第二步'
    },
    component:()=>import("@/pages/maintain/doctorregister/two")
}
const doctorRegisterBatchThree = {
    path:'maintain/doctorregister/batchthree',
    name:'doctorregisterbatchthree',
    meta:{
        index:2,
        title:'医生注册信息-批量加入-第三步'
    },
    component:()=>import("@/pages/maintain/doctorregister/three")
}

// 机构注册信息
const mechanismregList = {
    path:'maintain/mechanismreg/list',
    name:'mechanismreglist',
    meta:{
        index:2,
        title:'机构注册信息'
    },
    component:()=>import("@/pages/maintain/mechanismreg/list")
}
const mechanismregAdd = {
    path:'maintain/mechanismreg/mechanismregAdd',
    name:'mechanismregadd',
    meta:{
        index:2,
        title:'机构注册信息-新增'
    },
    component:()=>import("@/pages/maintain/mechanismreg/add")
}
const mechanismregEdit = {
    path:'maintain/mechanismreg/mechanismregEdit',
    name:'mechanismregedit',
    meta:{
        index:2,
        title:'机构注册信息-编辑'
    },
    component:()=>import("@/pages/maintain/mechanismreg/edit")
}
const mechanismregBatchOne = {
    path:'maintain/mechanismreg/batchone',
    name:'mechanismregeditbatchone',
    meta:{
        index:2,
        title:'机构注册信息-批量加入-第一步'
    },
    component:()=>import("@/pages/maintain/mechanismreg/one")
}
const mechanismregBatchTwo = {
    path:'maintain/mechanismreg/batchtwo',
    name:'mechanismregeditbatchtwo',
    meta:{
        index:2,
        title:'机构注册信息-批量加入-第二步'
    },
    component:()=>import("@/pages/maintain/mechanismreg/two")
}
const mechanismregBatchThree = {
    path:'maintain/mechanismreg/batchthree',
    name:'mechanismregeditbatchthree',
    meta:{
        index:2,
        title:'机构注册信息-批量加入-第三步'
    },
    component:()=>import("@/pages/maintain/mechanismreg/three")
}
//系统管理
const adminList = {
    path:'maintain/admin/list',
    name:'adminlist',
    meta:{
        index:2,
        title:'系统管理'
    },
    component:()=>import("@/pages/maintain/admin/list")
}
const adminAdd = {
    path:'maintain/admin/add',
    name:'adminadd',
    meta:{
        index:2,
        title:'添加账号'
    },
    component:()=>import("@/pages/maintain/admin/add")
}
const adminEdit = {
    path:'maintain/admin/edit',
    name:'adminedit',
    meta:{
        index:2,
        title:'编辑账号'
    },
    component:()=>import("@/pages/maintain/admin/edit")
}
const adminReset = {
    path:'maintain/admin/reset',
    name:'adminreset',
    meta:{
        index:2,
        title:'重置密码'
    },
    component:()=>import("@/pages/maintain/admin/reset")
}


export default {
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
    adminList,
    adminAdd,
    adminReset,
    adminEdit,
   
}