<template>
    <div class="test">
        <netEasePlayer></netEasePlayer>
    </div>
</template>
<script>
import api from "@/api/commonApi";
import netEasePlayer from "@/components/netEasePlayer";
export default {
    data() {
        return {
        };
    },
    watch: {
    },
    created() {
    },
    components: { netEasePlayer },
    methods: {
    }
};
</script>
<style lang="less" scoped>
.test {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
}
</style>