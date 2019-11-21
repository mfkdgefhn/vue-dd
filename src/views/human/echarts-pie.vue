<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 11:02:26
 * @LastEditors: anan
 * @LastEditTime: 2019-11-07 16:53:53
 -->
<template>
  <div ref="pieEcharts" class="pie-echarts" :style="vStyle" />
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    legendData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      vStyle: 'width: 100%;height: 100%',
      series: []
    }
  },
  computed: {
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (newVal.sex.data.length > 0 && newVal.age.data.length > 0) {
          this.series = this.setSeries(newVal)
          this.drawLine()
        }
      },
      deep: true
    }
  },
  mounted() {
    // this.drawLine()
  },
  methods: {
    setSeries(data) {
      var arr = []
      for (const key in data) {
        var obj = {}
        if (data.hasOwnProperty(key)) {
          const element = data[key]
          obj.name = key
          obj.type = 'pie'
          obj.radius = element.radius
          if (key === 'sex') {
            obj.label = {
              normal: {
                position: 'inner',
                formatter: '{b}({d}%)'
              }
            }
          } else {
            obj.labelLine = {
              normal: {
                show: false
              }
            }
          }
          obj.labelLine = {
            normal: {}
          }
          obj.data = element.data
        }
        arr.push(obj)
      }
      return arr
    },
    drawLine() {
      // 初始化
      const myChart = this.$echarts.init(this.$refs.pieEcharts)

      var option = {
        // 图形根据color进行循环选择
        color: ['#B6C335', '#FBCE0F', '#E87C24', '#28727B', '#C0232A', '#9BCA62', '#F3A43B', '#D7504C', '#61C0DE'],
        // 背景颜色
        // backgroundColor: '#1972c6',
        // 标题
        title: {
          text: this.data.title || '',
          left: 'center',
          // tip: -10,
          textStyle: {
            // color: '#ccc'
          }
        },
        // 提示框组件。
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}  ({d}%)',
          textStyle: {
            color: '#fff'
          }
        },
        // 图例组件。
        legend: {
          bottom: '0',
          textStyle: {
            color: '#90979c'
          },
          data: this.data.title
        },
        // 内容
        series: this.series

      }

      myChart.setOption(option)

      // 自适应屏幕宽高
      window.addEventListener('resize', () => { myChart.resize() })
    },
    // 表行颜色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color: pink'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: lightblue;color: #fff;font-weight: 500;'
      }
    }
  }
}
</script>
