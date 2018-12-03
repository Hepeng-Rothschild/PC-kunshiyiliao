const reviewList = {
    path:'/supervision/index',
    name:'reviewlist',
    meta:{
        index:2,
        title:'监管列表'
    },
    component:()=>import("@/pages/supervision/doctorReview/list")
}
export default {
    reviewList,
}