<template>
  <div class="wt_detail_container">
    <main ref="scrollView">
      <section class="wt_detail_top">
        <div class="wt_detail_wrap">
          <div class="wt_detail_wrap_t">
            <div class="wrap_l">
              <img
                :src="wtdetailData.userHeadUrl?wtdetailData.userHeadUrl:userImg"
                class="user_icon"
                alt="">
              <span>{{wtdetailData.userName}}</span>
            </div>
            <div class="wrap_r">{{wtdetailData.replyTime}}</div>
          </div>
          <div class="wt_detail_wrap_c">
            <div class="wrap_c_line">
              <p class="ellipsis">姓名：{{wtdetailData.askUserName}}</p>
              <p class="ellipsis">出生地：{{wtdetailData.city}}</p>
            </div>
            <div class="wrap_c_line">
              <p class="ellipsis">性别：{{wtdetailData.askUserSex}}</p>
              <p class="ellipsis">生日：{{wtdetailData.askUserRq}}</p>
            </div>
          </div>
        </div>
        <div class="wt_detail_centent"><p>{{wtdetailData.queDes}}</p></div>
        <img
          src="../../static/images/peitu.png"
          class="wt_icon"
          width="100%"
          alt="">
        <p class="source_p">来自 知命</p>
        <div class="znTestBtn" @click="navigateToBZJP()" v-if="this.$store.state.openid == wtdetailData.appuserId">立即查看智能测算结果>></div>
      </section>
      <section class="wt_detail_center">
        <div class="wt_detail_fail" v-if="chatData==''">
          <img src="../../static/images/shouji.png" class="fail_icon" alt="">
          <p class="fail_promt">大师正在分析打字，请您耐心等待一会。<br>可收藏该网页，或下载“<span @click="updateApp()">知命APP</span>”<br>稍后查看结果</p>
        </div>
        <div class="wt_detail_success" v-else>
          <div class="wt_detail_item" v-for="item in chatData">
            <div class="item_top">
              <div class="item_top_l">
                <img
                  :src="item.userHeadUrl?item.userHeadUrl:userImg"
                  class="user_icon"
                  crossOrigin = "Anonymous"
                  alt="">
                <span>{{item.userName}}</span>
              </div>
              <div class="item_top_r">{{item.replyTime}}</div>
            </div>
            <div class="item_content">
              <p :class="{'more_bg': !isapp && item.replyDes.length > 40 }">{{item.replyDes}}</p>
              <div class="more_btn" v-if="!isapp && item.replyDes.length > 40" @click="popupShowEvent()">查看更多</div>
            </div>
          </div>
        </div>
        <Load-more :tip="!moreShow?'正在加载':'我是有底线的'" :show-loading="!moreShow" v-if="chatData.length > 3"></Load-more>
      </section>
    </main>
    <!-- import -->
    <aside class="Reply_container" v-if="this.$store.state.openid == wtdetailData.appuserId">  
      <div class="Reply_wrap">
        <!-- <label for="updateImg" class="updataFile"><input id="updateImg" type="file" style="display:none;"></label> -->
        <input type="text" name="" v-model="importMsg" class="importMsg">
        <button class="enterMsg" 
          :style="importMsg == ''?'background-color:rgba(0,0,0,0.3)':''" 
          @click="importMsg == ''?'':enterMsgEvent()">发送
        </button>
      </div>
    </aside>
    <!-- pormtUpdate -->
    <popup :value="popupShow" position="bottom" @on-hide="popupShowEvent()">
      <div class="pormtUpdate_wrap">
        <div v-if="this.$store.state.openid == wtdetailData.appuserId">
          <div class="border2"><input type="text" class="importPhone" maxlength="11" placeholder="输入手机号绑定" v-model="phone"></div>
          <p>手机号登录 知命APP</p>
          <p>免费查看大师全部解析</p>
        </div>
        <img v-if="this.$store.state.openid != wtdetailData.appuserId" src="../../static/images/wancheng_icon.png" class="zm_icon" alt="">
        <p v-if="this.$store.state.openid != wtdetailData.appuserId">下载知命APP 查看全部解析</p>
        <a href="javascript:;" @click="updateEvent()" class="pormtUpdate_btn">马上下载 查看</a>
      </div>
    </popup>
  </div>
