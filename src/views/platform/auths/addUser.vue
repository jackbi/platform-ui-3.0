<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 15:47:40
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 15:10:21
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/auths/addUser.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template class="add-app" :title="$t('platform.users.append_user')">
    <template #main>
      <magus-main-layout class="container-inner">
        <template #layoutSearch>
          <!-- 搜索组件 -->
          <magus-search class="platform-authsaddusers-search">
            <template #form>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('platform.users.user_name')">
                    <el-input
                      v-model="query.loginId"
                      clearable
                      :placeholder="$t('platform.users.user_name')"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('platform.users.nick_name')">
                    <el-input
                      v-model="query.userName"
                      clearable
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
    <template #footer>
      <el-button size="small" @click="$back()">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button
        size="small"
        :loading="saveLoading"
        type="primary"
        @click="goSave"
      >
        {{ $t('global.action.save') }}
      </el-button>
    </template>
  </magus-add-template>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import auths from '@/api/auth.js';
export default defineComponent({
  name: 'AddUser',
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      query: {
        dir: '',
        roleId: '',
        page: 1,
        limit: 20,
        userName: '',
        loginId: ''
      },
      count: 0,
      tableData: [],
      tableLoading: false,
      checkedTable: [],
      saveLoading: false
    });
    const methods = {
      init() {
        const {
          query: { id }
        } = route;
        if (id) {
          state.query.roleId = id;
          methods.goSearch();
        }
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
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        const userIds = state.checkedTable.map((i) => i.userGuid);
        const roleId = state.query.roleId;
        state.saveLoading = true;
        proxy.$magusCloudApi.apiConfig
          .post(auths.saveAuthUsers, { userIds, roleId })
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
      },
      /**
       * @description: 获取已授权用户
       * @param {*}
       * @return {*}
       */

      getAuthUsers() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(auths.getUnAuthUsers, state.query)
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
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
