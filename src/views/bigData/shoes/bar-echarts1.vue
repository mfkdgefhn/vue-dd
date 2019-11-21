<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 13:20:03
 * @LastEditors: anan
 * @LastEditTime: 2019-11-20 14:44:35
 -->
<template>
  <div class="bar-echarts">
    <div ref="barEcharts" :style="vStyle" />
  </div>
</template>

<script>
export default {
  props: {
    screenHeight: {
      type: Number,
      default: 300
    },
    provinceSaleM: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      vStyle: 'width: 100%;height: 300px',
      barDate: {}
    }
  },
  watch: {
    screenHeight(val) {
      this.vStyle = 'width: 100%;height: ' + (val * 0.3) + 'px'
    },
    provinceSaleM(val) {
      if (val.length > 0) {
        const xAxis = []
        const series = []

        this.barDate.title = val[0].months
        val.forEach(element => {
          xAxis.push(element.provinceName.substring(0, 2))
          series.push(element.totAmtActual)
        })
        this.barDate.xAxis = xAxis
        this.barDate.series = series
        this.drawLine()
      }
    }
  },
  mounted() {
    // this.drawLine()
  },
  methods: {
    drawLine() {
      const myChart = this.$echarts.init(this.$refs.barEcharts)

      // var zoomSize = 6
      // myChart.on('click', (params) => {
      //   console.log(this.barDate.xAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
      //   myChart.dispatchAction({
      //     type: 'dataZoom',
      //     startValue: this.barDate.xAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      //     endValue: this.barDate.xAxis[Math.min(params.dataIndex + zoomSize / 2, this.barDate.series.length - 1)]
      //   })
      // })

      var barOption = {
        title: {
          text: '省份销售(' + this.barDate.title + ')',
          textStyle: {
            color: '#00B4FF'
          }
        },
        // color: ['#3398DB'],
        // color: ['#B6C335', 'orange', 'yellow', 'green', '#75BFDF', '#94D8F6', '#3F48CC', '#E6444A', '#D7864E', '#D441D7'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: [
          {
            type: 'inside',
            minValueSpan: 4,
            maxValueSpan: 10
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.barDate.xAxis,
            axisTick: {
              alignWithLabel: true
            },
            textStyle: {
            }
          }
        ],
        yAxis:
        {
          type: 'value',
          axisLabel: {
            formatter: (value, index) => {
              const texts = Math.round(value / 10000)
              // console.log(value, index)
              return texts + '万'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            barWidth: '60%',
            data: this.barDate.series,
            textStyle: {
              color: '#ccc'
            },
            label: {
              show: true,
              position: 'top',
              formatter: (params) => {
                return parseInt(params.value / 10000)
              }
            },
            itemStyle: {
              color: (params) => {
                var r = Math.floor(Math.random() * 255)
                var g = Math.floor(Math.random() * 255)
                var b = Math.floor(Math.random() * 255)
                return 'rgb(' + r + ',' + g + ',' + b + ')'
              }
            }
          }
        ],
        textStyle: {
          color: '#ccc'
        }
      }

      myChart.setOption(barOption)

      window.addEventListener('resize', () => { myChart.resize() })
    }
  }
}
</script>

<style scoped>
</style>
