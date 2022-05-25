/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-03-31 15:22:50
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 15:25:26
 * @FilePath: /magus-platform-ui-3.0/src/store/modules/index.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
import { defineStore } from 'pinia';
import * as types from '../mutation-types';
import menuApi from '@/api/menus.js';
import userApi from '@/api/users.js';
import appApi from '@/api/apps';
import systemApi from '@/api/system';
import Cookie from 'js-cookie';

const CHECK_URL = function (url) {
  // url= 协议://(ftp的登录信息)[IP|域名](:端口号)(/或?请求参数)
  const strRegex =
    '^((https|http|ftp)://)?' + // (https或http或ftp):// 可有可无
    "(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?" + // ftp的user@  可有可无
    '(([0-9]{1,3}\\.){3}[0-9]{1,3}' + // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
    '|' + // 允许IP和DOMAIN（域名）
    '(localhost)|' + // 匹配localhost
    "([\\w_!~*'()-]+\\.)*" + // 域名- 至少一个[英文或数字_!~*\'()-]加上.
    '\\w+\\.' + // 一级域名 -英文或数字  加上.
    '[a-zA-Z]{1,6})' + // 顶级域名- 1-6位英文
    '(:[0-9]{1,5})?' + // 端口- :80 ,1-5位数字
    '((/?)|' + // url无参数结尾 - 斜杆或这没有
    "(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; // 请求参数结尾- 英文或数字和[]内的各种字符

  // var strRegex1 = '^(?=^.{3,255}$)((http|https|ftp)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/)?(?:\/(.+)\/?$)?(\/\w+\.\w+)*([\?&]\w+=\w*|[\u4e00-\u9fa5]+)*$';
  const re = new RegExp(strRegex, 'i'); // i不区分大小写
  // console.log(re);
  // 将url做uri转码后再匹配，解除请求参数中的中文和空字符影响
  if (re.test(encodeURI(url))) {
    return true;
  } else {
    return false;
  }
};

// 监听菜单变化
const resetSetItem = function (key, newVal) {
  if (key === 'watchMenuSet') {
    // 创建一个StorageEvent事件
    const newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent(
          'setMenus',
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

export const usePlatformStore = defineStore({
  id: 'platformStore',
  state() {
    return {
      menu: [],
      apps: [],
      userInfo: {},
      systemInfo: {}
    };
  },
  getters: {
    getMenu: (state) => {
      if (window.localStorage.getItem('menu')) {
        return JSON.parse(window.localStorage.getItem('menu'));
      } else {
        return state.menu;
      }
    },
    getApps: (state) => {
      if (window.localStorage.getItem('Apps')) {
        return JSON.parse(window.localStorage.getItem('Apps'));
      } else {
        return state.apps;
      }
    },
    getUserInfo: (state) => {
      if (state.userInfo) {
        return state.userInfo;
      } else if (window.localStorage.getItem('userInfo')) {
        return JSON.parse(window.localStorage.getItem('userInfo'));
      } else {
        return {};
      }
    },
    getSystemInfo: (state) => {
      if (window.localStorage.getItem('systemInfo')) {
        return JSON.parse(window.localStorage.getItem('systemInfo'));
      } else {
        return state.systemInfo;
      }
    }
  },
  actions: {
    [types.GET_MENU_LIST](magusUI) {
      const _this = this;
      // 格式化url
      const formatData = function (datas) {
        datas.forEach((item) => {
          if (item.extend && item.extend.appUri && item.extend.uri) {
            if (CHECK_URL(item.extend.uri)) {
              return;
            } else {
              item.extend.uri = item.extend.appUri + item.extend.uri;
              let urlParams = '';
              if (item.extend.params && item.extend.params !== '{}') {
                const params = JSON.parse(item.extend.params);
                urlParams = magusUI.commonUtils.queryParams(params, false);
                if (item.extend.uri.indexOf('?') !== -1) {
                  item.extend.routerUrl = `${item.extend.uri}&${urlParams}`;
                } else {
                  item.extend.routerUrl = `${item.extend.uri}?${urlParams}`;
                }
              } else {
                item.extend.routerUrl = `${item.extend.uri}`;
              }
            }
          }
          if (item.children && item.children.length) {
            formatData(item.children);
          }
        });
      };
      // 判定域名
      return new Promise((resolve, reject) => {
        magusUI.catchUtil.removeLocalItem('menu');
        magusUI.apiConfig
          .get(menuApi.getLoginMenu)
          .then((res) => {
            formatData(res.children);
            magusUI.catchUtil.setLocalItem(
              'menu',
              JSON.stringify(res.children)
            );

            if (res.children && res.children.length) {
              if (magusUI.catchUtil.getLocalItem('activeMenu')) {
                const activeMenu = JSON.parse(
                  magusUI.catchUtil.getLocalItem('activeMenu')
                );
                const newActiveMenu = res.children.find(
                  (i) => i.nodeId === activeMenu.nodeId
                );
                magusUI.catchUtil.setLocalItem(
                  'activeMenu',
                  JSON.stringify(newActiveMenu)
                );
              }
            }
            // commit("SET_MENU_LIST", res.children);
            _this.menu = res.children;
            resetSetItem('watchMenuSet', JSON.stringify(res.children));

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    [types.GET_APPS_LIST](magusUI) {
      const _this = this;
      return new Promise((resolve, reject) => {
        magusUI.catchUtil.removeLocalItem('Apps');
        magusUI.apiConfig
          .get(appApi.getAllApps)
          .then((res) => {
            magusUI.catchUtil.setLocalItem('Apps', JSON.stringify(res));
            // commit("SET_APPS_LIST", res);
            _this.apps = res;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    [types.GET_USER_INFO](magusUI) {
      const _this = this;
      return new Promise((resolve, reject) => {
        magusUI.catchUtil.removeLocalItem('userInfo');
        magusUI.apiConfig
          .get(userApi.getUserInfo)
          .then((res) => {
            magusUI.catchUtil.setLocalItem('userInfo', JSON.stringify(res));
            // commit("SET_USER_INFO", res);
            _this.userInfo = res;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    [types.GET_SYSTEM_INFO](magusUI) {
      const _this = this;
      let urlTenant = magusUI.commonUtils.getQueryVariable('tenant');
      let token = Cookie.get('auth_token');
      if (urlTenant) {
        Cookie.set('tenant', urlTenant);
      }

      if (!token && !urlTenant) {
        Cookie.remove('tenant');
      }
      return new Promise((resolve, reject) => {
        magusUI.catchUtil.removeLocalItem('systemInfo');
        magusUI.apiConfig
          .get(systemApi.systemFacade)
          .then((res) => {
            const themeColor = res.themeColor ? res.themeColor : 'blue';
            magusUI.catchUtil.setLocalItem('theme', themeColor);
            magusUI.commonUtils.changeTheme(themeColor);
            magusUI.catchUtil.setLocalItem('systemInfo', JSON.stringify(res));
            // commit("SET_SYSTEM_INFO", res);
            _this.systemInfo = res;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
});
