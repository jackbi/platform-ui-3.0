<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 16:59:27
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:34:24
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/apps/modules.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout class="list-inner">
    <!-- 内容页按钮部分，如果不需要请删除 -->
    <template #mainButton>
      <!-- 一些新增按钮或者除了查询外的按钮存放 -->
      <el-button type="primary" size="small" @click="goAddorEdit('add')">
        {{ $t('global.action.add') }}
      </el-button>
    </template>
    <!-- 内容部分 -->
    <template #layoutMain>
      <!--  -->
      <el-table
        v-loading="tableLoading"
        size="small"
        :data="tableData"
        style="width: 100%"
        height="100%"
        border
      >
        <el-table-column
          type="index"
          width="50"
          :label="$t('global.field.No')"
        />
        <el-table-column
          prop="name"
          width="180"
          :label="$t('platform.apps.modulename')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="code"
          width="200"
          :label="$t('platform.apps.modulecode')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remark"
          min-width="140"
          :label="$t('platform.apps.remark')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remark"
          width="100"
          :label="$t('platform.table.operation')"
        >
          <template #default="scope">
            <el-button
              :text="true"
              class="magusdip-iconfont magusdipbianji"
              :title="$t('global.action.edit')"
              size="small"
              @click="goAddorEdit('edit', scope.row)"
            />
            <el-button
              :text="true"
              class="magusdip-iconfont magusdipshanchu"
              size="small"
              @click="deleteModule(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </magus-main-layout>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  inject,
  watch
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import appsApi from '@/api/apps.js';
export default defineComponent({
  name: 'Page',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const getTree = inject('getTree');
    const { proxy } = getCurrentInstance();
    const state = reactive({
      query: {
        name: ''
      },
      tableData: [],
      tableLoading: false
    });
    const methods = {
      init() {
        methods.getTableData();
      },
      /**
       * @description: 获取所有模块
       * @param {*}
       * @return {*}
       */
      getTableData() {
        const { entityId: appId } = route.params;
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(appsApi.getModules, { appId })
          .then((res) => {
            state.tableLoading = false;
            state.tableData = res;
          })
          .catch(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description: 删除或者新增
       * @param {*} type 【add, edit】
       * @param {*} datas 模块信息
       * @return {*}
       */
      goAddorEdit(type, datas) {
        if (type === 'add') {
          const { entityId } = route.params;
          router.push({
            name: 'platformAppsModulesAdd',
            params: {
              entityId
            }
          });
        } else if (type === 'edit') {
          const { id: entityId } = datas;
          router.push({
            name: 'platformAppsModuleInfo',
            params: {
              entityId
            }
          });
        }
      },
      /**
       * @description: 删除模块
       * @param {*} datas
       * @return {*}
       */
      deleteModule(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(appsApi.deleteModuleById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getTableData();
                getTree();
              });
          })
          .catch(() => {});
      }
    };
    methods.init();
    watch(
      () => route.params,
      (val) => {
        methods.init();
      },
      {
        flush: 'post'
      }
    );
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped></style>
