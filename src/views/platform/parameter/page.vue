<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-07-19 13:25:34
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 10:11:18
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/parameter/page.vue
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
            <!-- <el-col :span="6">
                <el-form-item :label="$t('platform.parameter.param_name')">
                  <el-input
                  size="small"
                    v-model="query.name"
                    :placeholder="$t('platform.parameter.param_name')"
                  ></el-input>
                </el-form-item>
              </el-col> -->
            <el-col :span="6">
              <el-form-item :label="$t('platform.parameter.param_app')">
                <el-select
                  v-model="query.appCode"
                  :placeholder="$t('platform.parameter.param_app')"
                  clearable
                  size="small"
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
            <el-col style="padding-left: 15px" :span="6">
              <el-button type="primary" size="small" @click="getParams">
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
      <el-button type="primary" size="small" @click="goAddParams">
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
          :label="$t('platform.parameter.param_app')"
          width="140"
        />
        <el-table-column
          prop="code"
          :label="$t('platform.parameter.param_code')"
          min-width="120"
        />
        <el-table-column
          prop="value"
          :label="$t('platform.parameter.param_value')"
          min-width="120"
        />
        <el-table-column
          prop="remark"
          :label="$t('platform.parameter.param_remark')"
          min-width="120"
        />
        <el-table-column :label="$t('platform.table.operation')" width="80">
          <template #default="scope">
            <el-button
              class="magusdip-iconfont magusdipbianji"
              :text="true"
              :title="$t('global.action.edit')"
              @click="goWriteParams(scope.row)"
            />
            <el-button
              :text="true"
              class="magusdip-iconfont magusdipshanchu"
              :title="$t('global.action.delete')"
              size="small"
              @click="deleteParams(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </magus-main-layout>
  <add-params
    ref="addParams"
    :is-show="paramsAdd.isShow"
    :app-list="appList"
    @cancel="cancelAddParams"
    @save="getParams"
  />
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  nextTick
} from 'vue';
import { useI18n } from 'vue-i18n';
import paramsApi from '@/api/params';
import addParams from './addParams.vue';
export default defineComponent({
  name: 'ParameterPage',
  components: {
    addParams
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const addParams = ref();
    const { t } = useI18n();
    const state = reactive({
      query: {
        appCode: ''
      },
      count: 0,
      appList: [],
      tableData: [],
      loading: false,
      paramsAdd: {
        isShow: false
      }
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getAllApps();
        methods.getParams();
      },
      /**
       * @description: 获取所有应用
       * @param {*}
       * @return {*}
       */

      getAllApps() {
        proxy.$magusCloudApi.apiConfig.get(paramsApi.getAllApps).then((res) => {
          state.appList = res;
        });
      },
      /**
       * @description: 获取参数列表
       * @param {*}
       * @return {*}
       */

      getParams() {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .get(paramsApi.getParams, state.query)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.loading = false;
          });
      },
      /**
       * @description: 新增参数
       * @param {*}
       * @return {*}
       */

      goAddParams() {
        state.paramsAdd.isShow = true;
      },
      /**
       * @description: 取消新增或编辑
       * @param {*}
       * @return {*}
       */

      cancelAddParams() {
        state.paramsAdd.isShow = false;
      },
      /**
       * @description: 编辑
       * @param {*} datas
       * @return {*}
       */

      goWriteParams(datas) {
        nextTick(() => {
          addParams.value.getParamsById(datas.id).then(() => {
            state.paramsAdd.isShow = true;
          });
        });
      },
      /**
       * @description: 删除参数
       * @param {*} datas
       * @return {*}
       */

      deleteParams(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(paramsApi.deleteParamsById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getParams();
              });
          })
          .catch(() => {});
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      addParams,
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
}
</style>
