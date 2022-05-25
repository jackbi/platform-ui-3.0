<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-12-16 15:34:41
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:32:34
 * @FilePath: /magus-platform-ui-3.0/src/components/bindMobileEmail.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-dialog
    :is-show="isShow"
    :before-close="cancel"
    :title="title"
    width="30%"
  >
    <template #dialogContent>
      <!-- 弹窗内容区域-->
      <el-form
        ref="bindForm"
        :model="bindData"
        size="small"
        label-width="0px"
        :rules="bindRules"
      >
        <el-form-item
          prop="account"
          :rules="[
            { required: true, message: accountErrorMessage, trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="bindData.account"
            class="login-input"
            :text="true"
            :placeholder="accountName"
          />
        </el-form-item>
        <el-form-item prop="captcha">
          <div class="register-validate">
            <el-input
              v-model="bindData.captcha"
              class="login-input"
              type="number"
              style="margin-right: 15px"
              :placeholder="$t('platform.login.code')"
            />
            <el-button
              type="primary"
              :disabled="isDisabled"
              @click="send_captcha"
            >
              {{ buttonName }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #dialogBtn>
      <!-- 弹窗底部按钮区域-->
      <el-button size="small" @click="cancel">
        {{ $t('global.action.cancel') }}
      </el-button>
      <el-button size="small" type="primary" @click="confirm">
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
  computed,
  getCurrentInstance
} from 'vue';
import { usePlatformStore } from '@/store/modules/index.js';
import { useI18n } from 'vue-i18n';
import userApi from '@/api/users.js';
export default defineComponent({
  name: 'BindMobileEmail',
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    bindType: {
      type: String,
      default: ''
    }
  },
  emits: ['cancel'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const { bindType } = toRefs(props);
    const { proxy } = getCurrentInstance();
    const platformStore = usePlatformStore();
    let state = reactive({
      bindData: {
        account: '',
        captcha: ''
      },
      isDisabled: false,
      buttonName: '',
      CountDown: 60, // 倒计时
      sendTimer: '',
      bindRules: {
        captcha: [
          {
            required: true,
            message: t('platform.login.code_tips'),
            trigger: 'blur'
          }
        ]
      }
    });

    const computedData = {
      title: computed(() => {
        switch (bindType.value) {
          case 'MOBILE':
            return t('platform.users.bind_mobile');
          case 'EMAIL':
            return t('platform.users.bind_email');
        }
        return '';
      }),
      accountName: computed(() => {
        switch (bindType.value) {
          case 'MOBILE':
            return t('platform.users.mobile');
          case 'EMAIL':
            return t('platform.users.email');
        }
        return '';
      }),
      accountErrorMessage: computed(() => {
        switch (bindType.value) {
          case 'MOBILE':
            return t('platform.users.mobile_error_tip');
          case 'EMAIL':
            return t('platform.users.email_error_tip');
        }
        return '';
      })
    };
    const methods = {
      init(val) {
        state.buttonName = t('platform.login.send_code');
        if (val) {
          state.bindData.account = val;
        }
      },
      cancel() {
        emit('cancel');
        state.bindData = {
          account: '',
          captcha: ''
        };
        if (state.sendTimer) {
          clearInterval(state.sendTimer);
        }
        state.isDisabled = false;
        state.CountDown = 60;
        state.buttonName = t('platform.login.send_code');
        proxy.$refs.bindForm.resetFields();
      },
      /**
       * @description: 发送验证码
       * @param {*}
       * @return {*}
       */

      send_captcha() {
        const checkedArr = [];
        proxy.$refs.bindForm.validateField('account', (valid) => {
          if (valid) {
            checkedArr.push(valid);
            return false;
          }
        });
        if (checkedArr.length === 0) {
          let url;
          switch (bindType.value) {
            case 'MOBILE':
              url = userApi.getChangeMobileCode;
              break;
            case 'EMAIL':
              url = userApi.getChangeEmailCode;
              break;
          }
          state.CountDown = 60;
          const { account: target } = state.bindData;
          proxy.$magusCloudApi.apiConfig.post(url, { target }).then(() => {
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
       * @description: 确定
       * @param {*}
       * @return {*}
       */

      confirm() {
        proxy.$refs.bindForm.validate((valid) => {
          if (valid) {
            let url;
            let variate;
            switch (bindType.value) {
              case 'MOBILE':
                url = userApi.changeMobile;
                variate = 'newMobile';
                break;
              case 'EMAIL':
                url = userApi.changeEmail;
                variate = 'newEmail';
                break;
            }
            const { account, captcha: ticket } = state.bindData;
            const params = { ticket };
            params[variate] = account;
            proxy.$magusCloudApi.apiConfig.post(url, params).then(() => {
              proxy.$message({
                type: 'success',
                message: t('global.text.success')
              });
              methods.cancel();
              platformStore.GET_USER_INFO(proxy.$magusCloudApi);
            });
          } else {
            return false;
          }
        });
      }
    };
    return {
      ...toRefs(state),
      ...computedData,
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.register-validate {
  @include flexs();
  ::v-deep(input::-webkit-outer-spin-button),
  ::v-deep(input::-webkit-inner-spin-button) {
    -webkit-appearance: none !important;
  }
  ::v-deep(input[type='number']) {
    -moz-appearance: textfield !important;
  }
}
</style>
