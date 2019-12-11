<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-11 13:20:03
 * @LastEditors: anan
 * @LastEditTime: 2019-12-10 17:27:41
 -->
<template>
  <div class="bar-echarts1">
    <div ref="barEcharts" :style="vStyle" />
    <!-- <prompt-box :dialog-visible="dialogVisible" :data="data" @handleClose="handleClose" /> -->
  </div>
</template>

<script>
// import promptBox from '@/components/tips/prompt-box'

export default {

  // promptBox
  components: {
  },
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
      vStyle: 'width: auto;height: 100%',
      barDate: {},
      directlyCity: ['北京', '上海', '重庆', '天津'],
      dialogVisible: false,
      data: '这是一段信息!!!!',
      type: ''
    }
  },
  watch: {
    provinceSaleM(val) {
      if (val.length > 0) {
        const xAxis = []
        const series = []
        let type = ''
        val.forEach(element => {
          if (element.districtName) {
            type = '区县'
            xAxis.push(element.districtName.substring(0, 2))
            series.push(element.totAmtActual)
          } else if (element.cityName) {
            type = '城市'
            xAxis.push(element.cityName.substring(0, 2))
            series.push(element.totAmtActual)
          } else {
            type = '省份'
            xAxis.push(element.provinceName.substring(0, 2))
            series.push(element.totAmtActual)
          }
        })
        this.type = type
        this.barDate.title = type + '销售(' + val[0].months + ')'
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
    handleClose(done) {
      this.dialogVisible = false
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
          text: this.barDate.title,
          textStyle: {
            color: '#00B4FF'
          }
        },
        // color: ['#3398DB'],
        // color: ['#B6C335', 'orange', 'yellow', 'green', '#75BFDF', '#94D8F6', '#3F48CC', '#E6444A', '#D7864E', '#D441D7'],
        color: ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ',
          '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB', '#c23531', '#2f4554', '#61a0a8', '#d48265',
          '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#C33531', '#EFE42A', '#64BD3D', '#EE9201',
          '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B',
          '#EAF2F8', '#4A235A', '#3498DB', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 显示工具栏
        toolbox: {
          right: '5%',
          feature: {
            myTool1: {
              show: true,
              title: '提示',
              iconStyle: {
                borderColor: '#04BEFF'
              },
              onclick: () => {
                this.data = '<div>' + this.barDate.title + '</div><div>当月该地区零售额</div>'
                this.dialogVisible = true
              },
              icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891'
            }
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
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(128, 128, 128, 0.3)'
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
                return barOption.color[params.dataIndex]
              }
              // color: (params) => {
              //   var r = Math.floor(Math.random() * 255)
              //   var g = Math.floor(Math.random() * 255)
              //   var b = Math.floor(Math.random() * 255)
              //   return 'rgb(' + r + ',' + g + ',' + b + ')'
              // }
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
.bar-echarts1 {
  height: 100%;
}
</style>
