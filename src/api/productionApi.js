const login = "/operateapi/operate/login"; //登陆接口
/*fegin层 */
//字典
// const dictionaryList = "/operateapi/operatedictionfindkbaodictiondtolistbyentity";//字典列表
// const dictionaryInsert = "/operateapi/operatedictioninsertkbaooperatedictionentity";//添加字典
// const dictionaryUpdate = "/operateapi/operatedictionupdatekbaooperatedictionentity";//修改字典
// //医生审核预约挂号
// const news = '/operateapi/organizationfindkbaohospitalnewspage'; //动态新闻列表分页
// const fileAll = "/operateapi/hospitaloperateuploadfiles"; //上传接口 不加密
// const getProvince = "/operateapi/authenticationfindprovince"; //获取省级列表
// const getTitle = "/operateapi/authenticationfindkbaodictiondtolist"; //获取职称列表
// const getReviewDoctorList = "/operateapi/authenticationfindkbaooperatedoctordtopage"; //获取审核医生列表
// const delReviewDoctor = "/operateapi/authenticationupdatedoctorbyid"; //删除审核医生列表
// const reviewDoctorInfo = "/operateapi/authenticationfindkbaooperatedoctordtobyid"; //审核医生列表详情
// const reviewDoctor = "/operateapi/authenticationupdateauthstatus"; //医生审核
// const reviewDoctorUpdate = "/operateapi/authenticationupdatekbaddoctorbyoperate"; //医生审核修改信息
// const hospitalList = "/operateapi/authenticationfindkbaohospitalentitylist"; //医生审核
// const registerList = "/operateapi/registerfindkbaoappointmentregistrationdtopage"; //预约挂号列表
// const registerDoctorDetail = "/operateapi/registerfindkbaoappointmentregistrationdtobyid"; //预约医生详情
// const changeRegisterStatus = "/operateapi/registerupdatestatus"; //改变预约状态
// const registerDoctorList = "/operateapi/registerfindkbaodoctornotscheduling"; //预约挂号专家列表
// const registerDoctorUpdate = "/operateapi/registerupdatekbaoappointmentregistration"; //预约挂号修改
// const registerDoctorInsert = "/operateapi/registerinsertkbaoappointmentregistration"; //预约挂号添加
// const registerselectdept = '/operateapi/registerfinddeptnotscheduling' // 预约挂号科室列表
// // 医生端远程门诊
// const doctorRomteclinicAdd = '/operateapi/remotedoctorinsertkbaooperateremotedoctormasterentity'  //新增远程门诊医生排班
// const doctorRomteclinicEdit = '/operateapi/remotedoctorupdatekbaooperateremotedoctormasterentity' //编辑远程门诊医生排班详情
// const doctorRomteclinicSearchExpert = '/operateapi/remotedoctorfindremotedoctorlist'  //专家查找
// const doctorRomteclinicList = '/operateapi/remotedoctorfindpageremotedoctor' //远程门诊医生列表
// const doctorRomteclinicDetail = '/operateapi/remotedoctorfindoutpatientdoctorscheduling' //查询远程门诊医生详情
// //医生端版本管理
// const versioninsert = '/operateapi/versioninsertkbaooperateversionentity'   //医生端版本管理添加
// const versionlist = '/operateapi/versionfindkbaooperateversionentitylist' //医生端版本管理列表
// const versiondetail = '/operateapi/versionfindversion' //医生端版本管理详情
// const versionupdate = '/operateapi/versionupdatekbaooperateversionentity' //医生端版本管理修改
// // 家医签约管理
// const contractManagementList = '/operateapi/ordermanagementfindkbaffdsordermanagedtopage'   //家医签约管理列表
// // 机构管理
// const management = '/operateapi/hospitalfindkbaohospitaloperateinfodtopage'  //机构管理医院列表
// const managementInfo = '/operateapi/hospitalfindhospitaloperatedtobyid'   //医院详细信息
// const managementAll = '/operateapi/hospitalfindkbaooperatedictionentitypage' //医院等级列表
// const managementGzh = '/operateapi/hospitalfindwxappnamelist'   //查询医院公众号
// const managementYlt = '/operateapi/hospitalfindhospitalnamelist' //查询医院医联体
// const managementEdit = '/operateapi/hospitalupdatekbaohospitaloperateentitybyid' //保存医院详情
// const hospitalgetenummap = '/operateapi/hospitalfindenummap'  //查询第三方服务
// const hospitalwxapplist = '/operateapi/hospitalfindkbawxappentitylist' //查询医院关联的公众号
// //动态新闻
// const getNews = '/operateapi/organizationfindkbaohospitalnewsentity' //获取动态新闻详情信息
// const setNews = '/operateapi/organizationinsertkbaohospitalnewsentity'  //设置动态新闻列表
// //新闻列表
// const addNews = '/operateapi/organizationupdatekbaohospitalnewsentity'; //修改新闻详情
// const newsA = '/operateapi/organizationinsertkbaohospitalnewsentity'; // 新增新闻
// //内容管理
// const contentWrap = '/operateapi/articlefindkbaooperatearticlemanagedtopagebyarticle'  // 内容管理列表
// const createdWrap = '/operateapi/articleinsertkbaooperatearticleentity'   // 创建新闻
// const changeWrap = '/operateapi/articleupdatekbaooperatearticleentity'   // 修改新闻
// const getWrap = '/operateapi/articlefindoperatearticlecolumndtobyid' //查询新闻
// const upWrap = '/operateapi/articleupdateideletebatch' //下架
// const root = '/operateapi/articleupdatepriority';   //新闻置顶
// //专家列表
// const zj = '/operateapi/organizationfindexpertdoctorpage'   //专家列表分页
// const expertedit = '/operateapi/organizationupdatekbaoexpertdoctor' //专家信息修改
// const expertadd = '/operateapi/organizationfinddoctorpage' //专家列表新增
// //特色科室
// const tesekeshi = '/operateapi/organizationfindspecialdeptpage'   //特色科室
// const departmentseditleft = '/operateapi/organizationfindspecialdept'  //特色科室左侧科室查询
// const departmentssearch = '/operateapi/organizationfindkbaohospitaldepartmentsentitybyid' // 特色科室右侧科室详情查询
// const departmentseditright = '/operateapi/organizationupdatekbaohospitaldepartmentsentity' // 特色科室右侧科室详情修改
// //banner接口
// const bannerHome = '/operateapi/bannerfindkbaohospitalbannerentitypage' //Banner分页
// const bannerAdd = '/operateapi/bannerinsertkbaohospitalbannerentity'  //banner添加
// const bannerChange = '/operateapi/bannerupdatekbaohospitalbannerentity' //banner 编辑
// const getIdBanner = '/operateapi/bannerfindkbaohospitalbannerentitybyid' //banner查找
// // 院内科室
// const medicine = '/operateapi/organizationfindhosdeptpage'  // 院内科室查询
// const medicinesearch = '/operateapi/organizationfindhosdeptlistmap'  //院内科室列表查询
// const medicinelistsearch = '/operateapi/organizationfindkbaohospitaldepartmentsentitybyid' //院内科室详情查询
// const medicineedit = '/operateapi/organizationupdatekbaohospitaldepartmentsentity'//院内科室编辑
// const medicineSearchList = '/operateapi/operatedictionfinddeptlistmap'  //查询所有科室信息
// const medicineSelectedList = '/operateapi/hospitalfindkbaohospitallist'  // 选中科室的列表
// const medicineExpertList = '/operateapi/organizationfinddeptindoctor'  //院内科室专家列表
// const medicineSave = '/operateapi/organizationupdatesavekbaohospitaldept' // 院内科室保存
// const getDeptListByHospitalId = '/operateapi/authenticationfinddeptlistbyhospitalid' // 根据医院查询对应科室列表
// //服务管理
// const _server = '/operateapi/hospitalmenufindKbaoHospitalMenuDtoListById'  //服务管理列表
// const getServer = '/operateapi/hospitalmenufindkbaohospitalmenudtolist' //服务管理-编辑
// const setserver = '/operateapi/hospitalmenuupdatekbaohospitalmenuentity'     // 编辑服务保存
// //预约科室接口
// const kDepartment = '/operateapi/organizationfindkbaoappointmentdeptdtopage' //预约科室列表
// const getDepartment = '/operateapi/organizationfinddeptlistmap'  //查看科室列表
// const departmentDetail = '/operateapi/organizationfindkbaohospitaldepartmentsentitybyid' //查看科室详情
// const departmentChange = '/operateapi/organizationupdatekbaohospitaldepartmentsentity' //修改预约科室详情
// // 远程门诊
// const searchRoomList = '/operateapi/hospitalfindkbaohospitalentitylistbyprovincecode'  //根据省份和医院名模糊查询
// const searchRoomSelectAdd = '/operateapi/applyremotinsertkbaooperatehospitalapplyremote'   // 关联远程门诊医院
// const searchCurrentRoom = '/operateapi/applyremotfindkbaooperatehospitalapplyremotedtolist'  //查询当前医院下关联的远程门诊医院
// // 远程门诊类型维护 
// const DoctorRemoteClinicTypeList = '/operateapi/outpatientfindkbaooperateremoteoutpatienttypeentitylist'    //查询当前医院下远程门诊类型
// const DoctorRemoteClinicTypeAdd = '/operateapi/outpatientinsertkbaooperateremoteoutpatienttypeentity'   //新增远程门诊类型
// const DoctorRemoteClinicTypeSearch = '/operateapi/outpatientfindkbaooperateremoteoutpatienttypeentitybyid'  //查找远程门诊详情
// const DoctorRemoteClinicTypeEdit = '/operateapi/outpatientupdatekbaooperateremoteoutpatienttypeentity'   //修改远程门诊类型
// const remotedoctorupdateremotestatus = '/operateapi/remotedoctorupdatekbaoremotestatus'   //修改医生是否开启远程门诊
// const doctorupdatedoctorsort = '/operateapi/doctorupdatekbaddoctorentitysort'   //修改医生排序
// // 第三方厂家服务
// const thirdparty = '/operateapi/hospitalthirdpartyfindhospitalthirdparty' //查询第三方厂家
// const updatethirdparty = '/operateapi/hospitalthirdpartyupdatekbaohospitalthirdpartyentity'//修改第三方厂家
// const DoctorListEdit = '/operateapi/remotedoctorupdatekbaoremotestatus' // 医生排班列表修改 
// //运维端!!!
// const residentReg = '/operateapi/residentfinduserlist'//获取居民注册信息
// const uploadXls = '/operateapi/organizationinsertbatchkbaddoctor' //批量上传医生信息  不加密
// const getDoctorInfo = '/operateapi/residentfindkbaodoctorpage'  //获取医生注册信息
// const getCity = '/operateapi/sysprovincefindprovincecitylist' //获取省级区域列表
// const getCounty = '/operateapi/sysprovincefindkbaarealist' //根据市级查询县列表
// // 机构注册信息
// const mechanismregList = '/operateapi/organizationfindkbaohospitalregisterdtopage' //机构注册信息列表查询
// const mechanismregEnable = '/operateapi/hospitalupdateenablebyid' //机构注册信息启用禁用
// const mechanismregAdd = '/operateapi/hospitalinsertkbaohospitalentity' // 新增机构
// const mechanismregSearch = '/operateapi/hospitalfindhospitaloperatedtobyid'  //根据医院ID查询医院详情
// const mechanismregEdit = '/operateapi/hospitalupdatekbaohospitalentity' //修改医院详情
// const mechanismregUpLoad = '/operateapi/organizationinsertbatchkbaohospital' //批量上传机构信息  不加密
// /* ********************************************* */
// const doctorList = '/operateapi/doctorfindkbaddoctorentitylist' //医生列表
// const doctorServerManage = '/operateapi/organizationfindkbaomenulist' //医生所有服务管理列表
// const doctorServerManageById = '/operateapi/doctormenufindmenuidsbydoctorid' //查询某个医生的服务管理列表
// const doctorServerManageUpdate = '/operateapi/doctormenuinsertorupdatekbaomenuentity' //修改某个医生的服务管理
// //内容管理
// //1.健康宣教
// const educationInsert = '/operateapi/educationinsertkbaddoctoreducationarticleentity'; //新增健康宣教
// const educationArticleList = '/operateapi/educationfindkbaddoctoreducationarticleentitypage'; //健康宣教list
// const educationDetailById = '/operateapi/educationfindkbaddoctoreducationarticleentitybyid';//根据ID查询健康宣教详情
// const educationUpdate = '/operateapi/educationupdatekbaddoctoreducationarticleentity';//更新健康宣教信息
// const educationUpdateFlag = '/operateapi/educationupdateenable';//更改健康宣教状态
// //2.经典案例
// const doctorclassicDelete = '/operateapi/doctorclassiccasedelete'; //删除经典案例
// const doctorclassicInsert = '/operateapi/doctorclassiccaseinsertkbaddoctorclassiccaseentity'; //新增经典案例
// const doctorclassicArticleList = '/operateapi/doctorclassiccasefindkbaddoctorclassiccaseentitypage'; //经典案例list
// const doctorclassicDetailById = '/operateapi/doctorclassiccasefindkbaddoctorclassiccaseentitybyid';//根据ID查询经典案例详情
// const doctorclassicUpdate = '/operateapi/doctorclassiccaseupdatekbaddoctorclassiccaseentity';//更新经典案例信息
// const doctorclassicUpdateFlag = '/operateapi/doctorclassiccaseupdateenableddisable';//更改经典案例状态
// //3.热门推荐
// const recommendInsert = '/operateapi/recommendarticleinsertkbaddoctorrecommendentity'; //新增热门推荐
// const recommendArticleList = '/operateapi/recommendarticlefinddoctorrecommendpage'; //热门推荐list
// const recommendDetailById = '/operateapi/recommendarticlefindkbaodoctorrecommendentitybyid';//根据ID查询热门推荐详情
// const recommendUpdate = '/operateapi/recommendarticleupdatekbaddoctorrecommendentity';//更新热门推荐信息
// const recommendUpdateFlag = '/operateapi/recommendarticleupdateenable';//更改热门推荐状态
// //疾病/症状管理
// const getDiseaseList = '/operateapi/diseasefindkbaooperatebodydiseaseentitypage';//查询疾病列表
// const changeDiseaseStatus = '/operateapi/diseaseupdatestatus';//更改疾病状态
// const updateDiseaseInfo = '/operateapi/diseaseupdatekbaooperatebodydiseaseentity';//更改疾病信息
// const insertDisease = '/operateapi/diseaseinsertkbaooperatebodydiseaseentity';//添加疾病信息
// const selectDiseaseInfo = '/operateapi/diseasefindkbaooperatebodydiseaseentitytbyid';//查询疾病信息
// const getSymptomList = '/operateapi//symptomfindkbaooperatebodysymptomentitypage';//查询症状列表
// const changeSymptomStatus = '/operateapi/symptomupdatestatus';//更改症状状态
// const updateSymptomInfo = '/operateapi/symptomupdatekbaooperatebodysymptomentity';//更改症状信息
// const insertSymptom = '/operateapi/symptominsertkbaooperatebodysymptomentity';//添加症状信息
// const selectSymptomInfo = '/operateapi/symptomfindkbaooperatebodysymptomentitybyid';//查询症状信息
// const downloadTxt = '/operateapi/organizationdownloadtemplate';  //批量上传信息模板下载  不加密
// //订单管理
// const orderManageAppointRegistList = '/operateapi/ordermanagementfindordermanagement';  //预约挂号订单管理
// const ordermanagementlistbyremoteorder = '/operateapi/ordermanagementfindlistbyremoteorder';  //远程问诊订单管理
// const ordermanagementselectbyremoteclinicid = '/operateapi/ordermanagementfindkbaoremoteorderdetailsdtobyremoteclinicid';  //远程问诊订单详情
// const querybyorderid = '/operateapi/appointmentrecordfindentitybyorderid'  //预约挂号详情
// const cordreport  = '/operateapi/appointmentrecordfindreport' //预约挂号报到
// const replacedoctor = '/operateapi/appointmentrecordfindreplacedoctor' //预约挂号替诊
// const closeappointment = '/operateapi/appointmentrecordfindcloseappointment' //预约挂号停诊
// const hospitalidanddepartmentid = '/operateapi/appointmentrecordfinddoctorbyhospitalidanddepartmentidd'  //预约挂号通过科室查询医生
// const querydeptname = '/operateapi/appointmentrecordfinddeptnamelist' //查询所有的科室
// const cordwriteexcel= '/operateapi/appointmentrecordwriteexcel'  //导出数据
// //服务项目管理
// const fdspackageitempage = '/operateapi/fdspackageitemfindkbaffdspackageitemsentitydtopage';  //服务项目列表
// const fdspackageiteminsert = '/operateapi/fdspackageiteminsertkbaffdspackageitemsentity';  //新增服务项目
// const fdspackageitemselectbyid = '/operateapi/fdspackageitemfindkbaffdspackageitemsentitydtobyid';  //服务项目详情
// const fdspackageitemupdate = '/operateapi/fdspackageitemupdatekbaffdspackageitemsentity';  //修改服务项目
// const fdspackageiteminsertbatch = '/operateapi/fdspackageiteminsertbatch';  //服务项目导入
// const queryarticlelist = '/operateapi/educationfindkbaddoctoreducationarticleentitypage' //服务项目关联内容
// const itemformiselection = '/operateapi/itemformfindselection' //服务项关联表单
// //服务包管理
// const servicepackageinsert = '/operateapi/servicepackageinsertkbaffdsservicepackageentity';  //新增/修改服务包
// const servicepackagepage = '/operateapi/servicepackagefindkbaffdsservicepackageentitydtopage';  //服务包列表
// const servicepackageselectbyid = '/operateapi/servicepackagefindkbaffdsservicepackagedetailsdtobyid';  //服务包详情
// const organizationdownloadtemplate = '/operateapi/organizationdownloadtemplate';  //服务包详情
// const servicepackagelistallpackage = '/operateapi/servicepackagefindallpackagelistmap';  //查询当前医院所在省份的所有服务包
// const servicepackagelistpackagebyhospital = '/operateapi/servicepackagefindpackagebyhospitallistmap';  //查询医院的所有服务包
// const servicepackageupdatepageagehospital = '/operateapi/servicepackageupdatekbaopageagehospital';  //修改医院服务包
// //通过省份ID查询医院列表
// const hospitalselectbyprovincecode = '/operateapi/hospitalfindkbaohospitalentitylistbyprovincecode';  //通过省份ID查询医院列表
// const wxList = '/operateapi/wxappbannerfindwxapppage'  //公众号列表
// const wxBannerList = '/operateapi/wxappbannerfindwxappbannerpage'  //公众号banner图列表
// const wxBannerAdd = '/operateapi/wxappbannerinsertkbawxappbannerentity'  //公众号Banner图添加
// const wxBannerDetail = '/operateapi/wxappbannerfindwxappbannerbyid' //公众号Banner图详情
// const wxBannerEdit = '/operateapi/wxappbannerupdatekbawxappbannerentity' //公众号Banner图修改
// const wxTemplateList = '/operateapi/wxapptemplatefindkbaooperatemanagewxapptemplatedtolist'// 公众号模板管理列表 
// const wxTemplateSave = '/operateapi/wxapptemplateupdatekbaooperatewxappmanagetemplate' //公众号模板管理保存
// const wxMenuList = '/operateapi/wxappmenufindmenulist' // 公众号菜单管理列表
// const wxMenuListChange = '/operateapi/wxappmenuupdateorinsertbatch' //公众号菜单管理列表修改
// const wxMangent = '/operateapi/wxappmanageupdatestatus'  //公众号功能管理
// const wxMangentSearch = '/operateapi/wxappmanagefindkbawxappentitybyappid' //公众号功能管理查询
// // 系统管理//公众号菜单管理
// const systemManagement = '/operateapi/wxappmenufindmenulistmap' //系统管理菜单列表
// const systemManagementAdd = '/operateapi/wxappmenuinsertkbawxmenuentity' //添加系统管理菜单
// const systemManagementEdit = '/operateapi/wxappmenuupdatekbawxmenuentity' //修改系统管理菜单
// const starClassList = '/operateapi/evaluationfindkbaooperatedoctorevaluationlabldtopage' //获取星级列表
// const starClassAdd = '/operateapi/evaluationinsertkbaooperatedoctorevaluationlabl' //添加星级列表
// const starClassSearch = '/operateapi/evaluationfindkbaooperatedoctorevaluationlabldtobyid' //查询星级列表详情
// const starClassChange = '/operateapi/evaluationupdatekbaooperatedoctorevaluationlabl' //修改医生详情
// //运维-系统管理
// const operateauthlist = '/operateapi/operateauthfindkbaooperateauthentitypage' //权限路径列表
// const operateauthinsert = '/operateapi/operateauthinsertkbaooperateauthentity' //权限路径新增
// const operateauthupdate = '/operateapi/operateauthupdatekbaooperateauthentity' //权限路径编辑
// const operateauthquerybyid = '/operateapi/operateauthfindkbaooperateauthentitybyid' //权限路径根据iD查询详情
// const operatemenuinsert = '/operateapi/operatemenuinsertkbaooperatemenuentityauth' //菜单管理新增
// const operatemenupage = '/operateapi/operatemenufindkbaooperatemenuentitypage' //菜单管理列表
// const operatemenuquerybymenuid = '/operateapi/operatemenufindbymenuid' //菜单详情
// const operatemenuupdate = '/operateapi/operatemenuupdatekbaooperatemenuentityauth' //菜单修改
// const operatemenuprentlist = '/operateapi/operatemenufindprentlist' //上级菜单列表
// const adminList = '/operateapi/operateuserfindoperteuserbypage'  //账号管理分页列表
// const adminAdd = '/operateapi/operateuserinsertkbaooperateuserentity' //账号管理新增用户
// const adminEdit = '/operateapi/operateuserfindoperateuserbyid' //账号管理编辑用户
// const adminDetail = '/operateapi/operateuserupdatekbaooperateuserentity' //账号管理修改用户
// const adminManage = '/operateapi/operateuserinsertkbaousermenu' //账号管理用户权限
// const adminSearch = '/operateapi/operateuserfindmenubyuserid'//查询用户权限管理详情
// const adminManageChange = '/operateapi/operateuserupdatekbaousermenu' //修改用户权限管理
// //敏感词
// const sensitiveSelectSensitive='/operateapi/sensitivefindsensitivepage' //查询
// const sensitiveUpdate='/operateapi/sensitiveupdatekbaooperatesensitiveentity' //修改
// // 支付方式
// const paymentchannelmap = '/operateapi/channeldisbursementfindhospitalpaymentchannelmap' // 查询所有支付类型和显示端
// const channelenummap = '/operateapi/channeldisbursementfindpaymentchannelenummap' //根据支付类型查询支付渠道
// const wxappnamelist = '/operateapi/hospitalfindwxappnamelist' //查询支付账号
// const insertpaymentchannel = '/operateapi/channeldisbursementinsertkbaohospitalpaymentchannel'  //添加支付方式
// const querylist = '/operateapi/channeldisbursementfindkbaooperatechanneldisbursemententitydtolist' //通过医院查询医院支付方式列表
// const querybyid = '/operateapi/channeldisbursementfindkbaooperatechanneldisbursemententitybyid' //查询医院支付方式
// const updatepaymentchannel = '/operateapi/channeldisbursementupdatekbaohospitalpaymentchannel'//修改医院支付方式
// //大文件分片上传接口
// const lecturedemanduploadfilemd5='/operateapi/lecturedemanduploadfilemd5' //大文件分片上传断点续传
// const lecturedemanduploadfile='/operateapi/lecturedemanduploadfile' //大文件分片上传接口
// const lecturecolumnlist = '/operateapi/lecturecolumnfindkbaooperatelecturecolumnentitylist' //直播/栏目列表
// const lecturecolumninsert = '/operateapi/lecturecolumninsertkbaooperatelecturecolumnentity' // 添加栏目
// const lecturecolumnupdate = '/operateapi/lecturecolumnupdatekbaooperatelecturecolumnentity' //修改栏目详情
// // 点播
// const lecturedemandpage = '/operateapi/lecturedemandfindkbaooperatelecturedemandentitydtopage' //讲堂点播列表
// const lecturedemandinsert = '/operateapi/lecturedemandinsertkbaooperatelecturedemandentity' //添加讲堂点播
// const lecturedemandselectbyid = '/operateapi/lecturedemandfindkbaooperatelecturedemandentitybyid' //查询讲堂点播详情
// const lecturedemandupdate = '/operateapi/lecturedemandupdatekbaooperatelecturedemandentity' //修改点播详情
// const lecturedemandpagebyexaminelist = '/operateapi/lecturedemandfindpagebyexaminelist' //讲堂审核列表
// const lecturedemandupdateplaystatus = '/operateapi/lecturedemandupdateplaystatus' //修改讲堂审核状态
// const lecturedemandupdatechannelstatus = '/operateapi/lecturedemandupdatekbaochannelstatus' // 关闭直播
// const lecturedemandintolive = '/operateapi/lecturedemandfindintolive' //进入直播间
// const insertlive = '/operateapi/lecturedemandinsertkbaolive'  //添加直播
// const updatelive = '/operateapi/lecturedemandupdatekbaolive' //修改直播
// const livestatus = '/operateapi/lecturedemandupdatekbaolivestatus' //修改直播状态
// const livebyid = '/operateapi/lecturedemandfindlivebyid' //查询直播
// const livelist = '/operateapi/lecturedemandfindlivepage' //查询直播列表
// //院内编码
// const doctorselectdoctorhisid = '/operateapi/doctorfindkbaddoctorhisid'; //查询医生关联信息hisId
// const doctorupdatedoctorhisid = '/operateapi/doctorupdatekbaddoctorhisid'; //修改医生关联信息hisId
// const doctorselecthisdoctorlist = '/operateapi/doctorfindhisdoctorlist'; //模糊查询医生关联信息hisId列表
// const hospitalquerynamelist = '/operateapi/hospitalfindnamelist' //查询支付渠道医院列表
// const teaminsert = '/operateapi/teaminsertkbaffdsteamentity'  //医疗小组添加
// const teamupdate = '/operateapi/teamupdatekbaffdsteamentity' //医疗小组编辑
// const teamquery = '/operateapi/teamfindkbaffdsteamentitydto'  //医疗小组查询
// const teamlist = '/operateapi/teamfindkbaohospitalregisterdtopage'  //医疗小组列表
// const insertdoctor = '/operateapi/authenticationinsertkbaddoctor' //添加医生
// const countlivedata = '/operateapi/lecturedemandfindcountlivedata' //加载直播数据
// const chargeinsert = '/operateapi/itemchargeinsertkbaooperateserviceitemchargeentity'  // 添加互联网收费标准
// const chargepage = '/operateapi/itemchargefindkbaooperateserviceitemchargeentitypage' // 互联网收费标准列表
// const chargequerybyid = '/operateapi/itemchargefindkbaooperateserviceitemchargeentitybyid' // 互联网收费标准详情
// const chargeupdate = '/operateapi/itemchargeupdatekbaooperateserviceitemchargeentity' // 修改互联网收费标准
// const feeunitenum = '/operateapi/itemchargefinditemfeeunitenum' //查询互联网收费标准收费单位
// const selectdoctorlist = '/operateapi/doctorschedulingfindkbaodoctorlist' //查询门诊医生未排班列表
// const querydoctormenulist = '/operateapi/doctorschedulingfinddoctormenulist' //查询医生开通的服务列表并查询费用
// const insertdoctorscheduling = '/operateapi/doctorschedulinginsertkbaodoctorscheduling' //新增医生排班
// const updatedoctorscheduling = '/operateapi/doctorschedulingupdatekbaodoctorscheduling' //修改医生排班
// const doctorschedulingquerybyid = '/operateapi/doctorschedulingfindkbaooperateservicedoctorschedulingdtobyid' //查询医生排班详情
// const doctorschedulingpage = '/operateapi/doctorschedulingfindkbaooperateservicedoctorschedulingdtopage' // 查询医生排班列表
// const doctoridandservicetype = '/operateapi/doctorschedulingquerybydoctoridandservicetype'  //查询医生具体排班时间段与列表
// const querydoctorschedulinglist = '/operateapi/doctorschedulingfinddoctorschedulinglist' //查询医生开通服务
// const apiserviceinsert = '/operateapi/apiserviceinsertkbaooperateapiserviceentity' //添加接口管理
// const apiserviceupdate = '/operateapi/apiserviceupdatekbaooperateapiserviceentity' // 修改接口管理 
// const apiservicequerybyid = '/operateapi/apiservicefindkbaooperateapiserviceentitybyid' // 查询接口详情
// const apiservicepage = '/operateapi/apiservicefindkbaooperateapiserviceentitypage' // 查询接口管理列表
// const clinicandpaycostpage = '/operateapi/accountfindclinicandpaycostpage' // 查询诊间缴费账单列表
// const clinicandpaycost = '/operateapi/accountfindclinicandpaycost' // 诊间缴费对账
// const rechargethecardpage = '/operateapi/accountfindrechargethecardpage' // 查询就诊卡充值账单列表
// const rechargethecard = '/operateapi/accountfindrechargethecard' // 就诊卡充值对账
// const inhospitalpage = '/operateapi/accountfindinhospitalpage' // 查询住院押金缴费账单列表
// const inhospital = '/operateapi/accountfindinhospital' // 住院押金缴费对账
// const updatestatus = '/operateapi/accountupdatestatus' // 所有手动对账接口
// const speedofprogress = '/operateapi/accountfindspeedofprogress' // 进度条
// const deleteredis = '/operateapi/accountdeleteredis' // 取消对账
// const querybyserialnumber = '/operateapi/accountfindkbaoaccountcheckingdtobyserialnumber'  //通过账单流水号查询状态
// const agreementinsertagreement = '/operateapi/agreementinsertkbaohospitalagreemententity' //添加随访告知书内容
// const agreementupdateagreement = '/operateapi/agreementupdatekbaohospitalagreemententity' //修改随访告知书内容
// const agreementquerybyid = '/operateapi/agreementfindkbaohospitalagreemententitybyid' //查看随访告知书内容
// const agreementlist = '/operateapi/agreementfindkbaohospitalagreemententitypage' //查看随访告知书列表
// const itemforminsertform = '/operateapi/itemforminsertkbaffdsitemsformentity' //添加随访表单
// const itemformupdatetform = '/operateapi/itemformupdatekbaffdsitemsformentity' //修改随访表单
// const itemformlist = '/operateapi/itemformfindkbaffdsitemsformentitypage' //查询医院随访表单列表
// const formcontentinsertformcontent = '/operateapi/formcontentinsertkbaffdsitemsformcontententity' //添加表单题目
// const formcontentupdateformcontent = '/operateapi/formcontentupdatekbaffdsitemsformcontententity' //修改表单题目
// const formcontentquerybyid = '/operateapi/formcontentfindkbaffdsitemsformcontententitybyid' //查询表单题目详情
// const formcontentlist = '/operateapi/formcontentfindkbaffdsitemsformcontententitypage' //查询表单题目列表

