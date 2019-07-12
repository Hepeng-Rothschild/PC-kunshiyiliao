const login = "/operateapi/operate/login"; //登陆接口

//字典
const dictionaryList = "/operateapi/operate/diction/list";//字典列表
const dictionaryInsert = "/operateapi/operate/diction/insert";//添加字典
const dictionaryUpdate = "/operateapi/operate/diction/update";//修改字典

const news = '/operateapi/organizationpagenews'; //动态新闻列表分页
const fileAll = "/operateapi/hospitaloperateuploadfiles"; //上传接口 不加密
const getProvince = "/operateapi/authenticationqueryprovince"; //获取省级列表
const getTitle = "/operateapi/authenticationquerytitle"; //获取职称列表
const getReviewDoctorList = "/operateapi/authenticationdoctorpage"; //获取审核医生列表
const delReviewDoctor = "/operateapi/authenticationdelete"; //删除审核医生列表
const reviewDoctorInfo = "/operateapi/authenticationquerydoctor"; //审核医生列表详情
const reviewDoctor = "/operateapi/authenticationupdate"; //医生审核
const reviewDoctorUpdate = "/operateapi/authenticationupdatedoctorbyoperate"; //医生审核修改信息
const hospitalList = "/operateapi/authenticationqueryhospital"; //医生审核
const registerList = "/operateapi/registerpagedoctor"; //预约挂号列表
const registerDoctorDetail = "/operateapi/registerselectdoctorbyid"; //预约医生详情
const changeRegisterStatus = "/operateapi/registerupdatestatus"; //改变预约状态
const registerDoctorList = "/operateapi/registerselectdoctornotscheduling"; //预约挂号专家列表
const registerDoctorUpdate = "/operateapi/registerupdate"; //预约挂号修改
const registerDoctorInsert = "/operateapi/registerinsertdoctorappointment"; //预约挂号添加
const registerselectdept = '/operateapi/registerselectdeptnotscheduling' // 预约挂号科室列表
// 医生端远程门诊
const doctorRomteclinicAdd = '/operateapi/remotedoctorinsert'  //新增远程门诊医生排班
const doctorRomteclinicEdit = '/operateapi/remotedoctorupdate' //编辑远程门诊医生排班详情
const doctorRomteclinicSearchExpert = '/operateapi/remotedoctorselectremotedoctorlist'  //专家查找
const doctorRomteclinicList = '/operateapi/remotedoctorpageremotedoctor' //远程门诊医生列表
const doctorRomteclinicDetail = '/operateapi/remotedoctorselectoutpatientdoctorscheduling' //查询远程门诊医生详情

const versioninsert = '/operateapi/versioninsert'   //医生端版本管理添加
const versionlist = '/operateapi/versionlist' //医生端版本管理列表
const versiondetail = '/operateapi/versionqueryversion' //医生端版本管理详情
const versionupdate = '/operateapi/versionupdate' //医生端版本管理修改
// 家医签约管理
const contractManagementList = '/operateapi/ordermanagementsigningmanagepage'   //家医签约管理列表

// 机构管理
const management = '/operateapi/hospitalqueryhospitaloperatelist'  //机构管理医院列表
const managementInfo = '/operateapi/hospitalqueryhospitaloperatedtobyid'   //医院详细信息
const managementAll = '/operateapi/hospitalqueryhospitallevellist' //医院等级列表
const managementGzh = '/operateapi/hospitalquerywxappnamelist'   //查询医院公众号
const managementYlt = '/operateapi/hospitalqueryhospitalnamelist' //查询医院医联体
const managementEdit = '/operateapi/hospitalupdatehospitaloperatedtobyid' //保存医院详情
const hospitalgetenummap = '/operateapi/hospitalgetenummap'  //查询第三方服务
const hospitalwxapplist = '/operateapi/hospitalhospitalwxapplist' //查询医院关联的公众号

//动态新闻
const getNews = '/operateapi/organizationselectnew' //获取动态新闻详情信息
const setNews = '/operateapi/organizationinsertnew'  //设置动态新闻列表

