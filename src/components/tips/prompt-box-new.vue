<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-12-07 10:55:15
 * @LastEditors: anan
 * @LastEditTime: 2019-12-07 15:31:47
 -->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
    custom-class="dialog-class"
    center
  >
    <span slot="title" v-html="title" />

    <el-card v-if="page" body-style="{ margin-bottom: '10px'}" class="block">
      <el-table v-loading="loading" :data="table.tableData" width="100%" border>
        <el-table-column
          v-for="item in tableHeader"
          :key="item.index"
          :label="item.label"
          :property="item.property"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row[scope.column.property] }}</template>
        </el-table-column>
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
  </el-dialog>
</template>

<script>
import { pagination } from '@/utils/array'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tableHeader: {
      type: Array,
      default: () => []
    },
    itemDate: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: false,
      table: {
        total: 0,
        title: '',
        currentPage: 1, // 当前在第几页
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        tableData: [],
        tHeader: ['经销商', '开卡店仓', '会员卡号', '会员卡类别', '手机号', '剩余积分'],
        filterVal: ['customer', 'store', 'card', 'vipType', 'mobel', 'integral']
      }
    }
  },
  watch: {
    // itemDate: { // 监听的对象
    //   // deep: true, // 深度监听设置为 true
    //   immediate: true,
    //   handler: (val) => {
    //     if (val) {
    //       debugger
    //       this.table.currentPage = 1
    //       this.table.pageSize = 10
    //       this.table.total = val.length
    //       this.table.tableData = pagination(1, this.table.pageSize, val)
    //       this.page = true
    //     }
    //   }
    // }
    itemDate(val) {
      this.table.currentPage = 1
      this.table.pageSize = 10
      this.table.total = val.length
      this.table.tableData = pagination(1, this.table.pageSize, val)
      this.page = true
    }

  },
  methods: {
    handleClose(done) {
      this.$emit('handleClose', false)
    },
    // 单页数量改变
    handleSizeChange(val) {
      this.table.pageSize = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.retailItemAnalysis)
    },
    // 页数改变
    handleCurrentChange(val) {
      this.table.currentPage = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.retailItemAnalysis)
    }
  }
}
</script>

<style scoped>
span {
  font-size: 16px;
  line-height: 40px;
}
</style>

<style>
.dialog-class .el-dialog__body {
  margin-bottom: 100px;
  padding: 10px 20px;
  text-align: center;
}
</style>

