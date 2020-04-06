<template>
  <div class="vip">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-sale :loading="loading" @getAnalysis="getAnalysis" @handleDownload="handleDownload" />
    </el-card>
    <!-- 表格 -->
    <el-card v-if="page">
      <el-tag effect="dark" class="tag-style" size="medium" @click="isToday = !isToday">{{ title }}</el-tag>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="table.tableData"
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

      <!-- 北区 汇总		647294 	3462 	137333 	257821 	255 	61%	64%	33850 	247731 	504 	424  -->

      <el-table :data="table.beiquSum" :show-header="false" :row-style="{background:'yellow'}">
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
      <el-table :data="table.tableData" style="width: 100%;">
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
      <el-table :data="table.beiquSum" :show-header="false" :row-style="{background:'yellow'}">
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
      <!-- 全国 -->
      <el-table :data="table.countrySum" :show-header="false" :row-style="{background:'yellow'}">
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
    </el-card>
  </div>
</template>

<script>
import searchSale from '@/components/public/searchSale'
import { getInSaleStorage } from '@/api/table'
import { parseTime } from '@/utils'
import { getSeason } from '@/utils/times'
import { pagination } from '@/utils/array'

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
      isToday: true,
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
      if (this.isToday) {
        return this.$moment(this.today).year() + '年' + getSeason(this.today) + '进、销、存总况'
      } else {
        return this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate) + '进、销、存总况'
      }
    }
  },
  methods: {
    getAnalysis(data) {
      this.loading = true
      this.table.tableData = []
      this.date = '查询时间：' + data.date
      getInSaleStorage(data).then(response => {
        this.table.currentPage = 1
        this.table.pageSize = 10
        this.$store.dispatch('table/setInSaleStorage', response.data.items)
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
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.inSaleStorage)
    },
    // 页数改变
    handleCurrentChange(val) {
      this.table.currentPage = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.inSaleStorage)
    },
    // 导出
    handleDownload(str) {
      if (this.table.tableData.length === 0) {
        return
      }
      this.loading = true
      import('@/vendor/Export2Excel').then(excel => {
        // 设置Excel的表格第一行的标题
        const tHeader = ['区域', '经销商', '发货量', '余货量', '批发数量',
          '零售数量', '整体单价', '整体售罄率', '毛利率', '仓库',
          '总库存', '铺店数', '单店存']
        // 设置对应表头属性
        const filterVal = ['area', 'customer', 'outGoodsCount', 'surplusGoodsCount', 'wholesaleCount',
          'retailCount', 'unitPrice', 'wholeSaleRate', 'grossMarginRate', 'storage',
          'allStorage', 'storeNum', 'storeStorage']
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
