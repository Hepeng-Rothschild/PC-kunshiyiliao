import addressConfig from '@/configs/address.js';
/* 内存数据状态 */
export default {
  env:"test", // dev/test/production
  version:"2.0",
  // 国际化默认中文 （cookie里面取，然后存到store里面）
  locale: 'zh-CN',

  topMenuList: new Array(),
  leftMenuList: new Array(),
  //所有省市区
  address: addressConfig.address,
  iv: '54bef10750df41d5ac9f2d0a4fe100bf',
  salt: '7c70035d4e7f4a1ba5a0eb737c7cf2d9',
  accessToken: null,
  identityList:[
    { id: 1, name: "超级管理员" },
    { id: 2, name: "省级管理员" },
    { id: 3, name: "市级管理员" },
    { id: 4, name: "区级管理员" },
    { id: 5, name: "机构管理员" }
  ],

  /* ----------------------------------网易云信 ↓--------------------------------------- */

  // 正在加载中
  isLoading: true,
  // 操作是否是刷新页面，刷新初始没有nim实例，会导致时序问题
  isRefresh: true,
  // 全屏显示的原图
  isFullscreenImgShow: false,
  fullscreenImgSrc: '',
  // 切页动画 forward，backward
  transitionName: 'forward',

  // IM相关
  // NIM SDK 实例
  nim: null,
  // 登录账户ID
  userUID: null,
  // 用户名片
  myInfo: {},
  // 好友/黑名单/陌生人名片, 数据结构如：{cid: {attr: ...}, ...}
  userInfos: {},
  // 用户订阅的事件同步, 数据结构如：{cid: {typeid: {...}, ...}, ...}
  userSubscribes: {},

  // 好友列表
  friendslist: [],
  // 机器人列表
  robotslist: [],
  // 用于判定帐号是否是robots
  robotInfos: {},
  robotInfosByNick: {},
  // 黑名单列表
  blacklist: [],
  // 禁言列表
  // mutelist: [],

  teamlist: [],
  // 群自身的属性，数据结构如：{tid: {attr: ...}, ...}
  // teamAttrs: {},
  // 群对象的成员列表，数据结构如：{tid: {members: [...], ...}, ...}
  teamMembers: {},
  // 关闭群提醒的群id列表
  muteTeamIds: [],
  // 群设置传递数据
  teamSettingConfig: {},
  
  // 已发送群消息回执Map,key为群Id
  sentReceipedMap: {},
  // 当前群消息回执查询的群id
  currReceiptQueryTeamId: null,
  // 群消息回执查询的消息列表
  receiptQueryList: [],
  // 群消息回执查询结果列表
  teamMsgReads: [], 
  // 群消息已读未读账号列表
  teamMsgReadsDetail: {
    readAccounts: [],
    unreadAccounts: []
  },
  
  // 消息列表
  msgs: {}, // 以sessionId作为key
  msgsMap: {}, // 以idClient作为key，诸如消息撤回等的消息查找
  // 会话列表
  sessionlist: [],
  sessionMap: {},
  // 当前会话ID（即当前聊天列表，只有单聊群聊采用，可用于判别）
  currSessionId: null,
  currSessionMsgs: [],
  // 是否有更多历史消息，用于上拉加载更多
  noMoreHistoryMsgs: false,
  // 继续对话的机器人id
  continueRobotAccid: '',

  // 系统消息
  sysMsgs: [],
  customSysMsgs: [],
  sysMsgUnread: {
    total: 0
  },
  customSysMsgUnread: 0,

  // 临时变量
  // 缓存需要获取的用户信息账号,如searchUser
  searchedUsers: [],
  // 缓存需要获取的群组账号
  searchedTeams: [],

  // 聊天室相关
  // 聊天室sdk实例
  chatroomInsts: {},
  chatroomInfos: {},
  // 聊天室分房间消息集合
  chatroomMsgs: {},
  // 当前聊天室实例及id
  currChatroom: null,
  currChatroomId: null,
  currChatroomMsgs: [],
  currChatroomInfo: {},
  // 聊天室成员列表
  currChatroomMembers: [],

}
