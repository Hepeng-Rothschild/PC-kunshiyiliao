const reviewList = {
    path:'statistics/index',
    name:'reviewlist',
    meta:{
        title:'统计列表'
    },
    component:()=>import("@/pages/statistics/doctorReview/list")
}
export default {
    reviewList,
}