<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-02 16:31:13
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 17:19:31
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/enterprise/createCompany.vue
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
        label-width="120px"
      >
        <el-form-item
          :label="$t('platform.company.businessLicense')"
          prop="fileList"
        >
          <el-upload
            ref="uploadFile"
            class="upload-demo"
            action=""
            :limit="1000"
            :on-change="handleChange"
            :auto-upload="false"
            accept=".jpg,.jpeg,.png,.bmp,.pdf"
            :file-list="companyData.fileList"
          >
            <el-button size="small" type="primary">
              {{ $t('platform.uploadName') }}
            </el-button>
            <template #tip>
              <pre class="el-upload__tip">{{
                $t('platform.company.uploadFileTips')
              }}</pre>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('platform.company.unifySocialCreditCodes')"
          prop="creditCode"
        >
          <el-input
            v-model="companyData.creditCode"
            :placeholder="$t('platform.company.unifySocialCreditCodes')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.company.name')" prop="name">
          <el-input
            v-model="companyData.name"
            :placeholder="$t('platform.company.name')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.company.enterpriseAlias')"
          prop="enterpriseAlias"
        >
          <el-input
            v-model="companyData.enterpriseAlias"
            :placeholder="$t('platform.company.enterpriseAlias')"
          />
        </el-form-item>
        <!-- <el-form-item :label="$t('platform.company.email')" prop="email">
          <el-input
            :placeholder="$t('platform.company.email')"
            v-model="companyData.email"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          :label="$t('platform.company.businessAddress')"
          prop="businessAddress"
        >
          <el-input
            v-model="companyData.businessAddress"
            :placeholder="$t('platform.company.businessAddress')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.company.business')" prop="business">
          <el-input
            v-model="companyData.business"
            :placeholder="$t('platform.company.business')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.company.remark')" prop="remark">
          <el-input
            v-model="companyData.remark"
            :placeholder="$t('platform.company.remark')"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button size="small" @click="$back()">
        {{ $t('global.action.back') }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="submit">
        {{ $t('platform.submit') }}
      </el-button>
    </template>
  </magus-add-template>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import registerApi from '@/api/register.js';
export default defineComponent({
  name: 'CreateCompany',
  components: {},
  setup() {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const validateCode = (rule, value, callback) => {
      const fun = proxy.$magusCloudApi.validateUtils.en_num(3, 20);
      if (value.search(fun)) {
        callback(new Error(t('platform.text.accountValidate')));
      } else {
        proxy.$magusCloudApi.apiConfig
          .get(registerApi.validateTenant, {
            code: state.companyData.enterpriseAlias
          })
          .then((res) => {
            if (res.data) {
              callback(new Error(t('platform.text.companyCodeRepeat')));
            } else {
              callback();
            }
          });
      }
    };
    // 校验文件
    const validateFile = (rule, value, callback) => {
      if (!proxy.$refs.uploadFile.uploadFiles.length) {
        callback(new Error(t('platform.company.businessLicense')));
      } else {
        const regx = new RegExp('(.jpg)$|(.jpeg)$|(.png)$|(.bmp)|(.pdf)$');
        /** 这里有个坑，单文件上传，第一次上传错误格式接着上传第二次格式，列表中数组值有两个 */
        if (
          !regx.test(
            proxy.$refs.uploadFile.uploadFiles[
              proxy.$refs.uploadFile.uploadFiles.length - 1
            ].name.toLowerCase()
          )
        ) {
          callback(new Error('文件格式只支持 jpg,jpeg,png,bmp,pdf'));
        }
        callback();
      }
    };
    const state = reactive({
      companyData: {
        name: '',
        fileList: [],
        creditCode: '',
        enterpriseAlias: '',
        email: '',
        businessAddress: '',
        business: '',
        remark: ''
      },
      loading: false,
      companyRules: {
        name: [
          {
            required: true,
            message: t('platform.company.name'),
            trigger: 'blur'
          }
        ],
        fileList: [{ required: true, validator: validateFile }],
        creditCode: [
          {
            required: true,
            message: t('platform.company.unifySocialCreditCodes'),
            trigger: 'blur'
          }
        ],
        enterpriseAlias: [
          {
            required: true,
            validator: validateCode,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            pattern: proxy.$magusCloudApi.validateUtils.email(0, 50),
            message: t('platform.users.user_email_validate'),
            trigger: 'blur'
          }
        ],
        businessAddress: [
          {
            required: true,
            message: t('platform.company.businessAddress'),
            trigger: 'blur'
          }
        ]
      }
    });
    const methods = {
      /**
       * @description: 文件选择
       * @param {*} file
       * @param {*} fileList
       * @return {*}
       */

      handleChange(file, fileList) {
        if (fileList.length > 0) {
          state.companyData.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
        }
      },

      /**
       * @description: 提交企业信息
       * @param {*}
       * @return {*}
       */

      submit() {
        proxy.$refs.companyForm.validate((valid) => {
          if (valid) {
            state.loading = true;
            const formData = new FormData();
            formData.append('address', state.companyData.businessAddress);
            formData.append('business', state.companyData.business);
            formData.append('code', state.companyData.enterpriseAlias);
            formData.append('license', state.companyData.fileList[0].raw);
            formData.append('name', state.companyData.name);
            formData.append('remark', state.companyData.remark);
            formData.append('uscc', state.companyData.creditCode);
            proxy.$magusCloudApi.apiConfig
              .post(registerApi.createEnterprice, formData)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                proxy.$back();
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
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped></style>
