import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from '@/views/app/App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

/*
 * React.StrictMode(严格模式)
 * 识别不安全的生命周期组件
 * 有关旧式字符串ref用法的警告
 * 关于使用废弃的 findDOMNode 方法的警告
 * 检测意外的副作用
 * 检测过时的 context API 
 * */ 
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
