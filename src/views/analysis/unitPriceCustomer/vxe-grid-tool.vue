<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-12-17 09:06:41
 * @LastEditors: anan
 * @LastEditTime: 2021-01-20 11:00:50
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
          height="590"
          resizable
          show-overflow
          auto-resize
          highlight-hover-row
          :export-config="{}"
          :loading="loading"
          :data="tableData"
          :sort-config="sortConfig"
          :columns="columns"
          :toolbar-config="toolbarConfig"
        >
          <template v-slot:toolbar_buttons>
            <vxe-form>
              <vxe-form-item>
                <template v-slot>
                  <vxe-input v-model="storeName" placeholder="店仓" />
                </template>
              </vxe-form-item>
              <vxe-form-item>
                <template v-slot>
                  <vxe-input v-model="productName" placeholder="款号N" />
                </template>
              </vxe-form-item>
              <vxe-form-item>
                <template v-slot>
                  <vxe-button status="primary" @click="searchStore">查询</vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>
        </vxe-grid>

        <!-- :pager-config="pagerConfig" -->
        <vxe-pager
          align="center"
          size="mini"
          :current-page.sync="page.currentPage"
          :page-size.sync="page.pageSize"
          :total="page.totalResult"
          @page-change="pagerchange"
        />

      </template>
    </vxe-modal>
  </div>
</template>

<script>

import { transNumber, pagination } from '@/utils/array'
import { getUnitPriceCustomer } from '@/api/gmqApi'

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
      storeName: '',
      productName: '',
      formData: {
        store: ''
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      value: true,
      loading: false,
      tableData: [],
      width: 1000,
      sortConfig: {
        trigger: 'cell'
      },
      pagerConfig: {
        align: 'center',
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
      },
      columns: [
        { field: 'customerName', title: '区域' },
        { field: 'storeName', visible: true, title: '店仓', sortable: true },
        { field: 'season', visible: true, title: '季节', sortable: true },
        { field: 'productName', visible: true, title: '款号N', sortable: true },
        { field: 'totAmtActual', title: '总额', sortable: true },
        { field: 'qty', title: '数量', sortable: true },
        { field: 'kdj', title: '数量', sortable: true }
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
  computed: {
    unitPriceStore() {
      return this.$store.getters.unitPriceStore
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
    findList() {
      console.log(1)
    },
    hideWindows() {
      this.$emit('hideWindows')
    },
    getAnalysis(data) {
      debugger
      this.tableData = []
      this.loading = true
      // 件数
      getUnitPriceCustomer(data).then(response => {
        const data = transNumber(response, ['qty', 'totAmtActual'])
        this.page.totalResult = data.length
        this.tableData = data
        // 存入到状态管理器中
        this.$store.commit('unitPriceCustomer/SET_UNITPRICESTORE', data)
        this.tableData = pagination(this.page.currentPage, this.page.pageSize, data)
        this.loading = false
      })
    },
    // 店仓搜索
    searchStore() {
      if (this.productName.trim() === '' && this.productName.trim() === '') {
        const data = Object.assign({}, this.data)
        this.getAnalysis(data)
      } else {
        if (this.storeName.trim() !== '') {
          const storeLists = this.unitPriceStore
          const storeList = []
          storeLists.forEach(element => {
            if (element.storeName.includes(this.storeName.trim())) {
              storeList.push(element)
            }
          })
          this.tableData = storeList
        } else {
          this.tableData = this.unitPriceStore
        }
        if (this.productName.trim() !== '') {
          const storeLists = this.tableData
          const storeList = []
          storeLists.forEach(element => {
            if (element.productName.includes(this.productName.trim())) {
              storeList.push(element)
            }
          })
          this.tableData = storeList
        }
      }
    },
    pagerchange() {
      this.tableData = pagination(this.page.currentPage, this.page.pageSize, this.unitPriceStore)
    }
  }
}
</script>
