<!--
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-09-17 15:46:54
 * @LastEditors: anan
 * @LastEditTime: 2020-09-20 10:26:37
-->
<template>
  <div>
    <vxe-grid
      border
      resizable
      height="730"
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
      @page-change="handlePageChange"
      @form-submit="findList"
    />
  </div>
</template>

<script>
import { pagination } from '@/utils/array'
// import {
//   getXuliangzhan,
//   getXuliangzhanDelete, getXuliangzhanSave
// } from '@/api/gic'

export default {
  data() {
    return {
      loading: false,
      sortConfig: {
        trigger: 'cell'
      },
      // 表单
      tableForm: {
        titleWidth: 100,
        titleAlign: 'right',
        data: {
          area: null,
          cardType: null,
          erpDemoCode: null,
          status: null,
          clerkName: null,
          coupPutTime: null,
          receivePhoneNumber: null
        },
        items: [
          {
            field: 'area', title: '区域', span: 8,
            itemRender: {
              name: '$select',
              options: [
                { label: '', spell: '', value: null, value2: null, val: '' },
                { label: '郑州', spell: 'zz', value: '1', value2: 1, val: 'z1' },
                { label: '南京', spell: 'nj', value: '2', value2: 2, val: 'z2' },
                { label: '南宁', spell: 'nn', value: '3', value2: 3, val: 'z3' }
              ]
            }
          },
          {
            field: 'cardType', title: '券类型', span: 8,
            itemRender: {
              name: '$select',
              options: [
                { label: '', spell: '', value: null, value2: null, val: '' },
                { label: '抵金券', spell: 'djj', value: '抵金券', value2: 1, val: 'z1' },
                { label: '折扣券', spell: 'zkj', value: '折扣券', value2: 2, val: 'z2' }
              ]
            }
          },
          {
            field: 'erpDemoCode', title: 'portal券编号', span: 8,
            itemRender: {
              name: '$input', props: { placeholder: '请输入portal券编号' }
            }
          },
          {
            field: 'status', title: '状态', span: 8, folding: true,
            itemRender: {
              name: '$select',
              options: [
                { label: '', spell: '', value: null, value2: null, val: '' },
                { label: '删除', spell: 'sc', value: '删除', value2: 0, val: '0' },
                { label: '正常', spell: 'zc', value: '正常', value2: 1, val: '1' },
                { label: '失效', spell: 'sx', value: '失效', value2: 2, val: '2' },
                { label: '已发放', spell: 'yff', value: '已发放', value2: 3, val: '3' },
                { label: '已领取', spell: 'ylq', value: '已领取', value2: 4, val: '4' },
                { label: '已使用', spell: 'ysy', value: '已使用', value2: 5, val: '5' },
                { label: '已到期', spell: 'ydq', value: '已到期', value2: 6, val: '6' },
                { label: '已销毁', spell: 'yxh', value: '已销毁', value2: 7, val: '7' }
              ]
            }
          },
          {
            field: 'clerkName', title: '员工', span: 8, folding: true,
            itemRender: { name: '$input' }
          },
          {
            field: 'coupPutTime', title: '推送时间', span: 8, folding: true,
            itemRender: {
              name: '$input',
              props: { type: 'number', min: 1, max: 120, placeholder: '请输入推送时间' }
            }
          },
          {
            field: 'receivePhoneNumber', title: '领取人手机号', span: 8, folding: true,
            itemRender: {
              name: '$input'
            }
          },
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
        { type: 'seq', title: '序号' },
        {
          field: 'area', title: '区域', sortable: true, editRender: { name: 'input' }
        },
        {
          field: 'cardType', sortable: true, title: '券类型', editRender: { name: 'input' }
        },
        {
          field: 'cardName', sortable: true, title: '券名称', editRender: { name: 'input' }
        },
        {
          field: 'cardDenomination', sortable: true, title: '券金额/折扣', editRender: { name: 'input' }
        },
        {
          field: 'cardCode', sortable: true, title: '购物券编号', editRender: { name: '$input' }
        },
        {
          field: 'status', sortable: true, title: '状态',
          editRender: {
            name: 'input',
            props: { type: 'number', min: 1, max: 120 }
          }
        },
        {
          field: 'receivePhoneNumber', sortable: true, title: '领取人手机号',
          editRender: { name: 'input' }
        },
        {
          field: 'relationType', sortable: true, title: '消费渠道',
          editRender: {
            name: '$input',
            props: { type: 'float', digits: 2 }
          }
        },
        {
          field: 'saleAmount', title: '消费金额',
          editRender: { name: '$input' }
        },
        {
          field: 'receiveTime', sortable: true, title: '核销时间',
          editRender: { name: '$input' }
        },
        {
          field: 'usedTime', sortable: true, title: '使用时间', formatter: this.formatDate,
          editRender: { name: '$input' }
        },
        {
          field: 'clerkName', sortable: true, title: '销售员',
          editRender: { name: '$input' }
        },
        {
          field: 'coupPutTime', sortable: true, title: '推送时间', formatter: this.formatDate,
          editRender: { name: '$input' }
        },
        {
          field: 'erpDemoCode', sortable: true, title: 'portal编号',
          editRender: { name: '$input' }
        }
      ],
      // 数据
      tableData: []
    }
  },
  created() {
    this.findList()
  },
  methods: {
    findList() {
      // 模拟后台接口
      this.loading = true
      const queryParams = Object.assign({}, this.tableForm.data)
      this.$store.dispatch('gic/getGicCoupon', queryParams).then(() => {
        this.tablePage.total = this.$store.getters.gicCoupon.length
        if (this.tablePage.total <= 500) {
          this.tablePage.pageSizes = [10, 20, 50, 100, 200, 500]
        } else if (this.tablePage.total > 500 && this.tablePage.total <= 1000) {
          this.tablePage.pageSizes = [10, 20, 50, 100, 200, 500, 1000]
        } else if (this.tablePage.total <= 2000) {
          this.tablePage.pageSizes = [10, 20, 50, 100, 200, 500, 1000, 2000]
        } else {
          this.tablePage.pageSizes = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000]
        }
        this.tableData = pagination(this.tablePage.currentPage, this.tablePage.pageSize, this.$store.getters.gicCoupon)
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
      this.findList()
    }
  }
}
</script>

<style>
</style>
