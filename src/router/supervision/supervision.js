const reviewList = {
    path:'supervision/index',
    name:'reviewlist',
    meta:{
        title:'监管列表'
    },
    component:()=>import("@/pages/supervision/doctorReview/list")
}
export default {
    reviewList,
}