//新闻列表
const addNews = '/operateapi/organizationupdatenew'; //修改新闻详情
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
const medicinelistsearch = '/operateapi/organizationquerydepbyid' //院内科室详情查询
const medicineedit = '/operateapi/organizationupdateappointmentdept'//院内科室编辑
const medicineSearchList = '/operateapi/operate/diction/department'  //查询所有科室信息
const medicineSelectedList = '/operateapi/hospitaldetail'  // 选中科室的列表
const medicineExpertList = '/operateapi/organizationquerydeptindoctor'  //院内科室专家列表
const medicineSave = '/operateapi/organizationupdatesavehospitaldept' // 院内科室保存
const getDeptListByHospitalId = '/operateapi/authenticationquerydeptbyhospitalid' // 根据医院查询对应科室列表

//服务管理
const _server = '/operateapi/hospitalmenuqueryhospitalmenulistbyid'  //服务管理列表
const getServer = '/operateapi/hospitalmenuqueryhospitalmenulist' //服务管理-编辑
const setserver = '/operateapi/hospitalmenuupdatehospitalmenu'     // 编辑服务保存

//预约科室接口
const kDepartment = '/operateapi/organizationpageappointmentdept' //预约科室列表
const getDepartment = '/operateapi/organizationselectdeptlist'  //查看科室列表
const departmentDetail = '/operateapi/organizationquerydepbyid' //查看科室详情
const departmentChange = '/operateapi/organizationupdateappointmentdept' //修改预约科室详情

// 远程门诊
const searchRoomList = '/operateapi/hospitalselectbyprovincecode'  //根据省份和医院名模糊查询
const searchRoomSelectAdd = '/operateapi/applyremotinsert'   // 关联远程门诊医院
const searchCurrentRoom = '/operateapi/applyremotqueryremotelist'  //查询当前医院下关联的远程门诊医院

// 远程门诊类型维护 
const DoctorRemoteClinicTypeList = '/operateapi/outpatientquerylist'    //查询当前医院下远程门诊类型
const DoctorRemoteClinicTypeAdd = '/operateapi/outpatientinsert'   //新增远程门诊类型
const DoctorRemoteClinicTypeSearch = '/operateapi/outpatientquerybyid'  //查找远程门诊详情
const DoctorRemoteClinicTypeEdit = '/operateapi/outpatientupdate'   //修改远程门诊类型
const remotedoctorupdateremotestatus = '/operateapi/remotedoctorupdateremotestatus'   //修改医生是否开启远程门诊
const doctorupdatedoctorsort = '/operateapi/doctorupdatedoctorsort'   //修改医生排序
// 第三方厂家服务
const thirdparty = '/operateapi/hospitalthirdpartyselecthospitalthirdparty' //查询第三方厂家
const updatethirdparty = '/operateapi/hospitalthirdpartyupdatehospitalthirdparty'//修改第三方厂家

const DoctorListEdit = '/operateapi/remotedoctorupdateremotestatus' // 医生排班列表修改 

//运维端!!!
const residentReg = '/operateapi/residentqueryuserlist'//获取居民注册信息
const uploadXls = '/operateapi/organizationinsertbatchdoctor' //批量上传医生信息  不加密
const getDoctorInfo = '/operateapi/residentpagedoctor'  //获取医生注册信息
const getCity = '/operateapi/sysprovinceprovincecitylist' //获取省级区域列表
const getCounty = '/operateapi/sysprovincequeryAreaList' //根据市级查询县列表

// 机构注册信息
const mechanismregList = '/operateapi/organizationqueryhospitallist' //机构注册信息列表查询
const mechanismregEnable = '/operateapi/hospitalupdateenablebyid' //机构注册信息启用禁用
const mechanismregAdd = '/operateapi/hospitalinsert' // 新增机构
const mechanismregSearch = '/operateapi/hospitalqueryhospitaloperatedtobyid'  //根据医院ID查询医院详情
const mechanismregEdit = '/operateapi/hospitalupdate' //修改医院详情
const mechanismregUpLoad = '/operateapi/organizationinsertbatchhospital' //批量上传机构信息  不加密