</template>

<script>
    import { Popup, LoadMore, Confirm } from 'vux'
    export default {
      components: {
        Popup,
        LoadMore,
        Confirm
      },
        data () {
          return {
            scrollView: '',
            popupShow: false,
            moreShow: true,
            wtid: '',
            userImg: 'http://qiniu.ddznzj.com/media/qc/180921/180921164236770.png',
            importMsg: '',
            wtdetailData: {},
            chatData: [],
            page: 0,
            isapp: '',
            phone: '',
            H5hours: '',
            timeVal: null
          }
        },
        mounted () {
            this.isapp = this.$store.state.isapp;
            this.wtid = this.$route.query.wtid;
            this.ajaxDetailEvent();
            this.ajaxPingEvent();
            this.timeVal = setInterval(() => {
              this.ajaxPingEvent()
            }, 2000)
            // this.scrollView = this.$refs.scrollView;
            // this.scrollView.addEventListener('scroll', this.Pulluploading, false);
        },
        methods: {
            ajaxDetailEvent () {
              this.$vux.loading.show({text: '加载中...'})
              this.$http.post(this.$api.wtDetailApi, {smAskQuestionId: this.wtid, appuserId: this.$store.state.openid, isShowImg: 1})
              .then((response) => {
                console.log(response)
                this.wtdetailData = response.data;
                this.$vux.loading.hide();
              }).catch((result) => {
                this.$vux.toast.text('数据有误')
              })
            },
            ajaxPingEvent () {
              this.$http.post(this.$api.pingApi, {smAskQuestionId: this.wtid, appuserId: this.$store.state.openid, page: this.page, providername: 'acweb'})
              .then((response) => {
                if (response.data === 1) {
                  // this.moreShow = !this.moreShow;
                  // this.scrollView.removeEventListener('scroll', this.Pulluploading, false);
                } else {
                  if (this.chatData.length < response.data.length) {
                    this.chatData = response.data;
                  }
                }
              })
            },
            popupShowEvent () {
                this.popupShow = !this.popupShow;
            },
            updateApp () {
              window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.mrkj.sm'
            },
            enterMsgEvent () {
                this.$http.post(this.$api.importApi, {
                  replyDes: this.importMsg, 
                  packname: 'acweb',
                  appuserId: this.$store.state.openid,
                  smAskQuestionId: this.wtid,
                  parentsId: null,
                  versionCode: 2000
                }).then((response) => {
                  if (response.data) {
                    this.$vux.toast.text('发送成功', 'middle');
                  } else {
                    this.$vux.toast.text('发送失败', 'middle')
                  }
                  this.importMsg = '';
                })
            },
            updateEvent () {
              let _self = this;
              if (this.$store.state.openid == this.wtdetailData.appuserId) { // eslint-disable-line
                if (this.phone !== '') {
                  if (!(/^1[3|4|5|7|8][0-9]{9}$/).test(this.phone)) {
                    this.$vux.toast.text('手机号输入错误');
                    return false;
                  }
                  this.$store.commit('isapp', 1);
                  sessionStorage.setItem('isSelf', 1);
                  this.$http.post(this.$api.wtApi, {
                    ques: this.phone, 
                    area: 'edituser',
                    uid: this.$store.state.openid,
                    username: this.phone, 
                    sex: '男',
                    birthday: '绑定手机'
                  }).then((response) => {
                    if (response.data.code) {
                      window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.mrkj.sm';
                    } else {
                      alert('绑定失败')
                      this.phone = '';
                    }
                  })
                } else {
                  this.$vux.confirm.show({
                    title: '操作提醒',
                    content: '不输入手机号，是无法绑定数据哦',
                    confirmText: '返回填写',
                    cancelText: '一意孤行',
                    onCancel () {
                      _self.$store.commit('isapp', 1);
                      sessionStorage.setItem('isSelf', 1)
                      window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.mrkj.sm';
                    },
                    onConfirm () {}
                  })
                }
              } else {
                  _self.$store.commit('isapp', 1);
                  sessionStorage.setItem('isSelf', 1)
                 window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.mrkj.sm';
              }
            },
            navigateToBZJP () {
              let sex = this.wtdetailData.askUserSex === '男' ? 1 : 0;
              let askUserRq = this.wtdetailData.askUserRq.slice(0, this.wtdetailData.askUserRq.length - 3);
              let hours = this.wtdetailData.askUserRq.slice(13, this.wtdetailData.askUserRq.length); 
              let hoursArr = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
              hoursArr.forEach((item, index) => {
                if (hours === item) { this.H5hours = index * 2; }
              })
              this.$http.post(this.$api.zncsTJApi)
              .then((response) => {
                if (response.data) { console.log(1) }
                window.location.href = `https://www.yixueqm.com/zhiming/index.php/home-bzjp-bzjp_zhifu?username=${this.wtdetailData.askUserName}&ZQbirthday=${askUserRq + ' ' + this.H5hours + '时'}&gender=${sex}`
              })
            }
            // Pulluploading () {
						// 	var scrollTop = this.scrollView.scrollTop;
						// 	var scrollHeight = this.scrollView.scrollHeight;
						// 	var clientHeight = this.scrollView.clientHeight;
						// 	if (scrollHeight - clientHeight < scrollTop + 1) {
						// 		if (!this.throttle_B) {
						// 			setTimeout(() => {
						// 					this.page++;
						// 					this.ajaxPingEvent();
						// 					this.throttle_B = false;
						// 			}, 200)
						// 			this.throttle_B = true;
						// 		} else {
						// 			return false;
						// 		}
						// 	}
						// }

            // 获取行数
            // countLines (ele) {
            //     var styles = window.getComputedStyle(ele, null);
            //     var lh = parseInt(styles.lineHeight, 10);
            //     var h = parseInt(styles.height, 10);
            //     var lc = Math.round(h / lh);
            //     console.log('line count:', lc, 'line-height:', lh, 'height:', h);
            //     return lc;
            // },
            // getLineNum (el) {
            //     let lineNum = this.countLines(el.currentTarget);
            //     return lineNum
            // }
        },
        destroyed () {
          window.clearInterval(this.timeVal)
          this.timeVal = null;
        }
    }
