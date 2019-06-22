// 订单管理
import orderManagement from './orderManagement'
// 医生端运营
import doctorOperation from './doctorOperation'
// 患者端运营
import oatientOperation from './oatientOperation'
// 机构运营
import InstitutionalOperation from './InstitutionalOperation'
// 服务包管理
import servicePackage from './servicePackage'
// 公众号管理
import publicManagement from './publicManagement'
// 系统管理
import systemManagement from './systemManagement'
// 互联网医院
import InternetHospital from './internetHospital'

let operationPath = {...orderManagement, ...doctorOperation, ...oatientOperation, ...InstitutionalOperation, ...servicePackage, ...publicManagement, ...systemManagement, ...InternetHospital}

export default operationPath

// export default {
// 	//订单管理
// 	ordersManagement: orderManagement.ordersManagement,
// 	reservationOrders: orderManagement.reservationOrders,
// 	contractManagement: orderManagement.contractManagement,
// 	remoteClinicOrders: orderManagement.remoteClinicOrders,
// 	remoteClinicOrdersDetail: orderManagement.remoteClinicOrdersDetail,


// 	//医生端运营
// 	doctorManagement: doctorOperation.doctorManagement,
// 	reviewList: doctorOperation.reviewList,
// 	reviewEdit: doctorOperation.reviewEdit,
// 	reviewreview: doctorOperation.reviewreview,
// 	uploaddemo: doctorOperation.uploaddemo,
// 	doctorGroup: doctorOperation.doctorGroup,
// 	doctorAdd: doctorOperation.doctorAdd,
// 	doctorReview: doctorOperation.doctorReview,
// 	doctorEdit: doctorOperation.doctorEdit,
// 	doctorServerManageList: doctorOperation.doctorServerManageList,
// 	doctorServerManageEdit: doctorOperation.doctorServerManageEdit,
// 	versionManagementList: doctorOperation.versionManagementList,
// 	versionManagementAdd: doctorOperation.versionManagementAdd,
// 	versionManagementEdit: doctorOperation.versionManagementEdit,
// 	doctorContentCheckList: doctorOperation.doctorContentCheckList,
// 	doctorContentCheckListHelAdd: doctorOperation.doctorContentCheckListHelAdd,
// 	doctorContentCheckListHelEdit: doctorOperation.doctorContentCheckListHelEdit,
// 	doctorContentCheckListClsAdd: doctorOperation.doctorContentCheckListClsAdd,
// 	doctorContentCheckListClsEdit: doctorOperation.doctorContentCheckListClsEdit,
// 	doctorContentCheckListHotAdd: doctorOperation.doctorContentCheckListHotAdd,
// 	doctorContentCheckListHotEdit: doctorOperation.doctorContentCheckListHotEdit,
// 	DoctorRemoteclinicList: doctorOperation.DoctorRemoteclinicList,
// 	DoctorRemoteclinicEdit: doctorOperation.DoctorRemoteclinicEdit,
// 	DoctorRemoteclinicAdd: doctorOperation.DoctorRemoteclinicAdd,
// 	interSchedulingEdit: doctorOperation.interSchedulingEdit,
// 	interSchedulingAdd: doctorOperation.interSchedulingAdd,
// 	interScheduling: doctorOperation.interScheduling,


// 	//患者端运营
// 	patientOperation: oatientOperation.patientOperation,
// 	contentmanagementHome: oatientOperation.contentmanagementHome,
// 	contentmanagementAdd: oatientOperation.contentmanagementAdd,
// 	createNews: oatientOperation.createNews,
// 	createdNews: oatientOperation.createdNews,
// 	c6: oatientOperation.c6,
// 	addClassify: oatientOperation.addClassify,
// 	newClassify: oatientOperation.newClassify,
// 	liveMantList: oatientOperation.liveMantList,
// 	liveMantAdd: oatientOperation.liveMantAdd,
// 	liveMantEdit: oatientOperation.liveMantEdit,
// 	broadAdd: oatientOperation.broadAdd,
// 	broadEdit: oatientOperation.broadEdit,
// 	broadReview: oatientOperation.broadReview,
// 	physicianAudit: oatientOperation.physicianAudit,
// 	physicianAuditSee: oatientOperation.physicianAuditSee,
// 	physicianReview: oatientOperation.physicianReview,
// 	registerList: oatientOperation.registerList,
// 	registerNormalEdit: oatientOperation.registerNormalEdit,
// 	registerSegmentationEdit: oatientOperation.registerSegmentationEdit,
// 	registerNormalDetail: oatientOperation.registerNormalDetail,
// 	registerSegmentationDetail: oatientOperation.registerSegmentationDetail,
// 	patientManagement: oatientOperation.patientManagement,


