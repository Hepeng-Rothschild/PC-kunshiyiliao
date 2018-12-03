const reviewList = {
    path:'/maintain/index',
    name:'reviewlist',
    meta:{
        index:2,
        title:'运维列表'
    },
    component:()=>import("@/pages/maintain/doctorReview/list")
}
export default {
    reviewList,
}