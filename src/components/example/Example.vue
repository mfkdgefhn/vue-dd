<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-19 17:57:19
 * @LastEditors: anan
 * @LastEditTime: 2019-11-02 08:45:37
 :style="backgroundColor"
 -->
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
            />
          </el-col>
        </el-row>
      </el-col>

      <!-- 店仓 -->
      <el-col :md="4" :sm="8" :xs="12">
        <el-autocomplete
          v-model="listQuery.storeName"
          class="inline-input"
          :fetch-suggestions="querySearch"
          placeholder="店仓"
          style="width:100%"
          @select="handleSelect"
        />
      </el-col>

      <!-- 年份 -->
      <el-col :md="3" :sm="8" :xs="12">
        <el-select v-model="listQuery.year" placeholder="款号年份">
          <el-option
            v-for="item in yearOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>

      <!-- 季节 -->
      <el-col :md="3" :sm="8" :xs="12">
        <el-select v-model="listQuery.season" placeholder="款号季节">
          <el-option
            v-for="item in seasonOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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

      <!-- 提示信息 -->
      <el-col :md="1" :sm="1" :xs="1">
        <el-button type="primary" icon="el-icon-message" circle @click="showMessage" />
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
import { getYear, getSeason, getStore } from '@/api/gmqApi'

export default {
  props: {
    screenHeight: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: 'background-color:rgba(78,143,223,0);'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listQuery: {
        beginDate: this.getDateStr(-7),
        endDate: this.getDateStr(-1)
      },
      year: '',
      season: '',
      yearOptions: [],
      seasonOptions: [],
      storeOptions: [],
      restaurants: [],
      dialogVisible: false
    }
  },
  watch: {
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      // 年份
      getYear().then(response => {
        this.yearOptions = response.result
      })
      // 季节
      getSeason().then(response => {
        this.seasonOptions = response.result
      })
      getStore().then(response => {
        this.restaurants = response
        this.storeOptions = response
      })
    },
    // 搜索栏回车事件
    handleFilter() {
      this.$emit('getAnalysis', this.listQuery)
    },
    // 刷新事件
    refresh() {
      console.log('刷新')
    },
    getDateStr(count) {
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
    handleSelect(item) {
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
