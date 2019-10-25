import React, { useEffect } from 'react'
import './style.styl'
import { Toast, Button } from 'antd-mobile'
import { project, getUrlParam } from '@/utils/util'

function pvReport() {
  if (getUrlParam('report')) {
    project.reporter()
  }
}

const common = {
  img: {
    width: '100%',
    display: 'block',
  },
}

const style = {
  footer: {
    maxWidth: '750px',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
  },
}

function showError() {
  Toast.fail('请求失败', 2)
}
function showloading() {
  Toast.loading('loading', 0, null, false)
  ;[(1, 2)].map(i => (style.a = i))
}

function Index() {
  useEffect(() => {
    pvReport()
  })
  return (
    <div>
      <Button onClick={showloading}>loading</Button>
      <Button onClick={showError}>error</Button>
      <div className="main">
        <img style={common.img} src="//qiniu.lanjinrong.com/FsnpMaJBNdbbMJsbJyhtdy4yw8cX" alt="" />
        <img
          style={{ opacity: 0 }}
          src="//qiniu.lanjinrong.com/Fpq3XE42yGdUJ6rNf681UKK4hQPJ"
          alt=""
        />
      </div>
      <div className="footer">
        <img style={common.img} src="//qiniu.lanjinrong.com/Fpq3XE42yGdUJ6rNf681UKK4hQPJ" alt="" />
      </div>
    </div>
  )
}

export default Index
