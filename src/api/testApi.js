//本地测试环境
const fileBaseUrl = "https://ydjk-dev.oss-cn-beijing.aliyuncs.com/"; //ftp文件存放地址

const uploadUrl = "/operateapi/hospitaluploadoperatefiles"; //上传文件api
const fileImag = '/organization/uploadHospitalNewFiles' //上传医院图片接口

const fileAll = '/operateapi/hospitaloperateuploadfiles' // 上传文件

// 机构管理
const management = '/operateapi/hospitalqueryhospitaloperatelist'  //机构管理医院列表
const management_info = '/operateapi/hospitalqueryhospitaloperatedtobyid'   //医院详细信息
const management_all = '/operateapi/hospitalqueryhospitallevellist' //医院等级列表
const management_gzh = '/operateapi/hospitalquerywxappnamelist'   //查询医院公众号
const management_ylt = '/operateapi/hospitalqueryhospitalnamelist' //查询医院医联体

const management_edit = '/operateapi/hospitalupdatehospitaloperatedtobyid' //保存医院详情



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
const expertedit = '/operateapi/organizationupdateexpertdoctor' //专家信息修改
const expertadd = '/operateapi/organizationqueryDdoctorlist' //专家列表新增


//特色科室
const tesekeshi = '/operateapi/organizationselectspecialdept'   //特色科室
const departmentseditleft = '/operateapi/organizationqueryspecialdept'  //特色科室左侧科室查询
const departmentssearch = '/operateapi/organizationquerydepbyid' // 特色科室右侧科室详情查询
const departmentseditright = '/operateapi/organizationupdateappointmentdept' // 特色科室右侧科室详情修改


const fileimages ='/operateapi/organizationuploadoperatefiles' 

//banner接口
const bannerHome = '/operateapi/bannerquerypagehospitalbannerlist' //Banner分页
const bannerAdd = '/operateapi/bannerinserthospitalbanner'  //banner添加
const bannerChange = '/operateapi/bannerupdatehospitalbanner' //banner 编辑
const getIdBanner = '/operateapi/bannerqueryhospitalbannerbyid' //banner查找

// 院内科室
const medicine = '/operateapi/organizationpagehosdept'  // 院内科室查询
const medicinesearch = '/operateapi/organizationselecthosdept'  //院内科室列表查询
const medicinelistsearch = '/operateapi/organizationquerydepbyid' //院内科室详情查询
// const medicineadd = ''//院内科室添加
// const medicineedit = ''//院内科室编辑
//服务管理
const server_ = '/operateapi/hospitalmenuqueryhospitalmenulistbyid'  //服务管理列表
const getServer = '/operateapi/hospitalmenuqueryhospitalmenulist' //服务管理-编辑
const setserver = '/operateapi/hospitalmenuupdatehospitalmenu'     // 编辑服务保存

//预约科室接口
const k_department = '/operateapi/organizationpageappointmentdept' //预约科室列表
const get_department = '/operateapi/organizationselectdeptlist'  //查看预约科室列表
const departmentDetail = '/operateapi/organizationquerydepbyid' //查看预约科室详情
const departmentChange = '/operateapi/organizationupdateappointmentdept' //修改预约科室详情



export default {
    fileBaseUrl,
    login,
    uploadUrl,
    fileImag,
    fileimages,
    fileAll,
    //机构管理
    management,
    management_info,
    management_all,
    management_gzh,
    management_ylt,
    management_edit,
    
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
    // 专家列表
    zj,
    expertedit,
    getNews,
    expertadd,
    //特色科室
    tesekeshi,
    departmentseditleft,
    departmentseditright,
    departmentssearch,
    //banner接口
    bannerHome,
    bannerAdd,
    getIdBanner,
    bannerChange,
    //院内科室
    medicine,
    medicinesearch,
    medicinelistsearch,
    //服务管理
    server_,
    getServer,
    setserver,
    
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