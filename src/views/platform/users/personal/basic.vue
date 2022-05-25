/* eslint-disable vue/html-indent */
<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-03 13:50:43
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 10:32:45
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/users/personal/basic.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div>
    <el-form style="width: 50%" label-width="100px">
      <el-form-item :label="$t('platform.users.user_avatar')">
        <div class="avater-con">
          <span class="avater-advice">{{
            $t('platform.users.avata_advice')
          }}</span>
          <div v-if="userInfo.avatar" class="avater-con">
            <el-avatar
              style="margin-right: 15px"
              :size="150"
              :src="$filters.getImage(userInfo.avatar)"
            />
            <el-avatar
              style="margin-right: 15px"
              :size="100"
              :src="$filters.getImage(userInfo.avatar)"
            />
            <el-avatar :size="50" :src="$filters.getImage(userInfo.avatar)" />
          </div>
          <div v-else class="avater-con">
            <el-avatar style="margin-right: 15px" :size="150" />
            <el-avatar style="margin-right: 15px" :size="100" />
            <el-avatar :size="50" />
          </div>
          <el-upload
            ref="uploadFile"
            class="upload-demo"
            action=""
            :limit="1000"
            :on-change="handleChange"
            :auto-upload="false"
            accept=".jpg,.jpeg,.png"
            :file-list="fileList"
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
        </div>
      </el-form-item>
      <el-form-item :label="$t('platform.users.user_name')">
        <div class="form-label">
          <span>{{ userInfo.loginId }}</span>
        </div>
        <el-col :span="24">
          <div class="form-tips">
            {{ $t('platform.users.user_name_tips') }}
          </div>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('platform.users.nick_name')">
        <div class="form-label">
          <span v-show="!editData.isShowEditNickName">{{
            userInfo.username
          }}</span>
          <el-input
            v-show="editData.isShowEditNickName"
            v-model="editInfo.nickName"
            :text="true"
          />
          <el-button
            v-show="editData.isShowEditNickName"
            style="margin-left: 15px"
            :text="true"
            @click="editData.isShowEditNickName = false"
          >
            {{ $t('global.action.cancel') }}
          </el-button>
          <el-button
            :text="true"
            @click="editorChangeNickName(editData.isShowEditNickName)"
          >
            {{
              editData.isShowEditNickName
                ? $t('global.action.save')
                : $t('global.action.edit')
            }}
          </el-button>
        </div>
        <el-col :span="24">
          <div class="form-tips">
            {{ $t('platform.users.user_nickname_tips') }}
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <image-cropper
      ref="imageCropper"
      :is-show="imageChange.isShow"
      :fixed="true"
      @confirm="getLogoImage"
      @cancel="imageChange.isShow = false"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  computed
} from 'vue';
import userApi from '@/api/users.js';
import { usePlatformStore } from '@/store/modules/index.js';
import { useI18n } from 'vue-i18n';
import imageCropper from '@/components/imageCropper.vue';
// import { mapState } from "vuex";
export default defineComponent({
  name: 'Basic',
  components: {
    imageCropper
  },
  setup() {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const platformStore = usePlatformStore();
    // const { userInfo, GET_USER_INFO } = platformStore;

    let state = reactive({
      editInfo: {
        nickName: ''
      },
      // userInfo: platformStore.getUserInfo,
      imageChange: {
        isShow: false
      },
      editData: {
        isShowEditNickName: false
      },
      fileList: []
    });

    const methods = {
      /**
       * @description: 选择图片
       * @param {*} file
       * @param {*} fileList
       * @return {*}
       */

      handleChange(file, fileList) {
        if (fileList.length > 0) {
          state.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
        }
        const imageFiles = state.fileList[0];
        // console.log(imageFiles);
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(imageFiles.name)) {
          proxy.$message({
            message: '图片类型要求：jpeg、jpg、png',
            type: 'error'
          });
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          proxy.$nextTick(() => {
            proxy.$refs.imageCropper.setImage(data);
          });
        };
        state.imageChange.isShow = true;
        // 转化为base64
        reader.readAsDataURL(imageFiles.raw);
      },
      editorChangeNickName(bool) {
        if (bool) {
          proxy.$magusCloudApi.apiConfig
            .post(userApi.changeUserInfo, { userName: state.editInfo.nickName })
            .then(() => {
              proxy.$message({
                type: 'success',
                message: t('global.text.success')
              });
              proxy.editData.isShowEditNickName = false;
              platformStore.GET_USER_INFO(proxy.$magusCloudApi);
            })
            .catch(() => {});
        } else {
          state.editData.isShowEditNickName = true;
          state.editInfo.nickName = platformStore.getUserInfo.username;
        }
      },
      getLogoImage(file) {
        const formData = new FormData();
        formData.append('avatar', file);
        proxy.$magusCloudApi.apiConfig
          .post(userApi.changeAvatar, formData)
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            state.imageChange.isShow = false;
            platformStore.GET_USER_INFO(proxy.$magusCloudApi);
          });
      }
    };
    return {
      ...toRefs(state),
      userInfo: computed(() => platformStore.getUserInfo),
      ...methods
    };
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  activated() {}
});
</script>
<style lang="scss" scoped>
.avater-con {
  .avater-advice {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #b6bfca;
    line-height: 19px;
  }
  .avater-con {
    @include flexs();
  }
}

.form-tips {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #b6bfca;
  line-height: 19px;
  margin-top: 11px;
}

.upload-demo {
  margin-top: 20px;
}

.form-label {
  @include flexs();
  @include flexOther($flexOtherJustifybetween, $flexOtherPackjustify);
  span {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: #4e545f;
    // line-height: 21px;
  }
}
</style>