/*service层 */
//字典
const dictionaryList = "/operateapi/operate/diction/findKbaoDictionDtoListByEntity";//字典列表
const dictionaryInsert = "/operateapi/operate/diction/insertKbaoOperateDictionEntity";//添加字典
const dictionaryUpdate = "/operateapi/operate/diction/updateKbaoOperateDictionEntity";//修改字典
//医生审核预约挂号
const news = '/operateapi/organization/findKbaoHospitalNewsPage'; //动态新闻列表分页
const fileAll = "/operateapi/hospital/uploadOperateFiles"; //上传接口 不加密
const getProvince = "/operateapi/authentication/findProvince"; //获取省级列表
const getTitle = "/operateapi/authentication/findKbaoDictionDtoList"; //获取职称列表
const getReviewDoctorList = "/operateapi/authentication/findKbaoOperateDoctorDtoPage"; //获取审核医生列表
const delReviewDoctor = "/operateapi/authentication/updateDoctorById"; //删除审核医生列表
const reviewDoctorInfo = "/operateapi/authentication/findKbaoOperateDoctorDtoById"; //审核医生列表详情
const reviewDoctor = "/operateapi/authentication/updateAuthStatus"; //医生审核
const reviewDoctorUpdate = "/operateapi/authentication/updateKbadDoctorByOperate"; //医生审核修改信息
const hospitalList = "/operateapi/authentication/findKbaoHospitalEntityList"; //医生审核
const registerList = "/operateapi/register/findKbaoAppointmentRegistrationDtoPage"; //预约挂号列表
const registerDoctorDetail = "/operateapi/register/findKbaoAppointmentRegistrationDtoById"; //预约医生详情
const changeRegisterStatus = "/operateapi/register/updateStatus"; //改变预约状态
const registerDoctorList = "/operateapi/register/findKbaoDoctorNotScheduling"; //预约挂号专家列表
const registerDoctorUpdate = "/operateapi/register/updateKbaoAppointmentRegistration"; //预约挂号修改
const registerDoctorInsert = "/operateapi/register/insertKbaoAppointmentRegistration"; //预约挂号添加
const registerselectdept = '/operateapi/register/findDeptNotScheduling' // 预约挂号科室列表
// 医生端远程门诊
const doctorRomteclinicAdd = '/operateapi/remote/doctor/insertKbaoOperateRemoteDoctorMasterEntity'  //新增远程门诊医生排班
const doctorRomteclinicEdit = '/operateapi/remote/doctor/updateKbaoOperateRemoteDoctorMasterEntity' //编辑远程门诊医生排班详情
const doctorRomteclinicSearchExpert = '/operateapi/remote/doctor/findRemoteDoctorList'  //专家查找
const doctorRomteclinicList = '/operateapi/remote/doctor/findPageRemoteDoctor' //远程门诊医生列表
const doctorRomteclinicDetail = '/operateapi/remote/doctor/findOutpatientDoctorScheduling' //查询远程门诊医生详情
//医生端版本管理
const versioninsert = '/operateapi/version/insertKbaoOperateVersionEntity'   //医生端版本管理添加
const versionlist = '/operateapi/version/findKbaoOperateVersionEntityList' //医生端版本管理列表
const versiondetail = '/operateapi/version/findVersion' //医生端版本管理详情
const versionupdate = '/operateapi/version/updateKbaoOperateVersionEntity' //医生端版本管理修改
// 家医签约管理
const contractManagementList = '/operateapi/order/management/findKbafFdsOrderManageDtoPage'   //家医签约管理列表
// 机构管理
const management = '/operateapi/hospital/findKbaoHospitalOperateInfoDtoPage'  //机构管理医院列表
const managementInfo = '/operateapi/hospital/findHospitalOperateDtoById'   //医院详细信息
const managementAll = '/operateapi/hospital/findKbaoOperateDictionEntityPage' //医院等级列表
const managementGzh = '/operateapi/hospital/findWxAppNameList'   //查询医院公众号
const managementYlt = '/operateapi/hospital/findHospitalNameList' //查询医院医联体
const managementEdit = '/operateapi/hospital/updateKbaoHospitalOperateEntityById' //保存医院详情
const hospitalgetenummap = '/operateapi/hospital/findEnumMap'  //查询第三方服务
const hospitalwxapplist = '/operateapi/hospital/findKbaWxappEntityList' //查询医院关联的公众号
//动态新闻
const getNews = '/operateapi/organization/findKbaoHospitalNewsEntity' //获取动态新闻详情信息
const setNews = '/operateapi/organization/insertKbaoHospitalNewsEntity'  //设置动态新闻列表
//新闻列表
const addNews = '/operateapi/organization/updateKbaoHospitalNewsEntity'; //修改新闻详情
const newsA = '/operateapi/organization/insertKbaoHospitalNewsEntity'; // 新增新闻
//内容管理
const contentWrap = '/operateapi/article/findKbaoOperateArticleManageDtoPageByArticle'  // 内容管理列表
const createdWrap = '/operateapi/article/insertKbaoOperateArticleEntity'   // 创建新闻
const changeWrap = '/operateapi/article/updateKbaoOperateArticleEntity'   // 修改新闻
const getWrap = '/operateapi/article/findOperateArticleColumnDtoById' //查询新闻
const upWrap = '/operateapi/article/updateIdeleteBatch' //下架
const root = '/operateapi/article/updatePriority';   //新闻置顶
//专家列表
const zj = '/operateapi/organization/findExpertDoctorPage'   //专家列表分页
const expertedit = '/operateapi/organization/updateKbaoExpertDoctor' //专家信息修改
const expertadd = '/operateapi/organization/findDoctorPage' //专家列表新增
//特色科室
const tesekeshi = '/operateapi/organization/findSpecialDeptPage'   //特色科室
const departmentseditleft = '/operateapi/organization/findSpecialDept'  //特色科室左侧科室查询
const departmentssearch = '/operateapi/organization/findKbaoHospitalDepartmentsEntityById' // 特色科室右侧科室详情查询
const departmentseditright = '/operateapi/organization/updateKbaoHospitalDepartmentsEntity' // 特色科室右侧科室详情修改 
//banner接口
const bannerHome = '/operateapi/banner/findKbaoHospitalBannerEntityPage' //Banner分页
const bannerAdd = '/operateapi/banner/insertKbaoHospitalBannerEntity'  //banner添加
const bannerChange = '/operateapi/banner/updateKbaoHospitalBannerEntity' //banner 编辑
const getIdBanner = '/operateapi/banner/findKbaoHospitalBannerEntityById' //banner查找
// 院内科室
const medicine = '/operateapi/organization/findHosDeptPage'  // 院内科室查询
const medicinesearch = '/operateapi/organization/findHosDeptListMap'  //院内科室列表查询
const medicinelistsearch = '/operateapi/organization/findKbaoHospitalDepartmentsEntityById' //院内科室详情查询
const medicineedit = '/operateapi/organization/updateKbaoHospitalDepartmentsEntity'//院内科室编辑
const medicineSearchList = '/operateapi/operate/diction/findDeptListMap'  //查询所有科室信息
const medicineSelectedList = '/operateapi/hospital/findKbaoHospitalList'  // 选中科室的列表
const medicineExpertList = '/operateapi/organization/findDeptInDoctor'  //院内科室专家列表
const medicineSave = '/operateapi/organization/updateSaveKbaoHospitalDept' // 院内科室保存
const getDeptListByHospitalId = '/operateapi/authentication/findDeptListByHospitalId' // 根据医院查询对应科室列表
//服务管理
const _server = '/operateapi/hospitalMenu/findKbaoHospitalMenuDtoListById'  //服务管理列表
const getServer = '/operateapi/hospitalMenu/findKbaoHospitalMenuDtoList' //服务管理-编辑
const setserver = '/operateapi/hospitalMenu/updateKbaoHospitalMenuEntity'     // 编辑服务保存
//预约科室接口
const kDepartment = '/operateapi/organization/findKbaoAppointmentDeptDtoPage' //预约科室列表
const getDepartment = '/operateapi/organization/findDeptListMap'  //查看科室列表
const departmentDetail = '/operateapi/organization/findKbaoHospitalDepartmentsEntityById' //查看科室详情
const departmentChange = '/operateapi/organization/updateKbaoHospitalDepartmentsEntity' //修改预约科室详情
// 远程门诊
const searchRoomList = '/operateapi/hospital/findKbaoHospitalEntityListByProvinceCode'  //根据省份和医院名模糊查询
const searchRoomSelectAdd = '/operateapi/apply/remot/insertKbaoOperateHospitalApplyRemote'   // 关联远程门诊医院
const searchCurrentRoom = '/operateapi/apply/remot/findKbaoOperateHospitalApplyRemoteDtoList'  //查询当前医院下关联的远程门诊医院
// 远程门诊类型维护 
const DoctorRemoteClinicTypeList = '/operateapi/outpatient/findKbaoOperateRemoteOutpatientTypeEntityList'    //查询当前医院下远程门诊类型
const DoctorRemoteClinicTypeAdd = '/operateapi/outpatient/insertKbaoOperateRemoteOutpatientTypeEntity'   //新增远程门诊类型
const DoctorRemoteClinicTypeSearch = '/operateapi/outpatient/findKbaoOperateRemoteOutpatientTypeEntityById'  //查找远程门诊详情
const DoctorRemoteClinicTypeEdit = '/operateapi/outpatient/updateKbaoOperateRemoteOutpatientTypeEntity'   //修改远程门诊类型
const remotedoctorupdateremotestatus = '/operateapi/remote/doctor/updateKbaoRemoteStatus'   //修改医生是否开启远程门诊
const doctorupdatedoctorsort = '/operateapi/doctor/updateKbadDoctorEntitySort'   //修改医生排序
// 第三方厂家服务
const thirdparty = '/operateapi/hospitalThirdparty/findHospitalThirdparty' //查询第三方厂家
const updatethirdparty = '/operateapi/hospitalThirdparty/updateKbaoHospitalThirdpartyEntity'//修改第三方厂家
const DoctorListEdit = '/operateapi/remote/doctor/updateKbaoRemoteStatus' // 医生排班列表修改 
//运维端!!!
const residentReg = '/operateapi/resident/findUserList'//获取居民注册信息
const uploadXls = '/operateapi/organization/insertBatchKbadDoctor' //批量上传医生信息  不加密
const getDoctorInfo = '/operateapi/resident/findKbaoDoctorPage'  //获取医生注册信息
const getCity = '/operateapi/sys/province/findProvinceCityList' //获取省级区域列表
const getCounty = '/operateapi/sys/province/findKbaAreaList' //根据市级查询县列表
// 机构注册信息
const mechanismregList = '/operateapi/organization/findKbaoHospitalRegisterDtoPage' //机构注册信息列表查询
const mechanismregEnable = '/operateapi/hospital/updateEnableById' //机构注册信息启用禁用
const mechanismregAdd = '/operateapi/hospital/insertKbaoHospitalEntity' // 新增机构
const mechanismregSearch = '/operateapi/hospital/findHospitalOperateDtoById'  //根据医院ID查询医院详情
const mechanismregEdit = '/operateapi/hospital/updateKbaoHospitalEntity' //修改医院详情
const mechanismregUpLoad = '/operateapi/organization/insertBatchKbaoHospital' //批量上传机构信息  不加密
/* ********************************************* */
const doctorList = '/operateapi/doctor/findKbadDoctorEntityList' //医生列表
const doctorServerManage = '/operateapi/organization/findKbaoMenuList' //医生所有服务管理列表
const doctorServerManageById = '/operateapi/doctor/menu/findMenuIdsByDoctorId' //查询某个医生的服务管理列表
const doctorServerManageUpdate = '/operateapi/doctor/menu/insertOrUpdateKbaoMenuEntity' //修改某个医生的服务管理
//内容管理
//1.健康宣教
const educationInsert = '/operateapi/education/insertKbadDoctorEducationArticleEntity'; //新增健康宣教
const educationArticleList = '/operateapi/education/findKbadDoctorEducationArticleEntityPage'; //健康宣教list
const educationDetailById = '/operateapi/education/findKbadDoctorEducationArticleEntityById';//根据ID查询健康宣教详情
const educationUpdate = '/operateapi/education/updateKbadDoctorEducationArticleEntity';//更新健康宣教信息
const educationUpdateFlag = '/operateapi/education/updateEnable';//更改健康宣教状态
//2.经典案例
const doctorclassicDelete = '/operateapi/doctor/classic/case/delete'; //删除经典案例
const doctorclassicInsert = '/operateapi/doctor/classic/case/insertKbadDoctorClassicCaseEntity'; //新增经典案例
const doctorclassicArticleList = '/operateapi/doctor/classic/case/findKbadDoctorClassicCaseEntityPage'; //经典案例list
const doctorclassicDetailById = '/operateapi/doctor/classic/case/findKbadDoctorClassicCaseEntityById';//根据ID查询经典案例详情
const doctorclassicUpdate = '/operateapi/doctor/classic/case/updateKbadDoctorClassicCaseEntity';//更新经典案例信息
const doctorclassicUpdateFlag = '/operateapi/doctor/classic/case/updateEnabledDisable';//更改经典案例状态
//3.热门推荐
const recommendInsert = '/operateapi/recommend/article/insertKbadDoctorRecommendEntity'; //新增热门推荐
const recommendArticleList = '/operateapi/recommend/article/findDoctorRecommendPage'; //热门推荐list
const recommendDetailById = '/operateapi/recommend/article/findKbaoDoctorRecommendEntityById';//根据ID查询热门推荐详情
const recommendUpdate = '/operateapi/recommend/article/updateKbadDoctorRecommendEntity';//更新热门推荐信息
const recommendUpdateFlag = '/operateapi/recommend/article/updateEnable';//更改热门推荐状态
//疾病/症状管理
const getDiseaseList = '/operateapi/disease/findKbaoOperateBodyDiseaseEntityPage';//查询疾病列表
const changeDiseaseStatus = '/operateapi/disease/updateStatus';//更改疾病状态
const updateDiseaseInfo = '/operateapi/disease/updateKbaoOperateBodyDiseaseEntity';//更改疾病信息
const insertDisease = '/operateapi/disease/insertKbaoOperateBodyDiseaseEntity';//添加疾病信息
const selectDiseaseInfo = '/operateapi/disease/findKbaoOperateBodyDiseaseEntitytById';//查询疾病信息
const getSymptomList = '/operateapi//symptom/findKbaoOperateBodySymptomEntityPage';//查询症状列表
const changeSymptomStatus = '/operateapi/symptom/updateStatus';//更改症状状态
const updateSymptomInfo = '/operateapi/symptom/updateKbaoOperateBodySymptomEntity';//更改症状信息
const insertSymptom = '/operateapi/symptom/insertKbaoOperateBodySymptomEntity';//添加症状信息
const selectSymptomInfo = '/operateapi/symptom/findKbaoOperateBodySymptomEntityById';//查询症状信息
const downloadTxt = '/operateapi/organization/downloadTemplate';  //批量上传信息模板下载  不加密
//订单管理
const orderManageAppointRegistList = '/operateapi/order/management/findOrderManagement';  //预约挂号订单管理
const ordermanagementlistbyremoteorder = '/operateapi/order/management/findListByRemoteOrder';  //远程问诊订单管理
const ordermanagementselectbyremoteclinicid = '/operateapi/order/management/findKbaoRemoteOrderDetailsDtoByRemoteClinicId';  //远程问诊订单详情
const querybyorderid = '/operateapi/appointment/record/findEntityByOrderId'  //预约挂号详情
const cordreport  = '/operateapi/appointment/record/findReport' //预约挂号报到
const replacedoctor = '/operateapi/appointment/record/findReplaceDoctor' //预约挂号替诊
const closeappointment = '/operateapi/appointment/record/findCloseAppointment' //预约挂号停诊
const hospitalidanddepartmentid = '/operateapi/appointment/record/findDoctorByHospitalIdAndDepartmentId'  //预约挂号通过科室查询医生
const querydeptname = '/operateapi/appointment/record/findDeptNameList' //查询所有的科室
const cordwriteexcel= '/operateapi/appointment/record/writeExcel'  //导出数据
//服务项目管理
const fdspackageitempage = '/operateapi/fds/packageItem/findKbafFdsPackageItemsEntityDtoPage';  //服务项目列表
const fdspackageiteminsert = '/operateapi/fds/packageItem/insertKbafFdsPackageItemsEntity';  //新增服务项目
const fdspackageitemselectbyid = '/operateapi/fds/packageItem/findKbafFdsPackageItemsEntityDtoById';  //服务项目详情
const fdspackageitemupdate = '/operateapi/fds/packageItem/updateKbafFdsPackageItemsEntity';  //修改服务项目
const fdspackageiteminsertbatch = '/operateapi/fds/packageItem/insertBatch';  //服务项目导入
const queryarticlelist = '/operateapi/education/findKbadDoctorEducationArticleEntityPage' //服务项目关联内容
const itemformiselection = '/operateapi/item/form/findSelection' //服务项关联表单
//服务包管理
const servicepackageinsert = '/operateapi/service/package/insertKbafFdsServicePackageEntity';  //新增/修改服务包
const servicepackagepage = '/operateapi/service/package/findKbafFdsServicePackageEntityDtoPage';  //服务包列表
const servicepackageselectbyid = '/operateapi/service/package/findKbafFdsServicePackageDetailsDtoById';  //服务包详情
const organizationdownloadtemplate = '/operateapi/organization/downloadTemplate';  //服务包详情
const servicepackagelistallpackage = '/operateapi/service/package/findAllPackageListMap';  //查询当前医院所在省份的所有服务包
const servicepackagelistpackagebyhospital = '/operateapi/service/package/findPackageByHospitalListMap';  //查询医院的所有服务包
const servicepackageupdatepageagehospital = '/operateapi/service/package/updateKbaoPageageHospital';  //修改医院服务包
//通过省份ID查询医院列表
const hospitalselectbyprovincecode = '/operateapi/hospital/findKbaoHospitalEntityListByProvinceCode';  //通过省份ID查询医院列表 
const wxList = '/operateapi/wxapp/banner/findWxappPage'  //公众号列表
const wxBannerList = '/operateapi/wxapp/banner/findWxappBannerPage'  //公众号banner图列表
const wxBannerAdd = '/operateapi/wxapp/banner/insertKbaWxappBannerEntity'  //公众号Banner图添加
const wxBannerDetail = '/operateapi/wxapp/banner/findWxappBannerById' //公众号Banner图详情
const wxBannerEdit = '/operateapi/wxapp/banner/updateKbaWxappBannerEntity' //公众号Banner图修改
const wxTemplateList = '/operateapi/wxapp/template/findKbaoOperateManageWxappTemplateDtoList'// 公众号模板管理列表 
const wxTemplateSave = '/operateapi/wxapp/template/updateKbaoOperateWxappManageTemplate' //公众号模板管理保存
const wxMenuList = '/operateapi/wxapp/menu/findMenuList' // 公众号菜单管理列表
const wxMenuListChange = '/operateapi/wxapp/menu/updateOrInsertBatch' //公众号菜单管理列表修改
const wxMangent = '/operateapi/wxappmanage/updateStatus'  //公众号功能管理
const wxMangentSearch = '/operateapi/wxappmanage/findKbaWxappEntityByAppid' //公众号功能管理查询
// 系统管理//公众号菜单管理
const systemManagement = '/operateapi/wxapp/menu/findMenuListMap' //系统管理菜单列表
const systemManagementAdd = '/operateapi/wxapp/menu/insertKbaWxMenuEntity' //添加系统管理菜单
const systemManagementEdit = '/operateapi/wxapp/menu/updateKbaWxMenuEntity' //修改系统管理菜单
const starClassList = '/operateapi/evaluation/findKbaoOperateDoctorEvaluationLablDtoPage' //获取星级列表
const starClassAdd = '/operateapi/evaluation/insertKbaoOperateDoctorEvaluationLabl' //添加星级列表
const starClassSearch = '/operateapi/evaluation/findKbaoOperateDoctorEvaluationLablDtoById' //查询星级列表详情
const starClassChange = '/operateapi/evaluation/updateKbaoOperateDoctorEvaluationLabl' //修改医生详情
//运维-系统管理
const operateauthlist = '/operateapi/operate/auth/findKbaoOperateAuthEntityPage' //权限路径列表
const operateauthinsert = '/operateapi/operate/auth/insertKbaoOperateAuthEntity' //权限路径新增
const operateauthupdate = '/operateapi/operate/auth/insertKbaoOperateAuthEntity' //权限路径编辑
const operateauthquerybyid = '/operateapi/operate/auth/findKbaoOperateAuthEntityById' //权限路径根据iD查询详情
const operatemenuinsert = '/operateapi/operate/menu/insertKbaoOperateMenuEntityAuth' //菜单管理新增
const operatemenupage = '/operateapi/operate/menu/findKbaoOperateMenuEntityPage' //菜单管理列表
const operatemenuquerybymenuid = '/operateapi/operate/menu/findByMenuId' //菜单详情
const operatemenuupdate = '/operateapi/operate/menu/updateKbaoOperateMenuEntityAuth' //菜单修改
const operatemenuprentlist = '/operateapi/operate/menu/findPrentList' //上级菜单列表
const adminList = '/operateapi/operateUser/findOperteUserByPage'  //账号管理分页列表
const adminAdd = '/operateapi/operateUser/insertKbaoOperateUserEntity' //账号管理新增用户
const adminEdit = '/operateapi/operateUser/findOperateUserById' //账号管理编辑用户
const adminDetail = '/operateapi/operateUser/updateKbaoOperateUserEntity' //账号管理修改用户
const adminManage = '/operateapi/operateUser/insertKbaoUserMenu' //账号管理用户权限
const adminSearch = '/operateapi/operateUser/findMenuByUserId'//查询用户权限管理详情
const adminManageChange = '/operateapi/operateUser/updateKbaoUserMenu' //修改用户权限管理
//敏感词
const sensitiveSelectSensitive='/operateapi/sensitive/findSensitivePage' //查询
const sensitiveUpdate='/operateapi/sensitive/updateKbaoOperateSensitiveEntity' //修改
// 支付方式
const paymentchannelmap = '/operateapi/channelDisbursement/findHospitalPaymentChannelMap' // 查询所有支付类型和显示端
const channelenummap = '/operateapi/channelDisbursement/findPaymentChannelEnumMap' //根据支付类型查询支付渠道
const wxappnamelist = '/operateapi/hospital/findWxAppNameList' //查询支付账号
const insertpaymentchannel = '/operateapi/channelDisbursement/insertKbaoHospitalPaymentChannel'  //添加支付方式
const querylist = '/operateapi/channelDisbursement/findKbaoOperateChannelDisbursementEntityDtoList' //通过医院查询医院支付方式列表
const querybyid = '/operateapi/channelDisbursement/findKbaoOperateChannelDisbursementEntityById' //查询医院支付方式
const updatepaymentchannel = '/operateapi/channelDisbursement/updateKbaoHospitalPaymentChannel'//修改医院支付方式
//大文件分片上传接口
const lecturedemanduploadfilemd5='/operateapi/lecture/demand/uploadFileMd5' //大文件分片上传断点续传
const lecturedemanduploadfile='/operateapi/lecture/demand/uploadFile' //大文件分片上传接口
const lecturecolumnlist = '/operateapi/lecture/column/findKbaoOperateLectureColumnEntityList' //直播/栏目列表
const lecturecolumninsert = '/operateapi/lecture/column/insertKbaoOperateLectureColumnEntity' // 添加栏目
const lecturecolumnupdate = '/operateapi/lecture/column/updateKbaoOperateLectureColumnEntity' //修改栏目详情
// 点播
const lecturedemandpage = '/operateapi/lecture/demand/findKbaoOperateLectureDemandEntityDtoPage' //讲堂点播列表
const lecturedemandinsert = '/operateapi/lecture/demand/insertKbaoOperateLectureDemandEntity' //添加讲堂点播
const lecturedemandselectbyid = '/operateapi/lecture/demand/findKbaoOperateLectureDemandEntityById' //查询讲堂点播详情
const lecturedemandupdate = '/operateapi/lecture/demand/updateKbaoOperateLectureDemandEntity' //修改点播详情
const lecturedemandpagebyexaminelist = '/operateapi/lecture/demand/findPageByExamineList' //讲堂审核列表
const lecturedemandupdateplaystatus = '/operateapi/lecture/demand/updatePlayStatus' //修改讲堂审核状态
const lecturedemandupdatechannelstatus = '/operateapi/lecture/demand/updateKbaoChannelStatus' // 关闭直播
const lecturedemandintolive = '/operateapi/lecture/demand/findIntoLive' //进入直播间
const insertlive = '/operateapi/lecture/demand/insertKbaoLive'  //添加直播
const updatelive = '/operateapi/lecture/demand/updateKbaoLive' //修改直播
const livestatus = '/operateapi/lecture/demand/updateKbaoLiveStatus' //修改直播状态
const livebyid = '/operateapi/lecture/demand/findLiveById' //查询直播
const livelist = '/operateapi/lecture/demand/findLivePage' //查询直播列表
//院内编码
const doctorselectdoctorhisid = '/operateapi/doctor/findKbadDoctorHisId'; //查询医生关联信息hisId
const doctorupdatedoctorhisid = '/operateapi/doctor/updateKbadDoctorHisId'; //修改医生关联信息hisId
const doctorselecthisdoctorlist = '/operateapi/doctor/findHisDoctorList'; //模糊查询医生关联信息hisId列表
const hospitalquerynamelist = '/operateapi/hospital/findNameList' //查询支付渠道医院列表
const teaminsert = '/operateapi/team/insertKbafFdsTeamEntity'  //医疗小组添加
const teamupdate = '/operateapi/team/updateKbafFdsTeamEntity' //医疗小组编辑
const teamquery = '/operateapi/team/findKbafFdsTeamEntityDto'  //医疗小组查询
const teamlist = '/operateapi/team/findKbaoHospitalRegisterDtoPage'  //医疗小组列表
const insertdoctor = '/operateapi/authentication/insertKbadDoctor' //添加医生
const countlivedata = '/operateapi/lecture/demand/findCountLiveData' //加载直播数据
const chargeinsert = '/operateapi/item/charge/insertKbaoOperateServiceItemChargeEntity'  // 添加互联网收费标准
const chargepage = '/operateapi/item/charge/findKbaoOperateServiceItemChargeEntityPage' // 互联网收费标准列表
const chargequerybyid = '/operateapi/item/charge/findKbaoOperateServiceItemChargeEntityById' // 互联网收费标准详情
const chargeupdate = '/operateapi/item/charge/updateKbaoOperateServiceItemChargeEntity' // 修改互联网收费标准
const feeunitenum = '/operateapi/item/charge/findItemFeeUnitEnum' //查询互联网收费标准收费单位
const selectdoctorlist = '/operateapi/doctor/scheduling/findKbaoDoctorList' //查询门诊医生未排班列表
const querydoctormenulist = '/operateapi/doctor/scheduling/findDoctorMenuList' //查询医生开通的服务列表并查询费用
const insertdoctorscheduling = '/operateapi/doctor/scheduling/insertKbaoDoctorScheduling' //新增医生排班
const updatedoctorscheduling = '/operateapi/doctor/scheduling/updateKbaoDoctorScheduling' //修改医生排班
const doctorschedulingquerybyid = '/operateapi/doctor/scheduling/findKbaoOperateServiceDoctorSchedulingDtoById' //查询医生排班详情
const doctorschedulingpage = '/operateapi/doctor/scheduling/findKbaoOperateServiceDoctorSchedulingDtoPage' // 查询医生排班列表
const doctoridandservicetype = '/operateapi/doctorschedulingquerybydoctoridandservicetype'  //查询医生具体排班时间段与列表
const querydoctorschedulinglist = '/operateapi/doctor/scheduling/findDoctorSchedulingList' //查询医生开通服务
const apiserviceinsert = '/operateapi/api/service/insertKbaoOperateApiServiceEntity' //添加接口管理
const apiserviceupdate = '/operateapi/api/service/updateKbaoOperateApiServiceEntity' // 修改接口管理 
const apiservicequerybyid = '/operateapi/api/service/findKbaoOperateApiServiceEntityById' // 查询接口详情
const apiservicepage = '/operateapi/api/service/findKbaoOperateApiServiceEntityPage' // 查询接口管理列表
const clinicandpaycostpage = '/operateapi/account/findClinicAndPayCostPage' // 查询诊间缴费账单列表
const clinicandpaycost = '/operateapi/account/findClinicAndPayCost' // 诊间缴费对账
const rechargethecardpage = '/operateapi/account/findRechargeTheCardPage' // 查询就诊卡充值账单列表
const rechargethecard = '/operateapi/account/findRechargeTheCard' // 就诊卡充值对账
const inhospitalpage = '/operateapi/account/findInHospitalPage' // 查询住院押金缴费账单列表
const inhospital = '/operateapi/account/findInHospital' // 住院押金缴费对账
const updatestatus = '/operateapi/account/updateStatus' // 所有手动对账接口
const speedofprogress = '/operateapi/account/findSpeedOfProgress' // 进度条
const deleteredis = '/operateapi/account/deleteRedis' // 取消对账
const querybyserialnumber = '/operateapi/account/findKbaoAccountCheckingDtoBySerialNumber'  //通过账单流水号查询状态
const agreementinsertagreement = '/operateapi/agreement/insertKbaoHospitalAgreementEntity' //添加随访告知书内容
const agreementupdateagreement = '/operateapi/agreement/updateKbaoHospitalAgreementEntity' //修改随访告知书内容
const agreementquerybyid = '/operateapi/agreement/findKbaoHospitalAgreementEntityById' //查看随访告知书内容
const agreementlist = '/operateapi/agreement/findKbaoHospitalAgreementEntityPage' //查看随访告知书列表
const itemforminsertform = '/operateapi/item/form/insertKbafFdsItemsFormEntity' //添加随访表单
const itemformupdatetform = '/operateapi/item/form/updateKbafFdsItemsFormEntity' //修改随访表单
const itemformlist = '/operateapi/item/form/findKbafFdsItemsFormEntityPage' //查询医院随访表单列表
const formcontentinsertformcontent = '/operateapi/form/content/insertKbafFdsItemsFormContentEntity' //添加表单题目
const formcontentupdateformcontent = '/operateapi/form/content/updateKbafFdsItemsFormContentEntity' //修改表单题目
const formcontentquerybyid = '/operateapi/form/content/findKbafFdsItemsFormContentEntityById' //查询表单题目详情
const formcontentlist = '/operateapi/form/content/findKbafFdsItemsFormContentEntityPage' //查询表单题目列表

