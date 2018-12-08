const reviewList = {
    path:'maintain/index',
    name:'reviewlist',
    meta:{
        index:2,
        title:'运维列表'
    },
    component:()=>import("@/pages/maintain/doctorReview/list")
}
const reviewList4 = {
    path:'/index/maintain/content_list',
    name:'reviewlist4',
    meta:{
        index:2,
        title:'分类管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/content_list")
}
const reviewList5 = {
    path:'/index/maintain/home_article',
    name:'reviewlist5',
    meta:{
        index:2,
        title:'添加新闻'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/home_article")
}
const reviewList6 = {
    path:'/index/maintain/addClassify',
    name:'reviewlist6',
    meta:{
        index:2,
        title:'添加分类'
    },
    component:()=>import("@/pages/operation/doctorReview/classify/addClassify")
}
const reviewList7 = {
    path:'/index/maintain/newClassify',
    name:'reviewlist7',
    meta:{
        index:2,
        title:'添加子分类'
    },
    component:()=>import("@/pages/operation/doctorReview/classify/newClassify")
}

const reviewList8 = {
    path:'/index/maintain/patient_management',
    name:'reviewlist8',
    meta:{
        index:2,
        title:'患者管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/patient_management")
}

const reviewList9 = {
    path:'/index/maintain/management1',
    name:'reviewlist9',
    meta:{
        index:2,
        title:'机构管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/management1.vue")
}
const reviewList10 = {
    path:'/index/maintain/Institutional_information',
    name:'reviewlist10',
    meta:{
        index:2,
        title:'医院信息'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/Institutional_information.vue")
}

const reviewList11 = {
    path:'/index/maintain/news',
    name:'reviewlist11',
    meta:{
        index:2,
        title:'动态新闻'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/news")
}
const reviewList12 = {
    path:'/index/maintain/expert',
    name:'reviewlist12',
    meta:{
        index:2,
        title:'专家介绍'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/expert")
}
const reviewList13 = {
    path:'/index/maintain/service_management',
    name:'reviewlist13',
    meta:{
        index:2,
        title:'服务管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/service_management")
}
const reviewList14 = {
    path:'/index/maintain/addNews',
    name:'reviewlist14',
    meta:{
        index:2,
        title:'动态新闻-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/addNews")
}
const reviewList15 = {
    path:'/index/maintain/addExpert',
    name:'reviewlist15',
    meta:{
        index:2,
        title:'专家介绍-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/addExpert")
}
const reviewList16 = {
    path:'/index/maintain/addService_management',
    name:'reviewlist16',
    meta:{
        index:2,
        title:'服务管理-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/addService_management")
}
const reviewList17 = {
    path:'/index/maintain/i_banner',
    name:'reviewlist17',
    meta:{
        index:2,
        title:'Banner'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_banner")
}
const reviewList18 = {
    path:'/index/maintain/i_addBanner',
    name:'reviewlist18',
    meta:{
        index:2,
        title:'Banner-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_addBanner")
}
const reviewList19 = {
    path:'/index/maintain/i_keshi',
    name:'reviewlist19',
    meta:{
        index:2,
        title:'院内科室'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_keshi")
}
const reviewList20 = {
    path:'/index/maintain/i_addKeshi',
    name:'reviewlist20',
    meta:{
        index:2,
        title:'院内科室-编辑'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_addKeshi")
}
const reviewList21 = {
    path:'/index/maintain/i_addKeshi_',
    name:'reviewlist21',
    meta:{
        index:2,
        title:'院内科室-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_addKeshi_")
}
const reviewList22 = {
    path:'/index/maintain/k_department',
    name:'reviewlist22',
    meta:{
        index:2,
        title:'预约科室'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/k_department")
}
const reviewList23 = {
    path:'/index/maintain/k_addDepartment',
    name:'reviewlist23',
    meta:{
        index:2,
        title:'预约科室-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/k_addDepartment")
}
const reviewList24 = {
    path:'/index/maintain/t_keshi',
    name:'reviewlist24',
    meta:{
        index:2,
        title:'特色科室'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/t_keshi")
}
const reviewList25 = {
    path:'/index/maintain/t_addKeshi',
    name:'reviewlist25',
    meta:{
        index:2,
        title:'特色科室-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/t_addKeshi")
}
export default {
    reviewList,
    reviewList4,
    reviewList5,
    reviewList6,
    reviewList7,
    reviewList8,
    reviewList9,
    reviewList10,
    reviewList11,
    reviewList12,
    reviewList13,
    reviewList14,
    reviewList15,
    reviewList16,
    reviewList17,
    reviewList18,
    reviewList19,
    reviewList20,
    reviewList21,
    reviewList22,
    reviewList23,
    reviewList24,
    reviewList25
}