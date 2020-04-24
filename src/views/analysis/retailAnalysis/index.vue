<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:23:32
 * @LastEditors  : anan
 * @LastEditTime : 2020-01-12 14:50:07
 -->
<template>
  <div class="retail-analysis">
    <!-- 搜索 -->
    <el-card shadow="hover" class="crad">
      <search :loading="loading" @getAnalysis="getAnalysis" />
    </el-card>

    <!-- 展示内容 -->
    <div v-if="loadingCon" class="el-row-class">
      <!-- 饼图开始 -->
      <el-row :gutter="10">
        <!-- 时段 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="retailInterval"
              :tips-data="tipsData"
              :title="retailInterval.title"
              :loading="loading"
              class="pie-class"
              style="height:300px;"
            />
            <!-- :title="title" -->
          </el-card>
        </el-col>
        <!-- 商品风格 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="productStyle"
              :tips-data="tipsData"
              :title="productStyle.title"
              :loading="loading"
              class="pie-class"
              style="height:300px;"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <!-- 是否会员 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="vipProportion"
              :tips-data="tipsData"
              :title="vipProportion.title"
              :loading="loading"
              class="pie-class"
              style="height:300px;"
            />
          </el-card>
        </el-col>
        <!-- 码段 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              :data="codeSegment"
              :tips-data="tipsData"
              :title="codeSegment.title"
              :loading="loading"
              class="pie-class"
              style="height:300px;"
            />
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
      // 加载动画
      loading: false,
      loadingCon: true,
      loadCount: 0,
      // 时段零售
      retailInterval: {
        title: '时段零售',
        data: []
      },
      // 商品风格
      productStyle: {
        title: '商品风格',
        data: []
      },
      // 会员占比
      vipProportion: {
        title: '会员占比',
        data: []
      },
      // 码段
      codeSegment: {
        title: '码段',
        data: []
      },
      // 提示信息
      title: '根据查询条件进行查询数据',
      tipsData: [
        {
          name: '时段零售：',
          description: '以两小时为维度，如0-1为例，时间为00:00-01:59，以此类推,没有零售的时段将不显示'
        },
        {
          name: '商品风格：',
          description: '以商品风格为维度'
        },
        {
          name: '会员占比：',
          description: '以会员为维度'
        },
        {
          name: '码段：',
          description: '以商品尺码为维度'
        }
      ]
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
    // this.init()
  },
  methods: {
    init() {
      this.loadingCon = true
    },
    // 获取数据
    getAnalysis(params) {
      this.loadingCon = true
      this.loading = true

      // 获取时段数据
      getIntervalAnalysis(params).then(response => {
        var arrData = response.result

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

<style >
.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.el-row-class {
  margin-left: 10px;
  margin-right: 10px;
}
.el-col-class {
  margin-top: 10px;
}
</style>
