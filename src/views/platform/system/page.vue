<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-06-24 16:16:52
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:35:29
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/system/page.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="system-page">
    <magus-main-layout>
      <!-- 内容页按钮部分，如果不需要请删除 -->
      <template #mainButton>
        <!-- 一些新增按钮或者除了查询外的按钮存放 -->
        <el-button type="primary" size="small" @click="goAdd">
          {{ $t('global.action.add') }}
        </el-button>
      </template>
      <!-- 内容部分 -->
      <template #layoutMain>
        <!--  -->
        <el-table
          v-loading="loading"
          size="small"
          :data="tableData"
          style="width: 100%"
          height="100%"
          border
        >
          <el-table-column
            prop="code"
            min-width="120"
            :label="$t('platform.system.system_code')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="title1"
            min-width="80"
            :label="$t('platform.system.system_title1')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="title2"
            min-width="80"
            :label="$t('platform.system.system_title2')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="copyright"
            min-width="120"
            :label="$t('platform.system.system_copyright')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="icp"
            min-width="100"
            :label="$t('platform.system.system_icp')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="themeColor"
            width="80"
            :label="$t('platform.system.system_themeColor')"
            show-overflow-tooltip
            :formatter="$dictFormat('themeColor', $dicts.systemColor)"
          />
          <el-table-column
            prop="themeLayout"
            width="100"
            :label="$t('platform.system.system_themeLayout')"
            show-overflow-tooltip
            :formatter="$dictFormat('themeLayout', $dicts.systemLayout)"
          />
          <el-table-column
            prop="homePageName"
            width="100"
            :label="$t('platform.system.system_homepage')"
            show-overflow-tooltip
          />
          <el-table-column width="100" :label="$t('platform.table.operation')">
            <template #default="scope">
              <el-button
                :title="$t('global.action.edit')"
                :text="true"
                size="small"
                class="magusdip-iconfont magusdipbianji"
                @click="reWrite(scope.row)"
              />
              <el-button
                :title="$t('platform.system.system_bind_menu')"
                :text="true"
                size="small"
                class="magusdip-iconfont magusdipcaiji"
                @click="bindMenu(scope.row)"
              />
              <el-button
                :title="$t('global.action.delete')"
                :text="true"
                size="small"
                class="magusdip-iconfont magusdipshanchu"
                @click="deleteRow(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </magus-main-layout>
  </div>
</template>
<script>
import { defineComponent, reactive, getCurrentInstance, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import systemApi from '@/api/system';
export default defineComponent({
  name: 'Page',
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const { t } = useI18n();
    const state = reactive({
      loading: false,
      tableData: []
    });

    const methods = {
      init() {
        methods.getSystemList();
      },
      handleSizeChange() {},
      handleCurrentChange() {},
      /**
       * @description: 获取
       * @param {*}
       * @return {*}
       */

      getSystemList() {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .get(systemApi.getSystemList)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.loading = false;
          });
      },
      /**
       * @description: 新增
       * @param {*}
       * @return {*}
       */

      goAdd() {
        router.push({ name: 'platformSystemAdd' });
      },
      /**
       * @description: 编辑
       * @param {*}
       * @return {*}
       */

      reWrite(datas) {
        const { id } = datas;
        router.push({
          name: 'platformSystemWrite',
          params: { id }
        });
      },
      /**
       * @description: 删除
       * @param {*}
       * @return {*}
       */

      deleteRow(datas) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            proxy.$magusCloudApi.apiConfig
              .deletes(systemApi.deleteMenuById(datas.id), {})
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.getSystemList();
              })
              .catch(() => {});
          })
          .catch(() => {});
      },
      /**
       * @description: 绑定菜单
       * @param {*}
       * @return {*}
       */

      bindMenu(datas) {
        router.push({
          name: 'platformSystemMenus',
          params: { id: datas.id }
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
.system-page {
  height: 100%;
  width: 100%;
}
</style>
