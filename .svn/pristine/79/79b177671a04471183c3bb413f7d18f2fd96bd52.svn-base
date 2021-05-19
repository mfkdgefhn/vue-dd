<template>
  <div class="kucunyuan">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-kucunyuan :loading="loading" @getAnalysis="getAnalysis" @handleDownload="handleDownload" />
    </el-card>

    <!-- show-summary -->
    <el-card shadow="hover" class="crad">
      <el-table v-loading="loading" stripe border :data="tableData" class="kucunyuan-table" :row-style="rowStyle" :cell-style="cellStyle">
        <el-table-column prop="yearSeason" label="江西$温州" align="center" width="100" fixed />
        <el-table-column prop="purchase" label="进货" align="center" />
        <el-table-column prop="sellOut" label="售罄" align="center" />
        <el-table-column prop="surplusGoods" label="余货" align="center" />
        <el-table-column label="库存" align="center">
          <el-table-column prop="storehouse" label="仓库" align="center" />
          <el-table-column prop="store" label="店铺" align="center" />
        </el-table-column>
        <el-table-column :label="yesterdayRetails.jiangxi" align="center">
          <el-table-column prop="qtyJx" label="数量" align="center" />
          <el-table-column prop="amountJx" label="金额" align="center" />
        </el-table-column>
        <el-table-column :label="yesterdayRetails.wenzhou" align="center">
          <el-table-column prop="qtyWz" label="数量" align="center" />
          <el-table-column prop="amountWz" label="金额" align="center" />
        </el-table-column>
        <el-table-column prop="sale" label="批发" align="center" />
        <el-table-column prop="retail" label="零售" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import searchKucunyuan from '@/components/public/searchKucunyuan'
import { parseTime } from '@/utils'

export default {
  name: 'Kucunyuan',
  components: {
    searchKucunyuan
  },
  data() {
    return {
      loading: false,
      vloading: false,
      title: '库存源',
      tHeader: ['江西&温州', '进货', '售馨', '余货', '仓库库存', '店铺库存', '江西数量', '江西金额', '温州数量', '温州金额', '批发', '零售'],
      tableData: [],
      yesterdayRetails: { jiangxi: '江西', wenzhou: '温州' }
    }
  },
  created() {
    // this.getAnalysis()
  },
  methods: {
    // 查询
    getAnalysis(data) {
      this.tableData = []
      this.loading = true
      this.$store
        .dispatch('baseApi/xnclsfx', data)
        .then(() => {
          this.yesterdayRetails.jiangxi = '江西-' + this.$moment(data.billdate).format('M.D')
          this.yesterdayRetails.wenzhou = '温州-' + this.$moment(data.billdate).format('M.D')
          this.tableData = this.$store.getters.xnclsfx
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
    // 渲染行
    rowStyle({ row, rowIndex }) {
      if (row.yearSeason === '合计') {
        return 'background:#ffc000;'
      }
    },
    // 渲染单元格
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.yearSeason !== '合计' || row.yearSeason !== '包包') {
        return 'padding:0 0;'
      }
    },
    // 导出excel
    handleDownload(str) {
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
        const filterVal = ['yearSeason', 'purchase', 'sellOut', 'surplusGoods', 'storehouse', 'store', 'qtyJx', 'amountJx', 'qtyWz', 'amountWz', 'sale', 'retail']
        const data = this.formatJson(filterVal, str)
        excel.export_json_to_excel({
          // 设置Excel的表格第一行的标题
          header: this.tHeader,
          data,
          filename: this.title + this.$moment().format('YYYY-MM-DD')
        })
      })
    },
    // 将tableDate值转换成json值，非map
    formatJson(filterVal, str) {
      var data = this.tableData
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
    },
    // 导出zip
    export2zip() {
      import('@/vendor/Export2Zip').then(zip => {
        const data = this.formatJson1(this.table.filterVal, this.$store.getters.vipExcavate)
        zip.export_txt_to_zip(this.table.tHeader, data, this.title + this.$moment().format('YYYY-MM-DD'), this.title + this.$moment().format('YYYY-MM-DD'))
      })
    },
    formatJson1(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="scss" scoped>
.kucunyuan {
  margin: 10px;
}
.kucunyuan-table {
  margin: 0 auto;
}
// // 深度设定样式
// /deep/ .el-card__body {
//   padding: 0px;
// }
.crad {
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.total-color {
  background: #ffc000;
}
</style>
