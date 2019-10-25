# Goal

针对移动端活动 H5 快速开发需求，基于 react，搭建的开发框架。

## 使用

git clone 即可

## Available Scripts

### `npm dev`

默认是 [http://localhost:3000](http://localhost:3000)

### `npm run build-test`

打包至测试环境

# TODO

分析包大小命令

## Features

- react-router
- 预编译器，支持 stylus、less、sass
- 移动端适配使用 `src/assets/rem.js`
- 集成 [ant-design-mobile UI 组件](https://mobile.ant.design)
- 拓展[原有脚手架环境变量](https://www.html.cn/create-react-app/docs/adding-custom-environment-variables/)，支持自定义环境
- 集成 Axios 于 `src/utils/requests.js`。

### 预编译器配置

默认只支持 stylus，若需修改，在 `/config/webpack.config.js` 中修改 `useStylus` 字段。

如同时支持 stylus 和 less 可改为：

```js
const useStylus = ['stylus', 'less']
```

注意安装对应预处理包和 loader 包 如 stylus 需要 `cnpm i stylus stylus-loader`

### 拓展环境变量

在原有脚手架基础上拓展多环境支持，根据环境不同加载不同变量。可参考项目添加自定义环境。注意：

1. 通用变量放在 `.env` 文件中，如接口加密字符串，网站标题等，变量适用于所有环境。
2. 需要区分环境的变量放入对应 `.env` 文件中。如接口 API
3. 项目中通过 `process.env.REACT_APP_SECRET_CODE` 方式访问。

### 接口请求

基本使用：

```js
import request from '@/utils/request'

const body = {
  // 缺省值 post
  method: 'post',
  // 必传
  url:'user/get',
  data:{
    id:'321'
  }
  // 可传入header
  header:{}
  // 是否开启接口loading，缺省值 true
  loading: true,
  // 是否开启接口报错Toast，缺省值 false
  errToast: false,
}
request(body).then(res => {
  this.setState({ userInfo:res.data })
})

```
