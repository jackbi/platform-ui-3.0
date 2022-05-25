<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-07-22 14:02:37
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:22:03
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/parameter/addParams.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-dialog
    :is-show="isShow"
    :title="
      id
        ? $t('platform.parameter.edit_param')
        : $t('platform.parameter.add_param')
    "
    :before-close="cancel"
    width="50%"
  >
    <template #dialogContent>
      <!-- 弹窗内容区域-->
      <el-form
        :model="paramsInfo"
        label-width="80px"
        style="padding: 10px 0"
        size="small"
      >
        <el-form-item
          :label="$t('platform.parameter.param_app')"
          prop="appCode"
        >
          <el-select
            v-model="paramsInfo.appCode"
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
        <el-form-item :label="$t('platform.parameter.param_code')" prop="code">
          <el-input
            v-model.trim="paramsInfo.code"
            :text="true"
            :disabled="Boolean(id)"
            :placeholder="$t('platform.parameter.param_code')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.parameter.param_value')"
          prop="value"
        >
          <el-input
            v-model.trim="paramsInfo.value"
            :text="true"
            :placeholder="$t('platform.parameter.param_value')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.parameter.param_remark')"
          prop="remark"
        >
          <el-input
            v-model.trim="paramsInfo.remark"
            type="textarea"
            :rows="2"
            resize="none"
            :placeholder="$t('platform.parameter.param_remark')"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #dialogBtn>
      <!-- 弹窗底部按钮区域-->
      <el-button size="small" @click="cancel">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="goSave">
        {{ $t('global.action.save') }}
      </el-button>
    </template>
  </magus-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import paramsApi from '@/api/params';
export default defineComponent({
  name: 'AddParams',
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    appList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['cancel', 'save'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const state = reactive({
      paramsInfo: {
        appCode: '',
        code: '',
        remark: '',
        value: ''
      },
      loading: false,
      id: ''
    });
    const methods = {
      cancel() {
        state.paramsInfo = {
          appCode: '',
          code: '',
          remark: '',
          value: ''
        };
        state.id = '';
        emit('cancel', false);
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        if (state.id) {
          methods.editParams(state.id);
        } else {
          methods.craeateParams();
        }
      },
      /**
       * @description: 新增
       * @param {*}
       * @return {*}
       */

      craeateParams() {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .post(paramsApi.addParams, state.paramsInfo)
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
      },
      /**
       * @description: 编辑
       * @param {*}
       * @return {*}
       */

      editParams(id) {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .put(paramsApi.editParams(id), state.paramsInfo)
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
      },
      /**
       * @description: 通过id获取参数
       * @param {*} id
       * @return {*}
       */

      getParamsById(id) {
        return new Promise((resolve) => {
          state.id = id;
          proxy.$magusCloudApi.apiConfig
            .get(paramsApi.getParamsById(id))
            .then((res) => {
              Object.keys(state.paramsInfo).forEach((i) => {
                state.paramsInfo[i] = res[i];
              });
              resolve(res);
            });
        });
      }
    };
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped></style>
