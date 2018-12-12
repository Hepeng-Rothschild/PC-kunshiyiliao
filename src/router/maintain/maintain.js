const residentRegisterList = {
    path:'maintain/residentregister/list',
    name:'reviewlist3',
    meta:{
        index:2,
        title:'居民注册信息'
    },
    component:()=>import("@/pages/maintain/residentregister/list")
}
const doctorRegisterList = {
    path:'maintain/doctorregister/list',
    name:'doctorregisterlist',
    meta:{
        index:2,
        title:'医生注册信息'
    },
    component:()=>import("@/pages/maintain/doctorregister/list")
}
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
        title:'机构注册信息-新增'
    },
    component:()=>import("@/pages/maintain/mechanismreg/edit")
}


export default {
	residentRegisterList,
    doctorRegisterList,
    mechanismregList,
    mechanismregAdd,
    mechanismregEdit,
}