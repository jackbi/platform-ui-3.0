/*
 * @Description: 应用注册列表
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-03-18 13:38:42
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:12:27
 * @FilePath: /magus-platform-ui-3.0/src/apps/app.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */

// import axios from 'axios';
import magusUI from '@maguscloud/maguscloud-plus';
// import magusUI from '@maguscloud/maguscloud-plus/packages';
// import appApi from '../api/apps'
// import messageApi from '../api/message'
import { usePlatformStore } from '@/store/modules/index.js';

const resetSetItem = function (key, newVal) {
  if (key === 'watchAppSet') {
    // 创建一个StorageEvent事件
    const newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent(
          'setApp',
          false,
          false,
          k,
          null,
          val,
          null,
          null
        );

        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    };
    return storage.setItem(key, newVal);
  }
};

export default async function getApp() {
  // const { GET_APPS_LIST } = platformStore
  // if (timer) {
  //   clearInterval(timer)
  // }
  return new Promise((resolve, reject) => {
    GET_APPS_LIST(magusUI.exportApi)
      .then((res) => {
        resetSetItem('watchAppSet', JSON.stringify(res));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// let apps = [
//   // {
//   //   name: 'vue app',
//   //   entry: import.meta.env.MODE === 'production' ? '//182.92.94.164:10000' : '//localhost:10000',
//   //   container: '#qiankun-vue',
//   //   activeRule: '/qiankunVue'
//   // }
// ];

// export default apps;
