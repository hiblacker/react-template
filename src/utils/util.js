/**
 * 通用工具
 */
import * as project from './util.project'

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
function debounce(func, wait, immediate) {
  let timeout
  let args
  let context
  let timestamp
  let result

  function later() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = null
          args = null
        }
      }
    }
  }

  return function noname(...args2) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args2)
      context = null
    }

    return result
  }
}

/**
 * @param {string} url
 * @param {object} e
 */
function openUrl(url, e) {
  const strWindowFeatures = `
            menubar=no,
            location=yes,
            resizable=yes,
            scrollbars=no,
            status=no,
            width=375,
            height=666
        `
  const mywindow = window.open(url, '_blank', strWindowFeatures)
  if (e) {
    mywindow.moveTo(e.screenX + 60, 100)
  }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
function timeFormat(fmt) {
  let time = fmt
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(time))
    time = time.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length))
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(time))
      time = time.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(String(o[k]).length),
      )
  })

  return time
}

/**
 * 获取url参数
 *
 * @param    {string}  variable  参数
 * @param    {string}  url       不传默认使用当前网页网址
 *
 * http://www.test.com/index?id=1&image=awesome.jpg
 *
 * getQueryVariable("id") 返回 1
 * getQueryVariable("image") 返回 "awesome.jpg"
 * getQueryVariable() 返回 {id:'1', image:'awesome.jpg'}
 *
 */
function getUrlParam(variable, url) {
  const query = url || window.location.search.substring(1)
  const vars = query.split('&')
  const params = {}
  for (let i = 0; i < vars.length; i += 1) {
    const [key, value] = vars[i].split('=')
    params[key] = value
    if (key === variable) {
      return value
    }
  }
  if (variable) return false
  return params
}

export { project, debounce, openUrl, timeFormat, getUrlParam }
