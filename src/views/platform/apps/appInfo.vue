<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 16:47:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-24 13:26:22
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/apps/appInfo.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template
    :title="
      $route.name === 'platformAppsPageAdd'
        ? $t('platform.apps.app_add')
        : $t('platform.apps.app_info')
    "
  >
    <template #main>
      <div class="appinfobox">
        <div class="appinfobox-inner">
          <el-form
            ref="formRef"
            :rules="rules"
            :model="appData"
            label-width="100px"
            size="small"
          >
            <el-form-item :label="$t('platform.apps.appname')" prop="name">
              <el-input
                v-model="appData.name"
                :placeholder="$t('platform.apps.appname')"
              />
            </el-form-item>
            <el-form-item :label="$t('platform.apps.appcode')" prop="code">
              <el-input
                v-model="appData.code"
                :disabled="$route.name !== 'platformAppsPageAdd'"
                :placeholder="$t('platform.apps.appcode')"
              />
            </el-form-item>
            <el-form-item :label="$t('platform.apps.opentype')" prop="enabled">
              <magus-dict-select
                v-model="appData.enabled"
                :code="$dicts.appOpenType"
                :placeholder="$t('platform.apps.opentype')"
                clearable
              />
              <!-- <el-radio-group v-model="appData.enabled" size="small">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group> -->
            </el-form-item>
            <el-form-item :label="$t('platform.apps.remark')">
              <el-input
                v-model="appData.remark"
                type="textarea"
                :rows="2"
                resize="none"
              />
            </el-form-item>
            <el-collapse v-model="activeNames">
              <el-collapse-item
                :title="$t('platform.apps.app_web_config')"
                name="web"
              >
                <el-form-item :label="$t('platform.apps.app_web_baseurl')">
                  <el-input v-model="appData.webUrl" />
                </el-form-item>
                <!-- <el-form-item :label="$t('platform.apps.app_web_host')">
                  <el-input v-model="appData.webHost"></el-input>
                </el-form-item>
                <el-form-item :label="$t('platform.apps.app_web_port')">
                  <el-input v-model="appData.webPort"></el-input>
                </el-form-item> -->
              </el-collapse-item>
              <el-collapse-item
                :title="$t('platform.apps.app_api_config')"
                name="api"
              >
                <el-form-item :label="$t('platform.apps.apptype')" prop="type">
                  <magus-dict-select
                    v-model="appData.type"
                    :code="$dicts.appType"
                    :placeholder="$t('platform.apps.apptype')"
                    clearable
                  />
                </el-form-item>
                <el-form-item :label="$t('platform.apps.app_api_baseurl')">
                  <el-input v-model="appData.baseUrl" />
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
            <!-- <el-form-item :label="$t('platform.apps.appprotocol')">
            <el-input
              v-model="appData.protocol"
              :disabled="appData.type === 'LOCAL'"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('platform.apps.appip')">
            <el-input
              v-model="appData.host"
              :disabled="appData.type === 'LOCAL'"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('platform.apps.appport')">
            <el-input
              v-model="appData.port"
              :disabled="appData.type === 'LOCAL'"
            ></el-input>
          </el-form-item> -->
            <!-- <el-form-item :label="$t('platform.apps.accesspath')" prop="path">
            <el-input v-model="appData.path"></el-input>
          </el-form-item> -->
          </el-form>
        </div>
      </div>
    </template>
    <template #footer>
      <el-button
        v-show="$route.name === 'platformAppsPageAdd'"
        size="small"
        @click="$back()"
      >
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
  getCurrentInstance,
  inject
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
    const getTree = inject('getTree');
    const state = reactive({
      appData: {
        name: '',
        code: '',
        type: 'LOCAL',
        remark: '',
        enabled: 'true',
        baseUrl: '',
        webHost: '',
        webPort: '',
        webUrl: ''
      },
      activeNames: ['web', 'api'],
      saveLoading: false,
      rules: {
        name: [
          {
            required: true,
            message: t('platform.apps.appname'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.apps.appcode'),
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: t('platform.apps.apptype'),
            trigger: 'change'
          }
        ],
        path: [
          {
            required: true,
            message: t('platform.apps.accesspath'),
            trigger: 'blur'
          }
        ],
        enabled: [
          {
            required: true,
            message: t('platform.apps.opentype'),
            trigger: 'change'
          }
        ]
      }
    });
    const methods = {
      init() {
        if (route.name !== 'platformAppsPageAdd') {
          const {
            params: { entityId }
          } = route;
          methods.getAppById(entityId);
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
            const {
              params: { entityId },
              name
            } = route;
            if (name === 'platformAppsPageAdd') {
              method = 'post';
              api = appsApi.addApp;
            } else {
              method = 'put';
              api = appsApi.putAppById(entityId);
            }
            proxy.$magusCloudApi.apiConfig[method](api, state.appData)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                if (name === 'platformAppsPageAdd') {
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
       * @description: 通过id获取应用信息
       * @param {*}
       * @return {*}
       */
      getAppById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(appsApi.getAppById(id), {})
          .then((res) => {
            Object.keys(state.appData).forEach((item) => {
              state.appData[item] = res[item];
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
  .appinfobox {
    position: relative;
    width: 100%;
    height: 100%;
    .appinfobox-inner {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
