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
    <div class="el-row-class">
      <!-- 饼图开始 -->
      <el-row :gutter="10">
        <!-- 时段 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px;"
              :data="retailInterval"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
            <!-- :title="title" -->
          </el-card>
        </el-col>
        <!-- 商品风格 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px;"
              :data="productStyle"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <!-- 是否会员 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px;"
              :data="vipProportion"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
          </el-card>
        </el-col>
        <!-- 码段 -->
        <el-col :lg="12" :md="12" :sm="12" :xs="24" class="el-col-class">
          <el-card shadow="hover" class="el-card-class">
            <pie-echarts
              class="pie-class"
              style="height:300px;"
              :data="codeSegment"
              :tips-data="tipsData"
              :loading="loading"
              @readerParams="readerParams"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 点击响应弹窗详细信息 -->
    <prompt-box-new
      :dialog-visible="dialogVisible"
      :loading="itemLoading"
      :title="titleNew"
      :item-date="itemDate"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>

import Search from '@/components/public/search'
import pieEcharts from '@/components/public/pieEcharts'
import promptBoxNew from '@/components/tips/prompt-box-new'
import { getVipAnalysis, getIntervalAnalysis, getCodeSegment, getStyle } from '@/api/gmqApi' // getProductstyle
// getRetailItemAnalysis
export default {
  name: 'RetailAnalysis',
  components: {
    Search, pieEcharts, promptBoxNew
  },
  data() {
    return {
      showLoad: false,
      // 加载动画
      loading: false,
      itemLoading: false,
      dialogVisible: false,
      loadCount: 0,
      itemDate: [],
      detailedData: [],
      titleNew: '明细',
      // 时段零售 商品风格 会员占比 码段
      retailInterval: { title: '时段零售', type: 'timeInterval', data: [] },
      productStyle: { title: '商品风格', type: 'productStyle', data: [] },
      vipProportion: { title: '会员占比', type: 'vipProportion', data: [] },
      codeSegment: { title: '码段', type: 'codeSegment', data: [] },
      // 提示信息
      title: '根据查询条件进行查询数据',
      tipsData: [
        { name: '时段零售：', description: '以两小时为维度，如0-1为例，时间为00:00-01:59，以此类推,没有零售的时段将不显示' },
        { name: '商品风格：', description: '以商品风格为维度' },
        { name: '会员占比：', description: '以会员为维度' },
        { name: '码段：', description: '以商品尺码为维度' }
      ],
      params: {}
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
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 渲染参数
    readerParams(val) {
      this.itemDate = []
      this.dialogVisible = true
      this.itemLoading = true
      const paramsDate = Object.assign({}, this.params)
      this.detailedData = []
      if (val.seriesName === '时段零售') {
        var timeDate = val.name.split('-')
        for (let i = 0; i < timeDate.length; i++) {
          if (timeDate[i].length === 1) {
            timeDate[i] = '0' + timeDate[i]
          }
        }
        paramsDate.timeInterval = timeDate.join(',')
        this.titleNew = paramsDate.timeInterval + ' ' + val.seriesName
      } else if (val.seriesName === '商品风格') {
        this.titleNew = (paramsDate.productStyle = val.name) + ' ' + val.seriesName
      } else if (val.seriesName === '会员占比') {
        this.titleNew = (paramsDate.vipProportion = val.name) + ' ' + val.seriesName
      } else if (val.seriesName === '码段') {
        const codeSegment = val.name === '包包' ? '00' : val.name.slice(0, val.name.length - 1)
        this.titleNew = (paramsDate.codeSegment = codeSegment) + ' ' + val.seriesName
      }
      this.$store.dispatch('baseApi/getRetailItemAnalysis', paramsDate).then(() => {
        setTimeout(() => {
          this.itemDate = this.$store.getters.retailItemAnalysis
          this.itemLoading = false
        }, 500)
      }).catch(error => {
        this.itemLoading = false
        console.log(error)
      })
    },
    // 获取数据
    getAnalysis(params) {
      this.params = Object.assign({}, params)
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
