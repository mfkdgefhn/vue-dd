<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-08-19 11:16:46
 * @LastEditors: anan
 * @LastEditTime: 2020-09-03 16:04:52
-->
<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 时间查询 -->
      <el-col :md="8" :sm="12" :xs="24">
        <el-row style="margin-bottom:0px;">
          <el-col :span="24">
            <el-date-picker
              v-model="listQuery.billdate"
              style="width: 100%; margin-bottom: 5px; font-size:12px;"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyyMMdd"
              placeholder="开始日期"
            />
          </el-col>
        </el-row>
      </el-col>

      <!-- 搜索按钮 -->
      <el-col :md="3" :sm="5" :xs="5">
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleFilter"
        >搜索</el-button>
      </el-col>

      <!-- 导出 -->
      <el-col :md="3" :sm="5" :xs="5">
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleDownload"
        >导出</el-button>
      </el-col>
    </el-row>

    <!-- 提示信息弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Search',
  props: {
    screenHeight: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: 'background-color:rgba(78,143,223,0);'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showAllLevels: false,
      listQuery: {
        billdate: this.$moment().add('-1', 'days').format('YYYYMMDD')
      },
      storeOptions: [],
      restaurants: [],
      dialogVisible: false
    }
  },
  methods: {
    // 搜索栏回车事件
    handleFilter() {
      var data = Object.assign({}, this.listQuery)
      this.$emit('getAnalysis', data)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    handleDownload() {
      this.$emit('handleDownload')
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
