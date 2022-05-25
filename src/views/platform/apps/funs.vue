<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 17:46:52
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:34:19
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/apps/funs.vue
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
              <el-form-item :label="$t('platform.apps.funcname')">
                <el-input
                  v-model="query.name"
                  size="small"
                  :placeholder="$t('platform.apps.funcname')"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.apps.functype')">
                <magus-dict-select
                  v-model="query.type"
                  :code="$dicts.fnType"
                  :placeholder="$t('platform.apps.functype')"
                  size="small"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 15px">
              <el-button size="small" type="primary" @click="queryAction">
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
          prop="name"
          min-width="100"
          :label="$t('platform.apps.funcname')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="code"
          min-width="140"
          :label="$t('platform.apps.funcode')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="path"
          min-width="120"
          :label="$t('platform.apps.funcpath')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="method"
          width="80"
          :label="$t('platform.apps.method')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="type"
          width="80"
          :formatter="$dictFormat('type', $dicts.fnType)"
          :label="$t('platform.apps.functype')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="isAuthz"
          width="80"
          :label="$t('platform.table.isAuth')"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ scope.row.isAuthz ? '是' : '否' }}
          </template>
        </el-table-column>
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
              @click="deleteFunction(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 内容页分页，如果不需要请删除 -->
    <template #mainPagebar>
      <!-- 分页器组件 -->
      <magus-paging
        :current-page="query.page"
        :page-size="query.limit"
        layout="sizes, prev, pager, next, jumper"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
  watch
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'PlatformFuncPage',
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      query: {
        name: '',
        dir: '',
        moduleId: '',
        sort: '',
        type: '',
        page: 1,
        limit: 20
      },
      count: 0,
      tableData: [],
      tableLoading: false
    });
    const methods = {
      init() {
        const { entityId } = route.params;
        state.query.moduleId = entityId;
        methods.getTableData();
      },
      handleSizeChange(val) {
        state.query.page = 1;
        state.query.limit = val;
        methods.getTableData();
      },
      handleCurrentChange(val) {
        state.query.page = val;
        methods.getTableData();
      },
      queryAction() {
        state.query.page = 1;
        methods.getTableData();
      },
      /**
       * @description: 获取功能列表
       * @param {*}
       * @return {*}
       */
      getTableData() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(appsApi.getFunctions, state.query)
          .then((res) => {
            state.tableData = res.content;
            state.count = res.totalElements;
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
        const { entityId } = route.params;

        if (type === 'add') {
          router.push({
            name: 'platformAppsFunsAdd',
            params: { entityId }
          });
        } else if (type === 'edit') {
          const { id } = datas;
          router.push({
            name: 'platformAppsFunsEdit',
            params: {
              entityId,
              id
            }
          });
        }
      },
      /**
       * @description: 删除方法
       * @param {*} datas
       * @return {*}
       */
      deleteFunction(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(appsApi.deleteFunctionById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getTableData();
              })
              .catch((err) => {
                proxy.$message({ type: 'error', message: err });
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
