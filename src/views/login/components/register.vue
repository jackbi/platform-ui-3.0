<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-12-15 14:53:22
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:19:36
 * @FilePath: /magus-platform-ui-3.0/src/views/login/components/register.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="login-content-inner">
    <h1 class="login-title">{{ $t('platform.login.registerTitle') }}</h1>
    <el-form
      ref="registerForm"
      style="margin-top: 40px"
      :model="registerData"
      :rules="registerRules"
      label-width="0px"
    >
      <el-form-item prop="account">
        <el-input
          v-model="registerData.account"
          class="login-input"
          :text="true"
          autocomplete="off"
          :autofocus="false"
          :placeholder="$t('platform.login.account')"
        />
      </el-form-item>
      <el-form-item prop="loginId">
        <el-input
          v-model="registerData.loginId"
          class="login-input"
          :text="true"
          autocomplete="off"
          :autofocus="false"
          :placeholder="$t('platform.login.accountPlaceholder')"
        />
      </el-form-item>
      <!-- <el-form-item prop="password">
        <el-input
          class="login-input"
          type="password"
          autocomplete="new-password"
          :autofocus="false"
          v-model="registerData.password"
          :placeholder="$t('platform.login.passwordPlaceholder')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwordAgain">
        <el-input
          class="login-input"
          type="password"
          autocomplete="new-password"
          :autofocus="false"
          v-model="registerData.passwordAgain"
          :placeholder="$t('platform.login.passwordAgainPlaceholder')"
        ></el-input>
      </el-form-item> -->
      <el-form-item prop="validateCode">
        <div class="register-validate">
          <el-input
            v-model="registerData.validateCode"
            :text="true"
            :placeholder="$t('platform.login.validateCode')"
            style="margin-right: 15px; width: 205px"
          />
          <magus-validate-code ref="ref_validateCode" @change="changeCode" />
        </div>
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="register-validate">
          <el-input
            v-model="registerData.captcha"
            class="login-input"
            type="number"
            style="margin-right: 15px; width: 205px"
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
    </el-form>
    <el-button
      :loading="registerLoading"
      class="login-btn"
      type="primary"
      @click="register"
    >
      {{ $t('platform.login.register') }}
    </el-button>
    <div class="login-register">
      {{ $t('platform.login.haveAccount') }}
      <el-button
        style="margin-left: 10px"
        :text="true"
        type="primary"
        size="small"
        @click="changeLoginType('login')"
      >
        {{ $t('global.login') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import registerApi from '@/api/register.js';
import Cookie from 'js-cookie';
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount
} from 'vue';
import { usePlatformStore } from '@/store/modules/index.js';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'Register',
  emits: ['changeLoginType'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const platformStore = usePlatformStore();
    const { GET_MENU_LIST, GET_USER_INFO } = platformStore;
    const router = useRouter();
    // const route = useRoute();
    let state = reactive({
      registerData: {
        loginId: '',
        account: '',
        captcha: '',
        validateCode: ''
      },
      registerRules: {
        loginId: [
          {
            required: true,
            trigger: 'blur',
            message: t('platform.text.accountValidate'),
            pattern: proxy.$magusCloudApi.validateUtils.en_num_line(3, 20)
          }
        ],
        account: [
          {
            required: true,
            trigger: 'blur',
            message: t('platform.login.account_tip')
          }
        ],
        captcha: [
          {
            required: true,
            message: t('platform.login.code_tips'),
            trigger: 'blur'
          }
        ],
        validateCode: [
          {
            required: true,
            message: t('platform.login.validateCode'),
            trigger: 'blur'
          }
        ]
      },
      isDisabled: false,
      buttonName: '',
      CountDown: 60, // 倒计时
      sendTimer: '',
      // validateCode: "",
      checkCode: '',
      registerLoading: false
    });
    const methods = {
      init() {
        state.buttonName = t('platform.login.send_code');
      },
      /**
       * @description: 切换登录注册
       * @param {*} type
       * @return {*}
       */

      changeLoginType(type) {
        proxy.$refs.registerForm.resetFields();
        emit('changeLoginType', type);
      },
      /**
       * @description: 切换验证码
       * @param {*} value
       * @return {*}
       */

      changeCode(value) {
        state.checkCode = value;
      },
      /**
       * @description: 发送验证码
       * @param {*}
       * @return {*}
       */

      send_captcha() {
        const checkedArr = [];
        proxy.$refs.registerForm.validateField(
          ['account', 'loginId', 'validateCode'],
          (valid) => {
            if (valid) {
              checkedArr.push(valid);
              return false;
            }
          }
        );
        if (checkedArr.length > 0) {
          return;
        }
        if (state.registerData.validateCode.toUpperCase() !== state.checkCode) {
          proxy.$message({
            type: 'warning',
            message: t('platform.text.validateCodeWarning')
          });
          state.registerData.validateCode = '';
          proxy.$refs.ref_validateCode.draw();
          return;
        }
        if (checkedArr.length === 0) {
          state.CountDown = 60;
          const { account, loginId } = state.registerData;
          proxy.$magusCloudApi.apiConfig
            .post(registerApi.getCapcha, { account, loginId })
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
       * @description: 注册
       * @param {*}
       * @return {*}
       */

      register() {
        if (state.registerData.validateCode.toUpperCase() !== state.checkCode) {
          proxy.$message({
            type: 'warning',
            message: t('platform.text.validateCodeWarning')
          });
          state.registerData.validateCode = '';
          proxy.$refs.ref_validateCode.draw();
          return;
        }
        const { account, loginId, captcha } = state.registerData;
        proxy.$refs.registerForm.validate((valid) => {
          if (valid) {
            state.registerLoading = true;
            proxy.$magusCloudApi.apiConfig
              .post(registerApi.registerUser, { account, loginId, captcha })
              .then((res) => {
                if (res.success) {
                  proxy.$magusCloudApi.catchUtil.setLocalItem(
                    'token',
                    res.data
                  );
                  Cookie.set('auth_token', res.data);
                  GET_MENU_LIST(proxy.$magusCloudApi).then(() => {
                    GET_USER_INFO(proxy.$magusCloudApi);
                    router.push({ path: '/platform/welcome' });
                  });
                } else {
                  proxy.$message.warning(t('platform.text.registerRrror'));
                }
                state.registerLoading = false;
              })
              .catch(() => {
                state.registerLoading = false;
              });
          } else {
            return false;
          }
        });
      }
    };
    onMounted(() => {
      methods.init();
    });
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
.login-content-inner {
  width: 80%;
  ::v-deep(input::-webkit-outer-spin-button),
  ::v-deep(input::-webkit-inner-spin-button) {
    -webkit-appearance: none !important;
  }
  ::v-deep(input[type='number']) {
    -moz-appearance: textfield !important;
  }
  .login-title {
    font-size: 30px;
    color: rgba(0, 71, 141, 1);
    margin-bottom: 10px;
    text-align: center;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
  }

  .login-logo {
    margin-bottom: 10px;
    text-align: center;
    .login-logo-image {
      height: 50px;
    }
  }
  .login-subtitle {
    color: rgba(137, 137, 137, 1);
    font-size: 14px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    text-align: center;
  }
  .login-tips {
    font-size: 14px;
    font-family: SourceHanSansSC, SourceHanSansSC-Regular;
    text-align: left;
    color: #333333;
    margin-top: 40px;
    margin-bottom: 25px;
  }
  .login-btn {
    // margin-top: 35px;
    width: 100%;
  }
  .login-register {
    @include flexs();
    @include flexOther();
    font-size: 14px;
    margin-top: 20px;
    color: rgba(153, 153, 153, 1);
  }
}

.register-validate {
  @include flexs();
}
</style>
