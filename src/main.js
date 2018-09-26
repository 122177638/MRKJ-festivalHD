// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './config/axios'
// import VueLazyload from 'Vue-lazyload'
import './config/rem'
import './assets/css/common.css'
import api from './api'
// 解决移动端300ms事件延迟 -----input标签有兼容问题，需双击才能选中
// import FastClick from 'fastclick'
// FastClick.attach(document.body)
// vue配置
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = axios
// VueLazyload
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: '',
//   loading: '',
//   attempt: 1
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
