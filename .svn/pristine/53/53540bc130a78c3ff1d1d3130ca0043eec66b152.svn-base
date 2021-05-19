<template>
  <div>
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <el-table :loading="loading" :data="table.tableData" border class="api-log" style="width:98%;">
      <el-table-column prop="fname" label="接口名" />
      <el-table-column prop="qty" label="调用次数" />
    </el-table>

    <el-card v-if="page" class="block api-log">
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
  </div>
</template>

<script>
import Search from '@/components/public/search'
import { getApiLog } from '@/api/gmqApi'
import { pagination } from '@/utils/array'

export default {
  name: 'ApiLog',
  components: {
    Search
  },
  data() {
    return {
      loading: false,
      page: false,
      table: {
        total: 0,
        title: 'top30',
        currentPage: 1, // 当前在第几页
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        tableData: []
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      getApiLog()
        .then(response => {
          this.table.currentPage = 1
          this.table.pageSize = 10
          this.page = true
          this.$store.dispatch('baseApi/setApiLog', response)
          this.table.total = response.length
          this.table.tableData = pagination(1, this.table.pageSize, response)
          this.loading = false
          this.$message({
            message: '查询完成!!!',
            type: 'success'
          })
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
    getAnalysis() {
      console.log('321321')
    },

    // 单页数量改变
    handleSizeChange(val) {
      this.table.pageSize = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.apiLog)
    },
    // 页数改变
    handleCurrentChange(val) {
      this.table.currentPage = val
      this.table.tableData = pagination(this.table.currentPage, this.table.pageSize, this.$store.getters.apiLog)
    }

  }
}
</script>

<style>
.api-log {
  margin: 10px;
}
.block {
  text-align: center;
}
</style>

