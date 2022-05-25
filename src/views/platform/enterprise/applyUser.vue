<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-11-05 11:13:46
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:20:05
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/enterprise/applyUser.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="applyUser">
    <magus-main-layout>
      <!-- 上方搜索空间，如果不需要请删除 -->
      <template #layoutSearch>
        <!-- 搜索组件 -->
        <magus-search>
          <template #form>
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('platform.users.user_status')">
                  <magus-dict-select
                    v-model="query.status"
                    clearable
                    :placeholder="$t('platform.users.user_status')"
                    :code="$dicts.tenantUserStatus"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6" style="padding-left: 15px">
                <el-button type="primary" size="small" @click="queryList">
                  {{ $t('global.action.search') }}
                </el-button>
              </el-col>
            </el-row>
          </template>
        </magus-search>
      </template>
      <!-- 内容部分 -->
      <template #layoutMain>
        <!--  -->
        <el-table
          :data="tableData"
          size="small"
          height="100%"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="loginId"
            :label="$t('platform.users.user_name')"
            show-overflow-tooltip
            min-width="140"
          />
          <el-table-column
            prop="username"
            :label="$t('platform.users.nick_name')"
            show-overflow-tooltip
            min-width="140"
          />
          <el-table-column
            prop="status"
            :label="$t('platform.users.user_status')"
            show-overflow-tooltip
            :formatter="$dictFormat('status', $dicts.tenantUserStatus)"
            min-width="120"
          />
          <el-table-column
            prop="joinTime"
            :label="$t('platform.joinTime')"
            show-overflow-tooltip
            :formatter="$dateFormat('joinTime', 'yyyy-MM-dd hh:mm:ss')"
            min-width="140"
          />
          <el-table-column
            prop="remark"
            :label="$t('platform.company.remark')"
            show-overflow-tooltip
          />
          <el-table-column :label="$t('platform.table.operation')" width="80">
            <template #default="scope">
              <el-button
                v-show="scope.row.status !== 'AGREED'"
                :text="true"
                size="small"
                icon="el-icon-check"
                :title="$t('platform.action.agree')"
                @click="changeStatus('AGREED', scope.row)"
              />
              <el-button
                v-show="scope.row.status === 'PENDING'"
                :text="true"
                size="small"
                icon="el-icon-close"
                :title="$t('platform.action.refused')"
                @click="changeStatus('REJECTED', scope.row)"
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
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import enterpriseApi from '@/api/enterprise.js';
export default defineComponent({
  name: 'ApplyUser',
  setup() {
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const state = reactive({
      query: {
        dir: '',
        sort: '',
        status: '',
        page: 1,
        limit: 20
      },
      tableData: [],
      tableLoading: false,
      count: 0
    });
    const methods = {
      init() {
        methods.getJoinTenants();
      },
      queryList() {
        state.query.page = 1;
        methods.getJoinTenants();
      },
      handleSizeChange(val) {
        state.query.limit = val;
        methods.getJoinTenants();
      },
      handleCurrentChange(val) {
        state.query.page = val;
        methods.getJoinTenants();
      },
      /**
       * @description: 获取加入企业用户列表
       * @param {*}
       * @return {*}
       */

      getJoinTenants() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(enterpriseApi.getJoinTenants, state.query)
          .then((res) => {
            state.tableData = res.content;
            state.count = res.totalElements;
          })
          .finally(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description: 审批
       * @param {*} type
       * @param {*} datas
       * @return {*}
       */

      changeStatus(type, datas) {
        const tips =
          type === 'AGREED'
            ? t('platform.company.changeStatusAgreeTips')
            : t('platform.company.changeStatuRejectTips');
        proxy
          .$confirm(tips, t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .put(enterpriseApi.changeJoinTenants(datas.id), { status: type })
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getJoinTenants();
              });
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
<style lang="scss" scoped>
.applyUser {
  height: 100%;
  width: 100%;
}
</style>
