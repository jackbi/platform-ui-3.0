<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-02-17 14:01:46
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 10:42:07
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/organizations/manage/index.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout class="container-inner">
    <!-- 左侧树空间，如果不需要请删除 -->
    <template #layoutLeft>
      <magus-tree
        ref="magusTreeRef"
        :tree-data="treeData"
        :magus-icon-class="$filters.magusIconClass"
        :magus-icon-style="$filters.magusIconStyle"
        :is-edit="false"
        node-key="entityId"
        :expanded-keys="expandedKeys"
        :is-need-reload="true"
        @click-node="clickNode"
        @reload-tree="reloadTree"
      />
    </template>
    <!-- 上方TAB空间，如果不需要请删除 -->
    <template #layoutTab>
      <magus-tab
        v-if="Boolean($route.params.entityId)"
        :tab-data="tabData"
        @go-path="goPath"
      >
        <template #tabName>
          <span>{{ nodeData.text }}</span
          ><span v-if="nodeData.extend && nodeData.extend.levelName"
            >({{ nodeData.extend.levelName }})</span
          >
        </template>
      </magus-tab>
    </template>

    <template #layoutMain>
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
import orgApi from '@/api/organizations.js';
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
          name: 'platformOrgsPageNextagency',
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
            text: t('platform.orgs.manage.tree_name'),
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
        initTree(orgApi.getOrgTree, 'platformOrgsPageNextagency', treeNode);
      }
    };

    const computedData = {
      tabData: computed(() => {
        const { entityId } = nodeData.value;
        let datas = [];
        if (entityId === 'root') {
          datas = [
            {
              text: t('platform.orgs.manage.next_agency'),
              path: `/platform/orgs/page/nextagency/${entityId}`
            }
          ];
        } else {
          datas = [
            {
              text: t('platform.orgs.manage.next_agency'),
              path: `/platform/orgs/page/nextagency/${entityId}`
            },
            {
              text: t('platform.orgs.manage.agency_info'),
              path: `/platform/orgs/page/agencyinfo/${entityId}`
            },
            {
              text: t('platform.orgs.manage.employee_info'),
              path: `/platform/orgs/page/employee/${entityId}`
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
