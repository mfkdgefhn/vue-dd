<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2020-12-18 11:36:58
 -->
<template>
  <div class="retail-analysis">
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
      :pager-config="pagerConfig"
      @cell-click="cellClick"
      @form-submit="findList"
    />

    <vxe-grid-tool v-if="value" :data="data" :customer-id="customerId" @hideWindows="hideWindows" />
  </div>
</template>

<script>

import Search from '@/components/public/search'
import { getSetmeal } from '@/api/gmqApi'
import vxeGridTool from './vxe-grid-tool'

export default {
  name: 'RetailAnalysis',
  components: { Search, vxeGridTool },
  data() {
    return {
      customerId: '',
      value: false,
      height: 700,
      loading: false,
      columns: [
        { field: 'customer', title: '区域' },
        { field: 'salesSum', visible: false, title: '销量' },
        { field: 'totAmtActual', visible: false, title: '销售总额' },
        { field: 'setmealSum', visible: false, title: '套餐单量' },
        { field: 'setmealAmtActual', title: '套餐总额' },
        { field: 'setmealProportion', title: '套餐占比' },
        { field: 'setmealStoreSum', title: '套餐关联店数' },
        { field: 'vousSum', visible: false, title: '卡券数量' },
        { field: 'vousJoint', visible: false, title: '套餐连带量' },
        { field: 'vousJointReat', title: '套餐连带率' },
        { field: 'vousRepurchas', visible: false, title: '复购量' },
        { field: 'vousRepurchasReat', title: '复购率' },
        { field: 'vousRepurchasProportion', visible: false, title: '复购占比' },
        { field: 'notVipSum', visible: false, title: '非会员单量' },
        { field: 'notVipAmtActual', visible: false, title: '非会员销售总额' },
        { field: 'notVipAmtActualProportion', title: '非会员销售占比' }
      ],
      tableData: [],
      data: {},
      pagerConfig: {
        align: 'center',
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
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
  watch: {
  },
  created() {
  },
  mounted() {
    // this.init()
  },
  methods: {
    onClick() {
      this.value = !this.value
    },
    init() {
    },
    findList() {
      console.log(123456)
    },
    getAnalysis(data) {
      this.data = Object.assign({}, data)
      debugger
      this.tableData = []
      this.loading = true
      // 件数
      getSetmeal(data).then(response => {
        this.tableData = response
        this.loading = false
      })
    },
    showTooltipMethod({ type, column, row, items, _columnIndex }) {
      const { property } = column
      if (property === 'vousJoint' && type === 'body') {
        return row[property] ? '当日开卡会员第二次购物券量：' + row[property] : ''
      } else if (property === 'vousJointReat' && type === 'body') {
        return row[property] ? '套餐连带量/套餐量：' + row[property] : ''
      }
      return null
    },
    getTitleName(type, property) {
      switch (type) {
        case 'header':

          break
        case 'body':

          break
        default:
          break
      }
      return property
    },
    // 工具栏按钮事件
    toolbarButtonClickEvent(method) {
      console.log(method)
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
    }
  }
}
</script>

<style >
.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.el-row-class {
  margin-left: 10px;
  margin-right: 10px;
}
.el-col-class {
  margin-top: 10px;
}
.vxe-grid{
  margin-top:10px;
}
</style>
