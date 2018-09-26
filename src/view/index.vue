
<template>
  <div class="index_container">
	<main ref="scrollView">
	  <div class="index_banner"><img
		src="../../static/images/banner.png"
		width="100%"
		alt=""></div>
	  <section class="index_wrap bdb10" v-if="!this.$store.state.isapp || this.$store.state.isSelf">
		<nav class="index_top_nav">
		  <a
			href="javascript:;"
			class="nav_item" @click="TJwebApp()">
			<figure><img
			  src="../../static/images/zhiming.png"
			  class="nav_icon"
			  alt=""></figure>
			<div class="nav_ms">
			  <h3>应用下载</h3>
			  <p>八字运势 在线解答</p>
			</div>
		  </a>
		  <a
			href="javascript:;"
			class="nav_item" @click="TJwebApp2()">
			<figure><img
			  src="../../static/images/zice.png"
			  class="nav_icon"
			  alt=""></figure>
			<div class="nav_ms">
			  <h3>在线算命</h3>
			  <p>贵人事业 自我解读</p>
			</div>
		  </a>
		</nav>
		<div
		  class="tiwenBtn"
		  @click="tiwenShowEvent(1)">马上提问</div>
	  </section>
	  <section class="ping_container">
		<ul class="ping_wrap">
		  <li class="ping_item" v-for="item in wtListData" :key="item.smAskQuestionId" @click="navigateToDetailEvent(item)">
			<div class="item_top">
			  <div class="item_l">
				<img
				  :src="item.userHeadUrl?item.userHeadUrl:userImg"
				  class="user_icon"
					crossOrigin = "Anonymous"
				  alt="">
				<span>{{item.userName}}</span>
			  </div>
			  <div class="item_r">{{item.askTime}}</div>
			</div>
			<p class="ping_content">{{item.queDes}}</p>
		  </li>
		</ul>
		<Load-more :tip="!moreShow?'正在加载':'我是有底线的'" :show-loading="!moreShow"></Load-more>
	  </section>
	</main>
	<!-- updataapp -->
	<aside class="update_app_container" v-if="!this.$store.state.isapp || this.$store.state.isSelf">
	  <div class="update_app_wrap">
		<a
		  href="javascript:;" 
			@click="TJwebApp5()"
		  class="update_app_btn">下载知命APP 查看更多</a>
	  </div>
	</aside>
	<!-- tiwen -->
	<aside class="float_container" v-if="!this.$store.state.isapp || this.$store.state.isSelf">
	  <div
		class="float_wrap"
		@click="tiwenShowEvent()">马上<br>提问</div>
	</aside>
	<!-- tiwenPopup -->
	<aside :class="['tiwen_container',tiwenShow?'on':'']">
	  <div class="tiwen_bg"></div>
	  <div class="tiwen_wrap">
		<div
		  class="tiwen_close"
		  @click="tiwenShowEvent()"/>
		<h4 class="tiwen_title">请输入用户信息</h4>
		<ul class="tiwen_content">
		  <li class="flex_item textareaWrap">
			<label
			  class="item_l"
			  for="wenti">输入问题</label>
			<div class="item_r"><textarea
			  id="wenti"
			  v-model="wenti"
			  placeholder="请输入问题描述">
				</textarea>
				</div>
		  </li>
		  <li class="flex_item">
			<label
			  class="item_l"
			  for="username">您的姓名</label>
			<div class="item_r"><input
			  id="username"
			  v-model="username"
			  type="text"
			  placeholder="请输入姓名(可匿名)"></div>
		  </li>
		  <li class="flex_item">
			<label class="item_l">您的性别</label>
			<div class="item_r">
			  <div class="sex_wrap">
				<input
				  id="man"
				  v-model="sex"
				  type="radio"
				  checked
				  value="男">
				<label
				  for="man"
				  class="sexSwitch">男</label>
				<input
				  id="woman"
				  v-model="sex"
				  type="radio"
				  value="女">
				<label
				  for="woman"
				  class="sexSwitch">女</label>
			  </div>
			</div>
		  </li>
		  <li class="flex_item">
			<label
			  class="item_l"
			  for="datetime">出生日期</label>
			<div class="item_r"><input
			  id="datetime"
			  ref="dateView"
			  class="birthday bg_select"
			  readonly
			  placeholder="请选择出生日期"></div>
			  <!-- 使用标签代替input,解决部分华为浏览器placeholder不显示 -->
			  <!-- <div class="item_r"><div class="birthday bg_select" id="datetime" data-id="birthday">请选择出生日期</div></div> -->
		  </li>
		  <li class="flex_item">
			<label
			  class="item_l"
			  for="place">出生地点</label>
			<div class="item_r">
			  <x-address
				:list="addressData"
				@on-shadow-change="onShadowChange"
				class="address bg_select"
				title=""
				value-text-align="left"
				placeholder="请选择出生地点"/>
			</div>
		  </li>
		</ul>
		<div
		  class="submitBtn"
		  @click="submitEvent()">立即提交</div>
	  </div>
	</aside>
	<!-- hongbao -->
	<aside :class="['sharePopup_container',HBShow?'on':'']">
		<div class="sharePopup_bg"></div>
		<div class="sharePopup_wrap">
				<div class="close_sharePopup" @click="sharePopupShowEvent()"></div>
				<div class="sharePopup_top">
						<p>待提现余额</p>
						<h3>{{price}}<span>元</span></h3>
				</div>
				<div class="sharePopup_bottom">
						<p>助力满10元，任意时间均可提现</p>
				</div>
				<div class="placeBtn" @click="shareEvent()"></div>
				<a :href="'https://hy.yixueqm.com/activity/zhongqiu/index.php/Home-Index-userWxShare?openid='+this.$store.state.uuid" class="myHistory">查看我的分享记录</a>
		</div>
	</aside>
	<!-- 提示分享 -->
	<aside :class="['ts_tc_container',shareShow?'on':'']" @click="shareEvent()">   
			<div class="ts_tc_bg">
					<div class="ts_tc_contnet">点击右上角分享给好友或朋友圈。</div>
			</div>
	</aside>
  </div>
