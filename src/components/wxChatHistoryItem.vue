<template>
  <div>
     <Modal title="预览" :footer-hide="true" v-model="showViewModal">
        <img :src="modalSrc" style="width: 100%;">
    </Modal>
    <div class="msg_typetime" v-if="hContents.msgType!=3">
      <p class="msgtime">{{time}}</p>
    </div>
    <div class="msg_type0" v-if="hContents.msg && hDirection == 0 && hContents.msgType == 0">
      <div class="header"><img src="../assets/images/avatar.png"></div>
      <div class="txt" v-html="hContents.msg"></div>
    </div>
    <div class="msg_type7" v-if="hContents.msg && hDirection == 1 && hContents.msgType == 0">
      <div class="header"><img v-if="!hContents.doctorIco" src="../assets/images/doctoricon.png"><img v-if="hContents.doctorIco" :src="fileBaseUrl+JSON.parse(hContents.doctorIco).fileName"></div>
      <div class="doctor_txt">
        <div class="txta" v-html="hContents.msg"></div>
      </div>
    </div>
    <div class="msg_type9"   v-if="hDirection == 1 && hContents.msgType == 1">
      <div class="header"><img v-if="!hContents.doctorIco" src="../assets/images/doctoricon.png"><img v-if="hContents.doctorIco" :src="fileBaseUrl+JSON.parse(hContents.doctorIco).fileName"></div>
      <div>
        <img class="pic" v-if="urlList.length>0" :src="urlList[0].fileName" @click="handleView(urlList[0].fileName)">
      </div>
    </div>
    <div class="msg_type1"   v-if="hDirection == 0 && hContents.msgType == 1">
       <div class="header"><img src="../assets/images/avatar.png"></div>
       <img class="pic" v-if="urlList.length>0" :src="urlList[0].fileName" @click="handleView(urlList[0].fileName)" >
    </div>
    <!-- 语音 start -->
    <div class="msg_typeto" v-if="hDirection == 0 && hContents.msgType == 2">
      <div class="msg_type2"  @click="audioPlay($event,hDirection,'audio_img_'+i)">
        <div class="header"><img src="../assets/images/avatar.png"></div>
        <div class="doctor_txt">
          <div class="txta">
          <img :ref="'audio_img_'+i" class="audio_img" :data-flow="hDirection" src="../assets/images/audio.png"/>
          <div class="audio">
            <audio ref="audio_div" v-if="urlList.length>0" :src="this.fileBaseUrl + urlList[0].targetFileName"></audio>
          </div>
        </div>
        </div>
      </div>
       <div class="msg_typetime1">
        <div class="mit">{{hContents.palyTime}}"</div>
      </div>
    </div>
    <div class="msg_typereceive" v-if="hDirection == 1 && hContents.msgType == 2" >
      <div class="msg_type3" @click="audioPlay($event,hDirection,'audio_img_'+i)">
        <div class="header"><img v-if="!hContents.doctorIco" src="../assets/images/doctoricon.png"><img v-if="hContents.doctorIco" :src="fileBaseUrl+JSON.parse(hContents.doctorIco).fileName"></div>
        <div class="doctor_txt">
          <div class="txta">
            <img :ref="'audio_img_'+i" class="audio_img" :data-flow="hDirection" src="../assets/images/doctor_audio.png"/>
            <div class="audio">
              <audio ref="audio_div" v-if="urlList.length>0" :src="this.fileBaseUrl + urlList[0].targetFileName"></audio>
            </div>
          </div>
        </div>
      </div>
      <div class="mite">{{hContents.palyTime}}"</div>
    </div>
    <!-- 语音 stop -->
    <div class="newmsgtype4" v-if="hContents.msg && hDirection == 0 && hContents.msgType == 3 && servertype!=2&&servertype!=3">
      <div class="msg_type4">
        <div class="header"><img src="../assets/images/avatar.png"></div>
        <p>匿名患者</p>
        <span>{{hContents.msg}}</span>
        <div class="small_img" v-if="urlList.length>0">
          <img v-for="(url,index) in urlList" :key="index" @click="priviewsChild2(url.fileName)" :src="url.smallFileName">
        </div>
        <div class="more_text">
          <span>基本信息</span>
          <!-- <img src="../assets/images/chatright.png"> -->
        </div>
      </div>
    </div>
    <div class="msg_type8" @click="showOptionsDiv" v-if="hContents.msg && hDirection == 1 && hContents.msgType == 5 &&servertype == 0">
      <div class="header"><img v-if="!hContents.doctorIco" src="../assets/images/doctoricon.png"><img v-if="hContents.doctorIco" :src="fileBaseUrl+JSON.parse(hContents.doctorIco).fileName"></div>
      <div class="doctor_msg">
          <p>咨询建议</p>
          <div class="opinion">
            <p><b>主诉:</b><span style="color:#666666">{{opinions.mainsuit}}</span></p>
            <p><b>初步诊断:</b><span style="color:#666666">{{opinions.assessmentcontent}}</span></p>
            <p><b>处理建议:</b><span style="color:#666666">{{opinions.handlingOpinions}}</span></p>
          </div>
          <div class="more_text">
            <span>查看详情诊疗建议</span><img src="../assets/images/right_small.png">
          </div>
      </div>
    </div>
    <div class="msgtype11" @click="showtext(hContents.educationId)" v-if="hDirection == 1 && hContents.msgType == 9">
      <div class="m_header"><img v-if="!hContents.doctorIco" src="../assets/images/doctoricon.png"><img v-if="hContents.doctorIco" :src="fileBaseUrl+JSON.parse(hContents.doctorIco).fileName"></div>
      <div class="m_content">
          <div class="content_top">
              <div class="content_left">
                  <img :src="fileBaseUrl+JSON.parse(hContents.cover).fileName" />
              </div>
              <div class="content_right">
                  <p class="top">{{hContents.title}}</p>
                  <p class="down">{{hContents.synopsis}}</p>
              </div>
          </div>
          <div class="content_footer">
              <span>点击查看文章详情</span><img src="../assets/images/right_small.png">
          </div>
      </div>
  </div>
    <div class="msg_type8" @click="showQueDatail(hContents.serviceId)" v-if="hContents.msg && hDirection == 1 && hContents.msgType == 5 &&servertype != 0">
      <div class="header"><img v-if="!hContents.doctorIco" src="../assets/images/doctoricon.png"><img v-if="hContents.doctorIco" :src="fileBaseUrl+JSON.parse(hContents.doctorIco).fileName"></div>
      <div class="doctor_msg">
          <p>咨询建议</p>
          <div class="opinion">
            <p><b>主诉:</b><span style="color:#666666">{{opinions.mainsuit}}</span></p>
            <p><b>初步诊断:</b><span style="color:#666666">{{opinions.assessmentcontent}}</span></p>
            <p><b>处理建议:</b><span style="color:#666666">{{opinions.handlingOpinions}}</span></p>
            <p><b>RP:</b><span v-if="opinions.rp" style="color:#666666">{{opinions.rp.itemname}}，{{opinions.rp.itemspec}}</span></p>
          </div>
          <div class="more_text">
            <span>查看详情诊疗建议</span><img src="../assets/images/right_small.png">
          </div>
      </div>
    </div>
    <div class="msg_type6" @click="toevnt()" v-if="hContents.msg && hDirection == '1' && hContents.msgType == 6">{{hContents.msg}}</div>
    <div class="msg_type6" v-else-if="hContents.msg && hDirection == '1' && hContents.msgType == 4">温馨提示：{{hContents.msg}}</div>
    <div class="msg_type6" v-else-if="hContents.msg && hDirection == '1' && hContents.msgType == 11"><span style="color:red;">退诊提示：</span>{{hContents.msg}}</div>
    <div class="msg_type6" v-else-if="hContents.msg && hDirection == '1' && hContents.msgType == 12">{{hContents.msg}}</div>
    <div class="msg_type4" v-else-if="hContents.msg && hDirection == 0 && hContents.msgType == 8">
      <p>匿名患者</p>
      <span>{{hContents.msg}}</span>
      <div class="small_img" v-if="urlList.length>0">
        <img v-for="(url,index) in urlList" :key="index" @click="priviewsChild2(url.fileName)" :src="url.smallFileName">
      </div>
      <div class="more_text">
        <span>基本信息</span><img src="../assets/images/chatright.png">
      </div>
    </div>
    <!-- <div class="msg_type10" @click="predetail(hContents.clinicId)" v-if="hContents.msg && hDirection == 0 && hContents.msgType == 3 && servertype!=0 && servertype!=1 && servertype!=4">
        <div class="rp_tit">
            <p><span class="sp1">开方时间&nbsp;:&nbsp;</span><span class="sp2">{{msgDetail.openingTime}}</span></p>
            <p><span class="sp1">患者信息&nbsp;:&nbsp;</span><span class="sp2">{{msgDetail.memberName}}&nbsp;<span v-if="msgDetail.gender==1">男</span><span v-if="msgDetail.gender==2">女</span>&nbsp;{{msgDetail.age}}岁</span></p>
            <p><span class="sp1">诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;断&nbsp;:&nbsp;</span><span class="sp2">{{msgDetail.assessmentcontent}}</span></p>
            <p><span class="sp1">处方医生&nbsp;:&nbsp;</span><span class="sp2">{{msgDetail.doctor}}</span></p>
            <p><span class="sp3">RP&nbsp;:&nbsp;</span>
                <span class="sp2" v-for="(caseitem,index) in msgDetail.rp" :key="index">
                  {{caseitem.itemname}}{{caseitem.itemspec}}
                </span>
            </p>
        </div>  
        <div class="more_text">
          <span>点击查看处方详情</span><img src="../assets/images/chatright.png">
        </div>
    </div> -->
  </div>
