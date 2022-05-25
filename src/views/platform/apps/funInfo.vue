<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 17:47:02
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-24 13:26:34
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/apps/funInfo.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template
    :title="
      $route.params.id
        ? $t('platform.apps.func_edit')
        : $t('platform.apps.func_add')
    "
  >
    <template #main>
      <el-form
        ref="formRef"
        :model="funData"
        label-width="80px"
        :rules="rules"
        size="small"
      >
        <el-form-item :label="$t('platform.apps.funcname')" prop="name">
          <el-input
            v-model="funData.name"
            :placeholder="$t('platform.apps.funcname')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.apps.funcode')" prop="code">
          <el-input
            v-model="funData.code"
            :disabled="Boolean($route.params.id)"
            :placeholder="$t('platform.apps.funcode')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.apps.funcpath')">
          <el-input
            v-model="funData.path"
            :placeholder="$t('platform.apps.funcpath')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.apps.functype')">
          <magus-dict-select
            v-model="funData.type"
            :code="$dicts.fnType"
            :placeholder="$t('platform.apps.functype')"
            size="small"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.table.isAuth')">
          <el-radio-group v-model="funData.isAuthz" size="small">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('platform.apps.method')">
          <magus-dict-select
            v-model="funData.method"
            :code="$dicts.interfaceMethod"
            :placeholder="$t('platform.apps.method')"
            :disabled="funData.type === 'PAGE'"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.apps.remark')">
          <el-input
            v-model="funData.remark"
            type="textarea"
            :rows="4"
            resize="none"
            :placeholder="$t('platform.apps.remark')"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button size="small" @click="$back()">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button
        type="primary"
        :loading="saveLoading"
        size="small"
        @click="goSave"
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
  ref,
  toRefs,
  getCurrentInstance
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import appsApi from '@/api/apps.js';
export default defineComponent({
  name: 'AppInfo',
  components: {},
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const formRef = ref();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      funData: {
        code: '',
        isAuthz: true,
        method: 'GET',
        moduleId: '',
        name: '',
        path: '',
        remark: '',
        type: 'API'
      },
      saveLoading: false,
      rules: {
        name: [
          {
            required: true,
            message: t('platform.apps.funcname'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.apps.funcode'),
            trigger: 'blur'
          }
        ]
      }
    });
    const methods = {
      init() {
        const { id, entityId } = route.params;
        if (id) {
          methods.getFunctionById(id);
        } else {
          state.funData.moduleId = entityId;
        }
      },
      /**
       * @description:切换功能状态
       * @param {*}
       * @return {*}
       */
      changeFuncType(val) {
        if (val === 'PAGE') {
          state.funData.method = 'GET';
        }
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */
      goSave() {
        formRef.value.validate((valid) => {
          if (valid) {
            const { id } = route.params;
            state.saveLoading = true;
            let method, api;
            if (id) {
              method = 'put';
              api = appsApi.putFunctionById(id);
            } else {
              method = 'post';
              api = appsApi.addFunction;
            }
            proxy.$magusCloudApi.apiConfig[method](api, state.funData)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                proxy.$back();
              })
              .finally(() => {
                state.saveLoading = true;
              });
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 通过ID获取功能信息
       * @param {*}
       * @return {*}
       */
      getFunctionById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(appsApi.getFunctionById(id), {})
          .then((res) => {
            Object.keys(state.funData).forEach((item) => {
              state.funData[item] = res[item];
            });
          });
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      formRef,
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.appInfo {
  width: 100%;
  height: 100%;
  box-shadow: -1px 2px 10px 0px rgba(47, 65, 155, 0.1);
  padding: 15px;
  background: white;
  box-sizing: border-box;
}
</style>
