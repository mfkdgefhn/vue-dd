<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-12-17 09:06:41
 * @LastEditors: anan
 * @LastEditTime: 2020-12-18 11:37:12
-->
<template>
  <div>
    <vxe-modal
      id="myModal6"
      v-model="value"
      height="700"
      min-width="460"
      min-height="320"
      resize
      remember
      storage
      :z-index="99999"
      :width="width"
      @hide="hideWindows"
    >
      <template v-slot:title>
        <span style="color: red;">套餐明细</span>
      </template>
      <template v-slot>

        <vxe-grid
          align="center"
          border
          height="600"
          resizable
          show-overflow
          auto-resize
          highlight-hover-row
          :loading="loading"
          :data="tableData"
          :pager-config="pagerConfig"
          :columns="columns"
          :toolbar-config="toolbarConfig"
        >
          <template v-slot:toolbar_buttons>
            <!-- <vxe-form :data="formData" @submit="searchEvent" @reset="searchEvent"> -->
            <vxe-form>
              <vxe-form-item field="name" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}" />
              <!-- <vxe-form-item :item-render="{ name: '$buttons', children: [{ props: { type: 'submit', content: 'app.body.label.search', status: 'primary' } }, { props: { type: 'reset', content: 'app.body.label.reset' } }] }" /> -->
            </vxe-form>
          </template>
        </vxe-grid>

        <!-- <vxe-grid
          border
          resizable
          show-overflow
          auto-resize
          height="auto"
          :pager-config="pagerConfig"
          :columns="columns"
          :toolbar-config="toolbarConfig"
        /> -->
      <!-- :proxy-config="tableProxy" -->
      </template>
    </vxe-modal>
  </div>
</template>

<script>

import { getSetmeal } from '@/api/gmqApi'

export default {
  props: {
    customerId: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        store: ''
      },
      value: true,
      loading: false,
      tableData: [],
      width: 1000,
      pagerConfig: {
        align: 'center',
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
      },
      columns: [
        { field: 'customer', title: '区域' },
        { field: 'store', title: '店仓' },
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
      toolbarConfig: {
        refresh: { query: this.findList },
        export: true,
        print: true,
        zoom: true,
        custom: true,
        slots: { buttons: 'toolbar_buttons' }
      }
    }
  },
  watch: {
    customerId: {
      handler(val) {
        const data = Object.assign({}, this.data)
        // this.width = window.innerWidth - 220 - 10
        this.getAnalysis(data)
      },
      immediate: true
    }
  },
  methods: {
    hideWindows() {
      this.$emit('hideWindows')
    },
    getAnalysis(data) {
      this.tableData = []
      this.loading = true
      // 件数
      getSetmeal(data).then(response => {
        this.tableData = response
        this.loading = false
      })
    }
  }
}
</script>
