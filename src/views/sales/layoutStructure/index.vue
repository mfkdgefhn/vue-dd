<template>
  <div class="InSaleStorage">
    <el-card :body-style="{ padding: '0px 0px 50px 0px' }">
      <el-row class="menu-class">
        <el-col>
          <search-sale-new
            :loading="loading"
            :title="title"
            @editTitle="editTitle"
            @handleDownload="handleDownload"
            @exportPdf="exportPdf"
          />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <!-- 表格 -->
          <el-table
            id="pdfDom"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="table.tableData"
            :row-style="rowStyle"
          >
            <el-table-column prop="customer" label="经销商" width="100px" align="center" />
            <el-table-column prop="mid6" label="品名" align="center" />
            <el-table-column prop="product" label="款" align="center" />
            <el-table-column prop="sku" label="SKU" align="center" />
            <el-table-column label="客户" align="center">
              <el-table-column prop="wholeSaleCustomer" label="批发" align="center" />
            </el-table-column>
            <el-table-column label="直营销售" align="center">
              <el-table-column prop="cumulativeSales" label="累销" align="center" />
              <el-table-column prop="lastWeek" label="上周" align="center" />
              <el-table-column prop="thisWeek" label="本周" align="center" />
              <el-table-column prop="quantityLoopRatio" label="量环比" align="center" />
            </el-table-column>
            <el-table-column prop="cumulativeGrossMargin" label="累计毛利率" align="center" />
            <el-table-column prop="avgCost" label="均成本" align="center" />
            <el-table-column label="均单价" align="center">
              <el-table-column prop="allUnitPrice" label="总单价" align="center" />
              <el-table-column prop="lastWeekUnitPrice" label="上周" align="center" />
              <el-table-column prop="thisWeekUnitPrice" label="本周" align="center" />
              <el-table-column prop="unitPriceChange" label="单价变化" align="center" />
            </el-table-column>
            <el-table-column label="仓库" align="center">
              <el-table-column prop="storageNum" label="数量" align="center" />
            </el-table-column>
            <el-table-column label="店铺" align="center">
              <el-table-column prop="storeNum" label="数量" align="center" />
            </el-table-column>
            <el-table-column prop="soldOutRate" label="售罄率" align="center" />
            <el-table-column prop="weekStorageSale" label="周存销" align="center" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import searchSaleNew from '@/components/public/searchSaleNew'
import { getLayoutStructure } from '@/api/table'
import { parseTime } from '@/utils'
import { getSeason } from '@/utils/times'

export default {
  name: 'InSaleStorage',
  components: {
    searchSaleNew
  },
  data() {
    return {
      loading: false,
      lastDate: this.$moment().add(-1, 'D').add(-3, 'M').format('YYYYMMDD'),
      today: this.$moment().add(-1, 'D').format('YYYYMMDD'),
      isThisYear: true,
      table: {
        tableData: [],
        htmlTitle: this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '版面结构',
        title: this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '版面结构',
        year: this.$moment(this.today).year(),
        season: getSeason(this.today).zh
      }
    }
  },
  // year
  // season
  computed: {
    title() {
      // `this` 指向 vm 实例
      if (this.isThisYear) {
        return this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '版面结构'
      } else {
        return this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate).ch + '版面结构'
      }
    }
  },
  watch: {
    isThisYear(val, oldVal) {
      if (val) { // 今年
        this.table.htmlTitle = this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '进销存'
        this.table.title = this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '版面结构'
        this.table.year = this.$moment(this.today).year()
        this.table.season = getSeason(this.today).zh
      } else { // 去年
        this.table.htmlTitle = this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate).ch + '进销存'
        this.table.title = this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate).ch + '版面结构'
        this.table.year = this.$moment(this.lastDate).year()
        this.table.season = getSeason(this.lastDate).zh
      }
      this.getAnalysis()
    }
  },
  created() {
    this.isThisYear = true
    this.getAnalysis()
  },
  methods: {
    exportPdf() {
      this.getPdf(this.htmlTitle)
    },
    editTitle() {
      this.isThisYear = !this.isThisYear
      this.getAnalysis()
    },
    getAnalysis() {
      this.loading = true
      this.table.tableData = []
      getLayoutStructure({ year: this.table.year, season: this.table.season }).then(response => {
        this.$store.dispatch('table/setLayoutStructure', response)
        this.table.tableData = response
        this.loading = false
        this.$message({
          message: '查询完成!!!',
          type: 'success'
        })
      })
    },
    // 导出
    handleDownload(str) {
      this.loading = true
      if (this.table.tableData.length === 0) {
        this.loading = false
        return
      }
      str = (str === undefined) ? '' : str
      import('@/vendor/Export2Excel').then(excel => {
        // 设置Excel的表格第一行的标题
        const tHeader = ['经销商', '品名', '款', 'SKU', '客户批发',
          '累销', '上周', '本周', '量环比', '累计毛利率',
          '均成本', '总单价', '上周', '本周', '单价变化',
          '仓库数量', '店铺数量', '售罄率', '周存销']
        // 设置对应表头属性
        const filterVal = ['customer', 'mid6', 'product', 'sku', 'wholesaleCustomer',
          'cumulativeSales', 'lastWeek', 'thisWeek', 'quantityLoopRatio', 'cumulativeGrossMargin',
          'avgCost', 'allUnitPrice', 'lastWeekUnitPrice', 'thisWeekUnitPrice', 'UnitPriceChange',
          'storageNum', 'storeNum', 'soldOutRate', 'weekStorageSale']
        const data = this.formatJson(filterVal, str)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.title
        })
        this.loading = false
      })
    },

    formatJson(filterVal, str) {
      var data = this.$store.getters.layoutStructure
      return data.map(v => filterVal.map(j => {
        // 判断是否是时间字段
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    rowStyle({ row, rowIndex }) {
      if (row.mid6.indexOf('汇总') > 0) {
        return 'background: #DFE6ED'
      } else if (row.mid6.indexOf('汇总') === 0) {
        return 'background: #EFE6ED'
      }
      return ''
    }

  }
}
</script>

<style scoped>
.block {
  text-align: center;
}
.tag-style {
  margin: 5px 5px;
}
.menu-class {
  margin: 10px;
}
</style>
