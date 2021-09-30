import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from '@/views/app/App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
moment.locale('zh-cn');

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
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
