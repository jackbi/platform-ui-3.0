<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-01-18 13:41:45
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 13:58:39
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/templatefile/page.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout>
    <!-- 上方搜索空间，如果不需要请删除 -->
    <template #layoutSearch>
      <!-- 搜索组件 -->
      <magus-search>
        <template #form>
          <!-- 存放基础查询条件 -->
          <el-row>
            <el-col :span="6">
              <el-form-item
                :label="$t('platform.templatefile.templatefile_app')"
              >
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
              <el-button type="primary" size="small" @click="queryAction">
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
      <el-button type="primary" size="small" @click="addTemplateFile">
        {{ $t('global.action.add') }}
      </el-button>
    </template>
    <!-- 内容部分 -->
    <template #layoutMain>
      <!--  -->
      <el-table
        v-loading="tableLoading"
        border
        script
        size="small"
        height="100%"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          :label="$t('platform.templatefile.templatefile_name')"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          prop="code"
          :label="$t('platform.templatefile.templatefile_code')"
          show-overflow-tooltip
          width="140"
        />
        <el-table-column
          prop="file"
          :label="$t('platform.templatefile.templatefile_file')"
          show-overflow-tooltip
          width="80"
        >
          <template #default="{ row }">
            <el-button
              :text="true"
              size="small"
              class="magusdip-iconfont magusdipxiazai"
              @click="downloadFile(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="appName"
          :label="$t('platform.templatefile.templatefile_app')"
          show-overflow-tooltip
          width="120"
        />
        <el-table-column
          prop="remark"
          :label="$t('global.table.description')"
          show-overflow-tooltip
          min-width="120"
        />
        <el-table-column
          :label="$t('global.table.operation')"
          show-overflow-tooltip
          width="120"
        >
          <template #default="{ row }">
            <el-button
              :text="true"
              size="small"
              :title="$t('global.action.edit')"
              class="magusdip-iconfont magusdipbianji"
              @click="editRow(row)"
            />
            <el-button
              :text="true"
              size="small"
              :title="$t('platform.templatefile.templatefile_updateFile')"
              class="magusdip-iconfont magusdipshangchuan"
              @click="updateFile(row)"
            />
            <el-button
              :text="true"
              size="small"
              :title="$t('global.action.delete')"
              class="magusdip-iconfont magusdipshanchu"
              @click="deleteRow(row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </magus-main-layout>
  <magus-upload-file-dialog
    ref="magusUpload"
    :is-show="changeFile.isShow"
    :action="changeFile.actionUrl"
    :methods="changeFile.method"
    accept=" "
    :upload-tip="$t('platform.templatefile.templatefile_file')"
    :form-data-value="changeFile.formData"
    @cancel="cancelChangeFile"
  />
</template>
<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import templatefileApi from '@/api/templatefile';
export default defineComponent({
  name: 'Page',
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const state = reactive({
      query: {
        appCode: ''
      },
      count: 0,
      tableData: [],
      tableLoading: false,
      appList: [],
      changeFile: {
        isShow: false,
        actionUrl: '',
        method: 'put',
        formData: {}
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
        methods.queryAction();
      },
      editRow(row) {
        const { id } = row;
        router.push({
          name: 'platformTemplateFilesEdit',
          params: { id }
        });
      },
      deleteRow(row) {
        proxy
          .$confirm(t('global.text.delete'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            const { id } = row;
            proxy.$magusCloudApi.apiConfig
              .deletes(templatefileApi.deleteTemplateById(id))
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.queryAction();
              });
          });
      },
      downloadFile(row) {
        const { code, name } = row;
        proxy.$magusCloudApi.apiConfig.downloadByCode(code, `${name}.xlsx`);
      },
      updateFile(row) {
        const { appCode, code, id, name, remark } = row;
        state.changeFile.actionUrl = templatefileApi.editTemplateInfoByid(id);
        state.changeFile.formData = {
          appCode,
          code,
          name,
          remark,
          updateFile: true
        };
        state.changeFile.isShow = true;
      },
      /**
       * @description: 获取表格数据
       * @param {*}
       * @return {*}
       */

      queryAction() {
        state.tableLoading = true;
        proxy.$magusCloudApi.apiConfig
          .get(templatefileApi.getTemplateFileList, state.query)
          .then((res) => {
            state.tableData = res;
          })
          .finally(() => {
            state.tableLoading = false;
          });
      },
      /**
       * @description:  获取所有应用
       * @param {*}
       * @return {*}
       */

      getAllApps() {
        proxy.$magusCloudApi.apiConfig
          .get(templatefileApi.getAllApps)
          .then((res) => {
            state.appList = res;
          });
      },
      /**
       * @description: 新增
       * @param {*}
       * @return {*}
       */

      addTemplateFile() {
        router.push({ name: 'platformTemplateFilesAdd' });
      },
      /**
       * @description: 取消修改文件
       * @param {*}
       * @return {*}
       */

      cancelChangeFile() {
        state.changeFile = {
          isShow: false,
          actionUrl: '',
          method: 'put',
          formData: {}
        };
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
