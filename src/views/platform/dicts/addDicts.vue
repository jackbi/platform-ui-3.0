<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 11:46:20
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-17 17:17:12
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/dicts/addDicts.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="platform-dicts-add">
    <magus-add-template
      :title="
        $route.params.id
          ? $t('platform.dicts.edit_dict')
          : $t('platform.dicts.add_dict')
      "
    >
      <template #main>
        <el-form
          ref="formRef"
          :rules="rules"
          :model="dictInfo"
          label-width="80px"
          style="padding: 10px 0"
          size="small"
        >
          <el-row>
            <el-col :span="18">
              <el-form-item
                :label="$t('platform.dicts.dicts_code')"
                prop="code"
              >
                <el-input
                  v-model.trim="dictInfo.code"
                  :disabled="Boolean($route.params.id)"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                :label="$t('platform.dicts.dicts_name')"
                prop="name"
              >
                <el-input v-model.trim="dictInfo.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                :label="$t('platform.dicts.dicts_app')"
                prop="appCode"
              >
                <el-select
                  v-model="dictInfo.appCode"
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
          </el-row>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button size="small" @click="$back()">
            {{ $t('global.action.back') }}
          </el-button>
          <el-button
            size="small"
            :loading="loading"
            type="primary"
            @click="goSave"
          >
            {{ $t('global.action.save') }}
          </el-button>
        </div>
      </template>
    </magus-add-template>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance
} from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import dicts from '@/api/dicts.js';
export default defineComponent({
  name: 'PlatformDictsAdd',
  components: {},
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const formRef = ref();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      dictInfo: {
        appCode: '',
        code: '',
        name: ''
      },
      loading: false,
      rules: {
        appCode: [
          {
            required: true,
            message: t('platform.dicts.dicts_app'),
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.dicts.dicts_code'),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: t('platform.dicts.dicts_name'),
            trigger: 'blur'
          }
        ]
      },
      appList: []
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getAllApps();
        const {
          params: { id }
        } = route;
        if (id) {
          methods.getDictTypeById(id);
        }
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
       * @description: 通过id获取字典
       * @param {*}
       * @return {*}
       */

      getDictTypeById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(dicts.getDictTypeById(id))
          .then((res) => {
            Object.keys(state.dictInfo).forEach((i) => {
              state.dictInfo[i] = res[i];
            });
          });
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        const {
          params: { id }
        } = route;
        let api;
        let methods;
        if (id) {
          api = dicts.writeDictType(id);
          methods = 'put';
        } else {
          api = dicts.createDictType;
          methods = 'post';
        }
        formRef.value.validate((valid) => {
          if (valid) {
            state.loading = true;
            proxy.$magusCloudApi.apiConfig[methods](api, state.dictInfo)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                proxy.$back();
              })
              .finally(() => {
                state.loading = false;
              });
          } else {
            return false;
          }
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
.platform-dicts-add {
  width: 100%;
  height: 100%;
}
</style>
