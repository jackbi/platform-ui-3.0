<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:19:51
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/auths/page.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout class="list-inner">
    <!-- 内容页按钮部分，如果不需要请删除 -->
    <template #mainButton>
      <!-- 一些新增按钮或者除了查询外的按钮存放 -->
      <el-row>
        <el-col :span="4">
          <el-input
            v-model="filterText"
            type="text"
            size="small"
            :placeholder="$t('platform.tree_common_placeholder')"
          />
        </el-col>
        <el-col :span="8" style="padding-left: 15px">
          <el-button
            size="small"
            :loading="saveLoading"
            type="primary"
            @click="goSave"
          >
            {{ $t('global.action.save') }}
          </el-button>
          <el-button
            size="small"
            :loading="expandLoading"
            type="primary"
            @click="changeExpand"
          >
            {{
              isExpand ? $t('platform.packup_all') : $t('platform.expand_all')
            }}
          </el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 内容部分 -->
    <template #layoutMain>
      <!--  -->
      <div v-loading="tableLoading" class="app-trees">
        <div class="app-trees-inner">
          <el-tree
            ref="authTree"
            :data="tableData"
            show-checkbox
            :default-expand-all="isExpand"
            node-key="entityId"
            highlight-current
            :props="defaultProps"
            :filter-node-method="filterNode"
          />
        </div>
      </div>
    </template>
  </magus-main-layout>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  watch
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import auths from '@/api/auth.js';
export default defineComponent({
  name: 'PlatformAuthsPage',
  setup() {
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const authTree = ref();
    const state = reactive({
      filterText: '',
      search: '',
      query: {
        name: '',
        pageNum: 1,
        pageSize: 20,
        count: 0
      },
      expandRow: [],
      tableData: [],
      tableLoading: false,
      expandLoading: false,
      checkedTable: [],
      isCheckAll: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      saveLoading: false,
      isExpand: true
    });
    const methods = {
      init() {
        const {
          query: { id }
        } = route;
        if (id) {
          methods.getAllApps(id);
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.text.indexOf(value) !== -1;
      },
      changeExpand() {
        state.expandLoading = true;
        for (let key in authTree.value.store.nodesMap) {
          authTree.value.store.nodesMap[key].expanded = !state.isExpand;
        }
        setTimeout(() => {
          state.expandLoading = false;
          state.isExpand = !state.isExpand;
        }, 1000);
      },
      handleTreeData(treeData, searchValue) {
        if (!treeData || treeData.length === 0) {
          return [];
        }
        const array = [];
        for (let i = 0; i < treeData.length; i += 1) {
          let match = false;
          for (const pro in treeData[i]) {
            if (typeof treeData[i][pro] == 'string') {
              match |= treeData[i][pro].includes(searchValue);
              if (match) break;
            }
          }
          if (
            methods.handleTreeData(treeData[i].children, searchValue).length >
              0 ||
            match
          ) {
            array.push({
              ...treeData[i],
              children: methods.handleTreeData(
                treeData[i].children,
                searchValue
              )
            });
          }
        }
        return array;
      },
      setExpandRow(handleTreeData) {
        if (handleTreeData.length) {
          for (const i of handleTreeData) {
            state.expandRow.push(i.id);
            if (i.children.length) {
              methods.setExpandRow(i.children);
            }
          }
        }
      },
      /**
       * @description: 获取所有应用
       * @param {*} roleId
       * @return {*}
       */

      getAllApps(roleId) {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(auths.getAllApp, { roleId })
          .then((res) => {
            state.tableData = res.children;
            methods.getCheckedNode(res.children);
          })
          .finally(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description: 获取选中的节点
       * @param {*}
       * @return {*}
       */

      getCheckedNode(datas) {
        const checkedData = [];
        const getNode = function (arr) {
          if (arr && arr.length) {
            arr.forEach((item) => {
              if (item.checked) {
                checkedData.push(item.entityId);
              }
              if (item.children && item.children.length) {
                getNode(item.children);
              }
            });
          }
        };
        getNode(datas);
        authTree.value.setCheckedKeys(checkedData);
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        const checdedNodes = authTree.value.getCheckedNodes();
        const needNode = checdedNodes.filter(
          (i) => i.entityType === 'AppFunction'
        );
        const funcIds = needNode.map((i) => i.entityId);
        const roleId = route.query.id;
        state.saveLoading = true;
        proxy.$magusCloudApi.apiConfig
          .post(auths.saveAuthApp, { funcIds, roleId })
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            methods.init();
          })
          .finally(() => {
            state.saveLoading = false;
          });
      }
    };
    methods.init();
    watch(
      () => route.query,
      () => {
        methods.init();
      },
      {
        flush: 'post'
      }
    );
    watch(
      () => state.filterText,
      (val) => {
        authTree.value.filter(val);
      }
    );
    return {
      ...toRefs(state),
      ...methods,
      authTree
    };
  }
});
</script>
<style lang="scss" scoped>
.app-trees {
  height: 100%;
  width: 100%;
  position: relative;
  .app-trees-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