/* ********************************************* */
const doctorList = '/operateapi/doctorselectdoctorlist' //医生列表
const doctorServerManage = '/operateapi/organizationquerymenulist' //医生所有服务管理列表
const doctorServerManageById = '/operateapi/doctormenuselectmenuidsbydoctorid' //查询某个医生的服务管理列表
const doctorServerManageUpdate = '/operateapi/doctormenuinsertorupdatemenu' //修改某个医生的服务管理

//内容管理
//1.健康宣教
const educationInsert = '/operateapi/educationinsert'; //新增健康宣教
const educationArticleList = '/operateapi/educationqueryarticlelist'; //健康宣教list
const educationDetailById = '/operateapi/educationselectbyid';//根据ID查询健康宣教详情
const educationUpdate = '/operateapi/educationupdate';//更新健康宣教信息
const educationUpdateFlag = '/operateapi/educationupdateenable';//更改健康宣教状态
//2.经典案例
const doctorclassicDelete = '/operateapi/doctorclassiccasedelete'; //删除经典案例
const doctorclassicInsert = '/operateapi/doctorclassiccaseinsert'; //新增经典案例
const doctorclassicArticleList = '/operateapi/doctorclassiccasepage'; //经典案例list
const doctorclassicDetailById = '/operateapi/doctorclassiccasequerybyid';//根据ID查询经典案例详情
const doctorclassicUpdate = '/operateapi/doctorclassiccaseupdate';//更新经典案例信息
const doctorclassicUpdateFlag = '/operateapi/doctorclassiccaseenableddisable';//更改经典案例状态
//3.热门推荐
const recommendInsert = '/operateapi/recommendarticleinsert'; //新增热门推荐
const recommendArticleList = '/operateapi/recommendarticlepagerecommend'; //热门推荐list
const recommendDetailById = '/operateapi/recommendarticleselectbyprimarykey';//根据ID查询热门推荐详情
const recommendUpdate = '/operateapi/recommendarticleupdate';//更新热门推荐信息
const recommendUpdateFlag = '/operateapi/recommendarticleupdateenable';//更改热门推荐状态
//疾病/症状管理
const getDiseaseList = '/operateapi/diseasepage';//查询疾病列表
const changeDiseaseStatus = '/operateapi/diseasedelete';//更改疾病状态
const updateDiseaseInfo = '/operateapi/diseaseupdate';//更改疾病信息
const insertDisease = '/operateapi/diseaseinsert';//添加疾病信息
const selectDiseaseInfo = '/operateapi/diseaseselect';//查询疾病信息

const getSymptomList = '/operateapi//symptompage';//查询症状列表
const changeSymptomStatus = '/operateapi/symptomdelete';//更改症状状态
const updateSymptomInfo = '/operateapi/symptomupdate';//更改症状信息
const insertSymptom = '/operateapi/symptominsert';//添加症状信息
const selectSymptomInfo = '/operateapi/symptomselect';//查询症状信息

const downloadTxt = '/operateapi/organizationdownloadtemplate';  //批量上传信息模板下载  不加密

//订单管理
const orderManageAppointRegistList = '/operateapi/ordermanagementselectordermanagement';  //预约挂号订单管理
const ordermanagementlistbyremoteorder = '/operateapi/ordermanagementlistbyremoteorder';  //远程问诊订单管理
const ordermanagementselectbyremoteclinicid = '/operateapi/ordermanagementselectbyremoteclinicid';  //远程问诊订单详情
const querybyorderid = '/operateapi/appointmentrecordquerybyorderid'  //预约挂号详情
const cordreport  = '/operateapi/appointmentrecordreport' //预约挂号报到
const replacedoctor = '/operateapi/appointmentrecordreplacedoctor' //预约挂号替诊
const closeappointment = '/operateapi/appointmentrecordcloseappointment' //预约挂号停诊
const hospitalidanddepartmentid = '/operateapi/appointmentrecordquerydoctorbyhospitalidanddepartmentid'  //预约挂号通过科室查询医生
const querydeptname = '/operateapi/appointmentrecordquerydeptname' //查询所有的科室
const cordwriteexcel= '/operateapi/appointmentrecordwriteexcel'  //导出数据


