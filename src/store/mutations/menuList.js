const topMenu = [
    {id:1,name:'运营平台',type:"operation"},
    {id:2,name:'运维平台',type:"maintain"},
    {id:3,name:'统计平台',type:"statistics"},
    {id:4,name:'监管平台',type:"supervision"}
];

const operationLeftMenu = [
    {id:1,level:1,name:"运营端列表demo",childLists:[
        {id:17,level:2,name:"医生认证",path:"/index/operation/doctorreview/list"},
        {id:25,level:2,name:"医生排班列表",path:"/index/operation/register/list"},
        {id:18,level:2,name:"KindEditor-Demo",path:"/index/operation/kindeditor"},
        {id:26,level:2,name:"fileuploadFile",path:"/index/operation/upload/index"},
    ]},
    {id:1,level:1,name:"运营端列表demo",childLists:[
        {id:19,level:2,name:"审核列表1",path:"/index/operation/index1"},
        {id:20,level:2,name:"KindEditor-Demo",path:"/index/operation/kindeditor1"},
    ]},
    {id:1,level:1,name:"运营端列表demo",childLists:[
        {id:21,level:2,name:"审核列表1",path:"/index/operation/index2"},
        {id:22,level:2,name:"KindEditor-Demo",path:"/index/operation/kindeditor2"},
    ]},
    {id:1,level:1,name:"运营端列表demo",childLists:[
        {id:23,level:2,name:"审核列表1",path:"/index/operation/index3"},
        {id:24,level:2,name:"KindEditor-Demo",path:"/index/operation/kindeditor3"},
    ]},
];
const maintainLeftMenu = [
    {id:1,level:1,name:"运维端列表demo",childLists:[
        {id:2,level:2,name:"审核列表1"},
        {id:3,level:2,name:"审核列表2"},
        {id:4,level:2,name:"审核列表3"},
        {id:5,level:2,name:"审核列表4"}
    ]}
];
const statisticsLeftMenu = [
    {id:1,level:1,name:"统计端列表demo",childLists:[
        {id:2,level:2,name:"审核列表1"},
        {id:3,level:2,name:"审核列表2"},
        {id:4,level:2,name:"审核列表3"},
        {id:5,level:2,name:"审核列表4"}
    ]}
];
const supervisionLeftMenu = [
    {id:1,level:1,name:"监管端列表demo",childLists:[
        {id:2,level:2,name:"审核列表1"},
        {id:3,level:2,name:"审核列表2"},
        {id:4,level:2,name:"审核列表3"},
        {id:5,level:2,name:"审核列表4"}
    ]}
];
export default {
    topMenu,
    operationLeftMenu,
    maintainLeftMenu,
    statisticsLeftMenu,
    supervisionLeftMenu,
}