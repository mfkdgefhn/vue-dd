<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2021-06-03 17:12:38
 -->
<template>
  <div class="retail-analysis">
    <!-- 搜索 -->
    <el-card :body-style="{ padding: '10px 10px 0px 10px' }" shadow="hover" class="crad">
      <search :search-column="searchColumn" :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <!-- 展示内容 -->
    <vxe-grid
      ref="vxeGrid"
      class="vxe-grid"
      :height="height"
      align="center"
      resizable
      border
      show-overflow
      show-footer
      highlight-hover-row
      :tooltip-config="{enabled: true, contentMethod: showTooltipMethod}"
      :export-config="{}"
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :toolbar-config="toolbarConfig"
      :pager-config="pagerConfig"
      :sort-config="sortConfig"
      :footer-method="footerMethod"
      @cell-click="cellClick"
      @form-submit="findList"
      @custom="clickCustom"
    >

      <template v-slot:setmealProportion="{ row }">
        <span>{{ row.setmealProportion }}%</span>
      </template>
      <template v-slot:vousJointReat="{ row }">
        <span>{{ row.vousJointReat }}%</span>
      </template>
      <template v-slot:vousRepurchasReat="{ row }">
        <span>{{ row.vousRepurchasReat }}%</span>
      </template>
      <template v-slot:vousRepurchasProportion="{ row }">
        <span>{{ row.vousRepurchasProportion }}%</span>
      </template>
      <template v-slot:notVipAmtActualProportion="{ row }">
        <span>{{ row.notVipAmtActualProportion }}%</span>
      </template>
    </vxe-grid>

    <!-- <vxe-grid-tool v-if="value" :data="data" :customer-id="customerId" @hideWindows="hideWindows" /> -->
  </div>
</template>

<script>

import { transNumber } from '@/utils/array'
import Search from '@/components/public/searchErp'
import { getKfnrkbb } from '@/api/gmqApi'
// import vxeGridTool from './vxe-grid-tool'

export default {
  name: 'ErpProject',
  components: { Search
  // , vxeGridTool
  },
  data() {
    return {
      searchColumn: [{ columnName: '时间', type: 'date',
        columnValue: [
          { columnName: '开始时间', type: 'date', columnValue: 'beginDate' },
          { columnName: '结束时间', type: 'date', columnValue: 'endDate' }
        ] },
      { columnName: '生产线组', type: 'input', columnValue: 'billsaver' },
      { columnName: '品牌', type: 'input', columnValue: 'brand' },
      { columnName: '工厂型号', type: 'input', columnValue: 'inventoryId' }
      ],
      customerId: '',
      value: false,
      height: 700,
      loading: false,
      columns: [
        { field: 'date', title: '日期', width: '100px', sortable: true },
        { field: 'billsaver', title: '生产线组', width: '100px', sortable: true },
        { field: 'brand', title: '品牌', sortable: true },
        { field: 'inventoryId', title: '工厂型号', width: '150px', sortable: true },
        { field: 'invecnpo', title: '客户型号', width: '100px', sortable: true },
        { field: 'colorName', title: '颜色', width: '100px', sortable: true },
        { field: 'size2', title: '34', sortable: true },
        { field: 'size3', title: '35', sortable: true },
        { field: 'size4', title: '36', sortable: true },
        { field: 'size5', title: '37', sortable: true },
        { field: 'size6', title: '38', sortable: true },
        { field: 'size7', title: '39', sortable: true },
        { field: 'size8', title: '40', sortable: true },
        { field: 'qty', title: '合计', sortable: true }
      ],
      tableData: [],
      data: {},
      columnData: {
        group0: '1',
        group1: '1',
        group2: '1',
        group3: '1',
        group4: '1',
        group5: '1'
      },
      // 排序配置
      sortConfig: {
        trigger: 'cell'
      },
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
  },
  methods: {
    clickCustom(type) {
      this.columnData = {}
      if (type.type === 'confirm') {
        const columns = this.$refs.vxeGrid.getColumns()
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].property === 'date') {
            this.columnData.group0 = columns[i].property
          } else if (columns[i].property === 'colorName') {
            this.columnData.group1 = columns[i].property
          } else if (columns[i].property === 'brand') {
            this.columnData.group2 = columns[i].property
          } else if (columns[i].property === 'inventoryId') {
            this.columnData.group3 = columns[i].property
          } else if (columns[i].property === 'invecnpo') {
            this.columnData.group4 = columns[i].property
          } else if (columns[i].property === 'billsaver') {
            this.columnData.group5 = columns[i].property
          }
        }
        if (Object.keys(this.columnData).length > 0) {
          this.getAnalysis(this.data)
        } else {
          this.$message({ message: '没有分组字段，请重新选择', type: 'warning' })
          return
        }
      }
    },
    onClick() {
      this.value = !this.value
    },
    init() {
    },
    // 再次查询一次
    findList() {
      console.log(123456)
    },
    getAnalysis(data) {
      this.data = Object.assign(data)
      const params = Object.assign({}, this.columnData, this.data)
      this.tableData = []
      this.loading = true
      // 件数
      getKfnrkbb(params).then(response => {
        debugger
        const data = transNumber(response, 'qty', 'size2', 'size3', 'size4', 'size5', 'size6', 'size7', 'size8')
        this.tableData = data
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
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          switch (column.property) {
            case 'size2':
              return `${parseInt(this.meanNum(data, 'size2'))}`
            case 'size3':
              return `${parseInt(this.meanNum(data, 'size3'))}`
            case 'size4':
              return `${parseInt(this.meanNum(data, 'size4'))}`
            case 'size5':
              return `${parseInt(this.meanNum(data, 'size5'))}`
            case 'size6':
              return `${parseInt(this.meanNum(data, 'size6'))}`
            case 'size7':
              return `${parseInt(this.meanNum(data, 'size7'))}`
            case 'size8':
              return `${parseInt(this.meanNum(data, 'size8'))}`
            case 'qty':
              return `${parseInt(this.meanNum(data, 'qty'))}`
          }
          return '-'
        })
      ]
    },
    meanNum(list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
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

<style scoped>
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
