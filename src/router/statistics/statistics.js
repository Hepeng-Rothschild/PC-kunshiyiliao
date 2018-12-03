const reviewList = {
    path:'/statistics/index',
    name:'reviewlist',
    meta:{
        index:2,
        title:'统计列表'
    },
    component:()=>import("@/pages/statistics/doctorReview/list")
}
export default {
    reviewList,
}