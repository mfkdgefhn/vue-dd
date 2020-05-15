<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 17:16:04
 * @LastEditors  : anan
 * @LastEditTime : 2020-01-12 14:07:13
 -->
<template>
  <div class="data-analysis">
    <el-row :gutter="10" style="700px;">
      <!---->
      <el-col :span="10" class="echarts-row-col">
        <!-- 店铺排名TOP20 -->
        <el-row>
          <el-col>
            <el-card :body-style="bodyStyle1" shadow="hover">
              <span class="card-span">店铺排名TOP20</span>
              <el-tooltip class="tips" effect="light" placement="bottom">
                <div slot="content" v-html="tips1" />
                <i class="el-icon-chat-dot-square" />
              </el-tooltip>
              <div>
                <span class="table-header-index">序号</span>
                <span class="table-header-name">店名</span>
                <span class="table-header-totAmtActual">销售额</span>
                <span class="table-header-qty">数量</span>
              </div>
              <vue-seamless-scroll
                :class-option="classOption"
                :data="storeRankingM"
                class="seamless-warp"
              >
                <ul class="item">
                  <li v-for="item in storeRankingM" :key="item.index">
                    <span class="index" v-text="item.rns" />
                    <span class="name" v-text="item.name" />
                    <span class="totAmtActual" v-text="item.totAmtActual" />
                    <span class="qty" v-text="item.qty" />
                  </li>
                </ul>
              </vue-seamless-scroll>
            </el-card>
          </el-col>
        </el-row>

        <!-- 省份排名 -->
        <el-row>
          <el-col style="margin-top:5px;">
            <el-card :body-style="{ padding:'10px' }" shadow="hover">
              <bar-echarts1
                :body-style="bodyStyle"
                :province-sale-m="provinceSaleM"
                style="height:300px;"
              />
            </el-card>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="14" class="echarts-row-col">
        <el-row :gutter="10">
          <el-col :span="8" style="padding-bottom:10px;">
            <el-card :body-style="bodyStyle" shadow="hover" :style="cardRetail">
              <span class="monty">零售额度</span>
              <count-to
                :start-val="0"
                :end-val="allQuotas"
                :duration="duration"
                class="max"
                suffix="万"
              />
            </el-card>
          </el-col>

          <el-col :span="8" style="padding-bottom:10px;">
            <el-card :body-style="bodyStyle" shadow="hover" :style="cardRetail">
              <span class="monty">会员零售额度</span>
              <count-to
                :start-val="0"
                :end-val="vipQuotas"
                :duration="duration"
                class="max"
                suffix="万"
              />
            </el-card>
          </el-col>

          <el-col :span="8" style="padding-bottom:10px;">
            <el-card :body-style="bodyStyle" shadow="hover" :style="cardRetail">
              <span class="monty">会员占比</span>
              <span class="max">{{ vipSaleRates }} %</span>
            </el-card>
          </el-col>
        </el-row>

        <!-- 地图 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <echarts :big-data="bigData" style="height:620px" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="padding-top:10px;">
      <el-col :span="12">
        <el-card :body-style="{ height:'300px',padding:'10px' }" shadow="hover">
          <line-echarts :year-on-year="yearOnYear" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ height:'300px',padding:'10px' }" shadow="hover">
          <bar-echarts :vip-repeat-purchase="vipRepeatPurchase" :loading="loading" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import echarts from './echarts'

import dayjs from 'dayjs'

// import echartsWordCloud from './echarts-word-cloud' // 该组件有问题，明日查看
import barEcharts from './bar-echarts'
import barEcharts1 from './bar-echarts1'
import lineEcharts from './line-echarts'
// import pieEcharts from './pie-echarts'

import countTo from 'vue-count-to'

import { getBigData, getKBlsedM, getStoreRankingM, getProvinceSaleM, getYearOnYear, getVipRepeatPurchase } from '@/api/gmqApi'

