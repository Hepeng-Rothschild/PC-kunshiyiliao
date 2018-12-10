//开发环境
const fileImag = '/organization/uploadHospitalNewFiles' //上传医院图片接口

const fileAll = '/operateapi/hospitaloperateuploadfiles' // 上传文件


const login = "/operateapi/operate/login"; //登陆接口

//动态新闻
const news = '/operateapi/organizationpagenews'; //动态新闻列表分页
const getNews = '/operateapi/organizationselectnew' //获取动态新闻详情信息

const setNews = '/operateapi/organizationinsertnew'


//新闻列表
const addNews = '/operateapi/organizationupdatenew'; //修改新闻详情
const newsA = '/operateapi/organizationinsertnew' ; // 新增新闻



//内容管理
const content_wrap = '/operateapi/articlepagebyarticle'  // 内容管理列表
const created_wrap = '/operateapi/articleinsert'   // 创建新闻
const change_wrap = '/operateapi/articleupdate'   // 修改新闻
const get_wrap = '/operateapi/articleselectbyid' //查询新闻
const up_wrap = '/operateapi/articleideletebatch' //下架
const root = '/operateapi/articlepriority';   //新闻置顶

//专家列表
const zj = '/operateapi/organizationpageexpertdoctor'   //专家列表分页


//特色科室
const tesekeshi = '/operateapi/organizationqueryspecialdept'   //特色科室


const fileimages ='/operateapi/organizationuploadoperatefiles' 

//banner接口
const bannerHome = '/operateapi/bannerquerypagehospitalbannerlist' //Banner分页
const bannerAdd = '/operateapi/bannerinserthospitalbanner'  //banner添加
const bannerChange = '/operateapi/bannerupdatehospitalbanner' //banner 编辑
const getIdBanner = '/operateapi/bannerqueryhospitalbannerbyid' //banner查找

//服务管理
const server_ = '/operateapi/hospitalmenuqueryhospitalmenulistbyid'  //服务管理列表
const getServer = '/operateapi/hospitalmenuqueryhospitalmenulist' //服务管理-编辑

//预约科室接口
const k_department = '/operateapi/organizationpageappointmentdept' //预约科室列表
const get_department = '/operateapi/organizationselectdeptlist'  //查看科室列表
const departmentDetail = '/operateapi/organizationquerydepbyid' //查看科室详情
const departmentChange = '/operateapi/organizationupdateappointmentdept' //修改预约科室详情




export default {
    login,
    fileImag,
    fileimages,
    fileAll,
    
    //内容管理
    content_wrap,
    created_wrap,
    root,
    change_wrap,
    get_wrap,
    up_wrap,
    //动态新闻
    news,
    addNews,
    newsA,
    zj,
    getNews,
    //特色科室
    tesekeshi,
    //banner接口
    bannerHome,
    bannerAdd,
    getIdBanner,
    bannerChange,
    //服务管理
    server_,
    getServer,
    //预约科室
    k_department,
    get_department,
    departmentDetail,
    departmentChange,
    
}

//const baseConfig = {
//  "dev":{fileUrl:"https://ydjk-dev.oss-cn-beijing.aliyuncs.com/"},
//  "prod":{fileUrl:"https://ydjk-pro.oss-cn-beijing.aliyuncs.com/"},
//  "test":{fileUrl:"https://ydjk-test.oss-cn-beijing.aliyuncs.com/"}
//}