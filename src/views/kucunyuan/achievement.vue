<template>
  <div class="kucunyuan">
    <!-- 达成率 -->
    <el-card shadow="hover" class="crad">
      <div slot="header" class="clearfix">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button style="float: right;margin-right:5px">导出</el-button>
      </div>
      <el-row :gutter="10" class="text item">
        <el-col :span="12">
          <el-table
            v-loading="loading"
            border
            show-summary
            :data="tableDataJx"
            class="kucunyuan-table"
          >
            <el-table-column prop="rnJx" label="排序" align="center" width="60" />
            <el-table-column prop="nameJx" label="江西达成" align="center" width="170" />
            <el-table-column prop="targetJx" label="目标" align="center" width="70" />
            <el-table-column prop="salesJx" label="销售" align="center" width="70" />
            <el-table-column label="达成" align="center">
              <template slot-scope="{row}">
                <el-progress
                  :text-inside="true"
                  :stroke-width="strokeWidth"
                  :color="readerPropress"
                  :percentage="row.reach"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col :span="12">
          <el-table
            v-loading="loading"
            border
            show-summary
            :data="tableDataWz"
            class="kucunyuan-table"
          >
            <el-table-column prop="rnWz" label="排序" align="center" width="60" />
            <el-table-column prop="nameWz" label="温州达成" align="center" width="170" />
            <el-table-column prop="targetWz" label="目标" align="center" width="70" />
            <el-table-column prop="salesWz" label="销售" align="center" width="70" />
            <el-table-column label="达成" align="center">
              <template slot-scope="{row}">
                <el-progress
                  :text-inside="true"
                  :stroke-width="strokeWidth"
                  :color="readerPropress"
                  :percentage="row.reach"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Kucunyuan',
  data() {
    return {
      loading: false,
      tableDataJx: [],
      tableDataWz: [],
      color: '#409eff',
      strokeWidth: 16,
      value: '1',
      options: [{
        value: '1',
        label: '达成率'
      }, {
        value: '2',
        label: '同比'
      }]
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(newVal)
        // 这里设置调用接口并渲染数据
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    readerPropress(percentage) {
      if (percentage >= 100) {
        return '#67C23A'
      } else if (percentage >= 50) {
        return '#409eff'
      } else if (percentage >= 0) {
        return '#6f7ad3'
      } else if (percentage < 0) {
        return '#f56c6c'
      }
      return '#f56c6c'
    },
    init() {
      this.loading = true
      setTimeout(() => {
        this.tableDataJx = [
          { rnJx: '1', nameJx: '江西南昌红谷滩万达店', targetJx: '150000', salesJx: '45482', reach: 0 },
          { rnJx: '2', nameJx: '江西南昌红谷滩万达店', targetJx: '150000', salesJx: '45482', reach: 10 },
          { rnJx: '3', nameJx: '江西南昌红谷滩万达店', targetJx: '150000', salesJx: '45482', reach: 30 },
          { rnJx: '4', nameJx: '江西南昌红谷滩万达店', targetJx: '150000', salesJx: '45482', reach: 50 },
          { rnJx: '5', nameJx: '江西南昌红谷滩万达店', targetJx: '150000', salesJx: '45482', reach: 90 },
          { rnJx: '5', nameJx: '江西南昌红谷滩万达店', targetJx: '150000', salesJx: '45482', reach: 100 }
        ]
        this.tableDataWz = [
          { rnWz: '1', nameWz: '新温州泉州中闽百汇店', targetWz: '50000', salesWz: '22270', reach: 1 },
          { rnWz: '2', nameWz: '新温州泉州中闽百汇店', targetWz: '50000', salesWz: '22270', reach: 10 },
          { rnWz: '3', nameWz: '新温州泉州中闽百汇店', targetWz: '50000', salesWz: '22270', reach: 55 },
          { rnWz: '4', nameWz: '新温州泉州中闽百汇店', targetWz: '50000', salesWz: '22270', reach: 75 }
        ]
        this.loading = false
      }, 100)
    }
    // selectChange(data) {
    //   if (data === '1') {
    //     console.log('达成率')
    //   } else if (data === '2') {
    //     console.log('同比')
    //   }
    // }
  }
}
</script>

<style  lang="scss" scoped>
.kucunyuan {
  margin: 10px;
}
.kucunyuan-table {
  margin: 0 auto;
}
// 深度设定样式
// /deep/ .el-card__body {
//   padding: 0px;
// }
.crad {
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.card-header {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
  letter-spacing: 3px;
  line-height: 40px;
}
</style>
