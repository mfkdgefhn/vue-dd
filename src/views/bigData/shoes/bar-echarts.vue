<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 13:20:03
 * @LastEditors: anan
 * @LastEditTime: 2019-10-12 11:39:04
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
      default: 0
    }
  },
  data() {
    return {
      vStyle: 'width: 100%;height: 300px'
    }
  },
  watch: {
    screenHeight(val) {
      this.vStyle = 'width: 100%;height: ' + (val * 0.3) + 'px'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const myChart = this.$echarts.init(this.$refs.barEcharts)
      var barOption = {
        // title: {
        //   text: '世界人口总量',
        //   subtext: '数据来自网络'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年'],
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
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230],
            label: {
              show: true
            }
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807],
            label: {
              show: true
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
.bar-echarts {
  height: 100%;
}
</style>
