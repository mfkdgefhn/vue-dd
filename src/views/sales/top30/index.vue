<template>
  <div class="Top30">
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
        :header-cell-style="{padding: '0px 0px'}"
        :data="table.tableData"
        style="width: 100%"
      >
        <el-table-column label="系统店铺业绩TOP30汇总" align="center">
          <el-table-column prop="dayTop" label="日业绩排名" align="center" />
          <el-table-column prop="customer" label="经销商" align="center" width="200px" />
          <el-table-column prop="storeName" label="店铺名称" align="center" width="200px" />
          <el-table-column prop="dayTotAmtActual" label="日业绩" align="center" />
          <el-table-column prop="dayQty" label="日销量" align="center" />
          <el-table-column prop="dayAvgPrice" label="日单价" align="center" />
        </el-table-column>
        <el-table-column :label="date" align="center">
          <el-table-column prop="monTotAmtActual" label="本月业绩" align="center" />
          <el-table-column prop="monQty" label="本月销量" align="center" />
          <el-table-column prop="monAvgPrice" label="本月日均销额" align="center" />
          <el-table-column prop="yearStorage" :label="lastMaxToday" align="center" />
          <el-table-column prop="yearStorage1" :label="lastToday" align="center" />
          <el-table-column prop="yearStorage2" :label="today" align="center" />
        </el-table-column>
      </el-table>
    </el-card>

    <el-card v-if="page" class="block">
      <el-pagination
        :current-page="table.currentPage"
        :page-sizes="table.pageSizes"
        :page-size="table.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import searchSale from '@/components/public/searchSale'
import { getTop30 } from '@/api/table'
import { parseTime } from '@/utils'
import { pagination } from '@/utils/array'
import { getSeason } from '@/utils/times'

export default {
  name: 'Top30',
  components: {
    searchSale
  },
  data() {
    return {
      loading: false,
      date: '',
      page: false,
      total: 0,
      today: ('' + this.$moment().add(-1, 'D').add(1, 'M').year()).substring(2, 4) + getSeason(this.$moment().add(-1, 'D').add(1, 'M')).ch + '库存',
      lastToday: ('' + this.$moment().add(-1, 'D').add(-2, 'M').year()).substring(2, 4) + getSeason(this.$moment().add(-1, 'D').add(-2, 'M')).ch + '库存',
      lastMaxToday: ('' + this.$moment().add(-1, 'D').add(-5, 'M').year()).substring(2, 4) + getSeason(this.$moment().add(-1, 'D').add(-5, 'M')).ch + '库存',
      table: {
        total: 0,
        title: 'top30',
        currentPage: 1, // 当前在第几页
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        tableData: []
      }
    }
  },
  methods: {
    getAnalysis(data) {
      this.loading = true
      this.date = '查询时间：' + data.billdate
      getTop30(data).then(response => {
        this.table.currentPage = 1
        this.table.pageSize = 10
        this.page = true
        this.$store.dispatch('table/setTop30', response)
        this.table.total = response.length
        this.table.tableData = pagination(1, this.table.pageSize, response)
        this.loading = false
        this.$message({
          message: '查询完成!!!',
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // 单页数量改变
    handleSizeChange(val) {
      this.table.pageSize = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.top30)
    },
    // 页数改变
    handleCurrentChange(val) {
      this.table.currentPage = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.top30)
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
        const tHeader = ['日业绩排名', '店铺名称', '日业绩', '日销量', '日单价',
          '本月业绩', '本月销量', '本月日均销额', this.lastMaxToday, this.lastToday, this.today]
        // 设置对应表头属性
        const filterVal = ['dayTop', 'storeName', 'dayTotAmtActual', 'dayQty', 'dayAvgPrice',
          'monTotAmtActual', 'monQty', 'monAvgPrice', 'yearStorage', 'yearStorage1', 'yearStorage2']
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
        data = this.$store.getters.top30
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
    }

  }
}
</script>

<style scoped>
.block {
  text-align: center;
}
</style>
