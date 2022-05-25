/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 15:14:48
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:12:36
 * @FilePath: /magus-platform-ui-3.0/src/router/routerFilter.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
import router from './index';
import magusUI from '@maguscloud/maguscloud-plus';
// import magusUI from '@maguscloud/maguscloud-plus/packages';
import Cookie from 'js-cookie';

const whiteList = ['/login', '/license', '/test'];

let catchUtils = magusUI.exportApi.catchUtil;
if (Cookie.get('auth_token')) {
  catchUtils.setLocalItem('token', Cookie.get('auth_token'));
}

// let tenant = magusUI.exportApi.commonUtils.getQueryVariable('tenant')
// if (tenant) {
//   catchUtils.setLocalItem('tenant', tenant)
// }

router.beforeEach((to, from, next) => {
  if (Cookie.get('auth_token')) {
    if (!catchUtils.getLocalItem('token')) {
      catchUtils.setLocalItem('token', Cookie.get('auth_token'));
    }
    if (to.path === '/login') {
      next({
        path: '/'
      });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {});
