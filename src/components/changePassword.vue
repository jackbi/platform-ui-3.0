<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-03 17:08:09
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:14:28
 * @FilePath: /magus-platform-ui-3.0/src/components/changePassword.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-dialog
    :is-show="isShow"
    :title="$t('platform.users.change_password')"
    :before-close="cancel"
    width="40%"
  >
    <template #dialogContent>
      <el-form
        ref="formRef"
        :model="passwordForm"
        :rules="passwordRules"
        size="small"
        label-width="100px"
      >
        <el-form-item :label="$t('platform.login.vaild_type')" prop="validType">
          <el-radio-group v-model="passwordForm.validType">
            <el-radio v-for="item in vaildTypeData" :key="item" :label="item">
              <magus-dict-label :code="$dicts.getUserValidType" :value="item" />
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="passwordForm.validType && passwordForm.validType != 'PASSWORD'"
          :label="$t('platform.login.code')"
          prop="captcha"
        >
          <div class="register-validate">
            <el-input
              v-model="passwordForm.captcha"
              class="login-input"
              type="number"
              style="margin-right: 15px; width: 205px"
              autocomplete="off"
              :autofocus="false"
              :placeholder="$t('platform.login.code')"
            />
            <el-button
              type="primary"
              style="width: 140px"
              :disabled="isDisabled"
              @click="send_captcha"
            >
              {{ buttonName }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item
          v-if="passwordForm.validType == 'PASSWORD'"
          :label="$t('platform.users.old_password')"
          prop="oldPass"
        >
          <el-input v-model="passwordForm.oldPass" type="password" />
        </el-form-item>
        <el-form-item :label="$t('platform.users.new_password')" prop="newPass">
          <el-input
            v-model="passwordForm.newPass"
            type="password"
            autocomplete="off"
            :autofocus="false"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.users.confirm_password')"
          prop="confirmPass"
        >
          <el-input
            v-model="passwordForm.confirmPass"
            type="password"
            autocomplete="off"
            :autofocus="false"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #dialogBtn>
      <!-- 弹窗底部按钮区域-->
      <el-button size="small" @click="cancel">
        {{ $t('global.action.cancel') }}
      </el-button>
      <el-button
        size="small"
        :loading="loading"
        type="primary"
        @click="confirm"
      >
        {{ $t('global.action.confirm') }}
      </el-button>
    </template>
  </magus-dialog>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  onBeforeUnmount
} from 'vue';
import { useI18n } from 'vue-i18n';
import userApi from '@/api/users.js';
export default defineComponent({
  name: 'ChangePassword',
  components: {},
  setup() {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(t('platform.login.passwordPlaceholder')));
      } else {
        if (state.passwordForm.confirmPass !== '') {
          proxy.$refs.formRef.validateField('confirmPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(t('platform.login.passwordAgainPlaceholder')));
      } else if (value !== state.passwordForm.newPass) {
        callback(new Error(t('platform.login.passwordDontMatch')));
      } else {
        callback();
      }
    };
    let state = reactive({
      passwordForm: {
        oldPass: '',
        validType: '',
        captcha: '',
        newPass: '',
        confirmPass: ''
      },
      loading: false,
      isDisabled: false,
      buttonName: '',
      CountDown: 60, // 倒计时
      sendTimer: '',
      vaildTypeData: [],
      isShow: false,
      passwordRules: {
        oldPass: [
          {
            required: true,
            message: t('platform.login.passwordPlaceholder'),
            trigger: 'blur'
          }
        ],
        validType: [
          {
            message: t('platform.login.vaild_type'),
            trigger: 'change'
          }
        ],
        captcha: [
          {
            required: true,
            message: t('platform.login.code_tips'),
            trigger: 'blur'
          }
        ],
        newPass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    });
    const methods = {
      init() {
        state.isShow = true;
        proxy.$magusCloudApi.apiConfig
          .get(userApi.getUserVaildType)
          .then((res) => {
            if (res && res.length) {
              state.buttonName = t('platform.login.send_code');
              state.vaildTypeData = res;
              state.passwordForm.validType = res[0];
              state.isShow = true;
            } else {
              proxy.$message.warning(t('platform.login.vaild_type_err_tip'));
            }
          });
      },
      /**
       * @description: 取消
       * @param {*}
       * @return {*}
       */

      cancel() {
        // state.passwordForm = {
        //   validType: '',
        //   oldPass: '',
        //   captcha: '',
        //   newPass: '',
        //   confirmPass: ''
        // };
        if (state.sendTimer) {
          clearInterval(state.sendTimer);
        }
        state.isDisabled = false;
        state.isShow = false;
        state.CountDown = 60;
        // proxy.$refs.formRef.resetFields();
      },
      /**
       * @description: 发送验证码
       * @param {*}
       * @return {*}
       */

      send_captcha() {
        const checkedArr = [];
        proxy.$refs.formRef.validateField('validType', (valid) => {
          if (valid) {
            checkedArr.push(valid);
            return false;
          }
        });
        if (checkedArr.length === 0) {
          state.CountDown = 60;
          const { validType } = state.passwordForm;
          proxy.$magusCloudApi.apiConfig
            .post(userApi.getChangePasswordCode, { validType })
            .then(() => {
              state.isDisabled = true;
              state.buttonName = state.CountDown + 's';
              methods.sendCodeCountDown();
            });
        }
      },
      /**
       * @description: 倒计时
       * @param {*}
       * @return {*}
       */

      sendCodeCountDown() {
        state.sendTimer = setInterval(() => {
          state.CountDown--;
          state.buttonName = state.CountDown + 's';
          if (state.CountDown <= 0) {
            state.isDisabled = false;
            state.buttonName = t('platform.login.send_code_again');
            clearInterval(state.sendTimer);
          }
        }, 1000);
      },
      /**
       * @description: 确认
       * @param {*}
       * @return {*}
       */

      confirm() {
        const params = {
          newPassword: state.passwordForm.newPass,
          ticket: ''
        };

        if (state.passwordForm.validType === 'PASSWORD') {
          params.ticket = state.passwordForm.oldPass;
        } else {
          params.ticket = state.passwordForm.captcha;
        }

        proxy.$refs.formRef.validate((valid) => {
          if (valid) {
            state.loading = true;
            proxy.$magusCloudApi.apiConfig
              .post(userApi.changePassword, params)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                state.loading = false;
                methods.cancel();
              })
              .catch(() => {
                state.loading = false;
              });
            methods.cancel();
          } else {
            return false;
          }
        });
      }
    };
    onBeforeUnmount(() => {
      if (state.sendTimer) {
        clearInterval(state.sendTimer);
      }
    });
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
::v-deep(input::-webkit-outer-spin-button),
::v-deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none !important;
}
::v-deep(input[type='number']) {
  -moz-appearance: textfield !important;
}
.register-validate {
  @include flexs();
}
</style>
