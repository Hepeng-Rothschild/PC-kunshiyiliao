<template>
    <Menu v-if="lists.length>0" @on-select="changeTop" class="topMenu" mode="horizontal" :theme="theme1" :active-name="lists[0].id">
        <MenuItem v-for="item in lists"  :key="item.id" :name="item.id">
            {{item.name}}
        </MenuItem>
        <!-- <MenuItem name="1">
            运营平台
        </MenuItem>
        <MenuItem name="2">
            运维平台
        </MenuItem>
        <MenuItem name="3">
            统计平台
        </MenuItem>
        <MenuItem name="4">
            监管平台
        </MenuItem> -->
    </Menu>
</template>
<script>
import {Menu,MenuItem} from "iview";
export default {
    data(){
        return {
            theme1: 'light',
            lists:[],
        }
    },
    components:{
        Menu,
        MenuItem
    },
    created(){
        this.$store.commit("setTopMenuList");
        this.lists = this.$store.state.topMenuList;
        this.$store.commit("setLeftMenuList");
    },
    methods:{
        changeTop(name){
            this.$store.commit("setLeftMenuList",name);
            switch(name){
                case 1:
                    this.$router.push("/operation/index");
                    break;
                case 2:
                    this.$router.push("/maintain/index");
                    break;
                case 3:
                    this.$router.push("/statistics/index");
                    break;
                case 4:
                    this.$router.push("/supervision/index");
                    break;
                default :
                    this.$router.push("/operation/index");
            }
        }
    }
}
</script>
<style lang="less">
    .topMenu{
		margin-top: 10px !important;
	}
</style>