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
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane v-for="item of table" :key="item.index" :label="item.title">
          <el-table
            id="pdfDom"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="item.tableData"
            :row-style="rowStyle"
            :header-cell-style="{padding: '0px 0px'}"
            style="width: 100%"
          >
            <el-table-column :label="item.title" align="center">
              <el-table-column prop="area" label="区域" align="center" width="80" />
              <el-table-column prop="customer" label="所属经销商" align="center" width="120" />
              <el-table-column :label="item.year + item.seasonCh" align="center">
                <el-table-column prop="newSalesShare" label="销售占比" align="center" />
                <el-table-column prop="newAvgPrice1" label="均单价" align="center" />
                <el-table-column prop="newInventoryRatio" label="库存占比" align="center" />
                <el-table-column prop="newStoreVolume" label="单店铺货量" align="center" />
              </el-table-column>
            </el-table-column>
            <el-table-column :label="date" align="center">
              <el-table-column :label="(item.year-1)+item.seasonCh" align="center">
                <el-table-column prop="oldSalesShare" label="销售占比" align="center" />
                <el-table-column prop="oldAvgPrice1" label="单价" align="center" />
                <el-table-column prop="oldInventoryRatio" label="库存占比" align="center" />
                <el-table-column prop="oldStoreVolume" label="单店铺货量" align="center" />
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
      table: [],
      tabIndex: 0
    }
  },
  methods: {
    tabClick(val) {
      this.tabIndex = val.index
    },
    async getAnalysis(data) {
      // 先清空数量再进行查询
      this.table = []
      this.loading = true
      this.date = '查询时间：' + data.billdate
      // 月份
      const mon = this.$moment(data.billdate).month() + 1
      const [one, two, three] = mon === 3 || mon === 6 || mon === 9 || mon === 12 ? ['+3', '0', '-3'] : ['0', '-3', '-6']

      // 当季
      this.table.push({
        billdate: data.billdate,
        year: this.$moment(data.billdate).add(one, 'M').year(),
        seasonCh: getSeason(this.$moment(data.billdate).add(one, 'M')).ch,
        season: getSeason(this.$moment(data.billdate).add(one, 'M')).zh,
        title: '' + this.$moment(data.billdate).add(one, 'M').year() + getSeason(this.$moment(data.billdate).add(one, 'M')).ch + '数量占比'
      })
      await getRetailShare(this.table[0]).then(response => {
        this.$store.dispatch('table/setRetailShare', response)
        this.table[0].tableData = response
      })
      // 上季
      this.table.push({
        billdate: data.billdate,
        year: this.$moment(data.billdate).add(two, 'M').year(),
        seasonCh: getSeason(this.$moment(data.billdate).add(two, 'M')).ch,
        season: getSeason(this.$moment(data.billdate).add(two, 'M')).zh,
        title: '' + this.$moment(data.billdate).add(two, 'M').year() + getSeason(this.$moment(data.billdate).add(two, 'M')).ch + '数量占比'
      })
      await getRetailShare(this.table[1]).then(response => {
        this.$store.dispatch('table/setLastRetailShare', response)
        this.table[1].tableData = response
      })

      // 上上季
      this.table.push({
        billdate: data.billdate,
        year: this.$moment(data.billdate).add(three, 'M').year(),
        seasonCh: getSeason(this.$moment(data.billdate).add(three, 'M')).ch,
        season: getSeason(this.$moment(data.billdate).add(three, 'M')).zh,
        title: '' + this.$moment(data.billdate).add(three, 'M').year() + getSeason(this.$moment(data.billdate).add(three, 'M')).ch + '数量占比'
      })
      await getRetailShare(this.table[2]).then(response => {
        this.$store.dispatch('table/setLastMaxRetailShare', response)
        this.table[2].tableData = response
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
      this.getPdf(this.table[this.tabIndex].title)
    },
    // 导出
    handleDownload(str) {
      this.loading = true
      if (this.table[this.tabIndex].tableData.length === 0) {
        this.loading = false
        return
      }
      str = (str === undefined) ? '' : str
      import('@/vendor/Export2Excel').then(excel => {
        // 设置Excel的表格第一行的标题
        const tHeader = ['区域', '所属经销商', '销售占比', '均单价', '库存占比',
          '单店铺货量', '销售占比', '单价', '库存占比', '单店铺货量']
        // 设置对应表头属性
        const filterVal = ['area', 'customer', 'newSalesShare', 'newAvgPrice', 'newInventoryRatio',
          'newStoreVolume', 'oldSalesShare', 'oldAvgPrice', 'oldInventoryRatio', 'oldStoreVolume']
        const data = this.formatJson(filterVal, str)

        if (str === 'this') {
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.table[this.tabIndex].title
          })
        } else if (str === 'all') {
          var excelDatas = []
          this.table.forEach(element => {
            excelDatas.push({
              tHeader: tHeader,
              filterVal: filterVal,
              tableDatas: element.tableData,
              sheetName: element.title
            })
          })
          this.json2excel(excelDatas, '零售占比', true, 'xlsx')
        }
        this.loading = false
      })
    },
    formatJson(filterVal, str) {
      var data = []
      if (str === 'all') {
        data = this.$store.getters.retailShare
      } else if (str === 'this') {
        data = this.table[this.tabIndex].tableData
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
    /**
     * Parse the json to excel
     *  tableJson 导出数据 ; filenames导出表的名字; autowidth表格宽度自动 true or false; bookTypes xlsx & csv & txt
     * @param {(Object)} tableJson
     * @param {string} filenames
     * @param {boolean} autowidth
     * @param {string} bookTypes
     */
    json2excel(tableJson, filenames, autowidth, bookTypes) {
      import('@/vendor/Export2Excel').then(excel => {
        var tHeader = []
        var dataArr = []
        var sheetnames = []
        for (var i in tableJson) {
          tHeader.push(tableJson[i].tHeader)
          dataArr.push(this.formatJson1(tableJson[i].filterVal, tableJson[i].tableDatas))
          sheetnames.push(tableJson[i].sheetName)
        }
        excel.export_json_to_excel_sheetname({
          header: tHeader,
          data: dataArr,
          sheetname: sheetnames,
          filename: filenames,
          autoWidth: autowidth,
          bookType: bookTypes
        })
      })
    },
    // 数据过滤，时间过滤
    formatJson1(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
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

<style>
.el-tabs--border-card > .el-tabs__content {
  padding: 0px;
}
</style>
