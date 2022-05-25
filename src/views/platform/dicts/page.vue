<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 16:37:35
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-17 17:16:20
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/dicts/page.vue
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
              <el-form-item :label="$t('platform.dicts.dicts_name')">
                <el-input
                  v-model="query.dictName"
                  size="small"
                  clearable
                  :placeholder="$t('platform.dicts.dicts_name')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.dicts.dicts_app')">
                <el-select
                  v-model="query.appCode"
                  clearable
                  size="small"
                  :placeholder="$t('platform.dicts.dicts_app')"
                >
                  <el-option
                    v-for="item in appList"
                    :key="item.appCode"
                    :label="item.appName"
                    :value="item.appCode"
                  />
                </el-select>
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
      <el-button type="primary" size="small" @click="goAddDicts">
        {{ $t('global.action.add') }}
      </el-button>
    </template>
    <!-- 内容部分 -->
    <template #layoutMain>
      <!--  -->
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        size="small"
        height="100%"
        style="width: 100%"
      >
        <el-table-column
          prop="appName"
          :label="$t('platform.dicts.dicts_app')"
          width="140"
        />
        <el-table-column
          prop="code"
          :label="$t('platform.dicts.dicts_code')"
          min-width="120"
        />
        <el-table-column
          prop="name"
          :label="$t('platform.dicts.dicts_name')"
          width="140"
        />
        <el-table-column :label="$t('platform.table.operation')" width="120">
          <template #default="scope">
            <el-button
              class="magusdip-iconfont magusdipbianji"
              :text="true"
              :title="$t('global.action.edit')"
              @click="goWriteDicts(scope.row)"
            />
            <el-button
              class="magusdip-iconfont magusdipjibenxinxi"
              :text="true"
              :title="$t('platform.table.dictEntry')"
              @click="goParams(scope.row)"
            />
            <el-button
              class="magusdip-iconfont magusdipshanchu"
              :text="true"
              :title="$t('global.action.delete')"
              @click="deleteDict(scope.row)"
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
import dicts from '@/api/dicts.js';
// import { aliveBase } from '@/common/mixin/index';
export default defineComponent({
  // mixins: [aliveBase],
  name: 'PlatformDictsPage',
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const state = reactive({
      query: {
        dictName: '',
        appCode: '',
        dir: '',
        sort: '',
        page: 1,
        limit: 20
      },
      count: 0,
      tableData: [],
      appList: [],
      loading: false
    });

    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getDictsType();
        methods.getAllApps();
      },
      /**
       * @description: 改变显示条数
       * @param {*} val
       * @return {*}
       */

      handleSizeChange(val) {
        state.query.limit = val;
        state.query.page = 1;
        methods.getDictsType();
      },
      /**
       * @description: 改变当前页码
       * @param {*} val
       * @return {*}
       */

      handleCurrentChange(val) {
        state.query.page = val;
        methods.getDictsType();
      },
      /**
       * @description: 新增字典类型
       * @param {*}
       * @return {*}
       */
      goAddDicts() {
        router.push({
          name: 'platformDictsAddDicts'
        });
      },
      /**
       * @description: 编辑字典类型
       * @param {*}
       * @return {*}
       */
      goWriteDicts(datas) {
        router.push({
          name: 'platformDictsWriteDicts',
          params: { id: datas.id }
        });
      },
      goParams(datas) {
        router.push({
          name: 'platformDictsParams',
          params: { id: datas.id }
        });
      },
      /**
       * @description: 查询
       * @param {*}
       * @return {*}
       */

      goSearch() {
        state.query.page = 1;
        methods.getDictsType();
      },
      /**
       * @description: 获取字典分类
       * @param {*}
       * @return {*}
       */

      getDictsType() {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .get(dicts.getDictsType, state.query)
          .then((res) => {
            state.tableData = res.content;
            state.count = res.totalElements;
          })
          .finally(() => {
            state.loading = false;
          });
      },
      /**
       * @description: 获取所有应用
       * @param {*}
       * @return {*}
       */

      getAllApps() {
        proxy.$magusCloudApi.apiConfig.get(dicts.getAllApps).then((res) => {
          state.appList = res;
        });
      },

      /**
       * @description: 删除字典
       * @param {*}
       * @return {*}
       */

      deleteDict(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(dicts.deleteDictTypeById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getDictsType();
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
<style lang="scss" scoped>
.platform-dicts-page {
  height: 100%;
  width: 100%;
}
</style>
