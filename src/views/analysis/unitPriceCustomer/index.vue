<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2021-01-14 10:36:11
 * @LastEditors: anan
 * @LastEditTime: 2021-01-20 13:45:02
-->
<template>
  <div class="unit-price-customer">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <!-- 展示内容 -->
    <vxe-grid
      class="vxe-grid"
      :height="height"
      align="center"
      resizable
      border
      show-overflow
      highlight-hover-row
      :tooltip-config="{enabled: true, contentMethod: showTooltipMethod}"
      :export-config="{}"
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :toolbar-config="toolbarConfig"
      :sort-config="sortConfig"
      @cell-click="cellClick"
      @form-submit="findList"
    />
    <!-- :pager-config="pagerConfig" -->
    <vxe-pager
      align="center"
      size="mini"
      :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize"
      :total="page.totalResult"
      @page-change="pagerchange"
    />
    <vxe-grid-tool v-if="value" :data="data" :customer-id="customerId" @hideWindows="hideWindows" />

  </div>
</template>

<script>
import { transNumber, pagination } from '@/utils/array'
import Search from '@/components/public/searchUnitPriceCustomer'
import { getUnitPriceCustomer } from '@/api/gmqApi'
import vxeGridTool from './vxe-grid-tool'

export default {
  components: { Search, vxeGridTool },
  data() {
    return {
      tableData: [],
      height: 600,
      value: false,
      customerId: '',
      data: {},
      page: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      loading: false,
      columns: [
        { field: 'customerName', title: '区域' },
        // { field: 'storeName', visible: true, title: '店仓', sortable: true },
        { field: 'season', visible: true, title: '季节', sortable: true },
        { field: 'productName', visible: true, title: '款号N', sortable: true },
        { field: 'totAmtActual', title: '总额', sortable: true },
        { field: 'qty', title: '数量', sortable: true }
      ],
      pagerConfig: {
        align: 'center',
        totalResult: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
      },
      sortConfig: {
        trigger: 'cell'
      },
      toolbarConfig: {
        refresh: { query: this.findList },
        export: true,
        print: true,
        zoom: true,
        custom: true
      }
    }
  },
  methods: {
    showTooltipMethod({ type, column, row, items, _columnIndex }) {
      const { property } = column
      if (property === 'vousJoint' && type === 'body') {
        return row[property] ? '当日开卡会员第二次购物券量：' + row[property] : ''
      } else if (property === 'vousJointReat' && type === 'body') {
        return row[property] ? '套餐连带量/套餐量：' + row[property] : ''
      }
      return null
    },
    getAnalysis(data) {
      this.data = Object.assign({}, data)
      this.tableData = []
      this.loading = true
      // 件数
      getUnitPriceCustomer(data).then(response => {
        const data = transNumber(response, ['qty', 'totAmtActual'])
        this.page.totalResult = data.length
        data.length > 1000 ? this.page.pageSizes = [5, 10, 15, 20, 50, 100, 200, 500, 1000, data.length]
          : this.page.pageSizes = [5, 10, 15, 20, 50, 100, 200, 500, 1000]
        // 存入到状态管理器中
        this.$store.commit('unitPriceCustomer/SET_UNITPRICECUSTOMER', data)
        this.tableData = pagination(this.page.currentPage, this.page.pageSize, data)
        this.loading = false
      })
    },
    // 隐藏弹出窗口
    hideWindows() {
      this.value = false
    },
    // 点击单元格触发事件
    // cellClick({ row }) {
    cellClick({ row, $columnIndex }) {
      if ($columnIndex === 0) {
        this.data.customerId = row.customerId
        this.customerId = row.customerId
        this.value = true
      }
    },
    findList() {
      console.log(123456)
    },
    pagerchange() {
      const data = this.$store.getters.unitPriceCustomer
      this.tableData = pagination(this.page.currentPage, this.page.pageSize, data)
    }
  }
}
</script>