</template>

<script>
	import Calendar from '../../static/js/YD_calendar.min.js';
	import { isweixin, parseQueryString, uuid } from '../config/utils';
	import { XAddress, ChinaAddressV4Data, LoadMore } from 'vux';
	import { wxInit } from '../config/lib.js'
	export default {
		components: {
			XAddress,
			LoadMore
		},
		data () {
			return {
				tiwenShow: false,
				shareShow: false,
				HBShow: false,
				moreShow: false,
				userImg: 'http://qiniu.ddznzj.com/media/qc/180921/180921164236770.png',
				addressData: ChinaAddressV4Data,
				addressValue: [],
				sex: '男',
				price: '',
				username: '',
				wenti: '',
				wtListData: [],
				scrollView: '',
				page: 0,
				scrollTop: 0 
			}
		},
		mounted () {
			this.isInitEvent();
			new Calendar().init('#datetime');
			this.loginEvent();
			this.scrollView = this.$refs.scrollView;
			this.scrollView.addEventListener('scroll', this.Pulluploading, false);
		},
		activated () {
			if (this.scrollTop > 0) {
				this.scrollView.scrollTo(0, this.scrollTop);
			}
		},
		methods: {
			loginEvent () {
				this.$vux.loading.show({text: '加载中...'})
				this.$http.post(this.$api.loginApi, {ldf62sing: this.$store.state.uuid, providername: 'acweb'})
				.then((response) => {
					this.$store.commit('login', response.data.userId);
					this.ajaxEvent();
				})
			},
			isInitEvent () {
				var JsonURL = parseQueryString(location.href);
				if (JsonURL.isapp) { this.$store.commit('isapp', JsonURL.isapp); }
				if (isweixin) {
					if (JsonURL.openid) {
						this.$store.commit('setUUID', JsonURL.openid);
					} else {
						if (localStorage.getItem('uuid')) {
							this.$store.commit('setUUID', localStorage.getItem('uuid'))
							this.$http.post('https://hy.yixueqm.com/activity/zhongqiu/index.php/Home-Index-getWxLogin', {openid: this.$store.state.uuid, url: location.href})
							.then((response) => {
								this.price = Number(response.data.price).toFixed(2);
								// 红包弹窗
								if (!this.$store.state.HBshow) {
									this.$store.commit('HBisShow', 1)
									this.HBShow = !this.HBShow;
								}
								wxInit(response.data, () => {
									this.$http.post('https://hy.yixueqm.com/activity/zhongqiu/index.php/Home-Index-userWx', {openid: this.$store.state.uuid})
									.then((response) => {
											// alert('分享成功')
									})
								})
							})
						} else {
							window.location.href = 'https://hy.yixueqm.com/activity/zhongqiu/index.php/Home-Index-wxLogin'
						}
					}
				} else {
					if (localStorage.getItem('uuid')) {
						this.$store.commit('setUUID', localStorage.getItem('uuid'))
					} else {
						this.$store.commit('setUUID', uuid(8, 16))
					}
				}
			},
			ajaxEvent () {
				this.$http.post(this.$api.wtListApi, {uid: this.$store.state.openid, page: this.page})
				.then((response) => {
					if (response.data.code) {
						let data = JSON.parse(response.data.content)
						this.wtListData = this.wtListData.concat(data)
					} else {
						this.moreShow = !this.moreShow;
						this.scrollView.removeEventListener('scroll', this.Pulluploading, false);
					}
					this.$vux.loading.hide()
				})
			},
			onShadowChange (ids, 	names) {
				this.addressValue = names[0] + names[1] + names[2];
			},
			Pulluploading () {
				this.scrollTop = this.scrollView.scrollTop;
				var scrollHeight = this.scrollView.scrollHeight;
				var clientHeight = this.scrollView.clientHeight;
				if (scrollHeight - clientHeight < this.scrollTop + 1) {
					if (!this.throttle_B) {
						setTimeout(() => {
								this.page++;
								console.log(this.page)
								this.ajaxEvent();
								this.throttle_B = false;
						}, 200)
						this.throttle_B = true;
					} else {
						return false;
					}
				}
			},
			tiwenShowEvent (type) {
				this.tiwenShow = !this.tiwenShow;
				if (this.tiwenShow) {
					type ? this.TJwebApp3() : this.TJwebApp4();
				}
			},
			sharePopupShowEvent () {
				this.HBShow = !this.HBShow;
			},
			shareEvent () {
				this.shareShow = !this.shareShow;
				if (this.shareShow) {
					this.TJwebApp6();
				}
			},
			navigateToDetailEvent (item) {
				this.$router.push({path: '/wtDetail', query: {wtid: item.smAskQuestionId}})
			},
			submitEvent () {
				let birthday = this.$refs.dateView.getAttribute('data-cname');
				if (this.wenti === '') {
					this.$vux.toast.text('请输入问题描述', 'middle')
					return false;
				}
				if (this.username === '') {
					this.username = '匿名'
				} else if (!/^[\u4E00-\u9FA5]+$/.test(this.username)) {
					this.$vux.toast.text('请输入中文姓名', 'middle')
					return false;
				} else if (this.username.length > 4 || this.username.length < 2) {
					this.$vux.toast.text('名字长度有误(2~4个字符)', 'middle')
					return false;
				}
				if (birthday == null) {
					this.$vux.toast.text('请选择出生日期', 'middle')
					return false;
				}
				if (this.addressValue == '') {//eslint-disable-line
					this.$vux.toast.text('请选择出生地点', 'middle')
					return false;
				}
				this.$vux.loading.show({text: '加载中...'})
				this.$http.post(this.$api.wtApi, {
					ques: this.wenti, 
					username: this.username, 
					sex: this.sex,
					birthday: birthday,
					area: this.addressValue,
					uid: this.$store.state.openid
				}).then((response) => {
					console.log(response)
					if (response.data.code) {
						this.$vux.loading.hide();
						this.$vux.toast.show({text: '提交成功', time: 1000})
						this.$router.push({path: '/submitEnd', query: {wtid: response.data.tip}})
					}
				})
			},
			TJwebApp () {
				this.TJEvent(this.$api.updateTJApi, 'http://android.myapp.com/myapp/detail.htm?apkName=com.mrkj.sm')
			},
			TJwebApp2 () {
				this.TJEvent(this.$api.zcTJApi, 'http://www.yixueqm.com/zhiming/')
			},
			TJwebApp3 () {
				this.TJEvent(this.$api.twTJApi)
			},
			TJwebApp4 () {
				this.TJEvent(this.$api.tw2TJApi)
			},
			TJwebApp5 () {
				this.TJEvent(this.$api.update2TJApi, 'http://android.myapp.com/myapp/detail.htm?apkName=com.mrkj.sm')
			},
			TJwebApp6 () {
				this.TJEvent(this.$api.syfxTJApi)
			},
			// 统计
			TJEvent (api, link) {
				this.$http.post(api)
				.then((response) => {
					if (response.data) { console.log(1) }
					if (link)window.location.href = link
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url('../../static/css/YD_calendar.min.css');
	.index_container{
		height:100vh;
		display: flex;
		flex-direction: column;
	}
	main{
		flex: 1;
		box-sizing: border-box;
		overflow-y:scroll;
		-webkit-overflow-scrolling: touch;
	}
	.index_wrap{
		padding:20px 15px 10px;
		&.bdb10{border-bottom: 10px solid #f0f0f0;}
		.index_top_nav{
			display: flex;
			.nav_item{
				width: 50%;
				display: flex;
				align-items: center;
				.nav_icon{
					width:40px;
					height:40px;
				}
				.nav_ms{
					margin-lefT:10px;
					h3{font-size:17px;color:#333333;font-weight: 400;}
					p{font-size:12px;color:#999999;margin-top:5px;}
				}
			}
		}
		.tiwenBtn{
			width:100%;
			height:45px;
			line-height: 45px;
			text-align: center;
			font-weight: 700;
			color:#ffffff;
			background-color: #F44D4D;
			border-radius: 6px;
			margin-top: 15px;
			font-size:18px;
			box-shadow: 0 3px 3px #AF3232;
		}
	}
	.ping_container{
			overflow: hidden;
		.ping_wrap{
			.ping_item{
				padding:10px 15px;
				border-bottom:5px solid #f0f0f0;
				&:nth-last-child(1){border-bottom: none;}
				.item_top{
					display: flex;
					justify-content: space-between;
					align-items:center;
					.item_l{
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
					.item_r{font-size:12px;color:#999999;}
				}
				.ping_content{
					margin-top:10px;
					font-size:15px;
					color:#333333;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
	}
	.update_app_container{
		width:100%;
		flex-shrink: 0;
		.update_app_wrap{
					padding:5px 15px;
					background-color:#ffffff;
			border-top:1px solid #f0f0f0;
			.update_app_btn{
				height:44px;
				line-height: 44px;
				text-align:center;
				font-size:17px;
				color:#ffffff;
				background-color:#F44D4D;
				border-radius: 5px;
				display: block;
			}
		}
	}
	.float_container{
		position:fixed;
		right:15px;
		bottom:120px;
		.float_wrap{
			display: flex;
			justify-content: center;
			align-items: center;
			width:65px;
			height:65px;
			background-color:#F44D4D;
			font-size:18px;
			color:#ffffff;
			font-weight: 700;
			border-radius: 50%;
			box-shadow: 0 3px 3px #cec1c1;
			animation: floatBtn .8s infinite ease-in-out;
		}
		@keyframes floatBtn {
			0%{transform: scale(1)}
			50%{transform: scale(1.1)}
			100%{transform: scale(1)}
		}
	}
	.tiwen_container{
	  position: fixed;
	  z-index: 99;
	  width:100%;
	  height:100%;
	  top:0;left:0;
	  display: none;
	  &.on{
				display: block;
				.tiwen_wrap{
					animation: tiwenBox .35s forwards ease-in-out;
				}
				@keyframes tiwenBox {
					0%{transform: scale(.2)}
					100%{transform: scale(1)}
				}
	  }
	  .tiwen_bg{
		  position: absolute;
		  width:100%;
		  height:100%;
		  background-color:rgba(0, 0, 0,0.7);
	  }
	  .tiwen_wrap{
		  width:90%;
					overflow: hidden;
		  left:50%;
		  top:10%;
		  margin-left:-45%;
		  position: absolute;
		  background-color:#ffffff;
		  border-radius: 6px;
		  .tiwen_close{
			  width:15px;
			  height:15px;
			  padding:5px;
			  background:url('../../static/images/close.png') center center no-repeat;
			  background-size:15px;
			  position: absolute;
			  right:10px;top:20px;
		  }
		  .tiwen_title{
			  padding:20px 0;
			  font-size:18px;
			  color:#000000;
			  font-weight: 400;
			  text-align: center;
		  }
		  .tiwen_content{
			  padding:0 10px;
			  box-sizing: border-box;
			  .flex_item{
				  display: flex;
				  margin-bottom:10px;
				  align-items: center;
				  font-size:15px;
				  color:#000000;
				  &:nth-last-child(1){margin-bottom:0;}
				  &.textareaWrap{align-items: flex-start;}
				  .item_l{
					  display: block;
					  flex-shrink: 0;
				  }
				  .item_r{
					  margin-left:8px;
					  flex: 1;
					  display: flex;
					  textarea{
						  flex: 1;
						  outline: none;
						  height:95px;
						  padding:5px 10px;
							font-size:15px;
						  color:#000000;
							border: 1px solid #E6E6E6;
							overflow: hidden;
					  }
					  input,.address{
						  flex: 1;
						  height:40px;
						  
						  padding:0 20px 0 10px;
						  border: 1px solid #E6E6E6;
						  font-size:15px;
						  color:#000000;
						  overflow: hidden;
							outline: none;
						}
						.address{line-height: 40px;}
					  .sex_wrap{
						  padding:0 10px;
						  box-sizing: border-box;
						  display: flex;
						  width: 50%;
						  justify-content: space-between;
						  .sexSwitch{
							  height:100%;
							  height:35px;
							  line-height: 35px;
							  display: block;
							  &::before{
								  content:'';
								  width:15px;
								  height:15px;
								  background:url('../../static/images/weixuanzhong.png') no-repeat;
								  background-size:100% 100%;
								  display: inline-block;
								  vertical-align: middle;
								  margin-right:10px;
							  }
						  }
						  input[type="radio"]{
							  display: none;
						  }
						  input[type="radio"]:checked+label{
							  &::before{
								  content:'';
								  width:15px;
								  height:15px;
								  background:url('../../static/images/xuanzhong.png') no-repeat;
								  background-size:100% 100%;
								  display: inline-block;
								  vertical-align: middle;
								  margin-right:10px;
							  }
						  }
					  }
					  .bg_select{
						  background:url('../../static/images/jiantou.png') 97% center no-repeat;
						  background-size:10px 18px;
					  }
					  .birthday{
						width: 100%;
						height:40px;
						line-height: 40px;
						border: 1px solid #E6E6E6;
						padding-left:10px;
					  }
				  }
			  }
		  }
		  .submitBtn{
			  width:100%;
			  height:44px;
			  line-height: 44px;
			  text-align: center;
			  font-size:18px;
			  color:#ffffff;
			  background-color:#F44D4D;
			  margin-top:20px;
		  }
	  }
	}
	.sharePopup_container{
		width:100%;
		height:100%;
		position: fixed;
		z-index: 99;
		left:0;
		top:0;
		display: none;
		&.on{
			display: block;
			.sharePopup_wrap{
				animation: sharePopup .3s forwards ease-in-out;
			}
			@keyframes sharePopup {
				0%{transform: scale(.3)}
				100%{transform: scale(1)}
			}
		}
		.sharePopup_bg{
			width:100%;
			height:100%;
			background-color:rgba(0,0,0,.7);
			position: absolute;
			left:0;
			top:0;
		}
		.sharePopup_wrap{
			width:5.6rem;
			position: relative;
			height:7.92rem;
			left:50%;
			top:12%;
			background:url('../../static/images/img_beijing2.png') no-repeat;
			background-size:100% 100%;
			margin-left:-2.8rem;
			border-radius: 0.25rem;
			.sharePopup_top{
				text-align: center;
				position: absolute;
				top:1.1rem;
				width: 100%;
				p{font-size:0.34rem;color:#333333;}
				h3{font-size:1.06rem;color:#000000;font-weight: 400;}
				h3 span{font-size:0.46rem;color:#000000;font-weight: 400;}
			}
			.sharePopup_bottom{
				position: absolute;
				text-align: center;
				width:100%;
				font-size:0.24rem;
				color:#36a2cc;
				top:3.5rem;
			}
		}
		.close_sharePopup{
			width:0.56rem;
			height:0.56rem;
			position: absolute;
			background:url('../../static/images/btn_close.png') no-repeat;
			background-size:100% 100%;
			right:0;
			top:0;
			z-index: 2;
		}
		.placeBtn{
			width:4.38rem;
			height:1rem;
			background:url('../../static/images/img_btn.png') no-repeat;
			background-size:100% 100%;
			position: absolute;
			left:50%;
			top:5.5rem;
			margin-left:-2.19rem;
			animation: Pscalc .8s infinite ease-in-out;
		}
		.myHistory{
			position: absolute;
			width: 100%;
			top:6.6rem;
			text-align: center;
			color:#36a2cc;
			font-size: 12px;
			display: block;
		}
		@keyframes Pscalc{
			0%{transform:scale(1)}
			50%{transform: scale(1.05)}
			100%{transform: scale(1)}
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
	.weui-cell{padding:0 !important;}
</style>
