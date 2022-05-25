<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-06-25 09:43:14
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:35:26
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/system/addOrWrite.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div style="width: 100%; height: 100%">
    <magus-add-template :title="$route.meta.title">
      <template #main>
        <el-form
          ref="systenForm"
          size="small"
          label-width="120px"
          :rules="rules"
          style="padding: 10px 0"
          :model="systemInfo"
        >
          <el-form-item :label="$t('platform.system.system_code')" prop="code">
            <el-input
              v-model="systemInfo.code"
              size="small"
              :disabled="Boolean($route.params.id)"
            />
          </el-form-item>

          <el-form-item :label="$t('platform.system.system_login_title1')">
            <el-col :span="24">
              <el-radio-group v-model="systemInfo.showLoginLogo">
                <el-radio :label="true">
                  {{ $t('platform.text.image') }}
                </el-radio>
                <el-radio :label="false">
                  {{ $t('platform.text.text') }}
                </el-radio>
              </el-radio-group>
            </el-col>
            <el-col v-show="systemInfo.showLoginLogo" :span="24">
              <div v-if="loginLogoImage" class="image-show">
                <el-image
                  class="image-show-picture"
                  :src="$filters.getImage(loginLogoImage)"
                />
                <div class="image-show-mask">
                  <el-button
                    :text="true"
                    style="color: #fff; font-size: 20px"
                    class="magusdip-iconfont magusdipshanchu"
                    @click="deleteLoginLogo"
                  />
                </div>
              </div>
              <el-upload
                v-else
                ref="uploadFile"
                class="upload-demo"
                action=""
                :limit="1000"
                :on-change="changeLoginLogoImage"
                :auto-upload="false"
                accept=".jpg,.jpeg,.png"
                :file-list="loginLogoFile"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">
                  {{ $t('platform.uploadName') }}
                </el-button>
                <template #tip>
                  <span
                    style="margin-left: 15px"
                    class="el-upload__tip form-tips"
                    >{{ $t('platform.users.avata_tips') }}</span
                  >
                </template>
              </el-upload>
            </el-col>
            <el-col v-show="!systemInfo.showLoginLogo" :span="24">
              <el-input
                v-model="systemInfo.loginTitle1"
                :text="true"
                :placeholder="$t('platform.system.system_login_title1')"
              />
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_login_title2')">
            <el-input v-model="systemInfo.loginTitle2" size="small" />
          </el-form-item>
          <el-form-item :label="$t('platform.company.favicon')">
            <div v-if="faviconImage" class="image-show">
              <el-image
                class="image-show-picture"
                style="width: 32px; height: 32px"
                :src="$filters.getImage(faviconImage)"
              />
              <div class="image-show-mask">
                <el-button
                  :text="true"
                  style="color: #fff; font-size: 20px"
                  class="magusdip-iconfont magusdipshanchu"
                  @click="deleteFavicon"
                />
              </div>
            </div>
            <el-upload
              v-else
              ref="uploadFavicon"
              class="upload-demo"
              :limit="1000"
              :on-change="changeFavicon"
              :auto-upload="false"
              action=""
              accept=".ico"
              :file-list="faviconFile"
              :show-file-list="false"
            >
              <el-button size="small" type="primary">
                {{ $t('platform.uploadName') }}
              </el-button>
              <template #tip>
                <span
                  style="margin-left: 15px"
                  class="el-upload__tip form-tips"
                  >{{ $t('platform.company.favicon_tip') }}</span
                >
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_title1')">
            <el-col :span="24">
              <el-radio-group v-model="systemInfo.showLogo">
                <el-radio :label="true">
                  {{ $t('platform.text.image') }}
                </el-radio>
                <el-radio :label="false">
                  {{ $t('platform.text.text') }}
                </el-radio>
              </el-radio-group>
            </el-col>
            <el-col v-show="systemInfo.showLogo" :span="24">
              <div v-if="logoImage" class="image-show">
                <el-image
                  class="image-show-picture"
                  :src="$filters.getImage(logoImage)"
                />
                <div class="image-show-mask">
                  <el-button
                    :text="true"
                    style="color: #fff; font-size: 20px"
                    class="magusdip-iconfont magusdipshanchu"
                    @click="deleteLogo"
                  />
                </div>
              </div>
              <el-upload
                v-else
                ref="uploadFile"
                class="upload-demo"
                action=""
                :limit="1000"
                :on-change="changeImage"
                :auto-upload="false"
                accept=".jpg,.jpeg,.png"
                :file-list="logoFile"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">
                  {{ $t('platform.uploadName') }}
                </el-button>
                <template #tip>
                  <span
                    style="margin-left: 15px"
                    class="el-upload__tip form-tips"
                    >{{ $t('platform.users.avata_tips') }}</span
                  >
                </template>
              </el-upload>
            </el-col>
            <el-col v-show="!systemInfo.showLogo" :span="24">
              <el-input
                v-model="systemInfo.title1"
                :text="true"
                :placeholder="$t('platform.company.title')"
              />
            </el-col>
            <!-- <el-input size="small" v-model="systemInfo.title1"></el-input> -->
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_title2')">
            <el-input v-model="systemInfo.title2" size="small" />
          </el-form-item>
          <!-- <el-form-item
          :label="$t('platform.system.system_homepage')"
          prop="homePage"
        >
          <el-input size="small" v-model="systemInfo.homePage"></el-input>
        </el-form-item> -->
          <el-form-item :label="$t('platform.system.system_homepage')">
            <!-- <el-input v-model="menuData.routerId"></el-input> -->
            <magus-select-tree
              v-model="systemInfo.homePage"
              :options="routerData"
              :placeholder="$t('platform.system.system_homepage')"
            />
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_themeColor')">
            <!-- TODO: -->
            <!-- <el-select
          size="small"
          v-model="systemInfo.themeColor"
          >
            <el-option label="蓝色" value="blue"></el-option>
            <el-option label="科技蓝" value="technology-blue"></el-option>
          </el-select> -->
            <magus-dict-select
              v-model="systemInfo.themeColor"
              :code="$dicts.systemColor"
              size="small"
            />
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_themeLayout')">
            <!-- <el-select
          size="small"
          v-model="systemInfo.themeLayout"
          >
            <el-option label="侧栏菜单布局" value="magus-layout"></el-option>
            <el-option
              label="顶栏菜单布局"
              value="magus-horizontal-layout"
            ></el-option>
          </el-select> -->
            <magus-dict-select
              v-model="systemInfo.themeLayout"
              :code="$dicts.systemLayout"
              size="small"
            />
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_copyright')">
            <el-input v-model="systemInfo.copyright" size="small" />
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_icp')">
            <el-input v-model="systemInfo.icp" size="small" />
          </el-form-item>
          <el-form-item :label="$t('platform.system.system_icpUrl')">
            <el-input v-model="systemInfo.icpUrl" size="small" />
          </el-form-item>
          <el-form-item :label="$t('platform.company.critype')">
            <el-radio-group v-model="systemInfo.showBeian">
              <el-radio :label="true">{{ $t('platform.text.show') }}</el-radio>
              <el-radio :label="false">
                {{ $t('platform.text.hidden') }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button size="small" @click="$back()">
          {{ $t('global.action.back') }}
        </el-button>
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          @click="goSave()"
        >
          {{ $t('global.action.save') }}
        </el-button>
      </template>
    </magus-add-template>
    <image-cropper
      ref="imageCropper"
      :is-show="imageChange.isShow"
      :fixed-number="[3, 1]"
      @confirm="getLogoImage"
      @cancel="imageChange.isShow = false"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  nextTick
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import systemApi from '@/api/system';
import imageCropper from '@/components/imageCropper.vue';
export default defineComponent({
  name: 'AddOrWrite',
  components: {
    imageCropper
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const systenForm = ref();
    const state = reactive({
      systemInfo: {
        code: '',
        copyright: '',
        icp: '',
        icpUrl: '',
        logo: '',
        themeColor: '',
        themeLayout: '',
        title1: '',
        title2: '',
        homePage: '',
        showLogo: true,
        showBeian: true,
        favicon: '',
        loginLogo: '',
        loginTitle1: '',
        loginTitle2: '',
        showLoginLogo: false
      },
      loading: false,
      logoFile: [],
      logoImage: '',
      logoCropperFile: null,
      updateLogo: false,
      loginLogoImage: '',
      loginLogoFile: [],
      loginLogoCropperFile: null,
      updateLoginLogo: false,
      faviconFile: [],
      faviconImage: '',
      updateFavicon: false,
      imageChange: {
        isShow: false,
        name: '',
        cropperFileName: ''
      },
      rules: {
        code: [
          {
            required: true,
            message: t('platform.system.system_code'),
            trigger: 'blur'
          }
        ],
        homePage: [
          {
            required: true,
            message: t('platform.system.system_homepage'),
            trigger: 'blur'
          }
        ]
      },
      routerData: []
    });
    const methods = {
      async init() {
        await methods.getSystemMenus();
        const { id } = route.params;
        if (id) {
          methods.getSystemInfoById(id);
        }
      },
      /**
       * @description: 选择logo
       * @param {*} file
       * @param {*} fileList
       * @return {*}
       */

      changeImage(file, fileList) {
        if (fileList.length > 0) {
          state.logoFile = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
        }
        let imageFiles = state.logoFile[0];
        // console.log(imageFiles);
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(imageFiles.name)) {
          proxy.$message({
            message: t('platform.company.loginBgUploadTips'),
            type: 'error'
          });
          return false;
        }
        let reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          nextTick(() => {
            proxy.$refs.imageCropper.setImage(data);
          });
        };
        state.imageChange.isShow = true;
        state.imageChange.name = 'logoImage';
        state.imageChange.cropperFileName = 'logoCropperFile';
        // 转化为base64
        reader.readAsDataURL(imageFiles.raw);
      },
      /**
       * @description: 选择登陆页logo
       * @param {*}
       * @return {*}
       */

      changeLoginLogoImage(file, fileList) {
        if (fileList.length > 0) {
          state.loginLogoFile = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
        }
        let imageFiles = state.loginLogoFile[0];
        // console.log(imageFiles);
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(imageFiles.name)) {
          proxy.$message({
            message: t('platform.company.loginBgUploadTips'),
            type: 'error'
          });
          return false;
        }
        let reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          nextTick(() => {
            proxy.$refs.imageCropper.setImage(data);
          });
        };
        state.imageChange.isShow = true;
        state.imageChange.name = 'loginLogoImage';
        state.imageChange.cropperFileName = 'loginLogoCropperFile';
        // 转化为base64
        reader.readAsDataURL(imageFiles.raw);
      },
      /**
       * @description: 图片展示
       * @param {*} file
       * @param {*} name
       * @return {*}
       */

      imagePreview(file, name) {
        // 定义一个文件阅读器
        let reader = new FileReader();
        // 文件装载后将其显示在图片预览里
        reader.onload = function (e) {
          // 将bade64位图片保存至数组里供上面图片显示
          state[name] = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      /**
       * @description: 删除logo图片
       * @param {*}
       * @return {*}
       */

      deleteLogo() {
        state.logoImage = '';
        state.logoFile = [];
        state.logoCropperFile = null;
        state.updateLogo = true;
      },
      /**
       * @description: 删除登陆页logo图片
       * @param {*}
       * @return {*}
       */

      deleteLoginLogo() {
        state.loginLogoImage = '';
        state.loginLogoFile = [];
        state.loginLogoCropperFile = null;
        state.updateLoginLogo = true;
      },
      /**
       * @description: 删除网站小图标
       * @param {*}
       * @return {*}
       */

      deleteFavicon() {
        state.faviconImage = '';
        state.faviconFile = [];
        state.updateFavicon = true;
      },
      /**
       * @description: 修改网站小图标
       * @param {*} file
       * @param {*} fileList
       * @return {*}
       */
      changeFavicon(file, fileList) {
        if (fileList.length > 0) {
          state.faviconFile = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
        }
        methods.imagePreview(file.raw, 'faviconImage');
        state.updateFavicon = true;
      },
      /**
       * @description: 获取logo图片
       * @param {*}
       * @return {*}
       */

      getLogoImage(file) {
        state[state.imageChange.cropperFileName] = file;
        state.imageChange.isShow = false;
        methods.imagePreview(file, state.imageChange.name);
        state.updateLogo = true;
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        let api;
        let methods;
        let params = proxy.$magusCloudApi.commonUtils.deepCopy(
          state.systemInfo
        );
        let formData = new FormData();
        if (state.logoCropperFile) {
          formData.append('logo', state.logoCropperFile);
        }
        if (state.loginLogoCropperFile) {
          formData.append('loginLogo', state.loginLogoCropperFile);
        }
        if (state.faviconFile && state.faviconFile.length > 0) {
          formData.append('favicon', state.faviconFile[0].raw);
        }
        formData.append('copyright', params.copyright);
        formData.append('icp', params.icp);
        formData.append('code', params.code);
        formData.append('icpUrl', params.icpUrl);
        formData.append('themeColor', params.themeColor);
        formData.append('themeLayout', params.themeLayout);
        formData.append('title1', params.title1);
        formData.append('title2', params.title2);
        formData.append('loginTitle1', params.loginTitle1);
        formData.append('loginTitle2', params.loginTitle2);
        formData.append('homePage', params.homePage);
        formData.append('showLogo', params.showLogo);
        formData.append('showLoginLogo', params.showLoginLogo);
        formData.append('showBeian', params.showBeian);
        formData.append('updateLogo', state.updateLogo);
        formData.append('updateFavicon', state.updateFavicon);
        formData.append('updateLoginLogo', state.updateLoginLogo);

        systenForm.value.validate((valid) => {
          if (valid) {
            const { id } = route.params;
            if (id) {
              formData.append('id', id);
              api = systemApi.editSystem(id);
              methods = 'put';
            } else {
              api = systemApi.addSystem;
              methods = 'post';
            }
            state.loading = true;
            proxy.$magusCloudApi.apiConfig[methods](api, formData)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                proxy.$back();
                state.updateLogo = false;
              })
              .finally(() => {
                state.loading = false;
              });
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 获取系统信息
       * @param {*} id
       * @return {*}
       */

      getSystemInfoById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(systemApi.getSystemInfoById(id))
          .then((res) => {
            state.systemInfo = res;
            state.logoImage = res.logo;
            state.loginLogoImage = res.loginLogo;
            state.faviconImage = res.favicon ? res.favicon : '';
            state.updateLogo = false;
            state.updateFavicon = false;
            state.updateLoginLogo = false;
          });
      },
      /**
       * @description: 获取系统菜单
       * @param {*} id
       * @return {*}
       */

      getSystemMenus() {
        return new Promise((resolve, reject) => {
          proxy.$magusCloudApi.apiConfig
            .get(systemApi.getSystemMenu, { systemId: '' })
            .then((res) => {
              state.routerData = res.children;
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      /**
       * @description: 下拉树选择事件
       * @param {*}
       * @return {*}
       */

      chooseTree(datas) {
        state.systemInfo.homePage = datas.entityId;
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      ...methods,
      systenForm
    };
  }
});
</script>
<style lang="scss" scoped>
.image-show {
  position: relative;
  width: 150px;
  .image-show-picture {
    width: 100%;
  }
  .image-show-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: none;
  }
  &:hover {
    .image-show-mask {
      @include flexs();
      @include flexOther();
    }
  }
}
</style>
