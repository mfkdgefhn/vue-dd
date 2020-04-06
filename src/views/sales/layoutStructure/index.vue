<template>
  <div class="vip">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-sale :loading="loading" @getAnalysis="getAnalysis" @handleDownload="handleDownload" />
    </el-card>
    <el-card v-if="page">
      <el-button
        type="primary"
        :loading="loading"
        @click="isThisYear = !isThisYear"
      >{{ loading==='true'? '加载中' : title }}</el-button>
      <!-- 表格 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="table.tableData"
        style="width: 100%"
      >
        <el-table-column prop="customer" label="经销商" align="center" />
        <el-table-column prop="mid6" label="品名" align="center" />
        <el-table-column prop="product" label="款" align="center" />
        <el-table-column prop="sku" label="SKU" align="center" />
        <el-table-column label="客户" align="center">
          <el-table-column prop="wholesaleCustomer" label="批发" align="center" />
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
          <el-table-column prop="UnitPriceChange" label="单价变化" align="center" />
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
    </el-card>
  </div>
</template>

<script>
import searchSale from '@/components/public/searchSale'
import { getInSaleStorage } from '@/api/table'
import { parseTime } from '@/utils'
import { getSeason } from '@/utils/times'

export default {
  name: 'InSaleStorage',
  components: {
    searchSale
  },
  data() {
    return {
      loading: false,
      date: '',
      lastDate: this.$moment().add(-3, 'M').format('YYYYMMDD'),
      today: this.$moment().format('YYYYMMDD'),
      isThisYear: true,
      page: false,
      total: 0,
      table: {
        title: '零售占比',
        total: 0,
        currentPage: 1, // 当前在第几页
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        tableData: [],
        beiquSum: [{
          'area': '北区',
          'customer': '汇总',
          'outGoodsCount': '647294',
          'SurplusGoodsCount': '3462',
          'wholesaleCount': '137333',
          'retailCount': '257821',
          'unitPrice': '255',
          'wholeSaleRate': '61%',
          'grossMarginRate': '64%',
          'storage': '33850',
          'allStorage': '247731',
          'storeNum': '504',
          'storeStorage': '424'
        }],
        countrySum: [{
          'area': '全国',
          'customer': '汇总',
          'outGoodsCount': '647294',
          'SurplusGoodsCount': '3462',
          'wholesaleCount': '137333',
          'retailCount': '257821',
          'unitPrice': '255',
          'wholeSaleRate': '61%',
          'grossMarginRate': '64%',
          'storage': '33850',
          'allStorage': '247731',
          'storeNum': '504',
          'storeStorage': '424'
        }]
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
  computed: {
    title() {
      // `this` 指向 vm 实例
      if (this.isThisYear) {
        return this.$moment(this.today).year() + '年' + getSeason(this.today) + '版面结构'
      } else {
        return this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate) + '版面结构'
      }
    }
  },
  methods: {
    getAnalysis(data) {
      this.loading = true
      this.table.tableData = []
      this.date = '查询时间：' + data.date
      getInSaleStorage(data).then(response => {
        this.page = true
        this.$store.dispatch('table/setInSaleStorage', response.data.items)
        this.table.tableData = response.data.items
        this.loading = false
        this.$message({
          message: '查询完成!!!',
          type: 'success'
        })
      })
      // state.listQuery = Object.assign({}, state.listQuery)
      // this.$store.dispatch('baseApi/getCustomer').then(() => { })
      // this.$store.dispatch('baseApi/setMonths', this.getMonths(0))
    },
    // 导出
    handleDownload(str) {
      this.loading = true
      if (this.table.tableData.length === 0) {
        this.loading = false
        return
      }
      str = (str === null) ? '' : str
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
          filename: this.table.title
        })
        this.loading = false
      })
    },

    formatJson(filterVal, str) {
      var data = []
      if (str === 'all') {
        data = this.$store.getters.inSaleStorage
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
.tag-style {
  margin: 5px 5px;
}
</style>