//服务项目管理
const fdspackageitempage = '/operateapi/fdspackageitempage';  //服务项目列表
const fdspackageiteminsert = '/operateapi/fdspackageiteminsert';  //新增服务项目
const fdspackageitemselectbyid = '/operateapi/fdspackageitemselectbyid';  //服务项目详情
const fdspackageitemupdate = '/operateapi/fdspackageitemupdate';  //修改服务项目
const fdspackageiteminsertbatch = '/operateapi/fdspackageiteminsertbatch';  //服务项目导入
const queryarticlelist = '/operateapi/educationqueryarticlelist' //服务项目关联内容
const itemformiselection = '/operateapi/itemformiselection' //服务项关联表单

//服务包管理
const servicepackageinsert = '/operateapi/servicepackageinsert';  //新增/修改服务包
const servicepackagepage = '/operateapi/servicepackagepage';  //服务包列表
const servicepackageselectbyid = '/operateapi/servicepackageselectbyid';  //服务包详情
const organizationdownloadtemplate = '/operateapi/organizationdownloadtemplate';  //服务包详情

const servicepackagelistallpackage = '/operateapi/servicepackagelistallpackage';  //查询当前医院所在省份的所有服务包
const servicepackagelistpackagebyhospital = '/operateapi/servicepackagelistpackagebyhospital';  //查询医院的所有服务包
const servicepackageupdatepageagehospital = '/operateapi/servicepackageupdatepageagehospital';  //修改医院服务包

//通过省份ID查询医院列表
const hospitalselectbyprovincecode = '/operateapi/hospitalselectbyprovincecode';  //通过省份ID查询医院列表

const wxList = '/operateapi/wxappbannerwxapplist'  //公众号列表
const wxBannerList = '/operateapi/wxappbannerlist'  //公众号banner图列表
const wxBannerAdd = '/operateapi/wxappbannerinsert'  //公众号Banner图添加
const wxBannerDetail = '/operateapi/wxappbannerselectbyid' //公众号Banner图详情
const wxBannerEdit = '/operateapi/wxappbannerupdate' //公众号Banner图修改
const wxTemplateList = '/operateapi/wxapptemplatelisttemplate'// 公众号模板管理列表 
const wxTemplateSave = '/operateapi/wxapptemplateupdatetemplate' //公众号模板管理保存

const wxMenuList = '/operateapi/wxappmenuquerymenulist' // 公众号菜单管理列表
const wxMenuListChange = '/operateapi/wxappmenuupdatebatchorinsertbatch' //公众号菜单管理列表修改


const wxMangent = '/operateapi/wxappmanageupdatestatus'  //公众号功能管理
const wxMangentSearch = '/operateapi/wxappmanageselectbyappid' //公众号功能管理查询





// 系统管理//公众号菜单管理
const systemManagement = '/operateapi/wxappmenuselectmenulist' //系统管理菜单列表
const systemManagementAdd = '/operateapi/wxappmenuinsert' //添加系统管理菜单
const systemManagementEdit = '/operateapi/wxappmenuupdate' //修改系统管理菜单

const starClassList = '/operateapi/evaluationpage' //获取星级列表
const starClassAdd = '/operateapi/evaluationinsert' //添加星级列表
const starClassSearch = '/operateapi/evaluationselectbyid' //查询星级列表详情
const starClassChange = '/operateapi/evaluationupdate' //修改医生详情

//运维-系统管理
const operateauthlist = '/operateapi/operateauthlist' //权限路径列表
const operateauthinsert = '/operateapi/operateauthinsert' //权限路径新增
const operateauthupdate = '/operateapi/operateauthupdate' //权限路径编辑
const operateauthquerybyid = '/operateapi/operateauthquerybyid' //权限路径根据iD查询详情

const operatemenuinsert = '/operateapi/operatemenuinsert' //菜单管理新增
const operatemenupage = '/operateapi/operatemenupage' //菜单管理列表
const operatemenuquerybymenuid = '/operateapi/operatemenuquerybymenuid' //菜单详情
const operatemenuupdate = '/operateapi/operatemenuupdate' //菜单修改
const operatemenuprentlist = '/operateapi/operatemenuprentlist' //上级菜单列表

