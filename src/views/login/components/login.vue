<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-12-15 14:30:33
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:15:49
 * @FilePath: /magus-platform-ui-3.0/src/views/login/components/login.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="login-content-inner">
    <h1 v-show="!systemInfo.showLoginLogo" class="login-title">
      {{ systemInfo.loginTitle1 }}
    </h1>
    <div class="login-logo">
      <el-image
        v-show="systemInfo.showLoginLogo"
        class="login-logo-image"
        :src="getImage(systemInfo.loginLogo)"
      />
    </div>
    <h3 class="login-subtitle">{{ systemInfo.loginTitle2 }}</h3>
    <!-- <div class="login-tips">{{ $t("platform.login.tips") }}</div> -->
    <div class="login-tab">
      <h3
        class="login-tab-password"
        :class="loginData.loginType === 'PASSWORD' ? 'active' : ''"
        @click="changeLoginType('PASSWORD')"
      >
        {{ $t('platform.login.passord_login') }}
      </h3>
      <h3
        v-if="isShowLoginByCaptcha == 'true'"
        class="login-tab-code"
        :class="loginData.loginType === 'CAPTCHA' ? 'active' : ''"
        @click="changeLoginType('CAPTCHA')"
      >
        {{ $t('platform.login.code_login') }}
      </h3>
    </div>
    <el-form
      v-show="loginData.loginType === 'PASSWORD'"
      ref="loginForm"
      :model="loginData"
      :rules="loginRules"
      label-width="0px"
    >
      <el-form-item prop="loginId">
        <el-input
          v-model="loginData.loginId"
          class="login-input"
          :text="true"
          :placeholder="$t('platform.login.login_account_placeholder')"
          @keyup.enter="submit"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginData.password"
          class="login-input"
          type="password"
          :placeholder="$t('platform.login.passwordPlaceholder')"
          @keyup.enter="submit"
        />
      </el-form-item>
    </el-form>
    <el-form
      v-show="loginData.loginType === 'CAPTCHA'"
      ref="codeLoginForm"
      :model="codeLoginData"
      :rules="codeLoginRules"
      label-width="0px"
    >
      <el-form-item prop="account">
        <el-input
          v-model="codeLoginData.account"
          class="login-input"
          :text="true"
          :placeholder="$t('platform.login.account')"
        />
      </el-form-item>
      <el-form-item prop="code">
        <div class="register-validate">
          <el-input
            v-model="codeLoginData.code"
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
      :loading="loading"
      class="login-btn"
      type="primary"
      @click="submit"
    >
      {{ $t('global.login') }}
    </el-button>
    <div v-if="isShowRegister === 'true'" class="login-register">
      {{ $t('platform.login.loginRegister') }}
      <el-button
        style="margin-left: 10px"
        :text="true"
        size="small"
        @click="changeType('register')"
      >
        {{ $t('platform.login.register') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import authApi from '@/api/auth.js';
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  ref
} from 'vue';
import { usePlatformStore } from '@/store/modules/index.js';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getImage } from '@/common/plugin/filters.js';
export default defineComponent({
  name: 'Login',
  components: {},
  props: {
    systemInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isShowRegister: {
      type: String,
      default: 'true'
    },
    isShowLoginByCaptcha: {
      type: String,
      default: 'true'
    }
  },
  emits: ['changeLoginType'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const platformStore = usePlatformStore();
    const { GET_MENU_LIST, GET_USER_INFO } = platformStore;
    const router = useRouter();
    // const route = useRoute();
    const loginForm = ref(null);
    const codeLoginForm = ref(null);
    let state = reactive({
      loginData: {
        loginId: '',
        password: '',
        loginType: 'PASSWORD'
      },
      codeLoginData: {
        account: '',
        code: ''
      },
      isDisabled: false,
      buttonName: '',
      CountDown: 60, // 倒计时
      sendTimer: '',
      loginRules: {
        loginId: [
          {
            required: true,
            message: t('platform.login.login_account_placeholder'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: t('platform.login.passwordPlaceholder'),
            trigger: 'blur'
          }
        ]
      },
      codeLoginRules: {
        account: [
          {
            required: true,
            message: t('platform.login.account_tip'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.login.code_tips'),
            trigger: 'blur'
          }
        ]
      },
      loading: false
    });

    const methods = {
      init() {
        state.buttonName = t('platform.login.send_code');
      },
      /**
       * @description: 切换登录方式
       * @param {*} type
       * @return {*}
       */

      changeLoginType(type) {
        state.loginData.loginType = type;
      },
      /**
       * @description: 发送验证码
       * @param {*}
       * @return {*}
       */

      send_captcha() {
        const checkedArr = [];
        proxy.$refs.codeLoginForm.validateField('account', (valid) => {
          if (valid) {
            checkedArr.push(valid);
            return false;
          }
          if (checkedArr.length === 0) {
            state.CountDown = 60;
            const { account } = state.codeLoginData;
            proxy.$magusCloudApi.apiConfig
              .post(authApi.getCapcha, { account })
              .then(() => {
                state.isDisabled = true;
                state.buttonName = state.CountDown + 's';
                methods.sendCodeCountDown();
              });
          }
        });
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
       * @description: 切换登录注册
       * @param {*} type
       * @return {*}
       */

      changeType(type) {
        proxy.$refs.loginForm.resetFields();
        emit('changeLoginType', type);
      },
      /**
       * @description: 登陆
       * @param {*}
       * @return {*}
       */

      submit() {
        let refVoid;
        const params = {
          account: '',
          loginType: '',
          password: ''
        };

        params.loginType = state.loginData.loginType;
        if (params.loginType === 'PASSWORD') {
          params.account = state.loginData.loginId;
          params.password = state.loginData.password;
          refVoid = loginForm;
        }

        if (params.loginType === 'CAPTCHA') {
          params.account = state.codeLoginData.account;
          params.password = state.codeLoginData.code;
          refVoid = codeLoginForm;
        }

        refVoid.value.validate((valid) => {
          if (valid) {
            state.loading = true;
            proxy.$magusCloudApi.apiConfig
              .post(authApi.userLogin, params)
              .then((res) => {
                proxy.$magusCloudApi.catchUtil.setLocalItem('token', res.data);
                Cookie.set('auth_token', res.data);
                GET_MENU_LIST(proxy.$magusCloudApi).then(() => {
                  GET_USER_INFO(proxy.$magusCloudApi);
                  if (props.systemInfo && props.systemInfo.currentMenu) {
                    const formatData = function (datas) {
                      datas.forEach((item) => {
                        if (
                          item.extend &&
                          item.extend.appUri &&
                          item.extend.uri
                        ) {
                          item.extend.uri =
                            item.extend.appUri + item.extend.uri;
                        }
                        if (item.children && item.children.length) {
                          formatData(item.children);
                        }
                      });
                    };
                    let params = {};
                    if (
                      props.systemInfo.currentMenu.extend.params &&
                      props.systemInfo.currentMenu.extend.params != '{}'
                    ) {
                      params = JSON.parse(
                        props.systemInfo.currentMenu.extend.params
                      );
                    }
                    router.push({
                      path: `${props.systemInfo.currentMenu.extend.appUri}${props.systemInfo.currentMenu.extend.uri}`,
                      query: params
                    });
                    formatData(props.systemInfo.topMenu.children);
                    proxy.$magusCloudApi.catchUtil.setLocalItem(
                      'activeMenu',
                      JSON.stringify(props.systemInfo.topMenu)
                    );
                    proxy.$magusCloudApi.catchUtil.setLocalItem(
                      'activeSubMenu',
                      JSON.stringify(props.systemInfo.currentMenu)
                    );
                    proxy.resetSetItem(
                      'watchStorage',
                      JSON.stringify(props.systemInfo.currentMenu)
                    );
                  } else {
                    router.push({ path: '/platform/welcome' });
                  }
                });
                state.loading = false;
              })
              .catch(() => {
                state.loading = false;
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
      ...methods,
      loginForm,
      codeLoginForm,
      getImage
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

  .login-tab {
    font-weight: 600;
    color: #989898;
    cursor: pointer;
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 25px;
    .login-tab-password {
      display: inline-block;
      margin-right: 40px;
      padding-bottom: 15px;
      border-bottom: 2px solid transparent;
    }
    .login-tab-code {
      display: inline-block;
      padding-bottom: 15px;
      border-bottom: 2px solid transparent;
    }
    .active {
      color: #272727;
      border-bottom-color: #272727;
    }
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
  .register-validate {
    @include flexs();
  }
}
</style>
