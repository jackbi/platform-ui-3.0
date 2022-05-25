<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-06 10:40:42
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:34:33
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/enterprise/info.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template :title="$t('platform.company.info')">
    <template #main>
      <el-form
        ref="companyForm"
        size="small"
        :model="companyData"
        label-width="120px"
      >
        <el-form-item
          :label="$t('platform.company.businessLicense')"
          prop="license"
        >
          <el-image
            v-if="companyData.license"
            style="width: 40px; height: 40px"
            :src="$filters.getImage(companyData.license)"
            :preview-src-list="[`${$filters.getImage(companyData.license)}`]"
          />
          <el-image v-else style="width: 40px; height: 40px" />
        </el-form-item>
        <el-form-item :label="$t('platform.company.name')" prop="name">
          <el-input v-model="companyData.name" readonly />
        </el-form-item>
        <el-form-item
          :label="$t('platform.company.enterpriseAlias')"
          prop="code"
        >
          <el-input v-model="companyData.code" readonly />
        </el-form-item>
        <el-form-item
          :label="$t('platform.company.unifySocialCreditCodes')"
          prop="uscc"
        >
          <el-input v-model="companyData.uscc" readonly />
        </el-form-item>
        <el-form-item :label="$t('platform.company.email')" prop="email">
          <el-input v-model="companyData.email" readonly />
        </el-form-item>
        <el-form-item
          :label="$t('platform.company.businessAddress')"
          prop="address"
        >
          <el-input v-model="companyData.address" readonly />
        </el-form-item>
        <el-form-item :label="$t('platform.company.business')" prop="business">
          <el-input v-model="companyData.business" readonly />
        </el-form-item>
        <el-form-item :label="$t('platform.company.remark')" prop="remark">
          <el-input v-model="companyData.remark" readonly />
        </el-form-item>
        <!-- <el-form-item
          :label="$t('platform.company.businessLicense')"
          prop="fileList"
        >
          <el-button type="primary" size="small">{{
            $t("platform.action.watch")
          }}</el-button>
        </el-form-item> -->
      </el-form>
    </template>
  </magus-add-template>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import enterpriceApi from '@/api/enterprise';
export default defineComponent({
  name: 'Info',
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      companyData: {
        name: '',
        fileList: [],
        uscc: '',
        code: '',
        email: '',
        address: '',
        business: '',
        remark: '',
        license: ''
      }
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getEnterpriceInfo();
      },
      /**
       * @description: 获取当前企业用户信息
       * @param {*}
       * @return {*}
       */

      getEnterpriceInfo() {
        proxy.$magusCloudApi.apiConfig
          .get(enterpriceApi.getCurrentEnterprice)
          .then((res) => {
            Object.keys(state.companyData).forEach((key) => {
              state.companyData[key] = res[key] || state.companyData[key];
            });
          });
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped></style>
