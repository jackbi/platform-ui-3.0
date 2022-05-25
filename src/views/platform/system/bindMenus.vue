<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-06-25 10:43:30
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 10:03:04
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/system/bindMenus.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template :title="$t('platform.system.system_bind_menu')">
    <template #main>
      <div v-loading="loading" class="bindMenus">
        <magus-tree
          ref="bindMenu"
          show-checkbox
          :tree-data="tableData"
          :is-need-reload="false"
          :is-edit="false"
          :highlight="false"
        />
      </div>
    </template>
    <template #footer>
      <el-button size="small" @click="$back()">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button
        :loading="saveLoading"
        type="primary"
        size="small"
        @click="goSave()"
      >
        {{ $t('global.action.save') }}
      </el-button>
    </template>
  </magus-add-template>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import systemApi from '@/api/system';
export default defineComponent({
  name: 'BindMenus',
  components: {},
  setup() {
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const bindMenu = ref();
    const { t } = useI18n();
    const state = reactive({
      tableData: [],
      loading: false,
      saveLoading: false
    });
    const methods = {
      init() {
        const {
          params: { id }
        } = route;
        if (id) {
          methods.getSystemMenus(id);
        }
      },
      /**
       * @description: 获取系统菜单
       * @param {*} id
       * @return {*}
       */

      getSystemMenus(id) {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .get(systemApi.getSystemMenu, { systemId: id })
          .then((res) => {
            state.tableData = res.children;
            methods.getCheckedNode(res.children);
          })
          .finally(() => {
            state.loading = false;
          });
      },
      /**
       * @description: 获取选中的节点
       * @param {*}
       * @return {*}
       */

      getCheckedNode(datas) {
        let checkedData = [];
        const getNode = function (arr) {
          if (arr && arr.length) {
            arr.forEach((item) => {
              if (item.checked) {
                checkedData.push(item.nodeId);
              }
              if (item.children && item.children.length) {
                getNode(item.children);
              }
            });
          }
        };
        getNode(datas);
        bindMenu.value.setCheckedKeys(checkedData);
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        const {
          params: { id }
        } = route;
        let checdedNodes = bindMenu.value.getCheckedNodes(true);
        let menuIds = checdedNodes.map((i) => i.entityId);
        let systemId = id;
        state.saveLoading = true;
        proxy.$magusCloudApi.apiConfig
          .post(systemApi.chooseMenus, { menuIds, systemId })
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            proxy.$back();
          })
          .finally(() => {
            state.saveLoading = false;
          });
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      bindMenu,
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.bindMenus {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
}
</style>
