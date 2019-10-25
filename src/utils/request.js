// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { codeMessage } from './netErrorMap'

const salt = process.env.REACT_APP_SALT
const baseURL = process.env.REACT_APP_API

class HTTPRequest {
  constructor() {
    this.options = {
      method: 'post',
      url: '',
      // 请求参数
      data: {},
      // 是否启用接口loading
      loading: true,
      // 是否启用错误弹窗
      errToast: false,
    }
    // 存储请求队列
    this.queue = {}
  }

  // 签名
  sign = (body, timestamp) => {
    if (typeof body !== 'object') throw new Error('签名入参错误：body不为对象')
    const str = Object.keys(body)
      .sort()
      .reduce((sum, next) => sum + next + body[next], '')
      .replace(/\s/g, '')
    const beforeMd5 = Base64.encode(String(timestamp)) + salt + str
    const sign = md5(beforeMd5)
    return sign
  }

  // 请求拦截
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        // 在发送请求之前做些什么
        if (this.options.loading) Toast.loading('loading', 0)
        return config
      },
      error => {
        console.error('请求拦截器报错')
        console.errror(error)
        // 对请求错误做些什么
        return Promise.reject(error)
      },
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      res => {
        const { data } = res
        if (data.code !== 0) {
          if (this.options.loading) Toast.hide()
          if (this.options.errToast) Toast.offline(data.message, 3)
          return Promise.reject(res)
        }
        if (this.options.loading) Toast.hide()
        return data
      },
      error => {
        this.handleError(error)
        // 对响应错误做点什么
        if (this.options.loading) Toast.hide()
        return Promise.reject(error)
      },
    )
  }

  handleError(error) {
    if (!this.options.errToast) return
    if (error && error.response) {
      if (codeMessage[error.response.status]) {
        Toast.fail(codeMessage[error.response.status], 3)
      } else {
        Toast.fail('未知的网络错误', 3)
      }
    } else {
      const dev = process.env.NODE_ENV === 'development'
      const devMsg = '<div>1. 检查接口地址是否拼错<br/>2. 确认后端接口是否部署</div>'
      const prodMsg = '可能是服务器开小差了~'
      const msg = dev ? devMsg : prodMsg
      Toast.fail(msg, 3)
    }
  }

  // 创建实例
  create() {
    const timestamp = parseInt(+new Date() / 1000, 10)
    const conf = {
      baseURL,
      timeout: 20000,
      headers: {
        timestamp,
        signature: this.sign(this.options.data, timestamp),
      },
    }
    return axios.create(conf)
  }

  // 请求实例
  request(options) {
    // 合并请求参数
    this.options = {
      ...this.options,
      ...options,
      header: {
        ...options.header,
      },
      data: {
        ...this.options.data,
        ...options.data,
      },
    }
    const instance = this.create()
    this.interceptors(instance, options.url)
    this.queue[options.url] = instance
    return instance(this.options)
  }
}

function http(obj) {
  return new HTTPRequest().request(obj)
}

export default http
