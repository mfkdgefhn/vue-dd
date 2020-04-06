<template>
  <div class="vip">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-sale :loading="loading" @getAnalysis="getAnalysis" @handleDownload="handleDownload" />
    </el-card>

    <el-card v-if="page">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="table.tableData"
        :row-style="rowStyle"
        :header-cell-style="{padding: '0px 0px'}"
        style="width: 100%"
      >
        <el-table-column prop="dayTop" label="日均销额排名" align="center" />
        <el-table-column label="累计老店取值：营业时间>=7天" align="center">
          <el-table-column prop="customer" label="经销商" align="center" />
          <el-table-column prop="dayAvgSale" label="当日店均销额" align="center" />
          <el-table-column prop="dayAvgSum" label="当日店均销量" align="center" />
          <el-table-column prop="dayAvgPrice" label="当日店均单价" align="center" />
          <el-table-column label="整体累计单店" align="center">
            <el-table-column prop="monStoreSum1" label="20年当月累计单店" align="center" />
            <el-table-column prop="monStoreSum2" label="19年当月累计单店" align="center" />
            <el-table-column prop="increase" label="增长" align="center" />
          </el-table-column>
        </el-table-column>
        <el-table-column :label="date" align="center">
          <el-table-column label="月累计老店日均" align="center">
            <el-table-column prop="oldYearDayAvg1" label="20年日均" align="center" />
            <el-table-column prop="olgYearDayAvg2" label="19年日均" align="center" />
            <el-table-column prop="oldDayAvgIncrease1" label="日均增长" align="center" />
          </el-table-column>
          <el-table-column label="当日老店日均" align="center">
            <el-table-column prop="oldDayAvg1" label="20年当日店均" align="center" />
            <el-table-column prop="oldDayAvg2" label="19年当日店均" align="center" />
            <el-table-column prop="oldDayAvgIncrease2" label="日均增长" align="center" />
          </el-table-column>
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
import { getStoreDayAvg } from '@/api/table'
import { parseTime } from '@/utils'
import { pagination } from '@/utils/array'

export default {
  name: 'StoreDayAvg',
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
        title: '系统客户日均单店',
        total: 0,
        currentPage: 1, // 当前在第几页
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        tableData: []
      },
      areaCustomer: {
        '成都总经销商': '南区', '重庆总经销商': '南区', '新南昌总经销商': '南区',
        '赣州总经销商': '南区', '新上海总经销商': '南区', '福州总经销商': '南区',
        '柳州总经销商': '南区', '南宁总经销商': '南区', '蚌埠总经销商': '南区',
        '合肥总经销商': '南区', '杭州总经销商': '南区', '株洲总经销商': '南区',
        '广州总经销商': '南区', '武汉总经销商': '南区', '路桥总经销商': '南区',
        '深圳总经销商': '南区',
        '西安总经销商': '北区', '兰州总经销商': '北区', '徐州总经销商': '北区',
        '石市总经销商': '北区', '沈阳总经销商': '北区', '郑州总经销商': '北区',
        '乌市总经销商': '北区', '青岛总经销商': '北区', '南京总经销商': '北区',
        '洛阳总经销商': '北区', '常熟总经销商': '北区', '济南总经销商': '北区',
        '北京总经销商': '北区', '大富豪总经销商': '北区', '大连总经销商': '北区',
        '新临沂总经销商': '北区', '长春总经销商': '北区'
      }
    }
  },
  methods: {
    getAnalysis(data) {
      this.loading = true
      this.date = '查询时间：' + data.date
      getStoreDayAvg(data).then(response => {
        this.table.currentPage = 1
        this.table.pageSize = 10
        this.$store.dispatch('table/setStoreDayAvg', response.data.items)
        this.page = true
        this.table.total = response.data.items.length
        this.table.tableData = pagination(1, this.table.pageSize, response.data.items)
        this.loading = false
        this.$message({
          message: '查询完成!!!',
          type: 'success'
        })
        // 初始化 页大小、页数
      })
      // state.listQuery = Object.assign({}, state.listQuery)
      // this.$store.dispatch('baseApi/getCustomer').then(() => { })
      // this.$store.dispatch('baseApi/setMonths', this.getMonths(0))
    },
    // 单页数量改变
    handleSizeChange(val) {
      this.table.pageSize = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.storeDayAvg)
    },
    // 页数改变
    handleCurrentChange(val) {
      this.table.currentPage = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.storeDayAvg)
    },

    // 导出
    handleDownload(str) {
      if (this.table.tableData.length === 0) {
        return
      }
      this.loading = true
      import('@/vendor/Export2Excel').then(excel => {
        // 设置Excel的表格第一行的标题
        const tHeader = ['日均销额排名', '经销商', '当日店均销额', '当日店均销量', '当日店均单价',
          '20年当月累计单店', '19年当月累计单店', '增长', '20年日均', '19年日均',
          '日均增长', '20年当日店均', '19年当日店均', '日均增长']
        // 设置对应表头属性
        const filterVal = ['dayTop', 'customer', 'dayAvgSale', 'dayAvgSum', 'dayAvgPrice',
          'monStoreSum1', 'monStoreSum2', 'increase', 'oldYearDayAvg1', 'olgYearDayAvg2',
          'oldDayAvgIncrease1', 'oldDayAvg1', 'oldDayAvg2', 'oldDayAvgIncrease2']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.table.title
        })
        this.loading = false
      })
    },
    formatJson(filterVal) {
      return this.table.tableData.map(v => filterVal.map(j => {
        // 判断是否是时间字段
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    rowStyle({ row, rowIndex }) {
      if (row.customer === '全国') {
        return 'background: yellow'
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
