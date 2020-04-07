<template>
  <div class="InSaleStorage">
    <!-- 表格 -->
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
          <el-table
            id="pdfDom"
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
          <el-table
            :data="table.countrySum"
            :show-header="false"
            :row-style="{background:'yellow'}"
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
      lastDate: this.$moment().add(-3, 'M').format('YYYYMMDD'),
      today: this.$moment().format('YYYYMMDD'),
      isThisYear: true,
      htmlTitle: 'pdf文件',
      table: {
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
      if (this.isThisYear) {
        return this.$moment(this.today).year() + '年' + getSeason(this.today) + '版面结构'
      } else {
        return this.$moment(this.lastDate).year() + '年' + getSeason(this.lastDate) + '版面结构'
      }
    }
  },
  created() {
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
    getAnalysis(data) {
      this.loading = true
      this.table.tableData = []
      getInSaleStorage(data).then(response => {
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
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.title
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
.menu-class {
  margin: 10px;
}
</style>
