<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 13:32:31
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/users/page.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout>
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
            <el-col :span="6">
              <el-form-item :label="$t('platform.users.user_status')">
                <magus-dict-select
                  v-model="query.status"
                  :code="$dicts.useState"
                  :placeholder="$t('platform.users.user_status')"
                  size="small"
                  clearable
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
          prop="status"
          width="100"
          :label="$t('platform.users.user_status')"
          :formatter="$dictFormat('status', $dicts.useState)"
          show-overflow-tooltip
        />
        <el-table-column
          prop="mobile"
          width="120"
          :label="$t('platform.users.user_mobile')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="email"
          width="180"
          :label="$t('platform.users.user_email')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="wechat"
          width="100"
          :label="$t('platform.users.user_wechat')"
          show-overflow-tooltip
        />

        <!-- <el-table-column
            prop="avatar"
            min-width="100"
            :label="$t('platform.users.user_avatar')"
            show-overflow-tooltip
          ></el-table-column> -->
        <el-table-column width="100" :label="$t('global.table.operation')">
          <template #default="{ row }">
            <el-button
              :text="true"
              class="magusdip-iconfont magusdipbianji"
              :title="$t('global.action.edit')"
              size="small"
              @click="goAddorEdit('edit', row)"
            />
            <el-button
              :text="true"
              class="magusdip-iconfont magusdiptingyong1"
              :title="$t('platform.action.disable')"
              size="small"
              @click="deleteUser(row)"
            />
            <el-button
              :text="true"
              class="magusdip-iconfont magusdipzhongshemima"
              :title="$t('platform.users.reset_password')"
              size="small"
              @click="resetPassword(row)"
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
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import userApi from '@/api/users.js';
export default defineComponent({
  name: 'PlatformUsersPage',
  components: {},
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      query: {
        userName: '',
        loginId: '',
        status: '',
        dir: '',
        sort: '',
        page: 1,
        limit: 20
      },
      tableData: [],
      tableLoading: false,
      count: 0
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getUserList();
      },
      /**
       * @description: 查询
       * @param {*}
       * @return {*}
       */

      goSearch() {
        state.query.page = 1;
        methods.getUserList();
      },
      /**
       * @description: 改变一页显示多少条
       * @param {*} val
       * @return {*}
       */

      handleSizeChange(val) {
        state.query.limit = val;
        methods.getUserList();
      },
      /**
       * @description: 改变当前页
       * @param {*} val
       * @return {*}
       */

      handleCurrentChange(val) {
        state.query.page = val;
        methods.getUserList();
      },
      /**
       * @description: 新增或编辑用户
       * @param {*} type
       * @param {*} datas
       * @return {*}
       */

      goAddorEdit(type, datas) {
        if (type === 'add') {
          router.push({ name: 'platformUsersAdd' });
        } else if (type === 'edit') {
          router.push({
            name: 'platformUsersAdd',
            query: { id: datas.id }
          });
        }
      },
      /**
       * @description: 获取用户列表
       * @param {*}
       * @return {*}
       */

      getUserList() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(userApi.getUserList, state.query)
          .then((res) => {
            state.tableData = res.content;
            state.count = res.totalElements;
          })
          .finally(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description: 删除用户
       * @param {*} datas
       * @return {*}
       */

      deleteUser(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(userApi.deleteUserById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getUserList();
              })
              .catch(() => {});
          })
          .catch(() => {});
      },
      /**
       * @description: 重置密码
       * @param {*}
       * @return {*}
       */

      resetPassword(datas) {
        const { userGuid } = datas;
        proxy
          .$confirm(
            t('platform.users.reset_password_tip'),
            t('platform.users.reset_password'),
            {
              confirmButtonText: t('global.action.confirm'),
              cancelButtonText: t('global.action.cancel'),
              type: 'warning',
              draggable: true
            }
          )
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .post(userApi.resetUserPassword, { userGuid })
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
              })
              .catch(() => {});
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
