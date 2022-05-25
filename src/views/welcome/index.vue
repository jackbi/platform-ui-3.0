<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-02 14:14:06
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 15:34:46
 * @FilePath: /magus-platform-ui-3.0/src/views/welcome/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="welcome">
    <div v-if="isShowCreateCompanny()" class="welcome-inner">
      <h1 class="welcome-title">{{ $t('platform.welcome.title') }}</h1>
      <h3 class="welcome-subtitle">{{ $t('platform.welcome.subTitle') }}</h3>
      <el-row class="welcome-choose" :gutter="20">
        <el-col :span="11" class="welcome-join" @click="joinCompany">
          <div class="welcome-join-inner">
            <el-image class="join-image" src="/image/add__enterprise.png" />
            <ul class="join-info">
              <li class="join-info-title">
                {{ $t('platform.welcome.joinCompany') }}
              </li>
              <li class="join-info-tip">
                {{ $t('platform.welcome.joinTips') }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col
          :span="11"
          :offset="2"
          class="welcome-create"
          @click="createCompany"
        >
          <div class="welcome-join-inner">
            <el-image class="join-image" src="/image/create__enterprise.png" />
            <ul class="join-info">
              <li class="join-info-title">
                {{ $t('platform.welcome.createCompany') }}
              </li>
              <li class="join-info-tip">
                {{ $t('platform.welcome.createTips') }}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-else class="welcome-inner">
      <h1 class="welcome-title">{{ $t('platform.welcome.title') }}</h1>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '@/store/modules/index.js';
export default defineComponent({
  name: 'Index',
  setup() {
    const platformStore = usePlatformStore();
    const router = useRouter();
    const methods = {
      joinCompany() {
        router.push({ name: 'joinCompany' });
      },
      createCompany() {
        router.push({ name: 'createCompany' });
      },
      isShowCreateCompanny() {
        if (platformStore.getUserInfo.tenantCode) {
          return false;
        } else {
          return true;
        }
      }
    };
    return {
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.welcome {
  width: 100%;
  height: 100%;
  background-color: #fff;
  @include flexs();
  @include flexOther();
  .welcome-inner {
    width: 80%;
    .welcome-title {
      text-align: center;
      font-size: 22px;
      color: #333;
      font-weight: normal;
    }
    .welcome-subtitle {
      margin-top: 27px;
      line-height: 20px;
      font-size: 14px;
      color: #79797e;
      text-align: center;
    }
    .welcome-choose {
      margin-top: 70px;
      .welcome-join,
      .welcome-create {
        height: 335px;
        @include radius(10px);
        border: 1px solid #dde0e5;
        @include flexs();
        @include flexOther();
        cursor: pointer;
      }
      .welcome-join-inner {
        @include flexs($flexOtherJustifystart, $flexOtherPackstart);
        .join-image {
          width: 120px;
          height: 120px;
          margin-right: 15px;
        }
        .join-info {
          .join-info-title {
            font-size: 20px;
            line-height: 34px;
            color: #333;
          }
          .join-info-tip {
            margin-top: 20px;
            max-width: 224px;
            font-size: 14px;
            line-height: 23px;
            color: #79797e;
          }
        }
      }
    }
  }
}
</style>
