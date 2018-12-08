const reviewList = {
    path:'operation/doctorreview/list',
    name:'reviewlist',
    meta:{
        index:2,
        title:'医生列表'
    },
    component:()=>import("@/pages/operation/doctorReview/list")
}
const reviewEdit = {
    path:'operation/doctorreview/edit',
    name:'reviewedit',
    meta:{
        index:3,
        title:'医生信息编辑'
    },
    component:()=>import("@/pages/operation/doctorReview/edit")
}
const reviewreview = {
    path:'operation/doctorreview/review',
    name:'reviewreview',
    meta:{
        index:3,
        title:'医生认证审核'
    },
    component:()=>import("@/pages/operation/doctorReview/review")
}
const registerList = {
    path:'operation/register/list',
    name:'registerlist',
    meta:{
        index:2,
        title:'医生排班列表'
    },
    component:()=>import("@/pages/operation/register/list")
}
const registerEdit = {
    path:'operation/register/edit',
    name:'registeredit',
    meta:{
        index:3,
        title:'添加医生挂号信息'
    },
    component:()=>import("@/pages/operation/register/edit")
}
const registerDetail = {
    path:'operation/register/detail',
    name:'registerdetail',
    meta:{
        index:3,
        title:'预约挂号详情'
    },
    component:()=>import("@/pages/operation/register/detail")
}
const kindeditorTest = {
    path:'operation/kindeditor',
    name:'kindeditor',
    meta:{
        index:2,
        title:'kindeditor demo'
    },
    component:()=>import("@/pages/operation/kindeditor")
}
const uploadFile = {
    path:'operation/upload/index',
    name:'kindeditor',
    meta:{
        index:3,
        title:'uploadFile'
    },
    component:()=>import("@/pages/operation/upload/index")
}
export default {
    reviewList,
    reviewEdit,
    reviewreview,
    registerList,
    registerEdit,
    registerDetail,
    kindeditorTest,
    uploadFile,
}