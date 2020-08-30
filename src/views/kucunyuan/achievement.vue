<template>
  <div class="achievement">
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
      <!-- 达成 -->
      <el-row v-if="value==='1'" :gutter="10" class="text item">
        <el-col :span="12">
          <el-table
            v-loading="loading"
            border
            show-summary
            :data="tableDataJx"
            class="achievement-table"
          >
            <el-table-column prop="rn" :label="tableLabelDc.jx.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelDc.jx.name" align="center" width="170" />
            <el-table-column
              prop="target"
              :label="tableLabelDc.jx.target"
              align="center"
              width="70"
            />
            <el-table-column prop="sales" :label="tableLabelDc.jx.sales" align="center" width="70" />
            <el-table-column :label="tableLabelDc.jx.reach" align="center">
              <template slot-scope="{row}">
                <el-progress
                  :text-inside="true"
                  :stroke-width="strokeWidth"
                  :color="readerPropress"
                  :percentage="row.reach > 100 ? 100: parseInt(row.reach)"
                  :format="_format(row.reach)"
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
            class="achievement-table"
          >
            <el-table-column prop="rn" :label="tableLabelDc.wz.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelDc.wz.name" align="center" width="170" />
            <el-table-column
              prop="target"
              :label="tableLabelDc.wz.target"
              align="center"
              width="70"
            />
            <el-table-column prop="sales" :label="tableLabelDc.wz.sales" align="center" width="70" />
            <el-table-column :label="tableLabelDc.wz.reach" align="center">
              <template slot-scope="{row}">
                <el-progress
                  :text-inside="true"
                  :stroke-width="strokeWidth"
                  :color="readerPropress"
                  :percentage="row.reach > 100 ? 100: parseInt(row.reach)"
                  :format="_format(row.reach)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 同比 -->
      <el-row v-else :gutter="10" class="text item">
        <el-col :span="12">
          <el-table
            v-loading="loading"
            border
            show-summary
            :data="tableDataJx"
            class="achievement-table"
          >
            <el-table-column prop="rn" :label="tableLabelTb.jx.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelTb.jx.name" align="center" width="170" />
            <el-table-column
              prop="samePeriod"
              :label="tableLabelTb.jx.samePeriod"
              align="center"
              width="70"
            />
            <el-table-column prop="sales" :label="tableLabelTb.jx.sales" align="center" width="70" />
            <el-table-column :label="tableLabelTb.jx.yearOnYear" align="center">
              <template slot-scope="{row}">
                <el-progress
                  :text-inside="true"
                  :stroke-width="strokeWidth"
                  :color="readerPropress"
                  :percentage="row.yearOnYear"
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
            <el-table-column prop="rn" :label="tableLabelTb.wz.rn" align="center" width="60" />
            <el-table-column prop="name" :label="tableLabelTb.wz.name" align="center" width="170" />
            <el-table-column
              prop="samePeriod"
              :label="tableLabelTb.wz.samePeriod"
              align="center"
              width="70"
            />
            <el-table-column prop="sales" :label="tableLabelTb.wz.sales" align="center" width="70" />
            <el-table-column :label="tableLabelTb.wz.yearOnYear" align="center">
              <template slot-scope="{row}">
                <el-progress
                  :text-inside="true"
                  :stroke-width="strokeWidth"
                  :color="readerPropress"
                  :percentage="row.yearOnYear"
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
  name: 'Achievement',
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
      }],
      tableLabelDc: {
        'jx': { 'rn': '排序', 'name': '江西达成', 'target': '目标', 'sales': '销售', 'reach': '达成' },
        'wz': { 'rn': '排序', 'name': '温州达成', 'target': '目标', 'sales': '销售', 'reach': '达成' }
      },
      tableLabelTb: {
        'jx': { 'rn': '排序', 'name': '江西同比', 'samePeriod': '同期', 'sales': '本期', 'yearOnYear': '同比' },
        'wz': { 'rn': '排序', 'name': '温州同比', 'samePeriod': '同期', 'sales': '本期', 'yearOnYear': '同比' }
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
  created() {
    this.getAnalysis()
  },
  methods: {
    // 查询
    getAnalysis(data) {
      this.loading = true
      this.$store.dispatch('baseApi/yjdctbfx', { yearmonth: this.$moment().add(-1, 'd').format('YYYYMM') })
        .then(() => {
          this.tableData = this.$store.getters.yjdctbfx
          // 将数据拆分成两部分
          this.tableData.forEach(element => {
            if (element.area === '江西区域') {
              this.tableDataJx.push(element)
            } else if (element.area === '温州区域') {
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
    _format(value) {
      return () => {
        return value + '%'
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
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
</style>
