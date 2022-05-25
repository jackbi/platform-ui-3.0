<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 17:45:13
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-24 13:26:08
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/apps/moduleInfo.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template
    :title="
      $route.name === 'platformAppsModulesAdd'
        ? $t('platform.apps.module_add')
        : $t('platform.apps.module_info')
    "
  >
    <template #main>
      <el-form
        ref="formRef"
        :model="moduleData"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-form-item :label="$t('platform.apps.modulename')" prop="name">
          <el-input
            v-model="moduleData.name"
            :placeholder="$t('platform.apps.modulename')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.apps.modulecode')" prop="code">
          <el-input
            v-model="moduleData.code"
            :disabled="$route.name !== 'platformAppsModulesAdd'"
            :placeholder="$t('platform.apps.modulecode')"
          />
        </el-form-item>
        <!-- <el-form-item :label="$t('platform.apps.modulepath')" prop="path">
            <el-input v-model="moduleData.path"></el-input>
          </el-form-item> -->
        <el-form-item :label="$t('platform.apps.remark')">
          <el-input
            v-model="moduleData.remark"
            type="textarea"
            :rows="4"
            resize="none"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button v-show="!$route.query.id" size="small" @click="$back()">
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
  toRefs,
  ref,
  inject,
  getCurrentInstance
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import appsApi from '@/api/apps.js';
export default defineComponent({
  name: 'ModuleInfo',
  components: {},
  inject: ['getTree'],
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const getTree = inject('getTree');
    const state = reactive({
      moduleData: {
        appId: '',
        code: '',
        name: '',
        path: '',
        remark: ''
      },
      saveLoading: false,
      rules: {
        name: [
          {
            required: true,
            message: t('platform.apps.modulename'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.apps.modulecode'),
            trigger: 'blur'
          }
        ],
        path: [
          {
            required: true,
            message: t('platform.apps.modulepath'),
            trigger: 'blur'
          }
        ]
      }
    });
    const methods = {
      init() {
        if (route.name !== 'platformAppsModulesAdd') {
          const { entityId } = route.params;
          methods.getModuleById(entityId);
        } else {
          const { entityId } = route.params;
          state.moduleData.appId = entityId;
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
            state.saveLoading = true;
            let method, api;
            if (route.name === 'platformAppsModulesAdd') {
              method = 'post';
              api = appsApi.addModules;
            } else {
              const { entityId } = route.params;
              method = 'put';
              api = appsApi.putModuleById(entityId);
            }

            proxy.$magusCloudApi.apiConfig[method](api, state.moduleData)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                if (route.name === 'platformAppsModulesAdd') {
                  proxy.$back();
                }
                getTree();
              })
              .finally(() => {
                state.saveLoading = false;
              });
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 通过ID获取模块信息
       * @param {*}
       * @return {*}
       */
      getModuleById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(appsApi.getModuleById(id), {})
          .then((res) => {
            Object.keys(state.moduleData).forEach((item) => {
              state.moduleData[item] = res[item];
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
