//测试环境api

const login = "/operateapi/operate/login"; //登陆接口
const news = '/operateapi/organizationpagenews'; //动态新闻列表分页
const fileAll = "/operateapi/hospitaloperateuploadfiles"; //上传接口
const getProvince = "/operateapi/authenticationqueryprovince"; //获取省级列表
const getTitle = "/operateapi/authenticationquerytitle"; //获取职称列表
const getReviewDoctorList = "/operateapi/authenticationdoctorpage"; //获取审核医生列表
const delReviewDoctor = "/operateapi/authenticationdelete"; //删除审核医生列表
const delReviewDoctorInfo = "/operateapi/authenticationquerydoctor"; //审核医生列表详情
const reviewDoctor = "/operateapi/authenticationupdate"; //医生审核
const reviewDoctorUpdate = "/operateapi/authenticationupdatedoctorbyoperate"; //医生审核修改信息
const hospitalList = "/operateapi/authenticationqueryhospital"; //医生审核
const registerList = "/operateapi/registerpagedoctor"; //预约挂号列表
const registerDoctorDetail = "/operateapi/registerselectdoctorbyid"; //预约医生详情
const changeRegisterStatus = "/operateapi/registerupdatestatus"; //改变预约状态
const registerDoctorList = "/operateapi/registerselectdoctornotscheduling"; //预约挂号专家列表
const registerDoctorUpdate = "/operateapi/registerupdate"; //预约挂号修改
const registerDoctorInsert = "/operateapi/registerinsertdoctorappointment"; //预约挂号添加

// 机构管理
const management = '/operateapi/hospitalqueryhospitaloperatelist'  //机构管理医院列表
const managementInfo = '/operateapi/hospitalqueryhospitaloperatedtobyid'   //医院详细信息
const managementAll = '/operateapi/hospitalqueryhospitallevellist' //医院等级列表
const managementGzh = '/operateapi/hospitalquerywxappnamelist'   //查询医院公众号
const managementYlt = '/operateapi/hospitalqueryhospitalnamelist' //查询医院医联体

const managementEdit = '/operateapi/hospitalupdatehospitaloperatedtobyid' //保存医院详情



//动态新闻
const getNews = '/operateapi/organizationselectnew' //获取动态新闻详情信息
const setNews = '/operateapi/organizationinsertnew'  //设置动态新闻列表


//新闻列表
const addNews = '/operateapi/organizationupdatenew'; //修改新闻详情
                //  /operateapi/organizationupdatenew
const newsA = '/operateapi/organizationinsertnew'; // 新增新闻


//内容管理
const contentWrap = '/operateapi/articlepagebyarticle'  // 内容管理列表
const createdWrap = '/operateapi/articleinsert'   // 创建新闻
const changeWrap = '/operateapi/articleupdate'   // 修改新闻
const getWrap = '/operateapi/articleselectbyid' //查询新闻
const upWrap = '/operateapi/articleideletebatch' //下架
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

//banner接口
const bannerHome = '/operateapi/bannerquerypagehospitalbannerlist' //Banner分页
const bannerAdd = '/operateapi/bannerinserthospitalbanner'  //banner添加
const bannerChange = '/operateapi/bannerupdatehospitalbanner' //banner 编辑
const getIdBanner = '/operateapi/bannerqueryhospitalbannerbyid' //banner查找

// 院内科室
const medicine = '/operateapi/organizationpagehosdept'  // 院内科室查询
const medicinesearch = '/operateapi/organizationselecthosdept'  //院内科室列表查询
                        // /operateapi/organizationselecthosdept
const medicinelistsearch = '/operateapi/organizationquerydepbyid' //院内科室详情查询
// const medicineadd = ''//院内科室添加
const medicineedit = '/operateapi/organizationupdateappointmentdept'//院内科室编辑

const medicineSearchList = '/operateapi/operate/diction/department'  //查询所有科室信息

