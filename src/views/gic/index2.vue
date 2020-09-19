<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions" />
  </div>
</template>

<script>
import { pagination } from '@/utils/array'
import {
  getXuliangzhanDelete, getXuliangzhanSave
} from '@/api/gic'

export default {

  data() {
    return {
      sexList: [],
      gridOptions: {
        id: 'full_edit_1',
        // 列配置
        columns: [
          { type: 'checkbox', title: 'ID' },
          {
            field: 'area', title: '区域', remoteSort: true, editRender: { name: 'input' }
          },
          {
            field: 'cardType', title: '券类型', remoteSort: true, editRender: { name: 'input' }
          },
          {
            field: 'cardName', title: '券名称', editRender: { name: 'input' }
          },
          {
            field: 'cardDenomination', title: '券金额/折扣', editRender: { name: 'input' }
          },
          {
            field: 'cardCode', title: '购物券编号', editRender: { name: '$select', options: [] }
          },
          {
            field: 'status', title: '状态', remoteSort: true,
            editRender: {
              name: 'input',
              props: { type: 'number', min: 1, max: 120 }
            }
          },
          {
            field: 'relationType', title: '消费渠道', formatter: this.formatAmount,
            editRender: {
              name: '$input',
              props: { type: 'float', digits: 2 }
            }
          },
          { field: 'saleAmount', title: '消费金额', remoteSort: true },
          { field: 'receiveTime', title: '核销时间', remoteSort: true },
          { field: 'usedTime', title: '使用时间', remoteSort: true, formatter: this.formatDate },
          { field: 'clerkName', title: '销售员', remoteSort: true },
          { field: 'coupPutTime', title: '推送时间', remoteSort: true, formatter: this.formatDate },
          { field: 'erpDemoCode', title: 'portal编号', remoteSort: true }

        ],
        // 表格默认高度
        height: 700,
        // 列宽调整大小
        resizable: true,
        // 边框
        border: true,
        // 是否圆角边框
        round: true,
        // 鼠标移到行是否要高亮显示
        highlightHoverRow: true,

        // 设置所有内容过长时显示为省略号
        showOverflow: true,
        // 设置表头所有内容过长时显示为省略号
        showHeaderOverflow: true,
        // 自定义行数据唯一主键的字段名
        rowId: 'id',
        // 保持原始值的状态
        keepSource: true,

        // 右侧自定义列配置项
        customConfig: { storage: true, checkMethod: this.checkColumnMethod },

        // 排序配置
        sortConfig: { trigger: 'cell' },
        // 	筛选配置项
        filterConfig: { remote: true },
        // 分页配置项
        pagerConfig: { pageSize: 10, pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000] },
        // 表单配置项
        formConfig: {
          titleWidth: 100,
          titleAlign: 'right',
          items: [
            {
              field: 'area', title: '区域', span: 6,
              titlePrefix: { message: 'app.body.valid.rName', icon: 'fa fa-exclamation-circle' },
              itemRender: {
                name: '$input', props: { placeholder: '请输入区域' }
              }
            },
            {
              field: 'cardType', title: '券类型', span: 6,
              itemRender: {
                name: '$input', props: { placeholder: '请输入券类型' }
              }
            },
            {
              field: 'erpDemoCode', title: 'portal券编号', span: 6,
              itemRender: {
                name: '$input', props: { placeholder: '请输入portal券编号' }
              }
            },
            {
              field: 'status', title: '状态', span: 6, folding: true,
              itemRender: {
                name: '$input', props: { placeholder: '请输入状态' }
              }
            },
            {
              field: 'clerkName', title: '员工', span: 6, folding: true,
              titleSuffix: { message: '注意，必填信息！', icon: 'fa fa-info-circle' },
              itemRender: { name: '$select', options: [] }
            },
            {
              field: 'coupPutTime', title: '推送时间', span: 6, folding: true,
              itemRender: {
                name: '$input',
                props: { type: 'number', min: 1, max: 120, placeholder: '请输入推送时间' }
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
        // 工具栏配置
        toolbar: {
          buttons: [
            { code: 'insert_actived', name: '新增', icon: 'fa fa-plus' },
            { code: 'delete', name: '直接删除', icon: 'fa fa-trash-o' },
            { code: 'mark_cancel', name: '删除/取消', icon: 'fa fa-trash-o' },
            { code: 'save', name: '保存', icon: 'fa fa-save', status: 'success' }
          ],
          refresh: true,
          import: true,
          export: true,
          print: true,
          zoom: true,
          custom: true
        },
        // 代理配置
        proxyConfig: {
          seq: true,
          sort: true,
          filter: true,
          form: true,
          ajax: {
            query: this.getData,
            delete: ({ body }) => getXuliangzhanDelete(), // XEAjax.post('https://api.xuliangzhan.com:10443/api/pub/save', body),
            save: ({ body }) => getXuliangzhanSave() // XEAjax.post('https://api.xuliangzhan.com:10443/api/pub/save', body)
          }
        },

        // 导出配置
        exportConfig: {
          remote: true,
          exportMethod: this.exportMethod,
          types: ['xlsx'],
          modes: ['current', 'selected', 'all']
        },
        // 导入配置
        importConfig: {
          remote: true,
          importMethod: this.importMethod,
          types: ['xlsx'],
          modes: ['insert']
        },
        // 打印配置
        printConfig: {
          columns: [{ field: 'name' }, { field: 'email' }, { field: 'nickname' }, { field: 'age' }, { field: 'amount' }]
        },
        // 复选框配置
        checkboxConfig: {
          labelField: 'id',
          reserve: true,
          highlight: true,
          range: true
        },
        // 校验规则配置项
        editRules: {
          name: [
            { required: true, message: 'app.body.valid.rName' },
            { min: 3, max: 50, message: '名称长度在3到50个字符' }
          ],
          email: [{ required: true, message: '邮件必须填写' }],
          role: [{ required: true, message: '角色必须填写' }]
        },
        // 可编辑配置项
        editConfig: { trigger: 'click', mode: 'row', showStatus: true }
      }
    }
  },
  created() {
    // 初始化渲染
    this.findSexList()
  },
  methods: {
    async findSexList() {
      // await this.$store.dispatch('gic/getGicCoupon')
      // this.sexList = this.$store.getters.gicCoupon

      // const xGrid = this.$refs.xGrid
      // if (xGrid) {
      //   const sexColumn = xGrid.getColumnByField('sex')
      //   sexColumn.editRender.options = this.sexList
      //   const sexItem = xGrid.getFormItems(4)
      //   sexItem.itemRender.options = this.sexList
      // }
    },
    getData({ page, sort, filters, form }) {
      return new Promise((resolve, reject) => {
        const queryParams = Object.assign({
          sort: sort.property,
          order: sort.order
        }, form)
        filters.forEach(({ property, values }) => {
          queryParams[property] = values.join(',')
        })
        // queryParams.currentPage = page.currentPage
        // queryParams.pageSize = page.pageSize
        this.$store.dispatch('gic/getGicCoupon', queryParams).then(() => {
          debugger
          const total = this.$store.getters.gicCoupon.length
          // const list = pagination(page.currentPage, page.pageSize, this.$store.getters.gicCoupon)
          const list = this.$store.getters.gicCoupon
          setTimeout(() => {
            resolve({
              result: list
              // total: total
              // page: { totle: total }
            })
          }, 200)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // getData({ page, sort, filters, form }) {
    //   debugger
    //   const queryParams = Object.assign({
    //     sort: sort.property,
    //     order: sort.order
    //   }, form)
    //   filters.forEach(({ property, values }) => {
    //     queryParams[property] = values.join(',')
    //   })
    //   this.$store.dispatch('gic/getGicCoupon', queryParams).then(() => {
    //     page.total = this.$store.getters.gicCoupon.totalCount
    //     const result = Object.assign({}, this.$store.getters.gicCoupon)
    //     const data = {}
    //     data.page = page
    //     data.result = result.result
    //     return data
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    formatAmount({ cellValue }) {
      return cellValue ? '' : '' // `$${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}` : ''
    },
    formatDate({ cellValue }) {
      return this.$moment(cellValue).format('YYYY-MM-DD HH:ss:mm')
      // return '' // XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
    },
    checkColumnMethod({ column }) {
      if (['nickname', 'role'].includes(column.property)) {
        return false
      }
      return true
    },
    importMethod({ file }) {
      console.log('导入')
      // const formBody = new FormDate()
      // formBody.append('file', file)
      // return XEAjax.post('https://api.xuliangzhan.com:10443/api/pub/import', formBody).then(data => {
      //   this.$XModal.message({ message: `成功导入 ${data.result.insertRows}条记录！`, status: 'success' })
      //   this.$refs.xGrid.commitProxy('query')
      // }).catch(() => {
      //   this.$XModal.message({ message: '导入失败,请检查数据是否正确!', status: 'error' })
      // })
    },
    exportMethod({ options }) {
      // const proxyInfo = this.$refs.xGrid.getProxyInfo()
      // const body = {
      //   filename: options.filename,
      //   sheetName: options.sheetName,
      //   isHeader: options.isHeader,
      //   original: options.original,
      //   mode: options.mode,
      //   pager: proxyInfo.pager,
      //   ids: options.mode === 'selected' ? options.data.map(item => item.id) : [],
      //   field: options.columns.map(column => {
      //     return {
      //       field: column.property,
      //       title: column.title
      //     }
      //   })
      // }
      return ''
      // return XEAjax.post('https://api/xuliangzhan.com:10443/api/pub/export', body).then(data => {
      //   if (data.id) {
      //     this.$XModal.message({ message: '导出成功，开始下载', status: 'success' })
      //     location.href = `https://api.xuliangzhan.com:10443/api/pub/export/download/${data.id}`
      //   }
      // }).catch(() => {
      //   this.$XModal.message({ message: '导出失败！', status: 'error' })
      // })
    }
  }
}
</script>
