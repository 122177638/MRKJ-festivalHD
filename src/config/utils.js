
// uuid
export const uuid = function (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = []
  var i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

// 网址参数转JSON
export const parseQueryString = function (url) {
  var regUrl = /^[^?]+\?([\w\W]+)$/
  var regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g
  var arrUrl = regUrl.exec(url)
  var ret = {}
  if (arrUrl && arrUrl[1]) {
    var strPara = arrUrl[1]
    var result
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}
// 时间戳转文字时间
export const timeSwitchString = function (dateTimeStamp) { // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60 // 把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60
  var day = hour * 24
  var week = day * 7
  // var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime() // 获取当前时间毫秒
  var diffValue = now - dateTimeStamp // 时间差
  var result
  if (diffValue < 0) {
    return
  }
  var minC = diffValue / minute // 计算时间差的分，时，天，周，月
  var hourC = diffValue / hour
  var dayC = diffValue / day
  var weekC = diffValue / week
  var monthC = diffValue / month
  if (monthC >= 1 && monthC <= 3) {
    result = ' ' + parseInt(monthC) + '月前'
  } else if (weekC >= 1 && weekC <= 3) {
    result = ' ' + parseInt(weekC) + '周前'
  } else if (dayC >= 1 && dayC <= 6) {
    result = ' ' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC <= 23) {
    result = ' ' + parseInt(hourC) + '小时前'
  } else if (minC >= 1 && minC <= 59) {
    result = ' ' + parseInt(minC) + '分钟前'
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = '刚刚'
  } else {
    var datetime = new Date()
    datetime.setTime(dateTimeStamp)
    var Nyear = datetime.getFullYear()
    var Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
    var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
    // var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    // var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
    // var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
    result = Nyear + '-' + Nmonth + '-' + Ndate
  }
  return result
}
// 活动倒计时 setEndTime 格式2018/08/27 18:00 请勿使用'-'代替'/',在手机上不支持。
// 返回时间数组
export const countDownTime = function (setEndTime) {
  let endTime = new Date(setEndTime).getTime()
  let time = new Date().getTime()

  if (endTime <= time) {
    return []
  } else {
    let HsecondNum = endTime - time
    // let day = Math.floor(HsecondNum / (24 * 3600 * 1000))

    let dd = Math.floor(HsecondNum % (24 * 3600 * 1000))
    let hours = Math.floor(HsecondNum / (3600 * 1000))

    let minutesNum = dd % (3600 * 1000)
    let minutes = Math.floor(minutesNum / (60 * 1000))

    let secondNum = dd % (60 * 1000)
    let second = Math.floor(secondNum / 1000)
    return [hours, minutes, second]
  }
}
// 判断是否为微信
export const isweixin = (function () { 
  var ua = window.navigator.userAgent.toLowerCase(); 
  if (ua.match(/MicroMessenger/i) == 'micromessenger') { //eslint-disable-line
      return true;
  } else { 
      return false;
  } 
})()
