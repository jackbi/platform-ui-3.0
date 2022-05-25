<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:43
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 16:21:10
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/menus/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:43
 * @LastEditors: wenbin
 * @LastEditTime: 2021-05-14 10:41:35
 * @FilePath: /maguscloud-platform-web/src/views/platform/apps/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout class="container-inner">
    <!-- 左侧树空间，如果不需要请删除 -->
    <template #layoutLeft>
      <div style="height: 100%; width: 100%">
        <magus-tree
          ref="magusTreeRef"
          node-key="entityId"
          :tree-data="treeData"
          :expanded-keys="expandedKeys"
          :is-edit="false"
          @click-node="clickNode"
          @reload-tree="reloadTree"
        />
      </div>
    </template>
    <!-- 上方TAB空间，如果不需要请删除 -->
    <template #layoutTab>
      <magus-tab :tab-data="tabData" @go-path="goPath">
        <template #tabName>
          {{ $route.query.name || $t('platform.menus.menuinfo') }}
        </template>
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
import { defineComponent, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useInitTree } from '@/common/mixin/treeMixin.js';
import menuApi from '@/api/menus.js';
export default defineComponent({
  name: 'PlatformMenus',
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
        const { entityId } = datas;
        router.push({
          name: 'platformMenusPage',
          params: { entityId }
        });
        nodeData.value = datas;
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
            icon: 'magusdipwenjianjia',
            text: t('platform.menus.menutree'),
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
        initTree(menuApi.getMenusTree, 'platformMenusPage', treeNode);
      }
    };

    const computedData = {
      tabData: computed(() => {
        const { entityId } = nodeData.value;
        let datas = [];
        if (entityId === 'root') {
          datas = [
            {
              text: t('platform.menus.menulist'),
              path: `/platform/menus/page/list/${entityId}`
            }
          ];
        } else {
          datas = [
            {
              text: t('platform.menus.menulist'),
              path: `/platform/menus/page/list/${entityId}`
            },
            {
              text: t('platform.menus.menuinfo'),
              path: `/platform/menus/page/menuInfo/${entityId}`
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
