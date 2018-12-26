const topMenu = [
    {id:1,name:'运营平台',type:"operation"},
    {id:2,name:'运维平台',type:"maintain"},
    {id:3,name:'统计平台',type:"statistics"},
    {id:4,name:'监管平台',type:"supervision"}
];

const operationLeftMenu = [
    {id:1,level:1,name:"订单管理",childLists:[
        {id:36,level:2,name:"预约挂号订单",path:"/index/operation/reservationOrders/list"},
    ]},
    {id:1,level:1,name:"医生端运营",childLists:[
        {id:17,level:2,name:"医生认证",path:"/index/operation/doctorreview/list"},
        {id:29,level:2,name:"医生排班列表",path:"/index/operation/register/list"},
        {id:33,level:2,name:"内容管理",path:"/index/operation/doctorContentCheck/list"},
        // {id:34,level:2,name:"内容分类",path:"/index/operation/register/list"},
        // {id:18,level:2,name:"KindEditor-Demo",path:"/index/operation/kindeditor"},
        // {id:26,level:2,name:"fileuploadFile",path:"/index/operation/upload/index"},
        {id:35,level:2,name:"医生列表",path:"/index/operation/doctormanage/list"},
    ]},
    {id:1,level:1,name:"患者端运营",childLists:[
        {id:30,level:2,name:"内容管理",path:"/index/operation/contentmanagement_home"},
        // {id:19,level:2,name:"内容分类",path:"/index/operation/f_Classify"},
        // {id:20,level:2,name:"患者管理",path:"/index/operation/patient_management"},
    ]},
    {id:1,level:1,name:"机构运营",childLists:[
        {id:21,level:2,name:"机构管理",path:"/index/operation/home"}
    ]},
    {id:1,level:1,name:"服务包管理",childLists:[
        // {id:40,level:2,name:"服务包管理",path:"/index/operation/servicePackage/pList"},
        {id:41,level:2,name:"服务项目管理",path:"/index/operation/servicePackage/itemList"}
    ]},
];
const maintainLeftMenu = [
    {id:2,level:1,name:"索引管理",childLists:[
        {id:31,level:2,name:"居民注册信息",path:"/index/maintain/residentregister/list"},
        {id:32,level:2,name:"医生注册信息",path:"/index/maintain/doctorregister/list"},
        {id:33,level:2,name:"机构注册信息",path:"/index/maintain/mechanismreg/list"}
    ]},
    {id:2,level:1,name:"字典管理",childLists:[
        {id:37,level:2,name:"字典管理",path:"/index/maintain/dictionary/tree"}
    ]},
    {id:2,level:1,name:"疾病/症状管理",childLists:[
        {id:38,level:2,name:"疾病管理",path:"/index/maintain/disease/list"},
        {id:39,level:2,name:"症状管理",path:"/index/maintain/symptom/list"}
    ]}
    // {id:2,level:1,name:"系统管理",childLists:[
        // {id:31,level:2,name:"账号管理",path:"/index/maintain/admin/list"},
    // ]}
];
const statisticsLeftMenu = [
    {id:1,level:1,name:"统计端列表",childLists:[
        // {id:2,level:2,name:"审核列表1"},
        // {id:3,level:2,name:"审核列表2"},
        // {id:4,level:2,name:"审核列表3"},
        // {id:5,level:2,name:"审核列表4"}
    ]}
];
const supervisionLeftMenu = [
    {id:1,level:1,name:"监管端列表",childLists:[
        // {id:2,level:2,name:"审核列表1"},
        // {id:3,level:2,name:"审核列表2"},
        // {id:4,level:2,name:"审核列表3"},
        // {id:5,level:2,name:"审核列表4"}
    ]}
];
export default {
    topMenu,
    operationLeftMenu,
    maintainLeftMenu,
    statisticsLeftMenu,
    supervisionLeftMenu,
}