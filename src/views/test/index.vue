<!--
 * @Description: 前期测试
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-04-19 14:04:49
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:35:49
 * @FilePath: /magus-platform-ui-3.0/src/views/test/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="home">
    <magus-main-layout>
      <template #layoutSearch>
        <magus-search>
          <template #form>
            <el-form-item label="测试">
              <el-input v-model="query.name" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">查询</el-button>
            </el-form-item>
          </template>
        </magus-search>
      </template>
      <template #mainButton>
        <el-button type="primary" size="small">新增</el-button>
        <el-button type="primary" size="small">新增</el-button>
      </template>
      <template #mainPagebar>
        <magus-paging
          :current-page="query.pageNum"
          :page-size="query.pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="query.count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </magus-main-layout>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      query: {
        name: '',
        pageNum: 1,
        pageSize: 20,
        count: 0
      }
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
}
</style>
