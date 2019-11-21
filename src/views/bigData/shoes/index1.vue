<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2019-11-18 13:12:32
 -->
<template>
  <div class="retail-analysis">
    <!-- 展示内容 -->
    <div class="content-div">
      <!-- 第一行 -->
      <el-row :gutter="10" class="one-row">
        <el-col :span="8" style="height:100%;">
          <el-row style="height:50%;">
            <el-card shadow="hover" style="height:100%;">
              <div class="suspension">店铺排名TOP20</div>
              <echarts-pie :data="data" />
            </el-card>
          </el-row>
          <el-row style="height:50%;">
            <el-card shadow="hover" style="height:100%;">
              <div class="suspension">店铺排名TOP20</div>
              <echarts-pie :data="data" />
            </el-card>
          </el-row>
        </el-col>

        <el-col :span="16" style="height:100%;">
          <el-row style="height:20%;" :gutter="10">
            <el-col :span="8" style="height:100%;">
              <el-card shadow="hover" style="height:100%;">
                <span>在职人数</span>
                <count-to
                  :start-val="startVal"
                  :end-val="parseInt(humanCount.zzzsl)"
                  :duration="duration"
                  class="max"
                />
              </el-card>
            </el-col>
            <el-col :span="8" style="height:100%;">
              <el-card shadow="hover" style="height:100%;">
                <span>入职人数</span>
                <count-to
                  :start-val="startVal"
                  :end-val="parseInt(humanCount.rzsl)"
                  :duration="duration"
                  class="max"
                />
              </el-card>
            </el-col>
            <el-col :span="8" style="height:100%;">
              <el-card shadow="hover" style="height:100%;">
                <span>离职人数</span>
                <count-to
                  :start-val="startVal"
                  :end-val="parseInt(humanCount.lzsl)"
                  :duration="duration"
                  class="max"
                />
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
      </el-row>

      <el-row :gutter="10" class="two-row">
        <el-col :span="12">
          <el-card :body-style="bodyStyle" shadow="hover">
            <span>TOP3城市销售趋势</span>
            <line-echarts :screen-height="screenHeight" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :body-style="bodyStyle" shadow="hover">
            <span>各规模客户状态数</span>
            <pie-echarts :screen-height="screenHeight" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

// import Search from './search'
import echarts from './echarts'

// import echartsWordCloud from './echarts-word-cloud' // 该组件有问题，明日查看
// import barEcharts from './bar-echarts'
// import barEcharts1 from './bar-echarts1'
import lineEcharts from './line-echarts'
import pieEcharts from './pie-echarts'

import countTo from 'vue-count-to'

import { getBigData, getKBlsedM, getStoreRankingM } from '@/api/gmqApi'

export default {

  name: 'DataAnalysis',
  components: {
    echarts,
    // echartsWordCloud,
    // barEcharts,
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
      storeRankingM: []
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
        // console.log(that.echartsRowTop)
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
      getStoreRankingM(params).then(response => {
        this.storeRankingM = response.result
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
  margin: 0.3125rem, 0.3125rem;
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
}
.el-card .max:hover {
  font-size: 2rem;
  color: #0095d9;
}
.seamless-warp {
  height: 12.5rem;
  overflow: hidden;
}
.item {
  list-style: none;
  padding-inline-start: 0.625rem;
  margin: 0;
}
</style>
