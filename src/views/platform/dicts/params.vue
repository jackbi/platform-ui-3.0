<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 16:50:39
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 10:10:29
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/dicts/params.vue
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
              <el-form-item :label="$t('platform.dicts.dicts_entry_name')">
                <el-input
                  v-model="query.name"
                  clearable
                  :placeholder="$t('platform.dicts.dicts_entry_name')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 15px">
              <el-button size="small" type="primary" @click="getParams">
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
      <el-button type="primary" size="small" @click="$back()">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button type="primary" size="small" @click="goAdd">
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
          prop="name"
          :label="$t('platform.dicts.dicts_entry_name')"
          min-width="120"
        />
        <el-table-column
          prop="code"
          :label="$t('platform.dicts.dicts_entry_value')"
          min-width="120"
        />
        <el-table-column
          prop="enabled"
          :label="$t('platform.dicts.dicts_entry_enabled')"
          min-width="120"
        >
          <template #default="scope">
            {{
              scope.row.enabled
                ? $t('platform.table.enable')
                : $t('platform.table.disable')
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="order"
          :label="$t('platform.table.order')"
          min-width="120"
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
              :class="
                scope.row.enabled
                  ? 'magusdip-iconfont magusdipweilianjie'
                  : 'magusdip-iconfont magusdiplianjie'
              "
              :text="true"
              :title="
                scope.row.enabled
                  ? $t('platform.table.disable')
                  : $t('platform.table.enable')
              "
              @click="enabledDic(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </magus-main-layout>
  <add-params
    ref="addParams"
    :is-show="paramsAddInfo.isShow"
    @save="getParams"
    @cancel="paramsAddInfo.isShow = false"
  />
</template>
<script>
import dicts from '@/api/dicts.js';
import addParams from './addParams.vue';
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance
} from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'PlatformDictsParams',
  components: {
    addParams
  },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const addParams = ref();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      query: {
        name: '',
        dictTypeId: ''
      },
      paramsAddInfo: {
        isShow: false
      },
      tableData: [],
      loading: false
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        state.query.dictTypeId = route.params.id;
        methods.getParams();
      },
      /**
       * @description: 新增字典项
       * @param {*}
       * @return {*}
       */

      goAdd() {
        state.paramsAddInfo.isShow = true;
      },
      /**
       * @description: 编辑字典项
       * @param {*}
       * @return {*}
       */

      goWriteDicts(datas) {
        addParams.value.getEntryById(datas.id).then(() => {
          state.paramsAddInfo.isShow = true;
        });
      },
      /**
       * @description: 获取字典项
       * @param {*}
       * @return {*}
       */

      getParams() {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .get(dicts.getEntrys, state.query)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.loading = false;
          });
      },
      /**
       * @description: 启用禁用
       * @param {*} datas
       * @return {*}
       */

      enabledDic(datas) {
        const params = {
          code: datas.code,
          dictTypeId: route.params.id,
          name: datas.name,
          enabled: !datas.enabled,
          order: datas.order
        };
        proxy.$magusCloudApi.apiConfig
          .put(dicts.writeEntrys(datas.id), params)
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            methods.getParams();
          });
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      ...methods,
      addParams
    };
  }
});
</script>
