<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2020-12-05 17:57:30
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
      @form-submit="findList"
    />

  </div>
</template>

<script>

import Search from '@/components/public/search'
import { getSetmeal } from '@/api/gmqApi'

export default {
  name: 'RetailAnalysis',
  components: {
    Search
  },
  data() {
    return {
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
        { field: 'vousJoint', visible: false, title: '连带量' },
        { field: 'vousJointReat', title: '连带率' },
        { field: 'vousRepurchas', visible: false, title: '复购量' },
        { field: 'vousRepurchasReat', title: '复购率' },
        { field: 'notVipSum', visible: false, title: '非会员单量' },
        { field: 'notVipAmtActual', visible: false, title: '非会员销售总额' },
        { field: 'notVipAmtActualProportion', title: '非会员销售占比' }
      ],
      tableData: [],
      // formConfig: {
      //   data: { beginDate: '', endDate: '', store: '', year: '', season: '' },
      //   titleWidth: 100,
      //   titleAlign: 'right',
      //   items: [
      //     { field: 'beginDate', title: '开始时间', span: 8,
      //       itemRender: { name: 'ElDatePicker', props: { placeholder: '请输入开始时间' }}
      //     },
      //     { field: 'endDate', title: '结束时间', span: 8,
      //       itemRender: { name: 'ElDatePicker', props: { placeholder: '请输入结束时间' }}
      //     },
      //     { field: 'store', title: '店仓', span: 8, itemRender: { name: 'ElCascader', props: { placeholder: '请输入店仓' }}},
      //     { field: 'year', title: '年份', span: 8, folding: true, itemRender: { name: 'ElInput', props: { placeholder: '请输入年份' }}},
      //     { field: 'season', title: '季节', span: 8, folding: true,
      //       itemRender: { name: 'ElSelect', props: { placeholder: '请输入季节' },
      //         options: [{ value: '37', label: '春季' }, { value: '38', label: '夏季' }, { value: '39', label: '秋季' }, { value: '40', label: '冬季' }] }
      //     },
      //     { span: 24, align: 'center', collapseNode: true,
      //       itemRender: { name: '$buttons',
      //         children: [{ props: { type: 'submit', content: '查询', status: 'primary' }},
      //           { props: { type: 'reset', content: '重置' }}]
      //       }
      //     }
      //   ]
      // },
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
    init() {
    },
    findList() {
      console.log(123456)
    },
    getAnalysis(data) {
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
        return row[property] ? '连带量/套餐量：' + row[property] : ''
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
