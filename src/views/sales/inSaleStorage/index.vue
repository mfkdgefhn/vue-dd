<template>
  <div class="InSaleStorage">
    <!-- 表格 -->
    <el-card :body-style="{ padding: '0px 0px 50px 0px' }">
      <el-row class="menu-class">
        <el-col>
          <search-sale-new
            :loading="loading"
            :title="table.title"
            @editTitle="editTitle"
            @handleDownload="handleDownload"
            @exportPdf="exportPdf"
          />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-table
            id="pdfDom"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="table.tableData"
            :row-style="rowStyle"
            style="width: 100%"
          >
            <el-table-column prop="area" label="区域" align="center" />
            <el-table-column prop="customer" label="经销商" align="center" />
            <el-table-column prop="outGoodsCount" label="发货量" align="center" />
            <el-table-column prop="surplusGoodsCount" label="余货量" align="center" />
            <el-table-column prop="wholesaleCount" label="批发数量" align="center" />
            <el-table-column prop="retailCount" label="零售数量" align="center" />
            <el-table-column prop="unitPrice" label="整体单价" align="center" />
            <el-table-column prop="wholeSaleRate" label="整体售罄率" align="center" />
            <el-table-column prop="grossMarginRate" label="毛利率" align="center" />
            <el-table-column prop="storage" label="仓库" align="center" />
            <el-table-column prop="allStorage" label="总库存" align="center" />
            <el-table-column prop="storeNum" label="铺店数" align="center" />
            <el-table-column prop="storeStorage" label="单店存" align="center" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import searchSaleNew from '@/components/public/searchSaleNew'
import { getInSaleStorage } from '@/api/table'
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
        htmlTitle: this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '进销存',
        title: this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '进销存',
        year: this.$moment(this.today).year(),
        season: getSeason(this.today).zh,
        tableData: []
      }
    }
  },
  computed: {

  },
  watch: {
    isThisYear(val, oldVal) {
      if (val) { // 今年
        this.table.htmlTitle = this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '进销存'
        this.table.title = this.$moment(this.today).year() + '年' + getSeason(this.today).ch + '进销存'
        this.table.year = this.$moment(this.today).year()
        this.table.season = getSeason(this.today).zh
      } else { // 去年
        this.table.htmlTitle = this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate).ch + '进销存'
        this.table.title = this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate).ch + '进销存'
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
      this.getPdf(this.table.htmlTitle)
    },
    editTitle() {
      this.isThisYear = !this.isThisYear
      // this.getAnalysis()
    },
    getAnalysis() {
      this.loading = true
      this.table.tableData = []
      getInSaleStorage({ year: this.table.year, season: this.table.season }).then(response => {
        this.$store.dispatch('table/setInSaleStorage', response)
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
      debugger
      this.loading = true
      if (this.table.tableData.length === 0) {
        this.loading = false
        return
      }
      str = (str === undefined) ? '' : str
      import('@/vendor/Export2Excel').then(excel => {
        // 设置Excel的表格第一行的标题
        const tHeader = ['区域', '经销商', '发货量', '余货量', '批发数量',
          '零售数量', '整体单价', '整体售罄率', '毛利率', '仓库',
          '总库存', '铺店数', '单店存']
        // 设置对应表头属性
        const filterVal = ['area', 'customer', 'outGoodsCount', 'surplusGoodsCount', 'wholesaleCount',
          'retailCount', 'unitPrice', 'wholeSaleRate', 'grossMarginRate', 'storage',
          'allStorage', 'storeNum', 'storeStorage']
        const data = this.formatJson(filterVal, str)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.table.htmlTitle
        })
        this.loading = false
      })
    },
    formatJson(filterVal, str) {
      var data = []
      data = this.$store.getters.inSaleStorage
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
      if (row.customer === '区域汇总') {
        return 'background: #DFE6ED'
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
