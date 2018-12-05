const reviewList = {
    path:'/operation/index',
    name:'reviewlist',
    meta:{
        index:2,
        title:'运营列表'
    },
    component:()=>import("@/pages/operation/doctorReview/list")
}
const reviewList1 = {
    path:'/operation/list1',
    name:'reviewlist1',
    meta:{
        index:2,
        title:'审核列表1'
    },
    component:()=>import("@/pages/operation/doctorReview/list1")
}
const reviewList2 = {
    path:'/operation/list2',
    name:'reviewlist2',
    meta:{
        index:2,
        title:'审核列表2'
    },
    component:()=>import("@/pages/operation/doctorReview/list2")
}
const reviewList3 = {
    path:'/operation/list3',
    name:'reviewlist3',
    meta:{
        index:2,
        title:'审核列表3'
    },
    component:()=>import("@/pages/operation/doctorReview/list3")
}
const reviewList4 = {
    path:'/operation/content_list',
    name:'reviewlist4',
    meta:{
        index:2,
        title:'分类管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/content_list")
}
const reviewList5 = {
    path:'/operation/home_article',
    name:'reviewlist5',
    meta:{
        index:2,
        title:'添加新闻'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/home_article")
}
const reviewList6 = {
    path:'/operation/addClassify',
    name:'reviewlist6',
    meta:{
        index:2,
        title:'添加分类'
    },
    component:()=>import("@/pages/operation/doctorReview/classify/addClassify")
}
const reviewList7 = {
    path:'/operation/newClassify',
    name:'reviewlist7',
    meta:{
        index:2,
        title:'添加子分类'
    },
    component:()=>import("@/pages/operation/doctorReview/classify/newClassify")
}

const reviewList8 = {
    path:'/operation/patient_management',
    name:'reviewlist8',
    meta:{
        index:2,
        title:'患者管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/patient_management")
}

const reviewList9 = {
    path:'/operation/management1',
    name:'reviewlist9',
    meta:{
        index:2,
        title:'机构管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/management1.vue")
}
const reviewList10 = {
    path:'/operation/Institutional_information',
    name:'reviewlist10',
    meta:{
        index:2,
        title:'医院信息'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/Institutional_information.vue")
}

const reviewList11 = {
    path:'/operation/news',
    name:'reviewlist11',
    meta:{
        index:2,
        title:'动态新闻'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/news")
}
const reviewList12 = {
    path:'/operation/expert',
    name:'reviewlist12',
    meta:{
        index:2,
        title:'专家介绍'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/expert")
}
const reviewList13 = {
    path:'/operation/service_management',
    name:'reviewlist13',
    meta:{
        index:2,
        title:'服务管理'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/service_management")
}
const reviewList14 = {
    path:'/operation/addNews',
    name:'reviewlist14',
    meta:{
        index:2,
        title:'动态新闻-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/addNews")
}
const reviewList15 = {
    path:'/operation/addExpert',
    name:'reviewlist15',
    meta:{
        index:2,
        title:'专家介绍-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/addExpert")
}
const reviewList16 = {
    path:'/operation/addService_management',
    name:'reviewlist16',
    meta:{
        index:2,
        title:'服务管理-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/addService_management")
}
const reviewList17 = {
    path:'/operation/i_banner',
    name:'reviewlist17',
    meta:{
        index:2,
        title:'Banner'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_banner")
}
const reviewList18 = {
    path:'/operation/i_addBanner',
    name:'reviewlist18',
    meta:{
        index:2,
        title:'Banner-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_addBanner")
}
const reviewList19 = {
    path:'/operation/i_keshi',
    name:'reviewlist19',
    meta:{
        index:2,
        title:'院内科室'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_keshi")
}
const reviewList20 = {
    path:'/operation/i_addKeshi',
    name:'reviewlist20',
    meta:{
        index:2,
        title:'院内科室-编辑'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_addKeshi")
}
const reviewList21 = {
    path:'/operation/i_addKeshi_',
    name:'reviewlist21',
    meta:{
        index:2,
        title:'院内科室-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/i_addKeshi_")
}
const reviewList22 = {
    path:'/operation/k_department',
    name:'reviewlist22',
    meta:{
        index:2,
        title:'预约科室'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/k_department")
}
const reviewList23 = {
    path:'/operation/k_addDepartment',
    name:'reviewlist23',
    meta:{
        index:2,
        title:'预约科室-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/k_addDepartment")
}
const reviewList24 = {
    path:'/operation/t_keshi',
    name:'reviewlist24',
    meta:{
        index:2,
        title:'特色科室'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/t_keshi")
}
const reviewList25 = {
    path:'/operation/t_addKeshi',
    name:'reviewlist25',
    meta:{
        index:2,
        title:'特色科室-添加'
    },
    component:()=>import("@/pages/operation/doctorReview/contentmen/t_addKeshi")
}
export default {
    reviewList,
    reviewList1,
    reviewList2,
    reviewList3,
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