</template>
<script type="text/javascript">
import { isEmptyObject } from "../commons/function.js";
import emojiObj from "../configs/emoji";
export default {
  props: {
    i: {
      type: Number,
      default: 0
    },
    hDirection: {
      type: Number,
      default: 0
    },
    hContent: {
      type: String,
      default: 0
    },
    hCTime:{
      type: String,
      default: 0
    }
  },
  data() {
    return {
      servertype:0,
      showViewModal:false,
      modalSrc: "",
      msgDetail:{},

    };
  },
  created() {
     this.servertype = this.$route.query.serviceType
  },
  computed: {
    time(){
      if(isNaN(this.hCTime)){
        return  this.hCTime
      }else{
        let oDate=new Date(this.hCTime);
        return oDate.getFullYear()+'-'+this.toDou((oDate.getMonth()+1))+'-'+this.toDou(oDate.getDate())+' '+this.toDou(oDate.getHours())+':'+this.toDou(oDate.getMinutes())+':'+this.toDou(oDate.getSeconds());
      }
    },
    hContents(){
      let content = this.hContent;
      let contents = JSON.parse(content);
      // console.log(contents)
      if (contents.msgType === 0) {
        // contents.msg = util.escape(contents.msg);
          if (/\[[^\]]+\]/.test(contents.msg)) {
            let emojiItems = contents.msg.match(/\[[^\]]+\]/g);
              emojiItems.forEach(text => {
                let emojiCnt = emojiObj.emojiList.emoji;
                  if (emojiCnt[text]) {
                    contents.msg = contents.msg.replace(
                      text,
                          `<img class="emoji-small" src="${
                            emojiCnt[text].img
                          }">`
                      );
                  }
              });
          }
      } 
      return contents;
    },
    //  hContents(){
    //   let content = this.hContent;
    //   let contents = JSON.parse(content);
    //   return contents;
    // },
    msgDetail(){
      let msg = this.hContents;
      if (this.servertype!=0 && this.servertype !=1 && msg.msgType == 3){
          console.log(msg)
          return JSON.parse(msg.msg)
      }
      else {
      return {};
      }
    },
    urlList() {
      let pics = []
      if(this.hContents.url){
        pics = JSON.parse(this.hContents.url);
      }
      if (pics&&pics.length > 0) {
        pics.forEach((el, i) => {
          pics[i].smallFileName = this.fileBaseUrl + el.smallFileName;
          pics[i].fileName = this.fileBaseUrl + el.fileName;
        });
      }
      return pics;
    },
    opinions() {
      let msg = this.hContents;
      if (msg.msgType == 5) return JSON.parse(msg.msg);
      else return {};
    }
  },
  methods: {
    handleView(src) {
        this.modalSrc = src;
        this.showViewModal = true;
    },
    toDou(n){
      return n < 10 ? '0'+n : n;
    },
    showtext(id){
      // this.$router.push({path:'/chat/chatpage',query:{'id':id}})
    },
    showQueDatail(serviceId){
        this.$store.commit("chengequsdetail",serviceId)
    },
    predetail(clinicid){
        if(this.servertype==2){
          this.$store.commit("chengeresetdetail",clinicid)
        }else if(this.servertype==3){
          // this.$router.push({path:'/electronicprescription',query:{'clinicId':clinicid,'butfalse':false}})
        }
    },
    showOptionsDiv() {
      // 显示建议
      this.$emit("showOpinions", this.opinions);
    },
    priviewsChild2(url) {
      // let srcs = "";
      // this.urlList.forEach((el, i) => {
      //   if (srcs == "") srcs += el.fileName;
      //   else srcs += "," + el.fileName;
      // });
      // this.$emit("previewItem", srcs);
      this.modalSrc = url;
      this.showViewModal = true;
    },
    toevnt() {
      let data = {
        doctorId: this.$route.query.doctorId,
        serviceId:this.$route.query.serviceId
      };
      // this.$router.push({ path: "/publicpage/evaluate", query: data });
    },
    audioPlay(e, type, i) {
       console.log("i",e)
      let audio = e.target.children[1].children[0];
      let audios = window.document.getElementsByTagName("audio");
      let audioImgs = window.document.getElementsByClassName("audio_img");
      console.log("11111111111")
      if (!audio.paused) {
        console.log("222222222222")
          for (let childImg of audioImgs) {
              if (childImg.getAttribute("data-flow") == "0")
                  childImg.setAttribute("src",require("../assets/images/audio.png"));
              else
                  childImg.setAttribute("src",require("../assets/images/doctor_audio.png"));
            }
            audio.currentTime = 0;
            audio.pause();
        } else {
          console.log("33333333333")
            for (let childAudio of audios) {
                childAudio.currentTime = 0;
                childAudio.pause();
            }
            for (let childImg of audioImgs) {
              if (childImg.getAttribute("data-flow") == "0")
                  childImg.setAttribute("src",require("../assets/images/audio.png"));
              else
                  childImg.setAttribute("src",require("../assets/images/doctor_audio.png"));
      }
      console.log("audio_img",this.$refs)
			if (type == "0")
				this.$refs[i].setAttribute("src",require("../assets/images/audio.gif")
				);
			else
				this.$refs[i].setAttribute("src",require("../assets/images/doctor_audio.gif")
				);
			audio.play();
			audio.addEventListener('ended', ()=>{
					if (type == "0"){
						this.$refs[i].setAttribute("src",require("../assets/images/audio.png"));
					}else{
						this.$refs[i].setAttribute("src",require("../assets/images/doctor_audio.png"));
					}
			}, false);
		}
    }
  }
};
</script>

