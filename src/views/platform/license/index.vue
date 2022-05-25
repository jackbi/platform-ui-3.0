<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 13:33:35
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:35:13
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/license/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="platform-license">
    <magus-main-layout>
      <!-- 上方TAB空间，如果不需要请删除 -->
      <template #layoutTab>
        <magus-tab>
          <template #tabName><!-- 左边名称 -->license管理</template>
        </magus-tab>
      </template>
      <!-- 内容部分 -->
      <template #layoutMain>
        <!--  -->
        <el-form
          :model="licenseInfo"
          label-width="80px"
          style="padding: 10px 0"
        >
          <el-form-item label="产品名称:" />
          <el-form-item label="到期时间:" />
          <el-form-item label="授权点数:" />
          <el-form-item>
            <el-button type="primary" size="small">更新授权</el-button>
          </el-form-item>
        </el-form>
      </template>
    </magus-main-layout>
  </div>
</template>
<script>
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      licenseInfo: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style lang="scss" scoped>
.platform-license {
  height: 100%;
  width: 100%;
}
</style>
