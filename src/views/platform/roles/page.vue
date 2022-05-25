<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 13:21:05
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/roles/page.vue
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
              <el-form-item :label="$t('platform.roles.role_code')">
                <el-input
                  v-model="query.code"
                  clearable
                  :placeholder="$t('platform.roles.role_code')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.roles.role_name')">
                <el-input
                  v-model="query.name"
                  clearable
                  :placeholder="$t('platform.roles.role_name')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.roles.role_type')">
                <magus-dict-select
                  v-model="query.type"
                  :code="$dicts.rolesTypes"
                  :placeholder="$t('platform.roles.role_type')"
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
          prop="code"
          min-width="140"
          :label="$t('platform.roles.role_code')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="name"
          min-width="140"
          :label="$t('platform.roles.role_name')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="type"
          width="100"
          :label="$t('platform.roles.role_type')"
          show-overflow-tooltip
        >
          <template #default="scope">
            <!-- TODO: -->
            <!-- {{ roleTypeData.find((i) => i.value === scope.row.type).text }} -->
            <magus-dict-label
              :code="$dicts.rolesTypes"
              :value="scope.row.type"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          min-width="140"
          :label="$t('platform.apps.remark')"
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
              @click="deleteRole(scope.row)"
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
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import rolesApi from '@/api/roles.js';
export default defineComponent({
  name: 'PlatformRolesPage',
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      query: {
        name: '',
        page: 1,
        limit: 20,
        type: '',
        code: ''
      },
      count: 0,
      tableData: [],
      tableLoading: false
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getRoleList();
      },
      /**
       * @description: 查询
       * @param {*}
       * @return {*}
       */

      goSearch() {
        state.query.page = 1;
        methods.getRoleList();
      },
      /**
       * @description: 改变一页显示多少条
       * @param {*} val
       * @return {*}
       */
      handleSizeChange(val) {
        state.query.page = 1;
        state.query.limit = val;
        methods.getRoleList();
      },
      /**
       * @description: 改变当前页
       * @param {*} val
       * @return {*}
       */

      handleCurrentChange(val) {
        state.query.page = val;
        methods.getRoleList();
      },
      /**
       * @description: 新增或编辑角色
       * @param {*} type
       * @param {*} datas
       * @return {*}
       */

      goAddorEdit(type, datas) {
        if (type === 'add') {
          router.push({ name: 'platformRolesAdd' });
        } else if (type === 'edit') {
          router.push({
            name: 'platformRolesAdd',
            query: { id: datas.id }
          });
        }
      },
      /**
       * @description: 删除角色
       * @param {*}datas
       * @return {*}
       */

      deleteRole(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(rolesApi.deleteRoleById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getRoleList();
              })
              .catch(() => {});
          })
          .catch(() => {});
      },
      /**
       * @description: 获取角色列表
       * @param {*}
       * @return {*}
       */

      getRoleList() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(rolesApi.getRoleList, state.query)
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
