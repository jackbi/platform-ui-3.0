<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 10:45:19
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/organizations/manage/page.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="lower-org">
    <magus-main-layout class="list-inner">
      <!-- 上方搜索空间，如果不需要请删除 -->
      <template #layoutSearch>
        <!-- 搜索组件 -->
        <magus-search>
          <template #form>
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('platform.orgs.manage.org_name')">
                  <el-input
                    v-model="query.name"
                    size="small"
                    :placeholder="$t('platform.orgs.manage.org_name')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('platform.orgs.manage.org_code')">
                  <el-input
                    v-model="query.code"
                    size="small"
                    :placeholder="$t('platform.orgs.manage.org_code')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6" style="padding-left: 15px">
                <el-button type="primary" size="small" @click="getTableData">
                  {{ $t('global.action.search') }}
                </el-button>
              </el-col>
            </el-row>
          </template>
        </magus-search>
      </template>
      <!-- 内容页按钮部分，如果不需要请删除 -->
      <template #mainButton>
        <!-- 一些新增按钮或者除了查询外的按钮存放 -->
        <el-button type="primary" size="small" @click="addOrg">
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
            prop="code"
            :label="$t('platform.orgs.manage.org_code')"
            show-overflow-tooltip
            min-width="120"
          />
          <el-table-column
            prop="name"
            :label="$t('platform.orgs.manage.org_name')"
            show-overflow-tooltip
            min-width="120"
          />
          <el-table-column
            prop="order"
            :label="$t('platform.orgs.manage.org_sort')"
            show-overflow-tooltip
            width="80"
          />
          <el-table-column
            prop="remark"
            :label="$t('global.table.description')"
            show-overflow-tooltip
            min-width="120"
          />
          <el-table-column
            prop="levelName"
            :label="$t('platform.orgs.hierarchy.name')"
            show-overflow-tooltip
            width="120"
          />
          <el-table-column
            prop=""
            :label="$t('global.table.operation')"
            show-overflow-tooltip
            width="80"
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
  </div>
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
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import orgApi from '@/api/organizations.js';
export default defineComponent({
  name: 'LowerOrg',
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const getTree = inject('getTree');
    const state = reactive({
      query: {
        code: '',
        name: ''
      },
      tableData: [],
      tableLoading: false
    });
    const methods = {
      init() {
        methods.getTableData();
      },
      editRow(row) {
        const { id } = row;
        router.push({
          name: 'platformOrgsPageAgencyinfo',
          params: { entityId: id }
        });
      },
      deleteRow(row) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            const { id } = row;
            proxy.$magusCloudApi.apiConfig
              .deletes(orgApi.deleteOrgById(id))
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                getTree();
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
        const {
          params: { entityId }
        } = route;
        const params = proxy.$magusCloudApi.commonUtils.deepCopy(state.query);
        if (entityId && entityId !== 'root') {
          params.parentId = entityId;
        }
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(orgApi.getOrgChild, params)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description: 新增组织机构
       * @param {*}
       * @return {*}
       */

      addOrg() {
        const {
          params: { entityId }
        } = route;
        router.push({
          name: 'platformOrgsPageAddAgency',
          params: { entityId }
        });
      }
    };
    methods.init();
    watch(
      () => route.params,
      () => {
        methods.init();
      },
      { flush: 'post' }
    );
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.lower-org {
  height: 100%;
  width: 100%;
}
</style>
