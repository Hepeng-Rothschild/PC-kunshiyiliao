//索引管理
import indexInfomation from './IndexInformation'
// 配置仓
import configurationWarehouse from './configurationWarehouse'
// 运维端系统管理
import systemMangmentRouter from './systemManagement'

let maintainPath = {...indexInfomation, ...configurationWarehouse, ...systemMangmentRouter, }

export default maintainPath