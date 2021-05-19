<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-09-17 15:46:54
 * @LastEditors: anan
 * @LastEditTime: 2020-09-20 15:28:42
-->
<template>
  <div>
    <vxe-grid
      border
      resizable
      height="800"
      :loading="loading"
      keep-source
      :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
      :pager-config="tablePage"
      :columns="tableColumn"
      :data="tableData"
      :form-config="tableForm"
      show-overflow
      :sort-config="sortConfig"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      show-footer
      :footer-method="footerMethod"
      @cell-click="cellClickEvent"
      @page-change="handlePageChange"
      @form-submit="findList"
    />
  </div>
</template>

<script>
import { pagination } from '@/utils/array'
import XEUtils from 'xe-utils'
import { deepCompare } from '@/utils/obj'

export default {
  data() {
    return {
      // 加载动画
      loading: false,
      // 排序配置
      sortConfig: {
        trigger: 'cell'
      },
      // 表单
      tableForm: {
        titleWidth: 100,
        titleAlign: 'right',
        data: {
          area: null,
          receiveOpenStoreName: null,
          costStoreName: null,
          erpDemoCode: null,
          clerkName: null,
          receivePhoneNumber: null,
          usePhoneNumber: null
        },
        items: [
          {
            field: 'area', title: '区域', span: 8,
            itemRender: {
              name: '$select',
              options: [
                { label: '', spell: '', value: null, value2: null, val: '' },
                { label: '郑州', spell: 'zz', value: '郑州', value2: 1, val: 'z1' },
                { label: '南京', spell: 'nj', value: '南京', value2: 2, val: 'z2' },
                { label: '南宁', spell: 'nn', value: '南宁', value2: 3, val: 'z3' }
              ],
              props: { placeholder: '请输入选择区域' }
            }
          },
          {
            field: 'receiveOpenStoreName', title: '领取人店铺', span: 8,
            itemRender: {
              name: '$input',
              props: { placeholder: '请输入店铺名称' }
            }
          },
          {
            field: 'costStoreName', title: '消费店铺', span: 8,
            itemRender: {
              name: '$input',
              props: { placeholder: '请输入店铺名称' }
            }
          },
          {
            field: 'erpDemoCode', title: 'portal券编号', span: 8, folding: true,
            itemRender: {
              name: '$input',
              props: { placeholder: '请输入portal券编号' }
            }
          },
          {
            field: 'clerkName', title: '营业员', span: 8, folding: true,
            itemRender: {
              name: '$input',
              props: { placeholder: '请输入营业员' }
            }
          },
          {
            field: 'receivePhoneNumber', title: '领取人手机号', span: 8, folding: true,
            itemRender: {
              name: '$input',
              props: { placeholder: '请输入手机号' }
            }
          },
          {
            field: 'usePhoneNumber', title: '使用人手机号', span: 8, folding: true,
            itemRender: {
              name: '$input',
              props: { placeholder: '请输入手机号' }
            }
          },
          // {
          //   field: 'cardType', title: '券类型', span: 8,
          //   itemRender: {
          //     name: '$select',
          //     options: [
          //       { label: '', spell: '', value: null, value2: null, val: '' },
          //       { label: '抵金券', spell: 'djj', value: '抵金券', value2: 1, val: 'z1' },
          //       { label: '折扣券', spell: 'zkj', value: '折扣券', value2: 2, val: 'z2' }
          //     ]
          //   }
          // },
          // {
          //   field: 'status', title: '状态', span: 8, folding: true,
          //   itemRender: {
          //     name: '$select',
          //     options: [
          //       { label: '', spell: '', value: null, value2: null, val: '' },
          //       { label: '删除', spell: 'sc', value: '删除', value2: 0, val: '0' },
          //       { label: '正常', spell: 'zc', value: '正常', value2: 1, val: '1' },
          //       { label: '失效', spell: 'sx', value: '失效', value2: 2, val: '2' },
          //       { label: '已发放', spell: 'yff', value: '已发放', value2: 3, val: '3' },
          //       { label: '已领取', spell: 'ylq', value: '已领取', value2: 4, val: '4' },
          //       { label: '已使用', spell: 'ysy', value: '已使用', value2: 5, val: '5' },
          //       { label: '已到期', spell: 'ydq', value: '已到期', value2: 6, val: '6' },
          //       { label: '已销毁', spell: 'yxh', value: '已销毁', value2: 7, val: '7' }
          //     ]
          //   }
          // },
          // 按钮行
          {
            span: 24, align: 'center', collapseNode: true,
            itemRender: {
              name: '$buttons', children: [
                {
                  props: { type: 'submit', content: '搜索', status: 'primary' }
                },
                {
                  props: { type: 'reset', content: '重置' }
                }
              ]
            }
          }
        ]
      },
      // 表头工具
      tableToolbar: {
        buttons: [
          { code: 'insert_actived', name: '新增', status: 'perfect', icon: 'fa vxe-icon--plus' },
          // { code: 'mark_cancel', name: 'app.body.button.markCancel', status: 'perfect', icon: 'fa fa-trash-o' },
          { code: 'save', name: '保存', status: 'perfect', icon: 'fa vxe-icon--check' }
        ],
        perfect: true,
        // refresh: {
        //   icon: 'fa vxe-icon--refresh',
        //   iconLoading: 'fa vxe-icon--refresh roll'
        // },
        import: {
          icon: 'fa vxe-icon--download'
        },
        export: {
          icon: 'fa vxe-icon--upload'
        },
        print: {
          icon: 'fa vxe-icon--print'
        },
        zoom: {
          iconIn: 'fa vxe-icon--zoomin',
          iconOut: 'fa vxe-icon--zoomin'
        },
        custom: {
          icon: 'fa vxe-icon--menu'
          // icon: this.$VXETable.icon.TOOLBAR_TOOLS_ZOOM_OUT
        }
      },
      // 分页工具
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: 'center',
        pageSizes: [10, 20, 50, 100, 200, 500],
        layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
        perfect: true
      },
      // 表内容列信息
      tableColumn: [
        { type: 'seq', align: 'center', title: '序号' },
        { field: 'area', align: 'center', title: '区域', sortable: true },
        { field: 'receiveCardNum', align: 'center', sortable: true, title: '会员卡号', width: '130' },
        { field: 'receiveOpenStoreName', align: 'center', sortable: true, title: '领取人店铺', width: '140' },
        { field: 'costStoreName', align: 'center', sortable: true, title: '消费店铺', width: '140' },
        { field: 'clerkName', align: 'center', sortable: true, title: '销售员', width: '90' },
        { field: 'cardCount', align: 'center', title: '卡券数' },
        { field: 'receiveCount', align: 'center', title: '已领取数' },
        { field: 'useCount', align: 'center', title: '已使用数' },
        { field: 'limitCount', align: 'center', title: '已失效数' },
        { field: 'discountCount', align: 'center', title: '未领用数' },
        { field: 'noUseAmt', align: 'center', title: '未领用卡券金额', width: '100' },
        { field: 'amt5', align: 'center', title: '5元券' },
        { field: 'amt10', align: 'center', title: '10券' },
        { field: 'amt20', align: 'center', title: '20券' },
        { field: 'amt30', align: 'center', title: '30券' },
        { field: 'amt40', align: 'center', title: '40券' },
        { field: 'amt50', align: 'center', title: '50券' },
        { field: 'amt80', align: 'center', title: '80券' },
        { field: 'amt100', align: 'center', title: '100券' }
      ],
      // 数据
      tableData: []
    }
  },
  created() {
    // this.findList()
  },
  methods: {
    findList(param) {
      const queryParams = Object.assign({}, this.tableForm.data)
      if (queryParams.receiveOpenStoreName === null && queryParams.costStoreName === null) {
        queryParams.defaultStore = 1
      }
      if (param !== '分页') {
        if (deepCompare(this.$store.getters.gicSelectGicAnalysisParams, queryParams)) {
          this.$message.error({ message: '查询条件相同，请更改条件后再次查询', duration: 5000 })
          return
        }
        if (queryParams.receiveOpenStoreName && queryParams.costStoreName) {
          this.$message.error({ message: '领取人门店与消费门店不得同时查询', duration: 5000 })
          return
        }
      }
      this.tableData = []
      this.loading = true
      this.$store.dispatch('gic/getGicAnalysis', queryParams).then(() => {
        this.tablePage.total = this.$store.getters.gicAnalysis.length
        this.tableColumnFilter(this.$store.getters.gicAnalysis[0])
        if (this.tablePage.total <= 500) {
          this.tablePage.pageSizes = [10, 20, 50, 100, 200, 500]
        } else if (this.tablePage.total > 500 && this.tablePage.total <= 1000) {
          this.tablePage.pageSizes = [10, 20, 50, 100, 200, 500, 1000]
        } else if (this.tablePage.total <= 2000) {
          this.tablePage.pageSizes = [10, 20, 50, 100, 200, 500, 1000, 2000]
        } else {
          this.tablePage.pageSizes = [10, 50, 100, 200, 500, 1000, 2000, this.$store.getters.gicAnalysis.length]
        }
        this.tableData = pagination(this.tablePage.currentPage, this.tablePage.pageSize, this.$store.getters.gicAnalysis)
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    searchEvent() {
      this.tablePage.currentPage = 1
      this.findList()
    },
    // 分页设置
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.findList('分页')
    },
    cellClickEvent({ row }) {
      // console.log(row)
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['cardCount', 'receiveCount', 'useCount', 'limitCount', 'discountCount', 'noUseAmt',
            'amt5', 'amt10', 'amt20', 'amt30', 'amt40', 'amt50', 'amt80', 'amt100'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return '-'
        })
      ]
    },
    tableColumnFilter(data) {
      if (!data.receiveOpenStoreName) {
        for (let index = 0; index < this.tableColumn.length; index++) {
          if (this.tableColumn[index].field === 'receiveOpenStoreName') {
            this.tableColumn.splice(index, 1)
            break
          }
        }
      } else {
        let determine = false
        for (let index = 0; index < this.tableColumn.length; index++) {
          if (this.tableColumn[index].field === 'receiveOpenStoreName') {
            determine = true
            break
          }
        }
        if (!determine) {
          this.tableColumn.splice(2, 0, {
            field: 'receiveOpenStoreName', title: '领取人店铺', span: 8, width: '140',
            itemRender: {
              name: '$input', props: { placeholder: '请输入店铺名称' }
            }
          })
        }
      }
      if (!data.costStoreName) {
        for (let index = 0; index < this.tableColumn.length; index++) {
          if (this.tableColumn[index].field === 'costStoreName') {
            this.tableColumn.splice(index, 1)
            break
          }
        }
      } else {
        let determine = false
        for (let index = 0; index < this.tableColumn.length; index++) {
          if (this.tableColumn[index].field === 'costStoreName') {
            determine = true
            break
          }
        }
        if (!determine) {
          this.tableColumn.splice(2, 0,
            {
              field: 'costStoreName', title: '消费店铺', span: 8, width: '140',
              itemRender: {
                name: '$input', props: { placeholder: '请输入店铺名称' }
              }
            })
        }
      }
    }
  }
}
</script>

<style>
</style>
