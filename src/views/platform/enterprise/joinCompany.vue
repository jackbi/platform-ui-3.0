<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-02 15:45:27
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:21:28
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/enterprise/joinCompany.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template :title="$t('platform.welcome.joinCompany')">
    <template #main>
      <el-form
        ref="companyForm"
        size="small"
        :model="companyData"
        :rules="companyRules"
        label-width="100px"
      >
        <el-form-item :label="$t('platform.company.name')" prop="tenant">
          <el-select
            v-model="companyData.tenant"
            filterable
            remote
            clearable
            :placeholder="$t('platform.company.name')"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('platform.company.remark')" prop="remark">
          <el-input
            v-model="companyData.remark"
            type="textarea"
            :rows="6"
            resize="none"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button size="small" @click="$back()">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button
        size="small"
        :loading="confirmLoading"
        type="primary"
        @click="submit"
      >
        {{ $t('platform.submit') }}
      </el-button>
    </template>
  </magus-add-template>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  getCurrentInstance
} from 'vue';
import { usePlatformStore } from '@/store/modules/index.js';
import enterpriseApi from '@/api/enterprise.js';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'JoinCompany',
  components: {},
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const platformStore = usePlatformStore();
    const { t } = useI18n();
    const { userInfo } = platformStore;
    let state = reactive({
      companyData: {
        tenant: '',
        remark: ''
      },
      loading: false,
      confirmLoading: false,
      options: [],
      companyRules: {
        tenant: [
          {
            required: true,
            message: t('platform.company.name'),
            trigger: 'change'
          }
        ]
      }
    });
    const methods = {
      /**
       * @description: 加入企业
       * @param {*}
       * @return {*}
       */

      submit() {
        proxy.$refs.companyForm.validate((valid) => {
          if (valid) {
            proxy
              .$confirm(
                t('platform.company.joinCompanyTips'),
                t('global.text.notice'),
                {
                  confirmButtonText: t('global.action.confirm'),
                  cancelButtonText: t('global.action.cancel'),
                  type: 'warning',
                  draggable: true
                }
              )
              .then(() => {
                state.confirmLoading = true;
                const params = {
                  loginId: state.userInfo.loginId,
                  username: state.userInfo.username,
                  remark: state.companyData.remark,
                  tenant: state.companyData.tenant
                };
                proxy.$magusCloudApi.apiConfig
                  .post(enterpriseApi.joinEnterprice, params)
                  .then(() => {
                    proxy.$message({
                      type: 'success',
                      message: t('global.text.success')
                    });
                    state.confirmLoading = false;
                    router.back();
                  })
                  .catch(() => {
                    state.confirmLoading = false;
                  });
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 搜索
       * @param {*}
       * @return {*}
       */

      remoteMethod(query) {
        if (query !== '') {
          state.loading = true;
          proxy.$magusCloudApi.apiConfig
            .get(enterpriseApi.getRemoteEnterprice, { name: query })
            .then((res) => {
              state.options = res;
              state.loading = false;
            })
            .catch(() => {
              state.loading = false;
            });
        } else {
          state.options = [];
        }
      }
    };
    return {
      ...toRefs(state),
      userInfo: computed(() => userInfo),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped></style>
