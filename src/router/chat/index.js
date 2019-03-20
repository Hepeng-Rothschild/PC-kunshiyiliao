
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
export default {
    teamList,
    teamChat
}