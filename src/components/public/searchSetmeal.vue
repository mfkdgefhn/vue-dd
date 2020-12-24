
<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 时间查询 -->
      <el-col :md="8" :sm="12" :xs="24">
        <el-row style="margin-bottom:0px;">
          <el-col :span="11">
            <el-date-picker
              v-model="listQuery.beginDate"
              style="width: 100%; margin-bottom: 5px; font-size:12px;"
              type="date"
              value-format="yyyyMMdd"
              placeholder="开始日期"
              format="yyyyMMdd"
              :picker-options="pickerOptions"
            />
          </el-col>
          <el-col :span="2" style="text-align:center;">
            <span style="line-height:38px; color:#ccc;">至</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="listQuery.endDate"
              style="width: 100%;margin-bottom: 5px;font-size:12px;"
              type="date"
              value-format="yyyyMMdd"
              placeholder="结束日期"
              format="yyyyMMdd"
              :picker-options="pickerOptions"
            />
          </el-col>
        </el-row>
      </el-col>

      <!-- 搜索按钮 -->
      <el-col :md="3" :sm="5" :xs="5">
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleFilter"
        >搜索</el-button>
      </el-col>

    </el-row>

    <!-- 提示信息弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStore } from '@/api/gmqApi' // , getYear,getSeason,getCustomer,

export default {
  name: 'Search',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > (new Date).getTime()-24*60*60*1000
        }
      },
      listQuery: {
        beginDate: this.getDateStr(-7),
        endDate: this.getDateStr(-1),
        storeIds: [],
        loading: false
      },
      restaurants: [],
      dialogVisible: false
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 搜索栏回车事件
    handleFilter() {
      var data = Object.assign({}, this.listQuery)
      this.handle(data)
      this.$emit('getAnalysis', data)
    },
    handle(data) {
      // 时间转换
      if (!data.beginDate) {
        if (data.endDate) {
          data.jzDate = data.endDate
          data.endDate = null
        }
      }
      if (!data.endDate) {
        if (data.beginDate) {
          data.qsDate = data.beginDate
          data.beginDate = null
        }
      }
      if (!data.beginDate && !data.endDate) {
        data.beginDate = 20180101
        data.endDate = this.getDateStr(-1)
      }
    },
    // 刷新事件
    refresh() {
      console.log('刷新')
    },
    getDateStr(count=0) {
      var dd = new Date()
      dd.setDate(dd.getDate() + count)
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      return '' + y + m + d
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    showMessage() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style scoped>
.checkbox-group {
  display: inline-table;
  margin-left: 10px;
}
.el-row {
  margin-bottom: 5px;
}
</style>