// 	//机构运营
// 	mechanismOperation: InstitutionalOperation.mechanismOperation,
// 	operationHome: InstitutionalOperation.operationHome,
// 	homeInfo: InstitutionalOperation.homeInfo,
// 	operationNews: InstitutionalOperation.operationNews,
// 	newsEdit: InstitutionalOperation.newsEdit,
// 	d_createdNews: InstitutionalOperation.d_createdNews,
// 	iBanner: InstitutionalOperation.iBanner,
// 	bannerAdd: InstitutionalOperation.bannerAdd,
// 	addBanner: InstitutionalOperation.addBanner,
// 	iKeshi: InstitutionalOperation.iKeshi,
// 	medicineAdd: InstitutionalOperation.medicineAdd,
// 	medicineEdit: InstitutionalOperation.medicineEdit,
// 	tKeshi: InstitutionalOperation.tKeshi,
// 	departmentsList: InstitutionalOperation.departmentsList,
// 	kDepartment: InstitutionalOperation.kDepartment,
// 	bookingofficeEdit: InstitutionalOperation.bookingofficeEdit,
// 	operationExpert: InstitutionalOperation.operationExpert,
// 	expertAdd: InstitutionalOperation.expertAdd,
// 	expert_edit: InstitutionalOperation.expert_edit,
// 	serviceManagement: InstitutionalOperation.serviceManagement,
// 	managementAdd: InstitutionalOperation.managementAdd,
// 	servicePackageList: InstitutionalOperation.servicePackageList,
// 	servicePackagePAdd: InstitutionalOperation.servicePackagePAdd,
// 	servicePackageEdit: InstitutionalOperation.servicePackageEdit,
// 	remoteClinic: InstitutionalOperation.remoteClinic,
// 	remoteClinicEdit: InstitutionalOperation.remoteClinicEdit,
// 	remoteClinicRoom: InstitutionalOperation.remoteClinicRoom,
// 	doctorremoteClinicTypeList: InstitutionalOperation.doctorremoteClinicTypeList,
// 	thirdParty: InstitutionalOperation.thirdParty,
// 	doctorList: InstitutionalOperation.doctorList,
// 	feeStandard:InstitutionalOperation.feeStandard,


// 	//服务包管理
// 	servicePackageItemList: servicePackage.servicePackageItemList,
// 	servicePackageItemAdd: servicePackage.servicePackageItemAdd,
// 	servicePackageItemEdit: servicePackage.servicePackageItemEdit,
// 	servicePackageItemImportOne: servicePackage.servicePackageItemImportOne,
// 	servicePackageItemImportTwo: servicePackage.servicePackageItemImportTwo,
// 	servicePackageItemImportThree: servicePackage.servicePackageItemImportThree,
// 	servicePackagePindex: servicePackage.servicePackagePindex,
// 	servicePackagePList: servicePackage.servicePackagePList,
// 	servicePackagePEdit: servicePackage.servicePackagePEdit,
// 	servicePackagePDetail: servicePackage.servicePackagePDetail,
	
	

// 	// 公众号管理
// 	publicHostingIndex: publicManagement.publicHostingIndex,
// 	publicAddressList: publicManagement.publicAddressList,
// 	wxBannerList: publicManagement.wxBannerList,
// 	wxBannerAdd: publicManagement.wxBannerAdd,
// 	wxBannerEdit: publicManagement.wxBannerEdit,
// 	templateHome: publicManagement.templateHome,
// 	typeManagement: publicManagement.typeManagement,
// 	wxopeningmanagement: publicManagement.wxopeningmanagement,
// 	fileManagementList: publicManagement.fileManagementList,
	


// 	// 系统管理
// 	wxSystemManagement: systemManagement.wxSystemManagement,
// 	wxSystemManagementAdd: systemManagement.wxSystemManagementAdd,
// 	wxSystemManagementEdit: systemManagement.wxSystemManagementEdit,
// 	wxSystemManagementAddFn: systemManagement.wxSystemManagementAddFn,


// 	// 互联网医院
//     CardRecharge: InternetHospital.CardRecharge,
//     renewalDeposit: InternetHospital.renewalDeposit,
//     clinicPayment: InternetHospital.clinicPayment,

// }