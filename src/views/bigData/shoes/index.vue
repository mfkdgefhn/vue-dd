<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 17:16:04
 * @LastEditors: anan
 * @LastEditTime: 2019-11-20 15:24:41
 -->
<template>
  <div class="data-analysis">
    <!-- <el-card shadow="hover" class="crad">
      <search />
    </el-card>-->

    <el-row :gutter="10">
      <!---->
      <el-col :span="10" class="echarts-row-col" style="height:100%">
        <el-col :style="'height:'+(screenHeight*0.66*0.40)+'px;'">
          <el-card :body-style="bodyStyle1" shadow="hover" style="height:100%;">
            <!--  <div slot="header" class="clearfix"> -->
            <span class="card-span">店铺排名TOP20</span>
            <!-- </div>-->
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
          <!-- <el-card :body-style="bodyStyle1" shadow="hover" style="height:100%;">
            <vxe-table
              ref="xTable"
              border
              highlight-hover-row
              highlight-current-row
              height="300"
              :data="tableData"
            >
              <vxe-table-column
                v-for="(config, index) in tableColumn"
                :key="index"
                v-bind="config"
              />
            </vxe-table>
          </el-card>-->
          <!-- <el-card :body-style="bodyStyle1" shadow="hover" style="height:100%;width:100%">
            <vue-seamless-scroll
              :class-option="classOption"
              :data="storeRankingM"
              class="seamless-warp"
            >
              <el-table ref="table" :data="storeRankingM" style="width: 100%">
                <el-table-column prop="rns" label="序号" width="80" />
                <el-table-column prop="name" label="姓名" />
              </el-table>
            </vue-seamless-scroll>
          </el-card>-->
        </el-col>
        <el-col :style="'height:'+(screenHeight*0.66*0.54)+'px;'">
          <el-card :body-style="bodyStyle" shadow="hover">
            <bar-echarts1 :screen-height="screenHeight" :province-sale-m="provinceSaleM" />
          </el-card>
        </el-col>
      </el-col>

      <el-col :span="14" class="echarts-row-col" style="height:100%">
        <el-row :gutter="10" :style="'height:'+(screenHeight*0.66*0.16)+'px;'">
          <el-col :span="8">
            <el-card
              :body-style="bodyStyle"
              shadow="hover"
              style="height:100px; text-align: center;"
            >
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

          <el-col :span="8">
            <el-card
              :body-style="bodyStyle"
              shadow="hover"
              style="height:100px; text-align: center;"
            >
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

          <el-col :span="8">
            <el-card
              :body-style="bodyStyle"
              shadow="hover"
              style="height:100px; text-align: center;"
            >
              <span class="monty">会员占比</span>
              <span class="max">{{ vipSaleRates }} %</span>
            </el-card>
          </el-col>
        </el-row>
        <!-- 地图 -->
        <el-row :gutter="10" :style="'height:'+(screenHeight*0.66*0.78)+'px;'">
          <el-col :span="24" style="height:100%">
            <echarts :big-data="bigData" :style="'height:'+(screenHeight*0.66*0.78)+'px;'" />
          </el-col>
        </el-row>
      </el-col>

      <!-- <el-col :span="7" class="echarts-row-col" style="height:100%">
        <el-col :style="'height:'+(screenHeight*0.66*0.40)+'px;'">
          <el-card :body-style="bodyStyle" shadow="hover" style="height:100%;">
            <span>城市销售分布</span>
          </el-card>
        </el-col>
        <el-col :style="'height:'+(screenHeight*0.66*0.54)+'px;'">
          <el-card :body-style="bodyStyle" shadow="hover" style="height:100%;">
            <span>销售员业绩TOP10</span>
            <bar-echarts :screen-height="screenHeight" />
          </el-card>
        </el-col>
      </el-col>-->
    </el-row>

    <el-row :gutter="10" :style="echartsRowBottom">
      <el-col :span="12">
        <el-card :body-style="bodyStyle" shadow="hover">
          <span>销量/数量同比</span>
          <line-echarts :screen-height="screenHeight" :year-on-year="yearOnYear" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="bodyStyle" shadow="hover">
          <span>会员复购</span>
          <pie-echarts :screen-height="screenHeight" :vip-repeat-purchase="vipRepeatPurchase" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// import Search from './search'
