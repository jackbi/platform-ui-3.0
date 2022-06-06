<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 13:49:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-06-06 10:31:36
 * @FilePath: /magus-platform-ui-3.0/src/App.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <div id="app">
    <component
      :is="componentName"
      v-if="$route.meta.isNeedLayout !== false"
      :header-info="headerInfo"
      :badge-value="badgeValue"
      :footer-info="footerInfo"
      :is-show-footer="isShowFooter"
    >
      <template #headerOther>
        <magus-icon
          v-if="speakArr.length"
          :icon="
            alarmDatas.type == 0 ? 'magusdipshengyin' : 'magusdipguanbishengyin'
          "
          style="display: inline-block; margin-right: 15px; cursor: pointer"
          :size="20"
          color="#fff"
          @click="alarmMusicBf"
        />
        <el-badge
          :value="speakArr.length"
          :hidden="!speakArr.length"
          class="badge-item"
        >
          <magus-icon
            v-show="speakArr.length"
            icon="magusdipbaojing"
            style="
              display: inline-block;
              margin-right: 15px;
              cursor: pointer;
              position: relative;
              top: -2px;
            "
            :size="20"
            color="#F56C6C"
            @click="goAlarm"
          />
        </el-badge>
      </template>
      <router-view />
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive> -->
      <!-- <router-view v-slot="{ Component }">
        <keep-alive :include="includeList">
          <component :is="Component" />
        </keep-alive>
      </router-view> -->
      <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
      <div
        v-for="(item, index) in apps"
        v-show="isShowDiv(item.container)"
        :id="getId(item.container)"
        :key="index"
        :ref="getId(item.container)"
        style="width: 100%; height: 100%"
      />
    </component>
    <div v-else>
      <!-- <router-view v-slot="{ Component }">
        <keep-alive :include="includeList">
          <component :is="Component" />
        </keep-alive>
      </router-view> -->
      <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  watch,
  computed,
  getCurrentInstance,
  onMounted
} from 'vue';
import { getImage } from '@/common/plugin/filters.js';
import { usePlatformStore } from '@/store/modules/index.js';
import { useAlarmStore } from '@/store/modules/alarm.js';
import Cookie from 'js-cookie';
import authApi from '@/api/auth.js';
import { start } from 'qiankun';
import { useRouter, useRoute } from 'vue-router';
import initApi from '@/api/initials.js';
import { useI18n } from 'vue-i18n';
import {
  loadAudioFile,
  stopSound,
  playSound,
  source
} from '@/common/utils/alarmMusic.js';
export default defineComponent({
  setup() {
    const { t } = useI18n();
    const platformStore = usePlatformStore();
    const alarmStore = useAlarmStore();
    const router = useRouter();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    let state = reactive({
      headerInfo: {
        // require("./assets/images/logo.png")
        imgUrl: '',
        // 没有图片显示文字
        logoText: 'MagusCloud',
        // logo详细描述
        logoDetail: '上海麦杰科技股份有限公司',
        userLogo: '',
        // 一级菜单
        menuList: platformStore.getMenu,
        username: '',
        otherMenu: [
          {
            name: t('platform.userCenter'),
            handle: (datas) => {
              methods.goUserCenter(datas);
            }
          },
          {
            name: t('platform.exitPlat'),
            handle: (datas) => {
              methods.exitApp(datas);
            }
          }
        ]
      },
      footerInfo: {
        copyright: '',
        ICP: '',
        icpUrl: ''
      },
      isShowFooter: true,
      // magus-layout
      componentName: '',
      alarmDatas: {
        type: 0,
        datas: {},
        audio: null
      },
      includeList: []
    });

    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getSystemInfo();
        methods.getDictionary();
        methods.getParamaCatch();
        const token = Cookie.get('auth_token');
        if (token) {
          const userData = platformStore.getUserInfo;
          methods.getMenu();
          methods.getUserInfo();
          state.headerInfo.username = userData.username;
          state.headerInfo.userLogo = getImage(userData.avatar);
          state.headerInfo.menuList = platformStore.getMenu;
        }
        // proxy.$magusCloudApi.catchUtil.setLocalItem("theme", "blue");
        // proxy.$magusCloudApi.commonUtils.toggleClass(
        //   document.body,
        //   `magus-ui-blue`
        // );
      },
      /**
       * @description: 跳转告警清单
       * @param {*}
       * @return {*}
       */

      goAlarm() {
        router.push({ path: '/opAlarm/warnRecords/page' });
      },
      alarmMusicBf() {
        if (state.alarmDatas.type == 1) {
          playSound();
          state.alarmDatas.type = 0;
        } else {
          stopSound();
          state.alarmDatas.type = 1;
        }
      },
      /**
       * @description: 通过路由获取菜单
       * @param {*}
       * @return {*}
       */

      getMenuByRoute(routeData) {
        const flatTree = (tree) => {
          return tree.reduce((res, item) => {
            const { children } = item;
            return res.concat(
              item,
              children && children.length ? flatTree(children) : []
            );
          }, []);
        };
        const menuList = proxy.$magusCloudApi.catchUtil.getLocalItem('menu');
        if (menuList && menuList !== '{}') {
          const menuListArr = JSON.parse(menuList);
          const menuListFlatArr = flatTree(menuListArr);
          const activeSubMenu = menuListFlatArr.find(
            (i) =>
              i.extend &&
              i.extend.routerUrl &&
              i.extend.routerUrl === routeData.fullPath
          );
          const activeMenu = menuListFlatArr.find(
            (i) =>
              activeSubMenu &&
              activeSubMenu.nodePid &&
              i.nodeId === activeSubMenu.nodePid
          );
          if (activeSubMenu) {
            proxy.$magusCloudApi.catchUtil.setLocalItem(
              'activeSubMenu',
              JSON.stringify(activeSubMenu)
            );
          }
          if (activeMenu) {
            proxy.$magusCloudApi.catchUtil.setLocalItem(
              'activeMenu',
              JSON.stringify(activeMenu)
            );
            proxy.resetSetItem('watchStorage', JSON.stringify(activeMenu));
          }
        }
      },
      /**
       * @description: 退出登陆
       * @param {*}
       * @return {*}
       */

      exitApp() {
        const catchTenant = Cookie.get('tenant');
        proxy.$magusCloudApi.apiConfig
          .post(authApi.userLogout, {})
          .then(() => {
            proxy.$magusCloudApi.catchUtil.clearAll();
            Cookie.remove('auth_token');
            sessionStorage.clear();
            let url;
            if (catchTenant) {
              url = `${window.location.origin}/login?tenant=${catchTenant}`;
            } else {
              url = `${window.location.origin}/login`;
            }
            window.open(url, '_self');
          })
          .catch(() => {});
      },
      /**
       * @description: 查看是否存在异步任务
       * @param {*} datas
       * @return {*}
       */

      badgeValue(datas) {
        if (proxy.$magusCloudApi.catchUtil.getLocalItem('exceptionData')) {
          const exceptionData = JSON.parse(
            proxy.$magusCloudApi.catchUtil.getLocalItem('exceptionData')
          );
          if (exceptionData[datas.text]) {
            return exceptionData[datas.text];
          }
        }
      },
      /**
       * @description: 跳转个人中心
       * @param {*}
       * @return {*}
       */

      goUserCenter() {
        router.push({ name: 'platformPersonalBasic' });
      },
      activeDropdown(datas) {
        console.log(datas);
      },
      getId(str) {
        return str.replace('#', '');
      },
      isShowDiv(str) {
        const id = str.replace('#', '');
        return route.path.indexOf(id) === 1;
      },
      /**
       * @description: 获取菜单信息
       * @param {*}
       * @return {*}
       */

      getMenu() {
        platformStore.GET_MENU_LIST(proxy.$magusCloudApi);
      },
      /**
       * @description: 获取用户信息
       * @param {*}
       * @return {*}
       */

      getUserInfo() {
        platformStore.GET_USER_INFO(proxy.$magusCloudApi);
      },
      /**
       * @description: 动态调整ico
       * @param {*}
       * @return {*}
       */

      setIco(favicon) {
        const link =
          document.querySelector("link[rel*='icon']") ||
          document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = favicon;
        document.getElementsByTagName('head')[0].appendChild(link);
      },
      /**
       * @description: 获取系统信息
       * @param {*}
       * @return {*}
       */

      getSystemInfo() {
        platformStore.GET_SYSTEM_INFO(proxy.$magusCloudApi).then((res) => {
          state.componentName = res.themeLayout
            ? res.themeLayout
            : 'magus-layout';
          state.headerInfo.logoText = res.title1 ? res.title1 : '';
          document.title = res.title1 ? res.title1 : '';
          state.headerInfo.logoDetail = res.title2 ? res.title2 : '';
          state.headerInfo.imgUrl =
            res.logo && res.showLogo ? getImage(res.logo) : '';
          state.footerInfo.copyright = res.copyright;
          state.footerInfo.ICP = res.icp;
          state.footerInfo.icpUrl = res.icpUrl;
          state.isShowFooter = res.showBeian !== false;
          if (!res.copyright && !res.icp) {
            state.isShowFooter = false;
          }
          const favicon = res.favicon ? getImage(res.favicon) : '';
          methods.setIco(favicon);
        });
      },
      /**
       * @description: 获取字典
       * @param {*}
       * @return {*}
       */

      getDictionary() {
        proxy.$magusCloudApi.apiConfig.get(initApi.getDictCatch).then((res) => {
          proxy.$magusCloudApi.catchUtil.setLocalItem(
            'dictionary',
            JSON.stringify(res)
          );
        });
      },
      /**
       * @description: 获取参数
       * @param {*}
       * @return {*}
       */

      getParamaCatch() {
        const resetSetItem = function (key, newVal) {
          if (key === 'watchParamsSet') {
            // 创建一个StorageEvent事件
            const newStorageEvent = document.createEvent('StorageEvent');
            const storage = {
              setItem: function (k, val) {
                sessionStorage.setItem(k, val);

                // 初始化创建的事件
                newStorageEvent.initStorageEvent(
                  'setParams',
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
        proxy.$magusCloudApi.apiConfig
          .get(initApi.getParamaCatch)
          .then((res) => {
            proxy.$magusCloudApi.catchUtil.setLocalItem(
              'parameter',
              JSON.stringify(res)
            );
            const alarmData = res.find(
              (i) => i.code === proxy.$params.getVoiceAlarmApi
            );
            state.alarmDatas.datas = alarmData;
            resetSetItem('watchParamsSet', JSON.stringify(res));
          });
      },
      getCatchRouter() {
        const activeSubMenu =
          proxy.$magusCloudApi.catchUtil.getLocalItem('activeSubMenu');
        const activeMenu =
          proxy.$magusCloudApi.catchUtil.getLocalItem('activeMenu');
        if (activeSubMenu) {
          let routerData = JSON.parse(activeSubMenu);
          const {
            extend: { routerUrl }
          } = routerData;
          if (window.location.pathname.indexOf(routerUrl) == -1) {
            router.push({ path: routerUrl });
          }
        } else if (activeMenu) {
          let activeMenuData = JSON.parse(activeMenu);
          const {
            extend: { routerUrl }
          } = activeMenuData;
          if (routerUrl && window.location.pathname.indexOf(routerUrl) == -1) {
            router.push({ path: routerUrl });
          }
        }
      }
    };

    methods.getCatchRouter();

    // 事件监听
    watch(
      () => platformStore.getMenu,
      (val) => {
        state.headerInfo.menuList = val;
      },
      {
        deep: true
      }
    );

    watch(
      () => platformStore.getUserInfo,
      (val) => {
        state.headerInfo.username = val.username;
        state.headerInfo.userLogo = getImage(val.avatar);
        if (state.alarmDatas.datas && state.alarmDatas.datas.value) {
          alarmStore.GET_ALARM_CONNECT_WEBSOCKET(state.alarmDatas.datas.value);
        }
      }
    );

    watch(
      () => alarmStore.speakArr,
      (val) => {
        if (val && val.length) {
          state.alarmDatas.type = 0;
          if (!source) {
            loadAudioFile('/source/alarm3.ogg');
          } else {
            stopSound();
            playSound();
          }
        } else {
          if (source) {
            stopSound();
            state.alarmDatas.type = 1;
          }
        }
      }
    );
    // watch(
    //   () => route,
    //   (newVal, oldVal) => {
    //     if (
    //       newVal.meta.keepAlive &&
    //       state.includeList.indexOf(newVal.name) === -1
    //     ) {
    //       state.includeList.push(newVal.name);
    //       console.log(state.includeList);
    //     }
    //   },
    //   { deep: true }
    // );

    onMounted(() => {
      methods.init();
      window.addEventListener('setApp', () => {
        setTimeout(() => {
          start();
        }, 200);
      });
      window.addEventListener('setMenus', () => {
        state.headerInfo.menuList = platformStore.getMenu;
      });
      window.addEventListener('mousedown', () => {
        if (
          source &&
          source.context.state !== 'running' &&
          alarmStore.speakArr.length
        ) {
          source.context.resume();
        }
      });
    });

    return {
      ...toRefs(state),
      speakArr: computed(() => alarmStore.speakArr),
      apps: computed(() => platformStore.getApps),
      menu: computed(() => platformStore.getMenu),
      systemInfo: computed(() => platformStore.getSystemInfo),
      ...methods
    };
  }
});
</script>

<style></style>
