<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors: anan
 * @LastEditTime: 2019-11-15 17:33:29
 -->
<template>
  <div class="retail-analysis">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <!-- 展示内容 -->
    <div v-if="loadingCon" class="content-div">
      <!-- 饼图开始 -->
      <el-row :gutter="10">
        <!-- 时段 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="retailInterval" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 商品风格 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="productStyle" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 是否会员 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="vipProportion" :loading="loading" />
          </el-card>
        </el-col>
        <!-- 码段 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <pie-echarts :screen-height="screenHeight" :data="codeSegment" :loading="loading" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import Search from '@/components/public/search'
import pieEcharts from '@/components/public/pieEcharts'
import { getVipAnalysis, getIntervalAnalysis, getCodeSegment, getStyle } from '@/api/gmqApi' // getProductstyle

export default {
  name: 'RetailAnalysis',
  components: {
    Search, pieEcharts
  },
  data() {
    return {
      showLoad: false,
      screenHeight: window.innerHeight,
      // 加载动画
      loading: false,
      loadingCon: false,
      loadCount: 0,
      // 时段零售
      retailInterval: {
        title: '时段零售',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '0-1' },
          // { value: Math.round(1000 * (Math.random())), name: '2-3' },
          // { value: Math.round(1000 * (Math.random())), name: '4-5' },
          // { value: Math.round(1000 * (Math.random())), name: '6-7' },
          // { value: Math.round(1000 * (Math.random())), name: '8-9' },
          // { value: Math.round(1000 * (Math.random())), name: '10-11' },
          // { value: Math.round(1000 * (Math.random())), name: '12-13' },
          // { value: Math.round(1000 * (Math.random())), name: '14-15' },
          // { value: Math.round(1000 * (Math.random())), name: '16-17' },
          // { value: Math.round(1000 * (Math.random())), name: '18-19' },
          // { value: Math.round(1000 * (Math.random())), name: '20-21' },
          // { value: Math.round(1000 * (Math.random())), name: '22-23' }
        ]
      },
      // 商品风格
      productStyle: {
        title: '商品风格',
        data: []
      },
      // 会员占比
      vipProportion: {
        title: '会员占比',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '是' },
          // { value: Math.round(1000 * (Math.random())), name: '否' }
        ]
      },
      // 码段
      codeSegment: {
        title: '码段',
        data: [
          // { value: Math.round(1000 * (Math.random())), name: '34码' },
          // { value: Math.round(1000 * (Math.random())), name: '35码' },
          // { value: Math.round(1000 * (Math.random())), name: '36码' },
          // { value: Math.round(1000 * (Math.random())), name: '37码' },
          // { value: Math.round(1000 * (Math.random())), name: '38码' },
          // { value: Math.round(1000 * (Math.random())), name: '39码' },
          // { value: Math.round(1000 * (Math.random())), name: '40码' }
        ]
      }
    }
  },
  watch: {
    // 监听loadCount的值，如果能被4整除的时间，搜索按钮加载动画结束
    loadCount(val) {
      if (val % 4 === 0) {
        this.loading = false
        this.$message({
          message: '查询完成!',
          type: 'success',
          duration: 2000
        })
      }
    }
  },
  created() {
  },
  mounted() {
    // console.log(this.$store.getters.customer)
    // console.log(this.$store.getters.store)
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
  },
  methods: {
    // 获取数据
    getAnalysis(params) {
      this.loadingCon = true
      this.loading = true

      // 获取时段数据
      getIntervalAnalysis(params).then(response => {
        var arrData = response.result
        console.log(arrData)

        var arr = []
        arrData.forEach(val => {
          var obj = {}
          // 数据库 0-1 --- 8-9 排序会与 10-24 错乱，因此数据库 选择用00-01，前端用0-1
          if (val.name === '00-01') {
            obj.name = '0-1'
          } else if (val.name === '02-03') {
            obj.name = '2-3'
          } else if (val.name === '04-05') {
            obj.name = '4-5'
          } else if (val.name === '06-07') {
            obj.name = '6-7'
          } else if (val.name === '08-09') {
            obj.name = '8-9'
          } else {
            obj.name = val.name
          }
          obj.value = val.qty

          arr.push(obj)
        })
        this.retailInterval.data = arr
        this.loadCount++
      })
      // 获取风格数据
      getStyle(params).then(response => {
        this.productStyle.data = this.getObject(response.result)
        this.productStyle.legend = this.getArr(response.result)
        this.loadCount++
      })
      // 获取VIP数据
      getVipAnalysis(params).then(response => {
        this.vipProportion.data = this.getObject(response.result)
        this.loadCount++
      })
      // 获取码段数据
      getCodeSegment(params).then(response => {
        this.codeSegment.data = this.getObject(response.result)
        this.loadCount++
      })
    },
    getObject(result) {
      var arr = []
      result.forEach(val => {
        var obj = {}
        obj.name = val.name
        obj.value = val.qty
        arr.push(obj)
      })
      return arr
    },
    getArr(result) {
      var arr = []
      result.forEach(val => {
        arr.push(val.name)
      })
      return arr
    }
  }
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
.content-div {
  margin: 10px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  /* background: #242640; */
  /* background: #2c343c; */
  /* background: #1972c6; */
  background: #ccc;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