export default {
  name: 'DataAnalysis',
  components: {
    echarts,
    barEcharts,
    barEcharts1,
    lineEcharts,
    countTo
  },
  data() {
    return {
      bodyStyle: {
        background: '#242640',
        border: '1px #242640 solid',
        padding: '5px'
      },
      bodyStyle1: {
        background: '#242640',
        border: '1px #242640 solid',
        padding: '5px'
      },
      bigData: [],
      duration: 1000,
      allQuota: 0,
      vipQuota: 0,
      vipSaleRate: 0,
      storeRankingM: [],
      provinceSaleM: [],
      yearOnYear: [],
      vipRepeatPurchase: [],
      count: 0,
      loading: false,
      tips1: '<div>店铺排名TOP20 提示</div><div>当月零售额度排名前20位门店</div>',
      cardRetail: 'text-align: center;'
    }
  },
  computed: {
    allQuotas() {
      return parseInt(this.allQuota) / 10000
    },
    vipQuotas() {
      return parseInt(this.vipQuota) / 10000
    },
    vipSaleRates() {
      return Math.round(this.vipSaleRate * 10000) / 100
    },
    listQuery() {
      return this.$store.getters.listQuery
    },
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0 // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        // waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  watch: {
    listQuery(val) {
      this.loading = true
      // debugger
      this.getBigData(val)
    },
    count(val) {
      if (val === 6) {
        const params = '' +
          (this.listQuery.months ? '月份:' + this.listQuery.months : '') +
          (this.listQuery.province ? ', 省份:' + this.listQuery.province : '') +
          (this.listQuery.city ? ', 城市:' + this.listQuery.city : '')

        this.$message({
          message: params + ',  加载完成!!!',
          center: true,
          duration: 3000,
          type: 'success'
        })

        this.count = 0
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.cardRetail = 'height:100%; text-align: center;line-height:' + parseInt(window.innerHeight / 25) + 'px;'
        that.timer = true
        setTimeout(() => {
          that.timer = false
        }, 400)
      })()
    }
    this.$store.dispatch('baseApi/setMonths', this.getMonths(0))

    // 获取看板数据
    // this.getBigData(this.listQuery)
    // 获取基础数据(如：年份....)
    this.getBaseDate(this.listQuery)
  },
  methods: {
    getBigData(params) {
      // 地图数据
      getBigData(params).then(response => {
        this.bigData = response
        ++this.count
      })
      // 看板
      getKBlsedM(params).then(response => {
        const arr = response.result
        arr.forEach(element => {
          if (element.type === 'all') {
            this.allQuota = element.quota
          } else {
            this.vipQuota = element.quota
          }
        })
        this.vipSaleRate = this.allQuota ? this.vipQuota / this.allQuota : 0
        ++this.count
      })
      // 获取店仓排名
      getStoreRankingM(params).then(response => {
        this.storeRankingM = response.result
        ++this.count
      })
      // 获取省份排行
      getProvinceSaleM(params).then(response => {
        this.provinceSaleM = response
        ++this.count
      })
      // 获取销量、数量同比
      getYearOnYear(params).then(response => {
        const arr = []
        response.forEach(element => {
          if (arr.length === 0) {
            arr.push({
              'year': element.year,
              'billdate': [element.billdate],
              'tot': [element.totAmtActual],
              'monthday': [element.monthday]
            })
          } else {
            let isTrue = -1
            arr.forEach((array, index) => {
              if (element.year === array.year) {
                isTrue = index
                arr[index].billdate.push(element.billdate)
                arr[index].tot.push(element.totAmtActual)
                arr[index].monthday.push(element.monthday)
              }
            })
            if (isTrue === -1) {
              arr.push({
                'year': element.year,
                'billdate': [element.billdate],
                'tot': [element.totAmtActual],
                'monthday': [element.monthday]
              })
            }
          }
        })
        this.yearOnYear = arr
        ++this.count
      })
      // 获取会员复购
      getVipRepeatPurchase(params).then(response => {
        this.loading = false
        this.vipRepeatPurchase = response
        ++this.count
      })
    },
    // 获取基础数据
    getBaseDate(params) {
      this.$store.dispatch('baseApi/getCustomer').then(() => { })
      this.$store.dispatch('baseApi/getStores').then(() => { })
      this.$store.dispatch('baseApi/getYear').then(() => { })
      this.$store.dispatch('baseApi/getSeason').then(() => { })
    },
    getMonths(count) {
      return dayjs().add(count, 'month').format('YYYYMM')
    }
  }
}
</script>

<style scoped>
.data-analysis {
  background: #191b2b;
  padding-top: 0.3125rem;
  padding-left: 0.3125rem;
  padding-right: 0.3125rem;
}
/*
.el-col {
  margin-top: 0.3125rem;
}
 */
.el-card {
  border: 0px;
  background: #242640;
  color: #cccccc;
  height: 100%;
}
.monty {
  display: block;
  margin: 0.3125rem 0.3125rem;
  font-size: 1.2rem;
  color: #cccccc;
}
.monty:hover {
  font-size: 1.4rem;
  color: #0095d9;
}
.el-card .max {
  font-size: 1.8rem;
  font-weight: 900;
}
.el-card .max:hover {
  font-size: 2rem;
  color: #0095d9;
}
.seamless-warp {
  height: 300px;
  overflow: hidden;
}
.item {
  list-style: none;
  padding-inline-start: 0.625rem;
  margin: 0;
}
span {
  color: #00b4ff;
}
ul li:hover {
  background: #46485a;
}
ul li span {
  color: #ccc;
}
.card-span {
  line-height: 2.5rem;
  margin: 0.625rem;
  font-size: 1rem;
}
.index,
.name,
.totAmtActual,
.qty {
  line-height: 2.5rem;
  display: inline-block;
  text-align: center;
}
.table-header-index,
.table-header-name,
.table-header-totAmtActual,
.table-header-qty {
  display: inline-block;
  text-align: center;
  line-height: 1.875rem;
  color: #ccc;
  font-size: 1rem;
}
.table-header-index {
  margin-left: 10px;
}
.index,
.table-header-index {
  width: 10%;
}
.name,
.table-header-name {
  width: 40%;
}
.totAmtActual,
.table-header-totAmtActual {
  width: 20%;
}
.qty,
.table-header-qty {
  width: 20%;
}
.tips {
  float: right;
  line-height: 40px;
  margin-right: 10px;
  font-size: 20px;
}
</style>
