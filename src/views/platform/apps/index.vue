<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:43
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 15:47:27
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/apps/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout class="container-inner">
    <!-- 左侧树空间，如果不需要请删除 -->
    <template #layoutLeft>
      <magus-tree
        ref="magusTreeRef"
        node-key="entityId"
        :tree-data="treeData"
        :expanded-keys="expandedKeys"
        :is-edit="false"
        @click-node="clickNode"
        @reload-tree="reloadTree"
      />
    </template>
    <!-- 上方TAB空间，如果不需要请删除 -->
    <template #layoutTab>
      <magus-tab :tab-data="tabData" @go-path="goPath">
        <template #tabName>{{ nodeData.text }}</template>
      </magus-tab>
    </template>
    <!-- 内容部分 -->
    <template #layoutMain>
      <!--  -->
      <router-view
        v-if="Boolean($route.params.entityId)"
        ref="Childmain"
        :node-data="nodeData"
      />
      <div v-else class="no-devicecode">
        <el-empty :description="$t('platform.orgs.manage.no_data')" />
      </div>
    </template>
  </magus-main-layout>
</template>

<script>
import appsApi from '@/api/apps.js';
import { defineComponent, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useInitTree } from '@/common/mixin/treeMixin.js';
export default defineComponent({
  name: 'PlatformApps',
  components: {},
  setup() {
    const {
      magusTreeRef,
      nodeData,
      initTree,
      treeData,
      reloadTree,
      expandedKeys
    } = useInitTree();
    const { t } = useI18n();
    const router = useRouter();

    const methods = {
      init() {
        methods.getTree();
      },
      goPath(datas) {
        router.push({ path: datas.path });
      },
      clickNode(datas) {
        nodeData.value = datas;
        const { entityId, entityType } = nodeData.value;
        if (entityType === 'root') {
          router.push({ name: 'platformAppsPage', params: { entityId } });
        }

        if (entityType === 'AppApplication') {
          router.push({
            name: 'platformAppsModules',
            params: { entityId }
          });
        }

        if (entityType === 'AppModule') {
          router.push({ name: 'platformAppsFuns', params: { entityId } });
        }
      },
      /**
       * @description: 获取应用树
       * @param {*}
       * @return {*}
       */
      getTree() {
        let treeNode = [
          {
            nodeId: 'root',
            nodePid: 'root',
            entityId: 'root',
            entityType: 'root',
            icon: 'magusdipjiankong-',
            text: t('platform.apps.tree'),
            leaf: false,
            checked: false,
            expanded: false,
            extend: {
              appUri: '',
              uri: '',
              uriType: '',
              params: ''
            },
            children: []
          }
        ];
        initTree(appsApi.getAppsTree, 'platformAppsPage', treeNode);
      }
    };

    const computedData = {
      tabData: computed(() => {
        const { entityId, entityType } = nodeData.value;
        let datas = [];
        if (entityType === 'root') {
          datas = [
            {
              text: t('platform.apps.app_list'),
              path: `/platform/apps/page/list/${entityId}`,
              name: 'platformAppsPage'
            }
          ];
        } else if (entityType === 'AppApplication') {
          datas = [
            {
              text: t('platform.apps.module_list'),
              path: `/platform/apps/page/module/${entityId}`,
              name: 'platformAppsModules'
            },
            {
              text: t('platform.apps.app_info'),
              path: `/platform/apps/page/info/${entityId}`,
              name: 'platformAppsAppInfo'
            }
          ];
        } else if (entityType === 'AppModule') {
          datas = [
            {
              text: t('platform.apps.func_list'),
              path: `/platform/apps/page/funs/${entityId}`,
              name: 'platformAppsFuns'
            },
            {
              text: t('platform.apps.module_info'),
              path: `/platform/apps/page/moduleinfo/${entityId}`,
              name: 'platformAppsModuleInfo'
            }
          ];
        }
        return datas;
      })
    };
    onMounted(() => {
      methods.init();
    });

    return {
      ...methods,
      ...computedData,
      magusTreeRef,
      treeData,
      reloadTree,
      nodeData,
      expandedKeys
    };
  }
});
</script>
<style lang="scss" scoped>
// .platform-apps {
//   width: 100%;
//   height: 100%;
//   .platform-apps-layout {
//     ::v-deep .layout-right-main {
//       box-shadow: none;
//       padding: 0;
//       background: transparent;
//     }
//   }
// }
</style>
