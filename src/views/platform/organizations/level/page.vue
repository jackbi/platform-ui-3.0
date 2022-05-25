<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-02-16 15:17:12
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 17:09:22
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/organizations/level/page.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout>
    <!-- 内容页按钮部分，如果不需要请删除 -->
    <template #mainButton>
      <!-- 一些新增按钮或者除了查询外的按钮存放 -->
      <el-button type="primary" size="small" @click="addOrgLevel">
        {{ $t('global.action.add') }}
      </el-button>
    </template>
    <!-- 内容部分 -->
    <template #layoutMain>
      <!--  -->
      <el-table
        v-loading="tableLoading"
        border
        script
        size="small"
        height="100%"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          :label="$t('platform.orgs.hierarchy.name')"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          prop="level"
          :label="$t('platform.orgs.hierarchy.level')"
          show-overflow-tooltip
          width="80"
        />
        <el-table-column
          prop="icon"
          :label="$t('platform.orgs.hierarchy.icon')"
          show-overflow-tooltip
          width="80"
        >
          <template #default="{ row }">
            <magus-icon
              v-if="row.icon"
              :icon="row.icon"
              :size="14"
              :color="$filters.getGroupIconColor(row.icon)"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('global.table.operation')"
          show-overflow-tooltip
          width="100"
        >
          <template #default="{ row }">
            <el-button
              :text="true"
              size="small"
              :title="$t('global.action.edit')"
              class="magusdip-iconfont magusdipbianji"
              @click="editRow(row)"
            />
            <el-button
              :text="true"
              size="small"
              :title="$t('global.action.delete')"
              class="magusdip-iconfont magusdipshanchu"
              @click="deleteRow(row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </magus-main-layout>
</template>
<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import orgApi from '@/api/organizations.js';
export default defineComponent({
  name: 'Page',
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      tableData: [],
      tableLoading: false
    });
    const methods = {
      init() {
        methods.getTableData();
      },
      addOrgLevel() {
        router.push({ name: 'platformOrgsLevelAdd' });
      },
      editRow(row) {
        const { id } = row;
        router.push({ name: 'platformOrgsLevelEdit', params: { id } });
      },
      deleteRow(row) {
        const { id } = row;
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(orgApi.deleteLevel(id))
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getTableData();
              });
          });
      },
      /**
       * @description: 获取表格数据
       * @param {*}
       * @return {*}
       */

      getTableData() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(orgApi.getAllLevel)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.tableLoading = false;
          });
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
