<template>
    <div>
        <Row>
            <Col>群管理</Col>
        </Row>
        <Row>
            <Col v-if="teamInfo">
                <p>
                    <img class="avatar u-circle" :src="teamAvatar">
                </p>
                <p>群名称：{{teamName}}</p>
                <p>群ID：{{teamInfo.teamId}}</p>
                <p>创建时间：{{`于${formateDate(teamInfo.createTime)}创建`}}</p>
                <p>人数：{{`${teamMemberNum}人`}}</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <teamMember :teamId="teamId"></teamMember>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button type="primary" @click="reback">返回</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import config from "@/configs";
import Utils from "@/utils";
import teamMember from "@/components/teamMember";
export default {
    data() {
        return {
            avatar: config.defaultUserIcon,
            isOwner: false,
            hasSearched: false
        };
    },
    computed: {
        teamId() {
            return this.$route.query.teamId;
        },
        teamInfo() {
            var teamList = this.$store.state.teamlist;
            var team =
                teamList &&
                teamList.find(team => {
                    return team.teamId === this.teamId;
                });
            if (!team) {
                return undefined;
            }
            return team;
        },
        teamMembers() {
            return this.$store.state.teamMembers[this.teamId];
        },
        teamMemberNum() {
            return this.teamMembers && this.teamMembers.length;
        },
        teamAvatar() {
            return this.teamInfo.avatar || this.avatar;
        },
        teamName() {
            return (this.teamInfo && this.teamInfo.name) || "未设置";
        }
    },
    methods: {
        reback() {
            window.history.go(-1);
        },
        formateDate: function(timeMill) {
            var date = new Date(timeMill);
            return `${date.getFullYear()}-${date.getMonth() +
                1}-${date.getDate()}`;
        }
    },
    components: {
        teamMember
    }
};
</script>

<style lang="less" scoped>
</style>