<style lang="less" scoped>
.msg_typetime{
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
  text-align: center;
  height: 30px;
  line-height: 30px;
  clear: both;
  .msgtime{
    width:190px;
    margin-left:230px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: #d3dae4;
    border-radius: 15px;
  }
}
.msg_type0 {
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
  float: right;
  color: #ffffff;
  margin: 0px 30px 10px 0px;
  clear: both;
  .header {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      float: right;
      margin: 5px 0 0 20px;
      border:1.5px solid #f5f5f5;
    }
  }
  .txt {
    padding: 10px;
    max-width: 70%;
    float: right;
    margin: 10px 0 10px 0;
    border-radius: 25px 25px 0 25px;
    box-shadow: 0 0 10px #97bbed;
    background: -webkit-linear-gradient(left, #1ea3ff, #1ea3ff);
    background: -o-linear-gradient(right, #1ea3ff, #1ea3ff);
    background: -moz-linear-gradient(right, #1ea3ff, #1ea3ff);
    background: linear-gradient(to right, #1ea3ff, #1ea3ff);
  }
}
.msg_type7 {
  width: 100%;
  min-height: 50px;
  margin: 0px 0 10px 0;
  float: left;
  clear: both;
  .header {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      float: left;
      margin: 0 20px 0 30px;
    }
  }
  .doctor_txt {
    max-width: 580px;
    font-size: 14px;
    color: #cccccc;
    float: left;
    margin: 5px 0px 0px 0px;
    .txta {
      padding: 10px;
      border-radius: 25px 25px 25px 0;
      font-size: 14px;
      box-shadow: 0 0 10px #f5f5f5;
      color: #333333;
      background: -webkit-linear-gradient(left, #ffffff, #ffffff);
      background: -o-linear-gradient(right, #ffffff, #ffffff);
      background: -moz-linear-gradient(right, #ffffff, #ffffff);
      background: linear-gradient(to right, #ffffff, #ffffff);
    }
  }
}
.msgtype11{
    width: 100%;
    height: 220px;
    margin-top: 10px;
    overflow: hidden;
    .m_header{
        overflow: hidden;
        float: left;
        height: 120px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50px;
            float: left;
            margin: 0 20px 0 30px;
        }
    }
    .m_content{
        width: 530px;
        border-radius: 25px 25px 25px 0;
        box-shadow: 0 0 10px #f5f5f5;
        padding:20px 20px 10px 20px;
        background: #ffffff;
        float: left;
        .content_top{
            width: 500px;
            border-bottom: 1px solid #999999;
            overflow: hidden;
            display: flex;
            .content_left{
                width:130px;
                height: 90px;
                margin:5px;
                line-height: 90px;
                float: left;
                img{
                    width:130px;
                    height:90px;
                    margin: -10px 10px 0 0;
                }
            }
            .content_right{
                width:370px;
                height: 100px;
                float: left;
                .top{
                    width: 370px;
                    min-height: 50px;
                    font-size: 14px;
                }
                .down{
                    width: 370px;
                    font-size:14px;
                }
            }
        }  
        .content_footer{
            width: 500px;
            height: 40px;
            line-height: 40px;
            color: #999999;
            font-size: 14px;
            overflow: hidden;
            img {
                width: 10px;
                height: 20px;
                float: right;
                margin-top: 20px;
            }
        }  
    } 
}
.msg_type9 {
  width: 100%;
  min-height: 100px;
  margin: 0px 0 10px 0;
  clear: both;
  .header {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      float: left;
      margin: 0 20px 0 30px;
    }
  }
  div {
    .pic {
      width: 250px;
      height: auto;
      outline: none;
      margin-top: 10px; 
      border-radius: 25px 25px 25px 0;
      box-shadow: 0 0 10px #f5f5f5;
      pointer-events: auto ;
    }
  }
}
.msg_type1 {
  width: 100%;
  height: auto;
  margin: 10px 30px 10px 0px;
  .header {
      width: 50px;
      height: 50px;
      float: right;
      margin:10px 0 0 20px;
      img {
        width: 50px;
        height: 50px;
        // position: relative;
        // right: 30px;
        border-radius: 50px;
        margin: 0 0 0 -25px;
        box-shadow: none;
        border:1.5px solid #f5f5f5;
      }
    }
  .pic {
    float: right;
    width: 250px;
    height: auto;
    outline: none;
    margin: 10px 20px 20px -10px;
    border-radius: 25px 25px 0 25px;
    box-shadow: 0 0 10px #97bbed;
    pointer-events: auto;
  }
}
.msg_typeto{
  width: 100%;
  height: 100px;
  .msg_typetime1{
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    float: right;
    margin: 0 -180px 15px 0;
    .mit{
      width: 50px;
      height: 50px;
      font-size: 18px;
      display: inline-block;
    }
  }
  .msg_type2 {
    width: 438px;
    float: right;
    min-height: 100px;
    overflow: hidden;
    .header {
      float: right;
      margin:10px 25px 0 0;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        margin: 0 0 0 30px;
        border:1.5px solid #f5f5f5;
      }
    }
    .doctor_txt {
      width: 180px;
      height: 20px;
      font-size: 24px;
      margin-top: 10px;
      position: relative;
      left: 170px;
      color: #0e0909;
      .txta {
        padding: 5px 5px;
        border-radius: 25px 25px 0 25px;
        box-shadow: 0 0 10px #97bbed;
        background: -webkit-linear-gradient(left, #1ea3ff, #1ea3ff);
        background: -o-linear-gradient(right, #1ea3ff, #1ea3ff);
        background: -moz-linear-gradient(right, #1ea3ff, #1ea3ff);
        background: linear-gradient(to right, #1ea3ff, #1ea3ff);
        img {
          width: 30px;
          height: 30px;
          margin:-5px 100px 0 0px;
        }
      }
    }
  }
}

.msg_typereceive{
  width: 600px;
  height: 100px;
  font-size: 24px;
  text-align: right;
  // clear: both;
  // float: left;
  display: flex;
  .msg_type3 {
    // clear: both;
    width: 338px;
    min-height: 100px;
    margin: 0px 0px 10px 0;
    overflow: hidden;
    .header {
      float: left;
      margin:10 0 0 0;
      // display: inline-block;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        margin: 0 0 0 30px;
      }
    }
    .doctor_txt {
      width: 180px;
      height: 30px;
      font-size: 24px;
      color: #0e0909;
      // margin: 10px 0px 0px 0;
      position: relative;
      left: -55px;
      float: right;
      .txta {
        padding: 5px 5px;
        border-radius: 25px 25px 25px 0;
        box-shadow: 0 0 10px #f5f5f5;
        background: -webkit-linear-gradient(left, #ffffff, #ffffff);
        background: -o-linear-gradient(right, #ffffff, #ffffff);
        background: -moz-linear-gradient(right, #ffffff, #ffffff);
        background: linear-gradient(to right, #ffffff, #ffffff);
        img {
          width: 30px;
          height: 30px;
          margin:-5px 0 0 10px;
        }
      }
    }
  }
  .mite{
    width: 80px;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    text-align: left;
    margin:5px 0 0 -20px;
    display: inline-block;
  }
}
.msg_type8 {
  clear: both;
  width: 100%;
  min-height: 50px;
  margin: 10px 0 20px 0;
  overflow: hidden;
  .header {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      float: left;
      margin: 0 20px 0 30px;
    }
  }
  .doctor_msg {
    float: left;
    width: 445px;
    min-height: 50px;
    background: #1ea3ff;
    padding: 10px 5px 10px 15px;
    border-radius: 25px 25px 25px 0;
    box-shadow: 0 0 10px #f5f5f5;
    background: -webkit-linear-gradient(left, #ffffff, #ffffff);
    background: -o-linear-gradient(right, #ffffff, #ffffff);
    background: -moz-linear-gradient(right, #ffffff, #ffffff);
    background: linear-gradient(to right, #ffffff, #ffffff);
    margin-top: 10px;
    p {
      font-size: 16px;
      color: #1ea3ff;
      margin-bottom: 20px;
    }
    .opinion {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      margin-bottom: 5px;
      p {
        color: #666666;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .more_text {
      border-top: 1px solid #f5f5f5;
      margin-top: 10px;
      width: 420px;
      height: 30px;
      line-height: 30px;
      color: #999999;
      font-size: 14px;
      img {
        width: 9px;
        height: 16px;
        float: right;
        margin-top: 20px;
      }
    }
  }
}
.msg_type10{
        clear: both;
        margin: 20px 20px 20px 130px;
        width: 545px;min-height: 200px;background: #1ea3ff;padding: 20px 20px 0 20px;
        border-radius: 25px 25px 0 25px;
        box-shadow: 0 0 10px #97bbed;
        background: -webkit-linear-gradient(left, #1ea3ff , #1ea3ff);
        background: -o-linear-gradient(right, #1ea3ff , #1ea3ff);
        background: -moz-linear-gradient(right, #1ea3ff , #1ea3ff);
        background: linear-gradient(to right, #1ea3ff , #1ea3ff);
        .rp_tit{
            line-height: 50px;
            p{font-size: 24px;color: #ffffff;
              .sp1{
                display:block;
                width: 120px;
                float: left;
              }
              .sp2{
                display:block;
                width: 400px;
                float: left;
              }  
              .sp3{
                display:block;
                width: 120px;
                height: 100px;
                float: left;
              }     
            }
        }
        .more_text{border-top: 1px solid #ffffff;clear: both;
          width: 520px;height: 60px;line-height: 60px;color: #ffffff;font-size: 24px;
          img{width: 9px;height: 16px;float: right;margin-top: 20px;}
        }
      }
      .newmsgtype4{
        clear: both;
        width: 100%;
        min-height: 50px;
        margin: 10px 0 20px 0;
        overflow: hidden;
         .header {
            img {
              width: 50px;
              height: 50px;
              border-radius: 50px;
              float: right;
              margin: -10px -85px 0 20px;
              border:1.5px solid #f5f5f5;
            }
          }
        .msg_type4 {
          float: right;
          margin: 20px 95px 10px 0;
          width: 445px;
          min-height: 150px;
          background: #1ea3ff;
          padding: 20px 20px 0 20px;
          border-radius: 25px 25px 0 25px;
          box-shadow: 0 0 10px #97bbed;
          background: -webkit-linear-gradient(left, #1ea3ff, #1ea3ff);
          background: -o-linear-gradient(right, #1ea3ff, #1ea3ff);
          background: -moz-linear-gradient(right, #1ea3ff, #1ea3ff);
          background: linear-gradient(to right, #1ea3ff, #1ea3ff);
          p {
            font-size: 16px;
            color: #ffffff;
          }
          span {
            font-size: 16px;
            color: #ffffff;
          }
          .small_img {
            width: 520px;
            height: 100px;
            overflow: hidden;
            img {
              width: 80px;
              height: 80px;
              margin: 10px 0 0 0;
              pointer-events: auto;
            }
            img:nth-child(1) {
              margin-right: 25px;
            }
            img:nth-child(2) {
              margin-right: 25px;
            }
          }
          .more_text {
            border-top: 1px solid #ffffff;
            width:400px;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            font-size: 14px;
            img {
              width: 9px;
              height: 16px;
              float: right;
              margin-top: 20px;
            }
          }
        }
      }
.msg_type6 {
    padding:10px 10px;
    width: 80%;
    min-height: 30px;
    margin:  0 auto;
    margin-bottom: 20px;
    margin-top: 10px;
    background: #fff;
    border:1px solid #f5f5f5;
    color: #666666;
    font-size: 14px;
    line-height: 30px;
    clear: both;
    border-radius: 10px;
    text-indent: 60px;
}
</style>