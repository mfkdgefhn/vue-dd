<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 13:20:03
 * @LastEditors  : anan
 * @LastEditTime : 2020-01-12 14:06:27
 -->
<template>
  <div class="bar-echarts">
    <div ref="barEcharts" :style="vStyle" />
  </div>
</template>

<script>
export default {
  props: {
    vipRepeatPurchase: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      vStyle: 'width: auto;height: 100%',
      data: {
        legend: [],
        series: []
      },
      directlyCity: ['北京', '上海', '重庆', '天津']
    }
  },
  watch: {
    loading(bool) {
      const myChart = this.$echarts.init(this.$refs.barEcharts)
      if (bool) {
        myChart.showLoading({
          text: '加载中',
          // color: '#3398DB',
          textColor: '#3398DB',
          // backgroundColor: '#000',
          // maskColor: 'rgba(255, 255, 255, 0.8)',
          zlevel: 0
        })
      } else {
        myChart.hideLoading()
      }
    },
    screenHeight(val) {
      this.vStyle = 'width: auto;height: ' + (val * 0.2) + 'px'
    },
    vipRepeatPurchase(val) {
      this.data = {
        legend: [],
        series: []
      }
      if (val.length > 0) {
        if (this.$store.getters.listQuery.city) {
          this.rendering(val, 'district')
        } else if (this.$store.getters.listQuery.province) {
          this.rendering(val, 'city')
        } else {
          this.rendering(val, 'province')
        }
        this.drawLine()
      }
    }
  },
  mounted() {
    // this.drawLine()
  },
  methods: {
    rendering(data, str) {
      data.forEach(element => {
        this.data.legend.push(element[str].substring(0, 2))
        this.data.series.push(element.fgl)
        // {value: element.fgl,
        // name: element[str]}
      })
    },
    drawLine() {
      const myChart = this.$echarts.init(this.$refs.barEcharts)
      myChart.off('click')
      myChart.on('click', (params) => {
        const listQuery = this.$store.getters.listQuery
        if (!listQuery.province) {
          let cout = 0
          this.directlyCity.forEach(element => {
            if (params.name.substring(0, 2) === element) {
              ++cout
            }
          })
          if (cout > 0) {
            this.$store.dispatch('baseApi/setProvinceCity', params.name)
          } else {
            this.$store.dispatch('baseApi/setProvince', params.name)
          }
          // this.$store.dispatch('baseApi/setProvince', params.name)
        } else if (!listQuery.city) {
          this.$store.dispatch('baseApi/setCity', params.name)
        } else {
          // console.log('进入区县')
        }
      })

      var option = {
        title: {
          text: '会员复购',
          textStyle: {
            color: '#00B4FF'
          }
        },
        color: ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: [
          {
            type: 'inside',
            minValueSpan: 3,
            maxValueSpan: 6
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          borderColor: 'rgba(128, 128, 128, 0.5)'
        },
        xAxis: [
          {
            type: 'category',
            data: this.data.legend,
            axisTick: {
              alignWithLabel: true
            },
            textStyle: {
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: 'rgba(128, 128, 128, 0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '复购率',
            type: 'bar',
            barWidth: '60%',
            data: this.data.series,
            textStyle: {
              color: '#ccc'
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{@score} % '
            },
            itemStyle: {
              color: (params) => {
                return option.color[params.dataIndex]
              }
            }
          }
        ],
        textStyle: {
          color: '#ccc'
        }
      }
      myChart.setOption(option)
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