import echarts from './echarts'

// import echartsWordCloud from './echarts-word-cloud' // 该组件有问题，明日查看
// import barEcharts from './bar-echarts'
import barEcharts1 from './bar-echarts1'
import lineEcharts from './line-echarts'
import pieEcharts from './pie-echarts'

import countTo from 'vue-count-to'

import { getBigData, getKBlsedM, getStoreRankingM, getProvinceSaleM, getYearOnYear, getVipRepeatPurchase } from '@/api/gmqApi'

export default {
  name: 'DataAnalysis',
  components: {
    echarts,
    // echartsWordCloud,
    // barEcharts,
    barEcharts1,
    lineEcharts,
    pieEcharts,
    countTo
  },
  data() {
    return {
      bodyStyle: {
        background: '#242640',
        border: '1px #242640 solid'
      },
      bodyStyle1: {
        background: '#242640',
        border: '1px #242640 solid',
        padding: '5px'
      },
      screenHeight: window.innerHeight,
      echartsRowTop: 'height: 66%;',
      echartsRowBottom: 'height: 33%;',
      listQuery: {},
      bigData: [],
      duration: 2000,
      allQuota: 0,
      vipQuota: 0,
      vipSaleRate: 0,
      storeRankingM: [],
      provinceSaleM: [],
      yearOnYear: [],
      vipRepeatPurchase: []
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
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight
        that.echartsRowTop = 'height:' + (that.screenHeight * 0.66) + 'px;'
        that.echartsRowBottom = 'height:' + (that.screenHeight * 0.33) + 'px;'
        that.timer = true
        setTimeout(() => {
          that.timer = false
        }, 400)
      })()
    }
    // 获取看板数据
    this.getBigData()
    // 获取基础数据(如：年份....)
    this.getBaseDate()
  },
  methods: {
    getBigData(params) {
      // 地图数据
      getBigData(params).then(response => {
        this.bigData = response
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
      })
      // 获取店仓排名
      getStoreRankingM(params).then(response => {
        this.storeRankingM = response.result
      })
      // 获取省份排行
      getProvinceSaleM(params).then(response => {
        // console.log(response)
        this.provinceSaleM = response
      })
      // 获取销量、数量同比
      getYearOnYear(params).then(response => {
        // console.log(response)
        // const yearOnYear = {}
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
      })
      // 获取会员复购
      getVipRepeatPurchase(params).then(response => {
        // console.log(response)
        this.vipRepeatPurchase = response
      })
    },

    // 获取基础数据
    getBaseDate() {
      this.$store.dispatch('baseApi/getCustomer').then(() => { })
      this.$store.dispatch('baseApi/getStores').then(() => { })
      this.$store.dispatch('baseApi/getYear').then(() => { })
      this.$store.dispatch('baseApi/getSeason').then(() => { })
    }
  }
}
</script>

<style scoped>
.data-analysis {
  height: 100%;
  background: #191b2b;
  padding-top: 0.3125rem;
  padding-left: 0.3125rem;
  padding-right: 0.3125rem;
}
.el-col {
  margin-top: 0.3125rem;
}
.el-card {
  border: 0px;
  background: #242640;
  color: #cccccc;
}
.monty {
  display: block;
  margin: 5px 5px;
  font-size: 1rem;
  color: #cccccc;
}
.monty:hover {
  font-size: 1.125rem;
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
  height: 100%;
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
  line-height: 40px;
  margin: 0.625rem;
}
.index,
.name,
.totAmtActual,
.qty {
  line-height: 40px;
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
</style>