const adminList = '/operateapi/operateuserfindoperteuserbypage'  //账号管理分页列表
const adminAdd = '/operateapi/operateuserinsert' //账号管理新增用户
const adminEdit = '/operateapi/operateuserfindbyid' //账号管理编辑用户
const adminDetail = '/operateapi/operateuserupdate' //账号管理修改用户
const adminManage = '/operateapi/operateuserinsertusermenu' //账号管理用户权限
const adminSearch = '/operateapi/operateuserfindmenubyuserid'//查询用户权限管理详情
const adminManageChange = '/operateapi/operateuserupdateusermenu' //修改用户权限管理
//敏感词
const sensitiveSelectSensitive='/operateapi/sensitive/selectSensitive' //查询
const sensitiveUpdate='/operateapi/sensitive/update' //修改
// 支付方式
const paymentchannelmap = '/operateapi/channeldisbursementqueryhospitalpaymentchannelmap' // 查询所有支付类型和显示端
const channelenummap = '/operateapi/channeldisbursementgetpaymentchannelenummap' //根据支付类型查询支付渠道
const wxappnamelist = '/operateapi/hospitalquerywxappnamelist' //查询支付账号
const insertpaymentchannel = '/operateapi/channeldisbursementinserthospitalpaymentchannel'  //添加支付方式
const querylist = '/operateapi/channeldisbursementquerylist' //通过医院查询医院支付方式列表
const querybyid = '/operateapi/channeldisbursementquerybyid' //查询医院支付方式
const updatepaymentchannel = '/operateapi/channeldisbursementupdatehospitalpaymentchannel'//修改医院支付方式

//大文件分片上传接口
const lecturedemanduploadfilemd5='/operateapi/lecturedemanduploadfilemd5' //大文件分片上传断点续传
const lecturedemanduploadfile='/operateapi/lecturedemanduploadfile' //大文件分片上传接口

const lecturecolumnlist = '/operateapi/lecturecolumnlist' //直播/栏目列表
const lecturecolumninsert = '/operateapi/lecturecolumninsert' // 添加栏目
const lecturecolumnupdate = '/operateapi/lecturecolumnupdate' //修改栏目详情
// 点播
const lecturedemandpage = '/operateapi/lecturedemandpage' //讲堂点播列表
const lecturedemandinsert = '/operateapi/lecturedemandinsert' //添加讲堂点播
const lecturedemandselectbyid = '/operateapi/lecturedemandselectbyid' //查询讲堂点播详情
const lecturedemandupdate = '/operateapi/lecturedemandupdate' //修改点播详情
const lecturedemandpagebyexaminelist = '/operateapi/lecturedemandpagebyexaminelist' //讲堂审核列表
const lecturedemandupdateplaystatus = '/operateapi/lecturedemandupdateplaystatus' //修改讲堂审核状态
const lecturedemandupdatechannelstatus = '/operateapi/lecturedemandupdatechannelstatus' // 关闭直播
const lecturedemandintolive = '/operateapi/lecturedemandintolive' //进入直播间

const insertlive = '/operateapi/lecturedemandinsertlive'  //添加直播
const updatelive = '/operateapi/lecturedemandupdatelive' //修改直播
const livestatus = '/operateapi/lecturedemandupdatelivestatus' //修改直播状态
const livebyid = '/operateapi/lecturedemandquerylivebyid' //查询直播
const livelist = '/operateapi/lecturedemandquerylivelist' //查询直播列表

//院内编码
const doctorselectdoctorhisid = '/operateapi/doctorselectdoctorhisid'; //查询医生关联信息hisId
const doctorupdatedoctorhisid = '/operateapi/doctorupdatedoctorhisid'; //修改医生关联信息hisId
const doctorselecthisdoctorlist = '/operateapi/doctorselecthisdoctorlist'; //模糊查询医生关联信息hisId列表

const hospitalquerynamelist = '/operateapi/hospitalquerynamelist' //查询支付渠道医院列表

const teaminsert = '/operateapi/teaminsertfdsteam'  //医疗小组添加
const teamupdate = '/operateapi/teamupdatefdsteam' //医疗小组编辑
const teamquery = '/operateapi/teamqueryteam'  //医疗小组查询
const teamlist = '/operateapi/teamqueryteamlist'  //医疗小组列表