</script>

<style lang="scss" scoped>
.popup-background-color{background-color: transparent;}
.wt_detail_container{
  display: flex;
  flex-direction: column;
  height:100vh;
}
main{
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.wt_detail_top{
  padding:10px 15px;
  border-bottom:5px solid #f0f0f0;
  .wt_detail_wrap{
    border-bottom:1px solid #cccccc;
    .wt_detail_wrap_t{
      display: flex;
      justify-content: space-between;
      align-items:center;
      margin-bottom:10px;
      .wrap_l{
        .user_icon{
          width:30px;
          height:30px;
          border-radius: 50%;
        }
        span{
          font-size:15px;
          color:#999999;
          margin-left:7px;
        }
      }
      .wrap_r{font-size:12px;color:#999999;}
    }
    .wt_detail_wrap_c{
      .wrap_c_line{
        display: flex;
        font-size:12px;
        color:#333333;
        margin-bottom: 10px;
        p:nth-child(1){
          flex:1;
        }
        p:nth-child(2){
          flex:2;
        }
      }
    }
  }
  .wt_detail_centent{padding:10px 0;font-size:15px;color:#333333;}
  .wt_icon{margin-bottom:10px;}
  .source_p{
    font-size:12px;
    color:#999999;
    text-align: center;
    &::before,&::after{
      content:'';
      width:10%;
      height:1px;
      background-color:#cccccc;
      vertical-align: middle;
      display: inline-block;
    }
    &::before{margin-right:10px;}
    &::after{margin-left:10px;}
  }
  .znTestBtn{
    width:100%;
    height:44px;
    line-height: 44px;
    text-align: center;
    background-color:#F44D4D;
    border-radius: 5px;
    font-size:18px;
    color:#ffffff;
    margin-top:20px;
  }
}
.wt_detail_fail{
  padding:30px 0;
  .fail_icon{
    margin:0px auto 10px;
    display: block;
    width:1.65rem;
    height:1.49rem;
  }
  .fail_promt{
    font-size:15px;
    color:#333333;
    text-align: center;
    line-height: 1.5;
    span{color:#F44D4D;}
  }
}
.wt_detail_success{
  .wt_detail_item{
    padding:15px;
    border-bottom:5px solid #F0F0F0;
    &:nth-last-child(1){border-bottom:none;}
    .item_top{
      display: flex;
      justify-content: space-between;
      align-items:center;
      margin-bottom:10px;
      .item_top_l{
        .user_icon{
          width:30px;
          height:30px;
          border-radius: 50%;
        }
        span{
          font-size:15px;
          color:#999999;
          margin-left:7px;
        }
      }
      .item_top_r{font-size:12px;color:#999999;}
    }
    .item_content{
      position: relative;
      p{
        font-size:12px;color:#333333;line-height: 1.8;overflow : hidden;
      }
      .more_bg{
        -webkit-mask-image: linear-gradient(rgba(255,255,255,1) 20%,rgba(255,255,255,0));
        height:60px;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-line-clamp: 3;
        // -webkit-box-orient: vertical;
      }
      .more_btn{
        font-size:15px;
        line-height: 1.7;
        color:#F44D4D;
        width:100%;
        text-align: center;
        bottom:0;
        &::before{
          content:'>>';
          margin-right:5px;
        }
        &::after{
          content:'<<';
          margin-left:5px;
        }
      }
    }
  }
}
.Reply_container{
  flex-shrink: 0;
  width:100%;
  .Reply_wrap{
    display: flex;
    height:50px;
    align-items: center;
    padding:0 10px;
    background-color:#f2f2f2;
    border-top:1px solid #e2e2e2;
    .updataFile{
      width:24px;
      height:20px;
      background:url('../../static/images/fileImg.png') no-repeat;
      background-size:100% 100%;
      margin-right:10px;
      display: block;
    }
    .importMsg{
      display: block;
      flex:1;
      height:30px;
      background-color:#ffffff;
      border:none;
      border-radius: 5px;
      font-size:15px;
      color:#333333;
      padding:0 5px;
      box-sizing: border-box;
      outline:none;
    }
    .enterMsg{
      width:57px;
      height:30px;
      line-height: 30px;
      background-color:#F44D4D;
      border-radius: 5px;
      font-size:15px;
      color:#ffffff;
      margin-left:5px;
    }
  }
}
.pormtUpdate_wrap{
  width:300px;
  padding:10px;
  text-align: center;
  margin:0 auto;
  border-radius: 5px;
  position: relative;
  .zm_icon{
    width:60px;
    height:60px;
    margin:10px 0;
  }
  p{font-size:15px;color:#333333;}
  .pormtUpdate_btn{
    width:250px;
    height:44px;
    line-height: 44px;
    background-color:#F44D4D;
    color:#ffffff;
    font-size:18px;
    margin-top:20px;
    border-radius: 5px;
    display: inline-block;
  }
  .pormtUpdate_close{
    width:15px;
    height:15px;
    background:url('../../static/images/close.png') no-repeat;
    background-size:100% 100%;
    position: absolute;
    right:10px;
    top:10px;
  }
}
.importPhone{
  width:200px;
  height:30px;
  font-size:14px;
  color:#333333;
  border:none;
  display: block;
  overflow: hidden;
  outline: none;
  padding-left:5px;
}
.border2{
  box-shadow: 0 0 2px #e8e8e8;
  overflow: hidden;
  border-radius: 5px;
  display: inline-block;
  margin:10px auto;
}
</style>
