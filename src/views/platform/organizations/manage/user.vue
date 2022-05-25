<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-02-18 15:36:40
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 10:30:44
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/organizations/manage/user.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
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
              <el-form-item :label="$t('platform.users.user_name')">
                <el-input
                  v-model="query.loginId"
                  :placeholder="$t('platform.users.user_name')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.users.nick_name')">
                <el-input
                  v-model="query.userName"
                  :placeholder="$t('platform.users.nick_name')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 15px">
              <el-button size="small" type="primary" @click="goSearch">
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
      <el-button type="primary" size="small" @click="goAddUser">
        {{ $t('global.action.add') }}
      </el-button>
      <el-button
        type="danger"
        :disabled="checkedTable.length === 0"
        size="small"
        @click="deleteUser"
      >
        {{ $t('global.action.delete') }}
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="loginId"
          min-width="100"
          :label="$t('platform.users.user_name')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="userName"
          min-width="100"
          :label="$t('platform.users.nick_name')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="wechat"
          min-width="100"
          :label="$t('platform.users.user_wechat')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="email"
          min-width="140"
          :label="$t('platform.users.user_email')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="mobile"
          min-width="100"
          :label="$t('platform.users.user_mobile')"
          show-overflow-tooltip
        />
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
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  watch
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import orgApi from '@/api/organizations.js';
export default defineComponent({
  name: 'OrgAuthUser',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const {
      params: { entityId }
    } = route;
    const state = reactive({
      query: {
        dir: '',
        orgId: '',
        page: 1,
        limit: 20,
        userName: '',
        loginId: ''
      },
      count: 0,
      tableData: [],
      tableLoading: false,
      checkedTable: []
    });
    const methods = {
      init() {
        if (entityId) {
          state.query.orgId = entityId;
        }
        methods.goSearch();
      },
      /**
       * @description: 选择
       * @param {*} val
       * @return {*}
       */

      handleSelectionChange(val) {
        state.checkedTable = val;
      },
      /**
       * @description: 删除已绑定的用户
       * @param {*} datas
       * @return {*}
       */

      deleteUser() {
        let userIds = state.checkedTable.map((i) => `${i.userGuid}`);
        const { entityId: orgId } = route.params;
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(orgApi.deleteAuthUsers, { userIds, orgId })
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.goSearch();
              })
              .catch((err) => {
                methods.$message({ type: 'error', message: err });
              });
          })
          .catch(() => {});
      },
      /**
       * @description: 查询
       * @param {*}
       * @return {*}
       */

      goSearch() {
        state.query.page = 1;
        methods.getAuthUsers();
      },
      handleSizeChange(val) {
        state.query.limit = val;
        methods.getAuthUsers();
      },
      handleCurrentChange(val) {
        state.query.page = val;
        methods.getAuthUsers();
      },
      goAddUser() {
        router.push({
          name: 'platformOrgsPageEmployeeAuth',
          params: { entityId }
        });
      },
      /**
       * @description: 获取已授权用户
       * @param {*}
       * @return {*}
       */

      getAuthUsers() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(orgApi.getAuthUsers, state.query)
          .then((res) => {
            state.tableData = res.content;
            state.count = res.totalElements;
          })
          .finally(() => {
            state.tableLoading = false;
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
