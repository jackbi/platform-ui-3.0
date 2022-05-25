<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 16:56:48
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 10:08:47
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/dicts/addParams.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-dialog
    :is-show="isShow"
    :before-close="cancel"
    :title="
      entryId
        ? $t('platform.dicts.edit_dicts_entry')
        : $t('platform.dicts.add_dicts_entry')
    "
    width="30%"
  >
    <template #dialogContent>
      <!-- 弹窗内容区域-->
      <el-form
        ref="formRef"
        :model="dictParamsInfo"
        label-width="80px"
        style="padding: 10px 0"
        size="small"
      >
        <el-form-item
          :label="$t('platform.dicts.dicts_entry_name')"
          prop="name"
        >
          <el-input
            v-model.trim="dictParamsInfo.name"
            :placeholder="$t('platform.dicts.dicts_entry_name')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.dicts.dicts_entry_value')"
          prop="code"
        >
          <el-input
            v-model.trim="dictParamsInfo.code"
            :disabled="Boolean(entryId)"
            :placeholder="$t('platform.dicts.dicts_entry_value')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.dicts.dicts_entry_enabled')"
          prop="enabled"
        >
          <el-switch v-model="dictParamsInfo.enabled" />
        </el-form-item>
        <el-form-item :label="$t('platform.table.order')" prop="order">
          <el-input
            v-model.trim="dictParamsInfo.order"
            :placeholder="$t('platform.table.order')"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #dialogBtn>
      <!-- 弹窗底部按钮区域-->
      <el-button size="small" @click="cancel">
        {{ $t('global.action.cancel') }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="goSave">
        {{ $t('global.action.save') }}
      </el-button>
    </template>
  </magus-dialog>
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
import dicts from '@/api/dicts.js';
export default defineComponent({
  name: 'PlatformDictsAddParams',
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'save'],
  setup(props, { emit }) {
    const formRef = ref();
    const { t } = useI18n();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      dictParamsInfo: {
        code: '',
        dictTypeId: '',
        name: '',
        enabled: true,
        order: 0
      },
      entryId: '',
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: t('platform.dicts.dicts_entry_name'),
            trigger: 'blur'
          }
        ]
      }
    });
    state.dictParamsInfo.dictTypeId = route.params.id;
    const methods = {
      cancel() {
        state.entryId = '';
        state.dictParamsInfo = {
          code: '',
          dictTypeId: '',
          name: '',
          enabled: true,
          order: 0
        };
        emit('cancel', {});
        formRef.value.resetFields();
      },
      /**
       * @description: 通过Id获取字典项的信息
       * @param {*}
       * @return {*}
       */

      getEntryById(id) {
        state.entryId = id;
        return new Promise((resolve, reject) => {
          proxy.$magusCloudApi.apiConfig
            .get(dicts.getEntrysById(id))
            .then((res) => {
              state.dictParamsInfo.code = res.code;
              state.dictParamsInfo.name = res.name;
              state.dictParamsInfo.enabled = res.enabled;
              state.dictParamsInfo.order = res.order;
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        let api;
        let method;
        if (state.entryId) {
          api = dicts.writeEntrys(state.entryId);
          method = 'put';
        } else {
          api = dicts.createEntrys;
          method = 'post';
        }
        formRef.value.validate((valid) => {
          if (valid) {
            state.loading = true;
            proxy.$magusCloudApi.apiConfig[method](api, state.dictParamsInfo)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                methods.cancel();
                emit('save');
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
    return {
      ...toRefs(state),
      ...methods,
      formRef
    };
  }
});
</script>
