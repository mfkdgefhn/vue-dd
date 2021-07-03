
<template>
  <div class="seach-length">
    <el-row>
      <!-- 时间查询 -->
      <el-col >
        <el-row :gutter="16">
          <el-col :sm="4" :xs="8">
            <el-date-picker
              v-model="listQuery.beginDate"
              style="width: 100%; font-size:12px;"
              type="date"
              value-format="yyyyMMdd"
              placeholder="开始日期"
              format="yyyyMMdd"
              :picker-options="pickerOptions"
            />
          </el-col>
          <el-col :sm="1" :xs="2" style="text-align:center;">
            <span style="line-height:38px; color:#ccc;">至</span>
          </el-col>
          <el-col :sm="4" :xs="8">
            <el-date-picker
              v-model="listQuery.endDate"
              style="width: 100%;font-size:12px;"
              type="date"
              value-format="yyyyMMdd"
              placeholder="结束日期"
              format="yyyyMMdd"
              :picker-options="pickerOptions"
            />
          </el-col>
          <el-col :sm="4" :xs="8">
            <el-input v-model="listQuery.eName" placeholder="款号N"></el-input>
          </el-col>
          <el-col :sm="4" :xs="8">
            <!-- <el-date-picker
              v-model="listQuery.productYear"
              type="year"
              placeholder="款号年份">
            </el-date-picker> --><!-- 经销商选择 -->
            <el-select
              v-model="listQuery.productYear"
              class="price-class"
              style="width: 200px;"
              multiple
              clearable
              collapse-tags
              placeholder="款号年份"
            >
              <el-option
                v-for="item in productYearArray"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-row>
        
      </el-col>
      
      <el-col :lg="4" :md="6" :sm="8" :xs="12">       
        <el-input-number class="input-number" v-model="listQuery.spring" controls-position="right" @change="handleChange" placeholder="春" />
      </el-col>
      <el-col :lg="4" :md="6" :sm="8" :xs="12">       
        <el-input-number class="input-number" v-model="listQuery.summer" controls-position="right" @change="handleChange" placeholder="夏" />
      </el-col>
      <el-col :lg="4" :md="6" :sm="8" :xs="12">       
        <el-input-number class="input-number" v-model="listQuery.autumn" controls-position="right" @change="handleChange" placeholder="秋" />
      </el-col>
      <el-col :lg="4" :md="6" :sm="8" :xs="12">       
        <el-input-number class="input-number" v-model="listQuery.winter" controls-position="right" @change="handleChange" placeholder="冬" />
      </el-col>
      <el-col :lg="4" :md="6" :sm="8" :xs="12">       
        <el-input-number class="input-number" v-model="listQuery.other" controls-position="right" @change="handleChange" placeholder="其他" />
      </el-col>

      <!-- 搜索按钮 -->
      <el-col>
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
import { getProductYear } from '@/api/gmqApi' // , getYear,getSeason,getCustomer,

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
      productYearArray: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > (new Date).getTime()-24*60*60*1000
        }
      },
      listQuery: {
        beginDate: this.getDateStr(-7),
        endDate: this.getDateStr(-1),
        loading: false,
        productYear: ''
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
    this.getProductYear()
  },
  mounted() {
  },
  methods: {
    getProductYear(){
      // 件数
      getProductYear().then(response => {
        this.productYearArray=response
      })
    },
    // 搜索栏回车事件
    handleFilter() {
      var data = Object.assign({}, this.listQuery)
      this.handle(data)
      this.$emit('getAnalysis', data)
    },
      handleChange(value) {
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
      // 将过滤掉后的查询参数为数组的转换成字符串
      for (const key in data) {
        if (typeof data[key] === 'object') {
          if (data[key].length > 0) {
            data[key] = data[key].join(',')
          } else {
            delete data[key]
          }
        } else {
          if (key === 'minPrice' || key === 'maxPrice' || key === 'integral' || key === 'double') {
            data[key] = parseInt(data[key])
          } else if (key === 'minDiscount' || key === 'maxDiscount') {
            data[key] = parseFloat(data[key])
          }
        }
        if (isNaN(data[key]) && typeof data[key] === 'string' && data[key].length === undefined) {
          delete data[key]
        }
      }
    },
    // 刷新事件
    refresh() {
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
.input-number{
  width: 90%;
  margin-top: 5px;
}
.filter-item{
  margin-top:5px;
}
</style>
