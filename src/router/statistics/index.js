const reviewList = {
    path:'statistics/index1',
    name:'reviewlist2',
    meta:{
        index:2,
        title:'统计列表'
    },
    component:()=>import(/* webpackChunkName: 'statistics' */"@/pages/statistics/doctorReview/list")
}
export default {
    reviewList,
}