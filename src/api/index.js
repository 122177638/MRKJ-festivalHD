// 接口地址
let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
  // 干一些线上才要做的事情
  baseUrl = 'https://hy.yixueqm.com/activity/zhongqiu/index.php/'
}
if (process.env.NODE_ENV === 'development') {
  // 干一些测试时不可告人的事情
  baseUrl = 'https://hy.yixueqm.com/activity/zhongqiu/index.php/'
}
// 登录接口
export const loginApi = (() => { return baseUrl + 'Home-Interface-doAction' })()
// 问题列表
export const wtListApi = (() => { return baseUrl + 'Home-Interface-mainlistbyac' })()
// 提交问题
export const wtApi = (() => { return baseUrl + 'Home-Interface-addaskbyac' })()
// 问题详情
export const wtDetailApi = (() => { return baseUrl + 'Home-Interface-tarotindex' })()
// 评论
export const pingApi = (() => { return baseUrl + 'Home-Interface-tarotreplys' })()
// 提交回复
export const importApi = (() => { return baseUrl + 'Home-Interface-addAskReply' })()

// 统计接口--应用下载
export const updateTJApi = (() => { return baseUrl + 'Home-Interface-index_yyxz' })()
// 统计接口--自测
export const zcTJApi = (() => { return baseUrl + 'Home-Interface-index_zc' })()
// 统计接口--马上提问
export const twTJApi = (() => { return baseUrl + 'Home-Interface-index_mstw' })()
// 统计接口--马上提问浮动
export const tw2TJApi = (() => { return baseUrl + 'Home-Interface-index_mstw_fd' })()
// 统计接口--下载APP
export const update2TJApi = (() => { return baseUrl + 'Home-Interface-index_xzzmApp' })()
// 统计接口-- 智能测算
export const zncsTJApi = (() => { return baseUrl + 'Home-Interface-tj_zncs' })()
// 统计接口-- 首页分享
export const syfxTJApi = (() => { return baseUrl + 'Home-Interface-index_fx' })()

export default{
  loginApi,
  wtListApi,
  wtApi,
  wtDetailApi,
  pingApi,
  importApi,
  // 统计
  updateTJApi,
  zcTJApi,
  twTJApi,
  tw2TJApi,
  update2TJApi,
  zncsTJApi,
  syfxTJApi
}
