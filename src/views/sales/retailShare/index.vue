<template>
  <div class="RetailShare">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-sale
        :title="table.title"
        :loading="loading"
        @getAnalysis="getAnalysis"
        @handleDownload="handleDownload"
        @exportPdf="exportPdf"
      />
    </el-card>

    <el-card v-if="page" :body-style="{ padding: '0px 0px 50px 0px' }">
      <el-table
        id="pdfDom"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="table.tableData"
        :row-style="rowStyle"
        :header-cell-style="{padding: '0px 0px'}"
        style="width: 100%"
      >
        <el-table-column :label="table.title" align="center">
          <el-table-column prop="area" label="区域" align="center" />
          <el-table-column prop="customer" label="所属经销商" align="center" />
          <el-table-column :label="table.year+table.season" align="center">
            <el-table-column prop="newSalesShare" label="销售占比" align="center" />
            <el-table-column prop="newAvgPrice" label="均单价" align="center" />
            <el-table-column prop="newInventoryRatio" label="库存占比" align="center" />
            <el-table-column prop="newStoreVolume" label="单店铺货量" align="center" />
          </el-table-column>
        </el-table-column>
        <el-table-column :label="date" align="center">
          <el-table-column :label="(table.year-1)+table.season" align="center">
            <el-table-column prop="oldSalesShare" label="销售占比" align="center" />
            <el-table-column prop="oldAvgPrice" label="单价" align="center" />
            <el-table-column prop="oldInventoryRatio" label="库存占比" align="center" />
            <el-table-column prop="oldStoreVolume" label="单店铺货量" align="center" />
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card v-if="page" :body-style="{ padding: '0px 0px 50px 0px',marginTop:'10px 0px 0px 0px' }">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="lastTable.tableData"
        :row-style="rowStyle"
        :header-cell-style="{padding: '0px 0px'}"
        style="width: 100%"
      >
        <el-table-column :label="lastTable.title" align="center">
          <el-table-column prop="area" label="区域" align="center" />
          <el-table-column prop="customer" label="所属经销商" align="center" />
          <el-table-column :label="lastTable.year+lastTable.season" align="center">
            <el-table-column prop="newSalesShare" label="销售占比" align="center" />
            <el-table-column prop="newAvgPrice" label="均单价" align="center" />
            <el-table-column prop="newInventoryRatio" label="库存占比" align="center" />
            <el-table-column prop="newStoreVolume" label="单店铺货量" align="center" />
          </el-table-column>
        </el-table-column>
        <el-table-column :label="date" align="center">
          <el-table-column :label="(lastTable.year-1)+lastTable.season" align="center">
            <el-table-column prop="oldSalesShare" label="销售占比" align="center" />
            <el-table-column prop="oldAvgPrice" label="单价" align="center" />
            <el-table-column prop="oldInventoryRatio" label="库存占比" align="center" />
            <el-table-column prop="oldStoreVolume" label="单店铺货量" align="center" />
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import searchSale from '@/components/public/searchSale'
import { getRetailShare } from '@/api/table'
import { parseTime } from '@/utils'
import { getSeason } from '@/utils/times'

export default {
  name: 'RetailShare',
  components: {
    searchSale
  },
  data() {
    return {
      loading: false,
      date: '',
      page: false,
      total: 0,
      table: {
        title: '零售占比',
        year: 0,
        tableData: []
      },
      lastTable: {
        title: '零售占比',
        year: '',
        tableData: []
      }
    }
  },
  methods: {
    async getAnalysis(data) {
      this.loading = true
      this.date = '查询时间：' + data.billdate
      this.table.year = data.year = this.$moment(data.billdate).year()
      this.table.season = getSeason(data.billdate).ch
      this.table.title = '' + data.year + getSeason(data.billdate).ch + '数量占比'
      data.season = getSeason(data.billdate).zh
      await getRetailShare(data).then(response => {
        this.$store.dispatch('table/setRetailShare', response)
        this.table.tableData = response
      })
      var lastData = {
        billdate: data.billdate,
        year: this.$moment(data.billdate).add(-3, 'M').year(),
        season: getSeason(this.$moment(data.billdate).add(-3, 'M')).zh
      }
      this.lastTable.year = lastData.year
      this.lastTable.season = getSeason(this.$moment(data.billdate).add(-3, 'M')).ch
      this.lastTable.title = '' + lastData.year + getSeason(this.$moment(data.billdate).add(-3, 'M')).ch + '数量占比'

      await getRetailShare(lastData).then(response => {
        this.$store.dispatch('table/setLastRetailShare', response)
        this.lastTable.tableData = response
        this.page = true
        this.loading = false
      })
      this.$message({
        message: '查询完成!!!',
        type: 'success'
      })
    },
    // 导出PDF
    exportPdf() {
      this.getPdf(this.table.title)
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
        const tHeader = ['日均销额排名', '经销商', '当日店均销额', '当日店均销量', '当日店均单价',
          '20年当月累计单店', '19年当月累计单店', '增长', '20年日均', '19年日均',
          '日均增长', '20年当日店均', '19年当日店均', '日均增长']
        // 设置对应表头属性
        const filterVal = ['dayTop', 'customer', 'dayAvgSale', 'dayAvgSum', 'dayAvgPrice',
          'monStoreSum1', 'monStoreSum2', 'increase', 'oldYearDayAvg1', 'olgYearDayAvg2',
          'oldDayAvgIncrease1', 'oldDayAvg1', 'oldDayAvg2', 'oldDayAvgIncrease2']
        const data = this.formatJson(filterVal, str)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.table.title
        })
        this.loading = false
      })
    },
    formatJson(filterVal, str) {
      var data = []
      if (str === 'all') {
        data = this.$store.getters.retailShare
      } else if (str === 'this') {
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

    rowStyle({ row, rowIndex }) {
      if (row.customer === '区域汇总') {
        return 'background: #DDE6ED'
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
</style>
