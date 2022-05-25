<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 16:02:27
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/menus/page.vue
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
              <el-form-item :label="$t('platform.menus.menuname')">
                <el-input
                  v-model="query.menuName"
                  size="small"
                  clearable
                  :placeholder="$t('platform.menus.menuname')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.menus.menucode')">
                <el-input
                  v-model="query.menuCode"
                  size="small"
                  clearable
                  :placeholder="$t('platform.menus.menucode')"
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
          width="180"
          :label="$t('platform.menus.menuname')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="code"
          width="200"
          :label="$t('platform.menus.menucode')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="icon"
          width="80"
          :label="$t('platform.menus.menuicon')"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <magus-icon :icon="row.icon" :size="14" />
          </template>
        </el-table-column>
        <el-table-column
          prop="routerName"
          width="120"
          :label="$t('platform.menus.menurouter')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="params"
          min-width="100"
          :label="$t('platform.menus.menuparams')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="order"
          width="60"
          :label="$t('platform.table.order')"
          show-overflow-tooltip
        />
        <el-table-column width="100" :label="$t('platform.table.operation')">
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
              @click="deleteMenu(scope.row)"
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
import menuApi from '@/api/menus.js';
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
        menuName: '',
        menuCode: '',
        parentId: ''
      },
      tableData: [],
      tableLoading: false
    });

    const methods = {
      init() {
        methods.getTableData();
      },
      /**
       * @description: 获取菜单列表
       * @param {*}
       * @return {*}
       */
      getTableData() {
        state.tableLoading = true;
        const {
          params: { entityId }
        } = route;
        if (entityId !== 'root') {
          state.query.parentId = entityId;
        } else {
          state.query.parentId = '';
        }
        proxy.$magusCloudApi.apiConfig
          .get(menuApi.getChildMenu, state.query)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description: 编辑或者新增
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
            name: 'platformMenusPageAdd',
            params: {
              entityId
            }
          });
        } else if (type === 'edit') {
          const { id: entityId } = datas;
          router.push({
            name: 'platformMenusMenuInfo',
            params: {
              entityId
            }
          });
        }
      },
      /**
       * @description: 删除菜单
       * @param {*} datas
       * @return {*}
       */
      deleteMenu(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(menuApi.deleteMenuById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                getTree();
                methods.getTableData();
              });
          })
          .catch(() => {});
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
