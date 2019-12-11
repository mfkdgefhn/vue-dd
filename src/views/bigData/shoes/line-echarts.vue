<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 14:53:41
 * @LastEditors: anan
 * @LastEditTime: 2019-12-10 17:23:13
 -->
<template>
  <div class="line-echarts">
    <div ref="barEcharts" :style="vStyle" />
  </div>
</template>

<script>
export default {
  props: {
    yearOnYear: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      vStyle: 'width: auto;height: 100%;',
      echartsData: {
        legend: [],
        xAxis: [],
        series: [],
        color: [],
        startValue: this.getDateStr(-7),
        endValue: this.getDateStr(0)
      }
    }
  },
  watch: {
    yearOnYear(val) {
      if (val.length > 0) {
        this.echartsData.legend = []
        this.echartsData.xAxis = []
        this.echartsData.series = []
        val.forEach((arr, index) => {
          this.echartsData.legend.push(arr.year)
          if (index === 0) this.echartsData.xAxis = arr.monthday
          this.echartsData.series.push({
            name: arr.year,
            type: 'line',
            label: {
              show: true,
              position: 'inside',
              formatter: (params) => {
                return parseInt(params.value / 10000)
              }
            },
            data: arr.tot
          })
          const r = Math.floor(Math.random() * 255)
          const g = Math.floor(Math.random() * 255)
          const b = Math.floor(Math.random() * 255)
          this.echartsData.color.push('rgb(' + r + ',' + g + ',' + b + ')')
        })
      }
      this.drawLine()
    }
  },
  mounted() {
  },
  methods: {
    getDateStr(count) {
      var dd = new Date()
      dd.setDate(dd.getDate() + count)
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      return '' + m + d
    },
    drawLine() {
      const myChart = this.$echarts.init(this.$refs.barEcharts)
      var lineOption = {
        title: {
          text: '销量/数量同比',
          textStyle: {
            color: '#00B4FF'
          }
        },
        // color: this.echartsData.color, // ['#3398DB', '#895145'],
        color: ['#3398DB', '#895145'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.echartsData.legend,
          textStyle: {
            color: '#ccc'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.echartsData.xAxis, // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (value, index) => {
                const texts = Math.round(value / 10000)
                // console.log(value, index)
                return texts + '万'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(128, 128, 128, 0.3)'
              }
            }
          }
        ],
        toolbox: {
          feature: {
            magicType: {
              type: ['line', 'bar', 'stack', 'tiled'],
              title: {
                line: '拆线图',
                bar: '柱状图',
                stack: '堆叠',
                tiled: '平铺'
              }
            },
            dataView: {},
            saveAsImage: {
              title: '保存'
            }
          },
          right: 10
        },
        dataZoom: [
          {
            type: 'inside', // slider 滑动条型数据区域缩放组件   inside 内置型数据区域缩放组件
            minValueSpan: 6,
            maxValueSpan: 10,
            startValue: this.echartsData.startValue,
            endValue: this.echartsData.endValue
          }
        ],
        series: this.echartsData.series,
        textStyle: {
          color: '#ccc'
        }
      }

      myChart.setOption(lineOption)
      window.addEventListener('resize', () => { myChart.resize() })
    }
  }
}
</script>

<style scoped>
.line-echarts {
  height: 100%;
}
</style>
