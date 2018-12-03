<template>
    <div class="header">
      <div class="header-content clearfix">
        <div class="header-left fl">
          <img src="../assets/images/header/logo.jpg" alt="vipkid logo" class="logo" @click="goHome">
          <img src="../assets/images/header/logo_desc.png" class="logo-desc">
        </div>
        <div class="header-right fr">
          <span class="search-wrap">
            <img src="../assets/images/header/search_icon.png" class="search-icon">
            <input type="text" :placeholder="$t('local.searchPlacehoder')" class="search-input" v-model.trim="value" @keyup.enter="search">
          </span>
          <img src="../assets/images/header/search_icon.png" class="phone" @click="iSearch">
          <img src="../assets/images/header/code.png" class="code" @click="codeFn">
          <img src="../assets/images/header/logout.png" class="logout" @click="logoutFn">
          <img src="../assets/images/header/phone_menu.png" class="menu" @click="menuSwitch">
          <ul class="logout-box" v-show="show">
            <li @click="cut" v-if="local == 'en_US'">中文</li>
            <li @click="cut" v-else>English</li>
            <li @click="logout">{{$t('local.logout')}}</li>
          </ul>
          <div v-if="codeShow" class="codeBox">
            <img src="../assets/images/header/code_box.png">
            <div>{{$t('local.apping')}}</div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
	name: "Header",
  data(){
	  return {
	    show: this.headerShow,
      codeShow: false,
      value:'',
      local: this.$store.state.local
    }
  },
  props:['headerShow'],
  mounted(){
	  var _this = this;
    document.getElementsByTagName('body')[0].addEventListener('click',function (e) {
      _this.show = false
      _this.codeShow = false
    })
  },
	methods: {
	  codeFn(e){
      e.stopPropagation()
      this.show = false
      this.codeShow = !this.codeShow;
    },
    logoutFn(e){
	    e.stopPropagation()
      this.codeShow = false
      this.show=!this.show
    },
    cut(){
      this.$emit('cut',this.local)
    },
    logout(){
      this.$emit('logout')
    },
    goHome(){
      this.$emit('goHome')
    },
    search(){
      this.$emit('search',this.value)
    },
    iSearch(){
      this.$emit('iSearch')
    },
    menuSwitch () {
      this.$store.commit('menuShow');
    }
  },
  watch:{
    headerShow(){
      this.show = false
    },
    '$store.state.local'(){
      this.local = this.$store.state.local
    }
  }
};
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix:after{
    display: block;
    content: '';
    clear: both;
  }
  li{
    list-style: none;
  }
  .header{
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0 3px 12px 0 rgba(255, 159, 72, 0.17);
    position: relative;
    z-index: 111;
    margin-bottom: 16px;

    .header-content{
      max-width: 1336px;
      padding: 0 5px;
      margin: 0 auto;

      .header-left{
        font-size: 0;
        img{
          vertical-align: middle;
        }
        .logo-desc{
          width: 200px;
        }
        .logo{
          width: 128px;
          height: 60px;
          margin-right: 16px;
          cursor: pointer;
        }
      }

      .header-right{
        padding-top: 16px;
        position: relative;
        font-size: 12px;
        .logout{
          width: 24px;
          vertical-align: middle;
          cursor: pointer;
        }
        .code {
          margin: 0 20px 0 25px;
          vertical-align: middle;
          cursor: pointer;
        }
        .search-wrap{
          display: inline-block;
          padding: 6px 0;
          width: 206px;
          height: 28px;
          background-color: #f8f0eb;
          border-radius: 14px;
          vertical-align: middle;

          .search-icon{
            margin: 0 4px 0 9px;
            width: 16px;
            cursor: pointer;
          }
          .search-input{
            width: 77%;
            background: transparent;
            border: 0;
            outline: none;
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 16px;
            letter-spacing: 0;
            color: #b28b6e;
            vertical-align: top;
          }
        }
        .logout-box{
          position: absolute;
          right: 0;
          top: 50px;
          padding: 4px 0;
          width: 122px;
          line-height: 32px;
          background-color: #ffffff;
          box-shadow: 0 1px 20px 0
          rgba(169, 151, 140, 0.31);
          border-radius: 4px;
          text-align: center;
          >li{
            font-size: 12px;
            color: #424242;
            cursor: pointer;
            -webkit-user-select: none;
          }
          >li:hover{
            color: #fffefe;
            /*background-image: linear-gradient(-90deg,*/
            /*rgba(3, 0, 0, 0.55) 0%,*/
            /*rgba(255, 255, 255, 0.55) 100%),*/
            /*linear-gradient(*/
              /*#f85415,*/
              /*#f85415);*/
            /*background-blend-mode: soft-light,*/
            /*normal;*/
            background: #f85415;
            background-image: linear-gradient(-90deg, rgb(245, 60, 13), rgb(249, 111, 40) 100%),
            linear-gradient(rgb(248, 84, 21), rgb(248, 84, 21))

          }
        }
        .codeBox{
          padding-bottom: 10px;
          position: absolute;
          right: 40px;
          top: 50px;
          width: 153px;
          background-color: #ffffff;
          box-shadow: 0px 1px 20px 0px
          rgba(169, 151, 140, 0.31);
          border-radius: 4px;
          div{
            padding: 0 19px;
            text-align: center;
            line-height: 20px;
            font-size: 13px;
            color: #666;
          }
        }
      }
    }
  }

  .phone{
    display: none;
  }
  .menu{
    display: none;
  }
  @media screen and (max-width: 1024px){
    .header .header-content .header-left .logo{
      margin-right: 20px;
    }
  }
  @media screen and (max-width:767px){
    .header{
      height: 45px;
      .header-content{
        padding: 7.5px 5px;
      }
    }
    .header .header-content .header-right{
      padding: 4px 4px 0 0;
    }
    .header .header-content .header-left .logo{
      margin-right: 10px;
      width: 64px;
      height: 30px;
    }
    .header .header-content .header-left .logo-desc{
      width: 137.5px;
    }
    .phone{
      display: inline-block;
      vertical-align: bottom;
      width: 16px;
    }
    .header .header-content .header-right .search-wrap{
      display: none;
    }
    .header .header-content .header-right .code{
      display: none;
    }
    .menu{
      display: inline-block;//头部菜单只在门户项目中显示
      width: 16px;
      height: 16px;
      vertical-align: bottom;
    }
    .header .header-content .header-right .logout{
      margin: 0 22.5px;
      width: 16px;
    }
  }

  @media screen and (max-width:320px){
    .header .header-content .header-right .logout{
      margin: 0 7px;
    }
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #b28b6e;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #b28b6e;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #b28b6e;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #b28b6e;
  }
</style>
