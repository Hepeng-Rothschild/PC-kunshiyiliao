const residentRegisterList = {
    path:'maintain/residentregister/list',
    name:'reviewlist3',
    meta:{
        index:2,
        title:'居民注册信息'
    },
    component:()=>import("@/pages/maintain/doctorregister/list")
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


export default {
	residentRegisterList,
	doctorRegisterList,
}