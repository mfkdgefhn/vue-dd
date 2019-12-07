<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 14:53:41
 * @LastEditors: anan
 * @LastEditTime: 2019-11-26 10:52:16
 -->
<template>
  <div class="pie-echarts">
    <div ref="pieEcharts" :style="vStyle" />
  </div>
</template>

<script>
export default {
  props: {
    screenHeight: {
      type: Number,
      default: 0
    },
    vipRepeatPurchase: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      vStyle: 'width: auto;height: 200px',
      data: {
        legend: [],
        series: []
      }
    }
  },
  watch: {
    screenHeight(val) {
      this.vStyle = 'width: auto;height: ' + (val * 0.2) + 'px'
    },
    vipRepeatPurchase(val) {
      this.data = {
        legend: [],
        series: []
      }
      if (val.length > 0) {
        console.log(this.$store.getters.listQuery)
        if (this.$store.getters.listQuery.city) {
          this.rendering(val, 'district')
        } else if (this.$store.getters.listQuery.province) {
          this.rendering(val, 'city')
        } else {
          this.rendering(val, 'province')
        }
        // console.log(this.data)
        this.drawLine()
      }
    }
  },
  mounted() {
  },
  methods: {
    rendering(data, str) {
      data.forEach(element => {
        if (this.data.legend.length < 6) { this.data.legend.push(element[str]) }
        this.data.series.push({
          value: element.fgl,
          name: element[str]
        })
      })
    },
    drawLine() {
      const myChart = this.$echarts.init(this.$refs.pieEcharts)
      var pieOption = {
        // title: {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.data.legend,
          textStyle: {
            color: '#ccc'
          }
        },
        toolbox: {
          feature: {
            magicType: {
              type: ['line', 'bar', 'stack', 'tiled', 'pie']
            }
          }

        },
        series: [
          {
            name: '访问来源',
            type: 'line',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.data.series,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: true
            }
          }
        ]
      }
      myChart.setOption(pieOption)
      window.addEventListener('resize', () => { myChart.resize() })
    }
  }
}
</script>

<style scoped>
.pie-echarts {
  height: 100%;
}
</style>
