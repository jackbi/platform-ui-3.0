<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-07-02 13:55:34
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:33:40
 * @FilePath: /magus-platform-ui-3.0/src/views/iframe/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="magus-iframe">
    <iframe
      id="magus-iframe-id"
      width="100%"
      height="100%"
      :src="$route.query.url"
      frameborder="0"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'MagusIframe',
  setup() {
    const router = useRouter();
    const methods = {
      setIframeCurrentMenu: function (url) {
        let menu = localStorage.getItem('menu');
        let untieTree = function (tree, childrenKey = 'children') {
          if (
            Object.prototype.toString.call(tree) !== '[object Array]' ||
            tree.length <= 0
          ) {
            return [];
          }
          return tree.reduce(
            (pre, cur) =>
              pre.concat(cur, untieTree(cur[childrenKey], childrenKey)),
            []
          );
        };
        if (menu) {
          let menuNewArr = JSON.parse(menu);
          let resetSetItem = function (key, newVal) {
            if (key === 'watchStorage') {
              // 创建一个StorageEvent事件
              let newStorageEvent = document.createEvent('StorageEvent');
              const storage = {
                setItem: function (k, val) {
                  sessionStorage.setItem(k, val);

                  // 初始化创建的事件
                  newStorageEvent.initStorageEvent(
                    'setItem',
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
          let getMenu = function (menuArr, url) {
            let menuReduce = untieTree(menuArr);
            menuReduce.forEach((el) => {
              if (el.extend.params) {
                let paramsData = JSON.parse(el.extend.params);
                if (paramsData.url === url) {
                  localStorage.setItem('activeSubMenu', JSON.stringify(el));
                  resetSetItem('watchStorage', JSON.stringify(el));
                  router.push({ query: { url } });
                }
              }
              if (el.children && el.children.length) {
                getMenu(el.children, url);
              }
            });
          };
          getMenu(menuNewArr, url);
        }
      },
      /**
       * @description: iframe全屏方法
       * @param {*}
       * @return {*}
       */
      fullScreen() {
        let iframeId = 'magus-iframe-id';
        /* 获取父类的document */
        let parentDoc = parent.document;
        /* 定义一个接收元素的变量 */
        let thisIframe = null;
        thisIframe = parentDoc.getElementById(iframeId);
        let isFullScreen = function () {
          return !!(
            document.fullscreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            document.webkitFullScreen ||
            document.msFullScreen
          );
        };
        if (isFullScreen()) {
          methods.exitFullscreen();
        } else {
          methods.requestFullScreen(thisIframe);
        }
      },
      /**
       * @description: 浏览器全屏
       * @param {*} element
       * @return {*}
       */
      requestFullScreen(element) {
        if (window.ActiveXObject) {
          let WsShell = new ActiveXObject('WScript.Shell');
          WsShell.SendKeys('{F11}');
        } else if (element.requestFullScreen) {
          // HTML W3C 提议
          element.requestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          // Webkit (works in Safari5.1 and Chrome 15)
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          // Firefox (works in nightly)
          element.mozRequestFullScreen();
        }
      },
      /**
       * @description: 浏览器退出全屏
       * @param {*}
       * @return {*}
       */
      exitFullscreen() {
        if (document.exitFullScreen) {
          document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    };
    window.addEventListener('message', function (event) {
      let data = event.data;
      if (data && data.name === 'fullScreen') {
        methods.fullScreen();
      }
    });
    return {
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.magus-iframe {
  width: calc(100% + 7.5px);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
