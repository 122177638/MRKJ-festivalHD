import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    iswxLogin: false,
    uuid: localStorage.getItem('uuid'),
    HBshow: sessionStorage.getItem('HBshow'),
    openid: localStorage.getItem('openid'),
    isapp: sessionStorage.getItem('isapp'),
    isSelf: sessionStorage.getItem('isSelf')
  },
  mutations: {
    setUUID (state, uuid) {
      state.uuid = uuid;
      localStorage.setItem('uuid', state.uuid)
    },
    login (state, openid) {
      state.openid = openid;
      localStorage.setItem('openid', state.openid)
    },
    HBisShow (state, show) {
      state.HBshow = show;
      sessionStorage.setItem('HBshow', state.HBshow)
    },
    isapp (state, isapp) {
      state.isapp = isapp;
      sessionStorage.setItem('isapp', state.isapp)
    },
    setwxShare (state, wxShare) {
      state.wxShare = wxShare;
      localStorage.setItem('wxShare', state.wxShare)
    }
  }
})
