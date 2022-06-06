/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 13:49:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-06-06 10:31:59
 * @FilePath: /magus-platform-ui-3.0/src/main.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import middleware from './middleware/index';
import dictLibrary from './common/dict';
import paramsLibrary from './common/params';
import * as filters from '@/common/plugin/filters';

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$magusCloudApi = middleware.magusUI.exportApi;
app.config.globalProperties.$dicts = dictLibrary;
app.config.globalProperties.$params = paramsLibrary;
app.config.globalProperties.$filters = filters;

// console.log(import.meta.env.VITE_APP_BASE_URL, 'VITE_APP_BASE_URL');

// console.log(import.meta.env.MODE);
// console.log(middleware);

app
  .use(router)
  .use(pinia)
  .use(middleware.magusUI)
  .use(middleware.ElementPlus, { locale: middleware.elementLang })
  .use(middleware.i18n)
  .mount('#app');
