<template>
  <div class="seach-length">
    <el-row :gutter="10">
      <!-- 时间查询 -->
      <el-col>
        <el-date-picker
          v-model="listQuery.billdate"
          style="min-width:300px;margin-bottom: 5px; font-size:12px;"
          type="date"
          value-format="yyyyMMdd"
          placeholder="开始日期"
          :picker-options="pickerOptions"
          format="yyyyMMdd"
        />
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          :disabled="loading"
          @click="handleFilter"
        >查询</el-button>

        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload('this')"
        >单页导出</el-button>

        <!-- PDF -->
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="exportPdf"
        >PDF</el-button>

        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload('all')"
        >全部导出</el-button>

        <!-- 提示信息 -->
        <el-button type="primary" icon="el-icon-message" circle @click="tipsInfo" />
      </el-col>
    </el-row>

    <!-- 提示信息弹窗 -->
    <prompt-box
      :dialog-visible="dialogVisible"
      :title="title"
      :tips-data="tipsData"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { getDateStr } from '@/utils/times'
import promptBox from '@/components/tips/prompt-box'

export default {
  name: 'SearchSale',
  directives: { waves },
  components: {
    promptBox
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      showAllLevels: false,
      listQuery: {
        billdate: getDateStr(-1)
      },
      storeOptions: [],
      restaurants: [],
      dialogVisible: false,
      options: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },

      tips: {
        'top30': [
          {
            name: '店铺名称',
            description: '有零售数据的店铺'
          }, {
            name: '日业绩',
            description: '查询日期的零售金额'
          }, {
            name: '日销量',
            description: '查询日期的零售数量'
          }, {
            name: '日单价',
            description: '日业绩/日销量,取整'
          }, {
            name: '本月业绩',
            description: '查询日期月份的总零售金额'
          }, {
            name: '本月销量',
            description: '查询日期月份的总零售数量'
          }, {
            name: '本月日均销额',
            description: '本月业绩/本月销量'
          }, {
            name: '季度库存',
            description: '查询当日前一天的款号库存，该季度库存与查询日有关，与查询日期无关'
          }
        ],
        'storeDayAvg': [
          {
            name: '经销商',
            description: '按客户区分'
          },
          {
            name: '当日店均销额',
            description: '查询日期所有门店零售金额/有零售数据的门店数量'
          },
          {
            name: '当日店均销量',
            description: '查询日期所有门店零售数量/有零售数据的门店数量'
          },
          {
            name: '当日店均单价',
            description: '所有门店零售金额/所有门店零售数量'
          },
          {
            name: '当月累计单店',
            description: '当月所有门店零售金额/有零售数据的门店数量/天数'
          },
          {
            name: '增长',
            description: '(当月累计单店-上年当月累计单店)/上年当月累计单店'
          },
          {
            name: '老店',
            description: '开店时间大于365天的店铺'
          },
          {
            name: '老店年日均',
            description: '当月所有门店零售金额/门店数量/天数'
          },
          {
            name: '老店日均增长',
            description: '(当月累计单店-上年当月累计单店)/上年当月累计单店'
          },
          {
            name: '老店年当日店均',
            description: '当日所有门店零售金额/门店数量'
          },
          {
            name: '日均增长',
            description: '(当日累计单店-上年当日累计单店)/上年当日累计单店'
          }
        ],
        'retailShare': [
          {
            name: '所属经销商',
            description: '按客户区分'
          },
          {
            name: '销量占比',
            description: '当日所有门店年份+季节款   零售总数量/当日所有零售数量'
          },
          {
            name: '均单价',
            description: '当日所有门店年份+季节款   零售总金额/当日年份+季节款零售总数量'
          },
          {
            name: '库存占比',
            description: '当日所有门店年份+季节款   库存/当日所有库存'
          },
          {
            name: '单店铺货量',
            description: '当日所有门店年份+季节款   库存/门店数量'
          }
        ]
      }
    }
  },
  computed: {
    tipsData() {
      if (this.title === 'top30') {
        return this.tips.top30
      } if (this.title === '系统客户日均单店') {
        return this.tips.storeDayAvg
      } if (this.title === '零售占比') {
        return this.tips.retailShare
      } else {
        return ['字段提示，提示板块开发中.....']
      }
    }
  },
  methods: {
    handleDownload(str) {
      this.$emit('handleDownload', str)
    },
    tipsInfo(str) {
      this.dialogVisible = !this.dialogVisible
    },
    // 搜索栏回车事件
    handleFilter() {
      var data = Object.assign({}, this.listQuery)

      // https://easy-mock.com/mock/5d0c221d15fc6012866760fe/example/getTop30
      // this.handle(data)
      this.$emit('getAnalysis', data)
    },

    // 导出PDF
    exportPdf() {
      this.$emit('exportPdf')
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleClose(done) {
      this.dialogVisible = !this.dialogVisible
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
.filter-item {
  margin-bottom: 5px;
}
</style>
