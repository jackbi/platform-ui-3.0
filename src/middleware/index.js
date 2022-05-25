/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 15:12:48
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-23 14:09:10
 * @FilePath: /magus-platform-ui-3.0/src/middleware/index.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
import '@/router/routerFilter';
import { createI18n } from 'vue-i18n';
import enElement from 'element-plus/es/locale/lang/en';
import zhCNElement from 'element-plus/es/locale/lang/zh-cn';
import localEn from '../common/lang/en';
import localZhCN from '../common/lang/zhCN';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import magusUI from '@maguscloud/maguscloud-plus/packages';
import magusUI from '@maguscloud/maguscloud-plus';
import '@maguscloud/maguscloud-plus/lib/style.css';

const catchUtils = magusUI.exportApi.catchUtil;

if (!catchUtils.getLocalItem('language')) {
  catchUtils.setLocalItem('language', 'zh');
}

let elementLang;

if (catchUtils.getLocalItem('language')) {
  switch (catchUtils.getLocalItem('language')) {
    case 'zh':
      elementLang = zhCNElement;
      break;
    case 'en':
      elementLang = enElement;
      break;
  }
} else {
  elementLang = zhCNElement;
}

const i18n = createI18n({
  legacy: false,
  locale: catchUtils.getLocalItem('language') || 'zh', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    zh: {
      ...magusUI.exportApi.lang.zhCN,
      // ...zhCNElement,
      ...localZhCN
    }, // 中文语言包
    en: {
      ...magusUI.exportApi.lang.en,
      // ...enElement,
      ...localEn
    } // 英文语言包
  },
  silentTranslationWarn: true
});

const middleware = {
  ElementPlus,
  magusUI,
  i18n,
  elementLang
};

export default middleware;
