<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2019-11-07 17:41:43
 -->
<template>
  <div class="retail-analysis">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <!-- 展示内容 -->
    <div class="content-div">
      <!-- 第一行 -->
      <el-row :gutter="10" class="one-row">
        <el-col :span="8" style="height:100%;">
          <el-row style="height:100%;">
            <el-card shadow="hover" style="height:100%;">
              <div class="suspension">员工性别与年龄分析</div>
              <echarts-pie :data="data" />
            </el-card>
          </el-row>
          <!-- <el-row style="height:49%;">
            <el-card shadow="hover" style="height:100%;">男女+年龄列表</el-card>
          </el-row>-->
        </el-col>
        <el-col :span="16" style="height:100%;">
          <el-row style="height:20%;" :gutter="10">
            <el-col :span="6" style="height:100%;">
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
            <el-col :span="6" style="height:100%;">
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
            <el-col :span="6" style="height:100%;">
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
            <el-col :span="6" style="height:100%;">
              <el-card shadow="hover" style="height:100%;">
                <span>离职率</span>
                <count-to
                  :start-val="startVal"
                  :end-val="parseInt(humanCount.lzl)"
                  :duration="duration"
                  suffix=" %"
                  class="max"
                />
              </el-card>
            </el-col>
          </el-row>
          <el-row style="height:78%;">
            <el-card shadow="hover" style="height:100%;">
              <div class="suspension">员工地域分布</div>
              <echarts-map :region-data="regionData" />
            </el-card>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="10" class="two-row">
        <el-col :span="14" style="height:100%;">
          <el-card shadow="hover" style="height:100%;">
            <div class="suspension">员工工龄学历分析</div>
            <el-col :span="12" style="height:100%;">
              <pie-echarts :data="workingYears" />
            </el-col>
            <el-col :span="12" style="height:100%;">
              <pie-echarts :data="education" />
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="10" style="height:100%;">
          <el-card shadow="hover" style="height:100%;">
            <div class="suspension">员工离职原因分析</div>
            <word-cloud-chart id="echarts05" :data="echarts05Data" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import echartsPie from './echarts-pie'
import echartsMap from './echarts-map'
import wordCloudChart from './word-cloud-chart'
import pieEcharts from './pieEcharts'
// import echartsPie from '@/components/public/pieEcharts'

import Search from '@/components/public/search'
import { getHumanCount, getSexProportion, getAgeProportion, getRegionProportion, getReasonsForLeavingProportion, getEducationProportion, getWorkingYearsProportion } from '@/api/gmqApi' //

export default {
  // 组件
  components: {
    Search, echartsPie, countTo, echartsMap, wordCloudChart, pieEcharts
  },
  data() {
    return {
      // 窗口高度
      screenHeight: window.innerHeight,
      loading: false,
      startVal: 0,
      duration: 2000,
      humanCount: {},
      sexData: {
        data: []
      },
      ageData: {
        data: []
      },
      data: {
        sex: {
          data: []
        },
        age: {
          data: []
        }
      },
      regionData: [],
      chartsTitle: '',
      echarts05Data: [

      ],
      workingYears: { data: [] },
      education: { data: [] }
    }
  },
  // 初始化
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight
        that.timer = true
        setTimeout(() => {
          that.timer = false
        }, 400)
      })()
    }
    this.getInit()
  },
  // 方法
  methods: {
    getInit() {
      getHumanCount().then(response => {
        this.humanCount = response.result[0]
      })
    },
    // 获取数据
    getAnalysis(params) {
      // 获取员工性别数据
      // this.data.title = '双饼图'
      getSexProportion(params).then(response => {
        this.data.sex.data = this.getObject(response.result)
        this.data.sex.radius = [0, '30%']
      })
      // 获取员工年龄数据
      getAgeProportion(params).then(response => {
        this.data.age.data = this.getObject(response.result)
        this.data.age.radius = ['40%', '55%']
      })
      // 获取员工地域分布
      getRegionProportion(params).then(response => {
        this.regionData = response.result
      })
      // 获取离职原因
      getReasonsForLeavingProportion(params).then(response => {
        this.echarts05Data = response
      })
      // 获取员工工龄
      getWorkingYearsProportion(params).then(response => {
        this.workingYears.data = response
      })
      // 获取员工学历
      getEducationProportion(params).then(response => {
        this.education.data = response.result
      })
    },
    getObject(result) {
      if (result) {
        var arr = []
        result.forEach(val => {
          var obj = {}
          obj.name = val.name
          obj.value = val.value
          arr.push(obj)
        })
        return arr
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  color: #04beff;
}
.retail-analysis {
  height: 100%;
}
.content-div {
  margin-top: 0.625rem;
  margin-left: 0.625rem;
  margin-right: 0.625rem;
  height: 85%;
}
.one-row {
  height: 60%;
}
.two-row {
  height: 40%;
}
.el-row {
  margin-bottom: 0.625rem;
}
.el-row .last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 0.25rem;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 0.25rem;
  min-height: 2.25rem;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-card span {
  display: block;
  margin: 0.3125rem;
  font-size: 1rem;
  text-align: center;
}
.el-card .max {
  font-size: 2rem;
}
.suspension {
  position: fixed;
  z-index: 200;
}
</style>

<style>
.el-card__body {
  height: 100%;
}
</style>
