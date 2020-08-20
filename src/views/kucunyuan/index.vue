<template>
  <div class="kucunyuan">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-kucunyuan
        :loading="loading"
        @getAnalysis="getAnalysis"
        @handleDownload="handleDownload"
      />
    </el-card>

    <el-card shadow="hover" class="crad">
      <el-table v-loading="loading" show-summary :data="tableData" class="kucunyuan-table">
        <el-table-column prop="yearSeason" label="江西$温州" align="center" width="100" />
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
      tableData: [],
      yesterdayRetails: {
        jiangxi: '江西-' + this.$moment().add('-1', 'days').format('M.D'),
        wenzhou: '温州-' + this.$moment().add('-1', 'days').format('M.D')
      }
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.tableData = [
        { yearSeason: '19春', purchase: '105236', sellOut: '98.8%', surplusGoods: '0', storehouse: '564', store: '702', qtyJx: '5', amountJx: '550', qtyWz: '1', amountWz: '100', sale: '16576', retail: '87394' },
        { yearSeason: '19夏', purchase: '105597', sellOut: '95.6%', surplusGoods: '0', storehouse: '875', store: '3820', qtyJx: '26', amountJx: '2700', qtyWz: '12', amountWz: '1096', sale: '15087', retail: '85815' },
        { yearSeason: '19秋', purchase: '59306', sellOut: '88.0%', surplusGoods: '0', storehouse: '2281', store: '4827', qtyJx: '21', amountJx: '3012', qtyWz: '6', amountWz: '859', sale: '5424', retail: '46774' },
        { yearSeason: '19冬', purchase: '102253', sellOut: '79.8%', surplusGoods: '0', storehouse: '13803', store: '6824', qtyJx: '0', amountJx: '0', qtyWz: '0', amountWz: '0', sale: '9146', retail: '72480' },
        { yearSeason: '20春', purchase: '62782', sellOut: '65.6%', surplusGoods: '300', storehouse: '4185', store: '17123', qtyJx: '68', amountJx: '13423', qtyWz: '36', amountWz: '6107', sale: '8492', retail: '32682' },
        { yearSeason: '20夏', purchase: '106737', sellOut: '51.0%', surplusGoods: '0', storehouse: '3052', store: '49284', qtyJx: '363', amountJx: '64442', qtyWz: '196', amountWz: '32378', sale: '13053', retail: '41348' },
        { yearSeason: '20秋', purchase: '27227', sellOut: '11.6%', surplusGoods: '13170', storehouse: '4437', store: '6456', qtyJx: '29', amountJx: '6921', qtyWz: '31', amountWz: '6002', sale: '1529', retail: '1635' }
      ]
      this.loading = false
    }, 3000)
  },
  methods: {
    // 查询
    getAnalysis(data) {
      console.log('开始查询')
    },
    // 导出excel
    handleDownload(str) {
      this.loading = true
      if (this.table.tableData.length === 0) {
        this.loading = false
        return
      }
      str = (str === undefined) ? '' : str
      switch (str) {
        // 单页导出excel  全部导出all
        case 'pageExcel':
        case 'allExcel':
          this.export2excel(str)
          break
        // 全部导出zip
        case 'allZip':
          this.export2zip()
          break
        // 导出pdf
        case 'allPdf':
          this.getPdf(this.title)
          break
        default:
          break
      }
      this.loading = false
    },
    // 导出excel
    export2excel(str) {
      import('@/vendor/Export2Excel').then(excel => {
        // 设置对应表头属性
        const data = this.formatJson(this.table.filterVal, str)
        excel.export_json_to_excel({
          // 设置Excel的表格第一行的标题
          header: this.table.tHeader,
          data,
          filename: this.title + this.$moment().format('YYYY-MM-DD')
        })
      })
    },
    formatJson(filterVal, str) {
      var data = []
      if (str === 'allExcel' | str === 'allZip' | str === 'allPdf') {
        data = this.$store.getters.vipExcavate
      } else if (str === 'pageExcel') {
        data = this.table.tableData
      } else {
        return
      }
      return data.map(v => filterVal.map(j => {
        // 判断是否是时间字段
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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

<style  lang="scss" scoped>
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
</style>
