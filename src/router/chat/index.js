
// 所有群聊列表
const teamList = {
    path: '/index/chatList',
    name: 'chatList',
    component(resolve) {
        require(['@/pages/chat/teamList'], resolve)
    }
};
const teamChat = {
    path: '/index/teamChat',
    name: 'teamChat',
    component(resolve) {
        require(['@/pages/chat/teamChat'], resolve)
    }
};
const teamHistory = {
    path: '/index/teamHistory',
    name: 'teamHistory',
    component(resolve) {
        require(['@/pages/chat/teamHistory'], resolve)
    }
};
export default {
    teamList,
    teamChat,
    teamHistory
}