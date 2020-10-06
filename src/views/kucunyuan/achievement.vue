<template>
  <div class="achievement">
    <!-- 达成率 -->
    <el-card shadow="hover" class="crad">
      <div slot="header" class="clearfix">
        <!-- 月份 -->
        <el-date-picker v-model="value2" type="month" format="yyyy年MM月" value-format="yyyyMM" placeholder="选择月" />
        <!-- 查询 -->
        <el-button style="margin-right:5px" @click="getAnalysis">查询</el-button>

        <el-select v-model="value" placeholder="请选择" style="float: right;margin-right:5px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-button style="float: right;margin-right:5px" @click="handleDownload">导出</el-button>
      </div>
      <!-- 达成 -->
      <el-row v-show="value === '1'" :gutter="10" class="text item">
        <el-col :md="12" :sm="24" :xs="24">
          <el-table v-loading="loading" border :data="tableDataJx" class="achievement-table" :row-style="rowStyle">
            <el-table-column prop="rn" :label="tableLabelDc.jx.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelDc.jx.name" align="center" width="170" />
            <el-table-column prop="target" :label="tableLabelDc.jx.target" align="center" width="70" />
            <el-table-column prop="sales" :label="tableLabelDc.jx.sales" align="center" width="70" />
            <el-table-column :label="tableLabelDc.jx.reach" align="center">
              <template slot-scope="{ row }">
                <el-progress :text-inside="true" :stroke-width="strokeWidth" :color="readerPropress" :percentage="row.reach > 100 ? 100 : parseInt(row.reach)" :format="_format(row.reach)" />
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col :md="12" :sm="24" :xs="24">
          <el-table v-loading="loading" border :data="tableDataWz" class="achievement-table" :row-style="rowStyle">
            <el-table-column prop="rn" :label="tableLabelDc.wz.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelDc.wz.name" align="center" width="170" />
            <el-table-column prop="target" :label="tableLabelDc.wz.target" align="center" width="70" />
            <el-table-column prop="sales" :label="tableLabelDc.wz.sales" align="center" width="70" />
            <el-table-column :label="tableLabelDc.wz.reach" align="center">
              <template slot-scope="{ row }">
                <el-progress :text-inside="true" :stroke-width="strokeWidth" :color="readerPropress" :percentage="row.reach > 100 ? 100 : parseInt(row.reach)" :format="_format(row.reach)" />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 同比 -->
      <el-row v-show="value === '2'" :gutter="10" class="text item">
        <el-col :md="12" :sm="24" :xs="24">
          <el-table v-loading="loading" border :data="tableDataJx" class="achievement-table" :row-style="rowStyle">
            <el-table-column prop="rn" :label="tableLabelTb.jx.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelTb.jx.name" align="center" width="170" />
            <el-table-column prop="samePeriod" :label="tableLabelTb.jx.samePeriod" align="center" width="70" />
            <el-table-column prop="sales" :label="tableLabelTb.jx.sales" align="center" width="70" />
            <el-table-column prop="yearOnYear" :label="tableLabelTb.jx.yearOnYear" align="center" />
          </el-table>
        </el-col>

        <el-col :md="12" :sm="24" :xs="24">
          <el-table v-loading="loading" border :data="tableDataWz" class="kucunyuan-table" :row-style="rowStyle">
            <el-table-column prop="rn" :label="tableLabelTb.wz.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelTb.wz.name" align="center" width="170" />
            <el-table-column prop="samePeriod" :label="tableLabelTb.wz.samePeriod" align="center" width="70" />
            <el-table-column prop="sales" :label="tableLabelTb.wz.sales" align="center" width="70" />
            <el-table-column prop="yearOnYear" :label="tableLabelTb.wz.yearOnYear" align="center" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'Achievement',
  data() {
    return {
      title: '业绩',
      tHeaderDcJx: ['排序', '江西达成', '目标', '销售', '达成'],
      tHeaderDcWz: ['排序', '温州达成', '目标', '销售', '达成'],
      tHeaderDc: ['排序', '江西达成', '目标', '销售', '达成'],
      tHeaderWz: ['排序', '温州达成', '目标', '销售', '达成'],
      loading: false,
      tableDataJx: [],
      tableDataWz: [],
      color: '#409eff',
      strokeWidth: 16,
      value: '1',
      value2: this.$moment()
        .add('-1', 'day')
        .format('YYYYMM'),
      options: [
        {
          value: '1',
          label: '达成率'
        },
        {
          value: '2',
          label: '同比'
        }
      ],
      tableLabelDc: {
        jx: { rn: '排序', name: '江西达成', target: '目标', sales: '销售', reach: '达成' },
        wz: { rn: '排序', name: '温州达成', target: '目标', sales: '销售', reach: '达成' }
      },
      tableLabelTb: {
        jx: { rn: '排序', name: '江西同比', samePeriod: '同期', sales: '本期', yearOnYear: '同比' },
        wz: { rn: '排序', name: '温州同比', samePeriod: '同期', sales: '本期', yearOnYear: '同比' }
      }
    }
  },
  computed: {
    table() {
      if (this.value === '1') {
        return {
          title: '库存源',
          header: {
            jx: ['排序', '江西达成', '目标', '销售', '达成'],
            wz: ['排序', '温州达成', '目标', '销售', '达成']
          },
          column: ['rn', 'name', 'target', 'sales', 'reach']
        }
      } else {
        return {
          title: '业绩',
          header: {
            jx: ['排序', '江西同比', '同期', '本期', '同比'],
            wz: ['排序', '温州同比', '同期', '本期', '同比']
          },
          column: ['rn', 'name', 'samePeriod', 'sales', 'yearOnYear']
        }
      }
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
  methods: {
    // 查询
    getAnalysis() {
      this.tableDataJx = []
      this.tableDataWz = []
      this.tableData = []
      this.loading = true
      const data = { yearmonth: this.value2 }
      this.$store
        .dispatch('baseApi/yjdctbfx', data)
        .then(() => {
          this.tableData = this.$store.getters.yjdctbfx
          // 将数据拆分成两部分
          this.tableData.forEach(element => {
            if (element.area === '江西区域') {
              element.yearOnYear = element.yearOnYear + '%'
              this.tableDataJx.push(element)
            } else if (element.area === '温州区域') {
              element.yearOnYear = element.yearOnYear + '%'
              this.tableDataWz.push(element)
            }
          })

          if (this.value === '1') {
            console.log('达成')
          } else if (this.value === '2') {
            console.log('同比')
          }

          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
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
    // 重新渲染文字，100%的达成需要该方式
    _format(value) {
      return () => {
        return value + '%'
      }
    },
    // 渲染行颜色
    rowStyle({ row, rowIndex }) {
      if (row.name === '承包' || row.name === '直营' || row.name === '联营' || row.name === '其他') {
        return 'background:#65E568;color:red;font-weight:900;'
      } else if (row.name === '温州区域合计' || row.name === '江西区域合计') {
        return 'background:#6AEAAA;color:red;font-weight:900;'
      }
    },
    // 导出excel
    handleDownload(str) {
      debugger
      this.loading = true
      if (this.tableData.length === 0) {
        this.loading = false
        return
      }
      this.export2excel(str)
      this.loading = false
    },
    // 导出excel
    export2excel(str) {
      import('@/vendor/Export2Excel').then(excel => {
        let data = this.formatJson(this.table.column, this.tableDataJx)
        excel.export_json_to_excel({
          // 设置Excel的表格第一行的标题
          header: this.table.header.jx,
          data,
          filename: this.table.title + 'Jx' + this.$moment().format('YYYY-MM-DD')
        })
        data = this.formatJson(this.table.column, this.tableDataWz)
        excel.export_json_to_excel({
          // 设置Excel的表格第一行的标题
          header: this.table.header.wz,
          data,
          filename: this.table.title + 'Wz' + this.$moment().format('YYYY-MM-DD')
        })
      })
    },
    // 将tableDate值转换成json值，非map
    formatJson(filterVal, str) {
      var data = str
      return data.map(v =>
        filterVal.map(j => {
          // 判断是否是时间字段
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.achievement {
  margin: 10px;
}
.achievement-table {
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
.font-color {
  color: black;
}
</style>
