/**
 * vite内置less，和sass，
 * 但是如果使用默认配置，那么在给less，和sass文件起名字的时候，
 * 文件名后缀要使用.module.less,这样vite才能正确识别
 * */ 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 文件别名配置resolve.alias
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, 'src') },
    ]
  },
  // less设置全局变量css.preprocessorOptions
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 此处也可设置直角、边框色、字体大小等
          // 'primary-color': '#ffae18',// 全局主
          // 'link-color': '#1890ff', // 链接色
          // 'success-color': '#52c41a', // 成功色
          // 'warning-color': '#faf614', // 警告色
          // 'error-color': '#f5222d', // 错误色
        },
        // 文件覆盖样式报错无效
        // additionalData: `@import "${path.resolve(__dirname, 'src/theme/index.module.less')}";`,
        javascriptEnabled: true,
      }
    },
  },
  // JSX
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      }
    }
  }
})
