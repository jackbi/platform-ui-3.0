/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-03-18 13:27:06
 * @LastEditors: wenbin
 * @LastEditTime: 2022-04-19 11:07:43
 * @FilePath: /magus-platform-ui-3.0/src/apps/index.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
// 一个进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  // setDefaultMountApp,
  // start,
} from 'qiankun'

// 微应用注册信息
import apps from './app'

apps().then((res) => {
  /**
   * 注册微应用
   * 第一个参数 - 微应用的注册信息
   * 第二个参数 - 全局生命周期钩子
   */
  registerMicroApps(res, {
    // qiankun 生命周期钩子 - 微应用加载前
    beforeLoad: (app) => {
      // 加载微应用前，加载进度条
      NProgress.start()
      console.log('before load', app.name)
      return Promise.resolve()
    },
    // qiankun 生命周期钩子 - 微应用挂载后
    afterMount: (app) => {
      // 加载微应用前，进度条加载完成
      NProgress.done()
      console.log('after mount', app.name)
      return Promise.resolve()
    },
  })

  /**
   * 添加全局的未捕获异常处理器
   */
  addGlobalUncaughtErrorHandler((event) => {
    const { message: msg } = event
    // 加载失败时提示
    if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
      ElMessage({
        type: 'error',
        message: '微应用加载失败，请检查应用是否可运行',
      })
      return
    }
  })

  // setDefaultMountApp('/qiankunVue/');
  // start();
})

// 导出 qiankun 的启动函数
// export default start;
