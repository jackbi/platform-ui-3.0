/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-11-29 11:12:54
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-17 15:20:31
 * @FilePath: /magus-platform-ui-3.0/src/common/mixin/treeMixin.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
// import { treeIcon, treeIconColor } from "@/common/utils/data";
// import { getGroupIconColor } from '@/common/plugin/filters';
import {
  ref,
  reactive,
  toRefs,
  getCurrentInstance,
  provide,
  nextTick,
  watch
} from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useInitTree() {
  const router = useRouter();
  const route = useRoute();
  const { proxy } = getCurrentInstance();
  const magusTreeRef = ref();
  let outerTreeApi, outerRouterName, outerTreeNode;
  const state = reactive({
    nodeData: {},
    expandedKeys: [],
    treeData: []
  });

  const methods = {
    reloadTree: () => {
      methods.initTree(outerTreeApi, outerRouterName, outerTreeNode);
    },
    setCurrentNode(datas, routerName) {
      if (!datas || datas.length === 0) {
        router.push({
          name: routerName,
          params: { entityId: '' }
        });
        return;
      }
      const {
        params: { entityId }
      } = route;
      state.nodeData = {};
      const isHaveNode = function (arr, id) {
        arr.forEach((i) => {
          if (i.entityId === id) {
            state.nodeData = i;
            nextTick(() => {
              magusTreeRef.value.setCurrentKey(id);
            });
          }
          if (i.children && i.children.length) {
            isHaveNode(i.children, id);
          }
        });
      };
      if (entityId && Boolean(entityId)) {
        isHaveNode(datas, entityId);
        let { entityId: nodeEntityId } = state.nodeData;
        if (!nodeEntityId) {
          router.push({
            name: routerName,
            params: { entityId: datas[0].entityId }
          });
          state.nodeData = datas[0];
          nextTick(() => {
            magusTreeRef.value.setCurrentKey(datas[0].entityId);
          });
        }
      } else {
        router.push({
          name: routerName,
          params: { entityId: datas[0].entityId }
        });
        state.nodeData = datas[0];
        nextTick(() => {
          if (magusTreeRef.value) {
            magusTreeRef.value.setCurrentKey(datas[0].entityId);
          }
        });
      }
      state.expandedKeys = [entityId];
    },
    initTree(treeApi, routerName, treeNode) {
      outerTreeApi = treeApi;
      outerRouterName = routerName;
      outerTreeNode = treeNode;
      if (treeApi) {
        state.treeData = [];
        proxy.$magusCloudApi.apiConfig.get(treeApi).then((res) => {
          if (treeNode && treeNode.length && treeNode[0].children) {
            treeNode[0].children = res.children;
            state.treeData = treeNode;
          } else {
            state.treeData = res.children;
          }
          methods.setCurrentNode(state.treeData, routerName);
        });
      }
    },
    treeNoDataLink(routerName) {
      router.push({ name: routerName, params: { entityId: '' } });
    }
  };
  watch(
    () => route.params.entityId,
    (val) => {
      nextTick(() => {
        methods.setCurrentNode(state.treeData, outerRouterName);
      });
    },
    {
      flush: 'post'
    }
  );
  provide(
    'getTree',
    methods.reloadTree
    // methods.initTree(outerTreeApi, outerRouterName, outerTreeNode)
  );
  return {
    ...toRefs(state),
    ...methods,
    magusTreeRef
  };
}