const medicineSelectedList = '/operateapi/hospitaldetail'  // 选中科室的列表
const medicineExpertList = '/operateapi/organizationquerydeptindoctor'  //院内科室专家列表
const medicineSave = '/operateapi/organizationupdatesavehospitaldept' // 院内科室保存
//服务管理
const _server = '/operateapi/hospitalmenuqueryhospitalmenulistbyid'  //服务管理列表
const getServer = '/operateapi/hospitalmenuqueryhospitalmenulist' //服务管理-编辑
const setserver = '/operateapi/hospitalmenuupdatehospitalmenu'     // 编辑服务保存

//预约科室接口
const kDepartment = '/operateapi/organizationpageappointmentdept' //预约科室列表
const getDepartment = '/operateapi/organizationselectdeptlist'  //查看科室列表
const departmentDetail = '/operateapi/organizationquerydepbyid' //查看科室详情
const departmentChange = '/operateapi/organizationupdateappointmentdept' //修改预约科室详情

//运维端!!!
const residentReg = '/operateapi/residentqueryuserlist'//获取居民注册信息

const uploadXls = '/operateapi/organizationinsertbatchdoctor' //批量上传医生信息

const getDoctorInfo = '/operateapi/residentpagedoctor'  //获取医生注册信息

const getCity = '/operateapi/sysprovinceprovincecitylist' //获取省级区域列表

const getCounty = '/operateapi/sysprovincequeryAreaList' //根据市级查询县列表
// 机械注册信息
const mechanismregList = '/operateapi/organizationqueryhospitallist' //机构注册信息列表查询
const mechanismregEnable = '/operateapi/hospitalupdateenablebyid' //机构注册信息启用禁用
const mechanismregAdd = '/operateapi/hospitalinsert' // 新增机构
const mechanismregSearch = '/operateapi/hospitalqueryhospitaloperatedtobyid'  //根据医院ID查询医院详情
const mechanismregEdit ='/operateapi/hospitalupdate' //修改医院详情
/* ********************************************* */
const doctorList = '/operateapi/doctorselectdoctorlist' //医生列表
const doctorServerManage = '/operateapi/organizationquerymenulist' //医生所有服务管理列表
const doctorServerManageById = '/operateapi/doctormenuselectmenuidsbydoctorid' //查询某个医生的服务管理列表
const doctorServerManageUpdate = '/operateapi/doctormenuinsertorupdatemenu' //修改某个医生的服务管理

export default {
    login,
    fileAll,
    //机构管理
    management,
    managementInfo,
    managementAll,
    managementGzh,
    managementYlt,
    managementEdit,
    
    //动态新闻
    news,
    getProvince,
    getTitle,
    getReviewDoctorList,
    delReviewDoctor,
    delReviewDoctorInfo,
    reviewDoctor,
    hospitalList,
    reviewDoctorUpdate,
    registerList,
    registerDoctorDetail,
    changeRegisterStatus,
    registerDoctorList,
    registerDoctorUpdate,
    registerDoctorInsert,

    /* ********************************************** */
    
    //内容管理
    contentWrap,
    createdWrap,
    root,
    changeWrap,
    getWrap,
    upWrap,
    //动态新闻
    news,
    addNews,
    newsA,
    // 专家列表
    zj,
    expertedit,
    expertadd,
    getNews,
    setNews,
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
    medicineSearchList,
    medicineSelectedList,
    medicineExpertList,
    medicineSave,
    medicineedit,
    //服务管理
    _server,
    getServer,
    setserver,
    
    //预约科室
    kDepartment,
    getDepartment,
    departmentDetail,
    departmentChange,
    /* ********************************************** */

    //运维端

    uploadXls,
    residentReg,
    getDoctorInfo,
    getCity,
    getCounty,

    doctorServerManage,
    doctorServerManageById,
    doctorServerManageUpdate,
    doctorList,
    // 机构注册信息
    mechanismregList,
    mechanismregEnable,
    mechanismregAdd,
    mechanismregSearch,
    mechanismregEdit
}