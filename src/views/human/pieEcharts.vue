<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 11:02:26
 * @LastEditors: anan
 * @LastEditTime: 2019-11-07 17:35:33
 -->
<template>
  <div ref="pieEcharts" class="pie-echarts" style="width: 100%;height: 100%;" />
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
    }
  },
  computed: {
    propsData() {
      return this.data.data
    }
  },
  watch: {
    propsData(newValue, oldValue) {
      console.log(1)

      this.drawLine()
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 初始化
      const myChart = this.$echarts.init(this.$refs.pieEcharts)

      var option = {
        // 图形根据color进行循环选择
        color: ['#B6C335', '#FBCE0F', '#E87C24', '#28727B', '#C0232A', '#9BCA62', '#F3A43B', '#D7504C', '#61C0DE'],
        // 背景颜色
        // backgroundColor: '#2c343c',
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
          // formatter: (parmas) => {
          //   console.log(parmas)
          //   return parmas
          // },
          textStyle: {
            color: '#fff'
          }
        },
        // 左下方组件 视觉映射组件
        // visualMap: {
        //   show: false,
        //   min: 80,
        //   max: 2000,
        //   inRange: {
        //     colorLightness: [0, 1]
        //   }
        // },

        // 图例组件。
        legend: {
          bottom: '0',
          textStyle: {
            color: '#90979c'
          },
          data: this.data.legend
        },
        // 内容
        series: [
          {
            name: this.data.title,
            type: 'pie',
            radius: this.data.title === '商品类别' ? '45%' : '55%',
            center: ['50%', '50%'],
            // data: this.data.data.sort(function(a, b) { return a.value - b.value }),
            data: this.data.data, // 数据
            selectedMode: 'single', // 点击时突出
            // roseType: 'radius', // 是否展示成南丁格尔图
            // 视觉引导线
            labelLine: {
              lineStyle: {
                // color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            // 饼图图形上的文本标签
            label: {
              position: 'outside', // outside外侧  inside饼图内  center
              formatter: '{b}:{d}%'
            },
            // 显示的效果不同
            animationType: 'scale',
            animationEasing: 'elasticOut',
            // 初始动画的延迟
            animationDelay: (idx) => {
              return Math.random() * 200
            }
          }
        ]
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
