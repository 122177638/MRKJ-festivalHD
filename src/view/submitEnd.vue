<template>
  <div class="submitEnd_container">
    <section class="top_wrap">
      <img
        src="../../static/images/time.png"
        class="time_icon"
        alt="">
      <p class="promt_p">大师回复需要时间，请等候！<br>或你可以点击收藏，方便查看回复。</p>
      <div class="cellBtn" @click="cellEvent()">立即收藏</div>
      <div class="naviBtn" @click="navitoDetails()">查看我的问题详情</div>
    </section>
    <section class="bottom_wrap">
      <img
        src="../../static/images/wancheng_icon.png"
        class="zm_icon"
        alt="">
      <p class="promt_p">建议您下载知命APP，方便查看回复，<br>更有及时消息提醒！</p>
      <a href="http://android.myapp.com/myapp/detail.htm?apkName=com.mrkj.sm" target="_blank" class="updateBtn">下载知命 查看回复</a>
    </section>
    <!-- 提示分享 -->
    <aside :class="['ts_tc_container',shareShow?'on':'']" @click="cellEvent()">   
        <div class="ts_tc_bg">
            <div class="ts_tc_contnet">点击右上角收藏。</div>
        </div>
    </aside>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          shareShow: false,
          wtid: ''
        }
      },
      mounted () {
        this.wtid = this.$route.query.wtid;
      },
      methods: {
        cellEvent () {
          this.shareShow = !this.shareShow;
        },
        navitoDetails () {
          this.$router.push({path: '/wtDetail', query: {wtid: this.wtid}})
        }
      }
    }
</script>

<style lang="scss" scoped>
  .submitEnd_container{
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top_wrap{overflow: hidden;}
  .time_icon{
    margin:50px auto 20px;
    width:60px;
    height:60px;
    display: block;
  }
  .zm_icon{
    width:50px;
    height:50px;
    display: block;
    margin:0 auto 10px;
  }
  .promt_p{
    font-size:15px;
    color:#333333;
    text-align: center;
    line-height: 1.5;
  }
  .updateBtn{
    display: block;
    font-size:15px;
    color:#ffffff;
    background-color:#F44D4D;
    border-radius: 5px;
    width:200px;
    height:44px;
    line-height: 44px;
    text-align: center;
    margin:20px auto;
  }
  .cellBtn{
    font-size:15px;
    color:#333333;
    border:1px solid #cccccc;
    border-radius: 5px;
    width:200px;
    height:44px;
    line-height: 44px;
    text-align: center;
    margin:20px auto;
    &::before{
      content:'';
      width:20px;
      height:20px;
      display: inline-block;
      background:url('../../static/images/shoucang.png') no-repeat;
      background-size:100% 100%;
      vertical-align:sub;
      margin-right:5px;
    }
  }
  /* 提示分享 */
	.ts_tc_container{
		width:100%;
		height:100%;
		background-color:rgba(0,0,0,0.5);
		position: fixed;
		top:0;left:0;
		z-index: 99;
    display: none;
    &.on{display: block;}
		.ts_tc_bg{
			width:100%;
			height:300px;
			background:url('../../static/images/mg_share.png') no-repeat;
			background-size:100% 100%;
		}
		.ts_tc_contnet{
				font-size:18px;
				color:#ffffff;
				padding:180px 130px 30px 90px;
				text-align: center;
		}
  }
  .naviBtn{
    text-align: center;
    width:200px;
    border-radius: 5px;
    margin:0 auto;
    color:#058ca3;
  }
</style>
