<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 搜索按钮 -->
      <el-col>
        <!-- 加载 -->
        <el-button
          type="primary"
          :loading="loading"
          @click="load"
        >{{ loading==='true'? '加载中' : title }}</el-button>

        <!-- 单页导出 -->
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload('this')"
        >单页导出</el-button>

        <!-- 全部导出 -->
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload('all')"
        >全部导出</el-button>

        <!-- PDF -->
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="exportPdf"
        >PDF</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { getSeason } from '@/utils/times'

export default {
  name: "SearchSaleNew",
  directives: { waves },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 修改标题并加载
    load() {
      this.$emit('editTitle')
    },
    // 导出EXCEL
    handleDownload(str) {
      this.$emit('handleDownload', str)
    },
    // 导出PDF
    exportPdf() {
      this.$emit('exportPdf')
    }

  }
};
</script>

<style scoped>
.checkbox-group {
  display: inline-table;
  margin-left: 10px;
}
.el-row {
  margin-bottom: 5px;
}
.filter-item {
  margin-bottom: 5px;
}
</style>