let production = {
    login,
    //字典
    dictionaryList,
    dictionaryInsert,
    dictionaryUpdate,

    fileAll,
    //机构管理
    management,
    managementInfo,
    managementAll,
    managementGzh,
    managementYlt,
    managementEdit,
    hospitalgetenummap,
    hospitalwxapplist,

    //动态新闻
    news,
    getProvince,
    getTitle,
    getReviewDoctorList,
    delReviewDoctor,
    reviewDoctorInfo,
    reviewDoctor,
    hospitalList,
    reviewDoctorUpdate,
    registerList,
    registerDoctorDetail,
    changeRegisterStatus,
    registerDoctorList,
    registerDoctorUpdate,
    registerDoctorInsert,
    registerselectdept,
    // 远程门诊医生排班
    doctorRomteclinicAdd,
    doctorRomteclinicEdit,
    doctorRomteclinicSearchExpert,
    doctorRomteclinicList,
    doctorRomteclinicDetail,
    // 版本管理
    versioninsert,
    versionlist,
    versiondetail,
    versionupdate,
    // 家医签约管理
    contractManagementList,

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
    getDeptListByHospitalId,
    //服务管理
    _server,
    getServer,
    setserver,
    servicepackagelistallpackage,
    servicepackagelistpackagebyhospital,
    servicepackageupdatepageagehospital,

    //预约科室
    kDepartment,
    getDepartment,
    departmentDetail,
    departmentChange,
    // 远程门诊
    searchRoomList,
    searchRoomSelectAdd,
    searchCurrentRoom,
    remotedoctorupdateremotestatus,
    doctorupdatedoctorsort,
    // 第三方厂家
    thirdparty,
    updatethirdparty,
    // 远程门诊类型
    DoctorRemoteClinicTypeList,
    DoctorRemoteClinicTypeAdd,
    DoctorRemoteClinicTypeSearch,
    DoctorRemoteClinicTypeEdit,
    // 医生排班列表修改
    DoctorListEdit,
    // 公众号
    wxList,
    wxBannerList,
    wxBannerAdd,
    wxBannerDetail,
    wxBannerEdit,
    // 公众号模板管理
    wxTemplateList,
    wxTemplateSave,
    // 公众号功能管理
    wxMangent,
    wxMangentSearch,
    // 公众号菜单管理
    wxMenuList,
    wxMenuListChange,
    systemManagement,
    systemManagementAdd,
    systemManagementEdit,
    // 星级列表
    starClassList,
    starClassAdd,
    starClassSearch,
    starClassChange,

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

    //健康宣教
    educationInsert,
    educationArticleList,
    educationDetailById,
    educationUpdate,
    educationUpdateFlag,
    //经典案例
    doctorclassicDelete,
    doctorclassicInsert,
    doctorclassicArticleList,
    doctorclassicDetailById,
    doctorclassicUpdate,
    doctorclassicUpdateFlag,
    //热门推荐
    recommendInsert,
    recommendArticleList,
    recommendDetailById,
    recommendUpdate,
    recommendUpdateFlag,
    mechanismregAdd,
    mechanismregSearch,
    mechanismregEdit,
    mechanismregUpLoad,

    //疾病症状
    getDiseaseList,
    changeDiseaseStatus,
    updateDiseaseInfo,
    insertDisease,
    selectDiseaseInfo,
    getSymptomList,
    changeSymptomStatus,
    updateSymptomInfo,
    insertSymptom,
    selectSymptomInfo,

    downloadTxt,

    //订单管理
    orderManageAppointRegistList,
    ordermanagementlistbyremoteorder,
    ordermanagementselectbyremoteclinicid,
    querybyorderid,
    cordreport,
    replacedoctor,
    closeappointment,
    hospitalidanddepartmentid,
    querydeptname,
    cordwriteexcel,

    //服务项目管理
    fdspackageitempage,
    fdspackageiteminsert,
    fdspackageitemselectbyid,
    fdspackageitemupdate,
    fdspackageiteminsertbatch,
    queryarticlelist,
    itemformiselection,
    //服务包管理
    servicepackageinsert,
    servicepackagepage,
    servicepackageselectbyid,
    organizationdownloadtemplate,
    //通过省份ID查询医院列表
    hospitalselectbyprovincecode,

    //运维端-系统管理
    operateauthlist,
    operateauthinsert,
    operateauthupdate,
    operateauthquerybyid,
    operatemenuinsert,
    operatemenupage,
    operatemenuquerybymenuid,
    operatemenuupdate,
    operatemenuprentlist,
    // 支付方式列表
    hospitalquerynamelist,
    // 所有支付类型和显示端
    paymentchannelmap,
    channelenummap,
    wxappnamelist,
    insertpaymentchannel,
    querylist,
    querybyid,
    updatepaymentchannel,

    // 运维端-账号管理
    adminList,
    adminAdd,
    adminEdit,
    adminDetail,
    adminManage,
    adminSearch,
    adminManageChange,
    //敏感词
    sensitiveSelectSensitive,
    sensitiveUpdate,
    //大文件分片上传
    lecturedemanduploadfile,
    lecturedemanduploadfilemd5,
    // 医师讲堂栏目
    lecturecolumnlist,
    lecturecolumninsert,
    lecturecolumnupdate,
    // 点播
    lecturedemandpage,
    lecturedemandinsert,
    lecturedemandselectbyid,
    lecturedemandupdate,
    lecturedemandpagebyexaminelist,
    lecturedemandupdateplaystatus,
    lecturedemandupdatechannelstatus,
    lecturedemandintolive,
    // 直播
    insertlive,
    updatelive,
    livestatus,
    livebyid,
    livelist,
    
    //院内编码
    doctorselectdoctorhisid,
    doctorupdatedoctorhisid,
    doctorselecthisdoctorlist,
    // 医疗小组
    teaminsert,
    teamupdate,
    teamquery,
    teamlist,

    insertdoctor,
    countlivedata,

    chargeinsert,
    chargepage,
    chargequerybyid,
    chargeupdate,
    feeunitenum,
    selectdoctorlist,
    querydoctormenulist,
    insertdoctorscheduling,
    updatedoctorscheduling,
    doctorschedulingquerybyid,
    doctorschedulingpage,
    doctoridandservicetype,
    querydoctorschedulinglist,
    // 接口管理
    apiserviceinsert,
    apiserviceupdate,
    apiservicequerybyid,
    apiservicepage,
    // 对账
    clinicandpaycostpage,
    clinicandpaycost,
    rechargethecardpage,
    rechargethecard,
    inhospitalpage,
    inhospital,
    updatestatus,
    speedofprogress,
    deleteredis,
    querybyserialnumber,
    agreementinsertagreement,
    agreementupdateagreement,
    agreementquerybyid,
    agreementlist,

    itemforminsertform,
    itemformupdatetform,
    itemformlist,
    formcontentinsertformcontent,
    formcontentupdateformcontent,
    formcontentquerybyid,
    formcontentlist,
}
import weixin from './weixinApi';
for(let key in weixin){
    production[key] = weixin[key]
}
export default production;