const insertdoctor = '/operateapi/authenticationinsertdoctor' //添加医生
const countlivedata = '/operateapi/lecturedemandcountlivedata' //加载直播数据

const chargeinsert = '/operateapi/itemchargeinsert'  // 添加互联网收费标准
const chargepage = '/operateapi/itemchargepage' // 互联网收费标准列表
const chargequerybyid = '/operateapi/itemchargequerybyid' // 互联网收费标准详情
const chargeupdate = '/operateapi/itemchargeupdate' // 修改互联网收费标准
const feeunitenum = '/operateapi/itemchargequeryitemfeeunitenum' //查询互联网收费标准收费单位

const selectdoctorlist = '/operateapi/doctorschedulingselectdoctorlist' //查询门诊医生未排班列表
const querydoctormenulist = '/operateapi/doctorschedulingquerydoctormenulist' //查询医生开通的服务列表并查询费用
const insertdoctorscheduling = '/operateapi/doctorschedulinginsertdoctorscheduling' //新增医生排班
const updatedoctorscheduling = '/operateapi/doctorschedulingupdatedoctorscheduling' //修改医生排班
const doctorschedulingquerybyid = '/operateapi/doctorschedulingquerybyid' //查询医生排班详情
const doctorschedulingpage = '/operateapi/doctorschedulingpage' // 查询医生排班列表
const doctoridandservicetype = '/operateapi/doctorschedulingquerybydoctoridandservicetype'  //查询医生具体排班时间段与列表
const querydoctorschedulinglist = '/operateapi/doctorschedulingquerydoctorschedulinglist' //查询医生开通服务

const apiserviceinsert = '/operateapi/apiserviceinsert' //添加接口管理
const apiserviceupdate = '/operateapi/apiserviceupdate' // 修改接口管理 
const apiservicequerybyid = '/operateapi/apiservicequerybyid' // 查询接口详情
const apiservicepage = '/operateapi/apiservicepage' // 查询接口管理列表
const clinicandpaycostpage = '/operateapi/accountclinicandpaycostpage' // 查询诊间缴费账单列表
const clinicandpaycost = '/operateapi/accountclinicandpaycost' // 诊间缴费对账
const rechargethecardpage = '/operateapi/accountrechargethecardpage' // 查询就诊卡充值账单列表
const rechargethecard = '/operateapi/accountrechargethecard' // 就诊卡充值对账
const inhospitalpage = '/operateapi/accountinhospitalpage' // 查询住院押金缴费账单列表
const inhospital = '/operateapi/accountinhospital' // 住院押金缴费对账
const updatestatus = '/operateapi/accountupdatestatus' // 所有手动对账接口
const speedofprogress = '/operateapi/accountspeedofprogress' // 进度条
const deleteredis = '/operateapi/accountdeleteredis' // 取消对账
const querybyserialnumber = '/operateapi/accountquerybyserialnumber'  //通过账单流水号查询状态


const agreementinsertagreement = '/operateapi/agreementinsertagreement' //添加随访告知书内容
const agreementupdateagreement = '/operateapi/agreementupdateagreement' //修改随访告知书内容
const agreementquerybyid = '/operateapi/agreementquerybyid' //查看随访告知书内容
const agreementlist = '/operateapi/agreementlist' //查看随访告知书列表

const itemforminsertform = '/operateapi/itemforminsertform' //添加随访表单
const itemformupdatetform = '/operateapi/itemformupdatetform' //修改随访表单
const itemformlist = '/operateapi/itemformlist' //查询医院随访表单列表

const formcontentinsertformcontent = '/operateapi/formcontentinsertformcontent' //添加表单题目
const formcontentupdateformcontent = '/operateapi/formcontentupdateformcontent' //修改表单题目
const formcontentquerybyid = '/operateapi/formcontentquerybyid' //查询表单题目详情
const formcontentlist = '/operateapi/formcontentlist' //查询表单题目列表

let testApi = {
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
    testApi[key] = weixin[key]
}

export default testApi;