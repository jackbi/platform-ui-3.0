<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-25 14:28:30
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/apps/page.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout class="list-inner">
    <!-- 上方搜索空间，如果不需要请删除 -->
    <template #layoutSearch>
      <!-- 搜索组件 -->
      <magus-search>
        <template #form>
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('platform.apps.appname')">
                <el-input
                  v-model="query.name"
                  size="small"
                  clearable
                  :placeholder="$t('platform.apps.appname')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.apps.apptype')">
                <magus-dict-select
                  v-model="query.type"
                  :code="$dicts.appType"
                  :placeholder="$t('platform.apps.apptype')"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.apps.opentype')">
                <magus-dict-select
                  v-model="query.enabled"
                  :code="$dicts.appOpenType"
                  :placeholder="$t('platform.apps.opentype')"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 15px">
              <el-button size="small" type="primary" @click="getTableData">
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
          min-width="100"
          :label="$t('platform.apps.appname')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="type"
          width="80"
          :label="$t('platform.apps.apptype')"
          show-overflow-tooltip
        >
          <template #default="scope">
            <magus-dict-label
              :code="$dicts.appType"
              :value="`${scope.row.type}`"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          width="80"
          :label="$t('platform.apps.opentype')"
          show-overflow-tooltip
        >
          <template #default="scope">
            <magus-dict-label
              :code="$dicts.appOpenType"
              :value="`${scope.row.enabled}`"
            />
            <!-- {{ scope.row.enabled ? "是" : "否" }} -->
          </template>
        </el-table-column>
        <el-table-column
          prop="webUrl"
          min-width="120"
          :label="$t('platform.apps.app_web_baseurl')"
          show-overflow-tooltip
        />
        <!-- <el-table-column
            prop="webPort"
            min-width="80"
            :label="$t('platform.apps.app_web_port')"
            show-overflow-tooltip
          ></el-table-column> -->
        <el-table-column
          prop="baseUrl"
          min-width="120"
          :label="$t('platform.apps.app_api_baseurl')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remark"
          min-width="100"
          :label="$t('platform.apps.remark')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="code"
          width="140"
          :label="$t('platform.apps.appcode')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remark"
          width="80"
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
              :title="$t('global.action.delete')"
              size="small"
              @click="deleteApp(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </magus-main-layout>
</template>
<script>
import appsApi from '@/api/apps.js';
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  inject
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'PlatformAppsPage',
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    const getTree = inject('getTree');
    const { t } = useI18n();
    const state = reactive({
      tableData: [],
      tableLoading: false,
      query: {
        name: '',
        type: '',
        enabled: ''
      }
    });
    const methods = {
      init() {
        methods.getTableData();
      },
      /**
       * @description: 获取所有应用
       * @param {*}
       * @return {*}
       */
      getTableData() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(appsApi.getApps, state.query)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description: 删除或者新增
       * @param {*} type 【add, edit】
       * @param {*} datas app信息
       * @return {*}
       */
      goAddorEdit(type, datas) {
        if (type === 'add') {
          const {
            params: { entityId }
          } = route;
          router.push({
            name: 'platformAppsPageAdd',
            params: { entityId }
          });
        } else if (type === 'edit') {
          const { id: entityId } = datas;
          router.push({
            name: 'platformAppsAppInfo',
            params: { entityId }
          });
        }
      },
      /**
       * @description: 删除应用
       * @param {*} datas 应用信息
       * @return {*}
       */
      deleteApp(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(appsApi.deleteAppById(datas.id), {})
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
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
