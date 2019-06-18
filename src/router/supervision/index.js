const supervisionReviewList = {
    path:'supervision/index2',
    name:'reviewlist1',
    meta:{
        index:2,
        title:'监管列表'
    },
    component:()=>import(/* webpackChunkName: 'supervision' */"@/pages/supervision/doctorReview/list")
}
export default {
    supervisionReviewList,
}