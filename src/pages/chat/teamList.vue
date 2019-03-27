<template>
    <div class="chatlist">
        <h1>{{pageTitle}}</h1>
        <p class="listItem"
            v-for="team in teamList"
            :key="team.teamId"
            :title="team.name"
            @click="talking(team.teamId)"
        >
            <span>{{team.name}}</span>
        </p>
        <p v-if="!teamList || teamList.length<1">暂无内容</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            teamType: "advanced",
            pageTitle: "直播群"
        };
    },
    computed: {
        teamList: function() {
            return (
                this.$store.state.teamlist &&
                this.$store.state.teamlist.filter(team => {
                    return (
                        team.type === this.teamType && team.validToCurrentUser
                    );
                })
            );
        }
    },
    methods: {
        talking(sessionId) {
            this.functionJS.queryNavgationTo(this,'/index/teamChat',{sessionId});
        }
    },
    mounted() {
        console.log(this.teamList);
    }
};
</script>
<style lang="less" scoped>
.chatlist {
    .listItem{
        cursor: pointer;
    }
}
</style>