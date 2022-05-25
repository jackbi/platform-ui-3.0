<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-01-18 15:44:24
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:12:08
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/templatefile/addorWrite.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <magus-add-template
    :title="
      $route.params.id
        ? $t('platform.templatefile.edit')
        : $t('platform.templatefile.add')
    "
  >
    <template #main>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRule"
        label-width="100px"
      >
        <el-form-item
          :label="$t('platform.templatefile.templatefile_app')"
          prop="appCode"
        >
          <el-select
            v-model="formData.appCode"
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
        <el-form-item
          :label="$t('platform.templatefile.templatefile_name')"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :placeholder="$t('platform.templatefile.templatefile_name')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.templatefile.templatefile_code')"
          prop="code"
        >
          <el-input
            v-model="formData.code"
            :disabled="Boolean($route.params.id)"
            :placeholder="$t('platform.templatefile.templatefile_code')"
          />
        </el-form-item>
        <el-form-item
          v-if="!Boolean($route.params.id)"
          :label="$t('platform.templatefile.templatefile_file')"
        >
          <magus-upload-file
            ref="magusUpload"
            :action="actionUrl"
            :methods="method"
            accept=" "
            :upload-tip="$t('platform.templatefile.templatefile_file')"
            :form-data-value="formData"
            @handle-error="handleError"
            @handle-success="handleSuccess"
          />
        </el-form-item>
        <el-form-item :label="$t('global.table.description')" prop="remark">
          <el-input
            v-model="formData.remark"
            :placeholder="$t('global.table.description')"
            type="textarea"
            resize="none"
            :rows="3"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button size="small" @click="cancel">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button
        :loading="loading"
        type="primary"
        size="small"
        @click="confirm"
      >
        {{ $t('global.action.save') }}
      </el-button>
    </template>
  </magus-add-template>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import templatefileApi from '@/api/templatefile';
export default defineComponent({
  name: 'AddorWrite',
  setup() {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const {
      params: { id }
    } = route;
    const formRef = ref();
    const magusUpload = ref();
    const state = reactive({
      formData: {
        appCode: '',
        code: '',
        name: '',
        remark: '',
        updateFile: false
      },
      loading: false,
      formRule: {
        appCode: [
          {
            required: true,
            message: t('platform.templatefile.templatefile_app'),
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: t('platform.templatefile.templatefile_name'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.templatefile.templatefile_code_tip'),
            pattern: proxy.$magusCloudApi.validateUtils.en_num_line(2, 50),
            trigger: 'blur'
          }
        ]
      },
      actionUrl: templatefileApi.addTemplateFile,
      method: 'post',
      appList: []
    });
    const methods = {
      init() {
        methods.getAllApps();
        if (id) {
          methods.getInfoById(id);
        }
      },
      cancel() {
        proxy.$back();
      },
      handleError() {
        state.loading = false;
      },
      handleSuccess() {
        state.loading = false;
        methods.cancel();
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
       * @description: 通过id获取信息
       * @param {*}
       * @return {*}
       */

      getInfoById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(templatefileApi.getTemplateInfoByid(id))
          .then((res) => {
            Object.keys(state.formData).forEach((keys) => {
              if (keys !== 'updateFile') {
                state.formData[keys] = res[keys] ? res[keys] : '';
              }
            });
          });
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      confirm() {
        formRef.value.validate((valid) => {
          if (valid) {
            state.loading = true;
            if (id) {
              const formData = new FormData();
              for (const i in state.formData) {
                formData.append(i, state.formData[i]);
              }
              proxy.$magusCloudApi.apiConfig
                .put(templatefileApi.editTemplateInfoByid(id), formData)
                .then(() => {
                  proxy.$message({
                    type: 'success',
                    message: t('global.text.success')
                  });
                  methods.cancel();
                })
                .finally(() => {
                  state.loading = false;
                });
            } else {
              magusUpload.value.submit();
            }
          } else {
            return false;
          }
        });
      }
    };
    return {
      ...toRefs(state),
      ...methods,
      formRef,
      magusUpload
    };
  }
});
</script>
<style lang="scss" scoped></style>
