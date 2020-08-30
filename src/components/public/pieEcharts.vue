<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 11:02:26
 * @LastEditors: anan
 * @LastEditTime: 2020-08-30 14:42:57
 -->
<template>
  <div class="retail-analysis">
    <!-- 图表 -->
    <div ref="pieEcharts" class="pie-echarts" style="width: 100%;height: 100%;">{{ data.title }}</div>
    <!-- 字段说明 -->
    <prompt-box
      :dialog-visible="dialogVisible"
      :tips-data="tipsData"
      :title="data.title"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import promptBox from '@/components/tips/prompt-box'

// import { getRetailItemAnalysis } from '@/api/gmqApi'

export default {
  components: {
    promptBox
  },
  props: {
    data: { type: Object, default: () => { } },
    legendData: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    tipsData: { type: Array, default: () => [] },
    title: { type: String, default: '' },
    params: { type: Object, default: () => { } }
  },
  data() {
    return {
      dialogVisible: false,
      isShow: false,
      titleNew: '明细',
      detailedData: [],
      itemLoading: false
    }
  },
  computed: {
    propsData() {
      return this.data.data
    }
  },
  watch: {
    // 显示、隐藏加载效果
    loading(val) {
      if (val) {
        const myChart = this.$echarts.init(this.$refs.pieEcharts)
        myChart.showLoading({
          text: '加载中',
          color: '#3385ff',
          textColor: '#000',
          maskColor: 'rgba(255, 255, 255, 0.8)',
          zlevel: 0
        })
      }
    },
    propsData(newValue, oldValue) {
      this.vStyle = 'width: 100%;height: ' + (window.innerHeight * 0.3) + 'px'
      this.drawLine()
    },
    titleData(newValue, oldValue) {
    }
  },
  mounted() {
    // this.drawLine()
  },
  methods: {
    handleClose(parmas) {
      this.dialogVisible = false
      this.isShow = false
    },
    drawLine() {
      // 初始化
      const myChart = this.$echarts.init(this.$refs.pieEcharts)
      var option = {
        // 图形根据color进行循环选择
        color: ['#B6C335', 'orange', '#E87C24', 'green', '#94D8F6', '#75BFDF', '#3F48CC', '#E6444A', '#D7864E', '#D441D7'],
        // 背景颜色
        // backgroundColor: '#1972c6',
        // 标题
        title: {
          text: this.data.title ? this.data.title : '无',
          textStyle: {
            color: '#04BEFF'
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
          data: this.data.legend
        },
        // 显示工具栏
        toolbox: {
          color: '#04BEFF',
          right: '5%',
          feature: {
            myTool1: {
              show: true,
              title: '提示',
              iconStyle: {
                borderColor: '#04BEFF'
              },
              onclick: () => {
                this.dialogVisible = true
              },
              icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891'
            },
            dataView: {
              iconStyle: {
                borderColor: '#04BEFF'
              }
            },
            saveAsImage: {
              iconStyle: {
                borderColor: '#04BEFF'
              },
              type: 'jpeg'
            }
          }
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
            // selectedMode: 'single', // 点击时突出 单选 single 多选 multiple
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
              formatter: '{d}%'
            },
            // 显示的效果不同 scale expansion
            animationType: 'scale',
            animationEasing: 'elasticOut',
            // 初始动画的延迟
            animationDelay: (idx) => {
              return Math.random() * 200
            }
          }
        ]
      }
      // 设置echarts
      myChart.setOption(option)
      // 隐藏加载效果
      myChart.hideLoading()
      myChart.on('click', (val) => {
        // 返回父组件，执行readerParams
        this.$emit('readerParams', val)
      })
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

<style scoped>
.retail-analysis {
  height: 100%;
}
</style>
