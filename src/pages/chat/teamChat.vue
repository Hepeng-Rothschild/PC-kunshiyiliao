<template>
    <div class="chatteam">
        <h1>直播群</h1>
        <chatEditor :scene="scene" :to="to"></chatEditor>
    </div>
</template>
<script>
import chatEditor from "@/components/chatEditor";
import util from "@/utils";
export default {
    data() {
        return {};
    },
    components: {
        chatEditor
    },
    mounted() {
        console.log("mounted -----------------------");
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
            if (/^p2p-/.test(sessionId)) {
                user = sessionId.replace(/^p2p-/, "");
                if (user === this.$store.state.userUID) {
                    return "我的手机";
                } else if (this.isRobot) {
                    return this.robotInfos[user].nick;
                } else {
                    let userInfo = this.userInfos[user] || {};
                    return util.getFriendAlias(userInfo);
                }
            } else if (/^team-/.test(sessionId)) {
                if (this.teamInfo) {
                    // teamInfo中的人数为初始获取的值，在人员增减后不会及时更新，而teamMembers在人员增减后同步维护的人员信息
                    var members =
                        this.$store.state.teamMembers &&
                        this.$store.state.teamMembers[this.teamInfo.teamId];
                    var memberCount = members && members.length;
                    return (
                        this.teamInfo.name +
                        (memberCount ? `(${memberCount})` : "")
                    );
                } else {
                    return "群";
                }
            }
        },
        scene() {
            return util.parseSession(this.sessionId).scene;
        },
        to() {
            return util.parseSession(this.sessionId).to;
        },
        myInfo() {
            return this.$store.state.myInfo;
        },
        userInfos() {
            return this.$store.state.userInfos;
        },
        msglist() {
            let msgs = this.$store.state.currSessionMsgs;
            return msgs;
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
    }
};
</script>
<style lang="less" scoped>
.chatteam {
}
</style>