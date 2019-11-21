<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-19 17:57:19
 * @LastEditors: anan
 * @LastEditTime: 2019-10-11 17:16:37
 -->
<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <el-col :md="8" :sm="12" :xs="24">
        <el-row style="margin-bottom:0px;">
          <el-col :span="11">
            <el-date-picker
              v-model="listQuery.beginDate"
              style="width: 100%;margin-bottom: 5px; font-size:13px;"
              type="date"
              placeholder="开始日期"
            />
          </el-col>
          <el-col :span="2" style="text-align:center;">
            <span style="line-height:38px;">至</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="listQuery.endDate"
              style="width: 100%;margin-bottom: 5px;font-size:13px;"
              type="date"
              placeholder="结束日期"
            />
          </el-col>
        </el-row>
      </el-col>

      <el-col :md="4" :sm="8" :xs="12">
        <!-- 店仓 -->
        <el-input
          v-model="listQuery.storeName"
          placeholder="店仓"
          style="width: 100%;margin-bottom: 5px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </el-col>

      <el-col :md="4" :sm="8" :xs="12">
        <!-- 年份 -->
        <el-input
          v-model="listQuery.year"
          placeholder="款号年份"
          style="width: 100%;margin-bottom: 5px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </el-col>

      <el-col :md="4" :sm="8" :xs="12">
        <!-- 季节 -->
        <el-input
          v-model="listQuery.season"
          placeholder="款号季节"
          style="width: 100%;margin-bottom: 5px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :md="1" :sm="1" :xs="1">
        <!-- 搜索按钮 -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  props: {
    screenHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      listQuery: {}
    }
  },
  watch: {
  },
  methods: {
    // 搜索栏回车事件
    handleFilter() {
      console.log('回车搜索事件')
      console.log(this.listQuery)
    },
    // 刷新事件
    refresh() {
      console.log('刷新')
    }
  }
}
</script>

<style scoped>
.checkbox-group {
  display: inline-table;
  margin-left: 10px;
}
.el-row {
  margin-bottom: 5px;
}
</style>
