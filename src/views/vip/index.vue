<template>
  <div class="vip">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search-vip :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <!-- 显示的表格 -->
    <el-card v-if="page" :body-style="{ padding: '0px 0px 50px 0px' }">
      <el-table
        v-loading="loading"
        :data="table.tableData"
        style="width: 100%"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        border
        @row-click="showVipInfo"
      >
        <el-table-column type="index" />
        <el-table-column prop="customer" label="经销商" align="center" />
        <el-table-column prop="store" label="开卡店仓" align="center" />
        <el-table-column prop="card" label="会员卡号" align="center" />
        <el-table-column prop="vipType" label="会员卡类别" align="center" />
        <el-table-column prop="mobel" label="手机号" align="center" />
        <el-table-column prop="integral" label="剩余积分" align="center" />
      </el-table>
    </el-card>

    <!-- 分页 -->
    <el-card v-if="page" class="block">
      <el-pagination
        :current-page="table.currentPage"
        :page-sizes="table.pageSizes"
        :page-size="table.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 提示信息弹窗 -->
    <prompt-box-new
      :loading="loading"
      :dialog-visible="dialogVisible"
      :title="table.title"
      :tips-data="tipsData"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import searchVip from '@/components/public/searchVip'
import promptBoxNew from '@/components/tips/prompt-box-new'
import { pagination } from '@/utils/array'
import { parseTime } from '@/utils'

export default {
  name: 'Vip',
  components: {
    searchVip,
    promptBoxNew
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      page: false,
      tipsData: [],
      tableData: [],
      table: {
        total: 0,
        title: '',
        currentPage: 1, // 当前在第几页
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        tableData: []
      }
    }
  },
  created() {
  },
  methods: {
    init() {
    },
    getAnalysis(data) {
      this.loading = true
      this.table.tableData = []
      this.$store.dispatch('baseApi/getVipExcavate', data)
        .then(() => {
          this.table.currentPage = 1
          this.table.pageSize = 10
          this.page = true
          this.table.total = this.$store.getters.vipExcavate.length
          this.table.tableData = pagination(1, this.table.pageSize, this.$store.getters.vipExcavate)
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
    // 单页数量改变
    handleSizeChange(val) {
      this.table.pageSize = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.vipExcavate)
    },
    // 页数改变
    handleCurrentChange(val) {
      this.table.currentPage = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.vipExcavate)
    },
    // 点击显示会员零售信息
    showVipInfo(val) {
      this.loading = true
      this.dialogVisible = !this.dialogVisible
      this.$store.dispatch('baseApi/getVipRetail', val).then(() => {
        this.tipsData = this.$store.getters.vipRetail
        // 会员信息json转成string字符串
        this.table.title = this.jsonToString(val)
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // json字符串转成str,该方法只能该表单使用html-title #909399
    jsonToString(json) {
      var str = ''
      str = '<span class="html-title">经销商：</span><span class="html-font">' + json.customer + '</span>' +
        '<span class="html-title">所属店仓：</span><span class="html-font">' + json.store + '</span>' +
        '<span class="html-title">手机：</span><span class="html-font">' + json.mobel + '</span><br>' +
        '<span class="html-title">卡号：</span><span class="html-font">' + json.card + '</span>' +
        '<span class="html-title">昵称：</span><span class="html-font">' + json.nickName + '</span>' +
        '<span class="html-title">剩余积分：</span><span class="html-font">' + json.integral + '</span>'

      return str
    },
    handleClose(done) {
      this.dialogVisible = !this.dialogVisible
    },
    // 导出PDF
    exportPdf() {
      this.getPdf('会员挖掘')
    },
    // 导出excel
    handleDownload(str) {
      this.loading = true
      if (this.table.tableData.length === 0) {
        this.loading = false
        return
      }
      str = (str === undefined) ? '' : str
      import('@/vendor/Export2Excel').then(excel => {
        // 设置Excel的表格第一行的标题
        const tHeader = ['经销商', '开卡店仓', '会员卡号', '会员卡类别', '手机号', '剩余积分']
        // 设置对应表头属性
        const filterVal = ['customer', 'store', 'card', 'vipType', 'mobel', 'integral']
        const data = this.formatJson(filterVal, str)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.table.title
        })
        this.loading = false
      })
    },
    formatJson(filterVal, str) {
      var data = []
      if (str === 'all') {
        data = this.$store.getters.vipExcavate
      } else if (str === 'this') {
        data = this.table.tableData
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
    }
  }
}
</script>

<style>
.block {
  text-align: center;
}
.html-title,
.html-font {
  font-weight: 900;
  font-size: 20px;
  margin-right: 10px;
}
.html-title {
  color: #909399;
}
.html-font {
  color: #409eff;
}
</style>
