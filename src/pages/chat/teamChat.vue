<template>
    <div class="chatteam">
        <Row>
            <Col>
                <h1>{{sessionName}}</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button type="primary" @click="toHistory">历史</Button>
                <Button type="primary" @click="toManager">管理</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <chatList
                    type="session"
                    :msglist="msglist"
                    :userInfos="userInfos"
                    :myInfo="myInfo"
                    @msgs-loaded="msgsLoaded"
                ></chatList>
            </Col>
        </Row>
        <Row>
            <Col>
                <chatEditor :scene="scene" :to="to"></chatEditor>
            </Col>
        </Row>
    </div>
</template>
<script>
import chatEditor from "@/components/chatEditor";
import chatList from "@/components/chatList";
import util from "@/utils";
export default {
    data() {
        return {

        };
    },
    components: {
        chatEditor,
        chatList
    },
    mounted() {
        // 此时设置当前会话
        this.$store.dispatch("setCurrSession", this.sessionId);

        // 获取群成员

        var teamMembers = this.$store.state.teamMembers[this.to];
        if (
            teamMembers === undefined ||
            teamMembers.length < this.teamInfo.memberNum
        ) {
            this.$store.dispatch("getTeamMembers", this.to);
        }
    },
    computed: {
        sessionId() {
            let sessionId = 'team-'+this.$route.query.sessionId;
            return sessionId;
        },
        sessionName() {
            let sessionId = this.sessionId;
            let user = null;
            if (this.teamInfo) {
                // teamInfo中的人数为初始获取的值，在人员增减后不会及时更新，而teamMembers在人员增减后同步维护的人员信息
                var members =
                    this.$store.state.teamMembers &&
                    this.$store.state.teamMembers[this.teamInfo.teamId];
                var memberCount = members && members.length;
                return (
                    this.teamInfo.name + (memberCount ? `(${memberCount})` : "")
                );
            } else {
                return "群";
            }
        },
        scene() {
            return util.parseSession(this.sessionId).scene;
        },
        to() {
            return util.parseSession(this.sessionId).to;
        },
        myInfo() {
            console.log('myInfo:::',this.$store.state.myInfo);
            return this.$store.state.myInfo;
        },
        userInfos() {
            console.log('userInfos:::',this.$store.state.userInfos);
            return this.$store.state.userInfos;
        },
        msglist() {
            let msgs = this.$store.state.currSessionMsgs;
            let msglist = [];
            for(let i=0;i<msgs.length;i++){
                let item = Object.assign({},msgs[i]);
                if(item.type != 'timeTag'){
                    item.avatar = this.myInfo.avatar
                    if (item.flow === "in") {
                        if (item.from !== this.$store.state.userUID) {
                            item.avatar =
                                (this.userInfos[item.from] &&
                                    this.userInfos[item.from].avatar) ||
                                config.defaultUserIcon;
                            item.nick =
                                (this.userInfos[item.from] &&
                                    this.userInfos[item.from].nick) ||
                                '匿名';
                            item.link = `/index/namecard/${item.from}`;
                            //todo  如果是未加好友的人发了消息，是否能看到名片
                        } else {
                            item.avatar = this.myInfo.avatar;
                            item.nick = this.myInfo.nick;
                        }
                    } else if (item.flow === "out") {
                        item.avatar = this.myInfo.avatar;
                        item.nick = this.myInfo.nick;
                    }
                    msglist.push(item);
                }
            };
            return msglist;
        },
        teamInfo() {
            if (this.scene === "team") {
                var teamId = this.sessionId.replace("team-", "");
                return this.$store.state.teamlist.find(team => {
                    return team.teamId === teamId;
                });
            }
            return undefined;
        }
    },
    methods: {
        toHistory() {
            this.functionJS.queryNavgationTo(this,'/index/teamHistory',{sessionId:this.$route.query.sessionId});
        },
        toManager() {
            if (this.teamInfo && this.teamInfo.validToCurrentUser) {
                this.functionJS.queryNavgationTo(this,`/index/teamManager`,{teamId:this.teamInfo.teamId});
            } else {
                this.$Message.info('您已退出该群')
            }
        },
        msgsLoaded() {
            pageUtil.scrollChatListDown();
        }
    }
};
</script>
<style lang="less" scoped>
.chatteam {
}
</style>